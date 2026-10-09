import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { registerCharts } from "./plugins/registerCharts.js";

const pinia = createPinia();

const app = createApp(App).use(router);
app.use(pinia);
registerCharts(app);
app.mount("#app");
