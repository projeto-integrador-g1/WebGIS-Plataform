import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: `${process.env.BASE_URL}/login`,
  routes: [
    {
      path: "/",
      redirect: { name: "Login" },
      component: () => import("@/views/dashboard/Index"),
      children: [
        {
          name: "Login",
          path: "/login",
          component: () => import("@/views/login/Login")
        },
        {
          name: "Usuarios",
          path: "/usuarios",
          component: () => import("@/views/users/Users.vue")
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
