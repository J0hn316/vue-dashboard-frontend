import { ref, onMounted } from 'vue';

export const useDarkMode = () => {
  const isDark = ref(false);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateHtmlClass();
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  };

  const updateHtmlClass = () => {
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');

    isDark.value =
      savedTheme === 'dark' ||
      (!savedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateHtmlClass();
  });

  return { isDark, toggleDarkMode };
};
