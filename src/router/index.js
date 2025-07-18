import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/utils/useAuth.js';
import { showToast } from '@/utils/toast.js';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guest: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('@/views/TodosView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/todos/create',
    name: 'CreateTodo',
    component: () => import('@/views/CreateTodoView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posts',
    name: 'Post',
    component: () => import('@/views/PostsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: () => import('@/views/PostDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();

  if (!auth) {
    console.warn('[router.beforeEach] auth store not ready');
    // allow navigation to avoid hard crash
    return next();
  }

  // If refreshing, wait for user load (only once)
  if (!auth.user.value && auth.isLoading.value) {
    await auth.fetchUser();
  }

  // 🔒 If route requires auth but not logged in
  if (to.meta.requiresAuth && !auth.isLoggedIn.value) {
    showToast('error', 'You must be logged in to view that page.');
    return next({ name: 'Login' });
  }

  if (to.meta.guest && auth.isLoggedIn.value) {
    return next({ name: 'Home' });
  }

  // ✅ 4. Allow route
  next();
});

export default router;
