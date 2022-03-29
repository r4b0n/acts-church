import { createRouter, createWebHistory } from "vue-router";

// view components
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Testimonies from "../views/Testimonies.vue";
import Requests from "../views/Requests.vue";
import User from "../views/User.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/testimonies",
    name: "Testimonies",
    component: Testimonies,
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
