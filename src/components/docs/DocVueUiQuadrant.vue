<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiQuadrantConfigFields from "./configuration/VueUiQuadrantConfigFields.vue";
import { ref, computed, nextTick, watch, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiQuadrant from "../themes/ThemesVueUiQuadrant.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
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

const dataset = ref([
    {
        name: "Stars",
        shape: "star",
        color: "#5f8bee",
        series: [
            {
                name: "Star 1",
                x: 50,
                y: 50,
            },
            {
                name: "Star 2",
                x: -10,
                y: -10,
            },
            {
                name: "Star 3",
                x: -15,
                y: 20,
            },
            {
                name: "Star 4",
                x: 15,
                y: -20,
            },
        ],
    },
    {
        name: "Triangles",
        shape: "triangle",
        color: "#42d392",
        series: [
            {
                name: "Triangle 1",
                x: -50,
                y: -50,
            },
            {
                name: "Triangle 2",
                x: 25,
                y: -25,
            },
            {
                name: "Triangle 3",
                x: -25,
                y: 25,
            },
            {
                name: "Triangle 4",
                x: 10,
                y: 10,
            },
        ],
    },
    {
        name: "Hexagons",
        shape: "hexagon",
        color: "#ff6400",
        series: [
            {
                name: "Hexagon 1",
                x: -39,
                y: 39,
            },
            {
                name: "Hexagon 2",
                x: -2,
                y: 45,
            },
            {
                name: "Hexagon 3",
                x: -15,
                y: 30,
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
            useCssAnimation: true,
            zoomAnimationFrames: 20,
            zoomEnabled: true,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            downsample: { threshold: 1095 },
            style: {
                fontFamily: "inherit",
                chart: {
                    height: 512,
                    width: 512,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    layout: {
                        labels: {
                            quadrantLabels: {
                                show: true,
                                tl: {
                                    text: "top left",
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 16,
                                    bold: true,
                                },
                                tr: {
                                    text: "top right",
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 16,
                                    bold: true,
                                },
                                br: {
                                    text: "bottom right",
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 16,
                                    bold: true,
                                },
                                bl: {
                                    text: "bottom left",
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 16,
                                    bold: true,
                                },
                            },
                            plotLabels: {
                                showAsTag: false,
                                show: true,
                                fontSize: 10,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                offsetY: 10,
                                x: { formatter: null },
                                y: { formatter: null },
                            },
                            axisLabels: {
                                show: true,
                                fontSize: 14,
                                color: {
                                    positive: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    negative: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                },
                            },
                        },
                        grid: {
                            stroke: isDarkMode.value ? "#AAAAAA" : "#1A1A1A",
                            strokeWidth: 0.5,
                            showArrows: true,
                            graduations: {
                                stroke: isDarkMode.value
                                    ? "#AAAAAA"
                                    : "#C4C4C4",
                                strokeWidth: 0.5,
                                show: true,
                                steps: 5,
                                fill: true,
                                color: "#E1E5E8",
                                roundingForce: 10,
                            },
                            xAxis: {
                                min: -100,
                                max: 100,
                                auto: true,
                                name: "xAxis",
                            },
                            yAxis: {
                                min: -100,
                                max: 100,
                                auto: true,
                                name: "yAxis",
                            },
                        },
                        plots: {
                            radius: 6,
                            outline: true,
                            outlineColor: isDarkMode.value
                                ? "#CCCCCC"
                                : "#F3F4F6",
                            outlineWidth: isDarkMode.value ? 0.5 : 1,
                        },
                        areas: {
                            show: true,
                            opacity: isDarkMode.value ? 50 : 40,
                            useGradient: true,
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
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        roundingValue: 0,
                        customFormat: null,
                        showShape: true,
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
                        tooltip: true,
                        show: true,
                        bold: true,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
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
            translations: { category: "Category", item: "Item", side: "Side" },
        }),
    set: configState.set,
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

const shapes = ref([
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star",
]);

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
    return `type VueUiQuadrantDatasetItem = {
    name: string
    shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star" // default: "circle"
    color?: string
    series: Array<{
        name: string
        x: number
        y: number
    }>
}`;
});

const codeDataset = ref(`const dataset: VueUiQuadrantDatasetItem[] = [
    {
        name: "Stars",
        shape: "star",
        color: "#5f8bee",
        series: [
            {
                name: "Star 1",
                x: 50,
                y: 50
            },
            {
                name: "Star 2",
                x: -10,
                y: -10
            },
            {
                name: "Star 3",
                x: -15,
                y: 20
            },
            {
                name: "Star 4",
                x: 15,
                y: -20
            },
        ]
    },
    {
        name: "Triangles",
        shape: "triangle",
        color: "#42d392",
        series: [
            {
                name: "Triangle 1",
                x: -50,
                y: -50
            },
            {
                name: "Triangle 2",
                x: 25,
                y: -25
            },
            {
                name: "Triangle 3",
                x: -25,
                y: 25
            },
            {
                name: "Triangle 4",
                x: 10,
                y: 10
            }
        ]
    },
    {
        name: "Hexagons",
        shape: "hexagon",
        color: "#ff6400",
        series: [
            {
                name: "Hexagon 1",
                x: -39,
                y: 39
            },
            {
                name: "Hexagon 2",
                x: -2,
                y: 45
            },
            {
                name: "Hexagon 3",
                x: -15,
                y: 30
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
    ref(`customFormat: ({ seriesIndex, datapoint, series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);

const datapointSlot = ref(`
    <VueUiQuadrant :dataset="dataset" :config="config">
        <template #datapoint="{ datapoint }">
            <div style="width: 100%; height: 100%; overflow: visible;">
                <GoogleIcon v-if="datapoint.name === 'google'"/>
                <!-- Etc. -->
            </div>
        </template>
    </VueUiQuadrant>

`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiQuadrant" />

        <BaseDocDescription
            :text="translations.docs.tooltips.quadrant[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-quadrant"
            targetMaker="VueUiQuadrant"
            :configSource="mainConfig.vue_ui_quadrant"
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
                    <VueUiQuadrant
                        :dataset="mutableDataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-quadrant"
            />
        </div>

        <Rater itemId="vue_ui_quadrant" />

        <BaseMigrationInfo cssAnimation debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showThemes
            showResponsive
            schema="vue_ui_quadrant"
            signInfo="both"
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
                    component="VueUiQuadrant"
                    configType="VueUiQuadrantConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="w-full overflow-x-auto">
                    <div class="mt-4">
                        TS type:
                        <code class="text-app-blue">VueUiQuadrantConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>

                    <code ref="configCode">
                        <VueUiQuadrantConfigFields
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
                </div>
            </template>

            <template v-slot:tab2>
                <ComponentEmits
                    component="VueUiQuadrant"
                    :names="[
                        'selectPlot',
                        'selectSide',
                        'selectLegend',
                        'copyAlt',
                    ]"
                />
                <ExposedMethods
                    component="VueUiQuadrant"
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
                <div class="overflow-auto">
                    <div class="pt-6 border-t border-gray-700">
                        <code><b>getData</b></code>
                    </div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const quadrantChart = ref(null);
            const quadrantDataset = ref([]);

            onMounted(async () => {
                quadrantDataset.value = await quadrantChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiQuadrant
                ref="quadrantChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiQuadrant
                ref="quadrantChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        quadrantDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.quadrantDataset = await this.$refs.quadrantChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiQuadrant"
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-quadrant.vue"
                        />
                    </template>
                    <template #additional>
                        <div class="mb-4">
                            <div
                                class="flex flex-row gap-2 place-items-center flex-wrap mb-2"
                            >
                                <div
                                    class="font-inter-medium bg-gradient-to-br from-app-green-light to-app-green text-black rounded-full px-2 py-0.5 shadow"
                                >
                                    {{ "#datapoint" }}
                                </div>
                            </div>
                            <div
                                class="pl-6 bg-[#FFFFFF10] text-black dark:text-gray-400 rounded-t-2xl py-3 pr-6"
                            >
                                {{ translations.slots.datapoint[store.lang] }}
                            </div>
                            <div
                                class="bg-gray-200 dark:bg-[#1A1A1A] overflow-auto rounded-b-2xl relative shadow"
                            >
                                <div class="absolute top-1 right-1">
                                    <button
                                        class="flex place-items-center justify-center p-1 rounded-full hover:bg-[#42d39230] transition-colors"
                                        @click="
                                            () => copyToClipboard(datapointSlot)
                                        "
                                    >
                                        <CopyIcon
                                            class="text-[#3A3A3A] dark:text-app-green"
                                        />
                                    </button>
                                </div>
                                <CodeParser
                                    language="html"
                                    :content="datapointSlot"
                                    @copy="store.copy()"
                                />
                            </div>
                        </div>
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
                <ThemesVueUiQuadrant />
            </template>

            <template #tab7>
                <ResponsiveUnit width="300px">
                    <template #chart>
                        <VueUiQuadrant
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
