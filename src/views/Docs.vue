<script setup>
import {ref, computed, onMounted } from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import DocVueUiXy from '../components/docs/DocVueUiXy.vue';
import DocVueUiTable from "../components/docs/DocVueUiTable.vue";
import DocVueUiDonut from "../components/docs/DocVueUiDonut.vue";
import DocVueUiWaffle from "../components/docs/DocVueUiWaffle.vue";
import DocVueUiRadar from "../components/docs/DocVueUiRadar.vue";
import DocVueUiQuadrant from "../components/docs/DocVueUiQuadrant.vue";
import DocVueUiGauge from "../components/docs/DocVueUiGauge.vue";
import DocVueUiChestnut from "../components/docs/DocVueUiChestnut.vue";
import DocVueUiOnion from "../components/docs/DocVueUiOnion.vue";
import DocVueUiVerticalBar from "../components/docs/DocVueUiVerticalBar.vue";
import DocVueUiScreenshot from "../components/docs/DocVueUiScreenshot.vue";
import DocVueUiRating from "../components/docs/DocVueUiRating.vue";
import DocVueUiSkeleton from "../components/docs/DocVueUiSkeleton.vue";
import DocVueUiSparkline from "../components/docs/DocVueUiSparkline.vue";
import DocVueUiHeatmap from "../components/docs/DocVueUiHeatmap.vue";
import DocVueUiScatter from "../components/docs/DocVueUiScatter.vue";
import DocVueUiCandlestick from "../components/docs/DocVueUiCandlestick.vue";
import DocVueUiAgePyramid from "../components/docs/DocVueUiAgePyramid.vue";
import DocVueUiSparkbar from "../components/docs/DocVueUiSparkbar.vue";
import MenuDetail from "../components/MenuDetail.vue";
import DocVueUiDashboard from "../components/docs/DocVueUiDashboard.vue";
import DocVueUiAnnotator from "../components/docs/DocVueUiAnnotator.vue";
import DocVueUiSmiley from "../components/docs/DocVueUiSmiley.vue";
import DocVueUiRelationCircle from "../components/docs/DocVueUiRelationCircle.vue";
import DocVueUiThermometer from "../components/docs/DocVueUiThermometer.vue";
import DocVueUiSparkStackbar from "../components/docs/DocVueUiSparkStackbar.vue";
import DocVueUiSparkHistogram from "../components/docs/DocVueUiSparkHistogram.vue";
import DocVueUiRings from "../components/docs/DocVueUiRings.vue";
import DocVueUiWheel from "../components/docs/DocVueUiWheel.vue";
import DocVueUiTiremarks from "../components/docs/DocVueUiTiremarks.vue";
import DocVueUiDonutEvolution from "../components/docs/DocVueUiDonutEvolution.vue";
import DocVueUiIcon from "../components/docs/DocVueUiIcon.vue";
import DocVueUiMoodRadar from "../components/docs/DocVueUiMoodRadar.vue";
import DocVueUi3dBar from "../components/docs/DocVueUi3dBar.vue";
import DocVueUiDigits from "../components/docs/DocVueUiDigits.vue";
import DocVueUiMolecule from "../components/docs/DocVueUiMolecule.vue";
import DeepSearch from "../components/DeepSearch.vue";
import DocVueUiTableSparkline from "../components/docs/DocVueUiTablesparkline.vue";
import DocVueUiMiniLoader from "../components/docs/DocVueUiMiniLoader.vue";
import DocVueUiNestedDonuts from "../components/docs/DocVueUiNestedDonuts.vue";
import DocVueUiSparkgauge from "../components/docs/DocVueUiSparkgauge.vue";
import DocVueUiGalaxy from "../components/docs/DocVueUiGalaxy.vue";
import DocVueUiKpi from "../components/docs/DocVueUiKpi.vue";
import { getVueDataUiConfig, getThemeConfig } from "vue-data-ui";
import mainConfig from "../assets/default_configs.json";
import { CheckIcon, SquareRoundedLetterSIcon, SquareRoundedLetterTIcon, SquareRoundedLetterLIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import Wheeler from "../components/Wheeler.vue";
import DocVueUiTreemap from "../components/docs/DocVueUiTreemap.vue";
import DocVueUiTableHeatmap from "../components/docs/DocVueUiTableHeatmap.vue";
import DocVueUiAccordion from "../components/docs/DocVueUiAccordion.vue";
import DocVueUiQuickChart from "../components/docs/DocVueUiQuickChart.vue";
import DocVueUiCursor from "../components/docs/DocVueUiCursor.vue";
import DocVueUiSparkTrend from "../components/docs/DocVueUiSparkTrend.vue";
import DocVueUiStripPlot from "../components/docs/DocVueUiStripPlot.vue";
import DocVueUiDumbbell from "../components/docs/DocVueUiDumbbell.vue";
import DocsVueUiWordCloud from "../components/docs/DocsVueUiWordCloud.vue";
import DocVueUiXyCanvas from "../components/docs/DocVueUiXyCanvas.vue";
import DocVueUiFlow from "../components/docs/DocVueUiFlow.vue";
import DocVueUiParallelCoordinatePlot from "../components/docs/DocVueUiParallelCoordinatePlot.vue";
import DocVueUiTimer from "../components/docs/DocVueUiTimer.vue";
import Schema from "../schema/Schema.vue";

const store = useMainStore();
const translations = computed(() => {
    return store.translations;
})

const isCopy = computed(() => store.isCopy);
const isDarkMode = computed(() => store.isDarkMode);

const router = useRouter();
const isOpen = ref(window.innerWidth > 768);

function toggleMenu(state) {
    isOpen.value = state;
}

const cssTableClasses = ref([
    ".vue-ui-data-table",
    ".vue-ui-data-table__caption",
    ".vue-ui-data-table__thead-row",
    ".vue-ui-data-table__tbody__row",
    ".vue-ui-data-table__tbody__row-even",
    ".vue-ui-data-table__tbody__row-odd",
    ".vue-ui-data-table__tbody__td",
])

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const copyConfigContent = ref(null)

function copyContent() {
    if(!copyConfigContent.value) return;

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyConfigContent.value.innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const configKeys = computed(() => {
    return Object.keys(mainConfig).toSorted()
});

const themeKeys = computed(() => {
    return Object.keys(mainConfig).toSorted().filter(key => {
        return ![
            "vue_ui_table",
            "vue_ui_rating",
            "vue_ui_smiley",
            "vue_ui_accordion",
            "vue_ui_skeleton",
            "vue_ui_dashboard",
            "vue_ui_annotator",
            "vue_ui_icon",
            "vue_ui_digits",
            "vue_ui_cursor",
            "vue_ui_mini_loader",
            "vue_ui_kpi"
        ].includes(key)
    });
});

const chartKeys = computed(() => {
    return Object.keys(mainConfig).toSorted().filter(key => {
        return ![
            "vue_ui_accordion",
            "vue_ui_screenshot",
            "vue_ui_skeleton",
            "vue_ui_dashboard",
            "vue_ui_annotator",
            "vue_ui_icon",
            "vue_ui_digits",
            "vue_ui_cursor",
            "vue_ui_mini_loader",
            "vue_ui_kpi",
            "vue_ui_rating",
            "vue_ui_smiley",
            "vue_ui_table_sparkline",
            "vue_ui_table_heatmap",
            "vue_ui_table"
        ].includes(key)
    })
})

const configSelect = ref('vue_ui_xy');
const schemaSelect = ref('vue_ui_xy');
const themeSelect = ref("vue_ui_xy");

const selectedConfig = computed(() => {
    return getVueDataUiConfig(configSelect.value)
});

const selectedTheme = computed(() => {
    return getThemeConfig(themeSelect.value)
});

const menuItems = computed(() => [
    {
        name: "Xy",
        icon: "chartLine",
        tooltip: translations.value.docs.tooltips.xy[store.lang],
        link: "/docs#vue-ui-xy",
        type: "classic",
        thumb: new URL('../assets/thumb_xy.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "XyCanvas",
        icon: "chartLine",
        tooltip: translations.value.docs.tooltips.xyCanvas[store.lang],
        link: "/docs#vue-ui-xy-canvas",
        type: "classic",
        thumb: new URL('../assets/thumb_xy_canvas.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_canvas_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Donut",
        icon: "chartDonut",
        tooltip: translations.value.docs.tooltips.donut[store.lang],
        link: "/docs#vue-ui-donut",
        type: "classic",
        thumb: new URL('../assets/thumb_donut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Treemap",
        icon: "chartTreemap",
        tooltip: translations.value.docs.tooltips.treemap[store.lang],
        link: "/docs#vue-ui-treemap",
        type: "classic",
        thumb: new URL('../assets/thumb_treemap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_treemap_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Galaxy",
        icon: "chartGalaxy",
        tooltip: translations.value.docs.tooltips.galaxy[store.lang],
        link: "/docs#vue-ui-galaxy",
        type: "classic",
        thumb: new URL('../assets/thumb_galaxy.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_galaxy_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "NestedDonuts",
        icon: "chartNestedDonuts",
        tooltip: translations.value.docs.tooltips.nestedDonuts[store.lang],
        link: "/docs#vue-ui-nested-donuts",
        type: "classic",
        thumb: new URL('../assets/thumb_nested_donuts.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_nested_donuts_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "DonutEvolution",
        icon: "chartDonutEvolution",
        tooltip: translations.value.docs.tooltips.donutEvolution[store.lang],
        link: "/docs#vue-ui-donut-evolution",
        type: "combined",
        thumb: new URL('../assets/thumb_donut_evolution.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_evolution_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Waffle",
        icon: "chartWaffle",
        tooltip: translations.value.docs.tooltips.waffle[store.lang],
        link: "/docs#vue-ui-waffle",
        type: "classic",
        thumb: new URL('../assets/thumb_waffle.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_waffle_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Rings",
        icon: "chartRings",
        tooltip: translations.value.docs.tooltips.rings[store.lang],
        link: "/docs#vue-ui-rings",
        type: "classic",
        thumb: new URL('../assets/thumb_rings.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_rings_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Radar",
        icon: "chartRadar",
        tooltip: translations.value.docs.tooltips.radar[store.lang],
        link: "/docs#vue-ui-radar",
        type: "classic",
        thumb: new URL('../assets/thumb_radar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_radar_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Quadrant",
        icon: "chartQuadrant",
        tooltip: translations.value.docs.tooltips.quadrant[store.lang],
        link: "/docs#vue-ui-quadrant",
        type: "classic",
        thumb: new URL('../assets/thumb_quadrant.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_quadrant_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Gauge",
        icon: "chartGauge",
        tooltip: translations.value.docs.tooltips.gauge[store.lang],
        link: "/docs#vue-ui-gauge",
        type: "measure",
        thumb: new URL('../assets/thumb_gauge.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_gauge_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
        hasLegend: true
    },
    {
        name: "Wheel",
        icon: "chartWheel",
        tooltip: translations.value.docs.tooltips.wheel[store.lang],
        link: "/docs#vue-ui-wheel",
        type: "measure",
        thumb: new URL('../assets/thumb_wheel.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_wheel_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "Tiremarks",
        icon: "chartTiremarks",
        tooltip: translations.value.docs.tooltips.tiremarks[store.lang],
        link: "/docs#vue-ui-tiremarks",
        type: "measure",
        thumb: new URL('../assets/thumb_tiremarks.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_tiremarks_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "Chestnut",
        icon: "chartChestnut",
        tooltip: translations.value.docs.tooltips.chestnut[store.lang],
        link: "/docs#vue-ui-chestnut",
        type: "combined",
        thumb: new URL('../assets/thumb_chestnut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_chestnut_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Onion",
        icon: "chartOnion",
        tooltip: translations.value.docs.tooltips.onion[store.lang],
        link: "/docs#vue-ui-onion",
        type: "classic",
        thumb: new URL('../assets/thumb_onion.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_onion_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "VerticalBar",
        icon: "chartVerticalBar",
        tooltip: translations.value.docs.tooltips.verticalBar[store.lang],
        link: "/docs#vue-ui-vertical-bar",
        type: "classic",
        thumb: new URL('../assets/thumb_vertical_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_vertical_bar_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Heatmap",
        icon: "chartHeatmap",
        tooltip: translations.value.docs.tooltips.heatmap[store.lang],
        link: "/docs#vue-ui-heatmap",
        type: "classic",
        thumb: new URL('../assets/thumb_heatmap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_heatmap_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
    },
    {
        name: "Scatter",
        icon: "chartScatter",
        tooltip: translations.value.docs.tooltips.scatter[store.lang],
        link: "/docs#vue-ui-scatter",
        type: "classic",
        thumb: new URL('../assets/thumb_scatter.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_scatter_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Candlestick",
        icon: "chartCandlestick",
        tooltip: translations.value.docs.tooltips.candlestick[store.lang],
        link: "/docs#vue-ui-candlestick",
        type: "classic",
        thumb: new URL('../assets/thumb_candlestick.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_candlestick_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "AgePyramid",
        icon: "chartAgePyramid",
        tooltip: translations.value.docs.tooltips.agePyramid[store.lang],
        link: "/docs#vue-ui-age-pyramid",
        type: "classic",
        thumbLight: new URL('../assets/thumb_age_pyramid_light.png', import.meta.url).href,
        thumb: new URL('../assets/thumb_age_pyramid.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Sparkline",
        icon: "chartSparkline",
        tooltip: translations.value.docs.tooltips.sparkline[store.lang],
        link: "/docs#vue-ui-sparkline",
        type: "mini",
        thumb: new URL('../assets/thumb_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkline_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "Sparkbar",
        icon: "chartSparkbar",
        tooltip: translations.value.docs.tooltips.sparkbar[store.lang],
        link: "/docs#vue-ui-sparkbar",
        type: "mini",
        thumb: new URL('../assets/thumb_sparkbar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkbar_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "SparkStackbar",
        icon: "chartSparkStackbar",
        tooltip: translations.value.docs.tooltips.stackbar[store.lang],
        link: "/docs#vue-ui-sparkstackbar",
        type: "mini",
        thumb: new URL('../assets/thumb_stackbar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_stackbar_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "SparkHistogram",
        icon: "chartSparkHistogram",
        tooltip: translations.value.docs.tooltips.histogram[store.lang],
        link: "/docs#vue-ui-sparkhistogram",
        type: "mini",
        thumb: new URL('../assets/thumb_histogram.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_histogram_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Sparkgauge",
        icon: "chartGauge",
        tooltip: translations.value.docs.tooltips.gauge[store.lang],
        link: "/docs#vue-ui-sparkgauge",
        type: "mini",
        thumb: new URL('../assets/thumb_sparkgauge.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_sparkgauge_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "SparkTrend",
        icon: "trend",
        tooltip: translations.value.docs.tooltips.trend[store.lang],
        link: "/docs#vue-ui-spark-trend",
        type: "mini",
        thumb: new URL('../assets/thumb_spark_trend.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_spark_trend_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "QuickChart",
        icon: "vueDataUi",
        tooltip: translations.value.docs.tooltips.quickChart[store.lang], 
        link: "/docs#vue-ui-quick-chart",
        type: "mini",
        thumb: new URL('../assets/thumb_quick_chart.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_quick_chart_light.png', import.meta.url).href,
        hasSlot: false,
        hasLegend: true,
        hasTableCss: false,
    },
    {
        name: "RelationCircle",
        icon: "chartRelationCircle",
        tooltip: translations.value.docs.tooltips.relationCircle[store.lang],
        link: "/docs#vue-ui-relation-circle",
        type: "semantic",
        thumb: new URL('../assets/thumb_relation_circle.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_relation_circle_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "Thermometer",
        icon: "chartThermometer",
        tooltip: translations.value.docs.tooltips.thermometer[store.lang],
        link: "/docs#vue-ui-thermometer",
        type: "measure",
        thumb: new URL('../assets/thumb_thermometer.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_thermometer_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "Table",
        icon: "chartTable",
        tooltip: translations.value.docs.tooltips.table[store.lang],
        link: "/docs#vue-ui-table",
        type: "table",
        thumb: new URL('../assets/thumb_table.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "TableSparkline",
        icon: "chartTable",
        tooltip: translations.value.docs.tooltips.sparklineTable[store.lang],
        link: "/docs#vue-ui-table-sparkline",
        type: "table",
        thumb: new URL('../assets/thumb_table_sparkline.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_sparkline_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "TableHeatmap",
        icon: "chartTable",
        tooltip: translations.value.docs.tooltips.tableHeatmap[store.lang],
        link: "/docs#vue-ui-table-heatmap",
        type: "table",
        thumb: new URL('../assets/thumb_table_heatmap.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_table_heatmap_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Rating",
        icon: "star",
        tooltip: translations.value.docs.tooltips.rating[store.lang],
        link: "/docs#vue-ui-rating",
        type: "measure",
        thumb: new URL('../assets/thumb_rating.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_rating_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Smiley",
        icon: "smiley",
        tooltip: translations.value.docs.tooltips.smiley[store.lang],
        link: "/docs#vue-ui-smiley",
        type: "measure",
        thumb: new URL('../assets/thumb_smiley.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_smiley_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Kpi",
        icon: "legend",
        tooltip: translations.value.docs.tooltips.kpi[store.lang],
        link: "/docs#vue-ui-kpi",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Accordion",
        icon: "accordion",
        tooltip: translations.value.docs.tooltips.accordion[store.lang],
        link: "/docs#vue-ui-accordion",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Screenshot",
        icon: "screenshot",
        tooltip: translations.value.docs.tooltips.screenshot[store.lang],
        link: "/docs#vue-ui-screenshot",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Skeleton",
        icon: "skeleton",
        tooltip: translations.value.docs.tooltips.skeleton[store.lang],
        link: "/docs#vue-ui-skeleton",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Dashboard",
        icon: "dashboard",
        tooltip: translations.value.docs.tooltips.dashboard[store.lang],
        link: "/docs#vue-ui-dashboard",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Annotator",
        icon: "annotator",
        tooltip: translations.value.docs.tooltips.annotator[store.lang],
        link: "/docs#vue-ui-annotator",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Icon",
        icon: "smiley",
        tooltip: translations.value.docs.tooltips.icon[store.lang],
        link: "/docs#vue-ui-icon",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Cursor",
        icon: "cursor",
        tooltip: translations.value.docs.tooltips.cursor[store.lang],
        link: "/docs#vue-ui-cursor",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "MoodRadar",
        icon: "chartMoodRadar",
        tooltip: translations.value.docs.tooltips.moodRadar[store.lang],
        link: "/docs#vue-ui-mood-radar",
        type: "measure",
        thumb: new URL('../assets/thumb_mood_radar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_mood_radar_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "3dBar",
        icon: "chart3dBar",
        tooltip: translations.value.docs.tooltips.bar3d[store.lang],
        link: "/docs#vue-ui-3d-bar",
        type: "3d",
        thumb: new URL('../assets/thumb_3d_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_3d_bar_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "Digits",
        icon: "digit8",
        tooltip: translations.value.docs.tooltips.digits[store.lang],
        link: "/docs#vue-ui-digits",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "MiniLoader",
        icon: "chartWheel",
        tooltip: translations.value.docs.tooltips.miniLoader[store.lang],
        link: "/docs#vue-ui-mini-loader",
        type: "tool",
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Molecule",
        icon: "chartCluster",
        tooltip: translations.value.docs.tooltips.molecule[store.lang],
        thumb: new URL('../assets/thumb_molecule.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_molecule_light.png', import.meta.url).href,
        link: "/docs#vue-ui-molecule",
        type: "classic",
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "StripPlot",
        icon: "chartStripPlot",
        tooltip: translations.value.docs.tooltips.stripPlot[store.lang],
        link: "/docs#vue-ui-strip-plot",
        type: "classic",
        thumb: new URL('../assets/thumb_strip_plot.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_strip_plot_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
    },
    {
        name: "Dumbbell",
        icon: "chartDumbbell",
        tooltip: translations.value.docs.tooltips.dumbbell[store.lang],
        link: "/docs#vue-ui-dumbbell",
        type: "classic",
        thumb: new URL('../assets/thumb_dumbbell.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_dumbbell_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "WordCloud",
        icon: "chartWordCloud",
        tooltip: translations.value.docs.tooltips.wordCloud[store.lang],
        link: "/docs#vue-ui-word-cloud",
        type: "classic",
        thumb: new URL('../assets/thumb_word_cloud.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_word_cloud_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: false
    },
    {
        name: "Flow",
        icon: "chartFlow",
        tooltip: translations.value.docs.tooltips.flow[store.lang],
        link: "/docs#vue-ui-flow",
        type: "classic",
        thumb: new URL('../assets/thumb_flow.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_flow_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: false
    },
    {
        name: "ParallelCoordinatePlot",
        icon: "chartParallelCoordinatePlot",
        tooltip: translations.value.docs.tooltips.pcp[store.lang],
        link: "/docs#vue-ui-parallel-coordinate-plot",
        type: "classic",
        thumb: new URL('../assets/thumb_pcp.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_pcp_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: 'Timer',
        icon: 'lap',
        tooltip: translations.value.docs.tooltips.timer[store.lang],
        link: '/docs#vue-ui-timer',
        type: 'tool',
        hasSlot: true,
        hasLegend: false,
        thumb: new URL('../assets/thumb_timer.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_timer_light.png', import.meta.url).href,
    }
]);

const currentShowcase = ref('VueUiXy')
const menuItemsCount = ref(40);
let count = ref(0)
const wheelerValue = computed(() => {
    return (count.value / 40) * 100
});

function playShowcase() {
    setInterval(() => {
        if(count.value === menuItemsCount.value - 1) {
            count.value = 0;
            currentShowcase.value = "Xy"
            count.value += 1;
        } else {
            currentShowcase.value = `${menuItems.value[count.value] ? menuItems.value[count.value].name : 'Xy'}`
            count.value += 1;
        }
    }, 1000)
};

onMounted(playShowcase);

</script>

<template>
    <div :class="{'vdui': isDarkMode}"/>
    <div style="z-index:10000000" v-if="isCopy" class="animate-pulse origin-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] w-[80px] flex place-items-center place-content-center border-2 border-gray-400 dark:border-app-green dark:bg-black rounded-full bg-white">
        <CheckIcon size="42" class="dark:text-app-green"/>
    </div>
    <SideMenu @toggle="toggleMenu"/>
    
    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1`">
        <div :class="`px-2 pt-6 sm:pt-0 ${isOpen ? `xl:w-5/6 hidden sm:block` : ''}`">
            <DocVueUiTableSparkline v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-table-sparkline'"/>
            <DocVueUiXy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy'" />
            <DocVueUiTable v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-table'"/>
            <DocVueUiDonut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-donut'"/>
            <DocVueUiWaffle v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-waffle'"/>
            <DocVueUiRadar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-radar'"/>
            <DocVueUiQuadrant v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-quadrant'"/>
            <DocVueUiGauge v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-gauge'"/>
            <DocVueUiChestnut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-chestnut'"/>
            <DocVueUiOnion v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-onion'"/>
            <DocVueUiVerticalBar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-vertical-bar'"/>
            <DocVueUiScreenshot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-screenshot'"/>
            <DocVueUiRating v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-rating'"/>
            <DocVueUiSkeleton v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-skeleton'"/>
            <DocVueUiSparkline v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkline'"/>
            <DocVueUiHeatmap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-heatmap'"/>
            <DocVueUiScatter v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-scatter'"/>
            <DocVueUiCandlestick v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-candlestick'"/>
            <DocVueUiAgePyramid v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-age-pyramid'"/>
            <DocVueUiSparkbar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkbar'"/>
            <DocVueUiDashboard v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-dashboard'"/>
            <DocVueUiAnnotator v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-annotator'"/>
            <DocVueUiSmiley v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-smiley'"/>
            <DocVueUiRings v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-rings'"/>
            <DocVueUiRelationCircle v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-relation-circle'"/>
            <DocVueUiThermometer v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-thermometer'"/>
            <DocVueUiSparkStackbar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-sparkstackbar'"/>
            <DocVueUiSparkHistogram v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-sparkhistogram'"/>
            <DocVueUiWheel v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-wheel'"/>
            <DocVueUiTiremarks v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-tiremarks'"/>
            <DocVueUiDonutEvolution v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-donut-evolution'"/>
            <DocVueUiIcon v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-icon'"/>
            <DocVueUiMoodRadar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-mood-radar'"/>
            <DocVueUi3dBar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-3d-bar'"/>
            <DocVueUiDigits v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-digits'"/>
            <DocVueUiMolecule v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-molecule'"/>
            <DocVueUiMiniLoader v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-mini-loader'"/>
            <DocVueUiNestedDonuts v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-nested-donuts'"/>
            <DocVueUiSparkgauge v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkgauge'"/>
            <DocVueUiGalaxy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-galaxy'"/>
            <DocVueUiKpi v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-kpi'"/>
            <DocVueUiTreemap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-treemap'" />
            <DocVueUiTableHeatmap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-table-heatmap'" />
            <DocVueUiAccordion v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-accordion'" />
            <DocVueUiQuickChart v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-quick-chart'" />
            <DocVueUiCursor v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-cursor'" />
            <DocVueUiSparkTrend v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-spark-trend'" />
            <DocVueUiStripPlot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-strip-plot'" />
            <DocVueUiDumbbell v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-dumbbell'" />
            <DocsVueUiWordCloud v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-word-cloud'" />
            <DocVueUiXyCanvas v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy-canvas'" />
            <DocVueUiFlow v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-flow'" />
            <DocVueUiParallelCoordinatePlot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-parallel-coordinate-plot'" />
            <DocVueUiTimer v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-timer'" />
            <div v-if="router.currentRoute.value.fullPath === '/docs'" class="flex flex-col place-items-center place-content-center">
                <div class="w-full flex flex-col gap-4 place-items-center justify-center mb-6 mt-4">
                    <div class="flex flex-row gap-4 place-items-center">
                        <img src="../assets/logo.png" class="h-6">
                        <h1 class="text-3xl text-center">{{ translations.menu.docs[store.lang] }}</h1>
                    </div>
                    <h2>{{ translations.docs.props[store.lang] }}</h2>
                    <div class="w-[100px] rounded-full overflow-hidden flex place-items-center justify-center shadow-md">
                        <!-- <Sprinter :value="count" :key="`sprinter_${count}`"/> -->
                        <Wheeler :value="wheelerValue" :key="`wheeler_${count}`"/>
                    </div>
                </div>

<div class="w-fit mx-auto border border-gray-700 rounded-md py-1 px-6 sm:px-10 bg-gray-200 dark:bg-[rgb(30,30,30)] shadow-md">
<pre>
<code class="text-gray-500 text-md">
&lt;VueUi<span class="dark:text-gray-200">{{ currentShowcase }}</span>
    <span class="text-black dark:text-app-green">:dataset</span>="{{ translations.docs.dataset[store.lang] }}"
    <span class="text-black dark:text-app-blue">:config</span>="{{ translations.docs.config[store.lang] }}"
/&gt;
</code>
</pre>
</div>
<RouterLink to="/universal-component">
<div class="mt-6">
    {{ translations.installation.comments.or[store.lang] }}
</div>
<div class="w-fit mx-auto border border-gray-700 rounded-md py-1 px-6 sm:px-10 mt-6 bg-gray-200 dark:bg-[rgb(30,30,30)] shadow-md">
<pre>
<code class="text-gray-500 text-md">
&lt;<span class="dark:text-gray-200">VueDataUi</span>
    <span class="text-black dark:text-app-orange">component</span>="VueUiXy"
    <span class="text-black dark:text-app-green">:dataset</span>="{{ translations.docs.dataset[store.lang] }}"
    <span class="text-black dark:text-app-blue">:config</span>="{{ translations.docs.config[store.lang] }}"
/&gt;
</code>
</pre>
</div>
</RouterLink>

<div class="w-full px-2 sm:px-0 sm:w-1/2 text-left mx-auto my-6 text-xs sm:text-lg">
    {{ translations.docs.p1[store.lang] }}
</div>

<div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center border p-4 border-app-blue rounded-lg bg-[#5f8bee20]">
    <div class="w-full text-left text-lg">
        {{ translations.overview.title[store.lang] }}
    </div>
    <div>
        <select class="mb-4 h-8 px-2" v-model="schemaSelect"><option v-for="opt in chartKeys">{{ opt }}</option> </select>
    </div>
    <Schema :component="schemaSelect"/>
</div>

                <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center border p-4 border-app-blue rounded-lg bg-[#5f8bee20]">
                    <div class="mb-4">{{ translations.getTheme[store.lang] }}</div>
                    <code @click="copyContent" ref="copyConfigContent" class="bg-[#1A1A1A] text-gray-400 rounded-sm p-4 mb-4 w-full overflow-auto text-xs sm:text-sm relative cursor-pointer">
                    <CopyIcon class="absolute right-2 top-2"/>
                        import { getThemeConfig } from "vue-data-ui";<br>

                        const {{ themeSelect.replace('vue_ui_', '').replace('3d', 'three_d') }}_themes = getThemeConfig("{{ themeSelect }}");
                    </code>
                    <select class="mb-4 h-8 px-2" v-model="themeSelect"><option v-for="opt in themeKeys">{{ opt }}</option> </select>

                    <VueDataUi component="VueUiAccordion" :config="{
                        head: {
                            useArrowSlot: true,
                            backgroundColor: 'transparent'
                        },
                        body: {
                            backgroundColor: 'transparent',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                        }
                    }">
                        <template #arrow="{ iconColor }">
                            <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
                        </template>
                        <template #title>
                            {{ translations.viewSelectedTheme[store.lang] }}
                        </template>
                        <template #content>
                            <div class="text-xs text-left mt-6 cursor-pointer" @click="copyToClipboard(selectedTheme)">
                                <div class="my-2 flex flex-row gap-2 place-items-center"><CopyIcon/>{{ translations.clickToCopy[store.lang] }}</div>
                                {{ selectedTheme }}
                            </div>
                        </template>
                    </VueDataUi>
                </div>

                <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center border p-4 border-app-blue rounded-lg bg-[#5f8bee20]">
                    <div class="mb-4">{{ translations.getConfig[store.lang] }}</div>
                    <code @click="copyContent" ref="copyConfigContent" class="bg-[#1A1A1A] text-gray-400 rounded-sm p-4 mb-4 w-full overflow-auto text-xs sm:text-sm relative cursor-pointer">
                    <CopyIcon class="absolute right-2 top-2"/>
                        import { getVueDataUiConfig } from "vue-data-ui";<br>

                        const {{ configSelect.replace('vue_ui_', '').replace('3d', 'three_d') }}_config = getVueDataUiConfig("{{ configSelect }}");
                    </code>
                    <select class="mb-4 h-8 px-2" v-model="configSelect"><option v-for="opt in configKeys">{{ opt }}</option> </select>

                    <VueDataUi component="VueUiAccordion" :config="{
                        head: {
                            useArrowSlot: true,
                            backgroundColor: 'transparent'
                        },
                        body: {
                            backgroundColor: 'transparent',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                        }
                    }">
                        <template #arrow="{ iconColor }">
                            <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
                        </template>
                        <template #title>
                            {{ translations.viewSelectedConfig[store.lang] }}
                        </template>
                        <template #content>
                            <div class="text-xs text-left mt-6 cursor-pointer" @click="copyToClipboard(selectedConfig)">
                                <div class="my-2 flex flex-row gap-2 place-items-center"><CopyIcon/>{{ translations.clickToCopy[store.lang] }}</div>
                                {{ selectedConfig }}
                            </div>
                        </template>
                    </VueDataUi>
                </div>

                <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col md:flex-row gap-4">
                
                    <div class="w-full border border-gray-400 bg-[#FFFFFF10] p-4 rounded-lg flex flex-col gap-6 place-items-center">
                    <div class="flex flex-row gap-6 place-items-center">
                        <div class="h-[40px] w-[40px] flex place-items-center justify-center">
                        <SquareRoundedLetterSIcon class="bg-white dark:bg-black rounded-md text-app-blue"/>
                        </div>
                        {{ translations.slots.summary[store.lang] }}
                    </div>
                    <div class="flex flex-row gap-6 place-items-center">
                        <div class="h-[40px] w-[40px] flex place-items-center justify-center">
                        <SquareRoundedLetterLIcon class="bg-white dark:bg-black rounded-md text-app-orange"/>
                        </div>
                        {{ translations.slots.legend[store.lang] }}
                    </div>
                        <div class="w-full flex justify-center">
                        <router-link to="/customization">
                            <button class="py-2 px-6 bg-app-blue text-white dark:text-black rounded shadow hover:outline hover:outline-gray-400">{{ translations.docs.example[store.lang] }}</button>
                        </router-link>
                        </div>
                    </div>

                    <div class="w-full border border-gray-400 bg-[#FFFFFF10] p-4 rounded-lg flex flex-row gap-6 place-items-center">
                        <div class="h-[40px] w-[40px] flex place-items-center justify-center">
                        <SquareRoundedLetterTIcon class="bg-white dark:bg-black rounded-md text-app-green"/>
                        </div>
                        <div class="flex flex-col gap-2">
                            {{ translations.tableCss.summary[store.lang] }}

                            <VueDataUi component="VueUiAccordion" :config="{
                                    head: {
                                        useArrowSlot: true,
                                        backgroundColor: 'transparent',
                                        iconColor: '#42d392'
                                    },
                                    body: {
                                        backgroundColor: 'transparent',
                                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
                                    }
                                }">
                                    <template #arrow="{ iconColor }">
                                        <VueUiIcon name="arrowRight" :size="16" :stroke="iconColor"/>
                                    </template>
                                    <template #title>
                                        {{ translations.tableCss.cta[store.lang] }}
                                    </template>
                                    <template #content>
                                        <div class="mt-2">
                                            <code>
                                                <ul>
                                                    <li v-for="cssClass in cssTableClasses">
                                                        {{  cssClass }}
                                                    </li>
                                                </ul>
                                            </code>
                                        </div>
                                    </template>
                                </VueDataUi>
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-6 mb-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.classic[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'classic')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip>
                            <div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div>
                        </template>
                    </MenuDetail>
                </div>  

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.measure[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'measure')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.mini[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'mini')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        3D
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === '3d')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.combined[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'combined')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.table[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'table')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>       

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.semantic[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'semantic')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div> 

                <div class="w-full max-w-[1000px] mx-auto text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2 bg-gray-200 dark:bg-[rgb(30,30,30)] p-2 sm:p-4 rounded-md border border-gray-700 relative pt-12 sm:pt-12">
                    <div class="absolute top-3 left-4 text-app-blue font-black text-xl">
                        {{ translations.types.tool[store.lang] }}
                    </div>
                    <MenuDetail v-for="item in menuItems.filter(item => item.type === 'tool')" :icon="item.icon" :link="item.link" :item="item">
                        <template #name>
                            {{ item.name }}
                            <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                            <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                            <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                        </template>
                        <template #tooltip><div class="flex flex-col place-items-center justify-center">
                            <img v-if="item.thumb" :src="item.thumb">
                            {{ item.tooltip }}
                            </div></template>
                    </MenuDetail>
                </div>                
            </div>
        </div>
    </div>
</template>

<style>
/* .vdui {
    background: radial-gradient(at top left, #2A2A2A, #1A1A1A, #1A1A1A, #1A1A1A);
} */
.vdui {
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(at top left, #FFFFFF07, transparent, transparent);
}
</style>