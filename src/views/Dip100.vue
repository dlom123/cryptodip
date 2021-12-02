<template>
  <div class="about">
    <h1>The DIP100 Index</h1>
    <div style="width: 1000px; height: 400px">
      <canvas ref="chart" id="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

export default {
  name: "dip100",
  data() {
    return {
      ctx: null,
      chartTop100: null,
    }
  },
  computed: {
    chartDatasets() {
      return [
        {
          label: 'Top 50',
          data: [
            494.96, 486.07, 492.73, 495.17, 505.51,
            502.64, 473.69, 456.90, 484.02, 493.98,
            495.27, 482.39
          ],
          backgroundColor: ['blue'],
          borderColor: ['lightblue']
        },
        {
          label: 'Bottom 50',
          data: [
            493.45, 491.19, 492.53, 497.29, 507.80,
            515.50, 485.90, 463.18, 488.28, 494.20,
            491.26, 470.36
          ],
          backgroundColor: ['red'],
          borderColor: ['orange']
        }
      ]
    }
  },
  mounted() {
    Chart.register(...registerables)
    this.ctx = this.$refs.chart
    this.chartTop100 = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [
          '11/20/21', '11/21/21', '11/22/21', '11/23/21', '11/24/21',
          '11/25/21', '11/26/21', '11/27/21', '11/28/21', '11/29/21',
          '11/30/21', '12/1/21'
        ],
        datasets: this.chartDatasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}
</script>

<style scoped lang="sass">
canvas#chart
  border: 2px solid black
</style>