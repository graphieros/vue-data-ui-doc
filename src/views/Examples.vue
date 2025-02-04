<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import ExampleButton from "../components/examples/ExampleButton.vue";
import ExampleSpark from "../components/examples/ExampleSpark.vue";
import ExampleCharts from "../components/examples/ExampleCharts.vue";
import ExampleKpi from "../components/examples/ExampleKpi.vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import ChartSeeker from "../components/ChartSeeker.vue";

const store = useMainStore();
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);
const isDarkMode = computed(() => store.isDarkMode);
const currentMenu = ref('mini')

onMounted(() => {
    window.scrollTo(0,0)
})

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
    }
]);

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

    <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>

    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative my-12">
        <h1 class="text-[64px] sm:text-[96px] text-center">{{ translations.menu.examples[lang] }}</h1>

        <div class="place-items-center justify-center mt-10 flex-wrap border border-[#42d39250] rounded-md p-4 w-fit mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
            <ExampleButton @click="currentMenu = 'mini'" :selected="currentMenu === 'mini'" :isDarkMode="isDarkMode" class="w-full">
                <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="chartSparkline" :stroke="currentMenu === 'mini' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        {{ translations.sideMenu.miniCharts[lang] }}
                    </span>
                </div>
            </ExampleButton>
            <ExampleButton @click="currentMenu = 'charts'" :selected="currentMenu === 'charts'" :isDarkMode="isDarkMode" class="w-full">
                <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="dashboard" :stroke="currentMenu === 'charts' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        {{ translations.sideMenu.charts[lang] }}
                    </span>
                </div>
            </ExampleButton>
            <ExampleButton @click="currentMenu = 'kpi'" :selected="currentMenu === 'kpi'" :isDarkMode="isDarkMode" class="w-full">
                <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="kpiBox" :stroke="currentMenu === 'kpi' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        KPI
                    </span>
                </div>
            </ExampleButton>
            <RouterLink to="/examples/categories" class="w-full">
                <button :class="`w-full relative rounded cursor-pointer py-2 px-4 border transition-colors ${selected ? 'bg-app-green cursor-default dark:text-black border-app-green' : 'hover:bg-gray-200 dark:hover:bg-[#42d39230] border-gray-400 dark:border-[#2A2A2A]'}`">
                    <svg class="absolute top-0.5 right-0.5" v-if="selected" viewBox="0 0 10 10" height="8" width="8">
                        <circle cx="5.5" cy="6" r="5" :fill="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
                        <circle cx="5" cy="5" r="5" :fill="isDarkMode ? '#1A1A1A' : '#F3F4F6'"/>
                    </svg>
                    <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="clipboardLine" :stroke="currentMenu === 'kpi' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        {{ translations.docs.moreExamples[store.lang] }}
                    </span>
                </div>
                </button>
            </RouterLink>
            <RouterLink to="/examples/theme-dashboards" class="w-full">
                <button :class="`w-full relative rounded cursor-pointer py-2 px-4 border transition-colors ${selected ? 'bg-app-green cursor-default dark:text-black border-app-green' : 'hover:bg-gray-200 dark:hover:bg-[#42d39230] border-gray-400 dark:border-[#2A2A2A]'}`">
                    <svg class="absolute top-0.5 right-0.5" v-if="selected" viewBox="0 0 10 10" height="8" width="8">
                        <circle cx="5.5" cy="6" r="5" :fill="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
                        <circle cx="5" cy="5" r="5" :fill="isDarkMode ? '#1A1A1A' : '#F3F4F6'"/>
                    </svg>
                    <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="dashboard" :stroke="currentMenu === 'kpi' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        {{ translations.docs.themeDashboards[store.lang] }}
                    </span>
                </div>
                </button>
            </RouterLink>
            <RouterLink to="/examples/loading-states" class="w-full">
                <button :class="`w-full relative rounded cursor-pointer py-2 px-4 border transition-colors ${selected ? 'bg-app-green cursor-default dark:text-black border-app-green' : 'hover:bg-gray-200 dark:hover:bg-[#42d39230] border-gray-400 dark:border-[#2A2A2A]'}`">
                    <svg class="absolute top-0.5 right-0.5" v-if="selected" viewBox="0 0 10 10" height="8" width="8">
                        <circle cx="5.5" cy="6" r="5" :fill="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
                        <circle cx="5" cy="5" r="5" :fill="isDarkMode ? '#1A1A1A' : '#F3F4F6'"/>
                    </svg>
                    <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="skeleton" :stroke="currentMenu === 'loadingStates' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        {{ translations.docs.loadingStates[store.lang] }}
                    </span>
                </div>
                </button>
            </RouterLink>
            <RouterLink to="/examples/dont-try-this-at-home" class="w-full">
                <button :class="`w-full relative rounded cursor-pointer py-2 px-4 border transition-colors ${selected ? 'bg-app-green cursor-default dark:text-black border-app-green' : 'hover:bg-gray-200 dark:hover:bg-[#42d39230] border-gray-400 dark:border-[#2A2A2A]'}`">
                    <svg class="absolute top-0.5 right-0.5" v-if="selected" viewBox="0 0 10 10" height="8" width="8">
                        <circle cx="5.5" cy="6" r="5" :fill="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
                        <circle cx="5" cy="5" r="5" :fill="isDarkMode ? '#1A1A1A' : '#F3F4F6'"/>
                    </svg>
                    <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon name="moodWink" :stroke="currentMenu === 'dontTryThisAtHome' ? '#1A1A1A' : isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <span>
                        {{ translations.docs.dontTryThisAtHome[store.lang] }}
                    </span>
                </div>
                </button>
            </RouterLink>
        </div>

        <ExampleSpark v-if="currentMenu === 'mini'"/>
        <ExampleCharts v-if="currentMenu === 'charts'" />
        <ExampleKpi v-if="currentMenu === 'kpi'" />
        <ChartSeeker class="mt-12"/>

    </div>
</template>