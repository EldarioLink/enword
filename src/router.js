import Vue from 'vue'
import Router from 'vue-router' 
import Home from './views/Home.vue' 

import Score from './views/Score.vue' 

import Signup from './views/Signup.vue' 

import Signin from './views/Signin.vue'  
import Start from './views/Start.vue'  
import Store from './store'  




Vue.use(Router)

export default new Router ({
    routes:[
        {
        path: '/',
        name: 'home',
        component: Home
        },
        {
         path: '/score',
         name: 'score',
         component: Score,
         props: true,
         beforeEnter: AuthGuard
        },
        {
          path: '/signin',
          name: 'signin',
          component: Signin
         },
         {
           path: '/signup',
           name: 'signup',
           component: Signup
         },
         {
            path: '/start',
            name: 'start',
            component: Start
          },
       

    ],
    mode: 'history'
})

function AuthGuard(from, to, next){
if(Store.getters.isUserAuthenticated)
next()
else
next('/signin')
}