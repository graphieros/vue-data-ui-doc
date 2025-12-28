<script setup>
import {ref, computed, onMounted, defineAsyncComponent, watch } from "vue";
import SideMenu from '../components/SideMenu.vue';
import { useRouter } from "vue-router";
import { getVueDataUiConfig, getThemeConfig } from "vue-data-ui";
import { SquareRoundedLetterSIcon, SquareRoundedLetterTIcon, SquareRoundedLetterLIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import Schema from "../schema/Schema.vue";
import { useConfig } from "../assets/useConfig";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import BaseMenuCategory from "../components/BaseMenuCategory.vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import UserOptionsMenu from "../components/UserOptionsMenu.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
import { useIconMapUnderscore } from '../useIconMapUnderscore';
import { useMakerStore } from "../stores/maker";
import ChartSeeker from "../components/ChartSeeker.vue";
import BaseDragElement from "../components/BaseDragElement.vue";
import CodeParser from "../components/customization/CodeParser.vue";
import { useIconMap } from "../useIconMap";
import IconSettings from "../components/IconSettings.vue";
import BaseCard from "../components/BaseCard.vue";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseMenuPattern from "../components/BaseMenuPattern.vue";
import { useMenuItems } from "../components/useMenuItems";

const DocVueUiXy = defineAsyncComponent(() => import('../components/docs/DocVueUiXy.vue'));
const DocVueUiTable = defineAsyncComponent(() => import('../components/docs/DocVueUiTable.vue'));
const DocVueUiDonut = defineAsyncComponent(() => import('../components/docs/DocVueUiDonut.vue'));
const DocVueUiWaffle = defineAsyncComponent(() => import('../components/docs/DocVueUiWaffle.vue'));
const DocVueUiRadar = defineAsyncComponent(() => import('../components/docs/DocVueUiRadar.vue'));
const DocVueUiQuadrant = defineAsyncComponent(() => import('../components/docs/DocVueUiQuadrant.vue'));
const DocVueUiGauge = defineAsyncComponent(() => import('../components/docs/DocVueUiGauge.vue'));
const DocVueUiChestnut = defineAsyncComponent(() => import('../components/docs/DocVueUiChestnut.vue'));
const DocVueUiOnion = defineAsyncComponent(() => import('../components/docs/DocVueUiOnion.vue'));
const DocVueUiHorizontalBar = defineAsyncComponent(() => import('../components/docs/DocVueUiHorizontalBar.vue'));
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
const DocVueUiStackline = defineAsyncComponent(() => import('../components/docs/DocVueUiStackline.vue'));
const DocVueUiBullet = defineAsyncComponent(() => import('../components/docs/DocVueUiBullet.vue'));
const DocVueUiFunnel = defineAsyncComponent(() => import('../components/docs/DocVueUiFunnel.vue'));
const DocVueUiHistoryPlot = defineAsyncComponent(() => import('../components/docs/DocVueUiHistoryPlot.vue'));
const DocUtilityFunctions = defineAsyncComponent(() => import('../components/docs/DocUtilityFunctions.vue'));
const DocVueUiCirclePack = defineAsyncComponent(() => import('../components/docs/DocVueUiCirclePack.vue'));
const DocVueUiWorld = defineAsyncComponent(() => import('../components/docs/DocVueUiWorld.vue'));
const DocVueUiRidgeline = defineAsyncComponent(() => import('../components/docs/DocVueUiRidgeline.vue'));
const DocVueUiChord = defineAsyncComponent(() => import('../components/docs/DocVueUiChord.vue'));
const DocVueUiDag = defineAsyncComponent(() => import('../components/docs/DocVueUiDag.vue'));
const DocVueUiGeo = defineAsyncComponent(() => import('../components/docs/DocVueUiGeo.vue'));

const mainConfig = useConfig()

const store = useMainStore();
const translations = computed(() => {
    return store.translations;
})

const makerStore = useMakerStore();
const makerTranslations = computed(() => makerStore.translations);

const isDarkMode = computed(() => store.isDarkMode);

const router = useRouter();
const isOpen = ref(window.innerWidth > 768);

const docsCrumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    }
])

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
            "vue_ui_world"
        ].includes(key)
    });
});

