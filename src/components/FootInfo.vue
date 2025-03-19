<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { useRouter } from "vue-router";

const store = useMainStore();
const router = useRouter()
const translations = computed(() => store.translations);

const isDarkMode = computed(() => store.isDarkMode);

const currentRoute = computed(() => {
    return router.currentRoute.value.path;
});

function isSelected(route) {
    return currentRoute.value === route;
}

const isMenuOpen = computed(() => store.isMenuOpen);

const menuItems = computed(() => {
    return [
        { link: '/installation', title: translations.value.menu.installation[store.lang], icon: 'starFill' },
        { link: '/docs', title: translations.value.menu.docs[store.lang], icon: 'settings' },
        { link: '/chart-builder', title: translations.value.menu.chartBuilder[store.lang], icon: 'boxes'},
        { link: '/examples', title: translations.value.menu.examples[store.lang], icon: 'dashboard' },
        { link: '/customization', title: translations.value.menu.customization[store.lang], icon: 'palette'},
        { link: '/versions', title: translations.value.menu.versions[store.lang], icon: ''},
        { link: '/about', title: translations.value.menu.about[store.lang], icon: ''},
    ]
})
    
</script>
s
<template>
    <div :class="`mt-12 justify-center py-12 border-t ${isDarkMode ? 'bg-gradient-to-r from-transparent to-[#FFFFFF10] border-[#2A2A2A]' : 'bg-gray-200'}   ${isMenuOpen ? 'hidden sm:flex' : 'flex'} ${isMenuOpen && (isSelected('/docs') || isSelected('/versions')) ? 'pl-[48px] sm:pl-[348px] sm:pr-[48px]' : ''}`">

        <div :class="`mx-auto max-w-[800px] flex flex-col sm:flex-row gap-12 place-items-center justify-center`">
            <div class="flex flex-col gap-2 place-items-center justify-center min-w-[200px]">
                <img data-cy="header-logo" src="../assets/logo3.png" class="h-12" />
                <span>Vue Data UI</span>
                <div class="flex flex-row gap-2 place-items-center justify-center" title="Copy Left">
                    <VueUiIcon name="copyLeft" stroke="#6A6A6A"/>
                    <span>{{ new Date().getFullYear() }}</span>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-6 flex-wrap" dir="auto">
                <div class="flex flex-col place-items-center justify-center gap-2" v-for="menuItem in menuItems">
                    <a :class="`text-black dark:text-app-blue hover:underline px-2 rounded-md ${isSelected(menuItem.link) ? 'bg-[#5f8aee30] shadow-md border-b border-app-blue' : ''}`" :href="menuItem.link">
                        <div class="flex flex-row place-items-center gap-2">
                            <VueUiIcon v-if="menuItem.icon" :name="menuItem.icon" :size="18" :stroke="isDarkMode ? '#CCCCCC' : '#6A6A6A'"/>
                            {{ menuItem.title }} 
                        </div>
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