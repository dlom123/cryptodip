<template>
  <div class="about">
    <h1>The DIP100 Index</h1>
    <div style="width: 1000px; height: 400px">
      <canvas ref="chart" id="chart"></canvas>
    </div>
    <div class="mt-2">
      <v-row no-gutters>
        <v-col cols="auto" class="px-2 py-1 top50">
          Top 50 &mdash; high: ${{ alltimeHighs["top"] }}, low: ${{
            alltimeLows["top"]
          }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto" class="px-2 py-1 bottom50">
          Bottom 50 &mdash; high: ${{ alltimeHighs["bottom"] }}, low: ${{
            alltimeLows["bottom"]
          }}
        </v-col>
      </v-row>
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
      chartDatasets: [
        {
          label: 'Top 50',
          data: [
            494.96, 486.07, 492.73, 495.17, 505.51,
            502.64, 473.69, 456.90, 484.02, 493.98,
            495.27, 482.39, 481.15, 440.28, 413.58,
            395.59, 413.32, 422.34, 421.60, 400.73,
            394.43, 395.60, 383.31, 363.75, 378.47,
            390.86, 385.48, 378.20, 
          ],
          backgroundColor: ['blue'],
          borderColor: ['lightblue']
        },
        {
          label: 'Bottom 50',
          data: [
            493.45, 491.19, 492.53, 497.29, 507.80,
            515.50, 485.90, 463.18, 488.28, 494.20,
            491.26, 470.36, 465.11, 424.51, 395.67,
            374.84, 394.87, 400.82, 398.88, 376.34,
            371.16, 372.66, 361.16, 340.13, 346.85,
            362.12, 361.38, 357.96, 
          ],
          backgroundColor: ['red'],
          borderColor: ['orange']
        }
      ],
      chartTop100: null,
    }
  },
  computed: {
    alltimeHighs() {
      return {
        top: Math.max(...this.chartDatasets[0]['data']),
        bottom: Math.max(...this.chartDatasets[1]['data'])
      }
    },
    alltimeLows() {
      return {
        top: Math.min(...this.chartDatasets[0]['data']),
        bottom: Math.min(...this.chartDatasets[1]['data'])
      }
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
          '11/30/21', '12/01/21', '12/02/21', '12/03/21', '12/04/21',
          '12/05/21', '12/06/21', '12/07/21', '12/08/21', '12/09/21',
          '12/10/21', '12/11/21', '12/12/21', '12/13/21', '12/14/21',
          '12/15/21', '12/16/21', '12/17/21', 
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

.top50, .bottom50
  font-weight: bold

.top50
  background-color: lightblue

.bottom50
  background-color: orange
</style>