import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './store/user'
import generalModule from './store/general'
import wordsModule from './store/words'
import userDataModule from './store/userData'
import userVar from './store/userOtVar'





Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        generalModule,
        userModule,
        wordsModule,
        userDataModule,
        userVar
    },
})