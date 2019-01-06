import Vue from 'vue'

export default {
    state: {
        words: [],
        deleteWords: [],
        maxId: 0,
        isWordsAdd: false,
        docId: undefined
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        SET_WORDS_DIALOG(state, payload) {
            state.deleteWords = payload
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
        DELETE_WORDS_DIALOG(state) {
            state.deleteWords.length = 0
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
            return new Promise((resolve) => {
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
                        state.dispatch('LOAD_SAVE_WORDS').then(() => {
                            resolve()
                        })
                    })
                    .catch(() => {
                        state.commit('SET_PROCESSING', false)
                    });
            })

        },
        LOAD_WORDS(state) {
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
                    state.commit('SET_WORDS', words)

                    state.commit('maxID', words.length)


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

                })
                .catch(error => console.log(error))
        },
        LENGTH_DATA_WORDS(state) {
            return new Promise((resolve) => {
                let userDataRef = Vue.$db.collection('userData').doc(state.getters.userId).collection('userWords')
                userDataRef.get()
                    .then((data) => {
                        return resolve(data.docs.length)
                    })
            })
        },
        DELETE_DATA_WORDS(state, payload) {
            var asyncLoop = function (o) {
                var i = 0;
                var loop = function () {
                    i++;
                    if (i > o.length) { return; }
                    o.functionToLoop(loop, i);
                }
                loop();
            }
            asyncLoop({
                length: payload,
                functionToLoop: function (loop, i) {
                    Vue.$db.collection('userData').doc(state.getters.userId).collection('userWords').doc('word' + i).delete()
                    loop()
                },
            });
        },
        deleteWords(state) {
            state.commit('DELETE_WORDS_DIALOG')
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

                        deleteWords.push(word)

                    })
                    state.commit('SET_WORDS_DIALOG', deleteWords)

                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd,
        getdeleteWords: (state) => state.deleteWords
    },

}
