<template>
  <v-app :theme="theme">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Sustainability App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn v-if="loggedIn" to="/profile" text>Profilo</v-btn>
      <v-btn v-if="!loggedIn" to="/login" text>Login</v-btn>
      <v-btn v-if="!loggedIn" to="/register" text>Registrati</v-btn>
      <v-btn v-if="loggedIn" text @click="logout">Logout</v-btn>
      <v-switch v-model="isDark" label="Dark Mode" class="ml-4" inset hide-details />
    </v-app-bar>
    <v-main>
      <v-container class="pa-4">
        <v-alert v-if="loggedIn" type="info" class="mb-4">
          Benvenuto, {{ loggedUser }}!
        </v-alert>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const loggedIn = ref(!!localStorage.getItem('loggedInUser'))
const loggedUser = ref(localStorage.getItem('loggedInUser'))

const logout = () => {
  localStorage.removeItem('loggedInUser')
  loggedIn.value = false
  loggedUser.value = ''
  router.push('/login')
}

const themeManager = useTheme()
const isDark = ref(themeManager.global.name.value === 'dark')

watch(isDark, (val) => {
  themeManager.global.name.value = val ? 'dark' : 'light'
})

const theme = computed(() => themeManager.global.name.value)
</script>

