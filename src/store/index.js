import Vue from 'vue'
import Vuex from 'vuex'
import http from 'axios'
Vue.use(Vuex)

export const INCREMENT = 'INCREMENT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'
const store = new Vuex.Store({
  state: {
    count: 1,
    jwt: localStorage.getItem('tAG'),
    userName: localStorage.getItem('AGname'),
    isLoged: !!localStorage.getItem('tAG')
  },
  getters: {
    getCount (state) {
      return state.count
    },
    getIsLoged (state) {
      return state.isLoged
    },
    getUserName (state) {
      return state.userName
    }
  },
  actions: {
    login ({ commit }, payload) {
      return http
        .post(`${process.env.API}/AG/auth/login`, payload)
        .then(response => response.data)
        .then(response => {
          console.log('peticion API')
          let alias = payload.alias
          localStorage.setItem('AGname', alias)
          localStorage.setItem('tAG', response.token)
          commit(LOGIN_SUCCESS, alias)
        })
    },
    logout ({ commit }) {
      localStorage.removeItem('AGname')
      localStorage.removeItem('tAG')
      commit(LOGOUT)
    }
  },
  mutations: {
    [INCREMENT] (state) {
      let suma = state.count + 1
      Vue.set(state, 'count', suma)
      // state.count++
    },
    [LOGIN_SUCCESS] (state, alias) {
      Vue.set(state, 'userName', alias)
      Vue.set(state, 'jwt', localStorage.getItem('tAG'))
      Vue.set(state, 'isLoged', true)
    },
    [LOGOUT] (state, alias) {
      Vue.set(state, 'userName', '')
      Vue.set(state, 'jwt', '')
      Vue.set(state, 'isLoged', false)
    }
  }
})

export default store
