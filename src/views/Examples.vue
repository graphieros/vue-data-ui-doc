<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import ExampleButton from "../components/examples/ExampleButton.vue";
import ExampleSpark from "../components/examples/ExampleSpark.vue";
import ExampleCharts from "../components/examples/ExampleCharts.vue";
import ExampleKpi from "../components/examples/ExampleKpi.vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import ChartSeeker from "../components/ChartSeeker.vue";
import { SkullIcon } from "vue-tabler-icons";
import BasePageMenu from "../components/BasePageMenu.vue";
import useMobile from "../useMobile";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseMenuPattern from "../components/BaseMenuPattern.vue";

const store = useMainStore();
const translations = computed(() => store.translations);
const lang = computed(() => store.lang);
const isDarkMode = computed(() => store.isDarkMode);
const currentMenu = ref('mini')
const { isMobile } = useMobile()

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

const menuItems = computed(() => ([
    {
        name: translations.value.sideMenu.miniCharts[store.lang],
        icon: 'chartSparkline',
        callback: () => currentMenu.value = 'mini',
        link: '#',
        selected: currentMenu.value === 'mini'
    },
    {
        name: translations.value.sideMenu.charts[store.lang],
        icon: 'dashboard',
        callback: () => currentMenu.value = 'charts',
        link: '#',
        selected: currentMenu.value === 'charts'
    },
    {
        name: 'KPI',
        icon: 'kpiBox',
        callback: () => currentMenu.value = 'kpi',
        link: '#',
        selected: currentMenu.value === 'kpi'
    },
    {
        name: translations.value.docs.moreExamples[store.lang],
        icon: 'clipboardLine',
        callback: () => {},
        link: '/examples/categories',
        selected: currentMenu.value === 'categories'
    },
    {
        name: translations.value.docs.themeDashboards[store.lang],
        icon: 'dashboard',
        callback: () => {},
        link: '/examples/theme-dashboards',
        selected: currentMenu.value === 'theme-dashboards'
    },
    {
        name: translations.value.docs.loadingStates[store.lang],
        icon: 'skeleton',
        callback: () => {},
        link: '/examples/loading-states',
        selected: currentMenu.value === 'loading-states'
    },
    {
        name: translations.value.docs.dontTryThisAtHome[store.lang],
        icon: 'moodWink',
        callback: () => {},
        link: '/examples/dont-try-this-at-home',
        selected: currentMenu.value === 'dont-try-this-at-home'
    },
    {
        name: 'Game of Life',
        icon: 'skull',
        callback: () => {},
        link: '/examples/game-of-life',
        selected: currentMenu.value === 'game-of-life'
    },
    {
        name: translations.value.docs.configFlow[store.lang],
        icon: 'chartFlow',
        callback: () => {},
        link: '/examples/config-flows',
        selected: currentMenu.value === 'config-flows'
    },
]))

</script>

<template>
    <BackgroundPattern v-if="isDarkMode">
        <template #defs>
            <BaseMenuPattern
                menu="examples"
                id="pat"
                stroke="#de6937"
                patternTransform="scale(0.15) rotate(0)"
                strokeWidth="2"
            />
        </template>
    </BackgroundPattern>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

    <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>

    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative my-12">
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <VueUiIcon name="dashboard" :size="80" :strokeWidth="0.8" class="hidden md:block" :stroke="isDarkMode ? '#de6937' : '#de6937'"/>
            <h1 class="font-inter-bold text-[48px] sm:text-[72px] text-center" style="letter-spacing: -1px;">{{ translations.menu.examples[lang] }}</h1>
        </div>

        <BasePageMenu :items="menuItems">
            <template #item="{item}">
                <RouterLink :to="item.link">
                    <button
                        :class="`h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] rounded-lg p-2 flex flex-col place-items-center justify-between ${item.selected ? 'bg-gradient-to-b from-[#f18a5e] to-[#de6937] dark:from-[#de693780] dark:to-[#de693720] text-white' : 'bg-white dark:bg-[#de693715] hover:bg-[#FBFBFB] dark:hover:bg-[#de693730]'} transition-colors`"
                        @click="item.callback()"
                    >
                        <div class="h-fit w-fit flex place-items-center justify-center">
                            <SkullIcon v-if="item.icon === 'skull'" :color="item.selected ? '#FFFFFF' : '#de6937'" :size="isMobile ? 22 : 32" :stroke-width="1.5"/>
                            <VueUiIcon v-else :name="item.icon" :stroke="item.selected ? '#FFFFFF' : '#de6937'" :size="isMobile ? 20 : 28"/>
                        </div>
                        <div class="text-sm" :style="{
                            lineHeight: isMobile ? '16px' : '20px'
                        }">
                            {{ item.name }}
                        </div>
                    </button>
                </RouterLink>
            </template>
        </BasePageMenu>

        <ExampleSpark v-if="currentMenu === 'mini'"/>
        <ExampleCharts v-if="currentMenu === 'charts'" />
        <ExampleKpi v-if="currentMenu === 'kpi'" />
        <ChartSeeker class="mt-12"/>

    </div>
</template>