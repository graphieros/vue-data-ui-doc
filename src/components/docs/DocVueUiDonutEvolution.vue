<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiDonutEvolutionConfigFields from "./configuration/VueUiDonutEvolutionConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiDonutEvolution from "../themes/ThemesVueUiDonutEvolution.vue";
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
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
import BaseZoomState from "../Base/BaseZoomState.vue";
import ZoomStateVueUiDonutEvolution from "./zoom-state/ZoomStateVueUiDonutEvolution.vue";

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

const monthValues = computed(() => {
    const yearStart = 2026;
    const arr = [];
    for (let i = 0; i < 21; i += 1) {
        const d = new Date(yearStart, i, 1);
        arr.push(d.getTime());
    }
    return arr;
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Serie 1",
        values: [55, 34, 21, 13, 8, 5, 8, 13, 21, 34, 55],
    },
    {
        name: "Serie 2",
        values: [1, 12, 24, 32, 5, 8, 13, 21, 34, 55, 89],
    },
    {
        name: "Serie 3",
        values: [16, 2, 3, 5, 28, 13, 21, 34, 55, 89, 134],
    },
    {
        name: "Serie 4",
        values: [5, null, 5, 5, 5, 5],
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
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to move between data points.",
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
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    dialog: {
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#FFFFFF",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        header: {
                            backgroundColor: isDarkMode.value
                                ? "#2A2A2A"
                                : "#FFFFFF",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                        donutChart: {
                            style: {
                                chart: {
                                    backgroundColor: isDarkMode.value
                                        ? "#2A2A2A"
                                        : "#FFFFFF",
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    legend: {
                                        backgroundColor: isDarkMode.value
                                            ? "#2A2A2A"
                                            : "#FFFFFF",
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#1A1A1A",
                                        selectAllToggle: {
                                            show: false,
                                            backgroundColor: isDarkMode.value
                                                ? "#3A3A3A"
                                                : "#E1E5E8",
                                            color: isDarkMode.value
                                                ? "#CCCCCC"
                                                : "#1A1A1A",
                                        },
                                    },
                                    tooltip: {
                                        show: true,
                                        color: isDarkMode.value
                                            ? "#CCCCCC"
                                            : "#1A1A1A",
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
                                        borderColor: isDarkMode.value
                                            ? "#3A3A3A"
                                            : "#e1e5e8",
                                        borderWidth: 1,
                                        backgroundOpacity: 30,
                                        position: "center",
                                        offsetY: 24,
                                    },
                                    layout: {
                                        labels: {
                                            percentage: {
                                                color: isDarkMode.value
                                                    ? "#CCCCCC"
                                                    : "#1A1A1A",
                                            },
                                            name: {
                                                color: isDarkMode.value
                                                    ? "#CCCCCC"
                                                    : "#1A1A1A",
                                            },
                                            hollow: {
                                                average: {
                                                    color: isDarkMode.value
                                                        ? "#CCCCCC"
                                                        : "#1A1A1A",
                                                    value: {
                                                        color: isDarkMode.value
                                                            ? "#CCCCCC"
                                                            : "#1A1A1A",
                                                    },
                                                },
                                                total: {
                                                    color: isDarkMode.value
                                                        ? "#CCCCCC"
                                                        : "#1A1A1A",
                                                    value: {
                                                        color: isDarkMode.value
                                                            ? "#CCCCCC"
                                                            : "#1A1A1A",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    donuts: { hover: { hideLabelsUnderValue: 5 } },
                    zoom: {
                        show: true,
                        autoFit: true,
                        maxWidth: null,
                        color: "#CCCCCC",
                        highlightColor: "#4A4A4A",
                        fontSize: 14,
                        useResetSlot: false,
                        startIndex: null,
                        endIndex: null,
                        enableRangeHandles: true,
                        enableSelectionDrag: true,
                        focusOnDrag: false,
                        focusRangeRatio: 0.2,
                        dragToZoom: {
                            show: true,
                            selection: {
                                fill: isDarkMode.value ? "#CCCCCC" : "#6A6A6A",
                                stroke: isDarkMode.value
                                    ? "#CCCCCC"
                                    : "#6A6A6A",
                                fillOpacity: 0.2,
                                strokeOpacity: 0.5,
                                strokeWidth: 1,
                                strokeDasharray: 0,
                            },
                        },
                    },
                    layout: {
                        height: 316,
                        width: 500,
                        padding: { top: 5, left: 10, right: 5, bottom: 10 },
                        grid: {
                            show: true,
                            stroke: isDarkMode.value ? "#4A4A4A" : "#e1e5e8",
                            strokeWidth: 0.7,
                            showVerticalLines: false,
                            axis: {
                                yLabel: "Y axis",
                                yLabelOffsetX: 0,
                                xLabel: "X axis",
                                xLabelOffsetY: 0,
                                fontSize: 12,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            },
                            yAxis: {
                                position: "left",
                                scaleMin: null,
                                scaleMax: null,
                                autoScale: false,
                                dataLabels: {
                                    show: true,
                                    fontSize: 10,
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#2D353C",
                                    roundingValue: 0,
                                    offsetX: 0,
                                    bold: false,
                                    steps: 10,
                                },
                            },
                            xAxis: {
                                dataLabels: {
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#2D353C",
                                    show: true,
                                    values: monthValues.value,
                                    datetimeFormatter: {
                                        enable: true,
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
                                    fontSize: 8,
                                    showOnlyFirstAndLast: false,
                                    offsetY: 6,
                                    rotation: 0,
                                    autoRotate: { enable: true, angle: -30 },
                                },
                            },
                        },
                        line: {
                            show: true,
                            stroke: isDarkMode.value ? "#4A4A4A" : "#CCCCCC",
                            strokeWidth: 4,
                        },
                        highlighter: {
                            color: isDarkMode.value ? "#FFFFFF" : "#2D353C",
                            opacity: 5,
                        },
                        dataLabels: {
                            show: true,
                            fontSize: 10,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            bold: false,
                            rounding: 0,
                            prefix: "",
                            suffix: "",
                            offsetY: 0,
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
                    legend: {
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        bold: false,
                        show: true,
                        fontSize: 16,
                        roundingPercentage: 0,
                        roundingValue: 0,
                        showValue: true,
                        showPercentage: true,
                        position: "bottom",
                        selectAllToggle: {
                            show: false,
                            backgroundColor: isDarkMode.value
                                ? "#3A3A3A"
                                : "#E1E5E8",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                    },
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                columnNames: { period: "Period", total: "Total" },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                    roundingPercentage: 0,
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

const dsTypeCode = computed(() => {
    return `type VueUiDonutEvolutionDatasetItem = {
    name: string
    values: number[]
    color?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiDonutEvolutionDatasetItem[] = [
    {
        name: "Serie 1",
        values: [55, 34, 21, 13, 8, 5, 8, 13, 21, 34, 55 ],
    },
    {
        name: "Serie 2",
        values: [1, 12, 24, 32, 5, 8, 13, 21, 34, 55, 89 ]
    },
    {
        name: "Serie 3",
        values: [16, 2, 3, 5, 28, 13, 21, 34, 55, 89, 134 ]
    },
    {
        name: "Serie 4",
        values: [5, null, 5, 5, 5, 5 ]
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDonutEvolution" />

        <BaseDocDescription
            :text="translations.docs.tooltips.donutEvolution[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-donut-evolution"
            targetMaker="VueUiDonutEvolution"
            :configSource="mainConfig.vue_ui_donut_evolution"
        />

        <div :class="`transition-all mx-auto max-w-[700px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiDonutEvolution
                        ref="donutEvol"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_donut_evolution" />

        <BaseMigrationInfo autoRotate debug padding />

        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showEmits
            showCallbacks
            showSlots
            showThemes
            showResponsive
            showZoomState
            schema="vue_ui_donut_evolution"
            signInfo="positiveOnly"
        >
            <template #tab0>
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

            <template #tab1>
                <DebugHint
                    component="VueUiDonutEvolution"
                    configType="VueUiDonutEvolutionConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiDonutEvolutionConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiDonutEvolutionConfigFields
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
                    component="VueUiDonutEvolution"
                    :names="['selectLegend', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiDonutEvolution"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
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

            const donutEvolutionChart = ref(null);
            const donutEvolutionDataset = ref([]);

            onMounted(async () => {
                donutEvolutionDataset.value = await donutEvolutionChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonutEvolution
                ref="donutEvolutionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonutEvolution
                ref="donutEvolutionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        donutEvolutionDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.donutEvolutionDataset = await this.$refs.donutEvolutionChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiDonutEvolution"
                    :types="[
                        'hint',
                        'svg',
                        'legend',
                        'reset-action',
                        'watermark',
                        'source',
                        'chart-background',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-donut-evolution.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiDonutEvolution />
            </template>

            <template #tab7>
                <ResponsiveUnit height="600px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiDonutEvolution"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab10>
                <DatetimeFormatterDoc
                    path="style.chart.layout.grid.xAxis.dataLabels.datetimeFormatter"
                />
            </template>

            <template #tab11>
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

            <template #tab14>
                <BaseZoomState component="VueUiDonutEvolution">
                    <ZoomStateVueUiDonutEvolution />
                </BaseZoomState>
            </template>
        </Box>
    </div>
</template>
