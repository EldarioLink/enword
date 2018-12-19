import Vue from 'vue'


export default {
    state: { 
        timer: undefined
    },
    mutations: {
       timerDelete(state) {
            state.counter = 0
        }, 
    },
    actions: {
       
    }, 
    getters: {
        getTimer: (state) => state.timer, 
    }
}