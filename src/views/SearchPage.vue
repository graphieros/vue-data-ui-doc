<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchInConfig } from '../searchHelper';
import { useMainStore } from '../stores';
import SideMenu from '../components/SideMenu.vue';
import { FilterXIcon, ZoomCancelIcon } from 'vue-tabler-icons';
import CodeParser from '../components/customization/CodeParser.vue';
import ConfirmCopy from '../components/ConfirmCopy.vue';
import BaseCard from '../components/BaseCard.vue';

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const searchTerm = computed(() => route.query.q || '')
const selectedComponent = computed({
    get: () => {
        return route.query.f || ''
    },
    set: v => {
        return v
    }
})
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
    window.scrollTo({ top: 0});
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
            iconColor: '#5f8aee',
            backgroundColor: 'transparent',
            useArrowSlot: true
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
            iconColor: '#5f8aee',
            backgroundColor: 'transparent',
            useArrowSlot: true
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

const availableComponents = computed(() => [...new Set(searchResults.value.map(r => r.componentName))])

function filterComponents(v) {
    nextTick(() => {
        router.replace({ query: {
            q: searchTerm.value,
            f: v.target.value
        }})
    })
}

function clearFilter(v) {
    selectedComponent.value = '';
    router.replace({ query: {
        q: searchTerm.value
    }})
}

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
    VueUiSkeleton: 'skeleton',
    VueUiDashboard: 'dashboard',
    VueUiAnnotator: 'annotator',
    VueUiIcon: 'smiley',
    VueUiDigits: 'digit8',
    VueUiCursor: 'cursor',
    VueUiMiniLoader: 'chartWheel',
    VueUiKpi: 'kpiBox',
    VueUiSparkstackbar: 'chartSparkStackbar',
    VueUiStackbar: 'chartStackbar',
    VueUiBullet: 'chartBullet',
    VueUiFunnel: 'chartFunnel',
    VueUiHistoryPlot: 'chartHistoryPlot',
    VueUiGizmo: 'battery',
    VueUiCirclePack: 'chartCirclePack',
    VueUiRidgeline: 'chartRidgeline',
    VueUiChord: 'chartChord',
    VueUiWorld: 'world',
    VueUiCarouselTable: 'carouselTable'
})

function jsonToJsObject(json, indent = 0, colorAuto=false) {

    function formatValue(value, currentIndent) {
        const nextIndent = currentIndent + 4;
        const indentSpace = ' '.repeat(currentIndent);
        const nextIndentSpace = ' '.repeat(nextIndent);

        if (typeof value === 'boolean') return value.toString()
        if (typeof value === 'string') {
            return `'${value.replace(/'/g, "\\'")}'`;
        } else if (Array.isArray(value)) {
            return value.length === 0 ? '[]' : `[
${nextIndentSpace}${value.map(v => formatValue(v, nextIndent)).join(`,
${nextIndentSpace}`)}
${indentSpace}]`;
        } else if (typeof value === 'object' && value !== null) {
            return `{
${nextIndentSpace}${Object.entries(value)
                    .map(([key, val]) => `${typeof Number(key) === 'number' && !isNaN(Number(key)) ? `'${key}'` : key}: ${colorAuto && key === 'color' && !val ? `'auto'`: formatValue(val, nextIndent)}`)
                    .join(`,
${nextIndentSpace}`)}
${indentSpace}}`;
        }
        return value;
    }

    return formatValue(json, indent);
}

</script>

<template>
    <SideMenu @toggle="toggleMenu"/>
    <div v-if="!hasResults" :class="`mx-auto max-w-[1200px] h-screen ${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] pr-12 sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">
        <h1 class="text-2xl border-b border-gray-600 pb-10" dir="auto">
            {{ translations.noResultsFor[store.lang] }} <span class="dark:text-app-blue">{{ searchTerm }}</span>
        </h1>
        <div class="flex flex-row place-items-center justify-center h-[200px]">
            <ZoomCancelIcon size="64" class="text-gray-600"/>
        </div>
    </div>
    <div v-else :class="`mx-auto max-w-[1200px] min-h-screen ${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] pr-12 sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">

        <h1 class="text-2xl mb-6" dir="auto">
            {{ translations.searchResultFor[store.lang] }} <span class="dark:text-app-blue">{{ searchTerm }}</span> <span class="text-gray-500">({{ filteredResults.length }})</span>
        </h1>

        <div class="flex flex-row gap-2 mb-12">
            <select
                v-if="(searchTerm || showSuggestions) && availableComponents.length > 1"
                v-model="selectedComponent"
                class="p-2 h-[40px] !rounded-full border border-gray-600 text-black shadow-[inset_0_2px_6px_#6A6A6A,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#000000,0_4px_6px_rgba(0,0,0,0.5)]"
                @change="filterComponents"
            >
                <option value="" disabled selected>
                    {{ store.translations.search.componentSelect[store.lang] }}
                </option>
                <option v-for="el in availableComponents" class="text-left">{{ el }}</option>
            </select>
    
            <button
                v-if="selectedComponent"
                class="h-[40px] w-[40px] flex place-items-center justify-center rounded-full hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:border-app-orange text-black dark:text-app-orange dark:hover:text-white transition-colors hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                @click="clearFilter"
            >
                <FilterXIcon />
            </button>
        </div>

        <div
            v-for="res in filteredResults"
            class="my-4 rounded-md"
        >
            <BaseCard class=" hover:bg-gray-50 dark:hover:bg-[#3A3A3A]">
                <VueDataUi
                component="VueUiAccordion"
                :config="isDarkMode ? accordionConfigDarkMode : accordionConfig"
                >
                <template #arrow="{ backgroundColor, color, iconColor, isOpen }">
                    <VueUiIcon name="arrowRight" :size="12" :stroke="iconColor" />
                </template>
    
                <template #title="{ color }">
                    <VueUiIcon :name="iconMap[res.componentName]" stroke="#8A8A8A"/>
                    <span class="font-inter-medium text-gray-500 dark:text-[#8A8A8A]">{{ res.componentName }}: </span>
                    <code
                    v-html="
                        res.shortPath.replace(
                        searchTerm,
                        `<span class='text-app-blue font-black'>${searchTerm}</span>`
                        )
                    "
                    ></code>
                </template>
    
                <template #content>
                    <div class="flex flex-col w-full">
                    <div>Type: <code class="text-app-blue">{{ res.type }}</code></div>
                    {{ translations.search.defaultValue[store.lang] }} :
                    <div class="p-4 rounded">
                        <CodeParser :content="jsonToJsObject(res.value)" language="javascript" @copy="store.copy()">
                            <template #color v-if="res.type === 'string' && res.value.includes('#')">
                                <div :style="`background:${res.value}`" class="h-6 w-6 rounded border border-gray-400"/>
                            </template>
                        </CodeParser>
                    </div>
                    <router-link :to="`/docs#${res.route}`">
                        <div class="hover:underline dark:text-app-green font-black mt-2">
                        {{ translations.search.viewComponent[store.lang] }}
                        </div>
                    </router-link>
                    </div>
    
                </template>
                </VueDataUi>
            </BaseCard>
        </div>
    </div>
    <ConfirmCopy/>
</template>
