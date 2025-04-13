<template>
  <div>
    <Intro v-if="showIntro" />
    
    <div v-else>
      <!-- Global header, nav, cart, etc. -->
      <MiniCart />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MiniCart from './components/MiniCart.vue'
import Intro from './components/Intro.vue'

const showIntro = ref(true)

onMounted(() => {
  setTimeout(() => {
    showIntro.value = false
  }, 5000)
})
</script>
