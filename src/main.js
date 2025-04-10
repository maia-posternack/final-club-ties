import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './index.css' // ← import tailwind here

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
