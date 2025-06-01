<script setup>
import { ref, computed, onMounted, defineAsyncComponent, watch, markRaw } from "vue";
import { useMainStore } from "../stores";
import { useMakerStore } from "../stores/maker"
import Tooltip from "../components/FlexibleTooltip.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import Rater from "../components/Rater.vue";

const MakerXy = defineAsyncComponent(() => import('../components/maker/MakerXy.vue'));
const MakerDonut = defineAsyncComponent(() => import('../components/maker/MakerDonut.vue'));
const MakerWaffle = defineAsyncComponent(() => import('../components/maker/MakerWaffle.vue'));
const MakerRadar = defineAsyncComponent(() => import('../components/maker/MakerRadar.vue'));
const MakerGauge = defineAsyncComponent(() => import('../components/maker/MakerGauge.vue'));
const MakerOnion = defineAsyncComponent(() => import('../components/maker/MakerOnion.vue'));
const MakerQuadrant = defineAsyncComponent(() => import('../components/maker/MakerQuadrant.vue'));
const MakerWheel = defineAsyncComponent(() => import('../components/maker/MakerWheel.vue'));
const MakerTiremarks = defineAsyncComponent(() => import('../components/maker/MakerTiremarks.vue'));
const MakerChestnut = defineAsyncComponent(() => import('../components/maker/MakerChestnut.vue'));
const MakerVerticalBar = defineAsyncComponent(() => import('../components/maker/MakerVerticalBar.vue'));
const MakerHeatmap = defineAsyncComponent(() => import('../components/maker/MakerHeatmap.vue'));
const MakerSparkline = defineAsyncComponent(() => import('../components/maker/MakerSparkline.vue'));
const MakerSparkStackbar = defineAsyncComponent(() => import('../components/maker/MakerSparkStackbar.vue'));
const MakerSparkbar = defineAsyncComponent(() => import('../components/maker/MakerSparkbar.vue'));
const MakerSparkHistogram = defineAsyncComponent(() => import('../components/maker/MakerSparkHistogram.vue'));
const MakerDonutEvolution = defineAsyncComponent(() => import('../components/maker/MakerDonutEvolution.vue'));
const MakerRings = defineAsyncComponent(() => import('../components/maker/MakerRings.vue'));
const MakerScatter = defineAsyncComponent(() => import('../components/maker/MakerScatter.vue'));
const MakerPyramid = defineAsyncComponent(() => import('../components/maker/MakerPyramid.vue'));
const MakerMoodRadar = defineAsyncComponent(() => import('../components/maker/MakerMoodRadar.vue'));
const MakerRelationCircle = defineAsyncComponent(() => import('../components/maker/MakerRelationCircle.vue'));
const MakerThermometer = defineAsyncComponent(() => import('../components/maker/MakerThermometer.vue'));
const Maker3dBar = defineAsyncComponent(() => import('../components/maker/Maker3dBar.vue'));
const MakerNestedDonuts = defineAsyncComponent(() => import('../components/maker/MakerNestedDonuts.vue'));
const MakerSparkgauge = defineAsyncComponent(() => import('../components/maker/MakerSparkgauge.vue'));
const MakerGalaxy = defineAsyncComponent(() => import('../components/maker/MakerGalaxy.vue'));
const MakerKpi = defineAsyncComponent(() => import('../components/maker/MakerKpi.vue'));
const MakerStripPlot = defineAsyncComponent(() => import('../components/maker/MakerStripPlot.vue'));
const MakerVueUiWordCloud = defineAsyncComponent(() => import('../components/maker/MakerVueUiWordCloud.vue'));
const MakerFlow = defineAsyncComponent(() => import('../components/maker/MakerFlow.vue'));
const MakerCarouselTable = defineAsyncComponent(() => import('../components/maker/MakerCarouselTable.vue'));
const MakerPcp = defineAsyncComponent(() => import('../components/maker/MakerPcp.vue'));
const MakerGizmo = defineAsyncComponent(() => import('../components/maker/MakerGizmo.vue'));
const MakerStackbar = defineAsyncComponent(() => import('../components/maker/MakerVueUiStackbar.vue'));
const MakerBullet = defineAsyncComponent(() => import('../components/maker/MakerBullet.vue'));
const MakerFunnel = defineAsyncComponent(() => import('../components/maker/MakerFunnel.vue'));
const MakerHistoryPlot = defineAsyncComponent(() => import('../components/maker/MakerHistoryPlot.vue'));
const MakerCirclePack = defineAsyncComponent(() => import('../components/maker/MakerCirclePack.vue'));
const MakerWorld = defineAsyncComponent(() => import('../components/maker/MakerVueUiWorld.vue'));

