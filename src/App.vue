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

const showIntro = ref(false)

onMounted(() => {
  // Show intro only if it hasn't been shown yet
  const introSeen = sessionStorage.getItem('introSeen')

  if (!introSeen) {
   
setTimeout(() => {
  showIntro.value = false;

  // force repaint
  document.body.style.display = 'none';
  setTimeout(() => {
    document.body.style.display = '';
  }, 10);
}, 5000);

  }
})

</script>
