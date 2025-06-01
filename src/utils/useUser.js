import { computed } from 'vue';

export const useUser = () => {
  const userName = computed(() => {
    return localStorage.getItem('userName') || 'Guest';
  });

  return { userName };
};
