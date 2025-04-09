import { defineStore } from 'pinia'
import axios from 'axios'

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN


const api = axios.create({
  baseURL: `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
})

export const useShopifyStore = defineStore('shopify', {
  state: () => ({
    products: [],
    cartId: null,
    checkoutUrl: '',
    cartItems: [],
  }),

  actions: {
    async fetchProducts() {
      const query = `
      {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }`
      try {
        const res = await api.post('', { query })
        console.log('Shopify response:', res.data)
        this.products = res.data.data.products.edges.map(e => e.node)
      } catch (err) {
        console.error('Shopify API error:', err)
      }
    },

    async createCart() {
      const query = `
        mutation {
          cartCreate {
            cart {
              id
              checkoutUrl
            }
          }
        }
      `
      const res = await api.post('', { query })
      this.cartId = res.data.data.cartCreate.cart.id
      this.checkoutUrl = res.data.data.cartCreate.cart.checkoutUrl
    },

    async addToCart(variantId, quantity = 1) {
      if (!this.cartId) await this.createCart()

      const query = `
        mutation {
          cartLinesAdd(
            cartId: "${this.cartId}", 
            lines: [{
              merchandiseId: "${variantId}", 
              quantity: ${quantity}
            }]
          ) {
            cart {
              lines(first: 10) {
                edges {
                  node {
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                      }
                    }
                  }
                }
              }
              checkoutUrl
            }
          }
        }
      `
      const res = await api.post('', { query })
      console.log('Shopify response:', res.data)
      this.cartItems = res.data.data.cartLinesAdd.cart.lines.edges
      this.checkoutUrl = res.data.data.cartLinesAdd.cart.checkoutUrl
    },
  },
})
