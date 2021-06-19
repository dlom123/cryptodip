<template>
    <v-footer>
        <v-row no-gutters>
            <v-col
                cols="4"
                lg="3" offset-lg="1"
                xl="2" offset-xl="2"
            >
                <span v-if="nowApiKey" class="float-left">
                    <DonateButton />
                </span>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <span
                            v-bind="attrs"
                            v-on="on"
                            class="float-left ml-4 mt-3"
                        >
                            <a href="https://github.com/dlom123/cryptodip" target="_blank">
                                <v-img src="@/assets/github-logo.png" width="32"></v-img>
                            </a>
                        </span>
                    </template>
                    <span>CryptoDip on GitHub</span>
                </v-tooltip>
            </v-col>
            <v-col cols="4" align="center" align-self="center" class="text--secondary font-italic">
                This is not financial advice.
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import DonateButton from '@/components/DonateButton'

export default {
    name: 'Footer',
    components: {
        DonateButton
    },
    computed: {
        ...mapState([
            'nowApiKey'
        ])
    }
}
</script>