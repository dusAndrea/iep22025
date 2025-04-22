import './assets/main.css'

// Vuetify
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Router
import { createRouter, createWebHistory } from 'vue-router'
import router from '@/routes/index.ts'
import axios from 'axios'

import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

// vuetify
const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify)

// Router
const router = createRouter({
  history: createWebHistory(),
  routes: router
})

app.use(router)

// Pinia
app.use(createPinia())

app.config.globalProperties.$axios = axios
app.mount('#app')
