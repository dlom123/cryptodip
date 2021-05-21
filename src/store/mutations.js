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
    updateCoins: (state, payload) => {
        state.coins = payload
    }
}