const store = useMainStore();
const makerStore = useMakerStore();

const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const options = ref([
    { component: markRaw(MakerXy), key: 'vue_ui_xy', name: "VueUiXy", icon: "chartLine", thumb: new URL('../assets/thumb_xy_light.png', import.meta.url).href, description: translations.value.docs.tooltips.xy},
    { component: markRaw(MakerDonut), key: 'vue_ui_donut', name: "VueUiDonut", icon: "chartDonut", thumb: new URL('../assets/thumb_donut_light.png', import.meta.url).href, description: translations.value.docs.tooltips.donut},
    { component: markRaw(MakerWaffle), key: 'vue_ui_waffle', name: "VueUiWaffle", icon: "chartWaffle", thumb: new URL('../assets/thumb_waffle_light.png', import.meta.url).href, description: translations.value.docs.tooltips.waffle},
    { component: markRaw(MakerRadar), key: 'vue_ui_radar', name: "VueUiRadar", icon: "chartRadar", thumb: new URL('../assets/thumb_radar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.radar},
    { component: markRaw(MakerGauge), key: 'vue_ui_gauge', name: "VueUiGauge", icon: "chartGauge", thumb: new URL('../assets/thumb_gauge_light.png', import.meta.url).href, description: translations.value.docs.tooltips.gauge},
    { component: markRaw(MakerOnion), key: 'vue_ui_onion', name: "VueUiOnion", icon: "chartOnion", thumb: new URL('../assets/thumb_onion_light.png', import.meta.url).href, description: translations.value.docs.tooltips.onion},
    { component: markRaw(MakerQuadrant), key: 'vue_ui_quadrant', name: "VueUiQuadrant", icon: "chartQuadrant", thumb: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href, description: translations.value.docs.tooltips.quadrant},
    { component: markRaw(MakerWheel), key: 'vue_ui_wheel', name: "VueUiWheel", icon: "chartWheel", thumb: new URL('../assets/thumb_wheel_light.png', import.meta.url).href, description: translations.value.docs.tooltips.wheel},
    { component: markRaw(MakerTiremarks), key: 'vue_ui_tiremarks', name: "VueUiTiremarks", icon: "chartTiremarks", thumb: new URL('../assets/thumb_tiremarks_light.png', import.meta.url).href, description: translations.value.docs.tooltips.tiremarks},
    { component: markRaw(MakerChestnut), key: 'vue_ui_chestnut', name: "VueUiChestnut", icon: "chartChestnut", thumb: new URL('../assets/thumb_chestnut_light.png', import.meta.url).href, description: translations.value.docs.tooltips.chestnut},
    { component: markRaw(MakerVerticalBar), key: 'vue_ui_vertical_bar', name: "VueUiVerticalBar", icon: "chartVerticalBar", thumb: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.verticalBar},
    { component: markRaw(MakerHeatmap), key: 'vue_ui_heatmap', name: "VueUiHeatmap", icon: "chartHeatmap", thumb: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href, description: translations.value.docs.tooltips.heatmap},
    { component: markRaw(MakerStripPlot), key: 'vue_ui_strip_plot', name: "VueUiStripPlot", icon: "chartStripPlot", thumb: new URL('../assets/thumb_strip_plot_light.png', import.meta.url).href, description: translations.value.docs.tooltips.stripPlot},
    { component: markRaw(MakerSparkline), key: 'vue_ui_sparkline', name: "VueUiSparkline", icon: "chartSparkline", thumb: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href, description: translations.value.docs.tooltips.sparkline},
    { component: markRaw(MakerSparkStackbar), key: 'vue_ui_sparkstackbar', name: "VueUiSparkStackbar", icon: "chartSparkStackbar", thumb: new URL('../assets/thumb_stackbar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.stackbar},
    { component: markRaw(MakerSparkbar), key: 'vue_ui_sparkbar', name: "VueUiSparkbar", icon: "chartSparkbar", thumb: new URL('../assets/thumb_sparkbar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.sparkbar},
    { component: markRaw(MakerSparkHistogram), key: 'vue_ui_sparkhistogram', name: "VueUiSparkHistogram", icon: "chartSparkHistogram", thumb: new URL('../assets/thumb_histogram_light.png', import.meta.url).href, description: translations.value.docs.tooltips.histogram},
    { component: markRaw(MakerDonutEvolution), key: 'vue_ui_donut_evolution', name: "VueUiDonutEvolution", icon: "chartDonutEvolution", thumb: new URL('../assets/thumb_donut_evolution_light.png', import.meta.url).href, description: translations.value.docs.tooltips.donutEvolution },
    { component: markRaw(MakerRings), key: 'vue_ui_rings', name: "VueUiRings", icon: "chartRings", thumb: new URL('../assets/thumb_rings_light.png', import.meta.url).href, description: translations.value.docs.tooltips.rings},
    { component: markRaw(MakerScatter), key: 'vue_ui_scatter', name: "VueUiScatter", icon: "chartScatter", thumb: new URL('../assets/thumb_scatter_light.png', import.meta.url).href, description: translations.value.docs.tooltips.scatter},
    { component: markRaw(MakerPyramid), key: 'vue_ui_age_pyramid', name: "VueUiAgePyramid", icon: "chartAgePyramid", thumb: new URL('../assets/thumb_age_pyramid_light.png', import.meta.url).href, description: translations.value.docs.tooltips.agePyramid},
    { component: markRaw(MakerMoodRadar), key: 'vue_ui_mood_radar', name: "VueUiMoodRadar", icon: "chartMoodRadar", thumb: new URL('../assets/thumb_mood_radar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.moodRadar},
    { component: markRaw(MakerRelationCircle), key: 'vue_ui_relation_circle', name: "VueUiRelationCircle", icon: "chartRelationCircle", thumb: new URL('../assets/thumb_relation_circle_light.png', import.meta.url).href, description: translations.value.docs.tooltips.relationCircle},
    { component: markRaw(MakerThermometer), key: 'vue_ui_thermometer', name: "VueUiThermometer", icon: "chartThermometer", thumb: new URL('../assets/thumb_thermometer_light.png', import.meta.url).href, description: translations.value.docs.tooltips.thermometer},
    { component: markRaw(Maker3dBar), key: 'vue_ui_3d_bar', name: "VueUi3dBar", icon: "chart3dBar", thumb: new URL('../assets/thumb_3d_bar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.bar3d},
    { component: markRaw(MakerNestedDonuts), key: 'vue_ui_nested_donuts', name: "VueUiNestedDonuts", icon: "chartNestedDonuts", thumb: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href, description: translations.value.docs.tooltips.nestedDonuts},
    { component: markRaw(MakerSparkgauge), key: 'vue_ui_sparkgauge', name: "VueUiSparkgauge", icon: "chartGauge", thumb: new URL('../assets/thumb_sparkgauge_light.png', import.meta.url).href, description: translations.value.docs.tooltips.gauge},
    { component: markRaw(MakerGalaxy), key: 'vue_ui_galaxy', name: "VueUiGalaxy", icon: "chartGalaxy", thumb: new URL('../assets/thumb_galaxy_light.png', import.meta.url).href, description: translations.value.docs.tooltips.galaxy},
    { component: markRaw(MakerVueUiWordCloud), key: 'vue_ui_word_cloud', name: "VueUiWordCloud", icon: "chartWordCloud", thumb: new URL('../assets/thumb_word_cloud_light.png', import.meta.url).href, description: translations.value.docs.tooltips.wordCloud},
    { component: markRaw(MakerFlow), key: 'vue_ui_flow', name: "VueUiFlow", icon: "chartFlow", thumb: new URL('../assets/thumb_flow_light.png', import.meta.url).href, description: translations.value.docs.tooltips.flow},
    { component: markRaw(MakerPcp), key: 'vue_ui_parallel_coordinate_plot', name: "VueUiParallelCoordinatePlot", icon: "chartParallelCoordinatePlot", thumb: new URL('../assets/thumb_pcp_light.png', import.meta.url).href, description: translations.value.docs.tooltips.pcp},
    { component: markRaw(MakerKpi), key: 'vue_ui_kpi', name: "VueUiKpi", icon: "kpiBox", thumb: "", description: translations.value.docs.tooltips.kpi},
    { component: markRaw(MakerCarouselTable), key: 'vue_ui_carousel_table', name: "VueUiCarouselTable", icon: "carouselTable", thumb: new URL('../assets/thumb_carousel_table_light.png', import.meta.url).href, description: translations.value.docs.tooltips.carouselTable},
    { component: markRaw(MakerGizmo), key: 'vue_ui_gizmo', name: "VueUiGizmo", icon: "battery", thumb: new URL('../assets/thumb_gizmo_light.png', import.meta.url).href, description: translations.value.docs.tooltips.gizmo},
    { component: markRaw(MakerStackbar), key: 'vue_ui_stackbar', name: "VueUiStackbar", icon: "chartStackbar", thumb: new URL('../assets/thumb_stack_bar_light.png', import.meta.url).href, description: translations.value.docs.tooltips.stackbarBig},
    { component: markRaw(MakerBullet), key: 'vue_ui_bullet', name: "VueUiBullet", icon: "chartBullet", thumb: new URL('../assets/thumb_bullet_light.png', import.meta.url).href, description: translations.value.docs.tooltips.bullet},
    { component: markRaw(MakerFunnel), key: 'vue_ui_funnel', name: "VueUiFunnel", icon: "chartFunnel", thumb: new URL('../assets/thumb_funnel_light.png', import.meta.url).href, description: translations.value.docs.tooltips.funnel},
    { component: markRaw(MakerHistoryPlot), key: 'vue_ui_history_plot', name: "VueUiHistoryPlot", icon: "chartHistoryPlot", thumb: new URL('../assets/thumb_history_plot_light.png', import.meta.url).href, description: translations.value.docs.tooltips.historyPlot},
    { component: markRaw(MakerCirclePack), key: 'vue_ui_circle_pack', name: "VueUiCirclePack", icon: "chartCirclePack", thumb: new URL('../assets/thumb_circle_pack_light.png', import.meta.url).href, description: translations.value.docs.tooltips.circlePack},
    { component: markRaw(MakerWorld), key: 'vue_ui_world', name: 'VueUiWorld', icon: 'world', thumb: new URL('../assets/thumb_world_light.png', import.meta.url).href, description: translations.value.docs.tooltips.world }
])

const selectedChart = ref({name: "VueUiXy", icon: "chartLine"});
const selectedComponent = ref("VueUiXy")

onMounted(() => {
    if(!localStorage.currentChart) {
        localStorage.setItem('currentChart', 'VueUiXy')
    } else {
        selectedChart.value = options.value.find(item => item.name === localStorage.currentChart);
        selectedComponent.value = selectedChart.name;
        selectChart(selectedChart.value)
    }
    window.scrollTo(0,0)
})

watch(() => selectedComponent.value, (v) => {
    const opt = options.value.find(o => o.name === v);
    selectChart(opt);
})

function saveSelectedChartToLocalStorage() {
    localStorage.currentChart = selectedChart.value.name;
    selectedComponent.value = selectedChart.value.name;
}

function selectChart(opt) {
    selectedChart.value = opt;
    selectedComponent.value = opt.name;
    saveSelectedChartToLocalStorage()
}

const crumbs = computed(() => {
    return [
        {
            description: translations.value.menu.docs[store.lang],
            link: '/docs'
        },
        {
            description: translations.value.menu.chartBuilder[store.lang],
        },
        {
            description: selectedChart.value.name,
            icon: selectedChart.value.icon
        }
    ]
})

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <ConfirmCopy />

    <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>

    <div class="w-full max-w-[1400px] mx-auto overflow-visible min-h-[3000px]">
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12 mt-20">
            <div class="relative h-[80px] w-[80px]">
                <VueUiIcon name="boxes" :size="80" :strokeWidth="0.8" class="absolute hidden md:block lushicon top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="isDarkMode ? '#5f8aee60' : '#5f8aee'"/>
            </div>
            <h1 class="text-[64px] sm:text-[96px] text-center">{{ translations.menu.chartBuilder[store.lang] }}</h1>
        </div>

        <div class="w-full max-w-[500px] flex flex-row flex-wrap gap-2 mx-auto justify-center my-12 bg-gradient-to-br from-app-blue-light to-app-blue py-3 px-2 rounded-md">
            <div v-for="(option, i) in options" :class="`relative`">
                <Tooltip :content="option.name" width="w-fit min-w-[120px]" delay="delay-150" :img="option.thumb">
                    <button 
                        @click="selectChart(option)" 
                        :class="`
                            p-2 
                            rounded-md 
                            h-12 
                            w-20 
                            flex 
                            place-items-center 
                            justify-center 
                            shadow 
                            border 
                            border-transparent
                            relative 
                            ${selectedChart.name === option.name ? 'bg-gradient-to-br from-[#1A1A1A] to-[#4A4A4A]' : 'bg-gradient-to-br from-gray-300 to-white hover:border-app-blue-light'}
                        `"
                    >
                        <VueUiIcon class="-mt-2" :name="option.icon" :stroke="selectedChart.name === option.name ? '#CCCCCC' :'#3A3A3A'"></VueUiIcon>
                        <div :class="`
                            absolute 
                            bottom-1 
                            left-1/2 
                            -translate-x-1/2 
                            text-center 
                            text-[7px]
                            ${selectedChart.name === option.name ? 'text-[#CCCCCC]' : 'text-black'}
                        `">
                            {{ option.name.replace('VueUi', '') }}
                        </div>
                    </button>
                </Tooltip>
            </div>
            <div class="flex flex-row gap-3 place-items-end justify-center border-t w-full pt-2 mt-2">
                <div class="flex flex-col gap-2">
                    <label for="chartType" class="text-black">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>

                    <BaseDropdown
                        :options="options"
                        v-model:value="selectedComponent"
                        optionTarget="name"
                        additionalOptionTarget="name"
                        id="exampleSelect"
                    >
                        <template #selected="{ selectedOption }">
                            <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                                <div class="h-[24px] w-[24px] flex place-items-center">
                                    <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                                </div>
                                <div class="text-xl">
                                    <span :class="'text-gray-500 dark:text-app-blue'">VueUi</span>
                                    <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.name.replace('VueUi', '') }}</span>
                                </div>
                            </div>
                        </template>
                        <template #option="{ option, selected, current }">
                            <div class="text-left flex flex-row gap-2 place-items-center">
                                <div class="h-[20px] w-[20px] flex place-items-center">
                                    <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                                </div>
                                <div>
                                    <span :class="selected || current ? `text-white` : 'text-gray-500 dark:text-app-blue'">VueUi</span>
                                    <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('VueUi', '') }}</span>
                                </div>
                            </div>
                        </template>
                    </BaseDropdown>
                </div>
            </div>
            <div class="text-black w-[300px] pl-2 border-l-2 border-white dark:border-[#3A3A3A] relative bg-gradient-to-r from-[#FFFFFF40] to-transparent shadow-md py-2 pr-2 rounded-l">
                {{ options.find(o => o.name === selectedComponent).description[store.lang] }}
                <svg class="absolute -top-[38px] -left-[12px] overflow-visible w-[10px]" viewBox="0 0 20 100">
                    <path
                        d="M20,120 -16,120 -16,16 13,16"
                        :stroke="isDarkMode ? '#3A3A3A' : '#FFFFFF'"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                    />
                </svg>
            </div>
        </div>

        <div class="w-full mt-6">

                <div class="font-bold flex flex-col sm:flex-row gap-4 justify-center place-items-center my-12 bg-gray-200 dark:bg-[#FFFFFF10] w-fit mx-auto p-4 rounded-full">
                    <div class="py-2 px-4">1. {{ makerTranslations.steps.one[store.lang] }}</div>
                    <div class="hidden sm:block">
                        <VueUiIcon name="arrowRight" stroke="#42d392" class="drop-shadow-lg" />
                    </div>
                    <div class="sm:hidden">
                        <VueUiIcon name="arrowBottom" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="py-2 px-4">2. {{ makerTranslations.steps.two[store.lang] }}</div>
                    <div class="hidden sm:block">
                        <VueUiIcon name="arrowRight" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="sm:hidden">
                        <VueUiIcon name="arrowBottom" stroke="#42d392" class="drop-shadow-lg"/>
                    </div>
                    <div class="py-2 px-4">3. {{ makerTranslations.steps.three[store.lang] }}</div>
                </div>

        </div>
        
        <Transition name="fade">
            <component :is="selectedChart.component">
                <template #rater>
                    <Rater :itemId="selectedChart.key"/>
                </template>
            </component>
        </Transition>
    </div>
</template>

<style>
.vue-data-ui-tooltip {
  font-family: Satoshi;
}

.lushicon {
    animation: lush 2s infinite linear;
}

@keyframes lush {
    from {
        filter: hue-rotate(0deg);
    }
    to {
        filter: hue-rotate(360deg);
    }
}
</style>
