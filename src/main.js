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

axios.interceptors.request.use(async (config) => {
  // 1. Check if the request method requires CSRF protection
  const csrfMethod = ['POST', 'PUT', 'DELETE', 'PATCH'];
  const needsCsrf = csrfMethod.includes(config.method);

  // 2. If the CSRF token is missing, get it from /sanctum/csrf-cookie
  if (needsCsrf && !document.cookie.includes('XSRF-TOKEN'))
    await axios.get('/sanctum/csrf-cookie');

  // 3. Always manually set the X-XSRF-TOKEN header from the cookie
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
  return config;
});

createApp(App).use(router).use(Toast, { position: 'top-right' }).mount('#app');
