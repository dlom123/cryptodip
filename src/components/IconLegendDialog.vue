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
                Legend
            </v-btn>
        </template>
        <v-card max-width="800px">
            <v-card-title class="pa-0">
                <v-col class="pa-4 primary white--text text-h4 font-weight-medium">
                    Buttons
                </v-col>
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-list three-line>
                <template v-for="(item, i) in legendItems['buttons']">
                    <v-divider
                        v-if="item.divider"
                        :key="i"
                        :inset="item.inset"
                    ></v-divider>

                    <v-list-item
                        v-else
                        :key="item.title"
                    >
                        <v-list-item-avatar>
                            <v-icon
                                x-large
                                :color="item.color"
                            >{{ item.name }}</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.description" class="text-wrap"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <v-divider class="mx-4"></v-divider>

                <v-col class="pa-4 primary white--text text-h4 font-weight-medium">
                    Icons
                </v-col>
            <v-list three-line>
                <template v-for="(item, i) in legendItems['icons']">
                    <v-divider
                        v-if="item.divider"
                        :key="i"
                        :inset="item.inset"
                    ></v-divider>

                    <v-list-item
                        v-else
                        :key="item.title"
                    >
                        <v-list-item-avatar>
                            <v-icon
                                x-large
                                :color="item.color"
                            >{{ item.name }}</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.description" class="text-wrap"></v-list-item-subtitle>
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
        legendItems: {
            buttons: [
                {
                    name: "mdi-refresh",
                    color: "green",
                    title: "Refresh Data Button",
                    description: "Use this button on the main page to retrieve the latest coin prices, or within the Add Coins dialog to retrieve an updated list of all available coins"
                },
                { divider: true },
                {
                    name: "mdi-pencil-circle",
                    color: "blue",
                    title: "Add Coins Button",
                    description: "Use this button to add and remove coins from a list"
                },
                { divider: true },
                {
                    name: "mdi-file-download",
                    color: "blue",
                    title: "Export CSV Button",
                    description: "Download coin list data in CSV format"
                },
                { divider: true },
                {
                    name: "mdi-file-upload",
                    color: "blue",
                    title: "Import CSV Button",
                    description: "Upload coin list data from a CSV file"
                },
                { divider: true },
                {
                    name: "mdi-exit-run",
                    color: "red",
                    title: "Forget Me Button",
                    description: "Erase all of your data from the app. It's like you were never here!"
                },
            ],
            icons: [
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
                }
            ]
        },
        showIconLegendDialog: false
    }),
    methods: {
        openIconLegendDialog() {
            this.showIconLegendDialog = true
        }
    }
}
</script>
