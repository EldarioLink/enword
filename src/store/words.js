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
        ADD_NEW_WORDS({
            commit,
            getters,
            dispatch
        }, payload) {
            console.log("i am second")
            console.log("start maxId is, must be first 0" + getters.getmaxId)
            commit('SET_PROCESSING', true)

            this.docId = "word" + getters.getmaxId
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId).collection('userWords').doc(this.docId)


            userDataRef.set({
                    eng: payload.eng,
                    rus: payload.rus,
                    id: getters.getmaxId
                })
                .then(() => {

                    // commit('ADD_WORD', {
                    //     eng: payload.eng,
                    //     rus: payload.rus,
                    //     id: this.maxId
                    // })
                    dispatch('LOAD_SAVE_WORDS')

                    commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    commit('SET_PROCESSING', false)
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

        LOAD_SAVE_WORDS({
            commit,
            getters
        }) {
            commit('DELETE_WORDS')
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

                    })
                    commit('SET_WORDS', words)
                    commit('maxID', words.length)

                    console.log("start maxId is, must be first 1" + words.length, getters.getmaxId)

                })
                .catch(error => console.log(error))
        },
        IS_EXIST_WORDS({
            getters
        }) {
            Vue.$db.collection('userData').doc(getters.userId).collection('userWords')
                .get()
                .then((data) => {
                   if(data.exist) {
                    console.log("exist" + data.length)
                   }
                   else{
                       console.log("no exist")
                   }
                })
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd,
    },

}
