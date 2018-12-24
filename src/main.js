import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import 'firebase/firestore'
import VuetifyConfirm from 'vuetify-confirm'


Vue.use(Vuetify)

Vue.config.productionTip = false
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

db.settings({
  timestampsInSnapshots: true
});

Vue.$db = db

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  width: 400,
})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let vm = this
    // наблюдатель который вызывается при изменений состояния входа пользователя
    firebase.auth().onAuthStateChanged((user) => {
      vm.$store.dispatch('STATE_CHANGED', user).then(() => {
        if (this.$store.getters.userId) {
          this.$store
            .dispatch("LENGTH_DATA_WORDS")
            .then(length => {
              if (length != 0) {
                this.$store.dispatch("LOAD_SAVE_WORDS");
              } else {
                this.$store.dispatch("LOAD_WORDS");
              }
            });
        }
      })


    });



  },

}).$mount('#app')
