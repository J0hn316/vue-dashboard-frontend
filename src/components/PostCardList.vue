<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Latest Posts</h2>

    <LoadingSpinner v-if="isLoading" />

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

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard v-for="post in posts" :key="post.id">
        <h3 class="text-lg font-semibold mb-1">
          {{ post.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          {{
            post.body.length > 100 ? post.body.slice(0, 100) + '...' : post.body
          }}
        </p>
        <p class="text-xs text-gray-500 mt-2">
          {{ post.id }} | User: {{ post.userId }}
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

const posts = ref([]);
const error = ref(null);
const isLoading = ref(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchPosts = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const res = await axios.get(`${API_BASE_URL}/posts`);
    posts.value = res.data;
  } catch (err) {
    console.error('API failed:', err);
    error.value = 'Failed to load user data';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPosts);
</script>
