<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import useExamples from "../useExamples";
import { useMainStore } from "../stores";
import BaseDocHeaderActions from "../components/BaseDocHeaderActions.vue";
import BaseTabContainer from "../components/BaseTabContainer.vue";
import { useRoute, useRouter } from "vue-router";
import BaseSpinner from "../components/BaseSpinner.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import Rater from "../components/Rater.vue";
import { CircleArrowDownRightFilledIcon, CircleArrowRightFilledIcon, CircleArrowUpRightFilledIcon } from "vue-tabler-icons";

const { examples } = useExamples()
const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode); 
const router = useRouter();
const route = useRoute();
const translations = computed(() => store.translations);
const raterStep = ref(0);

const key = ref(0);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    }
]);

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    let hash = route.hash ? route.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null;
    if (hash === 'VueUiSparkhistogram') {
        hash = 'VueUiSparkHistogram'
    }
    const hashIcon = hash ? categories.value.find(c => c.component === hash) ? categories.value.find(c => c.component === hash).icon : undefined : undefined

    if (crumbs.value.length === 2) {
        crumbs.value.push({
            description: hash,
            icon: hashIcon
        })
    } else {
        crumbs.value[2] = {
            description: hash,
            icon: hashIcon
        }
    }
    raterStep.value += 1;
}

//<Rater itemId="vue_ui_donut" />

