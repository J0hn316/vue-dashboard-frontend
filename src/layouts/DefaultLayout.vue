<template>
  <div
    class="min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <AppNavbar />
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
import { RouterView } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';
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
