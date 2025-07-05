<template>
  <header class="bg-gray-200 dark:bg-gray-900 shadow-md">
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
    >
      <!-- lOGO -->
      <div class="text-xl font-bold text-gray-900 dark:text-gray-100">
        <RouterLink to="/">App</RouterLink>
      </div>

      <!-- Dark mode toggle Button -->
      <div class="relative w-6 h-6">
        <button
          @click="toggleDarkMode"
          class="ml-4 text-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle dark mode"
        >
          <span
            :class="[
              'transition-opacity duration-300',
              isDark ? 'opacity-100' : 'opacity-0',
            ]"
            >🌙</span
          >
          <span
            :class="[
              'transition-opacity duration-300 absolute',
              isDark ? 'opacity-0' : 'opacity-100',
            ]"
            >☀️</span
          >
        </button>
      </div>

      <!-- Desktop nav links -->
      <ul class="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
        <NavLinkList :links="navLinks" :showLogout="false" />
      </ul>

      <!-- Mobile toggle button -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
      >
        <svg
          v-if="!isOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile nav menu -->
    <div v-if="isOpen" class="md:hidden px-4 pb-4">
      <ul class="space-y-2 text-gray-700 dark:text-gray-200">
        <NavLinkList
          :links="navLinks"
          :showLogout="false"
          :onNavigate="
            () => {
              isOpen = false;
            }
          "
        />
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useDarkMode } from '@/utils/useDarkMode.js';
import NavLinkList from '@/components/NavLinkList.vue';

const isOpen = ref(false);

const { isDark, toggleDarkMode } = useDarkMode();

const navLinks = [
  { label: 'Home', href: '/home', auth: true },
  { label: 'Users', href: '/users', auth: true },
  { label: 'Posts', href: '/posts', auth: true },
  { label: 'Todos', href: '/todos', auth: true },
  { label: 'Dashboard', href: '/dashboard', auth: true },
  { label: 'Register', href: '/', guestOnly: true },
  { label: 'Login', href: '/login', guestOnly: true },
  { label: 'Contact', href: '/contact' },
];
</script>
