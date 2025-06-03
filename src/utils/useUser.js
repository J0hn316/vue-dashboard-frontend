import { computed } from 'vue';

export const useUser = () => {
  const userName = computed(() => {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return 'Guest';

    try {
      const user = JSON.parse(userRaw);
      const email = user?.email || '';
      return email.split('@')[0] || 'Guest';
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      return 'Guest';
    }
  });
  return { userName };
};
