import firebase from 'firebase'

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null
        },
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
    },
    actions: {
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
        STATE_CHANGED( state, payload) {
            return new Promise((resolve) => {
                if (payload) {
                    state.commit('SET_USER', payload.uid);
                    state.dispatch('LOAD_USER_DATA', payload.uid);
                    resolve();
                } else {
                    state.commit('UNSET_USER')
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
