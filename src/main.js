import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import Toast from 'vue-toastification';
import './assets/main.css';
import 'vue-toastification/dist/index.css';

import { ensureCsrfCookie } from '@/utils/csrf.js';
import { authStore } from '@/stores/auth.js';

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

axios.interceptors.request.use(async (config) => {
  // 1. Check if the request method requires CSRF protection
  const csrfMethod = ['POST', 'PUT', 'DELETE', 'PATCH'];
  const needsCsrf = csrfMethod.includes(config.method.toUpperCase());

  // 2. If the request needs CSRF protection, check if the CSRF cookie is set
  if (needsCsrf) await ensureCsrfCookie();

  // 3. Always manually set the X-XSRF-TOKEN header from the cookie
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
  return config;
});

const startApp = async () => {
  const auth = authStore();
  await auth.fetchUser(); // wait until we know if user is logged in or not

  // console.log('User after fetch:', fetchUser());
  const app = createApp(App);

  app.provide('auth', auth);

  app
    .use(router)
    .use(Toast, {
      position: 'top-right',
      timeout: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
    })
    .mount('#app');
};

startApp(); // start the app
