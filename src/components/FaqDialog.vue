<template>
    <v-dialog
        v-model="showFaqDialog"
        max-width="800px"
        @click:outside="expandedPanels = []"
        @keydown.esc="expandedPanels = []"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn text color="primary"
                v-bind="attrs"
                v-on="on"
                @click="openFaqDialog"
            >
                FAQ
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Frequently Asked Questions</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-expansion-panels
                                inset
                                multiple
                                :value="expandedPanels"
                            >
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What is CryptoDip?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            <strong>CryptoDip</strong> is an app for identifying opportunities to lower the average cost of your cryptocurrency hodlings &mdash; aka the <em>'dips'</em>.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What are HODLs?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            <strong>HODLs</strong> are the total amount that you own of a cryptocurrency.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What is YOLO'd?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            Remember all those times you sporadically threw money in the direction of the loudest corner of the Internet?
                                            <strong>YOLO'd</strong> is the total sum of money you have spent on a cryptocurrency over time to acquire those HODLs.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What is Cost Average?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            <strong>Cost Average</strong> is your average cost per coin.
                                        </v-col>
                                        <v-col>
                                            <p class="text-overline">Cost Average</p>
                                            <code>YOLO'd / HODLs</code>
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            Where does Current Price come from?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            <strong>Current Price</strong> is retrieved from 
                                            <a
                                                title="CoinMarketCap"
                                                href="https://coinmarketcap.com/"
                                                target="_blank"
                                            >CoinMarketCap</a>
                                            when the Refresh Current Price button is clicked.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            Which currency is the Current Price displayed as?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            The Current Price is displayed in USD.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What is the "Buy the Dip?" percentage and how is it calculated?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            The <strong>"Buy the Dip?"</strong> percentage reflects the Current Price relative to your Cost Average.
                                            It could highlight an opportunity to lower your Cost Average.
                                        </v-col>
                                        <v-col>
                                            <p class="text-overline">"Buy the Dip?"</p>
                                            <code>(Cost Average - Current Price) / Cost Average</code>
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            Why would I buy the dip?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            You like the coin.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What is the YOLO input for?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            The YOLO input is used to determine which coin gets the "Best Bang for the Buck" badge
                                            since the largest Cost Average reduction you can realize depends on the amount
                                            available to spend on a single coin.
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            Where is my data stored?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            Everything is stored in your browser's Local Storage. The only data that is ever
                                            transmitted over the network is the list of available coins and their current
                                            prices, which both come from
                                            <a
                                                title="CoinMarketCap"
                                                href="https://coinmarketcap.com/"
                                                target="_blank"
                                            >CoinMarketCap</a>.
                                            Your personal coin information is never sent over the network. Clear your Local
                                            Storage and it's like you were never here!
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            Is this financial advice?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5">
                                            <a
                                                title="Reddit SatoshiStreetBets"
                                                href="https://www.reddit.com/r/SatoshiStreetBets/"
                                                target="_blank"
                                            >No.</a>
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'FaqDialog',
    data: () => ({
        expandedPanels: [],
        showFaqDialog: false
    }),
    methods: {
        openFaqDialog() {
            this.showFaqDialog = true
        }
    }
}
</script>
