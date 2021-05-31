import Vue from 'vue'

export default {
    mergeCoins: (state, coinIds) => {
        const keepCoins = state.coins.filter(coin => coinIds.includes(coin.id))
        const newCoinIds = coinIds.filter(coinId => 
            !state.coins.map(coin => coin.id).includes(coinId))
        const newCoins = state.allCoins
            .filter(coin => newCoinIds.includes(coin.id))
        state.coins = keepCoins
        state.coins.push(...newCoins)
    },
    removeCoin: (state, payload) => {
        state.coins = state.coins.filter(coin => coin.id !== payload.id)
    },
    setAmountToSpend: (state, payload) => {
        state.amountToSpend = payload
    },
    setAllCoins: (state, payload) => {
        state.allCoins = payload
    },
    setCoins: (state, payload) => {
        state.coins = payload
    },
    setSearchValue: (state, payload) => {
        state.searchValue = payload
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

            let updatedCoin = {
                ...coin
            }
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

                updatedCoin = {
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
                    (updatedCoin.costAverage - (updatedCoin.spent + state.amountToSpend)
                    / ((state.amountToSpend / updatedCoin.currentPrice) + updatedCoin.qty))
                    / updatedCoin.costAverage
                )
                if (
                    (
                        typeof bangCoin === 'undefined'
                        || bangPercent > bangCoin.bangPercent
                    )
                    && updatedCoin.costAverageDiff > 0
                ) {
                    bangCoin = {
                        id: updatedCoin.id,
                        bangPercent
                    }
                }
            }

            // "Big Dipper" badge
            if (
                (
                    typeof dipperCoin === 'undefined'
                    || updatedCoin.costAverageDiff > dipperCoin.costAverageDiff
                )
                && updatedCoin.costAverageDiff > 0
            ) {
                dipperCoin = {
                    id: updatedCoin.id,
                    costAverageDiff: updatedCoin.costAverageDiff
                }
            }

            // "To the Moon!" badge
            if (
                (
                    typeof moonCoin === 'undefined'
                    || updatedCoin.costAverageDiff < moonCoin.costAverageDiff
                )
                && updatedCoin.costAverageDiff < 0
            ) {
                moonCoin = {
                    id: updatedCoin.id,
                    costAverageDiff: updatedCoin.costAverageDiff
                }
            }

            return updatedCoin
        })

        // assign badges
        state.coins = state.coins.map(coin => {
            // "Best Bang for the Buck" badge
            if (
                typeof bangCoin !== 'undefined'
                && coin.id === bangCoin.id
            ) {
                if (!coin.badges.includes('bang')) {
                    coin.badges.push('bang')
                }
            } else {
                const bangIndex = coin.badges.indexOf('bang')
                if (bangIndex !== -1) {
                    coin.badges.splice(bangIndex, 1)
                }
            }

            if (
                typeof dipperCoin !== 'undefined'
                && coin.id === dipperCoin.id
            ) {
                if (!coin.badges.includes('dipper')) {
                    coin.badges.push('dipper')
                }
            } else {
                const dipperIndex = coin.badges.indexOf('dipper')
                if (dipperIndex !== -1) {
                    coin.badges.splice(dipperIndex, 1)
                }
            }

            if (
                typeof moonCoin !== 'undefined'
                && coin.id === moonCoin.id
            ) {
                if (!coin.badges.includes('moon')) {
                    coin.badges.push('moon')
                }
            } else {
                const moonIndex = coin.badges.indexOf('moon')
                if (moonIndex !== -1) {
                    coin.badges.splice(moonIndex, 1)
                }
            }

            return coin
        })
    },
    updateCoins: (state, payload) => {
        payload.forEach(coin => {
            let existingIndex = state.coins.findIndex(stateCoin => stateCoin.id === coin.id)
            if (existingIndex > -1) {
                const updatedCoin = {
                    ...state.coins[existingIndex],
                    ...coin
                }
                Vue.set(state.coins, existingIndex, updatedCoin)
            } else {
                state.coins.push(coin)
            }
        })
    }
}
