import Vue from 'vue'

export default {
    state: {
        words: [],
        maxId: 0,
        isWordsAdd: false,
        docId: undefined
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        INCREMENT_MAXID(state, payload) {
            state.maxId += payload
        },
        isWordsAdd(state, payload) {
            state.isWordsAdd = payload
        },
        DELETE_WORDS(state) {
            state.words.length = 0
        },
        maxID(state, payload) {
            state.maxId = payload;
        },
        MAXID_NULL(state) {
            state.maxId = 0;
        }

    },
    actions: {
        ADD_NEW_WORDS(state, payload) {
            state.commit('maxID', payload.length)
            state.commit('INCREMENT_MAXID', 1)
            state.commit('SET_PROCESSING', true)
            this.docId = "word" + state.getters.getmaxId
            let userDataRef = Vue.$db.collection('userData').doc(state.getters.userId).collection('userWords').doc(this.docId)

            let word = {
                eng: payload.eng,
                rus: payload.rus,
                id: state.getters.getmaxId
            }

            userDataRef.set(word)
                .then(() => {
                    state.dispatch('LOAD_SAVE_WORDS')
                    state.commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    state.commit('SET_PROCESSING', false)
                });
        },
        LOAD_WORDS({
            commit
        }) {

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

                    console.log("dlina" + words.length)
                    commit('maxID', words.length)


                })
                .catch(error => console.log(error))
        },

        LOAD_SAVE_WORDS(state) {
            state.commit('DELETE_WORDS')
            Vue.$db.collection('userData').doc(state.getters.userId).collection('userWords')
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
                    state.commit('SET_WORDS', words)
                    state.commit('maxID', words.length)

                    console.log("start maxId is, must be first 1" + words.length, state.getters.getmaxId)

                })
                .catch(error => console.log(error))
        },
        LENGTH_DATA_WORDS(state) {
            console.log("it was"+state.getters.userId)
            return new Promise((resolve) => {
                let userDataRef = Vue.$db.collection('userData').doc(state.getters.userId).collection('userWords')
                userDataRef.get()
                    .then((data) => {
                        return resolve(data.docs.length)
                    })
            })


        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd,
    },

}