const categories = computed(() => {
    return  [
        { 
            link: 'vue-ui-xy', 
            icon: 'chartLine', 
            component: 'VueUiXy',
            thumb: new URL('../assets/thumb_xy.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_xy_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.xy,
            raterId: 'vue_ui_xy'
        },
        { 
            link: 'vue-ui-donut', 
            icon: 'chartDonut', 
            component: 'VueUiDonut',
            thumb: new URL('../assets/thumb_donut.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_donut_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.donut,
            raterId: 'vue_ui_donut'
        },
        {
            link: 'vue-ui-sparkline',
            icon: 'chartSparkline',
            component: 'VueUiSparkline',
            thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.sparkline,
            raterId: 'vue_ui_sparkline'
        },
        {
            link: 'vue-ui-stackbar',
            icon: 'chartStackbar',
            component: 'VueUiStackbar',
            thumb: new URL('../assets/thumb_stack_bar.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_stack_bar_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.stackbar,
            raterId: 'vue_ui_stackbar'
        },
        { 
            link: 'vue-ui-nested-donuts', 
            icon: 'chartNestedDonuts', 
            component: 'VueUiNestedDonuts',
            thumb: new URL('../assets/thumb_nested_donuts.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.nestedDonuts,
            raterId: 'vue_ui_nested_donuts'
        },
        {
            link: 'vue-ui-waffle',
            icon: 'chartWaffle',
            component: 'VueUiWaffle',
            thumb: new URL('../assets/thumb_waffle.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_waffle_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.waffle,
            raterId: 'vue_ui_waffle'
        },
        {
            link: 'vue-ui-vertical-bar',
            icon: 'chartVerticalBar',
            component: 'VueUiVerticalBar',
            thumb: new URL('../assets/thumb_vertical_bar.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.verticalBar,
            raterId: 'vue_ui_vertical_bar'
        },
        {
            link: 'vue-ui-heatmap',
            icon: 'chartHeatmap',
            component: 'VueUiHeatmap',
            thumb: new URL('../assets/thumb_heatmap.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.heatmap,
            raterId: 'vue_ui_heatmap'
        },
        {
            link: 'vue-ui-gauge',
            icon: 'chartGauge',
            component: 'VueUiGauge',
            thumb: new URL('../assets/thumb_gauge.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_gauge_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.gauge,
            raterId: 'vue_ui_gauge'
        },
        {
            link: 'vue-ui-onion',
            icon: 'chartOnion',
            component: 'VueUiOnion',
            thumb: new URL('../assets/thumb_onion.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_onion_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.onion,
            raterId: 'vue_ui_onion'
        },
        {
            link: 'vue-ui-word-cloud',
            icon: 'chartWordCloud',
            component: 'VueUiWordCloud',
            thumb: new URL('../assets/thumb_word_cloud.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_word_cloud_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.wordCloud,
            raterId: 'vue_ui_word_cloud'
        },
        {
            link: "vue-ui-scatter",
            icon: 'chartScatter',
            component: 'VueUiScatter',
            thumb: new URL('../assets/thumb_scatter.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_scatter_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.scatter,
            raterId: 'vue_ui_scatter'
        },
        {
            link: 'vue-ui-wheel',
            icon: 'chartWheel',
            component: 'VueUiWheel',
            thumb: new URL('../assets/thumb_wheel.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_wheel_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.wheel,
            raterId: 'vue_ui_wheel'
        },
        {
            link: 'vue-ui-sparkhistogram',
            icon: 'chartSparkHistogram',
            component: 'VueUiSparkHistogram',
            thumb: new URL('../assets/thumb_histogram.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_histogram_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.histogram,
            raterId: 'vue_ui_sparkhistogram'
        },
        {
            link: 'vue-ui-quadrant',
            icon: 'chartQuadrant',
            component: 'VueUiQuadrant',
            thumb: new URL('../assets/thumb_quadrant.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.quadrant,
            raterId: 'vue_ui_quadrant'
        },
        {
            link: 'vue-ui-radar',
            icon: 'chartRadar',
            component: 'VueUiRadar',
            thumb: new URL('../assets/thumb_radar.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_radar_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.radar,
            raterId: 'vue_ui_radar'
        },
        {
            link: 'vue-ui-strip-plot',
            icon: 'chartStripPlot',
            component: 'VueUiStripPlot',
            thumb: new URL('../assets/thumb_strip_plot.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_strip_plot_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.stripPlot,
            raterId: 'vue_ui_strip_plot'
        },
        {
            link: 'vue-ui-bullet',
            icon: 'chartBullet',
            component: 'VueUiBullet',
            thumb: new URL('../assets/thumb_bullet.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_bullet_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.bullet,
            raterId: 'vue_ui_bullet'
        },
        {
            link: 'vue-ui-funnel',
            icon: 'chartFunnel',
            component: 'VueUiFunnel',
            thumb: new URL('../assets/thumb_funnel.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_funnel_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.funnel,
            raterId: 'vue_ui_funnel'
        },
        {
            link: 'vue-ui-treemap',
            icon: 'chartTreemap',
            component: 'VueUiTreemap',
            thumb: new URL('../assets/thumb_treemap.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_treemap_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.treemap,
            raterId: 'vue_ui_treemap'
        },
        {
            link: 'vue-ui-history-plot',
            icon: 'chartHistoryPlot',
            component: 'VueUiHistoryPlot',
            thumb: new URL('../assets/thumb_history_plot.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_history_plot_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.historyPlot,
            raterId: 'vue_ui_history_plot'
        },
    ].map((c, i) => {
        return {
            ...c,
            order: i
        }
    })
})

const inProgress = ref({
    en: 'A selection of examples to showcase Vue Data UI flexibility',
    fr: 'Une sélection d’exemples pour montrer la flexibilité de Vue Data UI',
    pt: 'Uma seleção de exemplos para demonstrar a flexibilidade do Vue Data UI',
    de: 'Eine Auswahl an Beispielen zur Veranschaulichung der Flexibilität von Vue Data UI',
    zh: '一组示例展示 Vue Data UI 的灵活性',
    jp: 'Vue Data UI の柔軟性を示す例のセレクション',
    es: 'Una selección de ejemplos para mostrar la flexibilidad de Vue Data UI',
    ko: 'Vue Data UI의 유연성을 보여주는 예제 모음',
    ar: 'مجموعة مختارة من الأمثلة لعرض مرونة Vue Data UI'
});

const checkTheDocs = ref({
    en: 'Check the docs page to see the list of all available components',
    fr: 'Consultez la page de documentation pour voir la liste de tous les composants disponibles',
    pt: 'Verifique a página de documentação para ver a lista de todos os componentes disponíveis',
    de: 'Überprüfen Sie die Dokumentationsseite, um die Liste aller verfügbaren Komponenten zu sehen',
    zh: '查看文档页面以获取所有可用组件的列表',
    jp: 'すべての利用可能なコンポーネントのリストは、ドキュメントページを確認してください',
    es: 'Consulta la página de documentación para ver la lista de todos los componentes disponibles',
    ko: '사용 가능한 모든 구성 요소 목록은 문서 페이지를 확인하세요',
    ar: 'تحقق من صفحة الوثائق لرؤية قائمة جميع المكونات المتاحة'
})

const selectedLink = ref('');
const selectedOrder = ref(null);
const selectedType = ref(null);
const step = ref(0);

function goToExample() {
    updateHash(selectedLink.value);
    selectedOrder.value = categories.value.find(el => el.link === selectedLink.value).order
    step.value += 1
}

onMounted(() => {
    if (route.hash) {
        selectedLink.value = route.hash.replace('#', '');
        selectedOrder.value = categories.value.find(c => c.link === selectedLink.value).order;
        selectedType.value = categories.value.find(c => c.link === selectedLink.value);
        updateCrumb();
    } else {
        updateHash('vue-ui-xy');
        selectedType.value = categories.value.find(c => c.link === 'vue-ui-xy')
    }
});

function updateHash(link) {
    router.push({ path: route.path, hash: link ? `#${link}` : '' });
    selectedLink.value = link;
    selectedType.value = categories.value.find(c => c.link === link);
    setTimeout(updateCrumb, 100)
}

const filteredExamples = computed(() => {
    return examples.value.filter(e => e.link === selectedLink.value)
})

const hoveredLink = ref(null);

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

    <!-- CHART TYPE SELECTION -->
    <div class="fixed top-[87px] left-0 w-full bg-[#F2F3F6] dark:bg-[#232323] z-50 py-4 drop-shadow-md">
        <div class="w-full max-w-[1400px] mx-auto px-4 sm:px-12">
            <BaseTabContainer :selected-index-on-load="selectedOrder">
                <template #content>
                    <div v-for="category in categories" class="relative rounded w-[100px] sm:w-[150px] h-[100px] sm:h-[100px] flex-shrink-0 bg-[#F2F3F6] dark:bg-[#232323]" @mouseover="hoveredLink = category" @mouseleave="hoveredLink = null">
                        <button @click="updateHash(category.link)" :class="`p-2 flex flex-col place-items-center justify-center h-full w-full rounded border ${selectedLink === category.link ? 'border-app-blue' : 'border-transparent'}`">
                            <img class="w-full h-full object-contain rounded" :src="isDarkMode ? category.thumb : category.thumbLight">
                        </button>
                        <Transition name="fade">
                            <div style="width: calc(100% - 2px)" class="text-shadow-md absolute top-0 left-[1px] pointer-events-none bg-[#1A1A1A10] dark:bg-[#FFFFFF10] h-full flex place-items-end justify-center" v-if="(hoveredLink && hoveredLink.link === category.link) || selectedLink === category.link">
                                <div class="text-xs sm:text-md w-full pb-2 pt-1 text-center bg-[#1A1A1A80] text-white">
                                    {{ category.component }}
                                </div>
                            </div>
                        </Transition>
                    </div>
                </template>
            </BaseTabContainer>
        </div>
    </div>

    <div class="px-16 my-12 mx-auto text-center max-w-[80ch] flex flex-col place-items-center gap-4 mt-[200px]" dir="auto">
        <span class="text-xl">{{ inProgress[store.lang] }}</span>
        <div dir="auto" class="flex flex-row gap-4 place-items-center justify-center flex-wrap">
            <span dir="auto" class="text-gray-500">{{ checkTheDocs[store.lang] }}</span>
            <RouterLink to="/docs">
                <button dir="auto" class="py-2 px-4 rounded border bg-[#5f8aee30] border-app-blue hover:bg-[#5f8aee50] transition-colors">
                    {{ translations.menu.docs[store.lang]  }}
                </button>
            </RouterLink>
        </div>
        <div class="flex flex-col gap-2 place-items-start">
            <label for="exampleSelect" class="text-xs">Select component:</label>
            <BaseDropdown
                :options="categories"
                v-model:value="selectedLink"
                @change="goToExample"
                id="exampleSelect"
                additional-option-target="component"
            >
                <template #selected="{ selectedOption }">
                    <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                        <div class="h-[24px] w-[24px] flex place-items-center">
                            <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                        </div>
                        <div class="text-xl">
                            <span :class="'text-gray-500 dark:text-app-blue'">VueUi</span>
                            <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.component.replace('VueUi', '') }}</span>
                        </div>
                    </div>
                </template>
                <template #option="{ option, selected, current }">
                    <div class="text-left flex flex-row gap-2 place-items-center">
                        <div class="h-[20px] w-[20px] flex place-items-center">
                            <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                        </div>
                        <div>
                            <span :class="(selected || current) ? `text-white` : 'text-gray-500 dark:text-app-blue'">VueUi</span>
                            <span :class="(selected || current) ? `text-white`: 'dark:text-app-blue-light'">{{ option.component.replace('VueUi', '') }}</span>
                        </div>
                    </div>
                </template>
            </BaseDropdown>
        </div>
        <div v-if="selectedType" class="text-gray-500 mx-auto max-w-[60ch]" dir="auto">{{ selectedType.description[store.lang] }}</div>
    </div>

    <div class="max-w-[1270px] px-12 pt-12 mx-auto text-center border-t border-gray-500 flex flex-col justify-center gap-2"/>

    <div class="min-h-[1000px]">
        <!-- EXAMPLES DISPLAY -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-[1400px] mx-auto flex-wrap px-4 sm:px-16 sm:mt-6">
            <div v-for="example in filteredExamples" :key="`${example.id}_${key}`" class=" flex-col inline-flex w-full bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded shadow-md" :id="example.id">
                <div dir="auto" class="bg-gray-200 dark:bg-[rgb(35,35,35)] p-4 rounded-t">
                    <div class="flex flex-row gap-4 place-items-center">
                        <div class="flex flex-row gap-2 place-items-center pb-5 border-b w-fit border-app-blue dark:border-[#6A6A6A]">
                            <VueUiIcon :name="example.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                            <h2 class="text-gray-800 dark:text-[#1F77B4]">{{ example.component }}</h2>
                        </div>
                        <BaseDocHeaderActions
                            :defaultConfig="false"
                            :customConfig="example.config"
                            :customDataset="example.dataset"
                            :targetDoc="example.link"
                            justify="justify-start"
                        />
                    </div>
                    <p class="text-sm dark:text-[#9dcbeb]">{{  example.description[store.lang] }}</p>

                    <div v-if="example.tags && example.tags.length" class="flex flex-row gap-2 place-items-center flex-wrap my-2">
                        <div>Slots used:</div>
                        <div v-for="tag in example.tags">
                            <div class="text-xs px-2 py-0.5 bg-gradient-to-br from-[#6fe8b2] to-app-green text-black rounded-full">
                                {{ tag }}
                            </div>
                        </div>
                    </div>
                    <RouterLink :to="`/docs#${example.link}`" v-if="example.tags && example.tags.length">
                        <a class="text-app-blue underline text-sm">{{ translations.checkSlotsTab[store.lang] }}</a>
                    </RouterLink>
                </div>
    
                <Suspense>
                    <template #default>
                        <div class="w-full p-4 example-wrapper">
                            <VueDataUi :component="example.component" :dataset="example.dataset" :config="example.config">
                                <template #plot-comment="{ plot }">
                                    <template v-if="example.component === 'VueUiXy'">
                                        <div v-if="['up', 'eq', 'down'].includes(plot.comment.trend)" class="text-black dark:text-[#CCCCCC] w-full flex flex-col place-items-center text-xl py-2 -mt-5">
                                            <div class="text-sm mb-1">
                                                <span class="text-app-green" v-if="plot.comment.trend === 'up'">{{ plot.comment.evolution.toFixed(1) + '%' }}</span>
                                                <span class="text-[#FF6600]" v-if="plot.comment.trend === 'down'">{{ plot.comment.evolution.toFixed(1) + '%' }}</span>
                                                <span class="text-[#6A6A6A]" v-if="plot.comment.trend === 'eq'">{{ plot.comment.evolution.toFixed(1) + '%' }}</span>
                                            </div>
                                            <CircleArrowUpRightFilledIcon v-if="plot.comment.trend === 'up'" color="#42d392" style="transform: scale(1.2,1.2)"/>
                                            <CircleArrowRightFilledIcon v-if="plot.comment.trend === 'eq'" color="#6A6A6A" style="transform: scale(1.2,1.2)"/>
                                            <CircleArrowDownRightFilledIcon v-if="plot.comment.trend === 'down'" color="#FF6600" style="transform: scale(1.2,1.2)"/>
                                        </div>
                                        <template v-else-if="!Object.hasOwn(plot.comment, 'trend')">
                                            <div v-if="plot.value === 140" class="text-black dark:text-[#CCCCCC] w-full flex flex-col place-items-center text-xl bg-[#FFFFFF] dark:bg-[#4A4A4A] py-2 rounded shadow-md border border-app-green">
                                                <VueUiIcon name="smiley" stroke="#42d392" :size="30"/>
                                                {{ plot.comment }}
                                            </div>
                                            <div v-else-if="plot.value === 12" class="text-black dark:text-[#CCCCCC] w-full flex flex-col place-items-center text-xl bg-[#FFFFFF] dark:bg-[#4A4A4A] py-2 rounded shadow-md border border-app-orange">
                                                <VueUiIcon name="moodFlat" stroke="#FF6600" :size="30"/>
                                                {{ plot.comment }}
                                            </div>
                                        </template>
                                    </template>
                                    <div v-else :style="`text-align:${plot.textAlign}; color:${plot.color}; font-size: 10px; padding: 6px;`">
                                        {{ plot.comment }}
                                    </div>
                                </template>

                                <template #chart-background v-if="example.chartBackground">
                                    <div v-if="isDarkMode" :style="{ height: '100%', width: '100%' }">
                                        <img src="../assets/slot_chart_background.png" class="w-full object-cover h-full">
                                    </div>
                                    <div v-else :style="{ height: '100%', width: '100%' }">
                                        <img src="../assets/slot_chart_background_light.png" class="w-full object-cover h-full">
                                    </div>
                                </template>

                                <template #chart-background v-if="example.chartBackgroundPattern">
                                    <div v-if="isDarkMode" :style="{ height: '100%', width: '100%' }" class="bg-pattern-dark"/>
                                    <div v-else :style="{ height: '100%', width: '100%' }" class="bg-pattern" />
                                </template>

                                <template #pattern="{ seriesIndex, patternId }" v-if="example.pattern">
                                    <Suspense>
                                        <VueUiPattern name="bubbles" :id="patternId" :stroke="isDarkMode ? '#5A5A5A' : '#CCCCCC'" :scale="1"/>
                                    </Suspense>
                                </template>

                                <template #pattern="{ seriesIndex, patternId }" v-if="example.multiPattern">
                                    <pattern v-if="seriesIndex === 0" :id="patternId" width="50.222" height="29.003" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-linecap="square" d="M58.592-14.503h-16.74m6.277 3.627H56.5l4.188 7.25h-8.373zM60.686 3.623l-4.187 7.25h-8.372l4.187-7.25zM41.852-7.252l4.185 7.25-4.185 7.252L37.666 0zm25.11 7.25L58.593 14.5h-16.74L33.481-.001l8.371-14.501m16.74-.001 8.37 14.502m0 0h-16.74v0m-8.37-14.501L50.222 0l-8.37 14.503M8.371-14.502H-8.37m6.276 3.627h8.371l4.188 7.25H2.093zM10.464 3.624l-4.186 7.25h-8.373l4.187-7.25zM-8.37-7.251-4.185 0-8.37 7.252-12.556 0zM16.74 0 8.37 14.502H-8.37L-16.742 0l8.371-14.501m16.74-.001L16.741-.001m0 0H.001v0m-8.37-14.501L0 0l-8.37 14.503m6.275 3.625h8.372l4.187 7.25H2.093zm12.558 14.499-4.187 7.25h-8.372l4.187-7.25zM-8.371 21.752l4.185 7.25-4.185 7.252-4.185-7.251zm25.112 7.25L8.37 43.504H-8.37l-8.371-14.502 8.37-14.501M8.37 14.5l8.372 14.502m0 0H0v0m-8.37-14.5L0 29.003l-8.37 14.503m56.5-25.379 8.371.001 4.188 7.25h-8.373zm12.557 14.5L56.5 39.876l-8.372.001 4.187-7.25zM41.852 21.751l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74l-8.372-14.5M58.59 14.5l8.372 14.503m0 0h-16.74v0m-8.371-14.501 8.37 14.501-8.37 14.503M33.482 0h-16.74m6.276 3.627 8.371.001 4.188 7.25h-8.373zm12.557 14.5-4.187 7.249-8.372.001 4.187-7.25zM16.741 7.25l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74M41.851 14.5h-16.74v0M16.742 0l8.37 14.502-8.37 14.503"/></pattern>

                                    <pattern v-if="seriesIndex === 1" :id="patternId" width="23.07" height="40" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-linecap="square" d="m17.62 0-6.07 10.5m2.74 4.76L8.22 4.75m-5.48 0h12.13M.01 0h23.07M6.07 20 0 9.5m2.74-4.75-6.07 10.5m-5.48 0H3.33m8.2 4.75L0 .02-11.54 20m40.68 0L23.07 9.5m2.74-4.75-6.06 10.5m-5.49 0H26.4M34.6 20 23.08.02 11.53 20m-5.46 0L0 30.51m2.74 4.75-6.07-10.5m-5.48 0H3.33m8.2-4.75L0 40l-11.54-19.98zM17.6 40l-6.06-10.5m2.74-4.76L8.2 35.25m-5.48 0h12.13M0 40h23.07L11.54 20.01m17.6 0-6.07 10.5m2.74 4.75-6.06-10.5m-5.49 0H26.4M11.53 20h23.08L23.07 40"/></pattern>

                                    <pattern v-if="seriesIndex === 2" :id="patternId" width="100" height="173.21" patternTransform="scale(0.6)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A" d="M0 0v4.74L2.73 0zm4.14 0 6.44 11.15 2.38-4.12L8.9 0zm23.81 0 .49.84h-14.3l2.39 4.13h11.9l-7.14 12.37h4.77L34.39 2.9 32.71 0zm9.52 0 .49.84h19.05l7.14 12.37H49.87l2.38 4.13h11.9l-7.14 12.37h4.76l8.34-14.44L61.28 0zm28.57 0 7.64 13.21h19.04l7.15 12.37h-14.3l2.39 4.13h11.9l-7.14 12.37h4.77l2.5-4.34V17.57l-3.7-6.42 3.7-6.41V0h-2.01l-5.25 9.1H78.44L83.7 0h-4.77l-4.06 7.03L70.81 0zm22.41 0-2.87 4.97h4.76L93.21 0zm-50.5 4.97-9.51 16.5h-14.3l7.15-12.38h-4.76L10.58 19.4 3.44 7.03l-2.39 4.12 8.34 14.43h19.05l7.14 12.38H21.29l2.39 4.12h11.9l-7.14 12.38h4.75l8.34-14.44-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.3h14.29l-2.38-4.13zm35.72 12.37-9.52 16.5H49.87l7.14-12.38h-4.76l-5.96 10.31-7.14-12.37-2.38 4.12 8.33 14.44h19.05l7.14 12.37H57.01l2.38 4.13h11.9l-7.14 12.37h4.76l8.33-14.44-9.52-16.5 7.14-12.37 7.15 12.38 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM0 17.57v20.16l5.82-10.08zm9.39 12.14-9.4 16.27v4.57L7 62.71H0v4.12h7L0 78.97v.23h4.63l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.13-5.95-10.3h14.29l-2.38-4.13zm65.47 2.06-2.38 4.13 8.34 14.43h19.05l.13.22v-4.57l-.13.23h-14.3l7.15-12.38h-4.76l-5.95 10.31zM45.1 42.08l-9.52 16.5H21.29l7.15-12.37h-4.76l-5.96 10.3-7.14-12.37-2.38 4.13 8.33 14.44h19.05l7.14 12.37H28.44l2.38 4.12h11.9l-7.14 12.37h4.76l8.33-14.43-9.52-16.5 7.14-12.37 7.15 12.37 2.38-4.12-5.95-10.31h14.28l-2.38-4.13zm35.72 12.38-9.53 16.49H57.01l7.14-12.37h-4.76l-5.95 10.3-7.15-12.36-2.37 4.12 8.33 14.44h19.04l7.15 12.37h-14.3l2.39 4.12h11.9l-7.14 12.37h4.77l8.33-14.43-9.53-16.5 7.15-12.37 7.14 12.37 2.38-4.12-5.95-10.31h14.29l-2.39-4.12zm11.9 8.25 2.38 4.12h4.9v-4.12zm-76.2 4.12L7 83.33H0v4.12h7l7.15 12.37H0v.23l2.25 3.9h11.9L7 116.31h4.77l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.31h14.29l-2.39-4.12zm65.49 2.06-2.38 4.12 8.33 14.44H100v-4.13h-7.28l7.15-12.37H95.1l-5.95 10.3zM100 78.97l-.13.23h.13zm-47.75.23-9.53 16.5H28.44l7.14-12.38h-4.76l-5.96 10.31-7.14-12.37-2.38 4.12 8.34 14.44h19.04l7.15 12.37h-14.3l2.39 4.12h11.9l-7.14 12.37h4.76l8.34-14.43-9.53-16.5 7.15-12.37 7.14 12.38 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM0 91.57v4.12h7l-2.37-4.12zm87.96 0-9.52 16.5h-14.3l7.15-12.38h-4.76L60.58 106l-7.14-12.37-2.39 4.13 8.34 14.43h19.05l7.14 12.37H71.29l2.38 4.12h11.9l-7.13 12.38h4.76l8.33-14.44-9.52-16.5 7.14-12.36 7.14 12.37 2.38-4.13-5.95-10.3H100v-4.13zm11.9 8.25.14.22v-.22zm-76.18 4.12-9.53 16.5H0v4.12h14.15l7.14 12.37H7l2.39 4.13h11.9l-7.14 12.37h4.76L27.24 139l-9.52-16.5 7.14-12.37 7.15 12.37 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM89.15 106l-2.38 4.13 8.33 14.43h4.9v-4.12h-.13l.13-.22v-8.26l-3.7 6.41zm-86.9 2.07L0 111.97v8.24l7-12.14zm57.14 8.24-9.52 16.5h-14.3l7.15-12.37h-4.76l-5.95 10.3-7.15-12.37-2.38 4.13 8.34 14.43h19.05l7.14 12.38H42.72l2.38 4.12h11.91l-7.14 12.37h4.76l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.39-4.12-5.96-10.31h14.29l-2.38-4.13zm-59.4 12.37v4.13h14.16l-2.38-4.13zm95.11 0-9.52 16.5H71.29l7.14-12.37h-4.75l-5.96 10.31-7.14-12.37-2.38 4.12 8.33 14.44h19.05l7.14 12.37H78.43l2.39 4.12h11.9l-4.27 7.4h4.76l5.46-9.46-9.52-16.5 7.14-12.37 3.7 6.42v-8.26l-.12-.23h.13v-4.13zM0 133.04v8.25l3.44 5.95 2.38-4.12zm30.82 8.02-9.53 16.5H7l7.15-12.38H9.39l-5.95 10.31L0 149.54v8.24l2.25 3.9h19.04l6.66 11.52h4.76l-7.85-13.58 7.15-12.38 7.14 12.38 2.38-4.13-5.95-10.3h14.29l-2.39-4.13zm65.47 2.06-2.38 4.12 6.09 10.55v-8.25zm-29.76 10.3-9.52 16.5H42.72l7.15-12.37H45.1l-5.95 10.32-7.14-12.38-2.38 4.13 7.84 13.58h23.81l-.7-1.21 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.32h14.29l-2.38-4.12zM2.25 165.8 0 169.7v3.5h2.73l.7-1.21.7 1.21H8.9L7 169.93h14.3l-2.39-4.13zm65.47 2.07-2.38 4.12.7 1.21h4.76zm32.28 1.82-2.03 3.51H100zm-19.18.24-1.9 3.27h4.77l1.89-3.27z"/></pattern>

                                    <pattern v-if="seriesIndex === 3" :id="patternId" width="58" height="100.23" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-linecap="square" d="m12.127 73.813.013 5.643 4.893-2.81zm-6.01-3.47 16.928 9.773-16.93 9.777zm-6.02-3.476 28.967 16.725L.13 100.262zm16.97 23.616-.015 5.643-4.893-2.81zm6.01-3.472L6.148 96.786l16.93 9.776zM.128 100.261l28.935 16.669m16.874-23.67-.013-5.644-4.894 2.81zm6.01 3.47L35.02 86.956l16.931-9.775zM29 83.482l28.936-16.669.032 33.393m-28.904 2.834 4.881-2.834-4.88-2.832zm0 6.94V90.433l16.932 9.773zm0 6.952v-33.45l28.904 16.724zM58 13.915l-4.882 2.833L58 19.582zm0-6.94v19.548l-16.932-9.774zm0-6.951v33.448L29.096 16.748m0-13.89 4.88-2.833-4.88-2.833zm0 6.94V-9.749L46.026.025zm0 6.95v-33.449L58 .024zM16.94 23.696l-4.894-2.81-.014 5.643zm6.01-3.47L6.02 29.998v-19.55zM0 33.472.033.08 28.97 16.75m-5.99-29.92L6.053-3.393l16.93 9.776zm5.99 29.92L29-16.644.033.08m40.966 23.615.013 5.643 4.893-2.81zm-6.01-3.47 16.928 9.774-16.93 9.775zm22.947 13.248L29 50.143l-.031-33.394M16.97 43.197l-.013-5.643-4.894 2.81zm6.01 3.47L6.053 36.894l16.93-9.776zM29 50.143.032 33.419l28.936-16.67m16.937 57.008-4.893-2.81-.014 5.644zm6.01-3.47L34.988 80.06V60.51zM29 64.035l-4.88 2.832L29 69.7zm0-6.942v19.549l-16.93-9.775zM.097 66.867 29 50.143v33.449m16.938-43.228-.013 5.644-4.894-2.811zm6.01-3.47L35.02 46.667l16.931 9.777zM29 50.143l28.936 16.67.032-33.394M.097 52.975l4.88-2.832-4.88-2.833zm0 6.942V40.368l16.931 9.775zm0 6.95V33.42"/></pattern>

                                    <pattern v-if="seriesIndex === 4" :id="patternId" width="40" height="69.282" patternTransform="scale(0.7)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" d="M13.333-3.849v23.094M6.667-15.396l20 11.547M13.333-19.245l20 11.547M20 0v23.094m20-34.641-6.667 3.849-6.666 3.849L20 0M0-11.547l6.667 3.849 6.666 3.849L20 0m0-23.094 20 11.547v23.094L20 23.094l-6.667-3.849-6.666-3.849L0 11.547v-23.094l6.667-3.849 6.666-3.849zM40-3.769 20 7.698m20-3.849-16.253 9.384L20 15.396M6.667-7.698v23.094m6.666 50.037v23.094M6.667 53.886l20 11.547M13.333 50.037l20 11.547M20 69.282v23.094m20-34.641-6.667 3.849-6.666 3.849L20 69.282M0 57.735l6.667 3.849 6.666 3.849L20 69.282m0-23.094 20 11.547v23.094L20 92.376l-6.667-3.849-6.666-3.849L0 80.829V57.735l6.667-3.849 6.666-3.849zm20 19.325L20 76.98m20-3.849L20 84.678M6.667 61.584v23.094m26.666-53.886v23.094m-6.666-34.641 20 11.547M33.333 15.396l20 11.547M40 34.641v23.094m20-34.641-6.667 3.849-6.666 3.849L40 34.641M20 23.094l6.667 3.849 6.666 3.849L40 34.641m0-23.094 20 11.547v23.094L40 57.735l-6.667-3.849-6.666-3.849L20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L40 42.339m20-3.849L40 50.037M26.667 26.943v23.094M-6.667 30.792v23.094m-6.666-34.641 20 11.547M-6.667 15.396l20 11.547M0 34.641v23.094m20-34.641-6.667 3.849-6.666 3.849L0 34.641m-20-11.547 6.667 3.849 6.666 3.849L0 34.641m0-23.094 20 11.547v23.094L0 57.735l-6.667-3.849-6.666-3.849L-20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L0 42.339m20-3.849L0 50.037m-13.333-23.094v23.094"/></pattern>

                                    <pattern v-if="seriesIndex === 5" :id="patternId" width="16.5" height="32.877" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" d="m-5 2 5 10L5 2zm16.5 0 5 10 5-10zM8.25 4.438l-5 10h10zm-5 14 5 10.001 5-10zM0 20.878l-5 10H5zm16.5 0-5 10h10z"/></pattern>

                                    <pattern v-if="seriesIndex === 6" :id="patternId" width="160" height="160" patternTransform="scale(0.3)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-width="2" d="M121.5 39.5V9.169c0-2.827 1.724-4.707 3.473-5.602l.707-.362c2.086-1.068 4.702-.631 6.359 1.026l1.985 1.985c1.349 1.349 3.235 2.018 5.14 2.128 12.336 0 12.336-18.505 0-18.505M40.75 39.499V9.17c0-2.827-1.724-4.707-3.473-5.602l-.707-.362c-2.086-1.068-4.702-.631-6.359 1.026l-1.985 1.985c-1.349 1.349-3.236 2.018-5.14 2.128-12.336 0-12.336-18.505 0-18.505m146.575 111.248c0-12.337-18.505-12.337-18.505 0 .11 1.904.78 3.79 2.128 5.139l1.985 1.985c1.657 1.657 2.094 4.273 1.026 6.36l-.362.706c-.895 1.75-2.775 3.474-5.602 3.474l-30.33-.001m49.66-63.086c0 12.336-18.505 12.336-18.505 0 .11-1.904.78-3.791 2.128-5.14l1.985-1.985c1.657-1.657 2.094-4.273 1.026-6.359l-.362-.707c-.895-1.749-2.775-3.474-5.602-3.473h-30.33m19.162 130.344c12.337 0 12.337-18.505 0-18.505-1.631 0-3.99.98-5.139 2.128l-1.985 1.985c-1.656 1.656-4.274 2.094-6.36 1.027l-.706-.362c-2.086-1.069-3.474-3.258-3.474-5.602v-34.302l.001-26.228c0-2.344-1.427-4.458-3.473-5.602l-.707-.361a5.83 5.83 0 0 0-6.36 1.026l-1.984 1.985c-1.144 1.152-3.508 2.128-5.14 2.128-12.336 0-12.336-18.505 0-18.505 1.904.11 3.715.86 5.14 2.128l1.985 1.985a5.81 5.81 0 0 0 6.359 1.026l.707-.362c1.287-1.485 3.473-2.775 3.473-5.602v-30.33M23.086 168.343c-12.336 0-12.336-18.505 0-18.505 1.632 0 3.992.98 5.14 2.128l1.985 1.985c1.656 1.656 4.274 2.094 6.359 1.027l.707-.362c2.086-1.069 3.474-3.258 3.474-5.602l-.001-34.302V88.485c0-2.344 1.387-4.533 3.473-5.602l.707-.361c2.085-1.068 4.703-.63 6.359 1.026l1.985 1.985c1.148 1.148 3.508 2.128 5.14 2.128 12.336 0 12.336-18.505 0-18.505-1.905.11-3.791.78-5.14 2.128l-1.985 1.985c-1.657 1.657-4.273 2.094-6.36 1.026l-.706-.362c-1.75-.895-3.474-2.775-3.474-5.602v-30.33m80.75 80.749H91.17c-2.827 0-4.707 1.724-5.602 3.473l-.362.707c-1.068 2.086-.631 4.702 1.026 6.359l1.985 1.985c1.349 1.349 2.018 3.236 2.128 5.14 0 12.336-18.505 12.336-18.505 0 0-1.632.98-3.992 2.128-5.14l1.985-1.985c1.656-1.656 2.094-4.274 1.026-6.359l-.361-.707c-1.069-2.086-3.258-3.474-5.602-3.473h-60.53c-2.344 0-4.533-1.387-5.602-3.473l-.362-.707c-1.067-2.085-.63-4.703 1.027-6.359l1.985-1.985c1.148-1.148 2.128-3.508 2.128-5.14 0-12.336-18.505-12.336-18.505 0M121.5 38H91.169c-2.827 0-4.707-1.724-5.602-3.473l-.362-.707c-1.068-2.086-.631-4.702 1.026-6.359l1.985-1.985c1.349-1.349 2.018-3.235 2.128-5.14C90.344 8 71.84 8 71.84 20.337c0 1.632.977 3.994 2.128 5.14.663.66 1.343 1.305 1.985 1.985 1.608 1.703 2.003 4.23 1.026 6.36q-.167.359-.361.706C75.48 36.577 73.359 38 71.015 38h-60.53c-2.344 0-4.533 1.387-5.602 3.473l-.362.707c-1.067 2.085-.63 4.703 1.027 6.36l1.985 1.984c1.148 1.148 2.128 3.508 2.128 5.14C9.66 68-8.844 68-8.844 55.664"/></pattern>

                                    <pattern v-if="seriesIndex === 7" :id="patternId" width="100" height="100" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A" d="M0 0v1l1-1zm6.29 0-.147.143 11.81 11.619 8.19-8.143L22.666.047 22.709 0h-1.998l-.045.047 3.477 3.572-6.19 6.143L8.238.192 8.434 0H6.289zm6.759 0 1.047 1.047L15.143 0zm14.474 0 7.143 7.143-2.428 2.523-3.43-3.523-4.855 4.572 8.238 8.142L43.857 7.143 36.686 0h-2.008l7.226 7.191-9.666 9.713L26 10.762l2.762-2.57 3.476 3.617 4.477-4.618L29.572.047 29.62 0h-2.096zm14.288 0 4.808 4.809 4.572-4.57L50.953 0h-2.047l.285.285-2.572 2.572L43.762 0zm14.068 0-17.64 17.904 4.57 4.62L65 .333 64.697 0H62.79l.258.285-20.19 20.192-2.572-2.573L57.857 0H55.88zm14.549 0-3.62 3.62 8.145 8.142L86.666.047 86.619 0h-1.951l.047.047L75 9.762l-6.143-6.143 2.57-2.572L75 4.619 79.62 0h-2.048l-2.619 2.62L72.334 0zm21.43 0-3.62 3.62 4.57 4.571L100 .998V0h-.953l-6.19 6.191-2.572-2.572L93.905 0h-2.048zm-88 2.191L0 6.091v2.04l3.762-3.846 2.666 3.049-6.381 6.19-.047-.05v2.098l8.38-8.095L3.858 2.19zM100 6.091l-4.572 4.624L100 15.572v-2.097l-2.572-2.713L100 8.13V6.09zm-35.762.1-4.572 4.57 4.572 4.573 4.57-4.572-4.57-4.57zm21.428 0L74.953 16.904l-3.572-3.57-4.572 4.57 8.144 8.143 15.285-15.285-4.572-4.57zm-21.428 2 2.57 2.57-2.57 2.573-2.572-2.572zm21.477 0 2.57 2.57L75 24.048l-6.143-6.143 2.57-2.57L75 18.904zM10.666 10 0 20.668v2L10.666 12l2.572 2.572L0 27.811v2l15.238-15.239zm46.43 3.334L42.809 27.619l-7.381-7.38-8.143 8.142 4.572 4.572 3.57-3.572 2.811 2.81-6.142 6.143L21.38 27.619l-4.572 4.572 15.287 15.286 25-25L67.809 33.19l4.572-4.572-15.285-15.285zm35.713.238-4.57 4.57 11.714 11.715.047-.046v-1.954l-9.715-9.714 2.572-2.57L100 22.714v-2.047l-.047.047-7.144-7.143zm-71.143.094-12 11.38 4.572 4.669 7.334-7.238 3.381 3.57 4.62-4.62zm35.43 1.62L70.38 28.571l-2.572 2.57-10.713-10.714-25 25-13.287-13.285 2.572-2.57 10.715 10.712 8.142-8.142-4.81-4.809-3.57 3.57-2.573-2.57 6.143-6.143 7.38 7.381 14.288-14.287zm-35.477.429 5.904 5.762L25 24l-3.38-3.523-7.335 7.285-2.57-2.62zm64.047 4.762-4.57 4.57L96.38 40.334l3.619-3.62V34.81zm.049 2L99 35.762l-2.572 2.572-13.285-13.287zm-6.953 4.904L67.809 38.334l-3.57-3.572-4.573 4.572 8.143 8.143 15.525-15.524zm-71.666.238-4.573 4.572L17.81 47.477l4.572-4.573L7.096 27.62zm50 0L45.38 39.334l4.572 4.57 11.713-11.713zm21.713 1.762 2.572 2.572-13.524 13.524-6.142-6.143 2.57-2.572 3.572 3.572L78.81 29.381zm-71.713.238L20.38 42.904l-2.572 2.573L4.523 32.19l2.573-2.572zm50 0 2.57 2.572-9.713 9.713-2.572-2.57zm28.57 5.143-4.57 4.572 11.713 11.713 4.572-4.57zM0 34.809v1.906l.953-.953zm85.715 1.953 9.713 9.715-2.57 2.57-9.715-9.713zm-82.192 1.81L0 41.877v2.08l2.523 2.424L0 48.973v2.12l7.096 7.098 8.142-8.144zm0 1.951L13.238 50l-6.142 6.143L.953 50l3.57-3.715L1 42.857zM100 41.877l-1.096 1.027L100 43.957zm-57.191.027-4.57 4.573 4.57 4.57 4.572-4.57zm14.287 0L45.38 53.62l4.572 4.572 7.143-7.144 10.713 10.715 4.572-4.57zm21.476 0-8.144 8.143L75 54.619l3.572-3.572 7.143 7.144 4.57-4.572zm-35.763 2 2.572 2.573-2.572 2.57-2.57-2.57zm14.287 0L70.38 57.191l-2.572 2.57-10.713-10.714-7.143 7.144-2.572-2.572 9.715-9.715zm21.476 0 9.713 9.715-2.57 2.572-7.143-7.144L75 52.619l-2.572-2.572zm-53.619 1.573L9.666 60.762l4.572 4.572 15.285-15.287zm0 2 2.57 2.57-13.285 13.287-2.572-2.572zM100 48.973l-1.047 1.074L100 51.094zm-64.334.074-4.57 4.572 18.857 18.858 11.713-11.715-4.57-4.57-7.143 7.142zm0 2 14.287 14.287 7.143-7.143 2.57 2.57-9.713 9.716-16.857-16.858zm60.953 1.81-4.572 4.57L100 65.382v-2.049l-5.904-5.904 2.57-2.57L100 58.19v-1.953l-3.38-3.38zm-68.096 3.334L9.666 75.047l4.572 4.572 7.143-7.142 7.142 7.142 4.573-4.572-7.143-7.143 2.57-2.57 7.143 7.143 4.572-4.573zm50 0-8.142 8.143 8.142 8.143 4.573-4.573-3.573-3.57 3.573-3.572zM0 56.238v2l9.666 9.666-2.57 2.573L0 63.38v2l7.096 7.096 4.57-4.573zm28.523 1.905 9.715 9.714-2.572 2.57-7.143-7.142-4.57 4.572L31.096 75l-2.573 2.572-7.142-7.144-7.143 7.144L11.666 75zm50 .048 2.573 2.57-3.573 3.573 3.573 3.57-2.573 2.573-6.142-6.143zm10.715 1.57-4.572 4.573 3.572 3.57-6.904 6.905 4.57 4.572 11.477-11.477zm.047 2 6.143 6.143-9.475 9.477-2.572-2.572 6.904-6.905-3.57-3.57zm-25.047 1.573-8.142 8.143 4.57 4.57 8.143-8.143-4.57-4.57zm0 2 2.57 2.57-6.142 6.143-2.57-2.57zm-21.43 5.143L28.524 84.762l-7.142-7.143-4.572 4.57 11.714 11.715 18.858-18.857-4.572-4.57zm28.573 0-4.572 4.57 11.714 11.715 4.573-4.573L71.38 70.477zm28.572 0L88.238 82.189l4.57 4.43 7.145-7 .047.047v-2.094l-7.143 7.047-2.572-2.476L100 72.428v-1.905zM0 70.523v1.952l16.809 16.81-2.57 2.572-3.573-3.572-7.143 7.143L0 91.904v2.05l3.523 3.523 7.143-7.143 3.572 3.57 4.57-4.57L0 70.524zm42.809 1.954 2.572 2.57-16.858 16.857-9.714-9.715 2.572-2.57 7.142 7.143L42.81 72.477zm28.572 0 9.715 9.712-2.573 2.573-9.714-9.715zm-17.858 1.57-4.57 4.572 4.57 4.57 4.573-4.57zm0 2 2.573 2.572-2.573 2.57-2.57-2.57zM0 77.619v2.047l6.096 6.096-2.573 2.666L0 84.81v1.953l3.523 3.664 4.573-4.713zm64.238 0L53.523 88.334l-7.142-7.145-4.572 4.573 11.714 11.715L68.81 82.189l-4.57-4.57zm0 2 2.57 2.57-13.285 13.288-9.714-9.715 2.572-2.573 7.142 7.145zm7.143 5.143-8.143 8.142 4.57 4.573 3.573-3.573 3.572 3.573 4.57-4.573zm14.285 0-4.57 4.572L89 97.238l4.572-4.572zm14.287 0-4.572 4.572 4.619 4.62v-2.097l-2.572-2.572 2.572-2.57V84.81l-.047-.05zm-28.525 1.953 6.144 6.142L75 95.427l-3.572-3.57-3.57 3.57-2.573-2.57zm14.287.047 5.904 5.904-2.572 2.572-5.904-5.904zm-46.477 1.572-4.572 4.57L41.762 100h2l-7.096-7.096 2.572-2.57L48.906 100h2zm-18.095 3.57-7.096 7.143-3.332-3.332L6.289 100h2.143l2.33-2.285L13.049 100h2.094l6.095-6.096L24 96.524 20.71 100h1.999L26 96.428zm75.476 3.334L91.857 100h2.047l2.762-2.762 2.572 2.57-.191.192H100v-1.38l-3.38-3.382zm-36.142.096L55.879 100h1.978l2.57-2.62L62.79 100h1.908zm-28.381.094L27.523 100h2.096l2.524-2.523L34.678 100h2.008zm50 .049L77.572 100h2.047l2.524-2.523L84.668 100h1.951zM0 98.617V100h1l.191-.191zm71.38.43-.952.953h1.906l-.953-.953z"/></pattern>

                                    <pattern v-if="seriesIndex === 8" :id="patternId" width="79.508" height="40" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A" d="M0 0v.685c5.16 0 10.01 2.01 13.657 5.658.384.383.74.787 1.086 1.197a41 41 0 0 0-1.877 1.546c.185-.16.367-.324.554-.481C10.19 4.803 5.38 2.385 0 2.385v1.639c4.877 0 9.245 2.203 12.177 5.659.153-.139.313-.27.468-.406a41.2 41.2 0 0 0-6.769 7.675c.204-.299.403-.6.614-.893A7.59 7.59 0 0 0 0 12.399v1.64c2.427 0 4.511 1.462 5.44 3.548.11-.168.228-.33.34-.496a41 41 0 0 0-1.368 2.165c.231.025.46.06.69.088a41 41 0 0 0-1.846-.187c.305.022.61.039.913.07-.365-1.983-2.081-3.49-4.169-3.49v1.64c1.129 0 2.094.717 2.463 1.72q.033.001.068.005A42 42 0 0 0 0 19.016v1.64c5.312 0 10.464 1.04 15.314 3.091A39.2 39.2 0 0 1 27.82 32.18a39.4 39.4 0 0 1 5.756 7.301 41 41 0 0 1 1.766-.224 41 41 0 0 0-1.373-2.172c.113.168.233.332.345.502.93-2.085 3.013-3.547 5.44-3.547 2.426 0 4.51 1.462 5.44 3.547.112-.17.232-.334.345-.502a41 41 0 0 0-1.373 2.172 43 43 0 0 1 1.766.224 39.4 39.4 0 0 1 5.756-7.3 39.22 39.22 0 0 1 27.82-11.524v-1.64a42 42 0 0 0-2.649.09l.199-.016a2.62 2.62 0 0 1 2.45-1.713v-1.64c-2.085 0-3.784 1.51-4.151 3.487.344-.034.692-.056 1.039-.082q-1.002.077-1.99.202c.23-.028.459-.063.69-.088a41 41 0 0 0-1.368-2.165c.112.166.23.328.34.496.929-2.086 3.013-3.548 5.44-3.548V12.4a7.59 7.59 0 0 0-6.49 3.66c.211.293.41.594.614.893a41.2 41.2 0 0 0-6.769-7.675c.156.136.315.267.468.406 2.932-3.456 7.3-5.66 12.177-5.66V2.385c-5.38 0-10.189 2.42-13.42 6.22.187.158.369.322.554.482a41 41 0 0 0-1.877-1.546c.347-.41.702-.814 1.086-1.197A19.2 19.2 0 0 1 79.508.685V0H73.34a20.97 20.97 0 0 0-9.903 6.563c.343.243.679.496 1.014.749a41 41 0 0 0-6.108-3.833c.261.133.525.262.782.4a26 26 0 0 1 2.005-2.257A27 27 0 0 1 62.917 0h-2.405c-1.026.975-2.004 1.998-2.87 3.12.096.046.19.099.287.147a41 41 0 0 0-2.005-.926l.126.052A30 30 0 0 1 58.081 0h-2.148c-.49.578-.997 1.144-1.445 1.757.2.078.397.163.597.243-.743-.3-1.495-.584-2.26-.841.282-.398.596-.773.894-1.159h-2.065c-.155.216-.32.425-.47.644q.812.236 1.608.504A41 41 0 0 0 48.66.005c.262.06.527.112.787.175.041-.062.091-.118.133-.18H29.928c.042.062.092.118.133.18.255-.061.513-.113.77-.171q-2.09.464-4.096 1.133a41 41 0 0 1 1.589-.498c-.15-.22-.315-.428-.47-.644h-2.065c.298.386.612.761.893 1.159-.762.256-1.51.539-2.252.838.197-.079.391-.163.59-.24-.45-.613-.955-1.179-1.446-1.757h-2.147a30 30 0 0 1 2.03 2.393q.061-.024.121-.05-1.01.434-1.993.92c.095-.046.187-.098.282-.144C21 2 20.022.975 18.997 0H16.59a27 27 0 0 1 1.787 1.622 26 26 0 0 1 2.005 2.257c.255-.137.515-.264.773-.396a41 41 0 0 0-6.097 3.827c.335-.252.67-.504 1.012-.747A20.97 20.97 0 0 0 6.168 0Zm10.659 0a22.7 22.7 0 0 1 6.827 5.601q.689-.449 1.396-.87c-1.475-1.82-3.226-3.4-5.16-4.731Zm55.127 0c-1.934 1.332-3.686 2.91-5.16 4.732q.707.42 1.396.87A22.7 22.7 0 0 1 68.849 0ZM39.754.656c5.312 0 10.464 1.04 15.314 3.091a39.2 39.2 0 0 1 12.506 8.432 39.4 39.4 0 0 1 5.756 7.302c.117-.018.237-.029.354-.045a41 41 0 0 0-2.215.375l.046-.01C64.832 9.316 53.11 2.355 39.754 2.355S14.676 9.316 7.994 19.802l.044.01a41 41 0 0 0-2.213-.376c.117.016.236.027.353.045a39.4 39.4 0 0 1 5.756-7.302A39.22 39.22 0 0 1 39.754.656m0 3.338a35.9 35.9 0 0 1 25.46 10.546 36 36 0 0 1 4.6 5.64c.266-.065.535-.118.802-.178a41 41 0 0 0-4.18 1.156 42 42 0 0 0-2.271.846c.203-.081.404-.168.608-.247-5.632-7.712-14.738-12.725-25.019-12.725s-19.387 5.013-25.02 12.725c.207.08.409.167.614.25a40.6 40.6 0 0 0-6.443-2.002c.262.059.527.112.788.175a36 36 0 0 1 4.601-5.64 35.9 35.9 0 0 1 25.46-10.546m26.682 17.164a42 42 0 0 1 1.642-.514c-6.18-9.026-16.559-14.951-28.324-14.951s-22.143 5.925-28.323 14.951q.828.24 1.64.514a33 33 0 0 1 3.583-4.258 32.56 32.56 0 0 1 23.1-9.568 32.56 32.56 0 0 1 23.1 9.568 33 33 0 0 1 3.582 4.258M79.508 5.723c-4.4 0-8.333 1.994-10.952 5.124q.588.582 1.153 1.187c2.319-2.848 5.849-4.672 9.799-4.672zM0 5.723v1.64c3.95 0 7.48 1.823 9.8 4.67q.564-.604 1.152-1.186A14.24 14.24 0 0 0 0 5.723m0 3.338v1.64c3.123 0 5.886 1.552 7.573 3.92a43 43 0 0 1 1.074-1.303c-2-2.585-5.125-4.257-8.647-4.257m79.508 0c-3.522 0-6.647 1.672-8.647 4.257q.55.64 1.074 1.304c1.687-2.369 4.45-3.922 7.573-3.922zm-39.754 1.61c7.834 0 15.2 3.05 20.739 8.59a30 30 0 0 1 2.718 3.132l.13-.053q-1.02.438-2.01.928c.097-.049.192-.102.29-.15-5.054-6.535-12.966-10.749-21.867-10.749-8.9 0-16.813 4.214-21.867 10.75.098.047.193.1.29.149a41 41 0 0 0-2.01-.928l.13.053a30 30 0 0 1 2.718-3.132c5.54-5.54 12.905-8.59 20.739-8.59m0 3.338c6.943 0 13.47 2.704 18.378 7.613a26 26 0 0 1 2.005 2.257c.259-.14.524-.269.786-.403a41 41 0 0 0-6.131 3.85q.51-.389 1.032-.763c-3.843-4.592-9.613-7.517-16.07-7.517s-12.226 2.925-16.07 7.517c.35.248.691.505 1.032.763a41 41 0 0 0-6.13-3.85c.261.134.526.264.785.403a26 26 0 0 1 2.005-2.257c4.909-4.91 11.435-7.613 18.378-7.613m0 1.699c-7.63 0-14.43 3.523-18.883 9.023q.708.422 1.397.87.691-.84 1.468-1.62a22.5 22.5 0 0 1 16.018-6.634c6.05 0 11.74 2.356 16.018 6.635a23 23 0 0 1 1.469 1.619q.689-.448 1.395-.87c-4.454-5.5-11.253-9.023-18.882-9.023m0 4.977c5.16 0 10.01 2.01 13.657 5.657.384.384.74.788 1.086 1.197a41 41 0 0 0-1.89 1.558c.19-.164.375-.331.567-.492-3.231-3.802-8.04-6.22-13.42-6.22-5.378 0-10.186 2.417-13.417 6.216.211.178.416.363.624.545a41 41 0 0 0-1.95-1.607c.347-.409.702-.813 1.086-1.197a19.2 19.2 0 0 1 13.657-5.657M0 22.355v1.639A35.89 35.89 0 0 1 29.929 40h.94l.288-.064c-.085.018-.166.045-.25.064H48.6c-.084-.019-.164-.046-.249-.064q.144.03.288.064h.94a35.89 35.89 0 0 1 29.929-16.006v-1.64h-.001c-13.356 0-25.078 6.962-31.76 17.448l.098.022a41 41 0 0 0-3.94-.598c-.367-1.979-2.067-3.488-4.152-3.488s-3.785 1.51-4.151 3.488a41 41 0 0 0-3.942.598l.1-.022C25.077 29.316 13.355 22.355 0 22.354Zm39.754 1.669c4.877 0 9.244 2.202 12.177 5.659.156-.142.318-.275.477-.413a41.2 41.2 0 0 0-6.785 7.692c.206-.302.407-.607.62-.904a7.59 7.59 0 0 0-6.489-3.659 7.59 7.59 0 0 0-6.49 3.66c.214.296.415.601.621.903a41.2 41.2 0 0 0-6.815-7.721c.168.148.34.29.507.442 2.932-3.457 7.3-5.66 12.177-5.66zM0 25.693V27.6c.234 0 .465-.014.694-.034.02-.066.045-.13.067-.196 4.14.094 8.161.924 11.954 2.529A32.6 32.6 0 0 1 23.1 36.9c.975.976 1.854 2.022 2.689 3.1h2.065C21.626 31.342 11.479 25.693 0 25.693m79.508 0c-11.479 0-21.626 5.65-27.854 14.307h2.065c.835-1.078 1.714-2.124 2.69-3.1 3-3 6.494-5.356 10.384-7 3.793-1.605 7.814-2.436 11.954-2.53l.068.196c.228.02.459.034.693.034zm-39.754.03c-4.4 0-8.333 1.994-10.952 5.124a43 43 0 0 1 1.153 1.186c2.32-2.847 5.849-4.671 9.799-4.671s7.48 1.824 9.8 4.671q.564-.604 1.152-1.186a14.24 14.24 0 0 0-10.952-5.124M0 29.03v1.64c7.834 0 15.2 3.05 20.739 8.59.24.24.458.493.688.739h2.148C17.895 33.31 9.463 29.031 0 29.031Zm79.508 0c-9.463 0-17.895 4.28-23.575 10.969h2.148c.23-.246.449-.5.688-.74 5.54-5.539 12.905-8.59 20.739-8.59zm-39.754.03c-3.522 0-6.647 1.672-8.647 4.257q.55.64 1.075 1.304c1.687-2.369 4.449-3.921 7.572-3.921s5.885 1.552 7.573 3.92a42 42 0 0 1 1.074-1.303c-2-2.585-5.125-4.257-8.647-4.257M0 32.37v1.64c6.132 0 11.936 2.116 16.59 5.991h2.407C14.043 35.29 7.375 32.37 0 32.37m79.508 0c-7.374 0-14.043 2.922-18.996 7.631h2.405c4.655-3.875 10.459-5.991 16.591-5.991ZM0 35.709v1.639c3.78 0 7.418.92 10.66 2.653h3.062C9.815 37.31 5.102 35.708 0 35.708Zm79.508 0c-5.103 0-9.815 1.602-13.722 4.292h3.062a22.54 22.54 0 0 1 10.66-2.653zm-39.754 1.67c1.144 0 2.108.74 2.466 1.763-.82-.049-1.633-.125-2.466-.125s-1.646.076-2.466.125a2.62 2.62 0 0 1 2.466-1.764zM0 39.045V40h6.168A20.9 20.9 0 0 0 0 39.046Zm79.508 0a20.9 20.9 0 0 0-6.168.954h6.168z"/></pattern>

                                    <pattern v-if="seriesIndex === 9" :id="patternId" width="30" height="30" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" d="M9 20.502A7.5 7.5 0 0 1 1.5 28 7.5 7.5 0 0 0-6 35.5a7.5 7.5 0 0 1-7.5 7.499 7.48 7.48 0 0 1-5.304-2.196A7.48 7.48 0 0 1-21 35.5a7.5 7.5 0 0 1 7.5-7.5A7.5 7.5 0 0 0-6 20.502a7.5 7.5 0 1 1 15 0zm15 0A7.5 7.5 0 0 1 16.5 28a7.48 7.48 0 0 1-5.304-2.196A7.48 7.48 0 0 1 9 20.502c0-2.072-.84-3.947-2.197-5.303A7.48 7.48 0 0 0 1.5 13.002a7.48 7.48 0 0 1-5.304-2.196A7.48 7.48 0 0 1-6 5.503a7.5 7.5 0 1 1 15 0c0 2.07.84 3.945 2.196 5.303a7.48 7.48 0 0 0 5.304 2.196c2.07 0 3.945.84 5.303 2.197A7.47 7.47 0 0 1 24 20.502zm15 0A7.5 7.5 0 0 1 31.5 28a7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 1-7.5 7.499 7.48 7.48 0 0 1-5.304-2.196A7.48 7.48 0 0 1 9 35.5a7.5 7.5 0 0 1 7.5-7.5 7.5 7.5 0 0 0 7.5-7.498 7.5 7.5 0 1 1 15 0zm0-30A7.5 7.5 0 0 1 31.5-2 7.5 7.5 0 0 0 24 5.5a7.5 7.5 0 0 1-7.5 7.499 7.48 7.48 0 0 1-5.304-2.196A7.48 7.48 0 0 1 9 5.5 7.5 7.5 0 0 1 16.5-2 7.5 7.5 0 0 0 24-9.498a7.5 7.5 0 1 1 15 0zm-22.5 37.5a7.5 7.5 0 0 0-7.5 7.5c0-2.072-.84-3.947-2.197-5.303A7.48 7.48 0 0 0 1.5 28.002 7.5 7.5 0 0 0 9 20.503c0 2.07.84 3.945 2.196 5.303a7.48 7.48 0 0 0 5.304 2.196zm15-15a7.5 7.5 0 0 0-7.5 7.5c0-2.072-.84-3.947-2.197-5.303a7.48 7.48 0 0 0-5.303-2.197A7.5 7.5 0 0 0 24 5.503c0 2.07.84 3.945 2.196 5.303a7.48 7.48 0 0 0 5.304 2.196z"/></pattern>
                                </template>
                            </VueDataUi>
                        </div>
                    </template>
                    <template #fallback>
                        <BaseSpinner/>
                    </template>
                </Suspense>
            </div>
        </div>
        <Rater :key="`rater_${raterStep}`" v-if="selectedType && selectedType.raterId" :itemId="selectedType.raterId" />
    </div>
</template>

<style>
.example-wrapper .vue-ui-treemap-cell {
    padding-left: 12px;
    padding-top: 6px;
}

.bg-pattern-dark {
    background-image: radial-gradient(#FFFFFF20 2px, transparent 2px);
    background-size: 24px 24px;
    background-color: transparent;
}

.bg-pattern {
    background-image: radial-gradient(#CCCCCC 2px, transparent 2px);
    background-size: 24px 24px;
    background-color: transparent;
}
</style>