<template>
  <div class="main-page font-helvetica">
    <div class="product-scroll">
      <!-- Mission text as first scrollable card -->
      <div class="mission-text scroll-card">
        <img src="/logo-yellow.png" alt="Logo" class="mission-logo" />
        <h1 class="statement-text">
          Do you hate yourself? Like real bad? <br />
          Delivered to your door in 3–5 business days for the low, low price of $9.99
        </h1>
      </div>


      <!-- Products -->
      <div v-for="product in store.products" :key="product.id" class="product-card">
        <!-- Wrap in router-link -->
        <router-link :to="`/product/${product.handle}`" class="block hover:no-underline text-inherit">
          <img v-if="product.images.edges.length" :src="product.images.edges[0].node.url" alt="product image"
            class="product-image" />
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">
            ${{ product.variants.edges[0].node.price.amount }}
          </p>
        </router-link>

        <!-- Button stays outside the link -->
        <button class="add-button" @click="add(product)">Add to Cart</button>
      </div>

    </div>
  </div>
  <div class="worthy-banner-wrapper">
    <div class="worthy-banner-track">
      <span v-for="i in 50" :key="i" class="worthy-text">YOU ARE WORTHY. </span>
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
.main-page {
  display: flex;
  height: 100dvh;
  overflow: hidden;
  background-image: url('/bg-pattern-darker.png');
  background-color: #7c0a02 !important;
  background-size: 600px auto;
  background-attachment: fixed;
  animation: bgscroll 60s linear infinite;
}

.mission {
  flex: 0 0 30%;
  color: white;
  background-color: rgba(0, 0, 0, 0.7) !important;
  font-family: 'Georgia', serif;
  top: 0;
  height: 100vh;
}

.product-scroll {
  flex: 1;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 2rem;
  padding: 3rem;
  align-items: center;
}

.product-card {
  flex: 0 0 auto;
  width: 250px;
  scroll-snap-align: center;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05) rotate(0.5deg);
}

.product-image {
  width: 100%;
  border-radius: 8px;
}

.add-button {
  background: black;
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 999px;
  transition: background 0.2s;
}

.add-button:hover {
  background: #222;
}


@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flicker {

  0%,
  100% {
    opacity: 1;
  }

  45% {
    opacity: 0.8;
  }

  55% {
    opacity: 0.3;
  }

  65% {
    opacity: 0.8;
  }

  75% {
    opacity: 0.4;
  }

  85% {
    opacity: 1;
  }
}


.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fadein {
  animation: fadein 1s ease-out both;
}

.animate-flicker {
  animation: flicker 4s infinite;
}



.mission-text {
  width: 400px;
  /* or 500px if you want it even wider */
  min-width: 400px;
  color: white;
  animation: fadeSlideIn 1.5s ease-out;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  flex: 0 0 auto;
  scroll-snap-align: center;
  transform: translateY(-20px);
}

.statement-text {
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  background: linear-gradient(90deg, #ffffff, #ffd700, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: shimmer 6s infinite linear;
}


@keyframes shimmer {
  0% {
    background-position: -200% center;
  }

  100% {
    background-position: 200% center;
  }
}

@keyframes floatText {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-image:hover {
  animation: floatWiggle 1s ease infinite alternate;
}

@keyframes floatWiggle {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-5px) rotate(-2deg);
  }

  100% {
    transform: translateY(-8px) rotate(1deg);
  }
}

.statement-text {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {

  0%,
  100% {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }

  50% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
}

.product-title {
  font-weight: bold;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;

}

.worthy-banner-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.85);
  z-index: 100;
  border-top: 2px solid #ffd700;
}

.worthy-banner-track {
  display: inline-block;
  white-space: nowrap;
  padding-left: 100%;
  animation: marquee-left 60s linear infinite;
}

.worthy-text {
  color: #fff;
  font-size: 0.75rem;
  padding: 0 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.mission-logo {
  width: 200px;


}
@media (max-width: 768px) {
  .main-page {
    flex-direction: column;
    overflow: auto;
    padding-left: 1rem;
    padding-right: 1rem

  }
  .statement-text {
    font-size: 1.3rem;
   
  }

  .mission-text {
    padding: 0rem 3rem 0rem 3rem;
  }


  .product-scroll {
    flex-direction: column;
    overflow-x: hidden;
    padding: 1.5rem;
  }

  .product-card {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .mission-logo {
    width: 100px;
    display: block;
    margin: 0 auto;
  }

}
</style>