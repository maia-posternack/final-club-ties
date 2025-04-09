<template>
    <div class="cart">
      <h2>Cart</h2>
      <ul>
        <li v-for="item in store.cartItems" :key="item.node.merchandise.id">
          {{ item.node.merchandise.title }} x {{ item.node.quantity }}
        </li>
      </ul>
      <button @click="checkout" v-if="store.checkoutUrl">Checkout</button>
    </div>
  </template>
  
  <script setup>
  import { useShopifyStore } from '../stores/shopify'
  const store = useShopifyStore()
  
  function checkout() {
    window.location.href = store.checkoutUrl
  }
  </script>
  
  <style scoped>
  .cart {
    margin-top: 2rem;
  }
  </style>
  