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
    setTableOptions: (state, payload) => {
        state.tableOptions = payload
    },
    updateCoin: (state, payload) => {
        // badge coins
        let bangCoin = undefined  // "Best Bang for the Buck"
        let dipperCoin = undefined  // "Big Dipper"
        let moonCoin = undefined  // "To the Moon!"

        state.coins = state.coins.map(coin => {
            coin.badges = []

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

            // badge calculations
            if (state.amountToSpend > 0) {
                // "Best Bang for the Buck" badge
                const bangPercent = (
                    (coin.costAverage - (coin.spent + state.amountToSpend)
                    / ((state.amountToSpend / coin.currentPrice) + coin.qty))
                    / coin.costAverage
                )
                console.log(`${coin.name} bangPercent: ${bangPercent}`)
                if (
                    typeof bangCoin === 'undefined'
                    || bangPercent > bangCoin.bangPercent
                ) {
                    bangCoin = {
                        id: coin.id,
                        bangPercent
                    }
                }
            }

            // "Big Dipper" badge
            if (
                typeof dipperCoin === 'undefined'
                || coin.costAverageDiff > dipperCoin.costAverageDiff
            ) {
                dipperCoin = {
                    id: coin.id,
                    costAverageDiff: coin.costAverageDiff
                }
            }

            // "To the Moon!" badge
            if (
                typeof moonCoin === 'undefined'
                || coin.costAverageDiff < moonCoin.costAverageDiff
            ) {
                moonCoin = {
                    id: coin.id,
                    costAverageDiff: coin.costAverageDiff
                }
            }

            return coin
        })

        // assign badges
        state.coins = state.coins.map(coin => {
            // "Best Bang for the Buck" badge
            if (coin.id === bangCoin.id) {
                if (!coin.badges.includes('bang')) {
                    coin.badges.push('bang')
                }
            } else {
                const bangIndex = coin.badges.indexOf('bang')
                if (bangIndex !== -1) {
                    coin.badges.splice(bangIndex, 1)
                }
            }

            if (coin.id === dipperCoin.id) {
                if (!coin.badges.includes('dipper')) {
                    coin.badges.push('dipper')
                }
            } else {
                const dipperIndex = coin.badges.indexOf('dipper')
                if (dipperIndex !== -1) {
                    coin.badges.splice(dipperIndex, 1)
                }
            }

            if (coin.id === moonCoin.id) {
                if (!coin.badges.includes('moon')) {
                    coin.badges.push('moon')
                }
            } else {
                const moonIndex = coin.badges.indexOf('moon')
                if (moonIndex !== -1) {
                    coin.badges.splice(moonIndex, 1)
                }
            }

            console.log(coin.name, coin.badges)
            return coin
        })
    },
    updateCoins: (state, payload) => {
        state.coins = payload
    }
}
