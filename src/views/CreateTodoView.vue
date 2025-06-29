<template>
  <div
    class="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
  >
    <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Todo</h1>

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
      <div class="mb-4">
        <label
          for="description"
          class="block mb-1 font-medium text-gray-700 dark:text-gray-200"
        >
          Description
        </label>
        <input
          id="description"
          v-model="description"
          type="text"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <p v-if="errors.description" class="text-red-500 text-sm mt-1">
          {{ errors.description }}
        </p>
      </div>
      <div class="mb-4">
        <label
          for="completed"
          class="block mb-1 font-medium text-gray-700 dark:text-gray-200"
        >
          Completed
        </label>
        <input
          id="completed"
          v-model="completed"
          type="checkbox"
          class="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <p v-if="errors.completed" class="text-red-500 text-sm mt-1">
          {{ errors.completed }}
        </p>
      </div>

      <BaseButton type="submit">Create Todo</BaseButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { showToast } from '@/utils/toast.js';
import BaseButton from '@/components/ui/BaseButton.vue';

const title = ref('');
const description = ref('');
const completed = ref(false);
const errors = ref({});
const router = useRouter();

const submitForm = async () => {
  errors.value = {};

  if (!title.value.trim()) {
    errors.value.title = 'Title is required';
    return;
  }

  if (!description.value.trim()) {
    errors.value.description = 'Description is required';
    return;
  }

  try {
    await axios.post('/api/todos', {
      title: title.value,
      description: description.value,
      completed: completed.value,
    });
    showToast('success', 'Todo created successfully');
    router.push('/todos');
  } catch (error) {
    showToast('error', 'Failed to create Todo', 2500);
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
      console.error(errors.value);
    }
  }
};
</script>
