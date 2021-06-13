const APIPort = 3000
const APIBaseUrl = `http://localhost:${APIPort}/api`

const config = {
    CMC: {
        APIBaseUrl: 'https://pro-api.coinmarketcap.com/v1',
        coinPageBaseUrl: 'https://coinmarketcap.com/currencies',
        coinImgBaseUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64'
    },
    endpoints: {
        hasKey: `${APIBaseUrl}/has-key`,
        info: `${APIBaseUrl}/info`,
        prices: `${APIBaseUrl}/prices`,
        syncCoins: `${APIBaseUrl}/sync_coins`
    }
}

module.exports = config
