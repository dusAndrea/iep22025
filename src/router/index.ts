import { createRouter, createWebHistory } from 'vue-router';
import { About, DashBoard, Login, NotFound, Profile, Register } from '@/views';
import { useUserStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: false }
    },

    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashBoard,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    }
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  }
  else if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
