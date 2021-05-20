<template>
  <tr>
    <td>{{ i + 1 }}</td>
    <td>
      <v-row>
        <v-col cols="2">
          <v-img :src="require(`@/assets/coins/${coin.icon}`)" width="30"></v-img>
        </v-col>
        <v-col align-self="center">
          <span class="mr-3 text-body-1">{{ coin.name }}</span>
          <span class="text-subtitle-1 text--secondary text-uppercase">{{ coin.symbol }}</span>
        </v-col>
      </v-row>
    </td>
    <td>{{ coin.qty.toLocaleString() }}</td>
    <td>{{ formatDollars(coin.spent) }}</td>
    <td>{{ formatDollars(costAverage) }}</td>
    <td>{{ formatDollars(prices[coin.name]) }}</td>
    <td>
      <v-icon v-if="costAverageDiff > 0" style="color: limegreen">mdi-arrow-down-bold</v-icon>
      <v-icon v-if="costAverageDiff < 0" style="color: red">mdi-arrow-up-bold</v-icon>
      {{ Math.abs(costAverageDiff) }}%
    </td>
    <!-- <td> -->
      <!-- rocket emoji! -->
      <!-- &#x1f680; -->
    <!-- </td> -->
  </tr>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CoinRow',
  props: [
    'coin',
    'i'
  ],
  data: () => ({
  }),
  computed: {
    ...mapState([
      'prices'
    ]),
    classArrow() {
      return {
        'arrow-red': this.costAverageDiff < 0,
        'arrow-green': this.costAverageDiff > 0
      }
    },
    costAverage() {
      return this.coin.spent / this.coin.qty
    },
    costAverageDiff() {
      const priceDiff = this.costAverage - this.prices[this.coin.name]
      const pctDiff = priceDiff / this.costAverage
      return (pctDiff * 100).toFixed(2)
    },
  },
  methods: {
    formatDollars(n) {
      return n.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
  }
}
</script>
