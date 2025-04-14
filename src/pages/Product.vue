<template>
  <div class="main-page font-helvetica">

    <div class="center-wrapper">
      <router-link to="/" class="back-button">← </router-link>

      <div v-if="product" class="product-page">
  <!-- Stacked wrapper by default -->
  <div class="product-content">
    <div class="image-gallery-grid">
      <img :src="selectedImage" alt="Selected product image" class="main-image" />
      <div class="thumbnail-row">
        <img
          v-for="(imageEdge, index) in product.images.edges"
          :key="index"
          :src="imageEdge.node.url"
          alt="Thumbnail"
          :class="['thumbnail', { active: imageEdge.node.url === selectedImage }]"
          @click="selectImage(imageEdge.node.url)"
        />
      </div>
    </div>

    <div class="product-info">
      <h1><router-link to="/">{{ product.title }}</router-link></h1>

      <div class="description-block">
        <p class="intro-text">
          <em>{{ product.description.split('Care instructions')[0].trim() }}</em>
        </p>
        <p class="care-label">Care instructions</p>
        <ul class="care-list">
          <li v-for="line in careInstructions" :key="line">- {{ line }}</li>
        </ul>
      </div>

      <div class="product-price">
        ${{ product.variants.edges[0].node.price.amount }}
      </div>

      <button @click="addToCart" class="add-to-cart">Add to Cart</button>
    </div>
  </div>
</div>

    </div>
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
const careInstructions = ref([])

onMounted(async () => {
  const data = await store.fetchProductByHandle(route.params.handle)
  product.value = data

  // Extract care instructions as array
  const desc = data.description
  const care = desc.split('Care instructions')[1]
  if (care) {
    careInstructions.value = care
      .split('-')
      .map(str => str.trim())
      .filter(Boolean)
  }
})
const selectedImage = ref('')

function selectImage(url) {
  selectedImage.value = url
}
onMounted(async () => {
  const data = await store.fetchProductByHandle(route.params.handle)
  product.value = data
  selectedImage.value = data.images.edges[0]?.node.url || ''
})


</script>
<style scoped>
.product-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  padding: 3rem 1.5rem;
  color: #f4e8b5;
  font-family: "Helvetica Neue LT Std", sans-serif;
}

/* Image Column */
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 0 0 350px;
}

.image-gallery img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.image-gallery img:hover {
  transform: scale(1.03);
}

/* Info Column */
.product-info {
  flex: 1;
}

.product-info h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.product-info h1 a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}

.product-info h1 a:hover {
  color: #ffd700;
}

/* Description styling */
.description-block {
  margin-bottom: 2rem;
}

.intro-text {
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.care-label {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.care-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.care-list li {
  margin-bottom: 0.4rem;
  padding-left: 0.5rem;
  position: relative;
  color: #f4e8b5;
}

.care-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: #ffd700;
}

/* Price */
.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffd700;
  margin: 2rem 0 1.5rem;
}

/* Add to cart button */
.add-to-cart {
  background-color: #4e0101 !important;
  color: #f4e8b5;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.add-to-cart:hover {
  background-color: #600101 !important;
  transform: translateY(-2px) scale(1.03);
}

.main-page {
  min-height: 100dvh;
  background-image: url('/bg-pattern.png');
  background-color: #7c0a02 ;
  background-blend-mode: multiply;
  background-size: 600px auto;
  background-attachment: scroll;
  background-repeat: repeat;
  animation: bgscroll 60s linear infinite;
  transform: translateZ(0);
  overflow: hidden;

}

.image-gallery {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  max-width: 100%;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.image-gallery img {
  flex: 0 0 auto;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.image-gallery img:hover {
  transform: scale(1.05) rotate(-1deg);
}

.image-gallery-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}


.main-image {
  margin-top: 10px;
  width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thumbnail-row {
  display: flex;
  gap: 1rem;
  justify-content: start;
}

.thumbnail {
  width: 122px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.thumbnail:hover {
  opacity: 1;
  transform: scale(1.05);
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #ffd700;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.thumbnail-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.back-button {
  display: inline-block;
  margin-bottom: 1rem;
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
  transition: color 0.2s;
  margin-left: 1rem;
  margin-top: .5rem;
}

.back-button:hover {
  color: #f4e8b5;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.product-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: #f4e8b5;
  font-family: "Helvetica Neue LT Std", sans-serif;
}

/* Make layout stacked by default */
.product-content {
  display: block;
}

/* Images */
.image-gallery-grid {
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem auto;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thumbnail-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.thumbnail {
  width: 100px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.thumbnail:hover {
  opacity: 1;
  transform: scale(1.05);
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #ffd700;
}

/* Info block stays below unless we override on desktop */
.product-info {
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
}

/* Responsive override for large screens */
@media (min-width: 1024px) {



}


</style>