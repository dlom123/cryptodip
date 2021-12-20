<template>
  <v-dialog v-model="showHotkeysDialog" max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        v-bind="attrs"
        v-on="on"
        @click="openHotkeysDialog"
      >
        Hotkeys
      </v-btn>
    </template>

    <v-card max-width="800px">
      <v-card-title class="pa-0">
        <v-col class="pa-4 primary white--text text-h4 font-weight-medium">
          Hotkeys
        </v-col>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-list>
        <template v-for="(item, i) in hotkeys">
          <v-divider v-if="item.divider" :key="i"></v-divider>

          <v-list-item v-else :key="item.name">
            <v-list-item-avatar>
              <v-icon x-large>{{ item.name }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              {{ item.description }}
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'hotkeysDialog',
  data: () => ({
    hotkeys: [
      {
        name: "mdi-slash-forward-box",
        description: "Focus the Filter input box"
      },
      { divider: true },
      {
        name: "mdi-alpha-r-box",
        description: "Refresh Current Price"
      },
      { divider: true },
      {
        name: "mdi-alpha-y-box",
        description: "Focus the YOLO input box"
      },
      { divider: true },
      {
        name: "mdi-keyboard-esc",
        description: "Remove focus from input box (does not revert changes)"
      },
      { divider: true },
      {
        name: "mdi-keyboard-return",
        description: "Remove focus from input box (applies changes)"
      },
    ],
    showHotkeysDialog: true
    }),
    methods: {
        openHotkeysDialog() {
            this.showHotkeysDialog = true
        }
    }
}
</script>
