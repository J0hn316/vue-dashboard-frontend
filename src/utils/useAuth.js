import { ref, onMounted } from 'vue';

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

export const useAuth = () => {
  const checkLogin = () => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
  };

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    isLoggedIn.value = true;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    isLoggedIn.value = false;
  };

  onMounted(checkLogin);

  return {
    isLoggedIn,
    login,
    logout,
    checkLogin,
  };
};
