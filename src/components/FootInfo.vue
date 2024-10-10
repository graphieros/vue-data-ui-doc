<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { useRouter } from "vue-router";

const store = useMainStore();
const router = useRouter()
const translations = computed(() => store.translations);

const currentRoute = computed(() => {
    return router.currentRoute.value.path;
});

function isSelected(route) {
    return currentRoute.value === route;
}

const isMenuOpen = computed(() => store.isMenuOpen);

const menuItems = computed(() => {
    return [
        { link: '/installation', title: translations.value.menu.installation[store.lang] },
        { link: '/docs', title: translations.value.menu.docs[store.lang] },
        { link: '/chart-builder', title: translations.value.menu.chartBuilder[store.lang] },
        { link: '/examples', title: translations.value.menu.examples[store.lang] },
        { link: '/customization', title: translations.value.menu.customization[store.lang] },
        { link: '/versions', title: translations.value.menu.versions[store.lang] },
        { link: '/about', title: translations.value.menu.about[store.lang] },
    ]
})
    
</script>
s
<template>
    <div :class="`mt-12 flex justify-center py-12 border-t border-gray-500 bg-gray-200 dark:bg-[#FFFFFF10] ${(isSelected('/versions') || isSelected('/docs') && isMenuOpen) ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'}`">

        <div :class="`mx-auto max-w-[800px] flex flex-col sm:flex-row gap-12 place-items-center justify-center`">
            <div class="flex flex-col gap-2 place-items-center justify-center min-w-[200px]">
                <img data-cy="header-logo" src="../assets/logo.png" class="h-12" />
                <span>Vue Data UI</span>
                <div class="flex flex-row gap-2 place-items-center justify-center" title="Copy Left">
                    <VueUiIcon name="copyLeft" stroke="#6A6A6A"/>
                    <span>{{ new Date().getFullYear() }}</span>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-6 flex-wrap" dir="auto">
                <div class="flex flex-col place-items-center justify-center gap-2" v-for="menuItem in menuItems">
                    <a :class="`text-black dark:text-app-blue hover:underline px-2 rounded-md ${isSelected(menuItem.link) ? 'bg-[#5f8aee30] shadow-md border-b border-app-blue' : ''}`" :href="menuItem.link">
                        {{ menuItem.title }} 
                    </a>
                </div>
                <div class="flex flex-col place-items-center justify-center gap-2">
                    <a href="https://github.com/graphieros/vue-data-ui" target="_blank" class="text-black dark:text-app-blue hover:underline">
                        Github
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>