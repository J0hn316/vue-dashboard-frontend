import { ref } from 'vue';
import axios from 'axios';

export const useUsers = () => {
  const users = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await axios.get('/users');
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
