export default {


    state: {
        words: [
            {
                id: '1',
                eng: 'car',
                rus: 'машина'
            },
            {
                id: '2',
                eng: 'sink',
                rus: 'раковина'
            },
            {
                id: '3',
                eng: 'fail',
                rus: 'падения'
            },
            {
                id: '4',
                eng: 'roof',
                rus: 'крыша'
            },
            {
                id: '5',
                eng: 'table',
                rus: 'стол'
            },
            {
                id: '6',
                eng: 'chair',
                rus: 'стул'
            },
        ],
        counter: 1,
    },
    mutations: {
        SET_WORDS(state, payload) {
            state.words = payload
        },
        increment(state) {
            state.counter++
        }
    },
    getters: {
        getWords: (state) => state.words,
        getCounter: (state) => state.counter,
    },

}