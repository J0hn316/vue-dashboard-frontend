import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/utils/useAuth.js';

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

router.beforeEach((to, _, next) => {
  const { isLoggedIn } = useAuth();

  // trying to hit a protected page, but not logged in → send to login
  if (to.meta.requiresAuth && !isLoggedIn) return next({ name: 'Login' });

  // logged-in user trying to hit login/register → send to dashboard
  if (to.meta.guest && isLoggedIn.value) return next({ name: 'Home' });

  next();
});

export default router;
