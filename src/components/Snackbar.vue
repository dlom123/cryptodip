<template>
    <v-snackbar
        top
        timeout="3000"
        v-model="isShowing"
        color="red"
    >
        <span class="font-weight-bold">
            {{ snackbarMessage }}
        </span>
        <template v-slot:action="{ attrs }">
            <v-btn
                icon
                v-bind="attrs"
                color="white"
                @click="isShowing = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Snackbar",
  props: ['msg'],
  computed: {
    ...mapState([
      "showSnackbar",
      "snackbarMessage"
    ]),
    isShowing: {
      get() {
        return this.showSnackbar;
      },
      set(newValue) {
        this.setShowSnackbar(newValue);
      },
    },
  },
  methods: {
    ...mapMutations(["setShowSnackbar"]),
  },
};
</script>
