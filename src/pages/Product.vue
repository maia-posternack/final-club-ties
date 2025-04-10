<template>
    <div v-if="product" class="max-w-4xl mx-auto p-8">
      <!-- Product Title -->
      <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
  
      <!-- Scrollable Image Gallery -->
      <div class="flex gap-4 overflow-x-auto mb-6">
        <img
          v-for="(imageEdge, index) in product.images.edges"
          :key="index"
          :src="imageEdge.node.url"
          alt="Product image"
          class="h-64 w-auto rounded shadow"
        />
      </div>
  
      <!-- Product Description -->
      <p class="text-gray-700 whitespace-pre-line mb-4">
        {{ product.description }}
      </p>
  
      <!-- Variant Price -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold">Price:</h2>
        <p class="text-xl">${{ product.variants.edges[0].node.price.amount }}</p>
      </div>
  
      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShopifyStore } from '../stores/shopify'

const route = useRoute()
const store = useShopifyStore()
const product = ref(null)

onMounted(async () => {
  product.value = await store.fetchProductByHandle(route.params.handle)
})

function addToCart() {
  const variantId = product.value.variants.edges[0].node.id
  store.addToCart(variantId)
}
</script>
  