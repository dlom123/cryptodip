export default {
  getCoins: ({ commit }) => {
    let coins = [
      {
        "id": 1,
        "cmcId": 74,
        "name": "Dogecoin",
        "symbol": "DOGE",
        "qty": 7607,
        "spent": 1300.00,
        "costAverage": 0,
        "currentPrice": 0,
        "costAverageDiff": 0,
      },
      // {
      //   "id": 2,
      //   "cmcId": 1027,
      //   "name": "Ethereum",
      //   "symbol": "ETH",
      //   "qty": 0.24865,
      //   "spent": 500.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 3,
      //   "cmcId": 1697,
      //   "name": "Basic Attention Token",
      //   "symbol": "BAT",
      //   "qty": 14.32,
      //   "spent": 0.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 4,
      //   "cmcId": 1896,
      //   "name": "0x",
      //   "symbol": "ZRX",
      //   "qty": 231.79,
      //   "spent": 400.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 5,
      //   "cmcId": 2405,
      //   "name": "IOST",
      //   "symbol": "IOST",
      //   "qty": 19528.0711,
      //   "spent": 1050.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 6,
      //   "cmcId": 3945,
      //   "name": "Harmony",
      //   "symbol": "ONE",
      //   "qty": 1661.2,
      //   "spent": 200.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 7,
      //   "cmcId": 1765,
      //   "name": "EOS",
      //   "symbol": "EOS",
      //   "qty": 45.4,
      //   "spent": 300.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 8,
      //   "cmcId": 1966,
      //   "name": "Decentraland",
      //   "symbol": "MANA",
      //   "qty": 266.99,
      //   "spent": 250.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 9,
      //   "cmcId": 4030,
      //   "name": "Algorand",
      //   "symbol": "ALGO",
      //   "qty": 70.596,
      //   "spent": 100.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
      // {
      //   "id": 10,
      //   "cmcId": 1,
      //   "name": "Bitcoin",
      //   "symbol": "BTC",
      //   "qty": 0.0036,
      //   "spent": 200.00,
      //   "costAverage": 0,
      //   "currentPrice": 0,
      //   "costAverageDiff": 0,
      // },
    ]

    // calculate and attach the cost average for each coin
    coins = coins.map(coin => ({
      ...coin,
      icon: `${process.env.VUE_APP_COIN_IMG_BASE_URL}/${coin['cmcId']}.png`,
      costAverage: coin.spent / coin.qty
    }))

    commit('setCoins', coins)
  },
  getCurrentPrices: async ({ commit, state }) => {
    const searchParams = new URLSearchParams()
    const coinIds = state.coins.map(coin => coin['cmcId'])
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
      const coinPriceObj = priceData.find(p => p['id'] === coin['cmcId'])
      try {
        var coinPrice = typeof coinPriceObj !== "undefined"
                        ? coinPriceObj['price']
                        : coin['currentPrice']
      } catch (err) {
        console.error(err, coin)
      }

      return {
        ...coin,
        currentPrice: coinPrice,
        costAverageDiff: (
          coin.spent > 0
          ? ((coin.costAverage - coinPrice) / coin.costAverage * 100).toFixed(2)
          : 0
        )
      }
    })

    commit('setCoins', updatedCoins)
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
