<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiDonutConfigFields from "./configuration/VueUiDonutConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import UcDonut from "../useCases/uc-donut.vue";
import ThemesVueUiDonut from "../themes/ThemesVueUiDonut.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import SsrGeneration from "../SsrGeneration.vue";
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
        name: "Serie 1",
        values: [100],
        color: "#ff7f0e",
    },
    {
        name: "Serie 2",
        values: [200],
        color: "#aec7e8",
    },
    {
        name: "Serie 3",
        values: [300, 1],
        color: "#1f77b4",
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            type: "classic",
            responsive: false,
            useBlurOnHover: true,
            useCssAnimation: true,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            events: {
                datapointEnter: null,
                datapointLeave: null,
                datapointClick: null,
            },
            serieToggleAnimation: { show: true, durationMs: 500 },
            startAnimation: { show: true, durationMs: 1000, staggerMs: 50 },
            style: {
                fontFamily: "inherit",
                chart: {
                    useGradient: true,
                    gradientIntensity: 40,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    width: 512,
                    height: 360,
                    padding: { top: 0, right: 0, bottom: 0, left: 0 },
                    layout: {
                        curvedMarkers: false,
                        labels: {
                            dataLabels: {
                                showValueFirst: true,
                                usePercentageParens: true,
                                useValueParens: false,
                                show: true,
                                useLabelSlots: false,
                                hideUnderValue: 0,
                                prefix: "",
                                suffix: "",
                                smallArcClusterThreshold: 8,
                                smallArcClusterFontSize: 12,
                                oneLine: false,
                            },
                            value: { rounding: 0, show: true },
                            percentage: {
                                show: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: true,
                                fontSize: 18,
                                rounding: 0,
                                minFontSize: 6,
                            },
                            name: {
                                show: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: false,
                                fontSize: 14,
                                minFontSize: 6,
                            },
                            hollow: {
                                show: true,
                                total: {
                                    show: true,
                                    bold: false,
                                    fontSize: 18,
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    text: "Total",
                                    offsetY: -16,
                                    value: {
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#1A1A1A",
                                        fontSize: 18,
                                        bold: true,
                                        suffix: "",
                                        prefix: "",
                                        offsetY: -12,
                                        rounding: 0,
                                    },
                                },
                                average: {
                                    show: true,
                                    bold: false,
                                    fontSize: 18,
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    text: "Average",
                                    offsetY: 0,
                                    value: {
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#1A1A1A",
                                        fontSize: 18,
                                        bold: true,
                                        suffix: "",
                                        prefix: "",
                                        offsetY: 6,
                                        rounding: 0,
                                    },
                                },
                            },
                        },
                        donut: {
                            radiusRatio: 0.3,
                            strokeWidth: 64,
                            borderWidth: 2,
                            useShadow: false,
                            shadowColor: "#1A1A1A",
                            emptyFill: isDarkMode.value ? "#2A2A2A" : "#E1E5E8",
                            selectedColor: "#0000001A",
                            borderColorAuto: true,
                            borderColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#CCCCCC",
                        },
                    },
                    comments: {
                        show: true,
                        showInTooltip: true,
                        width: 100,
                        offsetX: 0,
                        offsetY: 0,
                    },
                    legend: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        show: true,
                        fontSize: 16,
                        bold: false,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        showValue: true,
                        showPercentage: true,
                        position: "bottom",
                        showValueFirst: true,
                        usePercentageParens: true,
                        useValueParens: false,
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
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
                            color: isDarkMode.value ? "#CCCCCC" : "#565656",
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
                        showValue: true,
                        showPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
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
                        showValueFirst: true,
                        usePercentageParens: true,
                        useValueParens: false,
                    },
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
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 300,
                columnNames: {
                    series: "Series",
                    value: "Value",
                    percentage: "Percentage",
                },
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
                    roundingPercentage: 0,
                },
            },
            debug: isDarkMode.value ? false : undefined,
            loading: isDarkMode.value ? false : undefined,
            pie: isDarkMode.value ? false : undefined,
            autoSize: isDarkMode.value ? true : undefined,
        }),
    set: configState.set,
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
function resetDefault() {
    configState.reset();
}

