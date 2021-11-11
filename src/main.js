// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// https://elabismodenull.wordpress.com/2017/05/31/vuejs-los-estados-y-getters-en-vuex/
// https://hackernoon.com/jwt-authentication-in-vue-js-and-django-rest-framework-part-2-788f0ad53ad5
// https://medium.com/front-end-hacking/persisting-user-authentication-with-vuex-in-vue-b1514d5d3278
// http://stackabuse.com/single-page-apps-with-vue-js-and-flask-jwt-authentication/
import Vue from 'vue'
import AgApp from '@/App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from '@/store'
import VueSocketio from 'vue-socket.io'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueSocketio, `${process.env.SOKETS}`)
Vue.use(VueApexCharts)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)

/* eslint-disable no-new */
new Vue({
  el: '#AGapp',
  router,
  store,
  template: '<ag-app/>',
  components: { AgApp }
})
