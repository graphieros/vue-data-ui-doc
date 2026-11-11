<script setup>
import {
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
    ref,
    nextTick,
} from "vue";
import Header from "./components/Header.vue";
import UpToTop from "./components/UpToTop.vue";
import { useRoute, useRouter } from "vue-router";
import GithubButton from "./components/examples/components/GithubButton.vue";
import { useMainStore } from "./stores";
import HelpCenter from "./components/helpCenter/HelpCenter.vue";
import BaseFooter from "./components/BaseFooter.vue";
import FootInfo from "./components/FootInfo.vue";
import useFetch from "./useFetch";
import { cachedJson } from "./cachedFetch.js";
import BaseMessenger from "./components/BaseMessenger.vue";
import ConfirmCopy from "./components/ConfirmCopy.vue";
import { installCopyFeedbackTracking } from "./clipboard.js";

import { readStoredJson, writeStorage } from "./storage.js";
import { chunkFailure } from "./router";
import { updateMetadata } from "./navigation/metadata.js";
import { navigationMessage } from "./navigation/messages.js";

const store = useMainStore();
const router = useRouter();
const route = useRoute();

const isDarkMode = computed(() => store.isDarkMode);

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath;
});

const start = ref("2023-07-25");
const lastDate = ref(new Date(Date.now()));

const end = computed(() => {
    const day = lastDate.value.getDate();
    const month = lastDate.value.getMonth() + 1;
    const year = lastDate.value.getFullYear();
    return `${year}-${String(month).length === 1 ? `0${month}` : month}-${String(day).length === 1 ? `0${day}` : day}`;
});

const url = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui`;
});

const url_cli = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-data-ui-cli`;
});

const url_color_bridge = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/color-bridge`;
});

const url_vue_hi_code = computed(() => {
    return `https://api.npmjs.org/downloads/range/${start.value}:${end.value}/vue-hi-code`;
});

function fetchGithubStats() {
    return useFetch({
        url: "https://api.github.com/repos/graphieros/vue-data-ui",
        _then: (data) => {
            store.stars = data.stargazers_count;
            writeStorage("stars", data.stargazers_count);
            store.issues = data.open_issues_count;
            writeStorage("issues", data.open_issues_count);
            store.pack = data;
            writeStorage("pack", JSON.stringify(data));

            store.repos.library = data;
        },
        _onError: () => {
            store.stars = Number(readStoredJson("stars", 0)) || 0;
            store.issues = Number(readStoredJson("issues", 0)) || 0;
            const pack = readStoredJson("pack", {});
            if (pack && typeof pack === "object" && !Array.isArray(pack)) {
                store.pack = pack;
                store.repos.library = pack;
            }
        },
    });
}

function fetchCliStats() {
    return useFetch({
        url: "https://api.github.com/repos/graphieros/vue-data-ui-cli",
        _then: (data) => {
            store.stars_cli = data.stargazers_count;
            store.repos.cli = data;
        },
    });
}

function fetchNuxtStats() {
    return useFetch({
        url: "https://api.github.com/repos/graphieros/vue-data-ui-nuxt",
        _then: (data) => {
            store.stars_nuxt = data.stargazers_count;
        },
    });
}

function fetchDocStats() {
    return useFetch({
        url: "https://api.github.com/repos/graphieros/vue-data-ui-doc",
        _then: (data) => {
            store.stars_docs = data.stargazers_count;
            store.repos.docs = data;
        },
    });
}

const githubClankers = ["dependabot[bot]", "github-actions[bot]"];

function fetchContributors() {
    return useFetch({
        url: "https://api.github.com/repos/graphieros/vue-data-ui/contributors",
        _then: (data) => {
            store.contributors = data?.filter(
                (d) => !githubClankers.includes(d?.login),
            );
            writeStorage("contributors", JSON.stringify(store.contributors));
        },
        _onError: () => {
            const contributors = readStoredJson("contributors", []);
            store.contributors = Array.isArray(contributors)
                ? contributors
                : [];
        },
    });
}

function fetchStarHistory() {
    return useFetch({
        url: "https://vue-data-ui.graphieros.com/api/get_stars.php",
        _then: (data) => {
            store.starHistory = data?.history ?? [];
        },
    });
}

