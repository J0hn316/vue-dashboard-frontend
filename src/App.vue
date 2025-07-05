<template>
  <div v-if="auth.isLoading.value">
    <LoadingSpinner />
  </div>
  <div v-else>
    <DefaultLayout />
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { initToast } from '@/utils/toast.js';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

const auth = inject('auth');

onMounted(() => initToast());
</script>
