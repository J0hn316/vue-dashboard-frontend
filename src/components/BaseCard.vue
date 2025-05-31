<template>
  <div :class="computedClass">
    <slot name="header" />
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
});

const computedClass = computed(
  () =>
    `bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition ${props.customClass}`
);
</script>
