<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Todos List</h2>

    <!-- loading  -->
    <LoadingSpinner v-if="isLoading" />
    <!-- Error -->
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

    <!-- Filter buttons -->
    <div class="flex gap-4 mb-6 justify-center">
      <button
        v-for="option in ['All', 'Completed', 'Incomplete']"
        :key="option"
        @click="filterStatus = option"
        :class="[
          'px-4 py-2 rounded border',
          filterStatus === option
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 dark:text-white',
        ]"
      >
        {{ option }}
      </button>
    </div>

    <!-- Todos Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard
        v-for="todo in paginatedTodos"
        :key="todo.id"
        :customClass="todo.completed ? 'border-green' : 'border-yellow-500'"
      >
        <h3 class="text-lg font-semibold">
          {{ todo.title }}
        </h3>
        <p class="text-sm">Assigned to User: {{ todo.userId }}</p>
        <p class="text-xs mt-2 font-medium">
          Status:
          <span
            :class="[
              'px-2 py-1 text-xs font-semibold rounded',
              todo.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700',
            ]"
          >
            {{ todo.completed ? 'Completed' : 'Incomplete' }}
          </span>
        </p>
      </BaseCard>
    </div>

    <!-- Pagination controls -->
    <div class="flex justify-center items-center gap-4 mt-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span class="text-sm font-medium">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import BaseCard from '@/components/BaseCard.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

const todos = ref([]);
const error = ref(null);
const filterStatus = ref('all');
const isLoading = ref(true);

// Pagination state
const currentPage = ref(1);
const todosPerPage = 6;

const API_KEY = import.meta.env.VITE_API_KEY;

// Fetch todos from API
const fetchTodos = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const res = await axios.get('/api/todos', {
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

// Filter todos
const filteredTodos = computed(() => {
  if (filterStatus.value === 'Completed') {
    return todos.value.filter((todo) => todo.completed);
  } else if (filterStatus.value === 'Incomplete') {
    return todos.value.filter((todo) => !todo.completed);
  }
  return todos.value;
});

// Computed paginated list
const totalPages = computed(() => Math.ceil(todos.value.length / todosPerPage));

const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * todosPerPage;
  return filteredTodos.value.slice(start, start + todosPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

onMounted(fetchTodos);
</script>
