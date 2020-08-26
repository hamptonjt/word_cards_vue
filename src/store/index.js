import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const HTTP = axios.create({
  baseURL: '//localhost:3000/'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words      : [],
    selectedSet: 0 // default to no set?
  },
  mutations: {
    'SETLISTDATA' (state, list) {
      state.words = list
    }
  },
  actions: {
    async loadData ({ commit }) {
      const response = await HTTP.get('/words')
      commit('SETLISTDATA', response.data)
      return response
    },
    async createWord ({ commit }, word) {
      const response = await HTTP.post('/words', word)
      if (response.status === 200) {
        const r = await HTTP.get('/words')
        commit('SETLISTDATA', r.data.result)
        return r
      } else {
        return response
      }
    }
  },
  getters: {
    getWords (state) {
      return state.words
    }
  },
  modules: {
  }
})
