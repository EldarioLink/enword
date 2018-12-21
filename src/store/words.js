import Vue from 'vue'

export default {
    state: {
        words: [],
        maxId: undefined,
        isWordsAdd: false,
        docId: undefined
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
        ADD_WORD(state, payload) {
            state.words.push(payload)
            this.maxId = state.words.length
            console.log(this.maxId)
        },
        maxID(state, payload) {
            state.maxId = payload;
        }
    },
    actions: {
        ADD_NEW_WORDS({ commit, getters }, payload) {
            commit('SET_PROCESSING', true)
            this.docId = "word" + this.maxId
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId).collection('userWords').doc(this.docId)


            let word = {
                eng: payload.eng,
                rus: payload.rus,
                id: this.maxId
            }

            this.maxId += 1

            userDataRef.set({
                word
            })
                .then(() => {
                    commit('ADD_WORD', word)
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
                    })
                    commit('SET_WORDS', words)

                    commit('maxID', words.length)


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
                            id: data.word.id,
                            eng: data.word.eng,
                            rus: data.word.rus
                        }

                        words.push(word)
                    })
                    commit('SET_WORDS', words)

                    commit('maxID', words.length)

                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd,
    },

}