<template>
  <div
    class="min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <AppNavbar v-if="showNavbar" />
    <main class="p-6 max-w-7xl mx-auto">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';

const route = useRoute();
const showNavbar = computed(
  () => route.path !== '/login' && route.path !== '/register'
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
