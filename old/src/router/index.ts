import { createRouter, createWebHistory } from 'vue-router'
import { Login, Register, Profile } from "@/views";
import { ChartsDashboard, MapView } from "@/components";

const routes = [
  { path: "/", name: "Login", component: Login, meta: { requiresAuth: false } },
  { path: "/register", name: "Register", component: Register },
  { path: "/profile", name: "Profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/charts", name: "Charts", component: ChartsDashboard, meta: { requiresAuth: true } },
  { path: "/map", name: "Map", component: MapView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/* router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("loggedInUser");
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
}); */


export default router
