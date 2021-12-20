<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        ref="btnRefresh"
        fab
        dark
        outlined
        color="green"
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
    <span>Refresh Current Price (r)</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

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
  data() {
    return {
      isAlt: false,
      isCtrl: false
    }
  },
  computed: {
    ...mapState([
      'coinLists',
      'focused',
      'selectedCoinList'
    ]),
    ...mapMutations([
      'setFocused'
    ])
  },
  methods: {
    ...mapActions([
      'getCurrentPrices'
    ]),
    activateClick(el) {
      const ev = new Event('mousedown')
      ev.clientX = el?.offsetLeft + el?.offsetWidth/2
      ev.clientY = el?.offsetTop + el?.offsetHeight/2
      el.dispatchEvent(ev)

      setTimeout(() => {
        el.dispatchEvent(new Event('mouseup'))
      }, 300)
    },
    handleKeypress(e) {
      if (
        !this.focused
        && !this.isCtrl // don't hijack ctrl key combos
        && !this.isAlt // don't hijack alt key combos
      ) {
        switch (e.key) {
          case 'Alt':
            this.isAlt = true
            break
          case 'Control':
            this.isCtrl = true
            break
          case 'r':
            // refresh prices
            e.preventDefault()
            // trigger button ripple animation
            this.activateClick(this.$refs.btnRefresh?.$el)
            // actually get the prices
            this.$refs.btnRefresh.click()
            break
        }
      }
    },
    handleKeyUp(e) {
      switch (e.key) {
        case 'Alt':
          this.isAlt = false
          break
        case 'Control':
          this.isCtrl = false
          break
      }
    },
    onClickRefresh() {
      this.getCurrentPrices(this.coinIds)
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeypress);
    window.addEventListener("keyup", this.handleKeyUp);
  },
}
</script>
