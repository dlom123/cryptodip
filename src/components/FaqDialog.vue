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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                <strong>CryptoDip</strong> is an app for identifying opportunities to lower the
                                                average cost of your cryptocurrency hodlings &mdash; aka the <em>'dips'</em>.
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                <strong>HODLs</strong> are the total amount that you own of a cryptocurrency.
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                Remember all those times you sporadically threw money in the direction of the loudest corner of the Internet?
                                                <strong>YOLO'd</strong> is the total sum of money you have spent on a cryptocurrency over time to acquire those HODLs.
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                <strong>Cost Average</strong> is your average cost per coin.
                                            </p>
                                        </v-col>
                                        <v-col class="py-0">
                                            <p class="text-overline">Cost Average</p>
                                            <p>
                                                <code>YOLO'd / HODLs</code>
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                <strong>Current Price</strong> is retrieved from 
                                                <a
                                                    title="CoinMarketCap"
                                                    href="https://coinmarketcap.com/"
                                                    target="_blank"
                                                >CoinMarketCap</a>
                                                when the Refresh Current Price button is clicked.
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>The Current Price is displayed in USD.</p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                The <strong>"Buy the Dip?"</strong> percentage reflects the Current Price relative to your Cost Average.
                                                It could highlight an opportunity to lower your Cost Average.
                                            </p>
                                        </v-col>
                                        <v-col class="py-0">
                                            <p class="text-overline">"Buy the Dip?"</p>
                                            <p>
                                                <code>(Cost Average - Current Price) / Cost Average</code>
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                You like the coin.
                                            </p>
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            How accurate are the prices?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                Displayed prices are approximate.
                                            </p>
                                            <p>
                                                Hovering over the Current Price for a coin will display the exact amount as
                                                retrieved from CoinMarketCap.
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>The YOLO input allows you to enter how much you currently have available to spend,
                                                and the impact that the amount could have on a single coin.</p>
                                            <p>Once an amount is entered, the potential effect on each column of any listed coin
                                                is displayed below that column's value.</p>
                                            <p>The YOLO input is also used to determine which coin gets the "Best Bang for the
                                                Buck" badge since the largest Cost Average reduction you can realize depends on
                                                the amount available to spend on a single coin.</p>
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            What is Dip Alert?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                The <strong>Dip Alert</strong> feature allows you to set a desired price or cost
                                                average percentage (<em>Buy The Dip?</em>) threshold for a coin so that you can
                                                easily notice when its price moves within your parameters.
                                            </p>
                                            <p>
                                                <em>NOTE</em>: This is not an asynchronous alert (e.g., email, SMS). It is
                                                simply a visual aid. When a Dip Alert is triggered for any given coin, its entire
                                                row will be highlighted.
                                            </p>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>Everything is stored in your browser's Local Storage.</p>
                                            <p>Data transmitted over the network include:
                                                <ul>
                                                    <li>CoinMarketCap API key, if entered into the app's API bar.</li>
                                                    <li>List of available coins and their prices (from
                                                        <a
                                                            title="CoinMarketCap"
                                                            href="https://coinmarketcap.com/"
                                                            target="_blank"
                                                        >CoinMarketCap</a>)
                                                    </li>
                                                </ul>
                                            </p>
                                            <p>
                                            Your personal coin information is never sent over the network. Clear your browser's
                                            Local Storage manually or by using the Forget Me button and it's like you were never
                                            here!</p>
                                        </v-col>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="mb-2">
                                    <v-expansion-panel-header color="primary">
                                        <span class="text-h6 white--text">
                                            How can I support this project?
                                        </span>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-col class="pt-5 pb-0">
                                            <ol>
                                                <li>
                                                    <p>
                                                        <strong>Donate</strong>
                                                    </p>
                                                    <p>
                                                        You can use the Donate button to donate to
                                                        <a href="https://github.com/dlom123" target="_blank">me</a>
                                                        using a number of different cryptocurrencies. Any donations are
                                                        greatly appreciated. Thanks!
                                                    </p>
                                                    <p>
                                                        <DonateButton />
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <strong>Contribute</strong>
                                                    </p>
                                                    <p>
                                                        Visit the <a href="https://github.com/dlom123/cryptodip" target="_blank">CryptoDip GitHub</a>
                                                        to...
                                                        <ul>
                                                            <li>contribute code in the form of
                                                                <a href="https://github.com/dlom123/cryptodip/pulls" target="_blank">Pull Requests</a></li>
                                                            <li>report bugs in the form of
                                                                <a href="https://github.com/dlom123/cryptodip/issues" target="_blank">Issues</a></li>
                                                        </ul>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <strong>Share</strong>
                                                    </p>
                                                    <p>
                                                        Tell others about CryptoDip if you think it could be useful to them!
                                                    </p>
                                                </li>
                                            </ol>
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
                                        <v-col class="pt-5 pb-0">
                                            <p>
                                                <a
                                                    title="Reddit SatoshiStreetBets"
                                                    href="https://www.reddit.com/r/SatoshiStreetBets/"
                                                    target="_blank"
                                                >No.</a>
                                            </p>
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
import DonateButton from '@/components/DonateButton'

export default {
    name: 'FaqDialog',
    components: {
        DonateButton
    },
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
