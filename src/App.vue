<template>
  <div>
    <!-- global header, nav, cart, etc. -->
    <MiniCart />
    <router-view />
  </div>
</template>

<script setup>
import MiniCart from './components/MiniCart.vue' // if you made it
</script>

<style>
body {
  font-family: sans-serif;
  padding: 0;
  margin: 0;
}
</style>
