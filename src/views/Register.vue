<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-6"
      max-width="500">
      <v-card-title>Registrazione</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
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
          <v-text-field v-model="confirmPassword"
            label="Conferma Password"
            type="password"
            required
            outlined
            clearable />
          <v-btn class="mt-4"
            color="primary"
            type="submit"
            block>
            Registrati
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
        <v-btn to="/"
          text>Hai già un account? Accedi</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  export default defineComponent({
    name: 'Register',
    setup() {
      const router = useRouter()
      const auth = useAuthStore()
      const email = ref('')
      const password = ref('')
      const confirmPassword = ref('')
      const error = ref(null)
      const handleRegister = () => {
        error.value = null

        if (!email.value || !password.value || !confirmPassword.value) {
          error.value = 'Tutti i campi sono obbligatori.'
          return
        }

        if (password.value !== confirmPassword.value) {
          error.value = 'Le password non coincidono.'
          return
        }

        try {
          auth.register(email.value, password.value)
          router.push('/')
        } catch (e: any) {
          error.value = e.message
        }
      }
      return {
        email,
        password,
        confirmPassword,
        error,
        handleRegister
      }
    }
  })
</script>
