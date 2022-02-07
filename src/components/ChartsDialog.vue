<template>
  <v-dialog v-model="showChartsDialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-tooltip top v-on="on">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-btn medium class="ml-4" @click="openChartsDialog">
              <v-icon>mdi-chart-pie</v-icon>
            </v-btn>
          </span>
        </template>
        <span>View Charts</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="primary white--text">
        <span class="headline">Coin List: {{ selectedCoinList }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <PieChart :chartData="chartData" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex"
import PieChart from "@/components/charts/PieChart"
import {
    formatNumber,
    formatPercentage,
    getTotalCurrentValue,
} from "@/utils/functions";

export default {
    name: 'ChartsDialog',
    components: {
        PieChart
    },
    data: () => ({
        showChartsDialog: false
    }),
    computed: {
        ...mapState([
            'coinLists',
            'selectedCoinList'
        ]),
        chartData() {
            const labels = []
            const data = []
            const totalCurrentValue = this.getTotalCurrentValue(this.coinLists[this.selectedCoinList])
            let otherPct = 0
            const backgroundColor = []
            this.coinLists[this.selectedCoinList].forEach(coin => {
                const currentValuePct = this.formatNumber(coin.currentValue / totalCurrentValue) * 100
                if (currentValuePct < 1) {
                    otherPct += currentValuePct
                } else {
                    labels.push(coin.name)
                    data.push(currentValuePct.toFixed(2))
                }
                const rgbs = []
                for (let i = 0; i < 3; i++) {
                    rgbs.push(parseInt(Math.random() * 220))
                }
                backgroundColor.push(`rgba(${rgbs.toString()}, 0.5)`)
            })
            if (otherPct > 0) {
                labels.push('Other')
                data.push(otherPct.toFixed(2))
            }
            return {
                labels,
                datasets: [{
                    data,
                    backgroundColor
                }]
            }
            // return {
            // labels: ["Italy", "India", "Japan", "USA"],
            // datasets: [{
            // borderWidth: 1,
            // // borderColor: [
            // //     'rgba(255, 99, 132, 1)',
            // //     'rgba(54, 162, 235, 1)',
            // //     'rgba(255, 206, 86, 1)',
            // //     'rgba(75, 192, 192, 1)'
            // // ],
            // // backgroundColor: [
            // //     'rgba(255, 99, 132, 0.2)',
            // //     'rgba(54, 162, 235, 0.2)',
            // //     'rgba(255, 206, 86, 0.2)',
            // //     'rgba(75, 192, 192, 0.2)'
            // // ],
            // data: [1000, 500, 1500, 1000]
            // }]
            // }
        }
    },
    methods: {
        formatNumber,
        formatPercentage,
        getTotalCurrentValue,
        openChartsDialog() {
            this.showChartsDialog = true
        }
    }
}
</script>
