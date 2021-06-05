# CryptoDip
**CryptoDip** is an app for identifying opportunities to lower the average cost of your cryptocurrency hodlings &mdash; aka the "*dips*".

---

## Requirements
1. **CoinMarketCap API Key** &mdash; Since all coin data is pulled from the CoinMarketCap API, you will need to [obtain an API key](https://coinmarketcap.com/api/) and place it in a `.env` file in the project's root directory.

Example .env file
```
CMC_API_KEY=<your API key>
```


---

## Project setup
1. Install dependencies

```
npm install
```

2. Build `dist` directory (front-end)

```
npm run build
```

3. Run both the API and front-end with a single command

```
# development (hot-reload using nodemon)...
npm run dev

# ...or production
npm run server
```

4. Browse to the app on the displayed port using your web browser!

---

## Other

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
