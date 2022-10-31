import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { urlConstants } from "./../common/constants";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Authentication",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Authentication.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    children: [
      {
        path: '',
        name: 'Main',
        props: true,
        component: () => import("../views/Main.vue"),
      },
      {
        path: "profile/:id?",
        name: "Profile",
        props: true,
        component: () => import("../views/UserProfile.vue"),
      },
      {
        path: 'agricultores',
        name: 'Agricultores',
        props: true,
        component: () => import("../views/ListUser.vue"),
      },




      {
        path: `profile/agricultor/:id?`,
        name: 'ProfileAgricultor',
        props: true,
        component: () => import("../views/UserProfile.vue"),
      },



      {
        path: 'lista-sensor',
        name: 'ListasSensor',
        component: () => import("../views/Sensor.vue"),
      }
    ]
  },



  {
    path: '/:notFound(.*)',
    redirect: '/',
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
