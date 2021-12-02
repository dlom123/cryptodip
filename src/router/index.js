import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dip100 from '../views/Dip100.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dip100',
    name: 'DIP100',
    component: Dip100
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
