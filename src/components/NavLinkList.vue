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
      @click="
        () => {
          auth.logout();
          router.push('/login');
          onNavigate?.();
        }
      "
      size="sm"
    >
      Logout
    </BaseButton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
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

// const { logout, isLoggedIn, isLoading } = inject('auth');

const auth = inject('auth');
const router = useRouter();

// console.log(isLoggedIn.value);
</script>
