import { createRouter, createWebHistory } from 'vue-router';
import { LoggedLayout, UnloggedLayout } from '@/layouts';
import { About, DashBoard, Login, NotFound, Profile, Assessment, Register, Wall } from '@/views';
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
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashBoard,
        },
        {
          path: 'assessment',
          name: 'Assessment',
          component: Assessment,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'about',
          name: 'About',
          component: About,
        },
        {
          path: 'wall',
          name: 'Wall',
          component: Wall,
        },
      ],
    },
    {
      path: '/auth',
      component: UnloggedLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/auth/login');
  } else if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
