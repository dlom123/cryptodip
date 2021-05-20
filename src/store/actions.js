export default {
    getCoins: ({ commit }) => {
        const coins = [
            {
              "id": 1,
              "name": "Dogecoin",
              "symbol": "DOGE",
              "icon": "dogecoin.png",
              "qty": 7607,
              "spent": 1300.00
            },
            {
              "id": 2,
              "name": "Ethereum",
              "symbol": "ETH",
              "icon": "ethereum.png",
              "qty": 70.596,
              "spent": 100.00
            },
            {
                "id": 3,
                "name": "Basic Attention Token",
                "symbol": "BAT",
                "icon": "basicAttentionToken.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 4,
                "name": "0x",
                "symbol": "ZRX",
                "icon": "0x.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 5,
                "name": "IOST",
                "symbol": "IOST",
                "icon": "iost.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 6,
                "name": "Harmony",
                "symbol": "ONE",
                "icon": "harmony.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 7,
                "name": "EOS",
                "symbol": "EOS",
                "icon": "eos.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 8,
                "name": "Decentraland",
                "symbol": "MANA",
                "icon": "decentraland.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 9,
                "name": "Algorand",
                "symbol": "ALGO",
                "icon": "algorand.png",
                "qty": 70.596,
                "spent": 100.00
              },
              {
                "id": 10,
                "name": "Bitcoin",
                "symbol": "BTC",
                "icon": "bitcoin.png",
                "qty": 70.596,
                "spent": 100.00
              },
                        ]
        commit('setCoins', coins)
    },
    getCurrentPrices: ({ commit }) => {
        const prices = {
            "Dogecoin": 0.3617,
            "Ethereum": 1.02,
            "Basic Attention Token": 0.86,
            "0x": 1.15,
            "IOST": 0.03384,
            "Harmony": 0.1286,
            "EOS": 6.35,
            "Decentraland": 0.8922,
            "Algorand": 1.02,
            "Bitcoin": 40066.25
        }
        commit('setPrices', prices)
    }
}
