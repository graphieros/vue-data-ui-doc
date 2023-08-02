import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { VueUiXy, VueUiTable, VueUiDonut, VueUiWaffle, VueUiRadar, VueUiQuadrant } from "vue-data-ui";
import "vue-data-ui/style.css";

const app = createApp(App).use(router);
app.component("VueUiXy", VueUiXy);
app.component("VueUiTable", VueUiTable);
app.component("VueUiDonut", VueUiDonut);
app.component("VueUiWaffle", VueUiWaffle);
app.component("VueUiRadar", VueUiRadar);
app.component("VueUiQuadrant", VueUiQuadrant);

app.mount('#app')
