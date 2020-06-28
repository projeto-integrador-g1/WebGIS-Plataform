import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: `${process.env.BASE_URL}/login`,
  routes: [
    {
      path: "/",
      redirect: "/login",
      component: () => import("@/views/dashboard/Index"),
      children: [
        {
          name: "Login",
          path: "/login",
          component: () => import("@/views/login/Login")
        },
        {
          name: "Projeto Integrador",
          path: "",
          component: () => import("@/views/dashboard/Dashboard")
        },
        {
          name: "Mapa",
          path: "/mapa",
          component: () => import("@/views/maps/MapBoxComponent")
        },
        {
          name: "Armazenamento",
          path: "/armazenamento",
          component: () => import("@/views/imagesView/imagesView")
        }
      ]
    }
  ]
});
