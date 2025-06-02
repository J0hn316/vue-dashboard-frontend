<template>
  <section
    class="max-w-4xl mx-auto mt-10 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow"
  >
    <h1 class="text-2xl font-bold mb-4">Welcome back, {{ user }} 👋</h1>

    <div class="grid sm:grid-col-2 lg:grid-col-3 gap-6">
      <TransitionGroup
        name="fade"
        tag="div"
        appear
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <!-- User Info -->
        <DashboardCard title="Your info" :key="'info'">
          <p><strong>Username:</strong> {{ user }}</p>
          <p><strong>Email:</strong> {{ userName }}</p>
        </DashboardCard>
        <!-- Quick Links -->
        <DashboardCard title="Quick links" :key="'quick-links'">
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/todos"
                class="text-blue-600 dark:text-blue-400 hover:underline"
                >Manage Todos</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/posts"
                class="text-blue-600 dark:text-blue-400 hover:underline"
                >Browse Posts</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/users"
                class="text-blue-600 dark:text-blue-400 hover:underline"
                >User Directory</RouterLink
              >
            </li>
          </ul>
        </DashboardCard>
        <!-- Recent Activity -->
        <DashboardCard title="Recent activity" :key="'activity'">
          <p>No recent activity to show.</p>
        </DashboardCard>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
import DashboardCard from '../components/ui/DashboardCard.vue';
import { useUser } from '../utils/useUser.js';

// Extract just the name before @
const { userName } = useUser();
const user = userName.value.split('@')[0];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
