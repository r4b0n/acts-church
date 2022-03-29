import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Maska from "maska";
import "bootstrap";
import "./scss/custom.scss";

// firebase imports
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router);
    app.use(Maska);
    app.mount("#app");
  }
});
