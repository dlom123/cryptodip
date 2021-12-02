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
                        <span class="text-h5 font-weight-bold">Dip Alert</span>
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

            <v-card-text class="px-4 pb-0">
                <v-container>
                    <v-row>
                        <v-col class="px-4 pt-5 text-h6 font-weight-bold">
                            <v-img :src="coin.icon" width="30" class="mr-2 float-left"></v-img>
                            <span class="mr-4">{{ coin.name }}</span>
                            <RefreshPricesButton size="x-small" :coinIds="[coin.id]" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="ml-4 pt-0">
                            <v-row no-gutters>
                                <v-col cols="4" class="text-overline font-weight-bold">Cost Average</v-col>
                                <v-col cols="4" class="text-overline font-weight-bold">Current Price</v-col>
                                <v-col cols="4" class="text-overline font-weight-bold">Buy The Dip?</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="4" class="pt-0">
                                    <template v-if="
                                        !isNaN(coin.costAverage)
                                        && typeof coin.costAverage !== 'undefined'
                                    ">
                                        {{ formatDollars(coin.costAverage) }}
                                    </template>
                                    <template v-else>
                                        <InfoTooltip
                                            icon="mdi-help"
                                            position="top"
                                            :text="tooltipText['costAverageBlank']"
                                        />
                                    </template>
                                </v-col>
                                <v-col cols="4" class="pt-0">
                                    <template v-if="typeof coin.currentPrice !== 'undefined'">
                                        {{ formatDollars(coin.currentPrice) }}
                                    </template>
                                    <template v-else>
                                        <InfoTooltip
                                            icon="mdi-help"
                                            position="top"
                                            :text="tooltipText['currentPriceBlank']"
                                        />
                                    </template>
                                </v-col>
                                <v-col cols="4" class="pt-0">
                                    <template v-if="typeof coin.costAverageDiff !== 'undefined'">
                                        <BuyTheDip :coin=coin />
                                    </template>
                                    <template v-else>
                                        <InfoTooltip
                                            icon="mdi-help"
                                            position="top"
                                            :text="tooltipText['costAverageDiffBlank']"
                                        />
                                    </template>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-h6">
                            Alert me when...
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="pt-2">
                        <v-col>
                            Current Price is below
                        </v-col>
                        <v-col cols="1" align="center">..<em>or</em>..</v-col>
                        <v-col class="pl-6">
                            Buy The Dip? is above
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pt-0">
                            <v-text-field
                                ref="inputAlertCurrentPrice"
                                hide-details
                                clearable
                                outlined
                                dense
                                class="text-lighten-2"
                                :value="displayAlertCurrentPrice"
                                @change="onChangeAlertCurrentPrice"
                                @click:clear="onChangeAlertCurrentPrice"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="pt-0" offset="1">
                            <v-text-field
                                ref="inputAlertBuyTheDip"
                                hide-details
                                clearable
                                outlined
                                dense
                                class="text-lighten-2"
                                :value="displayAlertBuyTheDip"
                                @change="onChangeAlertBuyTheDip"
                                @click:clear="onChangeAlertBuyTheDip"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="pt-3">
                        <v-col>Notes</v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pt-0 pb-0">
                            <v-textarea
                                ref="inputNotes"
                                outlined
                                clearable
                                no-resize
                                rows="3"
                                counter
                                :rules="rules"
                                :value="alertNotes"
                                @click:clear="onClearNotes"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-container>
                    <v-row justify="end">
                        <v-col cols="3">
                            <v-btn
                                block
                                color=""
                                class="mb-2"
                                @click="closeDialog"
                            >
                                Cancel
                            </v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn
                                block
                                color="primary"
                                class="mb-2"
                                @click="onClickSave"
                            >
                                Save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import BuyTheDip from '@/components/BuyTheDip.vue'
import InfoTooltip from '@/components/InfoTooltip.vue'
import RefreshPricesButton from '@/components/RefreshPricesButton.vue'
import { formatDollars, formatPercentage } from '@/utils/functions'
import { tooltipText } from '@/utils/constants'

export default {
    name: "DipAlertDialog",
    props: [
        'closeDialog',
        'coin',
        'reRender',
        'showDialog'
    ],
    components: {
        BuyTheDip,
        InfoTooltip,
        RefreshPricesButton
    },
    data: () => ({
        alertCurrentPrice: null,
        alertBuyTheDip: null,
        alertNotes: '',
        currentPriceValue: null,
        rules: [this.validateNotes],
        tooltipText
    }),
    computed: {
        displayAlertBuyTheDip() {
            return this.alertBuyTheDip
                ? this.formatPercentage(this.alertBuyTheDip)
                : ""
        },
        displayAlertCurrentPrice() {
            return this.alertCurrentPrice
                ? this.alertCurrentPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 12
                    })
                : ""
        }
    },
    methods: {
        ...mapMutations([
            'setCoinAlerts'
        ]),
        formatDollars,
        formatPercentage,
        onChangeAlertBuyTheDip(value) {
            let n = undefined
            if (typeof value === 'string') {
                n = parseFloat(value.replace(/[%,]/g, ''))
            }
            this.alertBuyTheDip = isNaN(n) ? undefined : n
        },
        onChangeAlertCurrentPrice(value) {
            let n = undefined
            if (typeof value === 'string') {
                n = parseFloat(value.replace(/[$,]/g, ''))
            }
            this.alertCurrentPrice = isNaN(n) ? undefined : n
        },
        onClearNotes() {
            console.log('yoyoooo')
            this.alertNotes = ''
            console.log(this.$refs.inputNotes.value)
        },
        onClickSave() {
            if (this.$refs.inputNotes.value) {
                console.log(this.$refs.inputNotes.value)
                return false
            }
            this.setCoinAlerts({
                coinId: this.coin.id,
                alerts: {
                    buyTheDip: this.alertBuyTheDip,
                    currentPrice: this.alertCurrentPrice
                }
            })
            this.closeDialog()
        },
        resetInputs() {
            this.alertBuyTheDip = this.coin.alerts.buyTheDip
            this.alertCurrentPrice = this.coin.alerts.currentPrice
        },
        validateNotes(v) {
            return v.length <= 150 || 'Max 150 characters'
        }
    },
    watch: {
        reRender() {
            // force a re-render when this dialog is opened (since it never
            // gets destroyed), so that the text inputs are up-to-date
            this.resetInputs()
        }
    }
}
</script>
