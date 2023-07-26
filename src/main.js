import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { VueUiXy, VueUiTable } from "vue-data-ui";

const app = createApp(App).use(router);
app.component("VueUiXy", VueUiXy);
app.component("VueUiTable", VueUiTable);

app.mount('#app')
