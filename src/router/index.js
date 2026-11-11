import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import { ref } from "vue";
import { createChunkRecovery } from "../navigation/chunkRecovery.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/search",
        name: "Search",
        component: () => import("../views/SearchPage.vue"),
    },
    {
        path: "/installation",
        name: "Installation",
        component: () => import("../views/Installation.vue"),
    },
    {
        path: "/docs",
        name: "Docs",
        component: () => import("../views/Docs.vue"),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/versions",
        name: "Versions",
        component: () => import("../views/Versions.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/customization",
        name: "Customization",
        component: () => import("../views/Customization.vue"),
    },
    {
        path: "/chart-builder2",
        name: "Maker2",
        redirect: { name: "Maker" },
    },
    {
        path: "/chart-builder",
        name: "Maker",
        component: () => import("../views/Maker2.vue"),
    },
    {
        path: "/examples",
        name: "Examples",
        component: () => import("../views/Examples.vue"),
    },
    {
        path: "/examples/categories",
        name: "Example Categories",
        component: () => import("../views/ExampleCategories.vue"),
    },
    {
        path: "/examples/config-flows",
        name: "Config flows",
        component: () => import("../views/ConfigFlows.vue"),
    },
    {
        path: "/examples/game-of-life",
        name: "Game of Life",
        component: () => import("../views/GameOfLife.vue"),
    },
    {
        path: "/universal-component",
        name: "Universal component",
        component: () => import("../views/UniversalComponent.vue"),
    },
    {
        path: "/examples/theme-dashboards",
        name: "Theme dashboards",
        component: () => import("../views/ThemeDashboards.vue"),
    },
    {
        path: "/examples/dont-try-this-at-home",
        name: "Dont try this at home",
        component: () => import("../views/DontTryThisAtHome.vue"),
    },
    {
        path: "/examples/loading-states",
        name: "Loading states",
        component: () => import("../views/LoadingStates.vue"),
    },
    {
        path: "/examples/themes",
        name: "Built-in themes",
        component: () => import("../views/ThemeSwapper.vue"),
    },
    {
        path: "/customization/a11y",
        name: "a11y",
        component: () => import("../views/A11y.vue"),
    },
    {
        path: "/friends",
        name: "Friends",
        component: () => import("../views/Friends.vue"),
    },
    {
        path: "/:catchAll(.*)",
        component: () => import("../views/NotFound.vue"),
    },
    {
        path: "/types",
        name: "Type Directory",
        component: () => import("../views/TypeDirectory.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.path !== from.path) return { top: 0 };
        // Documentation owns its hash-driven component navigation.
    },
});

let lastTargetFullPath = null;

router.beforeEach((to, from, next) => {
    if (to.path === "/docs" && to.hash === "#vue-ui-vertical-bar") {
        next({
            path: to.path,
            query: to.query,
            hash: "#vue-ui-horizontal-bar",
            replace: true,
        });
        return;
    }
    lastTargetFullPath = to.fullPath;
    next();
});

export const chunkFailure = ref(null);
const recoverChunk = createChunkRecovery({
    reload: (target) => window.location.assign(target),
    failed: (_error, target) => {
        chunkFailure.value = target;
    },
});
router.onError((error) => {
    recoverChunk(
        error,
        lastTargetFullPath ||
            window.location.pathname +
                window.location.search +
                window.location.hash,
    );
});
router.afterEach((_to, _from, failure) => {
    if (!failure) chunkFailure.value = null;
});

export default router;