const chartKeys = computed(() => {
    return Object.keys(mainConfig).toSorted().filter(key => {
        return ![
            "vue_ui_accordion",
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
const selectedTheme = ref(null)

const selectedConfig = computed(() => {
    return getVueDataUiConfig(configSelect.value)
});

watch(themeSelect, async (type) => {
    selectedTheme.value = await getThemeConfig(type)
}, { immediate: true })

const { menuItems, menuCategories } = useMenuItems()

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    const hash = router.currentRoute.value.hash ? router.currentRoute.value.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null

    const hashLink = router.currentRoute.value.hash ? `/docs${router.currentRoute.value.hash}` : null;
    if (docsCrumbs.value.length === 1) {
        docsCrumbs.value.push({
            description: router.currentRoute.value.hash === '#utility-functions' ? translations.value.utilityFunctions[store.lang] : hash,
            icon: router.currentRoute.value.hash === '#utility-functions' ? 'func' : !hashLink ? undefined : menuItems.value.find(m => m.link === hashLink) ? menuItems.value.find(m => m.link === hashLink).icon : ''
        })
    } else {
        docsCrumbs.value[1] = {
            description: router.currentRoute.value.hash === '#utility-functions' ? translations.value.utilityFunctions[store.lang] : hash,
            icon: router.currentRoute.value.hash === '#utility-functions' ? 'func' : !hashLink ? undefined : menuItems.value.find(m => m.link === hashLink) ? menuItems.value.find(m => m.link === hashLink).icon : ''
        }
    }
}

watch(() => router.currentRoute.value, updateCrumb, { deep: true, immediate: true });
watch(() => store.lang, updateCrumb, { deep: true });

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

onMounted(() => {
    playShowcase();
});

const stackbarKey = ref(0);

</script>

<template>
    <BackgroundPattern v-if="isDarkMode">
        <template #defs>
            <BaseMenuPattern
                menu="docs"
                id="pat"
                stroke="#42d392"
                patternTransform="scale(0.2)"
            />
        </template>
    </BackgroundPattern>
    <BaseCrumbs :tree="docsCrumbs" class="z-20"/>
    
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
                <DocVueUiHorizontalBar v-if="['/docs#vue-ui-horizontal-bar', '/docs#vue-ui-vertical-bar'].includes(router.currentRoute.value.fullPath)"/>
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
                <DocVueUiStackline v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-stackline'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiBullet v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-bullet'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiFunnel v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-funnel'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiHistoryPlot v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-history-plot'" />
            </Transition>
            <Transition name="fade">
                <DocUtilityFunctions v-if="router.currentRoute.value.fullPath === '/docs#utility-functions'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiCirclePack v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-circle-pack'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiWorld v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-world'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiRidgeline v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-ridgeline'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiChord v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-chord'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiDag v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-dag'" />
            </Transition>
            <Transition name="fade">
                <DocVueUiGeo v-if="router.currentRoute.value.fullPath === '/docs#vue-ui-geo'" />
            </Transition>

            <Transition name="fade">
                <div v-if="['/docs', '/docs#list'].includes(router.currentRoute.value.fullPath)" class="flex flex-col place-items-center place-content-center">

                    <div class="w-full flex flex-col gap-4 place-items-center justify-center mb-2 mt-4">
                        <div class="flex flex-row gap-4 place-items-center">
                            <IconSettings :size="80" stroke="#42d392" class="hidden md:block"/>
                            <h1 class="font-inter-bold text-[48px] sm:text-[72px] text-center" style="letter-spacing: -1px;">{{ translations.menu.docs[store.lang] }}</h1>
                        </div>
                    </div>
    <div class="flex flex-col sm:flex-row place-items-center gap-2 justify-center w-full mx-auto">
        <div class="font-inter-medium flex flex-col gap-2 place-items-center place-content-center border-r border-gray-500 pr-6" style="letter-spacing: -1px;">
            <div class="text-xl sm:text-4xl w-full text-end">1 import</div>
            <div class="text-xl sm:text-4xl w-full text-end">3 props</div>
            <div class="text-xl sm:text-4xl w-full text-end">{{ Object.keys(mainConfig).length }} components</div>
        </div>
        
        <RouterLink class="w-[360px]" to="/universal-component">
        <div title="Checkout how to use the VueDataUi universal component" class="mx-auto rounded-md py-1 px-6 sm:px-10">
    <pre>

    <code class="text-gray-500 text-md relative">
        <VueUiIcon :name="useIconMap(`VueUi${currentShowcase}`)" class="absolute top-1/2 animate-pulse" :size="32" :stroke="isDarkMode ? '#6A6A6A' : '#1A1A1A'"/>
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

    <div class="p-4 rounded-full gap-4 mx-auto flex flex-row justify-center bg-gray-100 dark:bg-[#2A2A2A] w-fit shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
        <button class="text-xs sm:text-lg rounded-full h-[48px] sm:h-[60px] px-3 sm:px-6 border border-app-green bg-app-green-light-extra dark:bg-[#42d39220] flex flex-row place-items-center gap-4 hover:shadow-md hover:bg-app-green-light dark:hover:bg-[#42D39230] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
            <a href="#list">
                {{  translations.availableComponents[store.lang] }}
            </a>
        </button>
        <RouterLink to="/examples/categories">
            <button class="text-xs sm:text-lg rounded-full h-[48px] sm:h-[60px] px-3 sm:px-6 border border-app-blue bg-app-blue-light dark:bg-[#5f8aee20] flex flex-row place-items-center gap-4 hover:shadow-md hover:bg-app-blue-mid dark:hover:bg-[#5f8aee30] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
                {{ translations.examplesAndVariations[store.lang] }}
            </button>
        </RouterLink>
    </div>
    
    <div dir="auto" class="w-full px-2 sm:px-0 max-w-[72ch] text-left mx-auto mb-12 mt-12 text-xs sm:text-lg">
        {{ translations.docs.p1[store.lang] }}
    </div>

    <div class="w-full">
        <ChartSeeker/>
    </div>

    <BaseCard class="w-full max-w-[1000px] mt-6 z-1">
        <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center p-4 rounded-lg">
            <div class="w-full text-left text-lg">
                {{ translations.overview.title[store.lang] }}
            </div>
            <div class="mt-4 flex flex-row gap-1 w-full justify-center border-b border-gray-600 pb-4 mb-4">
                <div class="flex flex-col gap-1">
                    <label for="schemaSelect">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>
                    <BaseDropdown
                        :options="chartKeys.map(k => {
                            return {
                                name: k,
                                icon: useIconMapUnderscore(k)
                            }
                        })"
                        v-model:value="schemaSelect"
                        background="bg-white dark:bg-[#1A1A1A]"
                        optionTarget="name"
                        additionalOptionTarget="name"
                        id="schemaSelect"
                    >
                        <template #selected="{ selectedOption }">
                            <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                                <div class="h-[24px] w-[24px] flex place-items-center">
                                    <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                                </div>
                                <div class="text-[17px]">
                                    <span :class="'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                    <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.name.replace('vue_ui_', '') }}</span>
                                </div>
                            </div>
                        </template>
                        <template #option="{ option, selected, current }">
                            <div class="text-left flex flex-row gap-2 place-items-center">
                                <div class="h-[20px] w-[20px] flex place-items-center">
                                    <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                                </div>
                                <div>
                                    <span :class="selected || current ? `text-white` : 'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                    <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('vue_ui_', '') }}</span>
                                </div>
                            </div>
                        </template>
                    </BaseDropdown>
                </div>
            </div>
            <Schema :component="schemaSelect"/>
        </div>
    </BaseCard>

    <BaseCard class="w-full max-w-[1000px] mt-6 z-3">
        <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center p-4 rounded-lg">
            <div dir="auto" class="mb-4">{{ translations.getTheme[store.lang] }}</div>
            <CodeParser
                language="javascript"
                :content="`
    import { getThemeConfig } from 'vue-data-ui';
    const ${themeSelect.replace('vue_ui_', '').replace('3d', 'three_d')}_themes = await getThemeConfig('${themeSelect}')
                `"
                @copy="store.copy()"
            />
            <div class="mt-4 flex flex-row gap-1 w-full justify-center border-b border-gray-600 pb-4 mb-4">
            <div class="flex flex-col gap-1">
                <label for="themeSelect">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>
                <BaseDropdown
                    :options="themeKeys.map(k => {
                        return {
                            name: k,
                            icon: useIconMapUnderscore(k)
                        }
                    })"
                    v-model:value="themeSelect"
                    background="bg-white dark:bg-[#1A1A1A]"
                    optionTarget="name"
                    additionalOptionTarget="name"
                    id="themeSelect"
                >
                    <template #selected="{ selectedOption }">
                        <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                            <div class="h-[24px] w-[24px] flex place-items-center">
                                <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                            </div>
                            <div class="text-[17px]">
                                <span :class="'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.name.replace('vue_ui_', '') }}</span>
                            </div>
                        </div>
                    </template>
                    <template #option="{ option, selected, current }">
                        <div class="text-left flex flex-row gap-2 place-items-center">
                            <div class="h-[20px] w-[20px] flex place-items-center">
                                <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                            </div>
                            <div>
                                <span :class="selected || current ? `text-white` : 'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('vue_ui_', '') }}</span>
                            </div>
                        </div>
                    </template>
                </BaseDropdown>
            </div>
        </div>
    
            <VueDataUi class="w-full" component="VueUiAccordion" :config="{
                maxHeight: 20000,
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
                    <CodeParser
                        language="javascript"
                        :content="JSON.stringify(selectedTheme, null, 2)"
                        @copy="store.copy()"
                    />
                </template>
            </VueDataUi>
        </div>
    </BaseCard>
    
    <BaseCard class="w-full max-w-[1000px] mt-6 z-2">
        <div class="w-full max-w-[1000px] mx-auto mt-4 text-xs sm:text-sm flex flex-col place-items-center p-4">
            <div dir="auto" class="mb-4">{{ translations.getConfig[store.lang] }}</div>
            <CodeParser
                language="javascript"
                :content="`
    import { getVueDataUiConfig } from 'vue-data-ui';
    const ${configSelect.replace('vue_ui_', '').replace('3d', 'three_d')}_config = getVueDataUiConfig('${configSelect}')
                `"
                @copy="store.copy()"
            />
    
            <div class="mt-4 flex flex-row gap-1 w-full justify-center border-b border-gray-600 pb-4 mb-4">
            <div class="flex flex-col gap-1">
                <label for="configSelect">{{ makerTranslations.labels.selectChartType[store.lang] }}</label>
                <BaseDropdown
                    :options="configKeys.map(k => {
                        return {
                            name: k,
                            icon: useIconMapUnderscore(k)
                        }
                    })"
                    v-model:value="configSelect"
                    background="bg-white dark:bg-[#1A1A1A]"
                    optionTarget="name"
                    additionalOptionTarget="name"
                    id="configSelect"
                >
                    <template #selected="{ selectedOption }">
                        <div v-if="selectedOption" class="text-left flex flex-row gap-2 place-items-center">
                            <div class="h-[24px] w-[24px] flex place-items-center">
                                <VueUiIcon :name="selectedOption.icon" :size="24" stroke="#5f8aee" />
                            </div>
                            <div class="text-[17px]">
                                <span :class="'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                <span :class=" 'dark:text-app-blue-light'">{{ selectedOption.name.replace('vue_ui_', '') }}</span>
                            </div>
                        </div>
                    </template>
                    <template #option="{ option, selected, current }">
                        <div class="text-left flex flex-row gap-2 place-items-center">
                            <div class="h-[20px] w-[20px] flex place-items-center">
                                <VueUiIcon :name="option.icon" :size="20" :stroke="isDarkMode ? (selected || current) ? '#FFFFFF' : '#8A8A8A' : (selected || current) ? '#FFFFFF' :  '#1A1A1A'" />
                            </div>
                            <div>
                                <span :class="selected || current ? `text-white` : 'text-gray-500 dark:text-app-blue'">vue_ui_</span>
                                <span :class="selected || current ? `text-white`: 'dark:text-app-blue-light'">{{ option.name.replace('vue_ui_', '') }}</span>
                            </div>
                        </div>
                    </template>
                </BaseDropdown>
            </div>
        </div>
    
            <VueDataUi class="w-full" component="VueUiAccordion" :config="{
                maxHeight: 50000,
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
                    <CodeParser
                        language="javascript"
                        :content="JSON.stringify(selectedConfig, null, 2)"
                        @copy="store.copy()"
                    />
                </template>
            </VueDataUi>
        </div>
    </BaseCard>
    
    <h2 id="list" class="pt-24 text-4xl">{{  translations.availableComponents[store.lang] }}</h2>

    <div class="w-full max-w-[1000px] mx-auto mt-6 mb-4 text-xs sm:text-sm flex flex-col md:flex-row gap-6 z-1">
        
        <BaseCard class="w-full">
            <div  class="w-full p-4 rounded-lg flex flex-col gap-6 place-items-center">
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
                        <button class="py-2 px-6 bg-app-blue text-white dark:text-black rounded-full hover:outline hover:outline-gray-400 shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#CCCCCC,0_4px_6px_rgba(0,0,0,0.5)]">{{ translations.docs.example[store.lang] }}</button>
                    </router-link>
                </div>
            </div>
        </BaseCard>

        <BaseCard class="w-full">
            <div class="w-full p-4 rounded-lg flex flex-row gap-6 place-items-center">
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
        </BaseCard>

    </div>

                    <BaseMenuCategory
                        v-for="cat in menuCategories"
                        :menuItems="menuItems"
                        v-bind="cat"
                    />
                </div>
            </Transition>

            <UserOptionsMenu v-if="['/docs', '/docs#list'].includes(router.currentRoute.value.fullPath)" />

            <!-- <DocsComponentMenu v-if="['/docs', '/docs#list'].includes(router.currentRoute.value.fullPath)"/> -->

            <BaseDragElement 
                snap-on-resize 
                snap-on-load 
                v-show="store.docSnap && router.currentRoute.value.fullPath.includes('/docs#vue')"
                backgroundColor="bg-gray-150 dark:bg-[#242424]"
                clip
                :startTop="170"
            >
                <div id="docSnap" class="max-w-[350px] max-h-[800px] overflow-hidden rounded-xl pb-2"/>
            </BaseDragElement>
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
    background: radial-gradient(at top left, #5f8aee20, transparent, transparent);
}
</style>