function getNumDecimals(n, isFlexible=false) {
    if (typeof n !== 'undefined' && n !== null) {
        const nSplit = n.toString().replace(/[$,]/g, '').split(".")
        let numDecimals = n < 1.0 ? 4 : 2
        if (isFlexible && n < 1.0 && nSplit.length > 1) {
            // extend decimal precision for numbers < 0 that
            // have leading zeros in the decimal portion
            const dec = nSplit[1]
            const numLeadingZeros = dec.length - dec.replace(/^0+/, '').length
            numDecimals += numLeadingZeros
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
}

export function formatNumber(n, isFlexible=false) {
    if (typeof n !== 'undefined') {
        const numDecimals = getNumDecimals(n, isFlexible)
        return parseFloat(n).toLocaleString("en-US", {
            maximumFractionDigits: numDecimals
        })
    }
}
