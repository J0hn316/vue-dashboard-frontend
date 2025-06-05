<template>
  <section class="max-w-3xl mx-auto px-4 py-6">
    <LoadingSpinner v-if="isLoading" />

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <article v-else class="bg-white dark:bg-gray-800 rounded p-6 shadow">
      <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
      <p class="mb-4 text-gray-700 dark:text-gray-300">{{ post.body }}</p>
      <p class="text-sm text-gray-500">
        Post ID: {{ post.id }} | User: {{ post.userId }}
      </p>
      <router-link
        to="/posts"
        class="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Posts
      </router-link>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import LoadingSpinner from '../components/ui/LoadingSpinner.vue';

const route = useRoute();
const postId = route.params.id;

const post = ref({});
const error = ref(null);
const isLoading = ref(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchPosts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/posts/${postId}`);
    post.value = res.data;
  } catch (err) {
    console.err('Post fetch failed:', err);
    error.value = 'Failed to load post.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPosts);
</script>
