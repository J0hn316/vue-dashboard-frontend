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
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuth } from '@/utils/useAuth.js';
import { showToast } from '@/utils/toast.js';
import BaseButton from '@/components/ui/BaseButton.vue';

const email = ref('');
const password = ref('');
const router = useRouter();
const auth = inject('auth'); // Inject the auth object from the parent component
// const { login } = useAuth();

const handleLogin = async () => {
  if (email.value && password.value) {
    try {
      await auth.login(email.value, password.value);

      // ✅ Wait until auth.user is actually populated
      const waitUntilLoggedIn = () =>
        new Promise((resolve) => {
          const check = () => {
            if (auth.user.value) resolve();
            else setTimeout(check, 1000);
          };
          check();
        });

      await waitUntilLoggedIn();
      router.push('/home');
    } catch (err) {
      showToast('error', 'Invalid credentials', 2500);
    }
  }
};
</script>
