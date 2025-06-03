<template>
  <section
    class="max-w-4xl mx-auto mt-10 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow"
  >
    <h1 class="text-2xl font-bold mb-4">Welcome back, {{ userName }} 👋</h1>

    <TransitionGroup
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <!-- Card 1 -->
      <div key="todos" class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Total Todos</h2>
        <p class="text-2xl font-bold text-blue-500">12</p>
      </div>

      <!-- Card 2 -->
      <div key="users" class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Active Users</h2>
        <p class="text-2xl font-bold text-green-500">8</p>
      </div>

      <!-- Card 3 -->
      <div
        key="messages"
        class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
      >
        <h2 class="text-lg font-semibold mb-2">Unread Messages</h2>
        <div v-if="unreadMessages > 0">
          <p class="text-2xl font-bold text-red-500">{{ unreadMessages }}</p>
        </div>
        <div v-else class="text-sm text-gray-500 italic">
          No unread messages 🎉
        </div>
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup>
import { useUser } from '../utils/useUser.js';
const { userName } = useUser();
const unreadMessages = 0;
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