function loadPrimaryStats() {
    fetchGithubStats();
    cachedJson(url.value)
        .then((json) => {
            store.downloads.lib = json.downloads;
            store.npmDownloadsHome = json.downloads
                .map((d) => {
                    return {
                        period: d.day,
                        value: d.downloads,
                    };
                })
                .slice(0, -1)
                .slice(-365);
            store.npmDownloads = json.downloads
                .map((d) => {
                    return {
                        period: d.day,
                        value: d.downloads,
                    };
                })
                .slice(0, -1)
                .slice(-28);
        })
        .catch(console.error);
}

function loadSecondaryStats() {
    fetchCliStats();
    fetchNuxtStats();
    fetchDocStats();
    fetchContributors();
    fetchStarHistory();
    cachedJson(url_cli.value)
        .then((json) => {
            store.downloads.cli = json.downloads;
        })
        .catch(console.error);

    cachedJson(url_color_bridge.value)
        .then((json) => {
            store.downloads.color_bridge = json.downloads;
        })
        .catch(console.error);

    cachedJson(url_vue_hi_code.value)
        .then((json) => {
            store.downloads.hiCode = json.downloads;
        })
        .catch(console.error);
}

let idleHandle;
let stopCopyFeedbackTracking;
let secondaryLoaded = false;
onMounted(() => {
    stopCopyFeedbackTracking = installCopyFeedbackTracking(document);
    if ("requestIdleCallback" in window)
        idleHandle = requestIdleCallback(loadPrimaryStats, { timeout: 1500 });
    else idleHandle = setTimeout(loadPrimaryStats, 0);
});
onBeforeUnmount(() => {
    stopCopyFeedbackTracking?.();
    if ("cancelIdleCallback" in window) cancelIdleCallback(idleHandle);
    else clearTimeout(idleHandle);
});
watch(
    () => route.name,
    (name) => {
        if (!secondaryLoaded && ["About", "Versions"].includes(name)) {
            secondaryLoaded = true;
            loadSecondaryStats();
        }
    },
    { immediate: true },
);

watch(
    () => route.fullPath,
    () => updateMetadata(route, document),
    { immediate: true },
);
watch(
    () => route.path,
    async (_path, previous) => {
        if (!previous) return;
        await nextTick();
        if (!document.querySelector("dialog[open], [aria-modal='true']")) {
            document.getElementById("vdui")?.focus({ preventScroll: true });
        }
    },
);
function retryPage() {
    window.location.assign(chunkFailure.value);
}

const showUnderlay = computed(() => {
    return currentRoute.value === "/";
});
</script>

<template>
    <a class="skip-link" href="#vdui">{{
        navigationMessage("skip", store.lang)
    }}</a>
    <Header />
    <HelpCenter v-if="!['Home', 'Versions', 'Maker'].includes(route.name)" />
    <div v-if="showUnderlay && !isDarkMode"></div>

    <div v-if="showUnderlay && isDarkMode" class="underlay-paper--dark"></div>
    <div
        id="vdui"
        tabindex="-1"
        class="font-inter bg-gray-200 dark:bg-black text-black dark:text-slate-300 transition-colors mb-[60px]"
    >
        <div
            v-if="chunkFailure"
            class="p-8 text-center"
            role="alert"
            dir="auto"
        >
            <p>{{ navigationMessage("loadError", store.lang) }}</p>
            <button
                class="mt-4 rounded border border-current px-4 py-2"
                @click="retryPage"
            >
                {{ navigationMessage("retry", store.lang) }}
            </button>
        </div>
        <router-view v-if="!chunkFailure" />
        <UpToTop />
        <GithubButton v-if="route.name !== 'Home'" />
        <FootInfo
            v-if="!['Home', 'Friends'].includes(route.name)"
            class="foot-info-root"
        />
    </div>
    <!-- <Follower v-if="!['/', '/docs#vue-ui-cursor'].includes(currentRoute)"/> -->
    <BaseFooter v-if="!['/'].includes(currentRoute)" />
    <BaseMessenger />
    <ConfirmCopy />
</template>

<style>
.skip-link {
    position: fixed;
    top: 8px;
    inset-inline-start: 8px;
    z-index: 10000;
    padding: 8px 16px;
    border-radius: 8px;
    background: #fff;
    color: #111;
    transform: translateY(-200%);
}
.skip-link:focus {
    transform: translateY(0);
}
#vdui:focus {
    outline: none;
}

.vue-data-ui-tooltip {
    font-family: Inter;
}
.foot-info-root {
    position: relative;
    z-index: 1;
}
</style>
