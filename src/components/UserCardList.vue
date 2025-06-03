<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

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

    <div v-else :class="['grid md:grid-cols-2', gridCols, 'gap-4']">
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
import { onMounted } from 'vue';
import BaseCard from './BaseCard.vue';
import LoadingSpinner from './ui/LoadingSpinner.vue';
import { useUsers } from '../composables/useUsers.js';

const props = defineProps({
  title: {
    type: String,
    default: 'Users',
  },
  gridCols: {
    type: String,
    default: 'lg:grid-cols-3',
  },
});

const { users, error, isLoading, fetchUsers } = useUsers();

onMounted(fetchUsers);
</script>