function randomizeData() {
    mutableDataset.value[0].values = [Math.random() * 100];
    mutableDataset.value[1].values = [Math.random() * 200];
    mutableDataset.value[2].values = [Math.random() * 500];
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

const sparkGaugeDatasets = ref([
    {
        value: 7,
        min: 0,
        max: 10,
        title: "Serie 1 satisfaction",
    },
    {
        value: 6.5,
        min: 0,
        max: 10,
        title: "Serie 2 satisfaction",
    },
    {
        value: 9,
        min: 0,
        max: 10,
        title: "Serie 3 satisfaction",
    },
]);

const slotOptions = ref(["justLabels", "chart", "icon"]);

const slotOption = ref(slotOptions.value[0]);

const { configCode, showAllConfig } = useConfigCode();

const dsTypeCode = computed(() => {
    return `type VueUiDonutDatasetItem = {
    name: string
    color: string
    values: number[]
    comment?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiDonutDatasetItem[] = [
    {
        name: "Serie 1",
        values: [100],
    },
    {
        name: "Serie 2",
        values: [200]
    },
    {
        name: "Serie 3",
        values: [300, 1],
        comment: "A comment for this specific datapoint"
    },
];`);

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
        <BaseDocTitle name="VueUiDonut" />

        <BaseDocDescription
            :text="translations.docs.tooltips.donut[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-donut"
            targetMaker="VueUiDonut"
            :configSource="mainConfig.vue_ui_donut"
        />

        <div :class="`transition-all mx-auto w-full sm:w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiDonut"
                        :dataset="mutableDataset"
                        :config="config"
                        :key="key"
                    >
                        <template #plot-comment="{ plot }">
                            <div
                                :style="`text-align:${plot.textAlign};font-size: 10px; padding: 6px;`"
                            >
                                {{ plot.comment }}
                            </div>
                        </template>
                    </VueDataUi>
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-donut" />
        </div>

        <Rater itemId="vue_ui_donut" />

        <BaseMigrationInfo cssAnimation debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showUseCases
            showCallbacks
            showThemes
            showResponsive
            showPatterns
            showSsr
            schema="vue_ui_donut"
            signInfo="positiveOrNegativeOnly"
        >
            <template v-slot:tab0>
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

            <template v-slot:tab1>
                <DebugHint
                    component="VueUiDonut"
                    configType="VueUiDonutConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="my-4">
                    TS type: <code class="text-app-blue">VueUiDonutConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <VueUiDonutConfigFields
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

            <template v-slot:tab2>
                <ComponentEmits
                    component="VueUiDonut"
                    :names="['selectDatapoint', 'selectLegend', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiDonut"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                        'toggleLabels',
                        'autoSize',
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

            const donutChart = ref(null);
            const donutDataset = ref([]);

            onMounted(async () => {
                donutDataset.value = await donutChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonut
                ref="donutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonut
                ref="donutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        donutDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.donutDataset = await this.$refs.donutChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiDonut"
                    :types="[
                        'hint',
                        'svg',
                        'dataLabel',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'plot-comment',
                        'chart-background',
                        'pattern',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-donut.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

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

            <template #tab5>
                <UcDonut />
            </template>

            <template #tab6>
                <ThemesVueUiDonut />
            </template>

            <template #tab7>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiDonut"
                            :dataset="mutableDataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                            :key="key"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab8>
                <VueDataUi
                    component="VueUiDonut"
                    :dataset="mutableDataset"
                    :config="config"
                    :key="key"
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            v-if="seriesIndex === 0"
                            :id="patternId"
                            name="zig-zag"
                            stroke="blue"
                            :strokeWidth="3"
                            :scale="0.5"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 1"
                            :id="patternId"
                            name="scales"
                            stroke="#1A1A1A"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 2"
                            :id="patternId"
                            name="hexagon-flooring"
                            stroke="#1A1A1A"
                        />
                    </template>
                </VueDataUi>
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

            <template #tab12>
                <SsrGeneration component="VueUiDonut" />
            </template>
        </Box>
    </div>
</template>
