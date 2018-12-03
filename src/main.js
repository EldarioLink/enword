import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import VuetifyConfirm from 'vuetify-confirm'
  


 
Vue.use(Vuetify)

Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig);

Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет', 
  width: 400, 
})


new Vue({ 
  router,
  store,
  render: h => h(App),
  created(){
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
    
     vm.$store.dispatch('STATE_CHANGED', user)
        // User is signed out.
        // ...
    });
  }
}).$mount('#app')
