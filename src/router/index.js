import Vue from "vue";
import VueRouter from "vue-router";

import EnterPage from "../views/EnterPage.vue";
import SignInPage from "../views/SignInPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import MainPage from "../views/MainPage.vue";

import NotFound from "../views/404.vue";

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
    path: "/signIn",
    name: "sign-in",
    component: SignInPage,
  },
  {
    path: "/signUp",
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
