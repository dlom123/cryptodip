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
  deleteCoin: ({ commit, state}, coin) => {
    commit('removeCoin', coin)
    if (coin.badges.length > 0) {
      // if the removed coin had badges, redistribute badges across remaining coins
      state.coinLists[state.selectedCoinList].forEach(c => {
        commit('updateCoin', c)
      })
    }
  },
  getCurrentPrices: async ({ commit, state }) => {
    const searchParams = new URLSearchParams()
    const coinIds = state.coinLists[state.selectedCoinList].map(coin => coin['id'])
    searchParams.append('coinIds', coinIds)

    let priceData = []
    try {
      const response = await fetch(`${config['endpoints']['prices']}?${searchParams}`)
      priceData = await response.json()
    } catch(err) {
      console.error('Error:', err)
    }

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
  },
  syncCoins: async ({ commit }) => {
    try {
      const response = await fetch(`${config['endpoints']['syncCoins']}`)
      var allCoins = await response.json()
    } catch(err) {
      console.error('Error:', err)
    }

    commit('setAllCoins', allCoins)
  }
}
