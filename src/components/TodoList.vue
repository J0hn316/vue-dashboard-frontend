<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">User Todos List</h2>

    <LoadingSpinner v-if="isLoading" />

    <div
      v-else-if="error"
      class="justify-center text-red-500 font-medium text-center"
    >
      {{ error }}
      <button
        @click="fetchTodos"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Retry 🤔?
      </button>
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard
        v-for="todo in todos"
        :key="todo.id"
        :customClass="todo.completed ? 'border-green' : 'border-yellow-500'"
      >
        <h3 class="text-lg font-semibold">
          {{ todo.title }}
        </h3>
        <p class="text-sm">Assigned to User: {{ todo.userId }}</p>
        <p class="text-xs mt-2 font-medium">
          Status:
          <span :class="todo.completed ? 'text-green-600' : 'text-yellow-600'">
            {{ todo.completed ? 'Completed' : 'Incomplete' }}
          </span>
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

const todos = ref([]);
const error = ref(null);
const isLoading = ref(true);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchTodos = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const res = await axios.get(`${API_BASE_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    todos.value = res.data;
  } catch (err) {
    console.error('API failed:', err);
    error.value = 'Failed to load user data';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchTodos);
</script>
