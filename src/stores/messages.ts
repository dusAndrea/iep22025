import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    message: '',
    show: false,
    color: 'info', // error | warning | info | success
    timeout: 4000
  }),
  getters: {
    getTimeout: state => state.timeout
  },
  actions: {
    showMessage(message: string, color: 'error' | 'warning' | 'info' | 'success' = 'info', timeout = 4000) {
      this.message = message;
      this.color = color;
      this.show = true;
      this.timeout = timeout;
    },
    close() {
      this.show = false;
    }
  }
});
