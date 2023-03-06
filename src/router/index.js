import Vue from "vue";
import VueRouter from "vue-router";
import UserList from "../views/UserList.vue";
import DeviceList from "../views/DeviceList.vue";
import SensorList from "../views/SensorList.vue";
import MonitoredValueList from "../views/MonitoredValueListt.vue";
import { auth as store } from "../store/auth.module";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/users",
    name: "Users",
    component: UserList,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn && store.state.user.roles.includes("ADMIN")) {
        next();
      } else {
        next({ name: "Devices" });
      }
    },
  },
  {
    path: "/devices",
    name: "Devices",
    component: DeviceList,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/sensors",
    name: "Sensors",
    component: SensorList,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/monitored-values",
    name: "MonitoredValues",
    component: MonitoredValueList,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
