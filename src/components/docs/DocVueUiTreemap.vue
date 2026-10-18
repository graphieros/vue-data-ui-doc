<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiTreemapConfigFields from "./configuration/VueUiTreemapConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseRandomButton from "../BaseRandomButton.vue";
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
import UcTreemap from "../useCases/uc-treemap.vue";
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
        name: "Parent 1",
        value: 100,
        children: [
            {
                name: "P1 C1",
                value: 70,
            },
            {
                name: "P1 C2",
                value: 20,
            },
            {
                name: "P1 C3",
                value: 10,
            },
        ],
    },
    {
        name: "Parent 2",
        value: 110,
        children: [
            {
                name: "P2 C1",
                value: 80,
            },
            {
                name: "P2 C2",
                value: 20,
            },
            {
                name: "P2 C3",
                value: 10,
            },
        ],
    },
    {
        name: "Parent 3",
        value: 75,
        children: [
            {
                name: "P3 C1",
                value: 20,
            },
            {
                name: "P3 C2",
                value: 10,
            },
            {
                name: "P3 C3",
                value: 10,
            },
            {
                name: "P3 C4",
                value: 5,
            },
            {
                name: "P3 C5",
                value: 5,
            },
            {
                name: "P3 C6",
                value: 10,
            },
            {
                name: "P3 C7",
                value: 5,
            },
            {
                name: "P3 C8",
                value: 10,
                children: [
                    {
                        name: "P3 C8 CC1 qskdjh qksjdh qkjshdk qjsd",
                        value: 5,
                    },
                    {
                        name: "P3 C8 CC2",
                        value: 5,
                    },
                ],
            },
        ],
    },
    {
        name: "Parent 4",
        value: 30,
        children: [
            {
                name: "P4 C1",
                value: 10,
            },
            {
                name: "P4 C2",
                value: 15,
            },
            {
                name: "P4 C3",
                value: 5,
            },
        ],
    },
    {
        name: "Parent 5",
        value: 30,
        children: [
            {
                name: "P5 C1",
                value: 10,
            },
            {
                name: "P5 C2",
                value: 15,
            },
            {
                name: "P5 C3",
                value: 5,
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
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 800,
                    width: 1300,
                    zoom: { show: false },
                    padding: { top: 0, left: 0, bottom: 0, right: 0 },
                    layout: {
                        sorted: true,
                        rects: {
                            stroke: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                            strokeWidth: 1,
                            borderRadius: 0,
                            colorRatio: 0.3,
                            gradient: { show: true, intensity: 30 },
                            selected: {
                                stroke: isDarkMode.value
                                    ? "#2A2A2A"
                                    : "#f3f4f6",
                                strokeWidth: 1,
                                unselectedOpacity: 0.6,
                            },
                            group: {
                                stroke: isDarkMode.value
                                    ? "#8A8A8A"
                                    : "#A1A1A1",
                                strokeWidth: 1,
                                useSeriesBackgroundColor: false,
                                backgroundLighterRatio: 0.4,
                                label: {
                                    adaptColorToBackground: false,
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                },
                            },
                        },
                        labels: {
                            showDefaultLabels: true,
                            fontSize: 24,
                            minFontSize: 10,
                            fontSizeZoomFactor: 6,
                            hideUnderProportion: 0.03,
                            prefix: "",
                            suffix: "",
                            rounding: 0,
                            name: { show: true, bold: true },
                            value: { show: true, bold: false },
                        },
                    },
                    legend: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        show: true,
                        fontSize: 16,
                        bold: false,
                        roundingValue: 0,
                        roundingPercentage: 0,
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
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#fafafa" : "#2D353C",
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
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#FFFFFF",
                        fontSize: 14,
                        roundingValue: 1,
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
                responsiveBreakpoint: 300,
                columnNames: {
                    series: "Series",
                    value: "Value",
                    percentage: "Percentage",
                },
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
    dataset.value[0].children[0].value = Math.random() * 100;
    dataset.value[0].children[1].value = Math.random() * 100;
    dataset.value[0].children[2].value = Math.random() * 100;
    dataset.value[0].value = dataset.value[0].children
        .map((c) => c.value)
        .reduce((a, b) => a + b, 0);

    dataset.value[1].children[0].value = Math.random() * 100;
    dataset.value[1].children[1].value = Math.random() * 100;
    dataset.value[1].children[2].value = Math.random() * 100;
    dataset.value[1].value = dataset.value[1].children
        .map((c) => c.value)
        .reduce((a, b) => a + b, 0);

    dataset.value[2].children[0].value = Math.random() * 30;
    dataset.value[2].children[1].value = Math.random() * 30;
    dataset.value[2].children[2].value = Math.random() * 30;
    dataset.value[2].children[3].value = Math.random() * 30;
    dataset.value[2].children[4].value = Math.random() * 30;
    dataset.value[2].children[5].value = Math.random() * 30;
    dataset.value[2].children[6].value = Math.random() * 30;
    dataset.value[2].value = dataset.value[2].children
        .map((c) => c.value)
        .reduce((a, b) => a + b, 0);
}

const dsTypeCode = computed(() => {
    return `type VueUiTreemapDatasetItem = {
    name: string
    value: number
    color?: string
    children?: VueUiTreemapDatasetItem[]
}`;
});

const codeDataset = ref(`const dataset: VueUiTreemapDatasetItem[] = [
    {
        name: "Parent 1",
        value: 100,
        children: [
            {
                name: "P1 C1",
                value: 70,
            },
            {
                name: 'P1 C2',
                value: 20
            },
            {
                name: 'P1 C3',
                value: 10,
            },
        ]
    },
    {
        name: "Parent 2",
        value: 110,
        children: [
            {
                name: "P2 C1",
                value: 80,
            },
            {
                name: 'P2 C2',
                value: 20
            },
            {
                name: 'P2 C3',
                value: 10,
                children: [
                    {
                        name: "P2 C3 A",
                        value: 4,
                    },
                    {
                        name: 'P2 C3 B',
                        value: 3
                    },
                    {
                        name: 'P2 C3 C',
                        value: 3,
                    },
                ]
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiTreemap" />

        <BaseDocDescription
            :text="translations.docs.tooltips.treemap[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-treemap"
            :configSource="mainConfig.vue_ui_treemap"
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
                        component="VueUiTreemap"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-treemap" />
        </div>

        <Rater itemId="vue_ui_treemap" />

        <BaseMigrationInfo debug padding />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showUseCases
            :showThemes="false"
            showResponsive
            schema="vue_ui_treemap"
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
                    component="VueUiTreemap"
                    configType="VueUiTreemapConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiTreemapConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiTreemapConfigFields
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
                    component="VueUiTreemap"
                    :names="['selectLegend', 'selectDatapoint', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiTreemap"
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

            const treemapChart = ref(null);
            const treemapDataset = ref([]);

            onMounted(async () => {
                treemapDataset.value = await treemapChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiTreemap
                ref="treemapChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiTreemap
                ref="treemapChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        treemapDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.treemapDataset = await this.$refs.treemapChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiTreemap"
                    :types="[
                        'hint',
                        'svg',
                        'rect',
                        'group-label',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'breadcrumb-label',
                        'breadcrumb-arrow',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-treemap.vue"
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
                <uc-treemap />
            </template>

            <!-- <template #tab6>
                <ThemesVueUiTreemap />
            </template> -->

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi
                            component="VueUiTreemap"
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
