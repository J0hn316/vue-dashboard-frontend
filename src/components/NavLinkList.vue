<template>
  <div
    v-if="!auth.isLoading.value && links && Array.isArray(links)"
    class="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center"
  >
    <template v-for="link in links" :key="link.label">
      <RouterLink
        v-if="
          (!link.auth || auth.isLoggedIn.value) &&
          (!link.guestOnly || !auth.isLoggedIn.value)
        "
        :to="link.href"
        :class="['hover:scale-105 transition-all', customClass]"
        active-class="text-blue-600 dark:text-blue-400 font-semibold"
        @click="onNavigate?.()"
      >
        {{ link.label }}
      </RouterLink>
    </template>
    <BaseButton
      v-if="auth.isLoggedIn.value && showLogout"
      @click="handleLogout"
      size="sm"
    >
      Logout
    </BaseButton>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  showLogout: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
  onNavigate: Function,
});

const auth = inject('auth');

const handleLogout = async () => {
  await auth.logout();
  props.onNavigate?.();
};
</script>
