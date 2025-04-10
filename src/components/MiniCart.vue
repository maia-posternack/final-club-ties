<template>
    <div class="fixed top-4 right-4 z-50">
      <div class="relative">
        <button @click="open = !open" class="bg-black text-white px-3 py-2 rounded-full">
          🛒 {{ total }}
        </button>
  
        <div
          v-if="open"
          class="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4"
        >
          <h3 class="font-bold mb-2">Cart</h3>
          <div v-for="item in store.cartItems" :key="item.node.merchandise.id" class="mb-2 flex">
            <img :src="preview(item)" class="w-12 h-12 object-cover rounded mr-2" />
            <div>
              <div>{{ item.node.merchandise.title }}</div>
              <div class="text-sm text-gray-600">Qty: {{ item.node.quantity }}</div>
            </div>
          </div>
          <button
            @click="checkout"
            class="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useShopifyStore } from '../stores/shopify'
  
  const store = useShopifyStore()
  const open = ref(false)
  
  const total = computed(() =>
    store.cartItems.reduce((sum, item) => sum + item.node.quantity, 0)
  )
  
  function checkout() {
    window.location.href = store.checkoutUrl
  }
  
  // You may need to adapt this if your cart items don't contain image info directly
  function preview(item) {
    return item.node.merchandise.image?.url || 'https://via.placeholder.com/50'
  }
  </script>
  