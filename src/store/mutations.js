export default {
    removeCoin: (state, payload) => {
        state.coins = state.coins.filter(coin => coin.id !== payload.id)
    },
    setAllCoins: (state, payload) => {
        state.allCoins = payload
    },
    setCoins: (state, payload) => {
        state.coins = payload
    }
}
