<template>
    <v-container class="mt-4">
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FaqDialog from '@/components/FaqDialog'
import IconLegendDialog from '@/components/IconLegendDialog'

export default {
    name: 'Header',
    components: {
        FaqDialog,
        IconLegendDialog
    }
}
</script>