<template>
  <v-container fluid class="px-0">
    <v-row no-gutters>
      <v-col offset="4" cols="2">
        <span class="mr-1 header-text">HODLs</span>
        <InfoTooltip
          icon="mdi-help-circle"
          icon-color="grey"
          position="bottom"
          :text="tooltipText['qty']"
        />
        <v-col class="pa-0">
          <v-text-field
            solo
            dense
            flat
            hide-details
            placeholder="how many hodls?"
            style="width: 150px"
            :value="
              formatNumber(
                coin.qty,
                (isFlexible = false),
                (fullPrecision = true)
              )
            "
            @change="onChangeQty($event, coin.id)"
          ></v-text-field>
        </v-col>
        <v-col
          v-if="amountToSpend && !isNaN(yoloHodls(amountToSpend, coin))"
          class="py-0 pr-0 pl-3 text-caption green--text"
        >
          ({{
            formatNumber(yoloHodls(amountToSpend, coin), (isFlexible = true))
          }},
          {{
            `+${formatNumber(
              yoloHodls(amountToSpend, coin) - coin.qty,
              (isFlexible = true)
            )}`
          }})
        </v-col>
      </v-col>

      <v-col cols="6">
        <span class="mr-1 header-text">YOLO'd</span>
        <InfoTooltip
          icon="mdi-help-circle"
          icon-color="grey"
          position="bottom"
          :text="tooltipText['spent']"
        />
        <v-col class="pa-0">
          <v-text-field
            solo
            dense
            flat
            hide-details
            placeholder="how much yolo'd?"
            style="width: 150px"
            :value="formatDollars(coin.spent)"
            @change="onChangeSpent($event, coin.id)"
          ></v-text-field>
        </v-col>
        <v-col
          v-if="amountToSpend && typeof coin.spent !== 'undefined'"
          class="py-0 pr-0 pl-3 text-caption green--text"
        >
          ({{ formatDollars(yoloYolod(amountToSpend, coin)) }})
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import InfoTooltip from "@/components/InfoTooltip.vue";
import { tooltipText } from "@/utils/constants";
import {
  formatDollars,
  formatNumber,
  yoloHodls,
  yoloYolod,
} from "@/utils/functions";

export default {
  name: "CoinChart",
  props: ["coin"],
  components: {
    InfoTooltip,
  },
  data: () => ({
    headers: [
      { text: "HODLs", value: "qty", filterable: false, width: 150 },
      { text: "YOLO'd", value: "spent", filterable: false, width: 150 },
    ],
    tooltipText,
  }),
  computed: {
    ...mapState(["amountToSpend"]),
  },
  methods: {
    ...mapMutations(["updateCoin"]),
    formatDollars,
    formatNumber,
    onChangeQty(value, id) {
      const n = parseFloat(value.replace(",", ""));
      this.updateCoin({
        id,
        qty: isNaN(n) ? undefined : n,
      });
    },
    onChangeSpent(value, id) {
      const n = parseFloat(value.replace(/[$,]/g, ""));
      this.updateCoin({
        id,
        spent: isNaN(n) ? undefined : n,
      });
    },
    yoloHodls,
    yoloYolod,
  },
};
</script>
