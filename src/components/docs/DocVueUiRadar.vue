<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiRadarConfigFields from "./configuration/VueUiRadarConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import ThemesVueUiRadar from "../themes/ThemesVueUiRadar.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useMainStore } from "../../stores";
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

const dataset = ref({
    categories: [
        {
            name: "category 1",
            color: "#5f8bee",
        },
        {
            name: "category 2",
            color: "#42d392",
        },
        {
            name: "category 3",
            color: "#ff6400",
        },
    ],
    series: [
        {
            name: "Serie 1",
            values: [65, 45, 12],
            color: "",
            target: 100,
        },
        {
            name: "Serie 2",
            values: [2525, 3472, 4950],
            color: "",
            target: 10000,
        },
        {
            name: "Serie 3",
            values: [4.7, 1, 3],
            color: "",
            target: 5,
        },
        {
            name: "Serie 4",
            values: [400, 250, 325],
            color: "",
            target: 500,
        },
        {
            name: "Serie 5",
            values: [53, 95, 67],
            color: "",
            target: 100,
        },
        {
            name: "Serie 6",
            values: [166, 107, 75],
            color: "",
            target: 200,
        },
        {
            name: "Serie 7",
            values: [6, 7, 10],
            color: "",
            target: 10,
        },
        {
            name: "Serie 8",
            values: [6, 3, 10],
            color: "",
            target: 10,
        },
        {
            name: "Serie 9",
            values: [2, 7, 9],
            color: "",
            target: 10,
        },
        {
            name: "Serie 10",
            values: [6, 7, 8],
            color: "",
            target: 10,
        },
    ],
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
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
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    layout: {
                        scaleToAxisMax: false,
                        targetReference: {
                            show: false,
                            stroke: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            strokeWidth: 1,
                            strokeDasharray: 4,
                            showInLegend: true,
                            legendLabel: "Target",
                        },
                        plots: { show: true, radius: 2 },
                        outerPolygon: { stroke: "#6a6b6a", strokeWidth: 1 },
                        dataPolygon: {
                            strokeWidth: 1,
                            transparent: false,
                            opacity: 50,
                            useGradient: true,
                        },
                        grid: {
                            show: true,
                            stroke: isDarkMode.value ? "#565756" : "#C4C4C4",
                            strokeWidth: 0.5,
                            graduations: 5,
                            rotation: 0,
                        },
                        labels: {
                            dataLabels: {
                                show: true,
                                fontSize: 12,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                offset: 0,
                            },
                        },
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#e1e5e8" : "#1A1A1A",
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
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        showValue: true,
                        showPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        animation: { show: true, animationFrames: 60 },
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
                    legend: {
                        show: true,
                        bold: true,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        roundingPercentage: 0,
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
            translations: {
                target: "Target",
                value: "Value",
                datapoint: "Datapoint",
            },
        }),
    set: configState.set,
});

const slicer = ref(6);

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

function updateDataset() {
    mutableDataset.value = JSON.parse(
        JSON.stringify({
            ...dataset.value,
            series: dataset.value.series.slice(0, slicer.value),
        }),
    );
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
    return `type VueUiRadarDataset = {
    categories: Array<{
        name: string
        color?: string
    }>
    // ${translations.value.docs.comments.radar.polygon[store.lang]}
    series: Array<{
        name: string
        values: number[] // ${translations.value.docs.comments.radar.seriesValues[store.lang]}
        target: number[] // ${translations.value.docs.comments.radar.target[store.lang]}
        formatter?: null // ${translations.value.formatterLink[store.lang]}
    }>
}`;
});

const codeDataset = ref(`const dataset: VueUiRadarDataset = {
    categories: [
        {
            name: "category 1",
            color: "#5f8bee"
        },
        {
            name: "category 2",
            color: "#42d392"
        },
        {
            name: "category 3",
            color: "#ff6400"
        }
    ],
    // Each serie can have its own scale using the target attribute, so you can represent all types of data relations (revenue, satisfaction, percentages...)
    series: [
        {
            name: "Serie 1",
            values: [65, 45, 12],
            color: "",
            target: 100
        },
        {
            name: "Serie 2",
            values: [2525, 3472, 4950],
            color: "",
            target: 10000
        },
        {
            name: "Serie 3",
            values: [4.7, 1, 3],
            color: "",
            target: 5
        },
        {
            name: "Serie 4",
            values: [400, 250, 325],
            color: "",
            target: 500
        },
        {
            name: "Serie 5",
            values: [5, 9, 7],
            color: "",
            target: 10
        },
        {
            name: "Serie 6",
            values: [6, 7, 10],
            color: "",
            target: 10
        },
    ]
}`);

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
        <BaseDocTitle name="VueUiRadar" />

        <BaseDocDescription
            :text="translations.docs.tooltips.radar[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-radar"
            targetMaker="VueUiRadar"
            :configSource="mainConfig.vue_ui_radar"
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
                    <VueUiRadar
                        :dataset="mutableDataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <div class="flex flex-col gap-3">
                <label for="player">{{
                    translations.docs.showMoreSeries[store.lang]
                }}</label>
                <input
                    id="player"
                    type="range"
                    :min="3"
                    :max="10"
                    v-model="slicer"
                    @input="updateDataset"
                    class="accent-gray-400 dark:accent-500 max-w-[200px]"
                />
            </div>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-radar" />
        </div>

        <Rater itemId="vue_ui_radar" />

        <BaseMigrationInfo cssAnimation debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showThemes
            showResponsive
            schema="vue_ui_radar"
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
                    component="VueUiRadar"
                    configType="VueUiRadarConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="w-full overflow-x-auto">
                    <div class="mt-6">
                        TS type:
                        <code class="text-app-blue">VueUiRadarConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>

                    <code ref="configCode">
                        <VueUiRadarConfigFields
                            :config="config"
                            :context="{
                                forceChartUpdate,
                                setActiveTab,
                                store,
                                translations,
                            }"
                        />
                    </code>
                </div>
            </template>

            <template v-slot:events-and-methods>
                <ComponentEmits
                    component="VueUiRadar"
                    :names="['selectLegend', 'copyAlt']"
                />
                <ExposedMethods
                    component="VueUiRadar"
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

            const radarChart = ref(null);
            const radarDataset = ref([]);

            onMounted(async () => {
                radarDataset.value = await radarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRadar
                ref="radarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiRadar
                ref="radarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        radarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.radarDataset = await this.$refs.radarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiRadar"
                    :types="[
                        'hint',
                        'svg',
                        'legend',
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-radar.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>
            <template #custom-tooltip>
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

            <template #themes>
                <ThemesVueUiRadar />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiRadar
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
