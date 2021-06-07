import config from '@/config'

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
  deleteCoin: ({ commit, state }, coin) => {
    commit('removeCoin', coin)
    if (coin.badges.length > 0) {
      // if the removed coin had badges, redistribute badges across remaining coins
      state.coinLists[state.selectedCoinList].forEach(c => {
        commit('updateCoin', c)
      })
    }
  },
  getCmcApiInfo: async ({ commit }, apiKey) => {
    if (!apiKey) {
      commit('setCmcApi', {})
    } else {
      const headers = {}
      if (apiKey) {
        // if a CMC API key has been entered, pass it along to the back-end as a custom header
        headers['X-CMC-API-Key'] = apiKey
      }
      const response = await fetch(
        `${config['endpoints']['info']}`,
        {
          headers
        }
      )
      if (!response.ok) {
        commit('setCmcApi', {
          key: apiKey,
          isValid: false
        })
      } else {
        var data = await response.json()

        commit('updateCmcApi', {
          key: apiKey,
          ...data,
          isValid: true
        })
      }
    }
  },
  getCurrentPrices: async ({ commit, state }) => {
    const searchParams = new URLSearchParams()
    const coinIds = state.coinLists[state.selectedCoinList].map(coin => coin['id'])
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

      commit('setCoins', updatedCoins)
      updatedCoins.forEach(updatedCoin => {
        commit('updateCoin', updatedCoin)
      })
    } else {
      if (response.status === 401) {
        commit('setShowSnackbar', true)
      }
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
      // update API usage data
      await dispatch('getCmcApiInfo')
      commit('setAllCoins', allCoins)
    } else {
      if (response.status === 401) {
        commit('setShowSnackbar', true)
      }
    }
  }
}
