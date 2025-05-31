<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded transition gap-2',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
      customClass,
    ]"
    :disabled="disabled"
  >
    <!-- Spinner slot -->
    <slot name="icon" />
    <!-- Button -->
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1 text-sm';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600';
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700';
  }
});
</script>
