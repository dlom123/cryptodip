<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                fab dark outlined color="green"
                v-bind="attrs"
                v-on="on"
                :x-small="size === 'x-small'"
                :small="size === 'small'"
                :large="size === 'large'"
                :x-large="size === 'x-large'"
                :disabled="coinLists[selectedCoinList].length === 0"
                @click="onClickRefresh"
            >
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </template>
        <span>Refresh Current Price</span>
    </v-tooltip>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'RefreshPricesButton',
    props: {
        coinIds: {
            type: Array,
            default: Array
        },
        size: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapState([
            'coinLists',
            'selectedCoinList'
        ])
    },
    methods: {
        ...mapActions([
            'getCurrentPrices'
        ]),
        onClickRefresh() {
            this.getCurrentPrices(this.coinIds)
        }
    }
}
</script>
