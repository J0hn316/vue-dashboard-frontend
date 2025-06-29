import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import router from '../router';
import { useToast } from 'vue-toastification';

// Central reactive user state (null= not logged in or unknown)
const user = ref(null);
const isLoading = ref(true);
const isLoggedIn = computed(() => !!user.value);
const toast = useToast();

export const useAuth = () => {
  // 3. Load user on app start or refresh
  const fetchUser = async () => {
    isLoading.value = true;
    try {
      const res = await axios.get('/api/user');
      user.value = res.data;
    } catch (err) {
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  // 4. Login action
  const login = async (email, password) => {
    await axios.post('/api/auth/login', { email, password });
    await fetchUser();
  };

  // 5. Register and immediately log in
  const register = async (name, email, password) => {
    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
        password_confirmation: password,
      });
      await fetchUser();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        console.warn(errors);

        if (errors.email[0]?.includes('has already been taken')) {
          toast.error('Email already taken');
        }
        // Optionally handle other validation messages
        throw new Error('Validation failed. Please check your input.');
      }
      throw err;
    }
  };

  // 6. Logout
  const logout = async () => {
    await axios.post('/api/auth/logout');
    user.value = null;
    router.push('/');
  };

  // 7. Auto-load user on app startup
  //onMounted(fetchUser);

  return {
    user,
    isLoggedIn,
    isLoading,
    login,
    register,
    logout,
    fetchUser,
  };
};
