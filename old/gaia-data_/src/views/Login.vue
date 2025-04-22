<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-6"
      max-width="500">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="email"
            label="Email"
            type="email"
            required
            outlined
            clearable />
          <v-text-field v-model="password"
            label="Password"
            type="password"
            required
            outlined
            clearable />
          <v-btn class="mt-4"
            color="primary"
            type="submit"
            block>
            Accedi
          </v-btn>
        </v-form>
        <v-alert v-if="error"
          type="error"
          class="mt-4"
          dense>
          {{ error }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn to="/register"
          text>Non hai un account? Registrati</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const email = ref('')
  const password = ref('')
  const error = ref(null)

  const router = useRouter()
  const auth = useAuthStore()

  const handleLogin = () => {
    error.value = null

    const userData = localStorage.getItem(email.value)
    if (!userData) {
      error.value = 'Utente non registrato.'
      return
    }

    const user = JSON.parse(userData)
    if (user.password !== password.value) {
      error.value = 'Password errata.'
      return
    }

    localStorage.setItem('loggedInUser', email.value)
    auth.user = email.value
    router.push('/')
  }
</script>
