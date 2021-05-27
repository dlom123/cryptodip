<template>
    <v-dialog
        v-model="showIconLegendDialog"
        max-width="800px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn text color="primary"
                v-bind="attrs"
                v-on="on"
                @click="openIconLegendDialog"
            >
                Icons
            </v-btn>
        </template>
        <v-card max-width="800px">
            <v-toolbar
                color="primary"
                dark
            >
                <v-toolbar-title>Icon Legend</v-toolbar-title>
            </v-toolbar>

            <v-list three-line>
                <template v-for="(icon, i) in legendIcons">
                    <v-divider
                        v-if="icon.divider"
                        :key="i"
                        :inset="icon.inset"
                    ></v-divider>

                    <v-list-item
                        v-else
                        :key="icon.title"
                    >
                        <v-list-item-avatar>
                            <v-icon
                                x-large
                                :color="icon.color"
                            >{{ icon.name }}</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-html="icon.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="icon.description" class="text-wrap"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'IconLegendDialog',
    data: () => ({
        legendIcons: [
            {
                name: "mdi-refresh",
                color: "green",
                title: "Refresh Data Button",
                description: "Use this button on the home page to retrieve the latest coin prices, or within the Add Coins dialog to retrieve an updated list of all available coins"
            },
            { divider: true },
            {
                name: "mdi-pencil-circle",
                color: "blue",
                title: "Edit Coin List Button",
                description: "Use this button to add and remove coins from your list"
            },
            { divider: true },
            {
                name: "mdi-help-circle",
                color: "grey",
                title: "Help Popup",
                description: "Hover over these icons for more information"
            },
            { divider: true },
            {
                name: "mdi-arrow-down-bold",
                color: "light-green accent-4",
                title: "Price Dip",
                description: "Indicates that the Current Price is lower than the Cost Average by the percentage shown"
            },
            { divider: true },
            {
                name: "mdi-arrow-up-bold",
                color: "red",
                title: "Price Rise",
                description: "Indicates that the Current Price is higher than the Cost Average by the percentage shown"
            },
            { divider: true },
            {
                name: "mdi-star",
                color: "yellow darken-1",
                title: "'Big Dipper' Badge",
                description: "This icon appears next to the coin whose Current Price is the lowest relative to its Cost Average"
            },
            { divider: true },
            {
                name: "mdi-rocket-launch",
                color: "blue",
                title: "'To the Moon!' Badge",
                description: "This icon appears next to the coin whose Current Price is the highest relative to its Cost Average"
            },
            { divider: true },
            {
                name: "mdi-currency-usd",
                color: "green",
                title: "'Best Bang for the Buck' Badge",
                description: "This icon appears next to the coin whose Cost Average can be reduced the most based on the amount available to spend (YOLO)"
            },
        ],
        showIconLegendDialog: false
    }),
    methods: {
        openIconLegendDialog() {
            this.showIconLegendDialog = true
        }
    }
}
</script>
