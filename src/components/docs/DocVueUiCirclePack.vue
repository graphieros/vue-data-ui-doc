<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiCirclePackConfigFields from "./configuration/VueUiCirclePackConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiCirclePack from "../themes/ThemesVueUiCirclePack.vue";
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
        name: "Datapoint A",
        value: 200,
        children: [
            {
                name: "Child A-1",
                value: 100,
                color: "#d62728",
                children: [
                    {
                        name: "GrandChild 1",
                        value: 70,
                    },
                    {
                        name: "GrandChild 2",
                        value: 30,
                    },
                ],
            },
            {
                name: "Child A-2",
                value: 100,
            },
        ],
    },
    {
        name: "Datapoint B",
        value: 150,
        children: [
            {
                name: "Child B-1",
                value: 50,
            },
            {
                name: "Child B-2",
                value: 80,
            },
            {
                name: "Child B-3",
                value: 20,
            },
        ],
    },
    {
        name: "Datapoint C",
        value: 100,
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            responsive: false,
            debug: false,
            loading: false,
            theme: "",
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
                    tooltip: isDarkMode.value ? true : false,
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
                    tooltip: isDarkMode.value ? "Toggle tooltip" : undefined,
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
                columnNames: {
                    datapoint: "Datapoint",
                    parent: "Parent",
                    depth: "Depth",
                    value: "Value",
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    width: 512,
                    height: 316,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
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
                    parentTooltips: {
                        show: true,
                        fontSizeRatio: 1,
                        borderRadiusRatio: 1,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        filter: isDarkMode.value
                            ? "drop-shadow(0 2px 4px #00000090)"
                            : "drop-shadow(0 2px 4px #2D353C30)",
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        strokeWidth: 1,
                        useSerieColor: true,
                        stroke: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        link: {
                            strokeWidth: 1,
                            strokeDasharray: 0,
                            opacity: 0.6,
                            useSerieColor: false,
                            stroke: isDarkMode.value ? "#CCCCCC" : "#2D353C",
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
                    circles: {
                        stroke: isDarkMode.value ? "#3A3A3A" : "#f3f4f6",
                        strokeWidth: 1,
                        selectedShadowColor: isDarkMode.value
                            ? "#CCCCCC"
                            : "#1A1A1A",
                        gradient: { show: true, intensity: 40 },
                        labels: {
                            parents: { show: false },
                            children: { show: true },
                            name: {
                                fontSizeRatio: 0.8,
                                show: true,
                                bold: false,
                                offsetY: 0,
                                color: "auto",
                            },
                            value: {
                                fontSizeRatio: 1,
                                show: true,
                                color: "auto",
                                rounding: 0,
                                prefix: "",
                                suffix: "",
                                formatter: null,
                                bold: false,
                                offsetY: 0,
                            },
                        },
                    },
                    zoom: { show: true, speed: 1 },
                },
            },
        }),
    set: configState.set,
});

const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));

function resetDefault() {
    configState.reset();
}

function makeDs({ qty, maxVal }) {
    let datapoints = [];
    for (let i = 0; i < qty; i += 1) {
        datapoints.push({
            name: `Datapoint ${i}`,
            value: Math.random() * maxVal,
            // color: '#FFFFFF',
            // breakdown: [
            //     { name: 'br 1', value: Math.random() * 10 },
            //     { name: 'br 2', value: Math.random() * 20 },
            //     { name: 'br 3', value: Math.random() * 30 },
            // ]
        });
    }
    return datapoints;
}

function randomizeData() {
    mutableDataset.value = makeDs({ qty: 24, maxVal: 200 });
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
    return `type VueUiCirclePackDatasetItem = {
    name: string
    value: number
    color?: string
    children?: VueUiCirclePackDatasetItem[]
}`;
});

