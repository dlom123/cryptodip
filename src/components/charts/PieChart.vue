<script>
import { Pie, mixins } from 'vue-chartjs'

export default {
  extends: Pie,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart(this.chartData, this.options)
    })
  }
}
</script>