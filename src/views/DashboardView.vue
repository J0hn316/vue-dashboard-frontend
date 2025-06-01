<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Welcome back, {{ user }}!</h1>
  </div>
</template>

<script setup>
import { useUser } from '../utils/useUser.js';
const { userName } = useUser();

const user = userName.value.split('@')[0];
</script>
