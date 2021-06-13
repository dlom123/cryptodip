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
    nowApiKey: null,  // for donations via NOWPayments
    searchValue: null,
    selectedCoinList: "Dips",
    selectedCoins: [],
    showSnackbar: false,
    snackbarMessage: null,
    tableOptions: {}
  },
  mutations,
  actions,
  modules: {}
})
