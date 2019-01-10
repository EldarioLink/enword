import firebase from 'firebase'

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null
        },
        unsubscribeAuth: null
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.isAuthenticated = true
            state.user.uid = payload
        },
        UNSET_USER(state) {
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        },
        SET_UNSUBSCRIBE_AUTH(state, payload) {
            state.unsubscribeAuth = payload
        }
    },
    actions: {

        INIT_AUTH(state) {
            return new Promise((resolve, reject) => {
                if (state.unsubscribeAuth)
                    state.unsubscribeAuth()
                let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    state.dispatch('STATE_CHANGED', user)
                    resolve(user)
                });
                state.commit('SET_UNSUBSCRIBE_AUTH', unsubscribe)
            })
        },
        // Регистрация пользователя
        SIGNUP({ commit }, payload) {
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    commit('SET_PROCESSING', false)
                })
                .catch(function (error) {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message)
                });
        },
        // Вход пользователя
        SIGNIN({ commit }, payload) {
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    commit('SET_PROCESSING', false)
                })
                .catch(function (error) {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message)
                })
        },

        // Аутентифицирован ли пользователь ?!
        STATE_CHANGED(state, payload) {
            return new Promise((resolve) => {
                if (payload) {
                    state.commit('SET_USER', payload.uid);
                    state.dispatch('LOAD_USER_SCORE', payload.uid);

                    state
                        .dispatch("LENGTH_DATA_WORDS")
                        .then(length => {
                            if (length != 0) {
                                state.dispatch("LOAD_SAVE_WORDS");
                            } else {
                                state.dispatch("LOAD_WORDS");
                            }
                        });
                    resolve();
                } else {
                    state.commit('UNSET_USER')
                    state.dispatch("LOAD_WORDS");
                }
            })
        },
        SIGNOUT() {
            firebase.auth().signOut()
        }
    },
    getters: {
        userId: (state) => state.user.uid,
        isUserAuthenticated: (state) => state.user.isAuthenticated
    }
}
