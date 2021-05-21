export default {
    removeCoin: (state, payload) => {
        state.coins = state.coins.filter(coin => coin.id !== payload.id)
    },
    setAllCoins: (state, payload) => {
        state.allCoins = payload
    },
    setCoins: (state, coinIds) => {
        const coins = state.allCoins
            .filter(coin => coinIds.includes(coin.id))
        state.coins = coins
    },
    updateCoins: (state, payload) => {
        console.log(state)
        console.log(payload)
    }
}
