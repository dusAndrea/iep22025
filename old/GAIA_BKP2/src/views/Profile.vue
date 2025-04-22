<template>
  <v-card class="pa-4 mx-auto"
    max-width="500">
    <v-card-title>Profilo Utente</v-card-title>
    <v-card-text>
      <div><strong>Email:</strong> {{ auth.user }}</div>

      <v-text-field class="mt-4"
        v-model="newPassword"
        label="Nuova password"
        type="password"
        outlined />

      <v-btn class="mt-2"
        color="primary"
        @click="updatePassword">Aggiorna Password</v-btn>
      <v-btn class="mt-2 ml-4"
        color="red"
        @click="deleteAccount">Elimina Account</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const router = useRouter()
  const auth = useAuthStore()

  const newPassword = ref('')

  const updatePassword = () => {
    if (!auth.user) return

    const user = JSON.parse(localStorage.getItem(auth.user))
    if (user) {
      user.password = newPassword.value
      localStorage.setItem(auth.user, JSON.stringify(user))
      alert('Password aggiornata')
      newPassword.value = ''
    }
  }

  const deleteAccount = () => {
    if (!auth.user) return

    if (confirm('Sei sicuro di voler eliminare il tuo account?')) {
      localStorage.removeItem(auth.user)
      localStorage.removeItem('loggedInUser')
      auth.logout()
      alert('Account eliminato')
      router.push('/register')
    }
  }
</script>
