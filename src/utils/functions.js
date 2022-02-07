function getNumDecimals(n, isFlexible = false, fullPrecision = false) {
    const nSplit = n.toString().replace(/[$,]/g, '').split(".")
    if (fullPrecision && nSplit.length > 1) {
        // return the original full precision decimal length, if requested
        return nSplit[1].length
    }
    let numDecimals = 2
    if (typeof n !== 'undefined' && n !== null) {
        if (n < 1.0 && n > 0.0) {
            const nSplit = n.toString().replace(/[$,]/g, '').split(".")
            numDecimals = n < 1.0 ? 4 : 2
            if (isFlexible && nSplit.length > 1) {
                // extend decimal precision for numbers < 0 that
                // have leading zeros in the decimal portion
                const dec = nSplit[1]
                const numLeadingZeros = dec.length - dec.replace(/^0+/, '').length
                numDecimals += numLeadingZeros
            }
        }

        return numDecimals
    }
}

export function formatDollars(n, options = {}) {
    const { isFlexible, fullPrecision } = options
    if (typeof n !== 'undefined' && n !== null) {
        const numDecimals = getNumDecimals(n, isFlexible, fullPrecision)
        return n.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: numDecimals
        })
    }
    return n
}

export function formatNumber(n, isFlexible = false, fullPrecision = false) {
    if (typeof n !== 'undefined' && !isNaN(n)) {
        return parseFloat(n).toLocaleString("en-US", {
            'maximumFractionDigits': getNumDecimals(n, isFlexible, fullPrecision)
        })
    }
    return n
}

export function formatPercentage(n) {
    if (typeof n !== 'undefined' && !isNaN(n)) {
        return `${n.toLocaleString('en-US')}%`
    }
    return n
}

export function getTotalCurrentValue(coins) {
    let total = null;
    if (coins.length) {
        const prices = coins
            .filter((coin) =>
                Object.prototype.hasOwnProperty.call(coin, "currentPrice")
            )
            .map((coin) => coin.qty * coin.currentPrice)
            .filter((price) => !isNaN(price));
        if (prices.length) {
            total = prices.reduce((a, b) => a + b, 0);
        }
        return !isNaN(total) ? total : null;
    }
    return null;
}

export function yoloHodls(amount, coin) {
    // Returns what your new quantity of the coin would be based on your amount to spend
    return amount / coin.currentPrice + coin.qty;
}

export function yoloYolod(amount, coin) {
    return amount + coin.spent;
}
