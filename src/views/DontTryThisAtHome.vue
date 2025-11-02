<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import TreemapXy from "../components/TreemapXy.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

const router = useRouter();
const route = useRoute();

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    },
    {
        description: translations.value.docs.dontTryThisAtHome[store.lang],
    }
]);


</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative mt-12">
        <h1 class="text-[36px] text-center">
            {{ translations.docs.dontTryThisAtHome[store.lang] }}
        </h1>
    </div>
    <div class="max-w-[800px] mx-auto gap-4 mt-12 p-4 bg-white dark:bg-[#3A3A3A]">
        <TreemapXy/>
    </div>
</template>