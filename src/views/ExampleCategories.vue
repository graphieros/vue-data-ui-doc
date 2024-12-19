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
    const hash = route.hash ? route.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null
    const hashIcon = hash ? categories.value.find(c => c.component === hash).icon : undefined

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

                    <div v-if="example.tags && example.tags.length" class="flex flex-row gap-2 place-items-center flex-wrap mt-2">
                        <div>Slots used:</div>
                        <div v-for="tag in example.tags">
                            <div class="text-xs px-2 py-0.5 border border-app-green bg-[#42d392] text-black rounded-full">
                                {{ tag }}
                            </div>
                        </div>
                    </div>
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
</style>