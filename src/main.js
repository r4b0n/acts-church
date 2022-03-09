import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Maska from "maska";
import "bootstrap";
import "./scss/custom.scss";

const app = createApp(App).use(router);
app.use(Maska);
app.mount("#app");
