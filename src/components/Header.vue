<template>
    <v-container fluid class="mt-4">
        <v-row>
            <v-col>
                <span class="text-h3 font-weight-bold">
                    <span class="primary--text">Crypto</span>
                    <span class="red--text">Dip</span>
                </span>
                <p class="ml-11 text--secondary">See the dip. Buy the dip.</p>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align="end">
                <FaqDialog />
                <IconLegendDialog />
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <span
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-btn
                                color="red"
                                class="pa-0 ml-4 white--text"
                                @click="onClickForgetMe"
                            >
                                <v-icon>mdi-exit-run</v-icon>
                            </v-btn>
                        </span>
                    </template>
                    <span>Forget Me</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FaqDialog from '@/components/FaqDialog'
import IconLegendDialog from '@/components/IconLegendDialog'

export default {
    name: 'Header',
    components: {
        FaqDialog,
        IconLegendDialog
    },
    computed: {
        ...mapState([
            'hasBackEndApiKey'
        ])
    },
    methods: {
        ...mapMutations([
            'addCoinList',
            'setHasBackEndApiKey'
        ]),
        onClickForgetMe() {
            // clear app information from localStorage and reset state to initial values
            window.localStorage.removeItem('vuex-cryptodip')
            // preserve setting for displaying API system bar
            const hasApiKey = this.hasBackEndApiKey
            // store reset functionality enabled by vuex-extensions package
            this.$store.reset()
            // restore the default coin list
            this.addCoinList("Dips")
            // restore setting for displaying API system bar
            this.setHasBackEndApiKey(hasApiKey)
        }
    }
}
</script>