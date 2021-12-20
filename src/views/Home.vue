<template>
  <v-container fluid class="pt-0 mb-8">
    <v-row>
      <v-col>
        <TableButtonRow />
        <v-row class="mx-0">
          <v-col cols="2" class="pa-0" align-self="center">
            <span class="text-subtitle-2 text--secondary">
              Showing {{ displayCoins.length }}/{{
                coinLists[selectedCoinList].length
              }}
              coin{{ coinLists[selectedCoinList].length !== 1 ? "s" : "" }}
            </span>
          </v-col>
          <v-col cols="2" class="px-0 pt-1">
            <v-checkbox
              dense
              hide-details
              v-model="showOnlyDips"
              label="Dips only"
            ></v-checkbox>
          </v-col>
          <v-col cols="5" class="primary white--text">
            <v-row>
              <v-col cols="3" class="pt-2 pl-2 pb-0">
                <strong>Total YOLO'd</strong>
              </v-col>
              <v-col cols="3" class="pt-2 pl-2 pb-0">
                <strong>Total Value</strong>
              </v-col>
              <v-col cols="6" class="pt-2 pl-2 pb-0">
                <strong>Profit</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pa-1 pl-2 pt-0">
                <span class="text-subtitle-2">
                  {{ totalYolod !== null ? formatDollars(totalYolod) : "-" }}
                </span>
              </v-col>
              <v-col cols="3" class="pa-1 pl-2 pt-0">
                <span class="text-subtitle-2">
                  {{
                    totalCurrentValue !== null
                      ? formatDollars(totalCurrentValue)
                      : "-"
                  }}
                </span>
              </v-col>
              <v-col cols="6" class="pa-1 pl-2 pt-0">
                <span class="text-subtitle-2">
                  {{ totalProfit !== null ? formatDollars(totalProfit) : "-" }}
                </span>
                <span
                  v-if="!Number.isNaN(totalProfitPercentage)"
                  class="text-subtitle-2"
                >
                  ({{ totalProfit >= 0 ? "+" : "" }}{{ totalProfitPercentage }})
                </span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              disable-pagination
              show-expand
              :headers="headers"
              :items="displayCoins"
              :search="searchValue"
              :items-per-page="
                Math.max(allCoins.length, coinLists[selectedCoinList].length)
              "
              :options="tableOptions"
              :custom-filter="coinFilter"
              :item-class="itemRowClass"
              class="elevation-2"
              @update:options="onUpdateTable"
            >
              <template v-slot:header.name="{ header }">
                <span class="header-text">{{ header.text }}</span>
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
              <template v-slot:header.currentValue="{ header }">
                <span class="mr-1 header-text">{{ header.text }}</span>
                <InfoTooltip
                  icon="mdi-help-circle"
                  icon-color="grey"
                  position="bottom"
                  :text="tooltipText['currentValue']"
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
              <template
                v-if="coinLists[selectedCoinList].length"
                v-slot:header.menu
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      small
                      color="red"
                      v-bind="attrs"
                      v-on="on"
                      @click="onClickClearList"
                    >
                      <v-icon color="white">mdi-cancel</v-icon>
                    </v-btn>
                  </template>
                  <span>Clear List</span>
                </v-tooltip>
              </template>

              <template v-slot:item.name="{ item }">
                <v-row>
                  <a
                    :href="getCoinPageUrl(item)"
                    target="_blank"
                    class="text-decoration-none"
                    tabindex="-1"
                  >
                    <v-col class="py-4">
                      <v-img
                        :src="item.icon"
                        width="30"
                        class="mr-2 float-left"
                      ></v-img>
                      <span class="mr-3 text-body-1">{{ item.name }}</span>
                      <span
                        class="text-subtitle-1 text--secondary text-uppercase"
                        >{{ item.symbol }}</span
                      >
                    </v-col>
                  </a>
                </v-row>
              </template>
              <template v-slot:item.currentValue="{ item }">
                <template
                  v-if="
                    !isNaN(item.costAverage) &&
                    typeof item.costAverage !== 'undefined' &&
                    typeof item.currentPrice !== 'undefined'
                  "
                >
                  <v-col class="pa-0">
                    {{
                      formatDollars(
                        getCoinCurrentValue(item),
                        { isFlexible: true }
                      )
                    }}
                  </v-col>
                </template>
              </template>
              <template v-slot:item.costAverage="{ item }">
                <template
                  v-if="
                    !isNaN(item.costAverage) &&
                    typeof item.costAverage !== 'undefined'
                  "
                >
                  <v-col class="pa-0">
                    {{ formatDollars(item.costAverage, { isFlexible: true }) }}
                  </v-col>
                  <v-col
                    v-if="amountToSpend && item.currentPrice"
                    :class="[
                      'pa-0',
                      'text-caption',
                      {
                        'green--text': item.costAverage > yoloCostAverage(item),
                      },
                      { 'red--text': item.costAverage < yoloCostAverage(item) },
                    ]"
                  >
                    <span v-if="item.spent > 0">
                      ({{
                        formatDollars(
                          yoloCostAverage(item),
                          { isFlexible: true }
                        )
                      }}, {{ getYoloCostAverageDiffPct(item) }})
                    </span>
                    <span v-else>
                      ({{
                        formatDollars(
                          yoloCostAverage(item),
                          { isFlexible: true }
                        )
                      }})
                    </span>
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
                <template v-if="typeof item.currentPrice !== 'undefined'">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{
                        formatDollars(item.currentPrice, { isFlexible: true })
                      }}</span>
                    </template>
                    <span>
                      ${{ item.currentPrice }}
                      <br />
                      Last refresh:
                      {{
                        item.lastRefreshPrice
                          ? formatDollars(
                              item.lastRefreshPrice,
                              { isFlexible: true }
                            )
                          : "n/a"
                      }}
                    </span>
                  </v-tooltip>
                </template>
                <template v-else>
                  <InfoTooltip
                    icon="mdi-help"
                    position="top"
                    :text="tooltipText['currentPriceBlank']"
                  />
                </template>
              </template>
              <template v-slot:item.costAverageDiff="{ item }">
                <template v-if="typeof item.costAverageDiff !== 'undefined'">
                  <BuyTheDip :coin="item" />
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
                <v-col class="pa-0">
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
                </v-col>
                <v-col v-if="coinHasAlert(item)" class="pa-0">
                  <v-chip small close @click:close="onClickRemoveAlert(item)">
                    <v-icon small left>mdi-alarm</v-icon>
                    {{ getAlertDisplayValues(item) }}
                  </v-chip>
                </v-col>
              </template>
              <template v-slot:item.menu="{ item }">
                <v-col class="pa-0 col-menu">
                  <CoinActionMenu :coin="item" />
                </v-col>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="px-0">
                  <CoinChart :coin="item" />
                </td>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BuyTheDip from "@/components/BuyTheDip.vue";
