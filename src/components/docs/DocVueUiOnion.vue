<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiOnionConfigFields from "./configuration/VueUiOnionConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiOnion from "../themes/ThemesVueUiOnion.vue";
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
        name: "Serie 1",
        percentage: 21,
        value: 1200,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 2",
        percentage: 34,
        value: 1000,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 3",
        percentage: 55,
        value: 500,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 4",
        percentage: 79,
        value: 1280,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 5",
        percentage: 52,
        value: 145,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 6",
        percentage: 100,
        value: 13,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 7",
        percentage: 54,
        value: 450,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 8",
        percentage: 88,
        value: 202,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 9",
        percentage: 65,
        value: 132,
        prefix: "",
        suffix: "",
    },
    {
        name: "Serie 10",
        percentage: 75,
        value: 654,
        prefix: "",
        suffix: "",
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
            useBlurOnHover: true,
            useCssAnimation: true,
            useStartAnimation: true,
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
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    useGradient: true,
                    gradientIntensity: 20,
                    layout: {
                        maxThickness: 64,
                        gutter: {
                            color: isDarkMode.value ? "#3A3A3A" : "#D1D1D1",
                            width: 0.62,
                        },
                        track: { width: 0.62 },
                        labels: {
                            showValueFirst: true,
                            usePercentageParens: true,
                            useValueParens: false,
                            show: true,
                            fontSize: 14,
                            minFontSize: 6,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            roundingValue: 0,
                            roundingPercentage: 0,
                            bold: true,
                            offsetY: 0,
                            offsetX: 0,
                            value: { show: true },
                            percentage: { show: true },
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
                    legend: {
                        show: true,
                        bold: true,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        roundingValue: 0,
                        roundingPercentage: 0,
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
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFF",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                        borderWidth: 1,
                        showValue: true,
                        showPercentage: true,
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
                responsiveBreakpoint: 300,
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
                translations: {
                    value: "Value",
                    percentage: "Percentage",
                    serie: "Serie",
                },
            },
        }),
    set: configState.set,
});

const slicer = ref(4);

const mutableDataset = ref(
    JSON.parse(JSON.stringify(dataset.value)).slice(0, slicer.value),
);
function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

function updateDataset() {
    mutableDataset.value = JSON.parse(
        JSON.stringify(dataset.value.slice(0, slicer.value)),
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

function randomizeData() {
    for (let i = 0; i < mutableDataset.value.length; i += 1) {
        mutableDataset.value[i].value = Math.random() * 2000;
        mutableDataset.value[i].percentage = Math.random() * 100;
    }
}

const dsTypeCode = computed(() => {
    return `type VueUiOnionDatasetItem = {
    name: string
    percentage: number // 0 - 100
    value: number
    color?: string
    prefix?: string
    suffix?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiOnionDatasetItem[] = [
    {
        name: "Serie 1",
        percentage: 21,
        value: 1200,
    },
    {
        name: "Serie 2",
        percentage: 34,
        value: 1000,
    },
    {
        name: "Serie 3",
        percentage: 55,
        value: 500
    },
    {
        name: "Serie 4",
        percentage: 79,
        value: 1280
    }
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
        <BaseDocTitle name="VueUiOnion" />

        <BaseDocDescription
            :text="translations.docs.tooltips.onion[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-onion"
            targetMaker="VueUiOnion"
            :configSource="mainConfig.vue_ui_onion"
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
                    <VueUiOnion
                        :dataset="mutableDataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div
            class="mt-6 flex flex-col gap-3 mx-auto justify-center place-items-center"
        >
            <label for="player"
                >{{ translations.docs.showMoreSeries[store.lang] }}
            </label>
            <input
                id="player"
                type="range"
                :min="1"
                :max="10"
                v-model="slicer"
                @input="updateDataset"
                class="accent-app-green max-w-[200px]"
            />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-onion" />
        </div>

        <Rater itemId="vue_ui_onion" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showThemes
            showResponsive
            schema="vue_ui_onion"
            signInfo="positiveOnly"
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
                    component="VueUiOnion"
                    configType="VueUiOnionConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiOnionConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiOnionConfigFields
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

                <div class="overflow-w-auto"></div>
            </template>
            <template v-slot:events-and-methods>
                <ComponentEmits
                    component="VueUiOnion"
                    :names="['selectLegend', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiOnion"
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

                            const onionChart = ref(null);
                            const onionDataset = ref([]);

                            onMounted(async () => {
                                onionDataset.value = await onionChart.value.getData();
                            });

                            const config = ref({
                                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                            });
                            const dataset = ref([
                                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                            ]);

                        <span class="text-gray-400">&lt;/script&gt;</span>

                        <span class="text-gray-400">&lt;template&gt;</span>
                            &lt;VueUiOnion
                                ref="onionChart"
                                :config="config"
                                :dataset="dataset"
                            /&gt;
                        <span class="text-gray-400">&lt;/template&gt;</span>
                    </code>
                    <span class="text-black dark:text-app-green">Using options API:</span>
                    <code>
                        <span class="text-gray-400">&lt;template&gt;</span>
                            &lt;VueUiOnion
                                ref="onionChart"
                                :config="config"
                                :dataset="dataset"
                            /&gt;
                        <span class="text-gray-400">&lt;/template&gt;</span>

                        <span class="text-gray-400">&lt;script&gt;</span>
                            export default {
                                data() {
                                    return {
                                        onionDataset: [],
                                        config: {
                                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                                        },
                                        dataset: [
                                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                                        ]
                                    }
                                },
                                async mounted () {
                                    this.onionDataset = await this.$refs.onionChart.getData();
                                }
                            }
                        <span class="text-gray-400">&lt;/script&gt;</span>
                    </code>
                    </pre>
                </div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiOnion"
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-onion.vue"
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
                <ThemesVueUiOnion />
            </template>

            <template #responsive>
                <ResponsiveUnit width="300px">
                    <template #chart>
                        <VueUiOnion
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
