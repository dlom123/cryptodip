<template>
    <v-col class="pl-0">
        <v-icon v-if="coin.costAverageDiff > 0" color="light-green accent-4">mdi-arrow-down-bold</v-icon>
        <v-icon v-else-if="coin.costAverageDiff < 0" style="color: red">mdi-arrow-up-bold</v-icon>
        {{
        coin.costAverageDiff !== 0
        ? `${Math.abs(coin.costAverageDiff).toFixed(2)}%`
        : "n/a"
        }}
    </v-col>
</template>

<script>
export default {
    name: 'BuyTheDip',
    props: [
        'coin'
    ]
}
</script>
