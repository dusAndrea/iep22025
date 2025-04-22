import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    register(email, password) {
      const existing = localStorage.getItem(email)
      if (existing) throw new Error('Utente già registrato.')

      const newUser = { email, password }
      localStorage.setItem(email, JSON.stringify(newUser))
      localStorage.setItem('loggedInUser', email)
      this.user = email
    },
    logout() {
      localStorage.removeItem('loggedInUser')
      this.user = null
    },
    loadUser() {
      const saved = localStorage.getItem('loggedInUser')
      if (saved) this.user = saved
    }
  }
})
