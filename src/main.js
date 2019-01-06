import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import VueLodash from 'lodash'
import 'firebase/firestore'
import VuetifyConfirm from 'vuetify-confirm'


Vue.use(Vuetify)
Vue.use(VueLodash)

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

  },

}).$mount('#app')
