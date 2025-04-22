<template>
  <v-container id="login">
    <v-row height="100%">
      <v-col height="100%">
        <v-card height="100%"
          flat
          color="surface-variant"
          :image="taglineImage"
          subtitle="Take a walk down the beach"
          title="Evening sunset"></v-card>
      </v-col>

      <v-col>
        <v-card flat
          text
          v-if="isLoginView">
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
            <v-btn aria-label="Show registration module"
              @click="isLoginView = !isLoginView"
              text>Non hai un account? Registrati</v-btn>
          </v-card-actions>
        </v-card>

        <v-card flat
          text
          v-else>
          <v-card-title>Registrazione</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field v-model="newEmail"
                label="Email"
                type="email"
                required
                outlined
                clearable />
              <v-text-field v-model="newPassword"
                label="Password"
                type="password"
                required
                outlined
                clearable />
              <v-text-field v-model="confirmNewPassword"
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
            <v-alert v-if="registerError"
              type="error"
              class="mt-4"
              dense>
              {{ registerError }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import taglineImage from '@/assets/tagline.png'

  export default defineComponent({

    setup: () => {
      const email = ref('')
      const password = ref('')
      const newEmail = ref('')
      const newPassword = ref('')
      const confirmNewPassword = ref('')
      const error = ref<string | null>(null)
      const registerError = ref<string | null>(null)
      const router = useRouter()
      const auth = useAuthStore()
      const isLoginView = ref(true);

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

      const handleRegister = () => {
        registerError.value = null

        if (!newEmail.value || !newPassword.value || !confirmNewPassword.value) {
          registerError.value = 'Tutti i campi sono obbligatori.'
          return
        }

        if (newPassword.value !== confirmNewPassword.value) {
          registerError.value = 'Le password non coincidono.'
          return
        }

        try {
          auth.register(newEmail.value, newPassword.value)
          router.push('/')
        } catch (e) {
          registerError.value = e.message
        }
      }

      return { email, password, newEmail, newPassword, error, registerError, handleLogin, handleRegister, taglineImage, isLoginView, confirmNewPassword }
    }
  })
</script>
<style lang="scss" scoped>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
  }

  .v-card {
    max-width: 400px;
    margin: auto;
  }
</style>
