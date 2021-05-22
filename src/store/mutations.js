export default {
    removeCoin: (state, payload) => {
        state.coins = state.coins.filter(coin => coin.id !== payload.id)
    },
    setAllCoins: (state, payload) => {
        state.allCoins = payload
    },
    setCoins: (state, coinIds) => {
        const keepCoins = state.coins.filter(coin => coinIds.includes(coin.id))
        const newCoinIds = coinIds.filter(coinId => 
            !state.coins.map(coin => coin.id).includes(coinId))
        const newCoins = state.allCoins
            .filter(coin => newCoinIds.includes(coin.id))
        state.coins = keepCoins
        state.coins.push(...newCoins)
    },
    updateCoin: (state, payload) => {
        state.coins = state.coins.map(coin => {
            if (coin.id === payload.id) {
                let costAverage = undefined
                let newQty = typeof payload.qty !== 'undefined'
                                ? payload.qty
                                : coin.qty
                let newSpent = typeof payload.spent !== 'undefined'
                                ? payload.spent
                                : coin.spent

                if (typeof newQty !== 'undefined' && typeof newSpent !== 'undefined') {
                    costAverage = newSpent / newQty
                }

                let costAverageDiff = coin.costAverageDiff
                if (typeof costAverage !== 'undefined' && typeof coin.currentPrice !== 'undefined') {
                    costAverageDiff = (costAverage - coin.currentPrice) / costAverage * 100
                }

                return {
                    ...coin,
                    ...payload,
                    costAverage,
                    costAverageDiff
                }
            }
            return coin
        })
    },
    updateCoins: (state, payload) => {
        state.coins = payload
    }
}
