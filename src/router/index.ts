import { createRouter, createWebHistory } from 'vue-router';
import { LoggedLayout, UnloggedLayout } from '@/layouts';
import { About, DashBoard, Login, NotFound, Profile, Quiz, Register } from '@/views';
import { useUserStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoggedLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: DashBoard,
        },
        {
          path: "/dashboard",
          name: "Dashboard",
          component: DashBoard,
        },
        {
          path: "/quiz",
          name: "Quiz",
          component: Quiz,
        },
        {
          path: "/profile",
          name: "Profile",
          component: Profile,
        },
        {
          path: '/about',
          name: 'About',
          component: About,

        },
      ]
    },
    {
      path: '/',
      component: UnloggedLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          name: 'Register',
          component: Register,
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
