<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiBumpConfigFields from "./configuration/VueUiBumpConfigFields.vue";
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
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiBump from "../themes/ThemesVueUiBump.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
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
        name: "JavaScript",
        values: [1.2, 1.35, 1.55, 1.75, 2.1, 2.45, 2.75, 3.05, 3.3, 3.5],
    },
    {
        name: "Python",
        values: [0.65, 0.74, 0.86, 1.02, 1.25, 1.5, 1.75, 2.05, 2.35, 2.6],
    },
    {
        name: "Java",
        values: [0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08],
    },
    {
        name: "TypeScript",
        values: [0.06, 0.09, 0.14, 0.23, 0.38, 0.56, 0.76, 0.98, 1.2, 1.45],
    },
    {
        name: "C#",
        values: [0.52, 0.545, 0.57, 0.6, 0.64, 0.69, 0.74, 0.8, 0.86, 0.92],
    },
    {
        name: "C++",
        values: [0.48, 0.49, 0.5, 0.51, 0.525, 0.54, 0.56, 0.585, 0.61, 0.635],
    },
    {
        name: "Go",
        values: [0.045, 0.07, 0.11, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86],
    },
    {
        name: "Rust",
        values: [0.005, 0.009, 0.018, 0.035, 0.07, 0.12, 0.19, 0.28, 0.38, 0.5],
    },
    {
        name: "PHP",
        values: [0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61],
    },
    {
        name: "Ruby",
        values: [
            0.23, 0.225, 0.22, 0.215, 0.21, 0.205, 0.2, 0.195, 0.19, 0.185,
        ],
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            loading: false,
            debug: false,
            responsive: false,
            theme: "",
            customPalette: [],
            useCssAnimation: false,
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
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: "right",
                useCursorPointer: false,
                buttons: {
                    tooltip: false,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: true,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
                    annotator: true,
                    svg: true,
                    zoom: false,
                },
                callbacks: {
                    animation: null,
                    annotator: null,
                    csv: null,
                    fullscreen: null,
                    img: null,
                    labels: null,
                    pdf: null,
                    sort: null,
                    stack: null,
                    table: null,
                    tooltip: null,
                    svg: null,
                    zoom: null,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    table: "Toggle table",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                    svg: "Download SVG",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            table: {
                show: false,
                responsiveBreakpoint: 400,
                useDialog: false,
                columnNames: {
                    series: "Series",
                    period: "Period",
                    values: "Values",
                    ranking: "Ranking",
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
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    height: 500,
                    width: 800,
                    layout: {
                        timeLabels: {
                            show: true,
                            values: [
                                2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
                                2024, 2025,
                            ],
                            datetimeFormatter: {
                                enable: false,
                                locale: "en",
                                useUTC: false,
                                januaryAsYear: false,
                                options: {
                                    year: "yyyy",
                                    month: "MMM 'yy",
                                    day: "dd MMM",
                                    hour: "HH:mm",
                                    minute: "HH:mm:ss",
                                    second: "HH:mm:ss",
                                },
                            },
                            offsetY: 12,
                            rotation: 0,
                            autoRotate: { enable: true, angle: -30 },
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            showOnlyFirstAndLast: false,
                            showOnlyAtModulo: false,
                            modulo: 12,
                        },
                        lines: {
                            smooth: true,
                            strokeWidth: 4,
                            coatingColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#FFFFFF",
                        },
                        plots: {
                            stroke: isDarkMode.value ? "#3A3A3A" : "#FFFFFF",
                            strokeWidth: 1,
                            radius: 12,
                            labels: {
                                color: "auto",
                                show: true,
                                bold: true,
                                displayedValue: "value",
                                fontSize: 12,
                                prefix: "",
                                suffix: "",
                                rounding: 2,
                                formatter: null,
                            },
                        },
                        nameLabels: {
                            fontSize: 16,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            useSerieColor: isDarkMode.value
                                ? isDarkMode.value
                                : false,
                            bold: isDarkMode.value ? true : false,
                            offsetX: 0,
                            leftLabels: { show: true },
                            rightLabels: { show: true },
                        },
                    },
                    padding: { top: 12, right: 12, bottom: 12, left: 12 },
                    title: {
                        text: "Programming language repository usage",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "Last 10 years, in Millions",
                            fontSize: 16,
                            bold: false,
                        },
                    },
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

const dsTypeCode = computed(() => {
    return `type VueUiBumpDatasetItem = {
    name: string;
    values: Array<number | null>;
    color?: string;
}`;
});

const codeDataset = ref(`const dataset: VueUiBumpDatasetItem[] = [
        {
        name: "JavaScript",
        values: [1.2, 1.35, 1.55, 1.75, 2.1, 2.45, 2.75, 3.05, 3.3, 3.5],
    },
    {
        name: "Python",
        values: [0.65, 0.74, 0.86, 1.02, 1.25, 1.5, 1.75, 2.05, 2.35, 2.6],
    },
    {
        name: "Java",
        values: [0.9, 0.92, 0.94, 0.96, 0.98, 1.0, 1.02, 1.04, 1.06, 1.08],
    },
    {
        name: "TypeScript",
        values: [0.06, 0.09, 0.14, 0.23, 0.38, 0.56, 0.76, 0.98, 1.2, 1.45],
    },
    {
        name: "C#",
        values: [0.52, 0.545, 0.57, 0.6, 0.64, 0.69, 0.74, 0.8, 0.86, 0.92],
    },
    {
        name: "C++",
        values: [0.48, 0.49, 0.5, 0.51, 0.525, 0.54, 0.56, 0.585, 0.61, 0.635],
    },
    {
        name: "Go",
        values: [0.045, 0.07, 0.11, 0.17, 0.26, 0.36, 0.47, 0.59, 0.72, 0.86],
    },
    {
        name: "Rust",
        values: [0.005, 0.009, 0.018, 0.035, 0.07, 0.12, 0.19, 0.28, 0.38, 0.5],
    },
    {
        name: "PHP",
        values: [0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61],
    },
    {
        name: "Ruby",
        values: [0.23, 0.225, 0.22, 0.215, 0.21, 0.205, 0.2, 0.195, 0.19, 0.185],
    },
]`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiBump" />

        <BaseDocDescription
            :text="translations.docs.tooltips.bump[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-bump"
            targetMaker="VueUiBump"
            :configSource="mainConfig.vue_ui_bump"
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
                    <VueUiBump :dataset="dataset" :config="config" :key="key" />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-bump" />
        </div>

        <Rater itemId="vue_ui_bump" />

        <Box
            ref="box"
            :show-datetime-formatter="true"
            showCallbacks
            showSlots
            showEmits
            showThemes
            showResponsive
            schema="vue_ui_bump"
            signInfo="both"
        >
            <template #dataset>
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

            <template #configuration>
                <DebugHint component="VueUiBump" configType="VueUiBumpConfig" />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiBumpConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>
                <code ref="configCode">
                    <VueUiBumpConfigFields
                        :config="config"
                        :context="{
                            goToPage,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>

            <template #events-and-methods>
                <ComponentEmits component="VueUiBump" :names="['copyAlt']" />
                <ExposedMethods
                    component="VueUiBump"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                    ]"
                    get-image
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiBump"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
                        'time-label',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-bump.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiBump />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiBump"
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

            <template #datetime-formatter>
                <DatetimeFormatterDoc
                    path="style.chart.layout.timeLabels.datetimeFormatter"
                />
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
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
