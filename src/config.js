const APIBaseUrl = process.env.VUE_APP_API_BASE_URL

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
