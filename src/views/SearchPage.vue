<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchInConfig } from '../searchHelper';
import { useMainStore } from '../stores';
import SideMenu from '../components/SideMenu.vue';
import { FilterXIcon, ZoomCancelIcon } from 'vue-tabler-icons';

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const searchTerm = computed(() => route.query.q || '')
const searchResults = ref([]);
const hasResults = ref(false);
const translations = computed(() => store.translations)
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    query: String
})

function performSearch() {
    if (searchTerm.value) {
        const results = searchInConfig(searchTerm.value);
        searchResults.value = results;
        hasResults.value = results.length > 0;
    } else {
        hasResults.value = false;
        searchResults.value = [];
    }
}

watch(searchTerm, (newTerm) => {
    router.replace({ query: { q: newTerm } });
    performSearch();
});

onMounted(() => {
    performSearch();
});

const accordionConfig = computed(() => {
    return {
        open: false,
        maxHeight: 10000,
        head: {
        backgroundColor: 'transparent'
        },
        body: {
        backgroundColor: 'transparent'
        }
    }
    })
    const accordionConfigDarkMode = computed(() => {
    return {
        open: false,
        maxHeight: 10000,
        head: {
        backgroundColor: 'transparent'
        },
        body: {
        backgroundColor: 'transparent',
        color: '#CCCCCC'
        }
    }
})

const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

const selectedComponent = ref('')
const availableComponents = computed(() => [...new Set(searchResults.value.map(r => r.componentName))])

const filteredResults = computed(() => {
    if (!selectedComponent.value) return searchResults.value.sort((a, b) => a.componentName.localeCompare(b.componentName));
    return searchResults.value.filter(r => r.componentName === selectedComponent.value)
})

const iconMap = ref({
    VueUiSparkline: 'chartSparkline',
    VueUiSparkbar: 'chartSparkbar',
    VueUiSoarkStackbar: 'chartSparkStackbar',
    VueUiSparkHistogram: 'chartSparkHistogram',
    VueUiSparkgauge: 'chartGauge',
    VueUiSparkTrend: 'trend',
    VueUiQuickChart: 'vueDataUi',
    VueUiXy: 'chartLine',
    VueUiXyCanvas: 'chartLine',
    VueUiVerticalBar: 'chartVerticalBar',
    VueUiParallelCoordinatePlot: 'chartParallelCoordinatePlot',
    VueUiFlow: 'chartFlow',
    VueUiCandlestick: 'chartCandlestick',
    VueUiAgePyramid: 'chartAgePyramid',
    VueUiDonutEvolution: 'chartDonutEvolution',
    VueUiDonut: 'chartDonut',
    VueUiNestedDonuts: 'chartNestedDonuts',
    VueUiWaffle: 'chartWaffle',
    VueUiHeatmap: 'chartHeatmap',
    VueUiTreemap: 'chartTreemap',
    VueUiRings: 'chartRings',
    VueUiGalaxy: 'chartGalaxy',
    VueUiChestnut: 'chartChestnut',
    VueUiGauge: 'chartGauge',
    VueUiOnion: 'chartOnion',
    VueUiWheel: 'chartWheel',
    VueUiTiremarks: 'chartTiremarks',
    VueUiThermometer: 'chartThermometer',
    VueUiWordCloud: 'chartWordCloud',
    VueUiRelationCircle: 'chartRelationCircle',
    VueUiRadar: 'chartRadar',
    VueUiMoodRadar: 'chartMoodRadar',
    VueUiQuadrant: 'chartQuadrant',
    VueUiScatter: 'chartScatter',
    VueUiMolecule: 'chartCluster',
    VueUiStripPlot: 'chartStripPlot',
    VueUiDumbbell: 'chartDumbbell',
    VueUi3dBar: 'chart3dBar',
    VueUiTableSparkline: 'chartTable',
    VueUiTableHeatmap: 'chartTable',
    VueUiTable: 'chartTable',
    VueUiRating: 'star',
    VueUiSmiley: 'smiley',
    VueUiAccordion: 'accordion',
    VueUiScreenshot: 'screenshot',
    VueUiSkeleton: 'skeleton',
    VueUiDashboard: 'dashboard',
    VueUiAnnotator: 'annotator',
    VueUiIcon: 'smiley',
    VueUiDigits: 'digit8',
    VueUiCursor: 'cursor',
    VueUiMiniLoader: 'chartWheel',
    VueUiKpi: 'kpiBox'
})


</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div v-if="!hasResults" :class="`mx-auto max-w-[1200px] ${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] pr-12 sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">
        <h1 class="text-2xl border-b border-gray-600 pb-10">
            {{ translations.noResultsFor[store.lang] }} <span class="dark:text-app-blue">{{ searchTerm }}</span>
        </h1>
        <div class="flex flex-row place-items-center justify-center h-[200px]">
            <ZoomCancelIcon size="64" class="text-gray-600"/>
        </div>
    </div>
    <div v-else :class="`mx-auto max-w-[1200px] ${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] pr-12 sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">

        <h1 class="text-2xl mb-6">
            {{ translations.searchResultFor[store.lang] }} <span class="dark:text-app-blue">{{ searchTerm }}</span> <span class="text-gray-500">({{ filteredResults.length }})</span>
        </h1>

        <div class="flex flex-row gap-2 mb-12">
            <select
                v-if="(searchTerm || showSuggestions) && availableComponents.length > 1"
                v-model="selectedComponent"
                class="p-2 h-[36px] rounded-lg border border-gray-600 text-black"
            >
                <option value="" disabled selected>
                    {{ store.translations.search.componentSelect[store.lang] }}
                </option>
                <option v-for="el in availableComponents" class="text-left">{{ el }}</option>
            </select>
    
            <button
                v-if="selectedComponent"
                class="h-[36px] w-[36px] flex place-items-center justify-center border border-gray-600 rounded-lg hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                @click="selectedComponent = ''"
            >
                <FilterXIcon />
            </button>
        </div>

        <div
            v-for="res in filteredResults"
            class="p-2 border border-gray-300 dark:border-[#2A2A2A] my-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#FFFFFF11]"
        >
            <VueDataUi
            component="VueUiAccordion"
            :config="isDarkMode ? accordionConfigDarkMode : accordionConfig"
            >
            <template #title="{ color }">
                <VueUiIcon :name="iconMap[res.componentName]" stroke="#666666"/>
                <span
                v-html="
                    res.path.replace(
                    searchTerm,
                    `<span class='text-app-blue font-black'>${searchTerm}</span>`
                    )
                "
                ></span>
            </template>

            <template #content>
                <div class="flex flex-col w-full">
                <div>Type: <code class="text-app-blue">{{ res.type }}</code></div>
                {{ translations.search.defaultValue[store.lang] }} :
                <div class="bg-[#272822] p-4 rounded">
                    <code class="language-javascript" style="white-space: pre-wrap;">
                        <span >{{
                        res.type === "string" ? `"${res.value}"` : res.value
                        }}</span>
                        <div v-if="res.type === 'string' && res.value.includes('#')" :style="`background:${res.value}`" class="h-6 w-6 rounded border border-gray-400"/>
                    </code>
                </div>
                <router-link :to="`/docs#${res.route}`">
                    <div class="hover:underline dark:text-app-green font-black mt-2">
                    {{ translations.search.viewComponent[store.lang] }}
                    </div>
                </router-link>
                </div>

            </template>
            </VueDataUi>
        </div>
    </div>
</template>
