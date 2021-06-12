function getNumDecimals(n, isFlexible=false) {
    let numDecimals = 2
    if (typeof n !== 'undefined' && n !== null) {
        const nSplit = n.toString().replace(/[$,]/g, '').split(".")
        if (n < 1.0) {
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

export function formatDollars(n, isFlexible=false) {
    if (typeof n !== 'undefined' && n !== null) {
        const numDecimals = getNumDecimals(n, isFlexible)

        return n.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: numDecimals
        })
    }
    return n
}

export function formatNumber(n, isFlexible=false) {
    if (typeof n !== 'undefined') {
        const numDecimals = getNumDecimals(n, isFlexible)
        return parseFloat(n).toLocaleString("en-US", {
            maximumFractionDigits: numDecimals
        })
    }
    return n
}

export function formatPercentage(n) {
    if (typeof n !== 'undefined') {
        return `${n.toLocaleString('en-US')}%`
    }
    return n
}
