<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab dark color="primary"
        v-bind="attrs"
        v-on="on"
        @click="openDialog"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Coins</span>
        <v-btn text plain x-small absolute right @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pb-0">
        <v-container class="pb-0">
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="selectedCoins"
                placeholder="Choose coins..."
                item-text="name"
                item-value="id"
                multiple
                autofocus
                auto-select-first
                clearable
                hide-selected
                outlined
                :items="allCoins"
                :filter="coinFilter"
                :search-input.sync="searchInput"
                @input="searchInput = null"
              >
                <template v-slot:selection="data">
                    <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="remove(data.item)"
                    >
                        <v-avatar left>
                            <v-img :src="data.item.icon"></v-img>
                        </v-avatar>
                        {{ data.item.name }}
                    </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <v-img :src="data.item.icon" :alt="data.item.name"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.symbol"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="primary"
          class="mb-2"
          @click="selectCoins"
        >
          Select
          {{ selectedCoins.length }} Coin{{ selectedCoins.length !== 1 ? 's' : '' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
  name: "AddCoinsDialog",
  data: () => ({
    searchInput: null,
    selectedCoins: [],
    showDialog: false
  }),
  computed: {
    ...mapState([
      "allCoins",
      "coins"
    ]),
  },
  methods: {
    ...mapMutations([
      'setCoins'
    ]),
    closeDialog() {
      this.showDialog = false
      this.selectedCoins = []
    },
    coinFilter(item, queryText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.symbol.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1
              || textTwo.indexOf(searchText) > -1
    },
    openDialog() {
      this.selectedCoins = this.coins.map(coin => coin.id)
    },
    remove(item) {
      this.selectedCoins = this.selectedCoins.filter(coinId => coinId !== item.id)
    },
    selectCoins() {
      this.setCoins(this.selectedCoins)
      this.showDialog = false
      this.selectedCoins = []
    }
  }
}
</script>