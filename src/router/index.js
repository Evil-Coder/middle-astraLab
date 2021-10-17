import Vue from "vue";
import VueRouter from "vue-router";

import EnterPage from "../pages/EnterPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import MainPage from "../pages/MainPage.vue";

import NotFound from "../pages/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/enter",
    name: "enter",
    component: EnterPage,
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignInPage,
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUpPage,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
