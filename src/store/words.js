import Vue from 'vue'

export default {
    state: {
        words: [],
        counter: 0,
        maxCounter: 0,
        maxId: null
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        incrementCounter(state) {
            state.counter++
        },
        counterSetNull(state) {
            state.counter = 0
        },
        setmaxCounter(state) {
            state.maxCounter = Math.max(state.maxCounter, state.counter)
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
                    })
                    commit('SET_WORDS', words)

                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        getWords: (state) => state.words,
        getCounter: (state) => state.counter,
        getCounterMax: (state) => state.maxCounter,
        getmaxId: (state) => state.maxId
    },

}