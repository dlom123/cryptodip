import Vue from 'vue'

export default {
    addCoinList: (state, payload) => {
        Vue.set(state.coinLists, payload, [])
    },
    mergeCoins: (state, coinIds) => {
        const coins = state.coinLists[state.selectedCoinList]
        const keepCoins = coins.filter(coin => coinIds.includes(coin.id))
        const newCoinIds = coinIds.filter(coinId =>
            !coins.map(coin => coin.id).includes(coinId))
        const newCoins = state.allCoins
            .filter(coin => newCoinIds.includes(coin.id))
        state.coinLists[state.selectedCoinList] = keepCoins
        state.coinLists[state.selectedCoinList].push(...newCoins)
    },
    removeCoin: (state, payload) => {
        state.coinLists[state.selectedCoinList] = state.coinLists[state.selectedCoinList].filter(coin => coin.id !== payload.id)
    },
    removeCoinAlert: (state, payload) => {
        state.coinLists[state.selectedCoinList] = state.coinLists[state.selectedCoinList].map(coin => {
            if (coin.id === payload.coinId) {
                const updatedCoin = {
                    ...coin,
                    alerts: {}
                }
                return updatedCoin
            }
            return coin
        })
    },
    removeCoinList: (state, payload) => {
        Vue.delete(state.coinLists, payload)
    },
    setAmountToSpend: (state, payload) => {
        state.amountToSpend = payload
    },
    setAllCoins: (state, payload) => {
        state.allCoins = payload
    },
    setAutoRefreshApiUsage: (state, payload) => {
        state.autoRefreshApiUsage = payload
    },
    setCmcApi: (state, payload) => {
        state.cmcApi = payload
    },
    setCoinAlerts: (state, payload) => {
        state.coinLists[state.selectedCoinList] = state.coinLists[state.selectedCoinList].map(coin => {
            if (coin.id === payload.coinId) {
                const updatedCoin = {
                    ...coin,
                    alerts: {
                        ...payload.alerts
                    }
                }
                return updatedCoin
            }
            return coin
        })
    },
    setCoins: (state, payload) => {
        state.coinLists[state.selectedCoinList] = payload
    },
    setHasBackEndApiKey: (state, payload) => {
        state.hasBackEndApiKey = payload
    },
    setNowApiKey: (state, payload) => {
        state.nowApiKey = payload
    },
    setSearchValue: (state, payload) => {
        state.searchValue = payload
    },
    setSelectedCoinList: (state, payload) => {
        state.selectedCoinList = payload
    },
    setShowSnackbar: (state, payload) => {
        state.showSnackbar = payload
    },
    setSnackbarMessage: (state, payload) => {
        state.snackbarMessage = payload
    },
    setTableOptions: (state, payload) => {
        state.tableOptions = payload
    },
    updateCmcApi: (state, payload) => {
        state.cmcApi = {
            ...state.cmcApi,
            ...payload
        }
    },
    updateCoin: (state, payload) => {
        // badge coins
        let bangCoin = undefined  // "Best Bang for the Buck"
        let dipperCoin = undefined  // "Big Dipper"
        let moonCoin = undefined  // "To the Moon!"

        state.coinLists[state.selectedCoinList] = state.coinLists[state.selectedCoinList].map(coin => {
            coin.alerts = { ...coin.alerts }
            coin.badges = []
            coin.isPinned = !!coin.isPinned

            let updatedCoin = {
                ...coin
            }
            if (coin.id === payload.id) {
                let costAverage = undefined
                let newQty = Object.prototype.hasOwnProperty.call(payload, 'qty')
                    ? payload.qty
                    : coin.qty
                let newSpent = Object.prototype.hasOwnProperty.call(payload, 'spent')
                    ? payload.spent
                    : coin.spent
                if (typeof newQty !== 'undefined' && typeof newSpent !== 'undefined') {
                    costAverage = newQty <= 0 ? undefined : newSpent / newQty
                }

                let costAverageDiff = undefined
                if (typeof costAverage !== 'undefined' && typeof coin.currentPrice !== 'undefined') {
                    costAverageDiff = costAverage <= 0 ? undefined : (costAverage - coin.currentPrice) / costAverage * 100
                }

                updatedCoin = {
                    ...coin,
                    ...payload,
                    costAverage,
                    costAverageDiff,
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
        state.coinLists[state.selectedCoinList] = state.coinLists[state.selectedCoinList].map(coin => {
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
            let existingIndex = state.coinLists[state.selectedCoinList].findIndex(stateCoin => stateCoin.id === coin.id)
            if (existingIndex > -1) {
                const updatedCoin = {
                    ...state.coinLists[state.selectedCoinList][existingIndex],
                    ...coin
                }
                Vue.set(state.coinLists[state.selectedCoinList], existingIndex, updatedCoin)
            } else {
                state.coinLists[state.selectedCoinList].push(coin)
            }
        })
    },
    updateGuides: (state, payload) => {
        state.guides = {
            ...state.guides,
            ...payload
        }
    }
}
