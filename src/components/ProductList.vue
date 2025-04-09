<template>
  <div class="products">
    <div v-for="product in store.products" :key="product.id" class="product-card">
      <img
        v-if="product.images.edges.length"
        :src="product.images.edges[0].node.url"
        alt="product image"
        width="200"
      />
      <h3>{{ product.title }}</h3>
      <p>\${{ product.variants.edges[0].node.price.amount }}</p>
      <button @click="add(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useShopifyStore } from '../stores/shopify'

const store = useShopifyStore()

onMounted(() => {
  console.log('fetchProducts triggered')
  store.fetchProducts()
})

function add(product) {
  const variantId = product.variants.edges[0].node.id
  store.addToCart(variantId)
}
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  width: 200px;
}
</style>
