import { createRouter, createWebHistory } from "vue-router";
import Home from "../containers/Home.vue";
// import About from "../containers/About.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home, name: "Tela Home" },
    // { path: "/about", component: About, name: "Tela About" },
  ],
});

export default router;
