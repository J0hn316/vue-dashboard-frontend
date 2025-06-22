import { ref } from 'vue';
import axios from 'axios';
import router from '../router';

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

export const useAuth = () => {
  const checkLogin = () => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
  };

  const login = async (email, password) => {
    try {
      // Login request
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', email);
      isLoggedIn.value = true;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      // Register request
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
        password_confirmation: password,
      });

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', email);
      isLoggedIn.value = true;
    } catch (err) {
      console.error('Register failed:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Logout request
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (err) {
      console.warn('Logout request failed (already logged out?)');
    }

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    isLoggedIn.value = false;
  };

  // onMounted(checkLogin);

  return {
    isLoggedIn,
    login,
    register,
    logout,
    checkLogin,
  };
};
