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

const { examples } = useExamples()
const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode); 
const router = useRouter();
const route = useRoute();
const translations = computed(() => store.translations);

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
}

const categories = computed(() => {
    return  [
        { 
            link: 'vue-ui-xy', 
            icon: 'chartLine', 
            component: 'VueUiXy',
            thumb: new URL('../assets/thumb_xy.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_xy_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.xy
        },
        { 
            link: 'vue-ui-donut', 
            icon: 'chartDonut', 
            component: 'VueUiDonut',
            thumb: new URL('../assets/thumb_donut.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_donut_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.donut
        },
        {
            link: 'vue-ui-sparkline',
            icon: 'chartSparkline',
            component: 'VueUiSparkline',
            thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.sparkline
        },
        {
            link: 'vue-ui-stackbar',
            icon: 'chartStackbar',
            component: 'VueUiStackbar',
            thumb: new URL('../assets/thumb_stack_bar.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_stack_bar_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.stackbar
        },
        { 
            link: 'vue-ui-nested-donuts', 
            icon: 'chartNestedDonuts', 
            component: 'VueUiNestedDonuts',
            thumb: new URL('../assets/thumb_nested_donuts.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.nestedDonuts
        },
        {
            link: 'vue-ui-waffle',
            icon: 'chartWaffle',
            component: 'VueUiWaffle',
            thumb: new URL('../assets/thumb_waffle.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_waffle_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.waffle
        },
        {
            link: 'vue-ui-vertical-bar',
            icon: 'chartVerticalBar',
            component: 'VueUiVerticalBar',
            thumb: new URL('../assets/thumb_vertical_bar.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.verticalBar
        },
        {
            link: 'vue-ui-heatmap',
            icon: 'chartHeatmap',
            component: 'VueUiHeatmap',
            thumb: new URL('../assets/thumb_heatmap.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.heatmap
        },
        {
            link: 'vue-ui-gauge',
            icon: 'chartGauge',
            component: 'VueUiGauge',
            thumb: new URL('../assets/thumb_gauge.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_gauge_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.gauge
        },
        {
            link: 'vue-ui-onion',
            icon: 'chartOnion',
            component: 'VueUiOnion',
            thumb: new URL('../assets/thumb_onion.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_onion_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.onion
        },
        {
            link: 'vue-ui-word-cloud',
            icon: 'chartWordCloud',
            component: 'VueUiWordCloud',
            thumb: new URL('../assets/thumb_word_cloud.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_word_cloud_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.wordCloud
        },
        {
            link: "vue-ui-scatter",
            icon: 'chartScatter',
            component: 'VueUiScatter',
            thumb: new URL('../assets/thumb_scatter.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_scatter_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.scatter
        },
        {
            link: 'vue-ui-wheel',
            icon: 'chartWheel',
            component: 'VueUiWheel',
            thumb: new URL('../assets/thumb_wheel.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_wheel_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.wheel
        },
        {
            link: 'vue-ui-sparkhistogram',
            icon: 'chartSparkHistogram',
            component: 'VueUiSparkHistogram',
            thumb: new URL('../assets/thumb_histogram.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_histogram_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.histogram
        },
        {
            link: 'vue-ui-quadrant',
            icon: 'chartQuadrant',
            component: 'VueUiQuadrant',
            thumb: new URL('../assets/thumb_quadrant.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.quadrant
        },
        {
            link: 'vue-ui-radar',
            icon: 'chartRadar',
            component: 'VueUiRadar',
            thumb: new URL('../assets/thumb_radar.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_radar_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.radar
        },
        {
            link: 'vue-ui-strip-plot',
            icon: 'chartStripPlot',
            component: 'VueUiStripPlot',
            thumb: new URL('../assets/thumb_strip_plot.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_strip_plot_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.stripPlot
        },
        {
            link: 'vue-ui-bullet',
            icon: 'chartBullet',
            component: 'VueUiBullet',
            thumb: new URL('../assets/thumb_bullet.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_bullet_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.bullet
        },
        {
            link: 'vue-ui-funnel',
            icon: 'chartFunnel',
            component: 'VueUiFunnel',
            thumb: new URL('../assets/thumb_funnel.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_funnel_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.funnel
        },
        {
            link: 'vue-ui-treemap',
            icon: 'chartTreemap',
            component: 'VueUiTreemap',
            thumb: new URL('../assets/thumb_treemap.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_treemap_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.treemap
        },
        {
            link: 'vue-ui-history-plot',
            icon: 'chartHistoryPlot',
            component: 'VueUiHistoryPlot',
            thumb: new URL('../assets/thumb_history_plot.png', import.meta.url).href,
            thumbLight: new URL('../assets/thumb_history_plot_light.png', import.meta.url).href,
            description: translations.value.docs.tooltips.historyPlot
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
                            <div class="text-xs px-2 py-0.5 border border-app-green bg-[#42d392] text-black rounded-full">
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
                                    <div v-if="example.component === 'VueUiXy' && plot.value === 140" class="text-black dark:text-[#CCCCCC] w-full flex flex-col place-items-center text-xl bg-[#FFFFFF] dark:bg-[#4A4A4A] py-2 rounded shadow-md border border-app-green">
                                        <VueUiIcon name="smiley" stroke="#42d392" :size="30"/>
                                        {{ plot.comment }}
                                    </div>
                                    <div v-else-if="example.component === 'VueUiXy' && plot.value === 12" class="text-black dark:text-[#CCCCCC] w-full flex flex-col place-items-center text-xl bg-[#FFFFFF] dark:bg-[#4A4A4A] py-2 rounded shadow-md border border-app-orange">
                                        <VueUiIcon name="moodFlat" stroke="#FF6600" :size="30"/>
                                        {{ plot.comment }}
                                    </div>
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
                                    <pattern :id="patternId" width="50.222" height="29.003" patternTransform="scale(2)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" :stroke="isDarkMode ? '#FFFFFF20' : '#CCCCCC'" stroke-linecap="square" d="M58.592-14.503h-16.74m6.277 3.627H56.5l4.188 7.25h-8.373zM60.686 3.623l-4.187 7.25h-8.372l4.187-7.25zM41.852-7.252l4.185 7.25-4.185 7.252L37.666 0zm25.11 7.25L58.593 14.5h-16.74L33.481-.001l8.371-14.501m16.74-.001 8.37 14.502m0 0h-16.74v0m-8.37-14.501L50.222 0l-8.37 14.503M8.371-14.502H-8.37m6.276 3.627h8.371l4.188 7.25H2.093zM10.464 3.624l-4.186 7.25h-8.373l4.187-7.25zM-8.37-7.251-4.185 0-8.37 7.252-12.556 0zM16.74 0 8.37 14.502H-8.37L-16.742 0l8.371-14.501m16.74-.001L16.741-.001m0 0H.001v0m-8.37-14.501L0 0l-8.37 14.503m6.275 3.625h8.372l4.187 7.25H2.093zm12.558 14.499-4.187 7.25h-8.372l4.187-7.25zM-8.371 21.752l4.185 7.25-4.185 7.252-4.185-7.251zm25.112 7.25L8.37 43.504H-8.37l-8.371-14.502 8.37-14.501M8.37 14.5l8.372 14.502m0 0H0v0m-8.37-14.5L0 29.003l-8.37 14.503m56.5-25.379 8.371.001 4.188 7.25h-8.373zm12.557 14.5L56.5 39.876l-8.372.001 4.187-7.25zM41.852 21.751l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74l-8.372-14.5M58.59 14.5l8.372 14.503m0 0h-16.74v0m-8.371-14.501 8.37 14.501-8.37 14.503M33.482 0h-16.74m6.276 3.627 8.371.001 4.188 7.25h-8.373zm12.557 14.5-4.187 7.249-8.372.001 4.187-7.25zM16.741 7.25l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74M41.851 14.5h-16.74v0M16.742 0l8.37 14.502-8.37 14.503"/></pattern>
                                </template>

                                <template #pattern="{ seriesIndex, patternId }" v-if="example.multiPattern">
                                    <pattern v-if="seriesIndex === 0" :id="patternId" width="50.222" height="29.003" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-linecap="square" d="M58.592-14.503h-16.74m6.277 3.627H56.5l4.188 7.25h-8.373zM60.686 3.623l-4.187 7.25h-8.372l4.187-7.25zM41.852-7.252l4.185 7.25-4.185 7.252L37.666 0zm25.11 7.25L58.593 14.5h-16.74L33.481-.001l8.371-14.501m16.74-.001 8.37 14.502m0 0h-16.74v0m-8.37-14.501L50.222 0l-8.37 14.503M8.371-14.502H-8.37m6.276 3.627h8.371l4.188 7.25H2.093zM10.464 3.624l-4.186 7.25h-8.373l4.187-7.25zM-8.37-7.251-4.185 0-8.37 7.252-12.556 0zM16.74 0 8.37 14.502H-8.37L-16.742 0l8.371-14.501m16.74-.001L16.741-.001m0 0H.001v0m-8.37-14.501L0 0l-8.37 14.503m6.275 3.625h8.372l4.187 7.25H2.093zm12.558 14.499-4.187 7.25h-8.372l4.187-7.25zM-8.371 21.752l4.185 7.25-4.185 7.252-4.185-7.251zm25.112 7.25L8.37 43.504H-8.37l-8.371-14.502 8.37-14.501M8.37 14.5l8.372 14.502m0 0H0v0m-8.37-14.5L0 29.003l-8.37 14.503m56.5-25.379 8.371.001 4.188 7.25h-8.373zm12.557 14.5L56.5 39.876l-8.372.001 4.187-7.25zM41.852 21.751l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74l-8.372-14.5M58.59 14.5l8.372 14.503m0 0h-16.74v0m-8.371-14.501 8.37 14.501-8.37 14.503M33.482 0h-16.74m6.276 3.627 8.371.001 4.188 7.25h-8.373zm12.557 14.5-4.187 7.249-8.372.001 4.187-7.25zM16.741 7.25l4.185 7.25-4.185 7.252-4.186-7.252zm25.11 7.25-8.37 14.502h-16.74M41.851 14.5h-16.74v0M16.742 0l8.37 14.502-8.37 14.503"/></pattern>

                                    <pattern v-if="seriesIndex === 1" :id="patternId" width="23.07" height="40" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-linecap="square" d="m17.62 0-6.07 10.5m2.74 4.76L8.22 4.75m-5.48 0h12.13M.01 0h23.07M6.07 20 0 9.5m2.74-4.75-6.07 10.5m-5.48 0H3.33m8.2 4.75L0 .02-11.54 20m40.68 0L23.07 9.5m2.74-4.75-6.06 10.5m-5.49 0H26.4M34.6 20 23.08.02 11.53 20m-5.46 0L0 30.51m2.74 4.75-6.07-10.5m-5.48 0H3.33m8.2-4.75L0 40l-11.54-19.98zM17.6 40l-6.06-10.5m2.74-4.76L8.2 35.25m-5.48 0h12.13M0 40h23.07L11.54 20.01m17.6 0-6.07 10.5m2.74 4.75-6.06-10.5m-5.49 0H26.4M11.53 20h23.08L23.07 40"/></pattern>

                                    <pattern v-if="seriesIndex === 2" :id="patternId" width="100" height="173.21" patternTransform="scale(0.6)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="#1A1A1A" d="M0 0v4.74L2.73 0zm4.14 0 6.44 11.15 2.38-4.12L8.9 0zm23.81 0 .49.84h-14.3l2.39 4.13h11.9l-7.14 12.37h4.77L34.39 2.9 32.71 0zm9.52 0 .49.84h19.05l7.14 12.37H49.87l2.38 4.13h11.9l-7.14 12.37h4.76l8.34-14.44L61.28 0zm28.57 0 7.64 13.21h19.04l7.15 12.37h-14.3l2.39 4.13h11.9l-7.14 12.37h4.77l2.5-4.34V17.57l-3.7-6.42 3.7-6.41V0h-2.01l-5.25 9.1H78.44L83.7 0h-4.77l-4.06 7.03L70.81 0zm22.41 0-2.87 4.97h4.76L93.21 0zm-50.5 4.97-9.51 16.5h-14.3l7.15-12.38h-4.76L10.58 19.4 3.44 7.03l-2.39 4.12 8.34 14.43h19.05l7.14 12.38H21.29l2.39 4.12h11.9l-7.14 12.38h4.75l8.34-14.44-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.3h14.29l-2.38-4.13zm35.72 12.37-9.52 16.5H49.87l7.14-12.38h-4.76l-5.96 10.31-7.14-12.37-2.38 4.12 8.33 14.44h19.05l7.14 12.37H57.01l2.38 4.13h11.9l-7.14 12.37h4.76l8.33-14.44-9.52-16.5 7.14-12.37 7.15 12.38 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM0 17.57v20.16l5.82-10.08zm9.39 12.14-9.4 16.27v4.57L7 62.71H0v4.12h7L0 78.97v.23h4.63l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.13-5.95-10.3h14.29l-2.38-4.13zm65.47 2.06-2.38 4.13 8.34 14.43h19.05l.13.22v-4.57l-.13.23h-14.3l7.15-12.38h-4.76l-5.95 10.31zM45.1 42.08l-9.52 16.5H21.29l7.15-12.37h-4.76l-5.96 10.3-7.14-12.37-2.38 4.13 8.33 14.44h19.05l7.14 12.37H28.44l2.38 4.12h11.9l-7.14 12.37h4.76l8.33-14.43-9.52-16.5 7.14-12.37 7.15 12.37 2.38-4.12-5.95-10.31h14.28l-2.38-4.13zm35.72 12.38-9.53 16.49H57.01l7.14-12.37h-4.76l-5.95 10.3-7.15-12.36-2.37 4.12 8.33 14.44h19.04l7.15 12.37h-14.3l2.39 4.12h11.9l-7.14 12.37h4.77l8.33-14.43-9.53-16.5 7.15-12.37 7.14 12.37 2.38-4.12-5.95-10.31h14.29l-2.39-4.12zm11.9 8.25 2.38 4.12h4.9v-4.12zm-76.2 4.12L7 83.33H0v4.12h7l7.15 12.37H0v.23l2.25 3.9h11.9L7 116.31h4.77l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.31h14.29l-2.39-4.12zm65.49 2.06-2.38 4.12 8.33 14.44H100v-4.13h-7.28l7.15-12.37H95.1l-5.95 10.3zM100 78.97l-.13.23h.13zm-47.75.23-9.53 16.5H28.44l7.14-12.38h-4.76l-5.96 10.31-7.14-12.37-2.38 4.12 8.34 14.44h19.04l7.15 12.37h-14.3l2.39 4.12h11.9l-7.14 12.37h4.76l8.34-14.43-9.53-16.5 7.15-12.37 7.14 12.38 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM0 91.57v4.12h7l-2.37-4.12zm87.96 0-9.52 16.5h-14.3l7.15-12.38h-4.76L60.58 106l-7.14-12.37-2.39 4.13 8.34 14.43h19.05l7.14 12.37H71.29l2.38 4.12h11.9l-7.13 12.38h4.76l8.33-14.44-9.52-16.5 7.14-12.36 7.14 12.37 2.38-4.13-5.95-10.3H100v-4.13zm11.9 8.25.14.22v-.22zm-76.18 4.12-9.53 16.5H0v4.12h14.15l7.14 12.37H7l2.39 4.13h11.9l-7.14 12.37h4.76L27.24 139l-9.52-16.5 7.14-12.37 7.15 12.37 2.38-4.13-5.95-10.3h14.28l-2.38-4.13zM89.15 106l-2.38 4.13 8.33 14.43h4.9v-4.12h-.13l.13-.22v-8.26l-3.7 6.41zm-86.9 2.07L0 111.97v8.24l7-12.14zm57.14 8.24-9.52 16.5h-14.3l7.15-12.37h-4.76l-5.95 10.3-7.15-12.37-2.38 4.13 8.34 14.43h19.05l7.14 12.38H42.72l2.38 4.12h11.91l-7.14 12.37h4.76l8.33-14.43-9.52-16.5 7.14-12.37 7.14 12.37 2.39-4.12-5.96-10.31h14.29l-2.38-4.13zm-59.4 12.37v4.13h14.16l-2.38-4.13zm95.11 0-9.52 16.5H71.29l7.14-12.37h-4.75l-5.96 10.31-7.14-12.37-2.38 4.12 8.33 14.44h19.05l7.14 12.37H78.43l2.39 4.12h11.9l-4.27 7.4h4.76l5.46-9.46-9.52-16.5 7.14-12.37 3.7 6.42v-8.26l-.12-.23h.13v-4.13zM0 133.04v8.25l3.44 5.95 2.38-4.12zm30.82 8.02-9.53 16.5H7l7.15-12.38H9.39l-5.95 10.31L0 149.54v8.24l2.25 3.9h19.04l6.66 11.52h4.76l-7.85-13.58 7.15-12.38 7.14 12.38 2.38-4.13-5.95-10.3h14.29l-2.39-4.13zm65.47 2.06-2.38 4.12 6.09 10.55v-8.25zm-29.76 10.3-9.52 16.5H42.72l7.15-12.37H45.1l-5.95 10.32-7.14-12.38-2.38 4.13 7.84 13.58h23.81l-.7-1.21 7.14-12.37 7.14 12.37 2.38-4.12-5.95-10.32h14.29l-2.38-4.12zM2.25 165.8 0 169.7v3.5h2.73l.7-1.21.7 1.21H8.9L7 169.93h14.3l-2.39-4.13zm65.47 2.07-2.38 4.12.7 1.21h4.76zm32.28 1.82-2.03 3.51H100zm-19.18.24-1.9 3.27h4.77l1.89-3.27z"/></pattern>

                                    <pattern v-if="seriesIndex === 3" :id="patternId" width="58" height="100.23" patternTransform="scale(1)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" stroke-linecap="square" d="m12.127 73.813.013 5.643 4.893-2.81zm-6.01-3.47 16.928 9.773-16.93 9.777zm-6.02-3.476 28.967 16.725L.13 100.262zm16.97 23.616-.015 5.643-4.893-2.81zm6.01-3.472L6.148 96.786l16.93 9.776zM.128 100.261l28.935 16.669m16.874-23.67-.013-5.644-4.894 2.81zm6.01 3.47L35.02 86.956l16.931-9.775zM29 83.482l28.936-16.669.032 33.393m-28.904 2.834 4.881-2.834-4.88-2.832zm0 6.94V90.433l16.932 9.773zm0 6.952v-33.45l28.904 16.724zM58 13.915l-4.882 2.833L58 19.582zm0-6.94v19.548l-16.932-9.774zm0-6.951v33.448L29.096 16.748m0-13.89 4.88-2.833-4.88-2.833zm0 6.94V-9.749L46.026.025zm0 6.95v-33.449L58 .024zM16.94 23.696l-4.894-2.81-.014 5.643zm6.01-3.47L6.02 29.998v-19.55zM0 33.472.033.08 28.97 16.75m-5.99-29.92L6.053-3.393l16.93 9.776zm5.99 29.92L29-16.644.033.08m40.966 23.615.013 5.643 4.893-2.81zm-6.01-3.47 16.928 9.774-16.93 9.775zm22.947 13.248L29 50.143l-.031-33.394M16.97 43.197l-.013-5.643-4.894 2.81zm6.01 3.47L6.053 36.894l16.93-9.776zM29 50.143.032 33.419l28.936-16.67m16.937 57.008-4.893-2.81-.014 5.644zm6.01-3.47L34.988 80.06V60.51zM29 64.035l-4.88 2.832L29 69.7zm0-6.942v19.549l-16.93-9.775zM.097 66.867 29 50.143v33.449m16.938-43.228-.013 5.644-4.894-2.811zm6.01-3.47L35.02 46.667l16.931 9.777zM29 50.143l28.936 16.67.032-33.394M.097 52.975l4.88-2.832-4.88-2.833zm0 6.942V40.368l16.931 9.775zm0 6.95V33.42"/></pattern>

                                    <pattern v-if="seriesIndex === 4" :id="patternId" width="40" height="69.282" patternTransform="scale(0.7)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#2b2b3100"/><path fill="none" stroke="#1A1A1A" d="M13.333-3.849v23.094M6.667-15.396l20 11.547M13.333-19.245l20 11.547M20 0v23.094m20-34.641-6.667 3.849-6.666 3.849L20 0M0-11.547l6.667 3.849 6.666 3.849L20 0m0-23.094 20 11.547v23.094L20 23.094l-6.667-3.849-6.666-3.849L0 11.547v-23.094l6.667-3.849 6.666-3.849zM40-3.769 20 7.698m20-3.849-16.253 9.384L20 15.396M6.667-7.698v23.094m6.666 50.037v23.094M6.667 53.886l20 11.547M13.333 50.037l20 11.547M20 69.282v23.094m20-34.641-6.667 3.849-6.666 3.849L20 69.282M0 57.735l6.667 3.849 6.666 3.849L20 69.282m0-23.094 20 11.547v23.094L20 92.376l-6.667-3.849-6.666-3.849L0 80.829V57.735l6.667-3.849 6.666-3.849zm20 19.325L20 76.98m20-3.849L20 84.678M6.667 61.584v23.094m26.666-53.886v23.094m-6.666-34.641 20 11.547M33.333 15.396l20 11.547M40 34.641v23.094m20-34.641-6.667 3.849-6.666 3.849L40 34.641M20 23.094l6.667 3.849 6.666 3.849L40 34.641m0-23.094 20 11.547v23.094L40 57.735l-6.667-3.849-6.666-3.849L20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L40 42.339m20-3.849L40 50.037M26.667 26.943v23.094M-6.667 30.792v23.094m-6.666-34.641 20 11.547M-6.667 15.396l20 11.547M0 34.641v23.094m20-34.641-6.667 3.849-6.666 3.849L0 34.641m-20-11.547 6.667 3.849 6.666 3.849L0 34.641m0-23.094 20 11.547v23.094L0 57.735l-6.667-3.849-6.666-3.849L-20 46.188V23.094l6.667-3.849 6.666-3.849zm20 19.325L0 42.339m20-3.849L0 50.037m-13.333-23.094v23.094"/></pattern>
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