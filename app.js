const express = require('express')
const app = express()
const port = 3000
const dotenv = require("dotenv")
const axios = require('axios')
const config = require('./config')

dotenv.config()

app.use(express.static('dist'))

const HTTP = axios.create({
    baseURL: config['CMC']['APIBaseUrl'],
    headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'deflate, gzip',
    }
})

app.listen(port, () => {
    console.log(`CryptoDip listening on port ${port}!`)
})

app.get('/', function (req, res) {
    res.sendFile('index.html')
})

function getRequestApiKey(req) {
    return Object.prototype.hasOwnProperty.call(req.headers, 'x-cmc-api-key')
        ? req.headers['x-cmc-api-key']
        : process.env.CMC_API_KEY
}

app.get('/api/has-key', async (req, res) => {
    return res.json({ "hasKey": !!process.env.CMC_API_KEY })
})

app.get('/api/info', async (req, res) => {
    const headers = {}
    const apiKey = getRequestApiKey(req)
    if (apiKey) {
        headers['X-CMC_PRO_API_KEY'] = apiKey
    }

    await HTTP.get('/key/info', { headers })
        .then(response => {
            res.json(response.data.data)
        })
        .catch(error => {
            return res.status(error.response.status).json({ error: error.message })
        })
})

app.get('/api/prices', async (req, res) => {
    const coinIds = req.query.coinIds
    if (!coinIds) {
        return res.status(400).json({
            error: 'missing coinIds parameter'
        })
    }

    const headers = {}
    const apiKey = getRequestApiKey(req)
    if (apiKey) {
        headers['X-CMC_PRO_API_KEY'] = apiKey
    }

    let pricesResponse = []
    const params = `?id=${coinIds}`
    await HTTP.get(`/cryptocurrency/quotes/latest${params}`, { headers })
        .then(response => {
            const coinData = response.data.data
            Object.values(coinData).forEach(coin => {
                if (coin.is_active) {
                    pricesResponse.push({
                        id: coin.id,
                        name: coin.name,
                        symbol: coin.symbol,
                        icon: `${config['CMC']['coinImgBaseUrl']}/${coin.id}.png`,
                        price: coin['quote']['USD']['price']
                    })
                }
            })
            return res.json(pricesResponse)
        })
        .catch(error => {
            return res.status(error.response.status).json({ error: error.message })
        })

})

app.get('/api/sync_coins', async (req, res) => {
    /*
    Retrieves data from the CoinMarketCap API for all listed coins.
    */
    const headers = {}
    const apiKey = getRequestApiKey(req)
    if (apiKey) {
        headers['X-CMC_PRO_API_KEY'] = apiKey
    }

    let coinsResponse = []
    await HTTP.get('/cryptocurrency/map', { headers })
        .then(response => {
            const coinData = response.data.data
            coinData.forEach(coin => {
                if (coin.is_active) {
                    coinsResponse.push({
                        id: coin.id,
                        name: coin.name,
                        symbol: coin.symbol,
                        icon: `${config['CMC']['coinImgBaseUrl']}/${coin.id}.png`
                    })
                }
            })

            return res.json(coinsResponse)
        })
        .catch(error => {
            return res.status(error.response.status).json({ error: error.message })
        })
})
