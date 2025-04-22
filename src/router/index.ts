import { createRouter, createWebHistory } from 'vue-router'
import { About, DashBoard, Login, Profile, Register } from '@/views'
// TODO: update requiresAuth to true for all routes that need authentication
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
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: false }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashBoard,
      meta: { requiresAuth: false }
    },

  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("loggedInUser");
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/home");
  } else {
    next();
  }
});

export default router
