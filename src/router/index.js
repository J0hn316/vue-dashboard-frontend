import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '@/stores/auth.js';
import { showToast } from '@/utils/toast.js';

const auth = authStore();

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
  // const { isLoggedIn, isLoading, fetchUser } = inject('auth');

  console.log('[router.beforeEach] isLoading:', auth.isLoading.value);
  console.log('[router.beforeEach] isLoggedIn:', auth.isLoggedIn.value);
  console.log('[router.beforeEach] to:', to.path);

  // 🔁 1. If still loading (e.g., after page refresh), wait for fetchUser
  if (!auth.user.value && auth.isLoading.value) {
    await auth.fetchUser();
    console.log('[router.beforeEach] waited for fetchUser');
  }

  // 🔒 2. If route requires auth but not logged in
  if (to.meta.requiresAuth && !auth.isLoggedIn.value) {
    console.log(
      '[router.beforeEach] blocked unauthenticated access to:',
      to.path
    );
    showToast('error', 'You must be logged in to view that page.');
    return next({ name: 'Login' });
  }

  // 🚫 3. If route is guest-only but user is logged in
  if (to.meta.guest && auth.isLoggedIn.value) {
    console.log('[router.beforeEach] redirecting guest from:', to.path);
    return next({ name: 'Home' });
  }

  // ✅ 4. Allow route
  console.log('[router.beforeEach] allowed access to:', to.path);
  next();
});

export default router;
