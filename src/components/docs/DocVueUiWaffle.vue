<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiWaffleConfigFields from "./configuration/VueUiWaffleConfigFields.vue";
import { ref, watch, computed, nextTick, onMounted } from "vue";
import { CopyIcon } from "vue-tabler-icons";
import Box from "../Box.vue";
import { useMainStore } from "../../stores";
import ThemesVueUiWaffle from "../themes/ThemesVueUiWaffle.vue";
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
        name: "Serie 1",
        values: [300, 1],
    },
    {
        name: "Serie 2",
        values: [200],
    },
    {
        name: "Serie 3",
        values: [100],
    },
]);

const codeDataset = ref(`const dataset: VueUiWaffleDatasetItem[] = [
        {
            name: "Serie 1",
            values: [300, 1]
        },
        {
            name: "Serie 2",
            values: [200]
        },
        {
            name: "Serie 3",
            values: [100]
        }
    ];`);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            useBlurOnHover: true,
            useCustomCells: false,
            useAnimation: true,
            transitions: {
                enable: true,
                pauseOnLoad: true,
                pauseOnDatasetChange: false,
                activationDelayMs: 300,
            },
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
                        labels: {
                            dataLabels: {
                                showValueFirst: true,
                                usePercentageParens: true,
                                useValueParens: false,
                                prefix: "",
                                suffix: "",
                            },
                            captions: {
                                show: false,
                                showSerieName: false,
                                serieNameAbbreviation: true,
                                serieNameMaxAbbreviationSize: 3,
                                fontSize: 12,
                                showValue: true,
                                showPercentage: true,
                                roundingValue: 0,
                                roundingPercentage: 0,
                                offsetX: 0,
                                offsetY: 0,
                            },
                        },
                        grid: { size: 10, spaceBetween: 0, vertical: false },
                        rect: {
                            rounded: true,
                            rounding: 2,
                            stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                            strokeWidth: 3,
                            useGradient: true,
                            gradientIntensity: isDarkMode.value ? 40 : 20,
                            merged: false,
                            selection: {
                                unselectedOpacity: 0.6,
                                wrap: {
                                    show: true,
                                    stroke: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    strokeWidth: 3,
                                    strokeLinejoin: "round",
                                },
                            },
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
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
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
                    legend: {
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        bold: false,
                        fontSize: 14,
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
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
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
    return `type VueUiWaffleDatasetItem = {
    name: string
    values: number[]
    color?: string
}`;
});

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
        <BaseDocTitle name="VueUiWaffle" />

        <BaseDocDescription
            :text="translations.docs.tooltips.waffle[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-waffle"
            targetMaker="VueUiWaffle"
            :configSource="mainConfig.vue_ui_waffle"
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
                    <VueUiWaffle
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-waffle" />
        </div>

        <Rater itemId="vue_ui_waffle" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showThemes
            showResponsive
            showPatterns
            schema="vue_ui_waffle"
            signInfo="positiveOrNegativeOnly"
        >
            <template v-slot:dataset>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
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
                    component="VueUiWaffle"
                    configType="VueUiWaffleConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiWaffleConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiWaffleConfigFields
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

            <template v-slot:events-and-methods>
                <ComponentEmits
                    component="VueUiWaffle"
                    :names="['selectLegend', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiWaffle"
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

            const waffleChart = ref(null);
            const waffleDataset = ref([]);

            onMounted(async () => {
                waffleDataset.value = await waffleChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        waffleDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.waffleDataset = await this.$refs.waffleChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiWaffle"
                    :types="[
                        'hint',
                        'svg',
                        'cell',
                        'legend',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-waffle.vue"
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
                <ThemesVueUiWaffle />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiWaffle
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

            <template #patterns>
                <div class="w-full mx-auto max-w-[500px]">
                    <VueUiWaffle :dataset="dataset" :config="config" :key="key">
                        <template #pattern="{ seriesIndex, patternId }">
                            <VueUiPattern
                                v-if="seriesIndex === 0"
                                :id="patternId"
                                name="squares"
                                stroke="#0000FF60"
                                :scale="0.64"
                            />
                            <VueUiPattern
                                v-if="seriesIndex === 1"
                                :id="patternId"
                                name="squares"
                                stroke="#0000FF40"
                                :scale="0.64"
                            />
                            <VueUiPattern
                                v-if="seriesIndex === 2"
                                :id="patternId"
                                name="squares"
                                stroke="#FF000060"
                                :scale="0.64"
                            />
                        </template>
                    </VueUiWaffle>
                </div>
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
