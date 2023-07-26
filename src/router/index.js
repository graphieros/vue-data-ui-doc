import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import Installation from "../views/Installation.vue";
import NotFound from "../views/NotFound.vue";
import Docs from "../views/Docs.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/installation",
        name: "Installation",
        component: Installation
    },
    {
        path: "/docs",
        name: "Docs",
        component: Docs
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;