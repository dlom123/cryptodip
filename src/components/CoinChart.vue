<template>
    <v-container>
        {{ coin.name }}
    </v-container>
</template>

<script>
export default {
    name: 'CoinChart',
    props: [
        'coin'
    ],
    data: () => ({
    })
}
</script>
