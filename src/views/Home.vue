<template>
  <v-container class="pt-0">
    <v-row class="mt-2">
      <v-col cols="3" align-self="end">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col align="right">
        <v-btn fab dark color="green"
          class="mr-6"
          :disabled="coins.length === 0"
          @click="getCurrentPrices"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <AddCoinsDialog />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="coins"
          :search="search"
        >
          <template v-slot:item.delete="{ item }">
            <v-btn
              icon
              color="red"
              @click="deleteRow(item)"
            >
              <v-icon small>mdi-close-circle</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.seq="{ item }">
            {{ item.id }}
          </template>
          <template v-slot:item.name="{ item }">
              <v-row>
                <v-col>
                  <v-img :src="item.icon" width="30" class="mr-2 float-left"></v-img>
                  <span class="mr-3 text-body-1">{{ item.name }}</span>
                  <span class="text-subtitle-1 text--secondary text-uppercase">{{ item.symbol }}</span>
                </v-col>
              </v-row>
          </template>
          <template v-slot:item.qty="{ item }">
            {{ typeof item.qty !== 'undefined' ? item.qty.toLocaleString() : 'n/a' }}
          </template>
          <template v-slot:item.spent="{ item }">
            {{ formatDollars(item.spent) }}
          </template>
          <template v-slot:item.costAverage="{ item }">
            {{ formatDollars(item.costAverage) }}
          </template>
          <template v-slot:item.currentPrice="{ item }">
            {{ formatDollars(item.currentPrice) }}
          </template>
          <template v-slot:item.costAverageDiff="{ item }">
            <template v-if="typeof item.costAverageDiff !== 'undefined'">
              <v-icon v-if="item.costAverageDiff > 0" style="color: limegreen">mdi-arrow-down-bold</v-icon>
              <v-icon v-else-if="item.costAverageDiff < 0" style="color: red">mdi-arrow-up-bold</v-icon>
              {{
                item.costAverageDiff !== 0
                ? `${Math.abs(item.costAverageDiff)}%`
                : "n/a"
              }}
            </template>
            <template v-else>
              <v-icon color="primary">mdi-help</v-icon>
            </template>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import AddCoinsDialog from '@/components/AddCoinsDialog.vue'

export default {
  name: 'Home',
  components: {
    AddCoinsDialog
  },
  data: () => ({
    headers: [
      { text: "", value: "delete", filterable: false },
      { text: "#", value: "seq" },
      { text: "Name", value: "name" },
      { text: "HODLS", value: "qty" },
      { text: "YOLO'D", value: "spent" },
      { text: "Cost Average", value: "costAverage" },
      { text: "Current Coin Price (USD)", value: "currentPrice" },
      { text: "Buy the dip?", value: "costAverageDiff" },
    ],
    search: "",
    showAddCoinsDialog: false
  }),
  computed: {
    ...mapState([
      'allCoins',
      'coins',
    ])
  },
  methods: {
    ...mapActions([
      'getCoins',
      'getCurrentPrices',
      'syncCoins'
    ]),
    ...mapMutations([
      'removeCoin'
    ]),
    deleteRow(coin) {
      this.removeCoin(coin)
    },
    formatDollars(n) {
      return typeof n !== 'undefined' && n !== null
      ? n.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      : 'n/a'
    }
  },
  created() {
    if (this.allCoins.length === 0) {
      this.syncCoins()
    }
  }
}
</script>
