import Vue from 'vue'

export default {
    state: {
        words: [],
        maxId: null
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
    },
    actions: {
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
                       this.maxId =  words.length
                    
                    })
                    commit('SET_WORDS', words)

                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        getWords: (state) => state.words,
        getmaxId: (state) => state.maxId
    },

}