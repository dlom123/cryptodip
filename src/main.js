import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import '@/sass/index.sass'

Vue.config.productionTip = false

// Register a global custom directive called `v-blur` that prevents focus.
// source: https://github.com/vuetifyjs/vuetify/issues/8572
Vue.directive('blur', {
  inserted: function (el) {
    el.onfocus = (ev) => ev.target.blur()
  }
})

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
