<template>
  <DefaultLayout />
</template>

<script setup>
import { onMounted } from 'vue';
import { initToast } from '@/utils/toast.js';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

onMounted(() => initToast());
</script>
