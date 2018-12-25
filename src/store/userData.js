import Vue from 'vue'
import { resolve } from 'q';
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
        commonScore: 0
    },
    mutations: {
        lolo(state, payload) {
            state.counter = payload;
        },
        incrementCounter(state) {
            state.counter++
        },
        counterSetNull(state) {
            state.counter = 0
        },
        setmaxCounter(state) {
            state.maxCounterGameMax = Math.max(state.maxCounter, state.counter)
        },
        LOAD_USER_DATA(state, payload) {
            state.maxCounter = payload.maxScore
        },
        ADD_USER_BOOK(state, payload) {
            state.maxCounter = payload
        },
        COMMON_SCORE(state, payload) {
            state.commonScore = payload
        },
    },
    actions: {
        LOAD_USER_DATA({ commit }, payload) {
            commit('SET_PROCESSING', true)

            let userDataRef = Vue.$db.collection('userData').doc(payload)

            userDataRef.get()
                .then((data) => {
                    let userData = data.exists ? data.data() : defaultmaxScore

                    if (!userData.scoreAndDate)
                        userData.scoreAndDate = {}

                    commit('LOAD_USER_DATA', userData.scoreAndDate)
                    commit('SET_PROCESSING', false)

                }).catch((error) => {
                    commit('SET_PROCESSING', false)
                    console.log("Error getting document:", error);
                });

        },
        ADD_USER_BOOK({ commit, getters }, payload) {
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
                    commit('ADD_USER_BOOK', payload)
                    commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    commit('SET_PROCESSING', false)
                });
        },
        COMMON_MAX_SCORE(state) {
            return new Promise((resolve)  => {
                let maxScore = Vue.$db.collection('maxScore').doc('topScore')
                maxScore.get()
                    .then((data) => {
                        let userScore = data.data()

                        resolve(userScore.payload)
                    })
            })
        },
        COMMON_MAX_SCORE_SET(state,payload) {
                let maxScore = Vue.$db.collection('maxScore').doc('topScore')
let score = {
    maxnumber: payload
}
console.log(payload, score)
                maxScore.set({score})
                state.commit('COMMON_SCORE', payload)
        },


    },

    getters: {
        getCounter: (state) => state.counter,
        getCounterMax: (state) => state.maxCounter,
        getCounterMaxGame: (state) => state.maxCounterGameMax,
    }
}
