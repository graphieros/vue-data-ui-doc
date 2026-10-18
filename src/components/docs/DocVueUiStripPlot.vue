<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiStripPlotConfigFields from "./configuration/VueUiStripPlotConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiStripPlot from "../themes/ThemesVueUiStripPlot.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
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
        name: "Asia",
        plots: [
            { name: "Shanghai", value: 24.9 },
            { name: "Beijing", value: 21.9 },
            { name: "Delhi", value: 16.8 },
            { name: "Guangzhou", value: 16.1 },
            { name: "Istanbul", value: 15.6 },
            { name: "Chengdu", value: 15.4 },
            { name: "Mumbai", value: 15.4 },
            { name: "Karachi", value: 14.9 },
            { name: "Shenzen", value: 14.7 },
            { name: "Tokyo", value: 14 },
        ],
    },
    {
        name: "Africa",
        plots: [
            { name: "Kinshasa", value: 17.1 },
            { name: "Lagos", value: 14.9 },
            { name: "Cairo", value: 9.3 },
            { name: "Johannesburg", value: 5.6 },
            { name: "Giza", value: 5.6 },
            { name: "Khartoum", value: 5.3 },
            { name: "Abidjan", value: 5 },
            { name: "Alexandria", value: 4.9 },
            { name: "Dar es Salaam", value: 4.7 },
            { name: "Nairobi", value: 4.4 },
        ],
    },
    {
        name: "Europe",
        plots: [
            { name: "Moscow", value: 13 },
            { name: "London", value: 9 },
            { name: "Saint Petersburg", value: 5.4 },
            { name: "Berlin", value: 3.8 },
            { name: "Madrid", value: 3.3 },
            { name: "Kyiv", value: 3 },
            { name: "Rome", value: 2.7 },
            { name: "Paris", value: 2.1 },
            { name: "Minsk", value: 2 },
            { name: "Vienna", value: 1.9 },
        ],
    },
    {
        name: "America",
        plots: [
            { name: "Sao Paulo", value: 12.2 },
            { name: "Lima", value: 9.7 },
            { name: "Mexico City", value: 9.2 },
            { name: "New York", value: 8.4 },
            { name: "Bogota", value: 8 },
            { name: "Rio de Janeiro", value: 6.7 },
            { name: "Santiago", value: 6.2 },
            { name: "Los Angeles", value: 4 },
            { name: "Buenos Aires", value: 3 },
            { name: "Brasilia", value: 2.9 },
        ],
    },
    {
        name: "Australia & Oceania",
        plots: [
            { name: "Sydney", value: 5.4 },
            { name: "Melbourne", value: 5.1 },
            { name: "Brisbane", value: 2.6 },
            { name: "Perth", value: 2.1 },
            { name: "Auckland", value: 1.7 },
            { name: "Adelaide", value: 1.4 },
            { name: "Honolulu", value: 1 },
            { name: "Gold Coast", value: 0.7 },
            { name: "Newcastle-Maitland", value: 0.5 },
            { name: "Canberra", value: 0.46 },
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
            useCssAnimation: true,
            type: "classic",
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
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                columnNames: { series: "Series", value: "Value" },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 600,
                    width: 600,
                    padding: { top: 12, left: 12, right: 12, bottom: 12 },
                    grid: {
                        show: true,
                        stroke: isDarkMode.value ? "#8A8A8A" : "#cccccc",
                        strokeWidth: 1,
                        scaleSteps: 10,
                        scaleMin: null,
                        scaleMax: null,
                        horizontalGrid: {
                            show: true,
                            stroke: isDarkMode.value ? "#8A8A8A" : "#cccccc",
                            strokeWidth: 0.5,
                            strokeDasharray: 4,
                        },
                        verticalGrid: {
                            show: true,
                            stroke: isDarkMode.value ? "#8A8A8A" : "#cccccc",
                            strokeWidth: 0.5,
                            strokeDasharray: 4,
                        },
                    },
                    plots: {
                        opacity: 0.9,
                        radius: 4,
                        stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        strokeWidth: 1,
                        shape: "circle",
                        gradient: { show: true, intensity: 40 },
                    },
                    violin: {
                        widthRatio: 1,
                        strokeWidth: 1,
                        opacity: 0.2,
                        strokeOpacity: 0.35,
                        useSerieColor: true,
                        stroke: "#5A5A5A",
                        fill: "#5A5A5A",
                        boxPlot: {
                            show: true,
                            widthRatio: 1,
                            useSerieColor: true,
                            color: "#5A5A5A",
                            medianCircleRadiusRatio: 1,
                            medianCircleFill: isDarkMode.value
                                ? "#2A2A2A"
                                : "#F3F4F6",
                        },
                        tooltipLabels: {
                            upperAdjacent: "Upper adjacent",
                            q3: "Q3",
                            median: "Median",
                            q1: "Q1",
                            lowerAdjacent: "Lower adjacent",
                            iqr: "IQR",
                            count: "Count",
                        },
                    },
                    labels: {
                        prefix: "",
                        suffix: "M",
                        bestPlotLabel: {
                            show: true,
                            showValue: true,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            rounding: 0,
                            offsetY: 0,
                        },
                        axis: {
                            xLabel: "Continents",
                            xLabelOffsetY: 0,
                            yLabel: "Population in Millions",
                            yLabelOffsetX: 0,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        },
                        xAxisLabels: {
                            show: true,
                            color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                            fontSize: 14,
                            offsetY: 0,
                            rotation: 0,
                            autoRotate: { enable: true, angle: -30 },
                        },
                        yAxisLabels: {
                            show: true,
                            color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                            fontSize: 14,
                            rounding: 0,
                            offsetX: 0,
                        },
                    },
                    title: {
                        text: "Top 10 largest cities",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "By continent",
                            fontSize: 16,
                            bold: false,
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
    return `type VueUiStripPlotDataset = {
    name: string
    plots: Array<{
        name: string
        value: number
    }>
}`;
});

const codeDataset = ref(`const dataset: VueUiStripPlotDataset[] = [
    {
        name: "Asia",
        plots: [
            { name: "Shanghai", value: 24.9 },
            { name: "Beijing", value: 21.9 },
            { name: "Delhi", value: 16.8 },
            { name: "Guangzhou", value: 16.1 },
            { name: "Istanbul", value: 15.6 },
            { name: "Chengdu", value: 15.4 },
            { name: "Mumbai", value: 15.4 },
            { name: "Karachi", value: 14.9 },
            { name: "Shenzen", value: 14.7 },
            { name: "Tokyo", value: 14 },
        ]
    },
    {
        name: "Africa",
        plots: [
            { name: "Kinshasa", value: 17.1 },
            { name: "Lagos", value: 14.9 },
            { name: "Cairo", value: 9.3 },
            { name: "Johannesburg", value: 5.6 },
            { name: "Giza", value: 5.6 },
            { name: "Khartoum", value: 5.3 },
            { name: "Abidjan", value: 5 },
            { name: "Alexandria", value: 4.9 },
            { name: "Dar es Salaam", value: 4.7 },
            { name: "Nairobi", value: 4.4 },
        ]
    },
    {
        name: "Europe",
        plots: [
            { name: "Moscow", value: 13 },
            { name: "London", value: 9 },
            { name: "Saint Petersburg", value: 5.4 },
            { name: "Berlin", value: 3.8 },
            { name: "Madrid", value: 3.3 },
            { name: "Kyiv", value: 3 },
            { name: "Rome", value: 2.7 },
            { name: "Paris", value: 2.1 },
            { name: "Minsk", value: 2 },
            { name: "Vienna", value: 1.9 }
        ]
    },
    {
        name: "America",
        plots: [
            { name: "Sao Paulo", value: 12.2 },
            { name: "Lima", value: 9.7 },
            { name: "Mexico City", value: 9.2 },
            { name: "New York", value: 8.4 },
            { name: "Bogota", value: 8 },
            { name: "Rio de Janeiro", value: 6.7 },
            { name: "Santiago", value: 6.2 },
            { name: "Los Angeles", value: 4 },
            { name: "Buenos Aires", value: 3 },
            { name: "Brasilia", value: 2.9 }
        ]
    },
    {
        name: "Australia & Oceania",
        plots: [
            { name: "Sydney", value: 5.4 },
            { name: "Melbourne", value: 5.1 },
            { name: "Brisbane", value: 2.6 },
            { name: "Perth", value: 2.1 },
            { name: "Auckland", value: 1.7 },
            { name: "Adelaide", value: 1.4 },
            { name: "Honolulu", value: 1 },
            { name: "Gold Coast", value: 0.7 },
            { name: "Newcastle-Maitland", value: 0.5 },
            { name: "Canberra", value: 0.46 },
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
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiStripPlot" />

        <BaseDocDescription
            :text="translations.docs.tooltips.stripPlot[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-strip-plot"
            targetMaker="VueUiStripPlot"
            :configSource="mainConfig.vue_ui_strip_plot"
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
                    <VueUiStripPlot
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-strip-plot"
            />
        </div>

        <Rater itemId="vue_ui_strip_plot" />

        <BaseMigrationInfo autoRotate debug padding />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showThemes
            showResponsive
            schema="vue_ui_strip_plot"
            signInfo="both"
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
                    component="VueUiStripPlot"
                    configType="VueUiStripPlotConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiStripPlotConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiStripPlotConfigFields
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
            <template #tab2>
                <ComponentEmits
                    component="VueUiStripPlot"
                    :names="['selectDatapoint', 'copyAlt']"
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

            const stripPlotChart = ref(null);
            const stripPlotDataset = ref([]);

            onMounted(async () => {
                stripPlotDataset.value = await stripPlotChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStripPlot
                ref="stripPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiStripPlot
                ref="stripPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        stripPlotDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.stripPlotDataset = await this.$refs.stripPlotChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                    <ExposedMethods
                        component="VueUiStripPlot"
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
                </div>
            </template>
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiStripPlot"
                    :types="[
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-strip-plot.vue"
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

            <template #tab6>
                <ThemesVueUiStripPlot />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiStripPlot
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
