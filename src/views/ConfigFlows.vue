<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import useFlows from "../flows";
import BaseDropdown from "../components/BaseDropdown.vue";
import { useMakerStore } from "../stores/maker";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import BaseConfigViewer from "../components/Base/BaseConfigViewer.vue";
import { getVueDataUiConfig } from "vue-data-ui";

const store = useMainStore();
const makerStore = useMakerStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
    return store.translations;
})

const makerTranslations = computed(() => {
    return makerStore.translations;
})

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    },
    {
        description: translations.value.docs.configFlow[store.lang],
    }
]);


const flows = useFlows();
const selectedComponent = ref('vue_ui_xy');

const options = Object.entries({
    vue_ui_bullet: 'chartBullet',
    vue_ui_3d_bar: 'chart3dBar',
    vue_ui_accordion: 'accordion',
    vue_ui_age_pyramid: 'chartAgePyramid',
    vue_ui_annotator: 'annotator',
    vue_ui_candlestick: 'chartCandlestick',
    vue_ui_carousel_table: 'carouselTable',
    vue_ui_chestnut: 'chartChestnut',
    vue_ui_dashboard: 'dashboard',
    vue_ui_digits: 'digit8',
    vue_ui_donut: 'chartDonut',
    vue_ui_donut_evolution: 'chartDonutEvolution',
    vue_ui_dumbbell: 'chartDumbbell',
    vue_ui_flow: 'chartFlow',
    vue_ui_galaxy: 'chartGalaxy',
    vue_ui_gauge: 'chartGauge',
    vue_ui_heatmap: 'chartHeatmap',
    vue_ui_kpi: 'kpiBox',
    vue_ui_mini_loader: 'chartWheel',
    vue_ui_molecule: 'chartCluster',
    vue_ui_mood_radar: 'chartMoodRadar',
    vue_ui_nested_donuts: 'chartNestedDonuts',
    vue_ui_onion: 'chartOnion',
    vue_ui_parallel_coordinate_plot: 'chartParallelCoordinatePlot',
    vue_ui_quadrant: 'chartQuadrant',
    vue_ui_quick_chart: 'vueDataUi',
    vue_ui_radar: 'chartRadar',
    vue_ui_rating: 'star',
    vue_ui_relation_circle: 'chartRelationCircle',
    vue_ui_rings: 'chartRings',
    vue_ui_scatter: 'chartScatter',
    vue_ui_screenshot: 'screenshot',
    vue_ui_skeleton: 'skeleton',
    vue_ui_smiley: 'smiley',
    vue_ui_sparkhistogram: 'chartSparkHistogram',
    vue_ui_sparkstackbar: 'chartSparkStackbar',
    vue_ui_spark_trend: 'trend',
    vue_ui_sparkbar: 'chartSparkbar',
    vue_ui_sparkgauge: 'chartGauge',
    vue_ui_sparkline: 'chartSparkline',
    vue_ui_strip_plot: 'chartStripPlot',
    vue_ui_table: 'chartTable',
    vue_ui_table_heatmap: 'chartTable',
    vue_ui_table_sparkline: 'chartTableSparkline',
    vue_ui_thermometer: 'chartThermometer',
    vue_ui_timer: 'lap',
    vue_ui_tiremarks: 'chartTiremarks',
    vue_ui_treemap: 'chartTreemap',
    vue_ui_horizontal_bar: 'chartVerticalBar',
    vue_ui_waffle: 'chartWaffle',
    vue_ui_wheel: 'chartWheel',
    vue_ui_word_cloud: 'chartWordCloud',
    vue_ui_xy: 'chartLine',
    vue_ui_xy_canvas: 'chartLine',
    vue_ui_gizmo: 'battery',
    vue_ui_stackbar: 'chartStackbar',
    vue_ui_funnel: 'chartFunnel',
    vue_ui_history_plot: 'chartHistoryPlot',
    vue_ui_world: 'world',
    vue_ui_ridgeline: 'chartRidgeline',
    vue_ui_chord: 'chartChord',
    vue_ui_stackline: 'chartStackline',
    vue_ui_dag: 'chartDag',
    vue_ui_geo: 'chartGeo',
    vue_ui_bump: 'chartBump'
}).map(([name, icon]) => ({ name, icon }));

