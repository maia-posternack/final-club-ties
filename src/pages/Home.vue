<template>

    <div class="products">
      <div
        v-for="product in store.products"
        :key="product.id"
        class="product-card"
      >
        <router-link :to="`/product/${product.handle}`">
          <img
            v-if="product.images.edges.length"
            :src="product.images.edges[0].node.url"
            alt="product image"
            width="200"
          />
          <h3>{{ product.title }}</h3>
        </router-link>
  
        <p>${{ product.variants.edges[0].node.price.amount }}</p>
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
    padding: 2rem;
  }
  .product-card {
    border: 1px solid #ccc;
    padding: 1rem;
    width: 200px;
    transition: all 0.3s ease;
  }
  .product-card:hover {
    transform: scale(1.03);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  