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
                ref="actionListItem"
                v-for="(menuItem, i) in menuItems"
                :key="i"
                class="coin-action-menu-item"
                @click.stop="onClickAction(menuItem)"
            >
                <v-list-item-content>
                    <v-list-item-title v-text="menuItem.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <DipAlertDialog
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
        menuItems: [
            // { title: 'Dip Alert', action: 'alert' },
            { title: 'Delete', action: 'delete' }
        ],
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
        onClickAction(menuItem) {
            this.showMenu = false
            switch (menuItem.action) {
                case 'alert':
                    this.showDipAlertDialog = true
                    break
                case 'delete':
                    this.deleteCoin(this.coin)
                    break
            }
        }
    }
}
</script>
