<template>
  <v-container class="pt-0 mb-8">
    <TableButtonRow />
    <v-row>
      <v-col>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="coins"
          :search="searchValue"
          :items-per-page="allCoins.length"
          :options="tableOptions"
          @update:options="onUpdateTable"
        >

          <template v-slot:header.name="{ header }">
            <span class="mr-1 header-text">{{ header.text }}</span>
          </template>
          <template v-slot:header.qty="{ header }">
            <span class="mr-1 header-text">{{ header.text }}</span>
            <InfoTooltip
              icon="mdi-help-circle"
              icon-color="grey"
              position="bottom"
              :text="tooltipText['qty']"
            />
          </template>
          <template v-slot:header.spent="{ header }">
            <span class="mr-1 header-text">{{ header.text }}</span>
            <InfoTooltip
              icon="mdi-help-circle"
              icon-color="grey"
              position="bottom"
              :text="tooltipText['spent']"
            />
          </template>
          <template v-slot:header.costAverage="{ header }">
            <span class="mr-1 header-text">{{ header.text }}</span>
            <InfoTooltip
              icon="mdi-help-circle"
              icon-color="grey"
              position="bottom"
              :text="tooltipText['costAverage']"
            />
          </template>
          <template v-slot:header.currentPrice="{ header }">
            <span class="mr-1 header-text">{{ header.text }}</span>
            <InfoTooltip
              icon="mdi-help-circle"
              icon-color="grey"
              position="bottom"
              :text="tooltipText['currentPrice']"
            />
          </template>
          <template v-slot:header.costAverageDiff="{ header }">
            <span class="mr-1 header-text">{{ header.text }}</span>
            <InfoTooltip
              icon="mdi-help-circle"
              icon-color="grey"
              position="bottom"
              :text="tooltipText['costAverageDiff']"
            />
          </template>

          <template v-slot:item.name="{ item }">
              <v-row>
                <a
                  :href="`https://coinmarketcap.com/currencies/${item.name.toLowerCase().split().join('-')}`"
                  target="_blank"
                  class="text-decoration-none"
                  tabindex="-1"
                >
                  <v-col class="pa-8">
                    <v-img :src="item.icon" width="30" class="mr-2 float-left"></v-img>
                    <span class="mr-3 text-body-1">{{ item.name }}</span>
                    <span class="text-subtitle-1 text--secondary text-uppercase">{{ item.symbol }}</span>
                  </v-col>
                </a>
              </v-row>
          </template>
          <template v-slot:item.qty="{ item }">
            <v-col class="pa-0">
              <v-text-field
                solo
                dense
                flat
                hide-details
                placeholder="how many hodls?"
                style="width: 150px"
                :value="formatNumber(item.qty)"
                @change="onChangeQty($event, item.id)"
              ></v-text-field>
            </v-col>
            <v-col
              v-if="amountToSpend && !isNaN(yoloHodls(item))"
              class="py-0 pr-0 pl-3 text-caption green--text"
            >
              ({{ formatNumber(yoloHodls(item)) }})
            </v-col>
          </template>
          <template v-slot:item.spent="{ item }">
            <v-col class="pa-0">
              <v-text-field
                solo
                dense
                flat
                hide-details
                placeholder="how much yolo'd?"
                style="width: 150px"
                :value="formatDollars(item.spent)"
                @change="onChangeSpent($event, item.id)"
              ></v-text-field>
            </v-col>
            <v-col
              v-if="amountToSpend"
              class="py-0 pr-0 pl-3 text-caption green--text"
            >
              ({{ formatDollars(yoloYolod(item)) }})
            </v-col>
          </template>
          <template v-slot:item.costAverage="{ item }">
            <template v-if="typeof item.costAverage !== 'undefined'">
              <v-col class="pa-0">
                {{ formatDollars(item.costAverage, isFlexible=true) }}
              </v-col>
              <v-col
                v-if="amountToSpend && item.currentPrice"
                class="pa-0 text-caption green--text"
              >
                ({{ formatDollars(yoloCostAverage(item), isFlexible=true) }})
              </v-col>
            </template>
            <template v-else>
              <InfoTooltip
                icon="mdi-help"
                position="top"
                :text="tooltipText['costAverageBlank']"
              />
            </template>
          </template>
          <template v-slot:item.currentPrice="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >{{ formatDollars(item.currentPrice, isFlexible=true) }}</span>
              </template>
              <span>{{ item.currentPrice }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.costAverageDiff="{ item }">
            <template v-if="typeof item.costAverageDiff !== 'undefined'">
              <v-icon v-if="item.costAverageDiff > 0" color="light-green accent-4">mdi-arrow-down-bold</v-icon>
              <v-icon v-else-if="item.costAverageDiff < 0" style="color: red">mdi-arrow-up-bold</v-icon>
              {{
                item.costAverageDiff !== 0
                ? `${Math.abs(item.costAverageDiff).toFixed(2)}%`
                : "n/a"
              }}
            </template>
            <template v-else>
              <InfoTooltip
                icon="mdi-help"
                position="top"
                :text="tooltipText['costAverageDiffBlank']"
              />
            </template>
          </template>
          <template v-slot:item.badges="{ item }">
              <InfoTooltip
                v-if="item.badges && item.badges.includes('bang')"
                icon="mdi-currency-usd"
                icon-size="x-large"
                icon-color="green"
                position="top"
                :text="tooltipText['badges']['bang']"
              />
              <InfoTooltip
                v-if="item.badges && item.badges.includes('dipper')"
                icon="mdi-star"
                icon-size="x-large"
                icon-color="yellow darken-1"
                position="top"
                :text="tooltipText['badges']['dipper']"
              />
              <InfoTooltip
                v-if="item.badges && item.badges.includes('moon')"
                icon="mdi-rocket-launch"
                icon-size="x-large"
                icon-color="blue"
                position="top"
                :text="tooltipText['badges']['moon']"
              />
          </template>

        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import InfoTooltip from '@/components/InfoTooltip.vue'
import TableButtonRow from '@/components/TableButtonRow.vue'
import { formatDollars, formatNumber } from '@/utils/functions'

export default {
  name: 'Home',
  components: {
    InfoTooltip,
    TableButtonRow
  },
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "HODLs", value: "qty" },
      { text: "YOLO'd", value: "spent" },
      { text: "Cost Average", value: "costAverage" },
      { text: "Current Price", value: "currentPrice" },
      { text: "Buy The Dip?", value: "costAverageDiff" },
      { text: "", value: "badges", sortable: false },
    ],
    tooltipText: {
      badges: {
        "bang": "Best Bang for the Buck",
        "dipper": "Big Dipper",
        "moon": "To the Moon!"
      },
      costAverage: "Your average price paid per coin",
      costAverageBlank: "Fill in HODLs and YOLO'd to calculate cost average",
      costAverageDiff: "Current Price relative to your Cost Average",
      costAverageDiffBlank: "Missing Cost Average",
      currentPrice: "Use the refresh button above to update this (Prices in USD)",
      spent: "The amount you have spent on this coin in total",
      qty: "The amount of this coin that you have in total"
    }
  }),
  computed: {
    ...mapState([
      'allCoins',
      'amountToSpend',
      'coins',
      'searchValue',
      'tableOptions'
    ]),
  },
  methods: {
    ...mapActions([
      'syncCoins'
    ]),
    ...mapMutations([
      'setTableOptions',
      'updateCoin',
    ]),
    formatDollars,
    formatNumber,
    onChangeQty(value, id) {
      const n = parseFloat(value.replace(',', ''))
      this.updateCoin({
        id,
        qty: isNaN(n) ? undefined : n
      })
    },
    onChangeSpent(value, id) {
      const n = parseFloat(value.replace(/[$,]/g, ''))
      this.updateCoin({
        id,
        spent: isNaN(n) ? undefined : n
      })
    },
    onUpdateTable(options) {
      this.setTableOptions(options)
    },
    yoloCostAverage(coin) {
      return this.yoloYolod(coin) / this.yoloHodls(coin)
    },
    yoloHodls(coin) {
      // Returns what your new quantity of the coin would be based on your amount to spend
      return (this.amountToSpend / coin.currentPrice) + coin.qty
    },
    yoloYolod(coin) {
      return this.amountToSpend + coin.spent
    },
  },
  created() {
    if (this.allCoins.length === 0) {
      this.syncCoins()
    }
  }
}
</script>
