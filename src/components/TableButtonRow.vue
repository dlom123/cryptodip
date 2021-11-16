<template>
  <v-row>
    <v-col cols="2" align-self="end" class="pr-0">
      <v-combobox
        ref="selectCoinList"
        dense
        outlined
        hide-details
        label="Coin List"
        append-icon="mdi-trash-can-outline"
        :items="sortedCoinLists"
        :value="selectedCoinList"
        @change="onChangeCoinList"
        @click:append="onClickDeleteList"
      ></v-combobox>
    </v-col>
    <v-col cols="1" class="pa-0" align="end" align-self="center">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-btn
              :disabled="coinLists[selectedCoinList].length === 0"
              small
              color="blue"
              class="pa-0 mr-4 white--text float-right"
              @click="exportCSV"
            >
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </span>
        </template>
        <span>Export CSV</span>
      </v-tooltip>
    </v-col>
    <v-col cols="1" class="pa-0" align-self="center">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-btn
              small
              color="white"
              class="pa-0 blue--text"
              @click="onClickImportCSV"
            >
              <v-icon>mdi-file-upload</v-icon>
            </v-btn>
            <v-file-input
              ref="inputCSV"
              hide-input
              hide-details
              @change="importCSV"
              style="display: none"
            ></v-file-input>
          </span>
        </template>
        <span>Import CSV</span>
      </v-tooltip>
    </v-col>
    <v-col cols="3" align-self="end">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Filter"
        hide-details
        clearable
        outlined
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="3" align-self="end">
      <v-text-field
        label="YOLO"
        hide-details
        clearable
        outlined
        dense
        :background-color="amountToSpend ? 'light-green' : ''"
        class="text-lighten-2"
        :value="formatDollars(amountToSpend)"
        @change="onChangeAmountToSpend"
        @input="onInputAmountToSpend"
        @click:clear="onChangeAmountToSpend"
      >
        <template v-slot:append-outer>
          <InfoTooltip
            icon="mdi-help-circle"
            icon-color="grey"
            position="bottom"
            icon-size="large"
            :text="tooltipText['yolo']"
          />
        </template>
      </v-text-field>
    </v-col>
    <v-col align="right">
      <span class="mr-6"><RefreshPricesButton /></span>
      <AddCoinsDialog />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import AddCoinsDialog from '@/components/AddCoinsDialog.vue'
import InfoTooltip from '@/components/InfoTooltip.vue'
import RefreshPricesButton from '@/components/RefreshPricesButton.vue'
import { formatDollars } from '@/utils/functions'
import config from '@/config'

export default {
  name: 'TableButtonRow',
  components: {
    AddCoinsDialog,
    InfoTooltip,
    RefreshPricesButton
  },
  data: () => ({
    tooltipText: {
        yolo: "The amount available to spend on a single coin"
    }
  }),
  computed: {
    ...mapState([
      'amountToSpend',
      'coinLists',
      'searchValue',
      'selectedCoinList'
    ]),
    search: {
        get() {
            return this.searchValue
        },
        set(newValue) {
            this.setSearchValue(newValue)
        }
    },
    sortedCoinLists() {
        return Object.keys(this.coinLists).sort((a, b) => {
            return a < b ? -1 : 1
        })
    }
  },
  methods: {
    ...mapActions([
      'applyNewAmountToSpend',
      'getCurrentPrices'
    ]),
    ...mapMutations([
        'addCoinList',
        'removeCoinList',
        'setSearchValue',
        'setSelectedCoinList',
        'updateCoins',
        'updateGuides'
    ]),
    exportCSV() {
        const [month, date, year] = new Date()
            .toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
            .split("/")
        const [hour, minute, second] = new Date()
            .toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            .split(/:| /)
        const filename = `cryptodip_${this.selectedCoinList.toLowerCase()}_${year}${month}${date}${hour}${minute}${second}.csv`

        let csv = "Id,Coin Name,Symbol,Location,HODLs,YOLOd,Cost Average,Current Price,Buy The Dip"
        csv += ",Alert Current Price,Alert Buy The Dip\n"
        this.coinLists[this.selectedCoinList].forEach(coin => {
            const location = coin.location ? coin.location.replace(",", "/") : ""
            const qty = coin.qty ? coin.qty : ""
            const spent = coin.spent ? coin.spent : ""
            const costAverage = coin.costAverage ? coin.costAverage : ""
            const currentPrice = coin.currentPrice ? coin.currentPrice : ""
            const costAverageDiff = coin.costAverageDiff ? coin.costAverageDiff : ""
            const alertCurrentPrice = Object.prototype.hasOwnProperty.call(coin.alerts, 'currentPrice')
                && typeof coin.alerts.currentPrice !== 'undefined'
                    ? coin.alerts.currentPrice : ""
            const alertBuyTheDip = Object.prototype.hasOwnProperty.call(coin.alerts, 'buyTheDip')
                && typeof coin.alerts.buyTheDip !== 'undefined'
                    ? coin.alerts.buyTheDip : ""

            csv += `${coin.id},${coin.name},${coin.symbol},${location},${qty},${spent}`
            csv += `,${costAverage},${currentPrice},${costAverageDiff}`
            csv += `,${alertCurrentPrice},${alertBuyTheDip}\n`
        })

        const anchor = document.createElement('a')
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
        anchor.target = '_blank'
        anchor.download = filename
        anchor.click()
    },
    formatDollars,
    async importCSV(f) {
        const text = await f.text()
        const lines = text.trim().split('\n')
        lines.shift() // remove header row
        const coins = lines.map(line => {
            const cols = line.split(',')
            const csvCoin = {
                id: parseInt(cols[0]),
                name: cols[1],
                symbol: cols[2],
                icon: `${config['CMC']['coinImgBaseUrl']}/${cols[0]}.png`,
                location: cols[3],
                qty: cols[4] ? parseFloat(cols[4]) : undefined,
                spent: cols[5] ? parseFloat(cols[5]) : undefined,
                alerts: {
                    buyTheDip: parseFloat(cols[9]),
                    currentPrice: parseFloat(cols[10])
                }
            }
            if (csvCoin.qty && csvCoin.spent) {
                csvCoin['costAverage'] = csvCoin.spent / csvCoin.qty
            }
            return csvCoin
        })
        this.updateCoins(coins)
        this.$refs.inputCSV.$refs.input.value = ""
        this.updateGuides({ 'addCoins': false })
    },
    onChangeAmountToSpend(value) {
        let n = undefined
        if (typeof value === 'string') {
            n = parseFloat(value.replace(/[$,]/g, ''))
        }
        this.applyNewAmountToSpend(
            isNaN(n) ? undefined : n
        )
    },
    onChangeCoinList(item) {
        const existingItem = Object.keys(this.coinLists).includes(item)
        if (!existingItem) {
            this.addCoinList(item)
            this.setSelectedCoinList(item)
            this.$refs.selectCoinList.blur()
        } else {
            this.setSelectedCoinList(item)
        }
    },
    onClickDeleteList() {
        this.removeCoinList(this.selectedCoinList)
        if (Object.keys(this.coinLists).length === 0) {
            // re-create the default list whenever all lists have been deleted
            this.addCoinList("Dips")
        }
        this.setSelectedCoinList(Object.keys(this.coinLists)[0])
        this.$refs.selectCoinList.blur()
    },
    onClickImportCSV() {
        this.$refs.inputCSV.$refs.input.click()
    },
    onInputAmountToSpend(value) {
        if (value === '') {
            // trigger a recalculation as soon as the input is empty
            this.onChangeAmountToSpend(value)
        }
    }
  }
}
</script>
