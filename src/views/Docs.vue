<script setup>
import {ref, computed, onMounted, defineAsyncComponent, watch } from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import { getVueDataUiConfig, getThemeConfig } from "vue-data-ui";
import { SquareRoundedLetterSIcon, SquareRoundedLetterTIcon, SquareRoundedLetterLIcon, CopyIcon, StarFilledIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import Schema from "../schema/Schema.vue";
import { useConfig } from "../assets/useConfig";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import BaseMenuCategory from "../components/BaseMenuCategory.vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";

const DocVueUiXy = defineAsyncComponent(() => import('../components/docs/DocVueUiXy.vue'));
const DocVueUiTable = defineAsyncComponent(() => import('../components/docs/DocVueUiTable.vue'));
const DocVueUiDonut = defineAsyncComponent(() => import('../components/docs/DocVueUiDonut.vue'));
const DocVueUiWaffle = defineAsyncComponent(() => import('../components/docs/DocVueUiWaffle.vue'));
const DocVueUiRadar = defineAsyncComponent(() => import('../components/docs/DocVueUiRadar.vue'));
const DocVueUiQuadrant = defineAsyncComponent(() => import('../components/docs/DocVueUiQuadrant.vue'));
const DocVueUiGauge = defineAsyncComponent(() => import('../components/docs/DocVueUiGauge.vue'));
const DocVueUiChestnut = defineAsyncComponent(() => import('../components/docs/DocVueUiChestnut.vue'));
const DocVueUiOnion = defineAsyncComponent(() => import('../components/docs/DocVueUiOnion.vue'));
const DocVueUiVerticalBar = defineAsyncComponent(() => import('../components/docs/DocVueUiVerticalBar.vue'));
const DocVueUiScreenshot = defineAsyncComponent(() => import('../components/docs/DocVueUiScreenshot.vue'));
const DocVueUiRating = defineAsyncComponent(() => import('../components/docs/DocVueUiRating.vue'));
const DocVueUiSkeleton = defineAsyncComponent(() => import('../components/docs/DocVueUiSkeleton.vue'));
const DocVueUiSparkline = defineAsyncComponent(() => import('../components/docs/DocVueUiSparkline.vue'));
const DocVueUiHeatmap = defineAsyncComponent(() => import('../components/docs/DocVueUiHeatmap.vue'));
const DocVueUiScatter = defineAsyncComponent(() => import('../components/docs/DocVueUiScatter.vue'));
const DocVueUiCandlestick = defineAsyncComponent(() => import('../components/docs/DocVueUiCandlestick.vue'));
const DocVueUiAgePyramid = defineAsyncComponent(() => import('../components/docs/DocVueUiAgePyramid.vue'));
const DocVueUiSparkbar = defineAsyncComponent(() => import('../components/docs/DocVueUiSparkbar.vue'));
const DocVueUiDashboard = defineAsyncComponent(() => import('../components/docs/DocVueUiDashboard.vue'));
const DocVueUiAnnotator = defineAsyncComponent(() => import('../components/docs/DocVueUiAnnotator.vue'));
const DocVueUiSmiley = defineAsyncComponent(() => import('../components/docs/DocVueUiSmiley.vue'));
const DocVueUiRelationCircle = defineAsyncComponent(() => import('../components/docs/DocVueUiRelationCircle.vue'));
const DocVueUiThermometer = defineAsyncComponent(() => import('../components/docs/DocVueUiThermometer.vue'));
const DocVueUiSparkStackbar = defineAsyncComponent(() => import('../components/docs/DocVueUiSparkStackbar.vue'));
const DocVueUiSparkHistogram = defineAsyncComponent(() => import('../components/docs/DocVueUiSparkHistogram.vue'));
const DocVueUiRings = defineAsyncComponent(() => import('../components/docs/DocVueUiRings.vue'));
const DocVueUiWheel = defineAsyncComponent(() => import('../components/docs/DocVueUiWheel.vue'));
const DocVueUiTiremarks = defineAsyncComponent(() => import('../components/docs/DocVueUiTiremarks.vue'));
const DocVueUiDonutEvolution = defineAsyncComponent(() => import('../components/docs/DocVueUiDonutEvolution.vue'));
const DocVueUiIcon = defineAsyncComponent(() => import('../components/docs/DocVueUiIcon.vue'));
const DocVueUiMoodRadar = defineAsyncComponent(() => import('../components/docs/DocVueUiMoodRadar.vue'));
const DocVueUi3dBar = defineAsyncComponent(() => import('../components/docs/DocVueUi3dBar.vue'));
const DocVueUiDigits = defineAsyncComponent(() => import('../components/docs/DocVueUiDigits.vue'));
const DocVueUiMolecule = defineAsyncComponent(() => import('../components/docs/DocVueUiMolecule.vue'));
const DocVueUiTableSparkline = defineAsyncComponent(() => import('../components/docs/DocVueUiTableSparkline.vue'));
const DocVueUiMiniLoader = defineAsyncComponent(() => import('../components/docs/DocVueUiMiniLoader.vue'));
const DocVueUiNestedDonuts = defineAsyncComponent(() => import('../components/docs/DocVueUiNestedDonuts.vue'));
const DocVueUiSparkgauge = defineAsyncComponent(() => import('../components/docs/DocVueUiSparkgauge.vue'));
const DocVueUiGalaxy = defineAsyncComponent(() => import('../components/docs/DocVueUiGalaxy.vue'));
const DocVueUiKpi = defineAsyncComponent(() => import('../components/docs/DocVueUiKpi.vue'));
const DocVueUiTreemap = defineAsyncComponent(() => import('../components/docs/DocVueUiTreemap.vue'));
const DocVueUiTableHeatmap = defineAsyncComponent(() => import('../components/docs/DocVueUiTableHeatmap.vue'));
const DocVueUiAccordion = defineAsyncComponent(() => import('../components/docs/DocVueUiAccordion.vue'));
const DocVueUiQuickChart = defineAsyncComponent(() => import('../components/docs/DocVueUiQuickChart.vue'));
const DocVueUiCursor = defineAsyncComponent(() => import('../components/docs/DocVueUiCursor.vue'));
const DocVueUiSparkTrend = defineAsyncComponent(() => import('../components/docs/DocVueUiSparkTrend.vue'));
const DocVueUiStripPlot = defineAsyncComponent(() => import('../components/docs/DocVueUiStripPlot.vue'));
const DocVueUiDumbbell = defineAsyncComponent(() => import('../components/docs/DocVueUiDumbbell.vue'));
const DocsVueUiWordCloud = defineAsyncComponent(() => import('../components/docs/DocsVueUiWordCloud.vue'));
const DocVueUiXyCanvas = defineAsyncComponent(() => import('../components/docs/DocVueUiXyCanvas.vue'));
const DocVueUiFlow = defineAsyncComponent(() => import('../components/docs/DocVueUiFlow.vue'));
const DocVueUiParallelCoordinatePlot = defineAsyncComponent(() => import('../components/docs/DocVueUiParallelCoordinatePlot.vue'));
const DocVueUiTimer = defineAsyncComponent(() => import('../components/docs/DocVueUiTimer.vue'));
const DocVueUiCarouselTable = defineAsyncComponent(() => import('../components/docs/DocVueUiCarouselTable.vue'));
const DocVueUiGizmo = defineAsyncComponent(() => import('../components/docs/DocVueUiGizmo.vue'));
const DocVueUiStackbar = defineAsyncComponent(() => import('../components/docs/DocVueUiStackbar.vue'));
const DocVueUiBullet = defineAsyncComponent(() => import('../components/docs/DocVueUiBullet.vue'));

const mainConfig = useConfig()

const store = useMainStore();
const translations = computed(() => {
    return store.translations;
})

const isDarkMode = computed(() => store.isDarkMode);

const router = useRouter();
const isOpen = ref(window.innerWidth > 768);

const docsCrumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    }
])

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    const hash = router.currentRoute.value.hash ? router.currentRoute.value.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null
    if (docsCrumbs.value.length === 1) {
        docsCrumbs.value.push({
            description: hash,
        })
    } else {
        docsCrumbs.value[1] = {
            description: hash
        }
    }
}

