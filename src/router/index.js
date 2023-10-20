import { createWebHistory, createRouter } from "vue-router";
import NotFound from "../views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import('../views/Home.vue')
    },
    {
        path: "/installation",
        name: "Installation",
        component: () => import('../views/Installation.vue')
    },
    {
        path: "/docs",
        name: "Docs",
        component: () => import("../views/Docs.vue")
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue")
    },
    {
        path: "/versions",
        name: "Versions",
        component: () => import("../views/Versions.vue")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
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