const codeDataset = ref(`const dataset: VueUiCirclePackDatasetItem[] = [
    {
        name: "Datapoint A",
        value: 200,
        children: [
            {
                name: "Child A-1",
                value: 100,
                color: '#d62728',
                children: [
                    {
                        name: 'GrandChild 1',
                        value: 70,
                    },
                    {
                        name: 'GrandChild 2',
                        value: 30,
                    },
                ]
            },
            {
                name: "Child A-2",
                value: 100
            },
        ]
    },
    {
        name: "Datapoint B",
        value: 150,
        children: [
            {
                name: "Child B-1",
                value: 50
            },
            {
                name: "Child B-2",
                value: 80
            },
            {
                name: "Child B-3",
                value: 20
            },
        ]
    },
    {
        name: "Datapoint C",
        value: 100
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
    <BaseDocTitle name="VueUiCirclePack" />

    <BaseDocDescription
        :text="translations.docs.tooltips.circlePack[store.lang]"
    />

    <BaseDocHeaderActions
        targetLink="vue-ui-circle-pack"
        targetMaker="VueUiCirclePack"
        :configSource="mainConfig.vue_ui_circle_pack"
    />

    <div :class="`transition-all mx-auto w-full sm:w-2/3 pb-12`">
        <DocSnapper
            :isFixed="isFixed"
            :disabled="!isFixed || isMobile"
            @fixChart="fixChart"
            @resetDefault="resetDefault"
            @copyToClipboard="copyToClipboard(config)"
        >
            <BaseCard>
                <div class="w-full">
                    <VueDataUi
                        component="VueUiCirclePack"
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
                </div>
            </BaseCard>
        </DocSnapper>
        <!-- <BaseRandomButton @click="randomizeData" /> -->
    </div>

    <div class="w-full flex justify-center">
        <BaseViewExampleButton link="/examples/categories#vue-ui-circle-pack" />
    </div>

    <Rater itemId="vue_ui_circle_pack" />

    <BaseMigrationInfo debug />

    <Box
        ref="box"
        showResponsive
        showEmits
        showSlots
        showTooltip
        showThemes
        showCallbacks
        showPatterns
        schema="vue_ui_circle_pack"
        signInfo="positiveOnly"
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
            <DebugHint
                component="VueUiCirclePack"
                configType="VueUiCirclePackConfig"
            />

            <BaseCopyConfig :config="config" @reset="resetDefault" />

            <div class="my-4">
                TS type:
                <code class="text-app-blue">VueUiCirclePackConfig</code>
            </div>

            <div class="my-4">
                Toggle tree view:
                <input type="checkbox" v-model="showAllConfig" />
            </div>
            <code ref="configCode">
                <VueUiCirclePackConfigFields
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
                component="VueUiCirclePack"
                :names="['selectDatapoint', 'copyAlt']"
            />

            <ExposedMethods
                component="VueUiCirclePack"
                getImage
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

            const circlePackChart = ref(null);
            const circlePackDataset = ref([]);

            onMounted(async () => {
                circlePackDataset.value = await circlePackChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiCirclePack
                ref="circlePackChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiCirclePack
                ref="circlePackChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        circlePackDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.circlePackDataset = await this.$refs.circlePackChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
            </div>
        </template>

        <template #slots>
            <BaseSlotDocumenter
                componentName="VueUiCirclePack"
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
                    'pattern',
                    'zoom-label',
                    'data-label-circlePack',
                    'user-menu',
                    'annotator-actions',
                ]"
            >
                <template #top>
                    <BaseSlotsImplementationLink
                        link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-circle-pack.vue"
                    />
                </template>
            </BaseSlotDocumenter>
        </template>

        <template #custom-tooltip>
            <h3 class="mb-4">{{ translations.customFormat[store.lang] }}</h3>
            <code class="text-gray-500 dark:text-[#8A8A8A]"
                >config.style.chart.tooltip.customFormat</code
            >
            <CodeParser
                class="mt-4"
                language="javascript"
                :content="customFormatCode"
            />

            <h3 class="my-4">{{ translations.customFormatCss[store.lang] }}</h3>
            <CodeParser
                language="css"
                content=".vue-data-ui-custom-tooltip{ }"
            />
        </template>

        <template #themes>
            <ThemesVueUiCirclePack :dataset="dataset" />
        </template>

        <template #responsive>
            <ResponsiveUnit height="500px">
                <template #chart>
                    <VueDataUi
                        component="VueUiCirclePack"
                        :dataset="dataset"
                        :config="{ ...config, responsive: true }"
                    />
                </template>
            </ResponsiveUnit>
        </template>

        <template #patterns>
            <VueDataUi
                component="VueUiCirclePack"
                :dataset="mutableDataset"
                :config="config"
                :key="key"
            >
                <template #pattern="{ seriesIndex, patternId }">
                    <VueUiPattern
                        :id="patternId"
                        name="maze"
                        stroke="#FFFFFF20"
                        :strokeWidth="3"
                        :scale="0.4"
                    />
                </template>
            </VueDataUi>
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
</template>
