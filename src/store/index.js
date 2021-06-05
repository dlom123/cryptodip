import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'
import VuexPersist from 'vuex-persist'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex-cryptodip',
  storage: window.localStorage
})

export default createStore(Vuex.Store, {
  plugins: [vuexLocalStorage.plugin],
  state: {
    allCoins: [],
    amountToSpend: null,
    coinLists: {},
    searchValue: null,
    selectedCoins: [],
    selectedCoinList: "Dips",
    tableOptions: {}
  },
  mutations,
  actions,
  modules: {}
})
