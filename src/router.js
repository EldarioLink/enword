import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Score from './views/Score.vue'

import Signup from './views/Signup.vue'

import Signin from './views/Signin.vue'
import Start from './views/Start.vue'
import Store from './store'
import addword from './views/addword.vue'




Vue.use(Router)

let router = new Router({
  routes: [
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
    {
      path: '/addword',
      name: 'addword',
      component: addword,
      meta: { authRequired: true }
    },

  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  Store.dispatch('INIT_AUTH')
    .then(user => {
      if (to.matched.some(route => route.meta.authRequired)) {
        if (user)
          next()
        else
          next('/signin')
      }
      else {
        next()
      }
    })
})


export default router
