import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-cryptodip',
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    allCoins: [],
    coins: []
  },
  mutations,
  actions,
  modules: {}
})
