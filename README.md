# <span style="color: #1976d2">Crypto</span><span style="color: #f44336">Dip</span>
**CryptoDip** is an app for identifying opportunities to lower the average cost of your cryptocurrency hodlings &mdash; aka the "*dips*".

Whether your portfolio is the result of cleverly crafted scientific research and sleepless nights of due diligence, or just hitching a ride on that YOLOmobile that just rolled into town, it's nice to be able to understand and visualize the impact on your hodlings whenever the next Elon tweet goes out or another international cryptocurrency ban occurs and the entire digital economy decides to momentarily take a dive.

CryptoDip is made to be very simple. There's no need to connect any exchange accounts or wallets, and your personal data is never sent over the network. Just enter your hodlings and catch the dip that you almost missed out on. Yeah...the one that could be happening right now!

---

## Accessing CryptoDip
1. [cryptodip.app](https://cryptodip.app) &mdash; the traditional way
1. [cryptodip.zil](https://cryptodip.zil) &mdash; a blockchain domain
    - While CryptoDip isn't a decentralized blockchain application itself, it just wouldn't feel complete without including some aspect of blockchain infrastructure. This has been done in a minimal way by setting up access to the app via the cryptodip.zil domain from [Unstoppable Domains](https://unstoppabledomains.com/). The domain itself lives on the [Zilliqa](https://www.zilliqa.com/) blockchain and, when accessed, simply references an `index.html` file within [IPFS](https://ipfs.io/). From there, it just redirects you to the traditional cryptodip.app domain. It's not much, but it's a small way to support technologies that are contributing to the decentralized Internet.
    - **Prerequisites** &mdash; Until blockchain domains are more widely accepted, there are [some steps](https://unstoppabledomains.com/blog/unstoppable-extension) involved to allow your web browser to recognize them.
1. **Self-hosted**
    - Clone this repository and run your own instance of CryptoDip! See the **Project Setup** section at the end of this README.

---

## Using CryptoDip
1. [Obtain a free CoinMarketCap API key](https://coinmarketcap.com/api/) and enter it into the API bar along the top of the app. You'll have to be okay with this being sent over the network to the CryptoDip API. Calm down...it's being sent over SSL and it's a free key that you can regenerate.
1. Start adding coins, entering your hodlings, and retrieving current coin prices! There are FAQ and Legend links in the app to help you get around.

---

## Project Setup (self-hosted)

### Prerequisites
- [Obtain a free CoinMarketCap API key](https://coinmarketcap.com/api/)

### Steps
1. Install dependencies

```
npm install
```

1. Build `dist` directory (front-end)

```
npm run build
```

1. Run both the API and front-end with a single command

```
npm run prod
```

1. Browse to the app on the displayed port using your web browser

1. Either enter your CoinMarketCap API key into the API bar along the top of the app, or copy the [`.env-sample`](.env-sample) file to create a `.env` file in the root directory and enter your API key there (requires restarting the server &mdash; the in-app API bar will no longer appear).

## How to Support this Project

### Donate
You can use the following Donate button to donate to [me](https://github.com/dlom123) using a number of different cryptocurrencies. Any donations are greatly appreciated. Thanks!

<a href="https://nowpayments.io/donation?api_key=9681YQY-VD646T7-J41YYN4-EN5YV3F" target="_blank"><img src="https://nowpayments.io/images/embeds/donation-button-white.svg" alt="Donate to CryptoDip's creator using NOWPayments" width="200"></a>

### Contribute
- Contribute code in the form of [Pull Requests](https://github.com/dlom123/cryptodip/pulls)
- Report bugs in the form of [Issues](https://github.com/dlom123/cryptodip/issues)

### Share
Tell others about CryptoDip if you think it could be useful to them!