import Vue from 'vue'

let defaultmaxScore = {
    scoreAndDate: {
        maxScore: 0
    }
}
export default {
    state: {
        counter: 0,
        maxCounter: 0,
        maxCounterGameMax: 0,
        highScore: 0
    },
    mutations: {
        incrementCounter(state) {
            state.counter++
        },
        counterSetNull(state) {
            state.counter = 0
        },
        setmaxCounter(state) {
            state.maxCounterGameMax = Math.max(state.maxCounter, state.counter)
        },
        SET_USER_SCORE(state, payload) {
            state.maxCounter = payload.maxScore
        },
        SET_USER_MAXSCORE(state, payload) {
            state.maxCounter = payload
        },
        SET_COMMON_SCORE(state, payload) {
            state.highScore = payload
        },
    },
    actions: {
        LOAD_USER_SCORE({ commit }, payload) {
            commit('SET_PROCESSING', true)

            let userDataRef = Vue.$db.collection('userData').doc(payload)

            userDataRef.get()
                .then((data) => {
                    let userData = data.exists ? data.data() : defaultmaxScore

                    if (!userData.scoreAndDate)
                        userData.scoreAndDate = {}

                    commit('SET_USER_SCORE', userData.scoreAndDate)
                    commit('SET_PROCESSING', false)

                }).catch((error) => {
                    commit('SET_PROCESSING', false)
                    console.log("Error getting document:", error);
                });

        },
        SET_USER_SCORE_DB({ commit, getters }, payload) {
            commit('SET_PROCESSING', true)
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId)

            let scoreAndDate = {
                addedDate: new Date(),
                maxScore: payload
            }

            userDataRef.set({
                scoreAndDate

            })
                .then(() => {
                    commit('SET_USER_MAXSCORE', payload)
                    commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    commit('SET_PROCESSING', false)
                });
        },
        COMMON_MAX_SCORE_GET(state) {
            return new Promise((resolve) => {
                let maxScore = Vue.$db.collection('maxScore').doc('topScore')
                maxScore.get()
                    .then((data) => {
                        let userScore = data.data()
                        resolve(userScore.maxnumber)
                    })
            })
        },
        COMMON_MAX_SCORE_SET(state, payload) {
            let maxScore = Vue.$db.collection('maxScore').doc('topScore')
            let score = {
                maxnumber: payload
            }
            maxScore.set(score)
            state.commit('COMMON_SCORE', payload)
        },


    },

    getters: {
        getCounter: (state) => state.counter,
        getmaxCounter: (state) => state.maxCounter,
        getCounterMaxGame: (state) => state.maxCounterGameMax,
        gethighScore: (state) => state.highScore
    }
}
