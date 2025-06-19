import { createApp } from 'vue';
import App from './App.vue';

import axios from 'axios';
import router from './router';
import Toast from 'vue-toastification';

import './assets/main.css';
import 'vue-toastification/dist/index.css';

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

axios.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

  if (match) config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);

  return config;
});

const app = createApp(App);

app.use(router).use(Toast, { position: 'top-right' }).mount('#app');
