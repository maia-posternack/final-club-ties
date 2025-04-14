<template>
  <div class="app-wrapper">
    
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

const showIntro = ref(false)

onMounted(() => {
  // Show intro only if it hasn't been shown yet
  const introSeen = sessionStorage.getItem('introSeen')

  if (!introSeen) {
    showIntro.value = true
    setTimeout(() => {
      showIntro.value = false
      sessionStorage.setItem('introSeen', 'true')
    }, 4000)
  }
  
})

</script>
<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

.app-wrapper {

  /* Safe area padding for iOS */
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
</style>