watch(() => router.currentRoute.value, updateCrumb, { deep: true, immediate: true });

function toggleMenu(state) {
    isOpen.value = state;
    store.isMenuOpen = state
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
            "vue_ui_kpi",
            "vue_ui_carousel_table",
            "vue_ui_gizmo",
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
            "vue_ui_rating",
            "vue_ui_smiley",
            "vue_ui_table_sparkline",
            "vue_ui_table_heatmap",
            "vue_ui_table",
            "vue_ui_timer"
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
        type: "xy",
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
        type: "xy",
        thumb: new URL('../assets/thumb_xy_canvas.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_canvas_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Stackbar",
        icon: "chartStackbar",
        tooltip: translations.value.docs.tooltips.stackbarBig[store.lang],
        link: "/docs#vue-ui-stackbar",
        type: ['xy'],
        thumb: new URL('../assets/thumb_stack_bar.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_stack_bar_light.png', import.meta.url).href,
        hasSlot: true,
        hasTableCss: true,
        hasLegend: true
    },
    {
        name: "Donut",
        icon: "chartDonut",
        tooltip: translations.value.docs.tooltips.donut[store.lang],
        link: "/docs#vue-ui-donut",
        type: "donuts",
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
        type: "donuts",
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
        type: "donuts",
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
        type: "donuts",
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
        type: ['donuts', 'xy'],
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
        type: "donuts",
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
        type: "donuts",
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
        type: "radar",
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
        type: "misc",
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
        type: "gauge",
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
        type: "gauge",
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
        type: "gauge",
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
        type: ['xy', 'donuts', 'misc'],
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
        type: "gauge",
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
        type: "xy",
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
        type: "donuts",
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
        type: "misc",
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
        type: "xy",
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
        type: "xy",
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
        name: "Gizmo",
        icon: "battery",
        tooltip: translations.value.docs.tooltips.gizmo[store.lang],
        link: "/docs#vue-ui-gizmo",
        type: "mini",
        thumb: new URL('../assets/thumb_gizmo.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_gizmo_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "QuickChart",
        icon: "vueDataUi",
        tooltip: translations.value.docs.tooltips.quickChart[store.lang], 
        link: "/docs#vue-ui-quick-chart",
        type: ['mini', 'xy'],
        thumb: new URL('../assets/thumb_quick_chart.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_quick_chart_light.png', import.meta.url).href,
        hasSlot: false,
        hasLegend: true,
        hasTableCss: false,
    },
    {
        name: "Bullet",
        icon: "chartBullet",
        tooltip: translations.value.docs.tooltips.bullet[store.lang],
        link: "/docs#vue-ui-bullet",
        type: ["mini", "gauge"],
        thumb: new URL('../assets/thumb_bullet.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_bullet_light.png', import.meta.url).href,
        hasSlot: true,
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
        type: "gauge",
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
        name: "CarouselTable",
        icon: "carouselTable",
        tooltip: translations.value.docs.tooltips.carouselTable[store.lang],
        link: "/docs#vue-ui-carousel-table",
        type: "table",
        thumb: new URL('../assets/thumb_carousel_table.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_carousel_table_light.png', import.meta.url).href,
        hasSlot: false,
        hasTableCss: false,
    },
    {
        name: "Rating",
        icon: "star",
        tooltip: translations.value.docs.tooltips.rating[store.lang],
        link: "/docs#vue-ui-rating",
        type: "rating",
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
        type: "rating",
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
        type: "radar",
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
        type: "misc",
        hasSlot: true,
        hasTableCss: false,
    },
    {
        name: "StripPlot",
        icon: "chartStripPlot",
        tooltip: translations.value.docs.tooltips.stripPlot[store.lang],
        link: "/docs#vue-ui-strip-plot",
        type: ['donuts', 'misc'],
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
        type: ['xy', 'misc'],
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
        type: "semantic",
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
        type: "xy",
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
        type: "xy",
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
        type: 'gauge',
        hasSlot: false,
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

const menuCategories = computed(() => {
    return [
        {
            filterBy: 'mini',
            title: translations.value.sideMenu.miniCharts[store.lang]
        },
        {
            filterBy: 'xy',
            title: translations.value.sideMenu.lineAndBars[store.lang]
        },
        {
            filterBy: 'donuts',
            title: translations.value.sideMenu.donuts[store.lang]
        },
        {
            filterBy: 'gauge',
            title: translations.value.sideMenu.gauges[store.lang]
        },
        {
            filterBy: 'semantic',
            title: translations.value.types.semantic[store.lang]
        },
        {
            filterBy: 'radar',
            title: translations.value.sideMenu.radars[store.lang]
        },
        {
            filterBy: 'misc',
            title: translations.value.sideMenu.misc[store.lang]
        },
        {
            filterBy: '3d',
            title: '3D'
        },
        {
            filterBy: 'table',
            title: translations.value.sideMenu.tables[store.lang]
        },
        {
            filterBy: 'rating',
            title: translations.value.sideMenu.rating[store.lang]
        },
        {
            filterBy: 'tool',
            title: translations.value.sideMenu.utilities[store.lang]
        },
    ]
})

const stackbarKey = ref(0);

</script>

<template>
    <BaseCrumbs :tree="docsCrumbs"/>
    
    <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>
    <ConfirmCopy/>
    <SideMenu @toggle="toggleMenu"/>

    <div :class="`${isOpen ? 'pl-[348px] pr-[48px]' : 'pl-[59px] sm:pl-[109px] sm:pr-[59px]'} pt-9 overflow-x-hidden relative z-1 min-h-[3000px]`">
        <div :class="`px-2 pt-6 sm:pt-0 ${isOpen ? `xl:w-5/6 hidden sm:block` : ''}`">
            <Transition name="fade">
                <DocVueUiTableSparkline v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-table-sparkline'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiXy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiTable v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-table'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiDonut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-donut'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiWaffle v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-waffle'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiRadar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-radar'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiQuadrant v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-quadrant'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiGauge v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-gauge'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiChestnut v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-chestnut'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiOnion v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-onion'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiVerticalBar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-vertical-bar'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiScreenshot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-screenshot'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiRating v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-rating'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSkeleton v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-skeleton'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSparkline v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkline'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiHeatmap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-heatmap'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiScatter v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-scatter'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiCandlestick v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-candlestick'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiAgePyramid v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-age-pyramid'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSparkbar v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkbar'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiDashboard v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-dashboard'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiAnnotator v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-annotator'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSmiley v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-smiley'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiRings v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-rings'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiRelationCircle v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-relation-circle'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiThermometer v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-thermometer'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSparkStackbar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-sparkstackbar'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSparkHistogram v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-sparkhistogram'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiWheel v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-wheel'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiTiremarks v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-tiremarks'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiDonutEvolution v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-donut-evolution'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiIcon v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-icon'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiMoodRadar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-mood-radar'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUi3dBar v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-3d-bar'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiDigits v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-digits'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiMolecule v-if="router.currentRoute.value.fullPath ===  '/docs#vue-ui-molecule'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiMiniLoader v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-mini-loader'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiNestedDonuts v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-nested-donuts'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiSparkgauge v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-sparkgauge'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiGalaxy v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-galaxy'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiKpi v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-kpi'"/>
            </Transition>
            <Transition name="fade">
                <DocVueUiTreemap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-treemap'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiTableHeatmap v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-table-heatmap'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiAccordion v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-accordion'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiQuickChart v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-quick-chart'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiCursor v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-cursor'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiSparkTrend v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-spark-trend'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiStripPlot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-strip-plot'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiDumbbell v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-dumbbell'" />
            </Transition>
            <Transition name="fade">
                <DocsVueUiWordCloud v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-word-cloud'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiXyCanvas v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-xy-canvas'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiFlow v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-flow'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiParallelCoordinatePlot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-parallel-coordinate-plot'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiTimer v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-timer'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiCarouselTable v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-carousel-table'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiGizmo v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-gizmo'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiStackbar :key="`stackbar_${stackbarKey}`" v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-stackbar'" @forceDocReload="stackbarKey += 1" />
            </Transition>
            <Transition name="fade">
                <DocVueUiBullet v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-bullet'" />
            </Transition>

            <Transition name="fade">
                <div v-if="['/docs', '/docs#list'].includes(router.currentRoute.value.fullPath)" class="flex flex-col place-items-center place-content-center">
                    <div class="w-full flex flex-col gap-4 place-items-center justify-center mb-6 mt-4">
                        <div class="flex flex-row gap-4 place-items-center">
                            <h1 class="text-[64px] sm:text-[96px] text-center">{{ translations.menu.docs[store.lang] }}</h1>
                        </div>
                    </div>
    <div class="flex flex-col sm:flex-row place-items-center gap-2 justify-center w-full mx-auto">
        <div class="flex flex-col gap-2 place-items-center place-content-center border-r border-gray-500 pr-6">
            <div class="text-xl sm:text-4xl w-full text-end">1 import</div>
            <div class="text-xl sm:text-4xl w-full text-end">3 props</div>
            <div class="text-xl sm:text-4xl w-full text-end">{{ Object.keys(mainConfig).length + 1 }} components</div>
        </div>
        
        <RouterLink class="w-[360px]" to="/universal-component">
        <div title="Checkout how to use the VueDataUi universal component" class="mx-auto  rounded-md py-1 px-6 sm:px-10">
    <pre>
    <code class="text-gray-500 text-md">
    &lt;<span class="dark:text-gray-200">VueDataUi</span>
        <span class="text-black dark:text-app-orange">component</span>="VueUi{{ currentShowcase }}"
        <span class="text-black dark:text-app-green">:dataset</span>="dataset"
        <span class="text-black dark:text-app-blue">:config</span>="config"
    /&gt;
    </code>
    </pre>
        </div>
        </RouterLink>
    </div>

    <div class="p-4 rounded-full gap-4 mx-auto flex flex-row justify-center bg-gray-200 dark:bg-[#FFFFFF10] w-fit">
        <button class="text-xs sm:text-lg rounded-full h-[48px] sm:h-[60px] px-3 sm:px-6 border border-app-green bg-[#42d39280] dark:bg-[#42d39220] flex flex-row place-items-center gap-4 hover:shadow-md hover:bg-[#42D392] dark:hover:bg-[#42D39230] transition-all">
            <a href="#list">
                {{  translations.availableComponents[store.lang] }}
            </a>
        </button>
        <RouterLink to="/examples/categories">
            <button class="text-xs sm:text-lg rounded-full h-[48px] sm:h-[60px] px-3 sm:px-6 border border-app-blue bg-[#5f8aee80] dark:bg-[#5f8aee20] flex flex-row place-items-center gap-4 hover:shadow-md hover:bg-[#5f8aee] dark:hover:bg-[#5f8aee30] transition-all">
                {{ translations.examplesAndVariations[store.lang] }}
            </button>
        </RouterLink>
    </div>
    
    <div dir="auto" class="w-full px-2 sm:px-0 max-w-[72ch] text-left mx-auto mb-12 mt-12 text-xs sm:text-lg">
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
                        <div dir="auto" class="mb-4">{{ translations.getTheme[store.lang] }}</div>
                        <code @click="copyContent" ref="copyConfigContent" class="bg-[#1A1A1A] text-gray-300 rounded-sm p-4 mb-4 w-full overflow-auto text-xs sm:text-sm relative cursor-pointer">
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
                                <div class="text-xs text-left mt-6 cursor-pointer bg-black text-green-300 px-6 py-4 rounded" @click="copyToClipboard(selectedTheme)">
                                    <div class="my-2 flex flex-row gap-2 place-items-center"><CopyIcon/>{{ translations.clickToCopy[store.lang] }}</div>
                                    <code>
                                        {{ selectedTheme }}
                                    </code>
                                </div>
                            </template>
                        </VueDataUi>
                    </div>
    
                    <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center border p-4 border-app-blue rounded-lg bg-[#5f8bee20]">
                        <div dir="auto" class="mb-4">{{ translations.getConfig[store.lang] }}</div>
                        <code @click="copyContent" ref="copyConfigContent" class="bg-[#1A1A1A] text-gray-300 rounded-sm p-4 mb-4 w-full overflow-auto text-xs sm:text-sm relative cursor-pointer">
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
                                <div class="text-xs text-left mt-6 cursor-pointer bg-black text-green-300 px-6 py-4 rounded" @click="copyToClipboard(selectedConfig)">
                                    <div class="my-2 flex flex-row gap-2 place-items-center"><CopyIcon/>{{ translations.clickToCopy[store.lang] }}</div>
                                    <code>
                                        {{ selectedConfig }}
                                    </code>
                                </div>
                            </template>
                        </VueDataUi>
                    </div>

                    <h2 id="list" class="pt-24 text-4xl">{{  translations.availableComponents[store.lang] }}</h2>

                    <div class="w-full max-w-[1000px] mx-auto mt-6 mb-4 text-xs sm:text-sm flex flex-col md:flex-row gap-6">
                    
                        <div  class="w-full border border-gray-400 bg-[#FFFFFF10] p-4 rounded-lg flex flex-col gap-6 place-items-center">
                        <div class="flex flex-row gap-6 place-items-center">
                            <div class="h-[40px] w-[40px] flex place-items-center justify-center">
                            <SquareRoundedLetterSIcon class="bg-white dark:bg-black rounded-md text-app-blue"/>
                            </div>
                            <div dir="auto">
                                {{ translations.slots.summary[store.lang] }}
                            </div>
                        </div>
                        <div class="flex flex-row gap-6 place-items-center">
                            <div class="h-[40px] w-[40px] flex place-items-center justify-center">
                            <SquareRoundedLetterLIcon class="bg-white dark:bg-black rounded-md text-app-orange"/>
                            </div>
                            <div dir="auto">
                                {{ translations.slots.legend[store.lang] }}
                            </div>
                        </div>
                            <div class="w-full flex justify-center">
                            <router-link to="/customization">
                                <button class="py-2 px-6 bg-app-blue text-white dark:text-black rounded shadow hover:outline hover:outline-gray-400">{{ translations.docs.example[store.lang] }}</button>
                            </router-link>
                            </div>
                        </div>
    
                        <div  class="w-full border border-gray-400 bg-[#FFFFFF10] p-4 rounded-lg flex flex-row gap-6 place-items-center">
                            <div class="h-[40px] w-[40px] flex place-items-center justify-center">
                            <SquareRoundedLetterTIcon class="bg-white dark:bg-black rounded-md text-app-green"/>
                            </div>
                            <div class="flex flex-col gap-2">
                                <div dir="auto">
                                    {{ translations.tableCss.summary[store.lang] }}
                                </div>
    
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

                    <BaseMenuCategory
                        v-for="cat in menuCategories"
                        :menuItems="menuItems"
                        v-bind="cat"
                    />
                </div>
            </Transition>
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