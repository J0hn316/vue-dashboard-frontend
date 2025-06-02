<template>
  <div
    class="bg-gray-300 dark:bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
  >
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
