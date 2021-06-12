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
    cmcApi: {},
    coinLists: {},
    hasBackEndApiKey: false,
    searchValue: null,
    selectedCoins: [],
    selectedCoinList: "Dips",
    showSnackbar: false,
    snackbarMessage: null,
    tableOptions: {}
  },
  mutations,
  actions,
  modules: {}
})
