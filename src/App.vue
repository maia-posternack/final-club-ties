<template>
  <div>
    <h1>My Shopify Store</h1>
    <ProductList />
    <Cart />
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
</script>

<style>
body {
  font-family: sans-serif;
  padding: 2rem;
}
</style>
