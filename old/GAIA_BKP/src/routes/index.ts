import { createRouter, createWebHistory } from "vue-router";
import { Home, Login, Register, Profile } from "@/views";

import { ChartsDashboard, MapView } from "@/components";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/profile", name: "Profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/charts", name: "Charts", component: ChartsDashboard, meta: { requiresAuth: true } },
  { path: "/map", name: "Map", component: MapView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("loggedInUser");
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
