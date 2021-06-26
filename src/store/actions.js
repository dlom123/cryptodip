import config from '@/config'

const MSG_MISSING_KEY = 'Missing or invalid CoinMarketCap API Key'
const MSG_TOO_MANY_REQUESTS = 'CoinMarketCap API request limit reached'

export default {
  addCoins: ({ commit, state }, coinIds) => {
    commit('mergeCoins', coinIds)
    // distribute badges when the coin list is changed
    state.coinLists[state.selectedCoinList].forEach(c => {
      commit('updateCoin', c)
    })
  },
  applyNewAmountToSpend: ({ commit, state }, newAmountToSpend) => {
    commit('setAmountToSpend', newAmountToSpend)
    state.coinLists[state.selectedCoinList].forEach(coin => {
      commit('updateCoin', coin)
    })
  },
  checkBackEndApiKey: async ({ commit }) => {
    const response = await fetch(`${config['endpoints']['hasKey']}`)
    const data = await response.json()
    commit('setHasBackEndApiKey', data['hasKey'])
  },
  deleteCoin: ({ commit, state }, coin) => {
    commit('removeCoin', coin)
    if (coin.badges.length > 0) {
      // if the removed coin had badges, redistribute badges across remaining coins
      state.coinLists[state.selectedCoinList].forEach(c => {
        commit('updateCoin', c)
      })
    }
  },
  getCmcApiInfo: async ({ commit, state }, force=false) => {
    if (force || state.autoRefreshApiUsage) {
      const headers = {}
      if (state.cmcApi.key) {
        // if a CMC API key has been entered, pass it along to the back-end as a custom header
        headers['X-CMC-API-Key'] = state.cmcApi.key
      }
      const response = await fetch(
        `${config['endpoints']['info']}`,
        {
          headers
        }
      )
      if (!response.ok) {
        commit('setCmcApi', {
          key: state.cmcApi.key,
          isValid: false
        })
      } else {
        var data = await response.json()

        commit('updateCmcApi', {
          key: state.cmcApi.key,
          ...data,
          isValid: true
        })
      }
    }
  },
  getCurrentPrices: async ({ commit, dispatch, state }, payload) => {
    const searchParams = new URLSearchParams()
    const coinIds = payload && Object.prototype.hasOwnProperty.call(payload, 'length') && payload.length > 0
      ? payload
      : state.coinLists[state.selectedCoinList].map(coin => coin['id'])
    searchParams.append('coinIds', coinIds)

    const headers = {}
    if (state.cmcApi.key) {
      // if a CMC API key has been entered, pass it along to the back-end as a custom header
      headers['X-CMC-API-Key'] = state.cmcApi.key
    }

    let priceData = []
    const response = await fetch(
      `${config['endpoints']['prices']}?${searchParams}`,
      {
        headers
      }
    )
    if (response.ok) {
      priceData = await response.json()
      // add current price and cost average difference
      // to each coin that was requested
      const updatedCoins = state.coinLists[state.selectedCoinList].map(coin => {
        const coinPriceObj = priceData.find(p => p['id'] === coin['id'])
        try {
          var coinPrice = typeof coinPriceObj !== "undefined"
            ? coinPriceObj['price']
            : coin['currentPrice']
        } catch (err) {
          console.error(err, coin)
        }

        return {
          ...coin,
          currentPrice: coinPrice
        }
      })

      if (!state.hasBackEndApiKey) {
        // only get API usage info if supplying an API key on the front-end
        await dispatch('getCmcApiInfo')
      }
      commit('setCoins', updatedCoins)
      updatedCoins.forEach(updatedCoin => {
        commit('updateCoin', updatedCoin)
      })
    } else if (response.status === 401) {
      commit('setSnackbarMessage', MSG_MISSING_KEY)
      commit('setShowSnackbar', true)
    } else if (response.status === 429) {
      commit('setSnackbarMessage', MSG_TOO_MANY_REQUESTS)
      commit('setShowSnackbar', true)
    }
  },
  syncCoins: async ({ commit, dispatch, state }) => {
    const headers = {}
    if (state.cmcApi.key) {
      // if a CMC API key has been entered, pass it along to the back-end as a custom header
      headers['X-CMC-API-Key'] = state.cmcApi.key
    }

    const response = await fetch(
      `${config['endpoints']['syncCoins']}`,
      {
        headers
      }
    )
    if (response.ok) {
      var allCoins = await response.json()
      if (!state.hasBackEndApiKey) {
        // only get API usage info if supplying an API key on the front-end
        await dispatch('getCmcApiInfo')
      }
      commit('setAllCoins', allCoins)
    } else if (response.status === 401) {
      commit('setSnackbarMessage', MSG_MISSING_KEY)
      commit('setShowSnackbar', true)
    } else if (response.status === 429) {
      commit('setSnackbarMessage', MSG_TOO_MANY_REQUESTS)
      commit('setShowSnackbar', true)
    }
  }
}
