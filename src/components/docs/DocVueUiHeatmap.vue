<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiHeatmapConfigFields from "./configuration/VueUiHeatmapConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiHeatmap from "../themes/ThemesVueUiHeatmap.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
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
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
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

function initDataset() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const arr = [];
    const dsLen = 26;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
            values.push(i + j * 2);
        }
        arr.push({
            name: `${days[i]}`,
            values,
        });
    }
    return arr;
}

const dataset = ref(initDataset());

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontFamily: "inherit",
                layout: {
                    height: 300,
                    width: 1000,
                    padding: { top: 0, right: 0, bottom: 0, left: 0 },
                    crosshairs: {
                        show: false,
                        stroke: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        strokeWidth: 1,
                        strokeDasharray: 0,
                    },
                    cells: {
                        scaleMax: null,
                        scaleMin: null,
                        rowTotal: {
                            value: { show: true },
                            color: { show: true },
                        },
                        columnTotal: {
                            value: {
                                show: true,
                                offsetX: 0,
                                offsetY: 16,
                                rotation: 0,
                                autoRotate: { enable: true, angle: -30 },
                            },
                            color: { show: true },
                        },
                        value: {
                            show: true,
                            fontSize: 12,
                            bold: false,
                            roundingValue: 0,
                            color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                        },
                        colors: {
                            hot: "#ff6400",
                            cold: "#5f8bee",
                            underlayer: isDarkMode.value
                                ? "#1A1A1A"
                                : "#F3F4F6",
                        },
                        spacing: 0.5,
                        selected: {
                            border: 2,
                            color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                        },
                    },
                    dataLabels: {
                        prefix: "",
                        suffix: "",
                        xAxis: {
                            show: true,
                            values: [
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                            ],
                            datetimeFormatter: {
                                enable: false,
                                locale: "en",
                                useUTC: false,
                                januaryAsYear: false,
                                options: {
                                    year: "yyyy",
                                    month: `MMM 'yy`,
                                    day: "dd MMM",
                                    hour: "HH:mm",
                                    minute: "HH:mm:ss",
                                    second: "HH:mm:ss",
                                },
                            },
                            fontSize: 12,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            offsetX: 0,
                            offsetY: 0,
                            showOnlyAtModulo: null,
                            rotation: 0,
                            autoRotate: { enable: true, angle: -30 },
                        },
                        yAxis: {
                            show: true,
                            values: [],
                            fontSize: 12,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            offsetY: 0,
                            offsetX: 0,
                        },
                    },
                },
                title: {
                    text: "Title",
                    color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: isDarkMode.value ? "#A1A1A1" : "#565656",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
                legend: {
                    show: true,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 12,
                    bold: true,
                    roundingValue: 0,
                    width: 24,
                },
                tooltip: {
                    teleportTo: "body",
                    show: true,
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 14,
                    roundingValue: 0,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: "center",
                    offsetY: 24,
                    offsetX: 0,
                    smooth: true,
                    smoothForce: 0.18,
                    smoothSnapThreshold: 0.25,
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
                    tooltip: true,
                    pdf: true,
                    img: true,
                    csv: true,
                    table: true,
                    fullscreen: true,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    tooltip: "Toggle tooltip",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    table: "Toggle table",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                colNames: { xAxis: "Week" },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                    roundingValue: 0,
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
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

function randomizeData() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const arr = [];
    const dsLen = 26;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
            values.push(Math.random() * 100);
        }
        arr.push({
            name: `${days[i]}`,
            values,
        });
    }
    dataset.value = arr;
}

const dsTypeCode = computed(() => {
    return `type VueUiHeatmapDatasetItem = {
  name: string
  values: number[]
}`;
});

const codeDataset = ref(`const dataset: VueUiHeatmapDatasetItem[] = [
    {
        name: "Mon",
        values: [31, 58, 12, 25, 13]
    },
    {
        name: "Tue",
        values: [3, 12, 7, 9, 15, 27]
    },
    {
        name: "Wed",
        values: [8, 9, 3, 18, 11, 7]
    }
];`);

/**
 * {
    "side": "up",
    "color": "#be4133",
    "ratio": 0.6428571428571429,
    "value": 46,
    "yAxisName": "Fri",
    "xAxisName": 21,
    "id": "vue-data-ui-heatmap-cell-77e48fa5-4062-43ad-9d8f-b8d88f074c1d"
}
 */

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route);
}

const customFormatCode =
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiHeatmap" />

        <BaseDocDescription
            :text="translations.docs.tooltips.heatmap[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-heatmap"
            targetMaker="VueUiHeatmap"
            :configSource="mainConfig.vue_ui_heatmap"
        />

        <div :class="`transition-all mx-auto`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiHeatmap
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-heatmap" />
        </div>

        <Rater itemId="vue_ui_heatmap" />

        <BaseMigrationInfo autoRotate debug padding heatmapSize />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showThemes
            showCallbacks
            showResponsive
            schema="vue_ui_heatmap"
            signInfo="both"
        >
            <template v-slot:dataset>
                <div class="w-full overflow-x-auto">
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
            <template v-slot:configuration>
                <DebugHint
                    component="VueUiHeatmap"
                    configType="VueUiHeatmapConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiHeatmapConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiHeatmapConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiHeatmap"
                    :names="['selectDatapoint', 'copyAlt']"
                />
                <ExposedMethods
                    component="VueUiHeatmap"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiHeatmap"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-heatmap.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>
            <template #custom-tooltip>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.tooltip.customFormat</code
                >
                <CodeParser
                    class="mt-4"
                    language="javascript"
                    :content="customFormatCode"
                />

                <h3 class="my-4">
                    {{ translations.customFormatCss[store.lang] }}
                </h3>
                <CodeParser
                    language="css"
                    content=".vue-data-ui-custom-tooltip{ }"
                />
            </template>

            <template #themes>
                <ThemesVueUiHeatmap />
            </template>

            <template #responsive>
                <ResponsiveUnit height="200px">
                    <template #chart>
                        <VueUiHeatmap
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'pdf',
                        'table',
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>

<style>
.vue-ui-heatmap rect {
    transition: all 0.2s ease-in-out !important;
}
</style>
