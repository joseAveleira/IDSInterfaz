import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/AgHello'
import AgLogin from '@/components/AgLogin'
import AgMain from '@/components/AgMain'
import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue',
      name: 'home',
      component: Hello
    },
    {
      path: '/vue/login',
      name: 'login',
      component: AgLogin
    },
    {
      path: '/vue/main',
      name: 'main',
      component: AgMain,
      beforeEnter (to, from, next) {
        if (!store.getters.getIsLoged) {
          next('/vue/login')
        } else {
          next()
        }
      }
    }
  ]
})
