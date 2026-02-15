import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import SearchPage from "../views/SearchPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: '/search',
        name: 'Search',
        component: SearchPage,
        props: (route) => ({ query: route.query.q })
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
        path: "/customization",
        name: "Customization",
        component: () => import("../views/Customization.vue")
    },
    {
        path: "/chart-builder",
        name: "Maker",
        component: () => import("../views/Maker.vue")
    },
    {
        path: "/examples",
        name: "Examples",
        component: () => import("../views/Examples.vue")
    },
    {
        path: "/examples/categories",
        name: "Example Categories",
        component: () => import("../views/ExampleCategories.vue")
    },
    {
        path: "/examples/config-flows",
        name: "Config flows",
        component: () => import("../views/ConfigFlows.vue")
    },
    {
        path: "/examples/game-of-life",
        name: "Game of Life",
        component: () => import('../views/GameOfLife.vue')
    },
    {
        path: "/universal-component",
        name: "Universal component",
        component: () => import("../views/UniversalComponent.vue")
    },
    {
        path: "/examples/theme-dashboards",
        name: "Theme dashboards",
        component: () => import("../views/ThemeDashboards.vue")
    },
    {
        path: "/examples/dont-try-this-at-home",
        name: "Dont try this at home",
        component: () => import("../views/DontTryThisAtHome.vue")
    },
    {
        path: "/examples/loading-states",
        name: "Loading states",
        component: () => import("../views/LoadingStates.vue")
    },
    {
        path: '/docs',
        redirect: to => {
            if (to.hash === '#vue-ui-vertical-bar') {
            return { path: '/docs', hash: '#vue-ui-horizontal-bar' }
            }
            return true
        }
    },
    {
        path: '/examples/themes',
        name: 'Built-in themes',
        component: () => import('../views/ThemeSwapper.vue')
    },
    {
        path: '/customization/a11y',
        name: 'a11y',
        component: () => import('../views/A11y.vue')
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

let lastTargetFullPath = null;

router.beforeEach((to, from, next) => {
    lastTargetFullPath = to.fullPath;
    next();
});

let chunkReloadedOnce = false;

router.onError((error) => {
    const message = (error && error.message) || "";

    const chunkFailedPatterns = [
        /Loading chunk \d+ failed/i,
        /ChunkLoadError/i,
        /Failed to fetch dynamically imported module/i,
        /Failed to load module script/i,
        /Importing a module script failed/i
    ];

    const isChunkError = chunkFailedPatterns.some((pattern) =>
        pattern.test(message)
    );

    if (!isChunkError) {
        return;
    }

    if (chunkReloadedOnce) {
        console.error("Chunk load error occurred again after reload.", error);
        return;
    }

    chunkReloadedOnce = true;

    const targetUrl =
        lastTargetFullPath ||
        window.location.pathname +
            window.location.search +
            window.location.hash;

    window.location.assign(targetUrl);
});

export default router;