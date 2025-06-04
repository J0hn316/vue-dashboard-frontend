<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Latest Posts</h2>

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Error State -->
    <div
      v-else-if="error"
      class="justify-center text-red-500 font-medium text-center"
    >
      {{ error }}
      <button
        @click="fetchPosts"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Retry 🤔?
      </button>
    </div>

    <!-- Filter Buttons -->
    <div v-else>
      <div class="flex gap-2 mb-4 flex-wrap">
        <button
          class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
          :class="{ 'bg-blue-500 text-white': filterUserId === null }"
          @click="filterUserId = null"
        >
          All Users
        </button>
        <button
          v-for="id in uniqueUserIds"
          :key="id"
          class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
          :class="{ 'bg-blue-500 text-white': filterUserId === id }"
          @click="filterUserId = id"
        >
          User {{ id }}
        </button>
      </div>

      <!-- Post Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BaseCard v-for="post in paginatedPosts" :key="post.id">
          <h3 class="text-lg font-semibold mb-1">
            {{ post.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{
              post.body.length > 100
                ? post.body.slice(0, 100) + '...'
                : post.body
            }}
          </p>
          <p class="text-xs text-gray-500 mt-2">
            {{ post.id }} | User: {{ post.userId }}
          </p>
        </BaseCard>
      </div>

      <!-- Pagination Control -->
      <div class="flex justify-center mt-6 gap-2">
        <button
          class="px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>
        <span class="px-2 pt-2"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          class="px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import BaseCard from './BaseCard.vue';
import LoadingSpinner from './ui/LoadingSpinner.vue';

const posts = ref([]);
const error = ref(null);
const isLoading = ref(true);
const filterUserId = ref(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchPosts = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const res = await axios.get(`${API_BASE_URL}/posts`);
    posts.value = res.data;
  } catch (err) {
    console.error('API failed:', err);
    error.value = 'Failed to load posts';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPosts);

// Filtering
const filteredPosts = computed(() => {
  return filterUserId.value
    ? posts.value.filter((post) => post.userId === filterUserId.value)
    : posts.value;
});

const uniqueUserIds = computed(() => {
  return [...new Set(posts.value.map((post) => post.userId))];
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / itemsPerPage);
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPosts.value.slice(start, start + itemsPerPage);
});

// Watch for filter change → reset to page 1
watch(filterUserId, () => {
  currentPage.value = 1;
});
</script>
