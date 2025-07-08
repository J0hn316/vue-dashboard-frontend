import { ref, computed } from 'vue';
import axios from 'axios';
import router from '@/router';
import { showToast } from '@/utils/toast.js';

const user = ref(null);
const isLoading = ref(true);
const isLoggedIn = computed(() => {
  return !!user.value && typeof user.value === 'object' && !!user.value.id;
});

const fetchUser = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get('/api/user');
    user.value = res.data;
    return res.data;
  } catch (err) {
    if (err.status === 401) {
      // Don't log if simply unauthenticated (not logged in)
      console.warn('That 401 error can safely be ignored');
    } else {
      console.warn('[fetchUser] failed:', err.response?.data || err.message);
      console.error(
        '[fetchUser] error:',
        err.response?.status,
        err.response?.data
      );
    }
    user.value = null;
  } finally {
    isLoading.value = false;
  }
};

const login = async (email, password) => {
  await axios.get('/sanctum/csrf-cookie');
  await axios.post('/api/auth/login', { email, password });
  await fetchUser();
};

const register = async (name, email, password) => {
  await axios.get('/sanctum/csrf-cookie');
  try {
    await axios.post('/api/auth/register', {
      name,
      email,
      password,
      password_confirmation: password,
    });
    await fetchUser();
  } catch (err) {
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      if (errors.email?.[0]?.includes('taken')) {
        showToast('error', 'Email already taken', 2500);
      }
      throw new Error('Validation failed');
    }
    throw err;
  }
};

const logout = async () => {
  try {
    await axios.post('/api/auth/logout');
  } catch (err) {
    if (err.response?.status !== 401) {
      console.warn('Logout error', err);
    }
  }
  user.value = null;
  router.push('/login');
};

export const authStore = () => ({
  user,
  isLoggedIn,
  isLoading,
  fetchUser,
  login,
  register,
  logout,
});
