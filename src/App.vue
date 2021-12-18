<template>
  <v-app>
    <Snackbar />
    <SystemBar v-if="!hasBackEndApiKey" />
    <v-main>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12" lg="10" offset-lg="1" xl="8" offset-xl="2">
            <Header />
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Snackbar from '@/components/Snackbar.vue'
import SystemBar from '@/components/SystemBar.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    Snackbar,
    SystemBar
  },
  computed: {
    ...mapState([
      'hasBackEndApiKey'
    ])
  },
  methods: {
    ...mapActions([
      'checkBackEndApiKey'
    ]),
    ...mapMutations([
      'setNowApiKey'
    ])
  },
  created() {
    this.checkBackEndApiKey()
    if (process.env.VUE_APP_NOW_API_KEY && process.env.VUE_APP_NOW_API_KEY !== 'your_nowpayments_api_key') {
      this.setNowApiKey(process.env.VUE_APP_NOW_API_KEY)
    }
  }
}
</script>