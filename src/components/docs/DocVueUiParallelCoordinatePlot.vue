<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiParallelCoordinatePlotConfigFields from "./configuration/VueUiParallelCoordinatePlotConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiParallelCoordinatePlot from "../themes/ThemesVueUiParallelCoordinatePlot.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
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
const hintPin = computed(() => store.hints.pin);
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
        name: "Series 1",
        shape: "triangle",
        series: [
            {
                name: "Item 1.1",
                values: [1200, 300, 12, 1.2],
            },
            {
                name: "Item 1.2",
                values: [1000, 100, 10, 1],
            },
            {
                name: "Item 1.3",
                values: [-800, 85, 8.5, 0.85],
            },
        ],
    },
    {
        name: "Series 2",
        series: [
            {
                name: "Item 2.1",
                values: [2300, 230, 23, 2.3],
                comments: ["", "A comment for this specific datapoint", "", ""],
            },
            {
                name: "Item 2.2",
                values: [2500, 250, 25, 2.5],
            },
            {
                name: "Item 2.3",
                values: [2800, 280, 28, 2.8],
            },
        ],
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            responsiveProportionalSizing: true,
            theme: "",
            useCssAnimation: true,
            customPalette: [],
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            transitions: {
                enable: true,
                pauseOnLoad: true,
                pauseOnDatasetChange: false,
                activationDelayMs: 300,
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
                    labels: true,
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
                    labels: "Toggle labels",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 600,
                    width: 1000,
                    padding: { top: 0, left: 0, right: 0, bottom: 0 },
                    lines: { smooth: true, strokeWidth: 2, opacity: 0.8 },
                    plots: { show: true, radius: 6, opacity: 0.8 },
                    yAxis: {
                        scaleTicks: 10,
                        stroke: isDarkMode.value ? "#4A4A4A" : "#2D353C",
                        strokeWidth: 1,
                        labels: {
                            showAxisNames: true,
                            axisNames: ["KPI 1", "KPI 2", "KPI 3", "KPI 4"],
                            axisNamesRotation: 0,
                            axisNamesAutoRotate: { enable: true, angle: -30 },
                            axisNamesColor: isDarkMode.value
                                ? "#8A8A8A"
                                : "#2D353C",
                            axisNamesFontSize: 16,
                            axisNamesBold: true,
                            roundings: [0, 0, 0, 2],
                            prefixes: ["$", "", "", ""],
                            suffixes: ["", "", "%", "°"],
                            ticks: {
                                show: true,
                                fontSize: 14,
                                color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                                bold: false,
                                offsetX: 0,
                                offsetY: 0,
                            },
                            datapoints: {
                                show: true,
                                fontSize: 14,
                                useSerieColor: true,
                                color: "#2D353C",
                                offsetX: 0,
                                offsetY: 0,
                                bold: true,
                            },
                        },
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
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
                    comments: {
                        show: true,
                        showInTooltip: true,
                        width: 200,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    legend: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        show: true,
                        fontSize: 16,
                        bold: false,
                        position: "bottom",
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                    },
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFF",
                        fontSize: 14,
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
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                columnNames: { series: "Series", item: "Item" },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
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
    dataset.value[0].series[0].values = [
        Math.random() * 1000,
        Math.random() * 300,
        Math.random() * 50,
        Math.random() * 2,
    ];
    dataset.value[0].series[1].values = [
        Math.random() * 900,
        Math.random() * 250,
        Math.random() * 45,
        Math.random() * 2,
    ];
    dataset.value[0].series[2].values = [
        Math.random() * 800,
        Math.random() * 200,
        Math.random() * 40,
        Math.random() * 1.5,
    ];

    dataset.value[1].series[0].values = [
        Math.random() * 2000,
        Math.random() * 600,
        Math.random() * 100,
        Math.random() * 4,
    ];
    dataset.value[1].series[1].values = [
        Math.random() * 2200,
        Math.random() * 700,
        Math.random() * 150,
        Math.random() * 5,
    ];
    dataset.value[1].series[2].values = [
        Math.random() * 2500,
        Math.random() * 800,
        Math.random() * 200,
        Math.random() * 7,
    ];
}

const dsTypeCode = computed(() => {
    return `type VueUiParallelCoordinatePlotDatasetItem = {
    name: string
    shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star"
    series: Array<{
        name: string;
        values: number[]
    }>
}`;
});

const codeDataset =
    ref(`const dataset: VueUiParallelCoordinatePlotDatasetItem[] = [
    {
        name: "Series 1",
        shape: "triangle",
        series: [
            {
                name: 'Item 1.1',
                values: [1200, 300, 12, 1.2]
            },
            {
                name: 'Item 1.2',
                values: [1000, 100, 10, 1]
            },
            {
                name: 'Item 1.3',
                values: [-800, 85, 8.5, 0.85]
            },
        ]
    },
    {
        name: "Series 2",
        series: [
            {
                name: 'Item 2.1',
                values: [2300, 230, 23, 2.3]
            },
            {
                name: 'Item 2.2',
                values: [2500, 250, 25, 2.5]
            },
            {
                name: 'Item 2.3',
                values: [2800, 280, 28, 2.8]
            },
        ]
    }
]`);

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
    ref(`customFormat: ({ serie, seriesIndex, series, config, scales }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiParallelCoordinatePlot" />

        <BaseDocDescription
            :text="translations.docs.tooltips.pcp[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-parallel-coordinate-plot"
            targetMaker="VueUiParallelCoordinatePlot"
            :configSource="mainConfig.vue_ui_parallel_coordinate_plot"
        />

        <div :class="`transition-all mx-auto w-full sm:w-3/4`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiParallelCoordinatePlot"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    >
                        <template #plot-comment="{ plot }">
                            <div :style="`width: 100%;`">
                                {{ plot.comment }}
                            </div>
                        </template>
                    </VueDataUi>
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
            <Rater itemId="vue_ui_parallel_coordinate_plot" />
        </div>

        <BaseMigrationInfo autoRotate cssAnimation debug padding />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showThemes
            showResponsive
            showCallbacks
            schema="vue_ui_parallel_coordinate_plot"
            signInfo="both"
        >
            <template #tab0>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :title="translations.docs.datastructure[store.lang]"
                        :content="dsTypeCode"
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
                <DebugHint
                    component="VueUiParallelCoordinatePlot"
                    configType="VueUiParallelCoordinatePlotConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue"
                        >VueUiParallelCoordinatePlotConfig</code
                    >
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiParallelCoordinatePlotConfigFields
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

            <!-- EMITS -->
            <template #tab2>
                <ComponentEmits
                    component="VueUiParallelCoordinatePlot"
                    :names="['selectLegend', 'selectDatapoint', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiParallelCoordinatePlot"
                    showHideSeries
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                        'toggleLabels',
                    ]"
                />

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const pcpChart = ref(null);
            const pcpDataset = ref([]);

            onMounted(async () => {
                pcpDataset.value = await pcpChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiParallelCoordinatePlot
                ref="pcpChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiParallelCoordinatePlot
                ref="pcpChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        pcpDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.pcpDataset = await this.$refs.pcpChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                    <ExposedMethods
                        component="VueUiParallelCoordinatePlot"
                        getImage
                        showHideSeries
                        :names="[
                            'generatePdf',
                            'generateCsv',
                            'generateImage',
                            'generateSvg',
                            'toggleTable',
                            'toggleLabels',
                        ]"
                    />
                </div>
            </template>

            <!-- SLOTS -->
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiParallelCoordinatePlot"
                    :types="[
                        'hint',
                        'svg',
                        'plot-comment',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-parallel-coordinate-plot.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <!-- TOOLTIP -->
            <template #tab4>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.chart.tooltip.customFormat</code
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

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiParallelCoordinatePlot />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi
                            component="VueUiParallelCoordinatePlot"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'csv',
                        'fullscreen',
                        'img',
                        'labels',
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
