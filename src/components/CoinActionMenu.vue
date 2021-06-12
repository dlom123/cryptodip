<template>
    <v-menu
        bottom
        left
        v-model="showMenu"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                x-small
                text
                plain
                tabindex="-1"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list
            dense
            class="pa-0"
        >
            <v-list-item
                class="coin-action-menu-item"
                @click.stop="onClickDipAlert"
            >
                <v-list-item-content>
                    <v-list-item-title>Dip Alert</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                class="coin-action-menu-item"
                @click.stop="onClickDelete"
            >
                <v-list-item-content>
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <DipAlertDialog
            :reRender=dialogKey
            :showDialog=showDipAlertDialog
            :closeDialog=closeDialog
            :coin=coin
        />
    </v-menu>
</template>

<script>
import { mapActions } from 'vuex'
import DipAlertDialog from '@/components/DipAlertDialog.vue'

export default {
    name: 'CoinActionMenu',
    props: [
        'coin'
    ],
    components: {
        DipAlertDialog
    },
    data: () => ({
        dialogKey: null,
        showDipAlertDialog: false,
        showMenu: false
    }),
    methods: {
        ...mapActions([
            'deleteCoin'
        ]),
        closeDialog() {
            this.showDipAlertDialog = false
        },
        onClickDelete() {
            this.showMenu = false
            this.deleteCoin(this.coin)
        },
        onClickDipAlert() {
            this.dialogKey = Math.random()
            this.showMenu = false
            this.showDipAlertDialog = true
        }
    }
}
</script>
