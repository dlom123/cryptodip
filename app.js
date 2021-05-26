const express = require('express')
const app = express()
const port = 3000
const dotenv = require("dotenv")
const axios = require('axios')

dotenv.config()

app.use(express.static('dist'))

const HTTP = axios.create({
    headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
    }
})
  
app.listen(port, () => {
    console.log(`CryptoDip listening on port ${port}!`)
})

app.get('/', function(req,res) {
    res.sendFile('index.html')
})


app.get('/api/sync_coins', async (req, res) => {
    /*
    Retrieves data from the CoinMarketCap API for all listed coins.
    */
    let coinsResponse = []
    try {
        const response = await HTTP.get(`${process.env.CMC_API_BASE_URL}/cryptocurrency/map`)
        const coinData = response.data.data
        coinData.forEach(coin => {
            if (coin.is_active) {
                coinsResponse.push({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    icon: `${process.env.CMC_COIN_IMG_BASE_URL}/${coin.id}.png`
                })
            }
        })
    } catch (err) {
        console.error('Error:', err.message)
    }

    return res.json(coinsResponse)
})

app.get('/api/prices', async (req, res) => {
    const coinIds = req.query.coinIds
    if (!coinIds) {
        return res.status(400).json({
            error: 'missing coinIds parameter'
        })
    }

    let pricesResponse = []
    try {
        const url = `${process.env.CMC_API_BASE_URL}/cryptocurrency/quotes/latest`
        const params = `?id=${coinIds}`
        const response = await HTTP.get(`${url}${params}`)
        const coinData = response.data.data
        Object.values(coinData).forEach(coin => {
            if (coin.is_active) {
                pricesResponse.push({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    icon: `${process.env.CMC_COIN_IMG_BASE_URL}/${coin.id}.png`,
                    price: coin['quote']['USD']['price']
                })
            }
        })
    } catch (err) {
        console.error('Error:', err.message)
    }

    return res.json(pricesResponse)
})
