<template>
    <v-dialog
        v-model="showDialog"
        max-width="500px"
        persistent
    >
        <v-card>
            <v-card-title class="pa-2 primary">
                <v-row no-gutters>
                    <v-col cols="10" class="pt-2 pb-1 pl-3 white--text">
                        <span class="headline">Dip Alert</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="2" align="end" align-self="center" class="pr-1">
                        <v-btn text plain x-small
                            @click="closeDialog"
                        >
                            <v-icon color="white">mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text class="px-0">
                <v-container>
                    <v-row>
                        <v-col cols="12" class="px-5 text-h6 font-weight-bold">
                            {{ coin.name }}
                        </v-col>
                        <v-col class="py-0">
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Cost Average</th>
                                            <th>Current Price</th>
                                            <th>Buy The Dip?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ formatDollars(coin.costAverage) }}</td>
                                            <td>{{ formatDollars(coin.currentPrice) }}</td>
                                            <td><BuyTheDip :coin=coin /></td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import BuyTheDip from '@/components/BuyTheDip.vue'
import { formatDollars } from '@/utils/functions'

export default {
  name: "DipAlertDialog",
  props: [
    'closeDialog',
    'coin',
    'showDialog'
  ],
  components: {
      BuyTheDip
  },
  methods: {
    formatDollars
  }
}
</script>
