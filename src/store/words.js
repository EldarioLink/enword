import Vue from 'vue'

export default {
    state: {
        words: [],
        maxId: null,
        isWordsAdd: false,
        fireId: undefined
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        ISADD_WORDS(state, payload) {
            state.isWordsAdd = payload
        },
        DELETE_WORDS(state) {
            this.maxId = state.words.length = 0 
        },
        ADD_WORDS(state, payload) {
            console.log(payload.eng, payload.rus, payload.id)
                state.words.eng = payload.eng,
                state.words.rus = payload.rus,
                state.words.id = payload.id
        },
    },
    actions: {
        ADD_NEW_WORDS({ commit, getters }, payload) {
            commit('SET_PROCESSING', true)
            this.fireId = "word" + this.maxId
            console.log( this.fireId)
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId).collection('userWords').doc(this.fireId)
            console.log(this.maxId)
            this.maxId += 1
            console.log(this.maxId)

            let scoreAndDate = {
                eng: payload.eng,
                rus: payload.rus,
                id: this.maxId
            }

            userDataRef.set({
                scoreAndDate
            })
                .then(() => {
                    commit('ADD_WORDS', scoreAndDate)
                    commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    commit('SET_PROCESSING', false)
                });
        },
        LOAD_WORDS({ commit }) {

            Vue.$db.collection('words')
                .get()
                .then(querySnapshot => {
                    let words = []
                    querySnapshot.forEach(s => {
                        const data = s.data()
                        let word = {
                            id: data.id,
                            eng: data.eng,
                            rus: data.rus
                        }

                        words.push(word)
                        this.maxId = words.length

                    })
                    commit('SET_WORDS', words)

                })
                .catch(error => console.log(error))
        },

        LOAD_SAVE_WORDS({ commit, getters }) {
            Vue.$db.collection('userData').doc(getters.userId).collection('userWords')
                .get()
                .then(querySnapshot => {
                    let words = []
                    querySnapshot.forEach(s => {
                        const data = s.data()
                        let word = {
                            id: data.id,
                            eng: data.eng,
                            rus: data.rus
                        }

                        words.push(word)
                        this.maxId = words.length
                    })
                    commit('SET_WORDS', words)

                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd
    },

}