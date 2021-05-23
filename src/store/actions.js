export default {
  applyNewAmountToSpend: ({ commit, state }, newAmountToSpend) => {
    commit('setAmountToSpend', newAmountToSpend)
    state.coins.forEach(coin => {
      commit('updateCoin', coin)
    })
  },
  getCurrentPrices: async ({ commit, state }) => {
    const searchParams = new URLSearchParams()
    const coinIds = state.coins.map(coin => coin['id'])
    searchParams.append('coinIds', coinIds)

    let priceData = []
    try {
      const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/prices?${searchParams}`)
      priceData = await response.json()
    } catch(err) {
      console.error('Error:', err)
    }

    // add current coin price and cost average difference
    // to each coin that was requested
    const updatedCoins = state.coins.map(coin => {
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

    commit('updateCoins', updatedCoins)
    updatedCoins.forEach(updatedCoin => {
      commit('updateCoin', updatedCoin)
    })
  },
  syncCoins: async ({ commit }) => {
    try {
      const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/sync_coins`)
      var allCoins = await response.json()
    } catch(err) {
      console.error('Error:', err)
    }

    commit('setAllCoins', allCoins)
  }
}
