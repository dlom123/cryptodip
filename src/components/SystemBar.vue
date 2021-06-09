<template>
  <v-system-bar height="50" color="primary" lights-out>
    <v-col
      cols="3"
      offset-lg="1"
      offset-xl="2"
      class="pa-0"
    >
      <v-text-field
        dense
        outlined
        hide-details
        clearable
        placeholder="CoinMarketCap API Key"
        :type="showApiKey ? 'text' : 'password'"
        :background-color="apiInputColor"
        :value="cmcApi.key"
        :append-icon="!cmcApi.key ? '' : showApiKey ? 'mdi-eye-off' : 'mdi-eye'"
        @change="updateApiKey"
        @click:clear="updateApiKey(null)"
        @click:append="() => (showApiKey = !showApiKey)"
      ></v-text-field>
    </v-col>
    <v-col>
      <span class="mr-2 text-h5 white--text font-weight-bold">API Usage</span>
      <v-chip class="api-usage-chip" color="white">
        <v-avatar left class="avatar">60s</v-avatar>
        {{ apiUsageMinute }}
      </v-chip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-chip class="api-usage-chip" color="white">
              <v-avatar left class="avatar px-5">24hr</v-avatar>
              {{ apiUsageDay }}
            </v-chip>
          </span>
        </template>
        <span>{{ apiResetDay }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-chip class="api-usage-chip" color="white">
              <v-avatar left class="avatar px-5">1mo</v-avatar>
              {{ apiUsageMonth }}
            </v-chip>
          </span>
        </template>
        <span>{{ apiResetMonth }}</span>
      </v-tooltip>
    </v-col>
  </v-system-bar>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { formatNumber } from "@/utils/functions";

export default {
  name: "SystemBar",
  data: () => ({
      showApiKey: false
  }),
  computed: {
    ...mapState(["cmcApi"]),
    apiInputColor() {
      return Object.keys(this.cmcApi).length === 0
        ? "white"
        : this.cmcApi.isValid
            ? "light-green"
            : "red"
    },
    apiResetDay() {
      if (
        !this.cmcApi.key ||
        !Object.prototype.hasOwnProperty.call(
          this.cmcApi,
          "credit_limit_daily_reset"
        )
      ) {
        return "Enter a CoinMarketCap API key";
      }
      return `Resets ${this.cmcApi.plan[
        "credit_limit_daily_reset"
      ].toLowerCase()}`;
    },
    apiResetMonth() {
      if (
        !this.cmcApi.key ||
        !Object.prototype.hasOwnProperty.call(
          this.cmcApi,
          "credit_limit_monthly_reset"
        )
      ) {
        return "Enter a CoinMarketCap API key";
      }
      return `Resets ${this.cmcApi.plan[
        "credit_limit_monthly_reset"
      ].toLowerCase()}`;
    },
    apiUsageMinute() {
      if (Object.prototype.hasOwnProperty.call(this.cmcApi, "usage")) {
        const usage = this.cmcApi.usage["current_minute"];
        const quota = usage["requests_made"] + usage["requests_left"];
        return `${formatNumber(usage["requests_made"])}/${formatNumber(quota)}`;
      }

      return "0/0";
    },
    apiUsageDay() {
      if (Object.prototype.hasOwnProperty.call(this.cmcApi, "usage")) {
        const usage = this.cmcApi.usage["current_day"];
        const quota = usage["credits_used"] + usage["credits_left"];
        return `${formatNumber(usage["credits_used"])}/${formatNumber(quota)}`;
      }

      return "0/0";
    },
    apiUsageMonth() {
      if (Object.prototype.hasOwnProperty.call(this.cmcApi, "usage")) {
        const usage = this.cmcApi.usage["current_month"];
        const quota = usage["credits_used"] + usage["credits_left"];
        return `${formatNumber(usage["credits_used"])}/${formatNumber(quota)}`;
      }

      return "0/0";
    },
  },
  methods: {
    ...mapActions(["getCmcApiInfo"]),
    ...mapMutations(["setCmcApi"]),
    updateApiKey(newApiKey) {
      this.getCmcApiInfo(newApiKey);
    },
  },
};
</script>
