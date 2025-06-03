import { ref } from 'vue';
import axios from 'axios';

export const useUsers = () => {
  const users = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await axios.get(`${API_BASE_URL}/users`);
      users.value = res.data;
    } catch (err) {
      console.error('API failed:', err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { users, isLoading, error, fetchUsers };
};
