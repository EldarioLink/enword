import Vue from 'vue'

let defaultmaxScore = {
    books: {}
}

export default {
    state: {
        userData: defaultmaxScore
    },
    mutations: {
        SET_USER_DATA(state, payload) {
            state.userData = payload
        },
        ADD_USER_BOOK(state, payload) {
            Vue.set(state.userData.books, payload.maxScore)
        }
    },
    actions: {
        // LOAD_USER_DATA({ commit }, payload) {
        //     commit('SET_PROCESSING', true)
        //     let userDataRef = Vue.$db.collection('userData').doc(payload)

        //     userDataRef.get().then(function (doc) {
        //         if (doc.exists) {
        //             console.log("Document data:", doc.data());
        //         } else {
        //             commit('SET_PROCESSING', false)

        //             console.log("No such document!");
        //         }
        //     }).catch(function (error) {
        //         commit('SET_PROCESSING', false)
        //         console.log("Error getting document:", error);
        //     });

        // },
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
        userData: (state) => state.userData
    }
}