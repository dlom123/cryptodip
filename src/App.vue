<template>
  <v-app>
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
import SystemBar from '@/components/SystemBar.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    SystemBar
  }
}
</script>