<template>
  <v-app>
    <Snackbar />
    <SystemBar />
    <Header />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
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
  }
}
</script>