<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiGeoConfigFields from "./configuration/VueUiGeoConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiGeo from "../themes/ThemesVueUiGeo.vue";
import FRANCE from "../../resources/FRANCE.json";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import ComponentEmits from "../ComponentEmits.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";

const mainConfig = useConfig();
const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Paris",
        coordinates: [2.3522, 48.8566], // longitude, latitude
        description: "Capital of France",
        color: "#E63946",
        radius: 2,
        dix: "wut",
    },
    {
        name: "Lyon",
        coordinates: [4.8357, 45.764],
        description: "Auvergne-Rhône-Alpes",
        color: "#457B9D",
        radius: 1,
    },
    {
        name: "Marseille",
        coordinates: [5.3698, 43.2965],
        description: "Provence-Alpes-Côte d’Azur",
        color: "#2A9D8F",
        radius: 0.8,
    },
    {
        name: "Bordeaux",
        coordinates: [-0.5792, 44.8378],
        description: "Nouvelle-Aquitaine",
        color: "#F4A261",
        radius: 0.7,
    },
    {
        name: "Lille",
        coordinates: [3.0573, 50.6292],
        description: "Hauts-de-France",
        color: "#8D99AE",
        radius: 0.5,
    },
]);

const projections = ref([
    "aitoff",
    "azimuthalEquidistant",
    "bonne",
    "equirectangular",
    "gallPeters",
    "globe",
    "hammer",
    "mercator",
    "mollweide",
    "robinson",
    "sinusoidal",
    "vanDerGrinten",
    "winkelTripel",
]);

const currentProjection = ref("equirectangular");

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            loading: false,
            debug: false,
            responsive: false,
            projection: currentProjection.value,
            theme: "",
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    img: true,
                    svg: true,
                    fullscreen: true,
                    annotator: true,
                    zoom: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    img: "Download PNG",
                    svg: "Download SVG",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                    zoom: "Toggle zoom lock",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            map: { geoJson: FRANCE, center: [0, 0], fitPadding: 24 },
            events: {
                datapointEnter: null,
                datapointLeave: null,
                datapointClick: null,
                territoryEnter: null,
                territoryLeave: null,
                territoryClick: null,
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    dimensions: { width: null, height: null },
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    territory: {
                        fill: isDarkMode.value ? "#2A2A2A" : "#F2F3F5",
                        stroke: isDarkMode.value ? "#5A5A5A" : "#D0D4D8",
                        strokeWidth: 1,
                        hover: {
                            enabledWhenEmpty: false,
                            fill: isDarkMode.value ? "#3A3A3A" : "#E7E1EE",
                            stroke: isDarkMode.value ? "#6A6A6A" : "#CCCCCC",
                            strokeWidth: 1.5,
                        },
                    },
                    points: {
                        radius: 1,
                        stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        strokeWidth: 1,
                        fill: isDarkMode.value ? "#CCCCCC" : "#4A4A4A",
                        hoverRadiusRatio: 1.2,
                        labels: {
                            show: true,
                            fontSizeRatio: 1,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            offsetY: 0,
                        },
                    },
                    controls: {
                        position: "bottom",
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#E1E5E8",
                        buttonColor: isDarkMode.value ? "#2A2A2A" : "#E1E5E8",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        border: isDarkMode.value
                            ? `1px solid #4A4A4A`
                            : `1px solid #CCCCCC`,
                        padding: `0.5rem`,
                        borderRadius: `0.25rem`,
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "Subtitle",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        fontSize: 14,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#5A5A5A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: 30,
                        position: "center",
                        offsetY: 24,
                        offsetX: 0,
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
                    },
                    zoom: { active: true },
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode();

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const dsTypeCode = ref(`type VueUiGeoDatasetItem = {
    [key: string]: any;
    name: string;
    coordinates: [longitude: number, latitude: number];
    description?: string;
    color?: string;
    radius?: number;
}`);

const codeDataset = ref(`const dataset: VueUiGeoDatasetItem[] = [
    {
        name: "Paris",
        coordinates: [2.3522, 48.8566], // longitude, latitude
        description: "Capital of France",
        color: "#E63946",
        radius: 1,
        dix: 'wut',
    },
    {
        name: "Lyon",
        coordinates: [4.8357, 45.7640],
        description: "Auvergne-Rhône-Alpes",
        color: "#457B9D",
        radius: 1,
    },
    {
        name: "Marseille",
        coordinates: [5.3698, 43.2965],
        description: "Provence-Alpes-Côte d’Azur",
        color: "#2A9D8F",
        radius: 1,
    },
    {
        name: "Bordeaux",
        coordinates: [-0.5792, 44.8378],
        description: "Nouvelle-Aquitaine",
        color: "#F4A261",
        radius: 1,
    },
    {
        name: "Lille",
        coordinates: [3.0573, 50.6292],
        description: "Hauts-de-France",
        color: "#8D99AE",
        radius: 1,
    },
]`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiGeo" />
        <BaseDocDescription
            :text="translations.docs.tooltips.geo[store.lang]"
        />
        <BaseDocHeaderActions
            targetLink="vue-ui-geo"
            :configSource="mainConfig.vue_ui_geo"
        />

        <div :class="`mx-auto max-w-[600px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiGeo :dataset="dataset" :config="config" :key="key" />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-geo" />
        </div>

        <Rater itemId="vue_ui_geo" />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            schema="vue_ui_geo"
        >
            <template #tab0>
                The component also works without dataset.
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="dsTypeCode"
                        :title="translations.docs.datastructure[store.lang]"
                        class="my-6"
                    />
                </div>
                <div class="w-full overflow-x-auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset"
                        :title="translations.docs.example[store.lang]"
                    />
                </div>
            </template>

            <template #tab1>
                <DebugHint component="VueUiGeo" configType="VueUiGeoConfig" />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiGeoConfig</code>
                </div>
                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <VueUiGeoConfigFields
                        :config="config"
                        :context="{ projections, setActiveTab }"
                    />
                </code>
            </template>

            <template #tab2>
                <ComponentEmits component="VueUiGeo" :names="['copyAlt']" />

                <ExposedMethods
                    component="VueUiGeo"
                    getImage
                    :names="[
                        'toggleTooltip',
                        'toggleAnnotator',
                        'toggleFullscreen',
                        'generatePdf',
                        'generateImage',
                        'generateSvg',
                        'resetZoom',
                        'zoomIn',
                        'zoomOut',
                        'focusLocation',
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiGeo"
                    :types="[
                        'hint',
                        'datapoint',
                        'svg',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-geo.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiGeo />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueUiGeo
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'fullscreen',
                        'img',
                        'pdf',
                        'svg',
                        'zoom',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
