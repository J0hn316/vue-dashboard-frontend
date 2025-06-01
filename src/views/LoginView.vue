<template>
  <section
    class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-10"
  >
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block font-medium mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900"
          required
        />
      </div>
      <div>
        <label for="password" class="block font-medium mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900"
          required
        />
      </div>
      <BaseButton type="submit" class="w-full">Login</BaseButton>
    </form>
    <p class="mt-4 text-sm">
      Don't have an account ?
      <router-link to="/register" class="text-blue-600 hover:underline ml-1">
        Sign up
      </router-link>
    </p>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../utils/useAuth.js';
import BaseButton from '../components/ui/BaseButton.vue';

const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

const handleLogin = () => {
  if (email.value && password.value) {
    login();
    router.push('/');
  }
};
</script>
