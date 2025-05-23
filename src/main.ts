import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import vuetify from './plugins/vuetify';
import 'vuetify/styles';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount('#app');
