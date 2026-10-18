<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiGaugeConfigFields from "./configuration/VueUiGaugeConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiGauge from "../themes/ThemesVueUiGauge.vue";
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
const lang = computed(() => store.lang);

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

const value1 = ref(4);
const value2 = ref(-42);

const dataset1 = computed(() => {
    return {
        base: 12250,
        value: value1.value,
        series: [
            {
                from: 1,
                to: 3,
                color: lang.value === "zh" ? "#42D392" : "#ff6400",
                name: "BAD",
            },
            {
                from: 3,
                to: 4,
                color: "#5f8bee",
                name: "ACCEPTABLE",
            },
            {
                from: 4,
                to: 5,
                color: lang.value === "zh" ? "#FF6400" : "#42d392",
                name: "VERY GOOD",
            },
        ],
    };
});

const dataset2 = computed(() => {
    return {
        base: 21200,
        value: value2.value,
        series: [
            {
                from: -100,
                to: 0,
                color: lang.value === "zh" ? "#42D392" : "#ff6400",
                name: "CRITICAL",
            },
            {
                from: 0,
                to: 100,
                color: lang.value === "zh" ? "#FF6400" : "#42d392",
                name: "NOMINAL",
            },
        ],
    };
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    animation: { use: true, speed: 1, acceleration: 1 },
                    layout: {
                        radiusRatio: 1,
                        track: {
                            size: 1,
                            useGradient: true,
                            gradientIntensity: 20,
                        },
                        markers: {
                            show: true,
                            prefix: "",
                            suffix: "",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: true,
                            fontSizeRatio: 1,
                            offsetY: 0,
                            roundingValue: 0,
                        },
                        segmentSeparators: {
                            show: false,
                            offsetOut: 0,
                            offsetIn: 0,
                            stroke: isDarkMode.value ? "#4A4A4A" : "#1A1A1A",
                            strokeWidth: 2,
                        },
                        segmentNames: {
                            show: true,
                            curved: true,
                            offsetRatio: 1.1,
                            fontSize: 16,
                            minFontSize: 6,
                            useSerieColor: true,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                        },
                        indicatorArc: {
                            show: true,
                            radius: 123,
                            fill: isDarkMode.value ? "#3A3A3A" : "#E1E5E8",
                        },
                        pointer: {
                            show: true,
                            type: "pointy",
                            size: 1,
                            stroke: isDarkMode.value ? "#4A4A4A" : "#CCCCCC",
                            strokeWidth: 12,
                            useRatingColor: true,
                            color: isDarkMode.value ? "#1A1A1A" : "#8A8A8A",
                            circle: {
                                radius: 10,
                                stroke: isDarkMode.value
                                    ? "#3A3A3A"
                                    : "#F3F4F6",
                                strokeWidth: 2,
                                color: isDarkMode.value ? "#5A5A5A" : "#BBBBBB",
                            },
                        },
                    },
                    legend: {
                        show: true,
                        fontSize: 48,
                        prefix: "",
                        suffix: "",
                        roundingValue: 1,
                        showPlusSymbol: true,
                        useRatingColor: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    },
                    title: {
                        text: "Title",
                        color: isDarkMode.value ? "#E1E5E8" : "#1A1A1A",
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
                    fullscreen: true,
                    annotator: true,
                },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    img: "Download PNG",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            translations: { base: "Base" },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
    forceChartUpdate();
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

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomizeData() {
    value1.value = getRandomNumber(1, 5);
    value2.value = getRandomNumber(-100, 100);
}

const dsTypeCode = computed(() => {
    return `type VueUiGaugeDataset = {
    value: number
    base?: number
    series: Array<{
        from: number;
        to: number;
        color?: string;
        name?: string;
        nameOffsetRatio?: number // example: 1.1
    }>
}`;
});

const codeDataset1 = ref(`const dataset: VueUiGaugeDataset = {
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
            color: "#ff6400",
            name: 'bad'
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee",
            name: 'acceptable'
        },
        {
            from: 4,
            to: 5,
            color: "#42d392",
            name: 'very good'
        },
    ]
};`);

const codeDataset2 = ref(`const dataset: VueUiGaugeDataset = {
    base: 21200,
    value: -42,
    series: [
        {
            from: -100,
            to: 0,
            color: "#ff6400",
            name: 'critical'
        },
        {
            from: 0,
            to: 100,
            color: "#42d392",
            name: 'nominal'
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiGauge" />

        <BaseDocDescription
            :text="translations.docs.tooltips.gauge[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-gauge"
            targetMaker="VueUiGauge"
            :configSource="mainConfig.vue_ui_gauge"
        />

        <div class="w-full sm:w-3/4 mx-auto flex flex-row gap-2">
            <div :class="`transition-all mx-auto w-full`">
                <DocSnapper
                    :isFixed="isFixed"
                    :disabled="!isFixed || isMobile"
                    @fixChart="fixChart"
                    @resetDefault="resetDefault"
                    @copyToClipboard="copyToClipboard(config)"
                >
                    <BaseCard>
                        <div class="flex flex-row">
                            <VueUiGauge
                                :dataset="{ ...dataset1, value: value1 }"
                                :config="config"
                                :key="`gauge_1_${key}`"
                            />
                            <VueUiGauge
                                v-if="!isFixed"
                                :dataset="{ ...dataset2, value: value2 }"
                                :config="config"
                                :key="`gauge_2_${key}`"
                            />
                        </div>
                    </BaseCard>
                </DocSnapper>
            </div>
        </div>
        <BaseRandomButton @click="randomizeData" />

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-gauge" />
        </div>

        <Rater itemId="vue_ui_gauge" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showEmits
            showSlots
            showThemes
            showCallbacks
            showResponsive
            :showPatterns="false"
            schema="vue_ui_gauge"
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

                <div class="w-full overflow-x auto">
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset1"
                        :title="translations.docs.example[store.lang] + ' 1'"
                    />
                    <CodeParser
                        class="mt-6"
                        language="typescript"
                        @copy="store.copy()"
                        :content="codeDataset2"
                        :title="translations.docs.example[store.lang] + ' 2'"
                    />
                </div>
            </template>
            <template v-slot:tab1>
                <DebugHint
                    component="VueUiGauge"
                    configType="VueUiGaugeConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiGaugeConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiGaugeConfigFields
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
                <ComponentEmits component="VueUiGauge" :names="['copyAlt']" />
                <ExposedMethods
                    component="VueUiGauge"
                    getImage
                    :names="['generatePdf', 'generateImage', 'generateSvg']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiGauge"
                    :types="[
                        'svg',
                        'legend',
                        'watermark',
                        'source',
                        'chart-background',
                        'pattern',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-gauge.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiGauge />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiGauge
                            :dataset="dataset1"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                            :key="`gauge_1_${key}`"
                        />
                    </template>
                </ResponsiveUnit>
            </template>

            <template #tab8>
                <VueUiGauge
                    :dataset="{ ...dataset2, value: 42 }"
                    :config="
                        isDarkMode
                            ? {
                                  ...config,
                                  style: {
                                      ...config.style,
                                      chart: {
                                          ...config.style.chart,
                                          animation: { use: false },
                                          layout: {
                                              ...config.style.chart.layout,
                                              radiusRatio: 0.8,
                                              track: {
                                                  ...config.style.chart.layout
                                                      .track,
                                                  size: 4,
                                              },
                                              pointer: {
                                                  ...config.style.chart.layout
                                                      .pointer,
                                                  size: 1,
                                                  useRatingColor: false,
                                                  stroke: 'transparent',
                                                  color: '#3A3A3A',
                                                  circle: {
                                                      ...config.style.chart
                                                          .layout.pointer
                                                          .circle,
                                                      color: '#2A2A2A',
                                                      stroke: '#4A4A4A',
                                                      strokeWidth: 1,
                                                  },
                                              },
                                              segmentNames: {
                                                  ...config.style.chart.layout
                                                      .segmentNames,
                                                  fontSize: 36,
                                              },
                                              segmentSeparators: {
                                                  show: true,
                                                  offsetOut: 24,
                                                  strokeWidth: 1,
                                              },
                                              markers: {
                                                  ...config.style.chart.layout
                                                      .markers,
                                                  offsetY: 36,
                                              },
                                          },
                                      },
                                  },
                              }
                            : {
                                  ...config,
                                  style: {
                                      ...config.style,
                                      chart: {
                                          ...config.style.chart,
                                          layout: {
                                              ...config.style.chart.layout,
                                              radiusRatio: 0.8,
                                              track: {
                                                  ...config.style.chart.layout
                                                      .track,
                                                  size: 4,
                                              },
                                              pointer: {
                                                  ...config.style.chart.layout
                                                      .pointer,
                                                  size: 0.8,
                                                  useRatingColor: false,
                                                  stroke: 'transparent',
                                                  color: '#3A3A3A',
                                                  circle: {
                                                      ...config.style.chart
                                                          .layout.pointer
                                                          .circle,
                                                      color: '#6A6A6A',
                                                      stroke: '#e1e5e8',
                                                      strokeWidth: 1,
                                                  },
                                              },
                                              segmentNames: {
                                                  ...config.style.chart.layout
                                                      .segmentNames,
                                                  fontSize: 36,
                                              },
                                              segmentSeparators: {
                                                  show: true,
                                                  offsetOut: 24,
                                                  strokeWidth: 1,
                                              },
                                              markers: {
                                                  ...config.style.chart.layout
                                                      .markers,
                                                  offsetY: 36,
                                              },
                                          },
                                      },
                                  },
                              }
                    "
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            v-if="seriesIndex === 0"
                            :id="patternId"
                            name="bubbles"
                            stroke="#FFFFFF40"
                            :strokeWidth="1"
                            :scale="1"
                        />
                        <VueUiPattern
                            v-if="seriesIndex === 1"
                            :id="patternId"
                            name="scales"
                            stroke="#FFFFFF40"
                        />
                    </template>
                </VueUiGauge>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="['annotator', 'fullscreen', 'img', 'pdf', 'svg']"
                />
            </template>
        </Box>
    </div>
</template>
