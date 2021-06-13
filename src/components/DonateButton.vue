<template>
    <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
        <span
            v-bind="attrs"
            v-on="on"
        >
            <a :href="`https://nowpayments.io/donation?api_key=${NowApiKey}`" target="_blank">
                <img
                    src="https://nowpayments.io/images/embeds/donation-button-white.svg"
                    alt="Donate to CryptoDip's creator using NOWPayments"
                    width="200"
                >
            </a>
        </span>
    </template>
    <span>Donate to CryptoDip's creator</span>
</v-tooltip>
</template>

<script>
export default {
    name: 'DonateButton',
    computed: {
        NowApiKey() {
            return process.env.VUE_APP_NOW_API_KEY
        }
    }
}
</script>
