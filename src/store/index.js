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

const defaultCoinList = {
  text: "Dips",
  value: "dips"
}

export default createStore(Vuex.Store, {
  plugins: [vuexLocalStorage.plugin],
  state: {
    allCoins: [],
    amountToSpend: null,
    coinLists: [defaultCoinList],
    coins: [],
    searchValue: null,
    selectedCoins: [],
    selectedCoinList: defaultCoinList,
    tableOptions: {}
  },
  mutations,
  actions,
  modules: {}
})