const config = computed(() => {
    return {
        nodeCategories: flows[selectedComponent.value].nodeCategories,
        nodeCategoryColors: flows[selectedComponent.value].nodeCategoryColors,
        userOptions: {
            buttons: {
                table: false,
            }
        },
        style: {
            chart: {
                backgroundColor: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                links: {
                    stroke: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                },
                nodes: {
                    gap: 0,
                    stroke: isDarkMode.value ? '#1A1A1A' : '#F3F4F6',
                    minHeight: 25,
                    labels: {
                        fontSize: 8
                    }
                },
                tooltip: {
                    show: true,
                    color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? '#1A1A1A' :  "#F3F4F6",
                    fontSize: 14,
                    showPercentage: true,
                    roundingPercentage: 0,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? '#4A4A4A' : "#e1e5e8",
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: "center",
                    offsetY: 24
                },
                legend: {
                    color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? '#1A1A1A' :  "#F3F4F6",
                },
                title: {
                    text: selectedComponent.value,
                    color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                    textAlign: 'left',
                    paddingLeft: 24,
                }
            }
        }
    }
})


const dataset = computed(() => {
    return flows[selectedComponent.value].flow
})

const description = computed(() => {
    return {
        en: 'Showcasing examples of the VueUiDag chart describing some Vue Data UI components config objects.',
        fr: 'Présentation d’exemples du diagramme VueUiDag décrivant quelques objets de configuration des composants UI de données Vue.',
        pt: 'Apresentando exemplos do diagrama VueUiDag que descreve alguns objetos de configuração de componentes de IU de dados do Vue.',
        de: 'Beispiele für das VueUiDag-Diagramm, das einige Konfigurationsobjekte von Vue Data UI-Komponenten beschreibt.',
        zh: '展示 VueUiDag 图表示例，描述一些 Vue 数据 UI 组件的配置对象。',
        ja: 'VueデータUIコンポーネントの設定オブジェクトを説明するVueUiDagチャートの例を紹介します。',
        es: 'Mostrando ejemplos del diagrama VueUiDag que describen algunos objetos de configuración de componentes de UI de datos de Vue.',
        ko: 'Vue 데이터 UI 컴포넌트 구성 객체를 설명하는 VueUiDag 차트 예시를 보여줍니다.',
        ar: 'عرض أمثلة لمخطط VueUiDag يصف بعض كائنات تكوين مكونات واجهة المستخدم الخاصة ببيانات Vue.'
    }
})

const DAG_OBJ = computed(() => {
    return getVueDataUiConfig(selectedComponent.value);
});

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <div class="mt-12">
        <div class="w-full flex flex-col gap-4 place-items-center justify-center my-3">
            <VueUiIcon name="chartDag" :size="64" :strokeWidth="0.8" class="hidden md:block" :stroke="isDarkMode ? '#de6937' : '#de6937'"/>
            <h1 class="text-[48px] sm:text-[64px] text-center">{{ translations.docs.configFlow[store.lang] }}</h1>
            <article>
                <p class="text-md">
                    {{ description[store.lang] }}
                </p>
            </article>
        </div>
        <div class="w-fit mx-auto mb-12">
            <div class="flex flex-col gap-2">
                <label for="chartType">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>

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
                                <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('VueUi', '') }}</span>
                            </div>
                        </div>
                    </template>
                </BaseDropdown>
            </div>
        </div>

        <div style="min-width: 300px; max-width: 90%; resize: horizontal; overflow: auto; background: transparent" class="mx-auto">
            <BaseConfigViewer :config="DAG_OBJ"/>
        </div>
    </div>
</template>
