<template>
<!-- Cart Toggle Button -->
<div class="fixed top-4 right-4 z-50">
  <button @click="toggleCart" class="cart-toggle px-3 py-2">
    🛒 {{ total }}
  </button>
</div>

<!-- Cart Background Overlay -->
<div
  v-if="open"
  class="fixed inset-0 z-30 bg-black bg-opacity-30"
  @click="closeCart"
/>

<!-- Cart Side Drawer -->
<transition name="slide">
  <div
    v-if="open"
    class="fixed top-0 right-0 h-full w-80 p-6 z-40 flex flex-col cart-drawer"
    @click.stop
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 cart-header">
      <h3>Your Cart</h3>
      <button @click="closeCart" class="text-white hover:text-[#f4e8b5] text-2xl font-bold">&times;</button>
    </div>

    <!-- Cart Items -->
    <div v-if="store.cartItems.length" class="space-y-4 overflow-y-auto flex-1">
      <div
        v-for="item in store.cartItems"
        :key="item.node.merchandise.id"
        class="flex items-start gap-3 cart-item"
      >
        <img :src="preview(item)" class="w-16 h-16 object-cover" />
        <div>
          <div class="font-semibold text-white">{{ item.node.merchandise.product.title }}</div>
          <div class="text-sm text-[#f4e8b5]">${{ item.node.merchandise.price.amount }}</div>
          <div class="text-xs text-gray-300">Qty: {{ item.node.quantity }}</div>
        </div>
      </div>
    </div>
    <div class="cart-total mt-4 flex justify-between text-sm text-white border-t border-white/20 pt-4">
  <span class="font-bold uppercase tracking-wider">Total</span>
  <span class="font-mono">${{ totalPrice.toFixed(2) }}</span>
</div>


    <!-- Checkout Button -->
    <div class="mt-4">
      <button @click="checkout" class="w-full checkout-btn">
        Checkout
      </button>
    </div>
  </div>
</transition>


</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useShopifyStore } from '../stores/shopify'

const store = useShopifyStore()
const open = ref(false)

function closeCart() {
  open.value = false
}


const total = computed(() =>
  store.cartItems.reduce((sum, item) => sum + item.node.quantity, 0)
)

function toggleCart() {
  open.value = !open.value
}

function checkout() {
  window.location.href = store.checkoutUrl
}

function preview(item) {
  return item.node.merchandise.image?.url || 'https://via.placeholder.com/50'
}
const lastTotalQuantity = ref(0)

watch(
  () => store.cartItems.map(item => item.node.quantity).reduce((a, b) => a + b, 0),
  (newTotal, oldTotal) => {
    if (newTotal > lastTotalQuantity.value) {
      open.value = true
    }
    lastTotalQuantity.value = newTotal
  }
)
const totalPrice = computed(() =>
  store.cartItems.reduce((sum, item) => {
    const quantity = item.node.quantity
    const price = parseFloat(item.node.merchandise.price.amount)
    return sum + price * quantity
  }, 0)
)
watch(
  () => store.cartItems.map(i => i.node.quantity).reduce((a, b) => a + b, 0),
  () => {
    const btn = document.querySelector('.cart-toggle')
    if (btn) {
      btn.classList.add('bump')
      setTimeout(() => btn.classList.remove('bump'), 400)
    }
  }
)



</script>


<style scoped>  
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
.cart-drawer {
  background: linear-gradient(to bottom, #7c0a02, #4e0101);
  color: white;
  font-family: "Helvetica Neue LT Std", sans-serif;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.4);
  /* ✂️ Removed yellow border */
}

.cart-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #f4e8b5; /* Less intense yellow */
}

.cart-item {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  border-radius: 10px;
  transition: transform 0.2s;
}

.cart-item:hover {
  transform: scale(1.02);
}

.cart-item img {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.checkout-btn {
  background-color: #f4e8b5;
  color: #4e0101;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.75rem;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background-color: #e5d798;
}

.cart-toggle {
  background: #000;
  color: white;
  font-weight: bold;
  border-radius: 999px;
  transition: background 0.2s;
}

.cart-toggle:hover {
  background: #333;
}
.cart-total {
  font-size: 0.95rem;
  color: #f4e8b5;
}
.cart-toggle {
  background-color: #4e0101; /* deep crimson */
  color: #f4e8b5; /* soft gold text */
  font-weight: bold;
  font-family: "Helvetica Neue LT Std", sans-serif;
  font-size: 0.9rem;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.cart-toggle:hover {
  background-color: #600101; /* darker on hover */
  transform: translateY(-2px) scale(1.05);
}

.cart-toggle.bump {
  animation: bumpCart 0.4s ease;
}

@keyframes bumpCart {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}


</style>