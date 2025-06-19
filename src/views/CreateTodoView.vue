<template>
  <div
    class="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
  >
    <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
      Create Todo
    </h1>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label
          for="title"
          class="block mb-1 font-medium text-gray-700 dark:text-gray-200"
        >
          Title
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">
          {{ errors.title }}
        </p>
      </div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Save Todo
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const title = ref('');
const errors = ref({});
const toast = useToast();
const router = useRouter();

const submitForm = async () => {
  errors.value = {};

  if (!title.value.trim()) {
    errors.value.title = 'Title is required';
    return;
  }

  try {
    await axios.post('/api/todos', { title: title.value });
    toast.success('Todo created successfully');
    router.push('/todos');
  } catch (error) {
    toast.error('Failed to create Todo');
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
      console.error(errors.value);
    }
  }
};
</script>
