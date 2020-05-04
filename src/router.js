import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      children: [
        {
          name: "Projeto Integrador",
          path: "",
          component: () => import("@/views/dashboard/Dashboard")
        },
        {
          name: "Mapa",
          path: "/mapa",
          component: () => import("@/views/dashboard/maps/GoogleMaps")
        }
      ]
    }
  ]
});
