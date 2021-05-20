<template>
  <v-container>
    <v-row class="mt-2">
      <v-col align="right">
        <v-btn fab dark color="green" @click="refreshPrices">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table
          fixed-header
          class="coin-table"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">Name</th>
                <th class="text-left">Qty</th>
                <th class="text-left">$$$</th>
                <th class="text-left">Avg</th>
                <th class="text-left">Current Price</th>
                <th class="text-left">Buy the Dip?</th>
                <!-- placeholder for emojis -->
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <CoinRow
                v-for="(coin, i) in coins"
                :key="coin.id"
                :coin="coin"
                :i="i" />
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CoinRow from '@/components/CoinRow.vue'

export default {
  name: 'Home',
  components: {
    CoinRow
  },
  computed: {
    ...mapState([
      'coins'
    ])
  },
  methods: {
    ...mapActions([
      'getCoins',
      'getCurrentPrices'
    ]),
    refreshPrices() {
      console.log("get 'em!")
    }
  },
  created() {
    this.getCoins()
    this.getCurrentPrices()
  }
}
</script>
