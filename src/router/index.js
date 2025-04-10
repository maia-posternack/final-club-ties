import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Product from '../pages/Product.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/product/:handle', component: Product },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
