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
import BaseTextCopy from '../components/BaseTextCopy.vue';
import BaseDropdown from '../components/BaseDropdown.vue';

const store = useMainStore();
const route = useRoute();
const router = useRouter();
const searchTerm = computed(() => route.query.q || '')

const selectedComponent = ref('Filter by component');

onMounted(() => {
    selectedComponent.value = route.query.f || 'Filter by component';
})

const searchResults = ref([]);
const hasResults = ref(false);
const translations = computed(() => store.translations)
const isDarkMode = computed(() => store.isDarkMode);
const componentSearch = ref(null);

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
    selectedComponent.value = 'Filter by component';
    router.replace({ query: {
        q: searchTerm.value
    }});
    if (componentSearch.value) {
        componentSearch.value.clearSearch();
    }
}

const filteredResults = computed(() => {
    if (!selectedComponent.value || selectedComponent.value === 'Filter by component') return searchResults.value.sort((a, b) => a.componentName.localeCompare(b.componentName));
    return searchResults.value.filter(r => r.componentName === selectedComponent.value)
})

const iconMap = ref({
    VueUiSparkline: 'chartSparkline',
    VueUiSparkbar: 'chartSparkbar',
    VueUiSparkStackbar: 'chartSparkStackbar',
    VueUiSparkHistogram: 'chartSparkHistogram',
    VueUiSparkgauge: 'chartGauge',
    VueUiSparkTrend: 'trend',
    VueUiQuickChart: 'vueDataUi',
    VueUiXy: 'chartLine',
    VueUiXyCanvas: 'chartLine',
    VueUiVerticalBar: 'chartVerticalBar',
    VueUiHorizontalBar: 'chartVerticalBar',
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
    VueUiCarouselTable: 'carouselTable',
    VueUiStackline: 'chartStackline',
    VueUiDag: 'chartDag',
    VueUiGeo: 'chartGeo'
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

function updateSelectedComponent(c) {
    selectedComponent.value = c
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
            <BaseDropdown
                ref="componentSearch"
                v-if="(searchTerm || showSuggestions) && availableComponents.length > 1"
                :options="[
                    {
                        name: 'Filter by component',
                        translation: 'All components',
                        icon: 'clipBoard'
                    },
                    ...availableComponents.map(c => ({
                        name: c,
                        translation: c,
                        icon: iconMap[c]
                    }))
                ]"
                v-model:value="selectedComponent"
                @change="updateSelectedComponent"
                background="bg-white dark:bg-[#1A1A1A]"
                option-target="name"
                additional-option-target="name"
                id="componentSelect"
            >
                <template #selected="{ selectedOption }">
                    <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                        <div class="h-[24px] w-[24px] flex place-items-center">
                            <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                        </div>
                        <div class="text-[17px]">
                            <span v-if="selectedOption.name !== 'Filter by component'" class="text-gray-500 dark:text-app-blue">VueUi</span>
                            <span v-if="selectedOption.name !== 'Filter by component'" :class="'dark:text-app-blue-light font-inter-medium'">{{ selectedOption.name.replaceAll('VueUi', '') }}</span>
                            <span v-else :class="'dark:text-app-blue-light'">{{ selectedOption.name }}</span>
                        </div>
                    </div>
                </template>
                <template #option="{ option, selected, current }">
                    <div class="text-left flex flex-row gap-2 place-items-center">
                        <div class="h-[20px] w-[20px] flex place-items-center">
                            <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                        </div>
                        <div>
                            <span v-if="option.name !== 'Filter by component'" :class="selected || current ? 'text-white' : 'text-gray-500 dark:text-app-blue'">VueUi</span>
                            <span v-if="option.name !== 'Filter by component'" :class="selected || current ? `text-white font-inter-medium`: 'dark:text-app-blue-light font-inter-medium'">{{ option.translation.replaceAll('VueUi', '') }}</span>
                            <span v-else :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.translation }}</span>
                        </div>
                    </div>
                </template>
            </BaseDropdown>
    
            <button
                v-if="selectedComponent !== 'Filter by component'"
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
                    <BaseTextCopy :value="res.shortPath">
                        <code
                        v-html="
                            res.shortPath.replace(
                            searchTerm,
                            `<span class='text-app-blue font-black'>${searchTerm}</span>`
                            )
                        "
                        ></code>
                    </BaseTextCopy>
                </template>
    
                <template #content>
                    <div class="flex flex-col w-full">
                        <div class="pl-6">Type: <code class="text-app-blue">{{ res.type }}</code></div>
                        <div class="pl-6">
                            {{ translations.search.defaultValue[store.lang] }} :
                        </div>
                        <div class="p-4 rounded">
                            <CodeParser :content="jsonToJsObject(res.value)" language="javascript" @copy="store.copy()">
                                <template #color v-if="res.type === 'string' && res.value.includes('#')">
                                    <div :style="`background:${res.value}`" class="h-10 w-10 rounded-full border border-gray-400 mr-6"/>
                                </template>
                            </CodeParser>
                        </div>
                        <router-link :to="`/docs#${res.route}`">
                            <div class="hover:underline dark:text-app-green font-black mt-2 pl-6">
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
