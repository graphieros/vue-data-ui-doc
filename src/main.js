import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useMainStore } from "./stores/index.js";
import { registerCharts } from "./plugins/registerCharts.js";

const pinia = createPinia();

const app = createApp(App).use(router);
app.use(pinia);
registerCharts(app);
const store = useMainStore(pinia);
const language = localStorage.getItem("vueDataUiLang") || "en";
store
    .setLanguage(language)
    .catch((error) => {
        console.error("Unable to load the selected language", error);
    })
    .finally(() => app.mount("#app"));
