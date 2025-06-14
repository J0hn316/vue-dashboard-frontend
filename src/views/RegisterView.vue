<template>
  <section
    class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-10"
  >
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="register" class="space-y-4">
      <div>
        <label for="name" class="block font-medium mb-1">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900"
        />
      </div>
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

      <div>
        <label for="confirm" class="block font-medium mb-1"
          >Confirm Password</label
        >
        <input
          v-model="confirm"
          type="password"
          id="confirm"
          required
          class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900"
        />
      </div>
      <BaseButton type="submit" class="w-full">Register</BaseButton>
      <p class="mt-4 text-sm">
        Already have an account ?
        <router-link to="/login" class="text-blue-600 hover:underline ml-1">
          Login
        </router-link>
      </p>
      <p v-if="registered" class="text-green-500 font-medium mt-4">
        ✅ Registration complete!
      </p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../utils/useAuth';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const registered = ref(false);
const { register: registerUser } = useAuth();

const register = async () => {
  if (email.value && password.value && password.value === confirm.value) {
    try {
      await registerUser(name.value, email.value, password.value);

      registered.value = true;

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      alert('Registration failed. Check your input.');
    }
  } else {
    alert('Please fill in all fields and make sure the passwords match.');
  }
};
</script>
