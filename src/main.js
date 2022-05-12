import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import Maska from "maska";
import "bootstrap";
import "./scss/custom.scss";

// firebase imports
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

let app;
let head;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router);
    head = createHead();
    app.use(head);
    app.use(Maska);
    app.mount("#app");
  }
});
