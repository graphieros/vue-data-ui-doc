<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../stores";
import { configExplorerTranslations } from "../translations/configExplorer.js";
import ConfigExplorer from "../components/docs/ConfigExplorer.vue";

const store = useMainStore();
const chromeHeight = ref(120);
let chromeObserver;
onMounted(() => {
    const elements = ["app-header", "app-footer"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const measure = () => {
        chromeHeight.value = elements.reduce(
            (height, element) =>
                height + element.getBoundingClientRect().height,
            0,
        );
    };
    chromeObserver = new ResizeObserver(measure);
    elements.forEach((element) => chromeObserver.observe(element));
    measure();
});
onBeforeUnmount(() => chromeObserver?.disconnect());
const title = computed(
    () =>
        (
            configExplorerTranslations[store.lang] ||
            configExplorerTranslations.en
        ).title,
);
</script>

<template>
    <main
        class="explorer-view mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-8"
        :style="{ '--explorer-chrome-height': `${chromeHeight}px` }"
    >
        <h1
            id="config-explorer-title"
            :class="`mb-6 shrink-0 w-fit font-inter-bold text-[36px] sm:text-[48px] text-left ${store.isDarkMode ? 'bg-gradient-to-r from-app-green to-indigo-400 bg-clip-text text-transparent' : 'text-vue-blue'}`"
            style="letter-spacing: -1px"
        >
            {{ title }}
        </h1>
        <ConfigExplorer />
    </main>
</template>

<style scoped>
.explorer-view {
    height: calc(100dvh - var(--explorer-chrome-height));
    display: flex;
    flex-direction: column;
    min-height: 0;
}
@media (max-width: 760px) {
    .explorer-view {
        height: auto;
    }
}
</style>
