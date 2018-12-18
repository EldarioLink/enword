import Vue from 'vue'
import { database } from 'firebase';
import user from './user';

let defaultmaxScore = {

}

export default {
    state: {
        userData: defaultmaxScore,
        counter: 0,
        maxCounter: 0,
    },
    mutations: {
        incrementCounter(state) {
            state.counter++
        },
        counterSetNull(state) {
            state.counter = 0
        },
        setmaxCounter(state) {
            state.maxCounter = Math.max(state.counter)
        },
        LOAD_USER_DATA(state, payload) {
            state.userData = payload.maxScore
        },
        ADD_USER_BOOK(state, payload) {
            Vue.set(state.userData, payload.maxScore)
        }
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
                    commit('ADD_USER_BOOK', { scoreAndDate: scoreAndDate })
                })
        }
    },

    getters: {
        userData: (state) => state.userData,
        userDataAdd: (state) => state.userDataAdd,
        getCounter: (state) => state.counter,
        getCounterMax: (state) => state.maxCounter,
    }
}