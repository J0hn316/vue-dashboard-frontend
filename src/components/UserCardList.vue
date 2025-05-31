<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Users</h2>

    <LoadingSpinner v-if="isLoading" />

    <div
      v-else-if="error"
      class="justify-center text-red-500 font-medium text-center"
    >
      {{ error }}
      <button
        @click="fetchUsers"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Retry 🤔?
      </button>
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard v-for="user in users" :key="user.id">
        <h3 class="text-lg font-semibold">
          {{ user.name }}
        </h3>
        <p class="text-sm">
          {{ user.email }}
        </p>
        <p class="text-sm text-gray-50">
          {{ user.company.name }}
        </p>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseCard from './BaseCard.vue';
import LoadingSpinner from './ui/LoadingSpinner.vue';

const users = ref([]);
const error = ref(null);
const isLoading = ref(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const res = await axios.get(`${API_BASE_URL}/users`);
    users.value = res.data;
  } catch (err) {
    console.error('API failed:', err);
    error.value = 'Failed to load user data';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchUsers);
</script>
