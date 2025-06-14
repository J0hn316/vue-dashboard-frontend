import { ref, onMounted } from 'vue';
import axios from 'axios';

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

export const useAuth = () => {
  const checkLogin = () => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
  };

  const login = async (email, password) => {
    try {
      // Required to set CSRF token cookie first
      await axios.get('/sanctum/csrf-cookie');

      // Step 2: Set CSRF token from cookie into header
      const csrfToken = decodeURIComponent(
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] || ''
      );
      axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

      // Attempt to log in
      await axios.post('/login', {
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
      await axios.get('/sanctum/csrf-cookie');

      // Get CSRF token from cookie
      const csrfToken = decodeURIComponent(
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] || ''
      );

      // Attach it to Axios for this session
      axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

      await axios.post('/register', {
        name,
        email,
        password,
        password_confirmation: password, // Required for Laravel validation
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
      await axios.post(
        '/logout',
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.warn('Logout request failed (already logged out?)');
    }

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    isLoggedIn.value = false;
  };

  onMounted(checkLogin);

  return {
    isLoggedIn,
    login,
    register,
    logout,
    checkLogin,
  };
};