import CoinActionMenu from "@/components/CoinActionMenu.vue";
import CoinChart from "@/components/CoinChart.vue";
import InfoTooltip from "@/components/InfoTooltip.vue";
import TableButtonRow from "@/components/TableButtonRow.vue";
import {
  formatDollars,
  formatNumber,
  formatPercentage,
  yoloHodls,
  yoloYolod,
} from "@/utils/functions";
import config from "@/config";
import { tooltipText } from "@/utils/constants";

export default {
  name: "Home",
  components: {
    BuyTheDip,
    CoinActionMenu,
    CoinChart,
    InfoTooltip,
    TableButtonRow,
  },
  data: () => ({
    headers: [
      { text: "Name", value: "name", width: 215 },
      {
        text: "Cost Average",
        value: "costAverage",
        filterable: false,
        width: 140,
      },
      {
        text: "Current Price",
        value: "currentPrice",
        filterable: false,
        width: 140,
      },
      { text: "Current Value", value: "currentValue", width: 140 },
      {
        text: "Buy The Dip?",
        value: "costAverageDiff",
        filterable: false,
        width: 140,
      },
      {
        text: "",
        value: "badges",
        sortable: false,
        filterable: false,
        width: 80,
      },
      {
        text: "",
        value: "menu",
        sortable: false,
        filterable: false,
        align: "center",
        width: 70,
      },
    ],
    showOnlyDips: false,
    tooltipText,
  }),
  computed: {
    ...mapState([
      "allCoins",
      "amountToSpend",
      "coinLists",
      "hasBackEndApiKey",
      "searchValue",
      "selectedCoinList",
      "tableOptions",
    ]),
    displayCoins() {
      if (this.showOnlyDips) {
        return this.coinLists[this.selectedCoinList].filter(
          (coin) => coin.costAverageDiff > 0
        );
      }
      return this.coinLists[this.selectedCoinList];
    },
    totalYolod() {
      let total = null;
      if (this.displayCoins.length) {
        const spentAmounts = this.displayCoins
          .filter((coin) => Object.prototype.hasOwnProperty.call(coin, "spent"))
          .map((coin) => coin.spent);
        if (spentAmounts.length) {
          total = spentAmounts.reduce((a, b) => a + b, 0);
        }
        return typeof total !== "undefined" ? total : null;
      }
      return null;
    },
    totalCurrentValue() {
      let total = null;
      if (this.displayCoins.length) {
        const prices = this.displayCoins
          .filter((coin) =>
            Object.prototype.hasOwnProperty.call(coin, "currentPrice")
          )
          .map((coin) => coin.qty * coin.currentPrice)
          .filter((price) => !isNaN(price));
        if (prices.length) {
          total = prices.reduce((a, b) => a + b, 0);
        }
        return !isNaN(total) ? total : null;
      }
      return null;
    },
    totalProfit() {
      return this.totalCurrentValue !== null && this.totalYolod !== null
        ? this.totalCurrentValue - this.totalYolod
        : null;
    },
    totalProfitPercentage() {
      return formatPercentage(
        formatNumber((this.totalProfit / this.totalCurrentValue) * 100)
      );
    },
  },
  methods: {
    ...mapActions(["syncCoins"]),
    ...mapMutations([
      "addCoinList",
      "removeCoinAlert",
      "setCoins",
      "setTableOptions",
      "updateCoin",
    ]),
    coinFilter(value, search, item) {
      return (
        value !== null &&
        search !== null &&
        typeof value === "string" &&
        (value.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          item.symbol.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      );
    },
    coinHasAlert(coin) {
      return (
        (Object.prototype.hasOwnProperty.call(coin.alerts, "currentPrice") &&
          coin.alerts.currentPrice) ||
        (Object.prototype.hasOwnProperty.call(coin.alerts, "buyTheDip") &&
          coin.alerts.buyTheDip)
      );
    },
    formatDollars,
    formatNumber,
    formatPercentage,
    getAlertDisplayValues(coin) {
      let s = "";
      if (coin.alerts.currentPrice) {
        s += formatDollars(coin.alerts.currentPrice);
        if (coin.alerts.buyTheDip) {
          s += "/";
        }
      }
      if (coin.alerts.buyTheDip) {
        s += formatPercentage(coin.alerts.buyTheDip);
      }

      return s;
    },
    getCoinCurrentValue(coin) {
      return coin.qty * coin.currentPrice;
    },
    getCoinPageUrl(coin) {
      const urlCoinName = coin.name.toLowerCase().split(" ").join("-");
      return `${config["CMC"]["coinPageBaseUrl"]}/${urlCoinName}`;
    },
    getYoloCostAverageDiffPct(coin) {
      const diff = (
        ((this.yoloCostAverage(coin) - coin.costAverage) / coin.costAverage) *
        100
      ).toFixed(2);
      return diff > 0 ? `+${diff}%` : `${diff}%`;
    },
    itemRowClass(coin) {
      let styles = [];
      // apply styles for "alert triggered"
      if (
        (Object.prototype.hasOwnProperty.call(coin.alerts, "buyTheDip") &&
          !(typeof coin.alerts.buyTheDip === "undefined") &&
          coin.alerts.buyTheDip !== null &&
          coin.costAverageDiff > coin.alerts.buyTheDip) ||
        (Object.prototype.hasOwnProperty.call(coin.alerts, "currentPrice") &&
          !(typeof coin.alerts.currentPrice === "undefined") &&
          coin.alerts.currentPrice !== null &&
          coin.currentPrice < coin.alerts.currentPrice)
      ) {
        styles.push("alert-triggered");
      }

      return styles;
    },
    onClickClearList() {
      this.setCoins([]);
    },
    onClickRemoveAlert(coin) {
      this.removeCoinAlert({ coinId: coin.id });
    },
    onUpdateTable(options) {
      this.setTableOptions(options);
    },
    yoloCostAverage(coin) {
      return (
        this.yoloYolod(this.amountToSpend, coin) /
        this.yoloHodls(this.amountToSpend, coin)
      );
    },
    yoloHodls,
    yoloYolod,
  },
  created() {
    if (Object.keys(this.coinLists).length === 0) {
      this.addCoinList("Dips");
    }
    if (this.allCoins.length === 0 && this.hasBackEndApiKey) {
      this.syncCoins();
    }
  },
};
</script>
