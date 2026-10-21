<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiDumbbellConfigFields from "./configuration/VueUiDumbbellConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiDumbbell from "../themes/ThemesVueUiDumbbell.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
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
    { name: "Sweden", start: 5000, end: 7100 },
    { name: "Korea, Rep.", start: 4900, end: 7050 },
    { name: "Iceland", start: 6500, end: 8000 },
    { name: "Finland", start: 6400, end: 7600 },
    { name: "Norway", start: 5400, end: 6050 },
    { name: "Ireland", start: 3000, end: 2000 },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            useAnimation: true,
            animationSpeed: 2,
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
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
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    width: 600,
                    rowHeight: 48,
                    padding: { top: 12, right: 24, bottom: 12, left: 12 },
                    plots: {
                        startColor: "#ff6400",
                        endColor: "#5f8bee",
                        radius: 6,
                        stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        strokeWidth: 1,
                        link: { strokeWidth: 2, type: "curved" },
                        gradient: { show: true, intensity: 40 },
                        evaluationColors: {
                            enable: false,
                            positive: "#2ca02c",
                            negative: "#d62728",
                            neutral: "#c7c7c7",
                        },
                    },
                    grid: {
                        strokeWidth: 1,
                        scaleSteps: 10,
                        scaleMin: null,
                        scaleMax: null,
                        horizontalGrid: {
                            show: true,
                            stroke: isDarkMode.value ? "#6A6A6A" : "#cccccc",
                            strokeWidth: 0.5,
                            strokeDasharray: 4,
                        },
                        verticalGrid: {
                            show: true,
                            stroke: isDarkMode.value ? "#6A6A6A" : "#cccccc",
                            strokeWidth: 0.5,
                            strokeDasharray: 0,
                        },
                    },
                    comparisonLines: {
                        show: true,
                        strokeWidth: 1,
                        strokeDasharray: 4,
                        showRect: true,
                        rectColor: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        rectOpacity: 5,
                        showLabel: true,
                        labelColor: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        labelFontSize: 12,
                    },
                    highlighter: {
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        opacity: 5,
                    },
                    labels: {
                        prefix: "",
                        suffix: "",
                        axis: {
                            yLabel: "Y axis",
                            yLabelOffsetX: 0,
                            xLabel: "X axis",
                            xLabelOffsetY: 0,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        },
                        yAxisLabels: {
                            show: true,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            offsetX: 0,
                            bold: true,
                            showProgression: true,
                            rounding: 1,
                            formatter: null,
                        },
                        xAxisLabels: {
                            show: true,
                            fontSize: 14,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            offsetY: 0,
                            bold: false,
                            rounding: 0,
                            rotation: 0,
                            autoRotate: { enable: true, angle: -30 },
                        },
                        startLabels: {
                            show: true,
                            fontSize: 10,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            offsetY: 0,
                            rounding: 0,
                            useStartColor: true,
                            useEvaluationColor: true,
                        },
                        endLabels: {
                            show: true,
                            fontSize: 10,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            offsetY: 0,
                            rounding: 0,
                            useEndColor: true,
                            useEvaluationColor: true,
                        },
                    },
                    legend: {
                        show: true,
                        labelStart: "2014",
                        labelEnd: "2024",
                        labelPositive: "positive",
                        labelNegative: "negative",
                        labelNeutral: "neutral",
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        fontSize: 14,
                        bold: false,
                        position: "bottom",
                    },
                    title: {
                        text: "Number of researchers",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "From 2014 to 2024",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                columnNames: {
                    series: "Series",
                    start: "Start value",
                    end: "End value",
                    progression: "Progression",
                },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                    roundingValue: 0,
                    roundingPercentage: 1,
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

const configCode = ref(null);
const showAllConfig = ref(false);

watch(
    () => showAllConfig.value,
    (v) => {
        if (v) {
            Array.from(
                configCode.value.getElementsByTagName("details"),
            ).forEach((d) => d.setAttribute("open", "true"));
        } else {
            Array.from(
                configCode.value.getElementsByTagName("details"),
            ).forEach((d) => {
                if (d.hasAttribute("open")) {
                    d.removeAttribute("open");
                }
            });
        }
    },
);

const dsTypeCode = computed(() => {
    return `type VueUiDumbbellDataset = {
    name: string
    start: number
    end: number
}`;
});

const codeDataset = ref(`const dataset: VueUiDumbbellDataset[] = [
    { name: 'Sweden', start: 5000, end: 7100 },
    { name: 'Korea, Rep.', start: 4900, end: 7050 },
    { name: 'Iceland', start: 6500, end: 8000 },
    { name: 'Finland', start: 6400, end: 7600 },
    { name: 'Norway', start: 5400, end: 6050 },
    { name: 'Ireland', start: 3000, end: 2000 }
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDumbbell" />

        <BaseDocDescription
            :text="translations.docs.tooltips.dumbbell[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-dumbbell"
            :configSource="mainConfig.vue_ui_dumbbell"
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
                        component="VueUiDumbbell"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_dumbbell" />

        <BaseMigrationInfo autoRotate debug padding />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            schema="vue_ui_dumbbell"
            signInfo="both"
        >
            <template #dataset>
                <div>
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
                </div>
            </template>
            <template #configuration>
                <DebugHint
                    component="VueUiDumbbell"
                    configType="VueUiDumbbellConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiDumbbellConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiDumbbellConfigFields
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
                    component="VueUiDumbbell"
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

            const dumbbellChart = ref(null);
            const dumbbellDataset = ref([]);

            onMounted(async () => {
                dumbbellDataset.value = await dumbbellChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDumbbell
                ref="dumbbellChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDumbbell
                ref="dumbbellChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        dumbbellDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.dumbbellDataset = await this.$refs.dumbbellChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                    <ExposedMethods
                        component="VueUiDumbbell"
                        getImage
                        :names="[
                            'generatePdf',
                            'generateCsv',
                            'generateImage',
                            'generateSvg',
                            'toggleTable',
                        ]"
                    />
                </div>
            </template>
            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiDumbbell"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-dumbbell.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #themes>
                <ThemesVueUiDumbbell />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi
                            component="VueUiDumbbell"
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
