<template>
  <div
    v-if="links && Array.isArray(links)"
    class="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center"
  >
    <template v-for="link in filterLinks" :key="link.label">
      <RouterLink
        v-if="(!link.auth || isLoggedIn) && (!link.guestOnly || !isLoggedIn)"
        :to="link.href"
        :class="['hover:scale-105 transition-all', customClass]"
        active-class="text-blue-600 dark:text-blue-400 font-semibold"
        @click="onNavigate"
      >
        {{ link.label }}
      </RouterLink>
    </template>
    <BaseButton
      v-if="isLoggedIn && showLogout"
      @click="
        () => {
          logout();
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../utils/useAuth';
import BaseButton from './ui/BaseButton.vue';

const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
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

const { logout } = useAuth();
const router = useRouter();

const filterLinks = computed(() => {
  if (!props.links || !Array.isArray(props.links)) return [];

  return props.links.filter((link) => {
    const requiresAuth = link.auth ?? false;
    const guestOnly = link.guestOnly ?? false;

    return (
      (!requiresAuth || props.isLoggedIn) && (!guestOnly || !props.isLoggedIn)
    );
  });
});
</script>
