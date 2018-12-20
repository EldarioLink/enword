import Vue from 'vue'

export default {
    state: {
        words: [],
        maxId: null,
        isWordsAdd: false,

    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        ADD_WORDS(state, payload) {
            state.isWordsAdd = payload
        }
    },
    actions: {
        LOAD_WORDS({ commit }) {

            if(!this.isWordsAdd) {
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
            }
            else{
                console.log("addwords")
            }
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId,
        getWordsAdd: (state) => state.isWordsAdd
    },

}