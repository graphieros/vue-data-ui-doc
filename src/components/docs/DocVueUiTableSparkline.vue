<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiTableSparklineConfigFields from "./configuration/VueUiTableSparklineConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
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
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));

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
        values: [0, 1, 2, 3, 5, 8],
        color: "#5f8bee",
    },
    {
        name: "Serie 2",
        values: [8, 12, 13, 25, 31, 42],
        color: "#42d392",
    },
    {
        name: "Serie 3",
        values: [66, 22, 33, 12, 55, 64],
        color: "#ff6400",
    },
    {
        name: "Serie 4",
        values: [54, 44, 34, 12, 32, 26],
        color: "#f7e97c",
    },
    {
        name: "Serie 5",
        values: [12, 14, 18, 25, 32, 64],
        color: "#42e9f5",
    },
]);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            debug: false,
            devHints: { enable: false },
            responsiveBreakpoint: 500,
            showAverage: true,
            showMedian: true,
            showTotal: true,
            roundingAverage: 0,
            roundingMedian: 0,
            roundingValues: 0,
            roundingTotal: 0,
            showSparklines: true,
            fontFamily: "inherit",
            colNames: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
            prefix: "",
            suffix: "",
            formatter: isDarkMode.value ? undefined : null,
            sortedDataColumnIndices: [0, 1, 2, 3, 4, 5],
            sortedSeriesName: true,
            sortedSum: true,
            sortedAverage: true,
            sortedMedian: true,
            resetSortOnClickOutside: true,
            sparkline: {
                useGradient: true,
                showArea: true,
                strokeWidth: 3,
                type: "line",
                smooth: true,
                cutNullValues: false,
                dimensions: { width: 150, heightRatio: 1 },
                animation: { show: true, animationFrames: 360 },
            },
            translations: {
                serie: "Serie",
                total: "Total",
                average: "Average",
                median: "Median",
                chart: "Evolution",
            },
            title: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                text: "Title",
                fontSize: 18,
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                bold: true,
                textAlign: "center",
                subtitle: {
                    text: "Subtitle",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    fontSize: 14,
                    bold: false,
                },
            },
            thead: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                fontSize: 14,
                outline: "none",
                textAlign: "left",
                bold: false,
                showColorMarker: isDarkMode.value ? undefined : true,
            },
            tbody: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                fontSize: 14,
                outline: "none",
                textAlign: "left",
                bold: false,
                selectedColor: {
                    useSerieColor: true,
                    fallback: isDarkMode.value ? "#FFFFFF10" : "#2D353C05",
                },
                showColorMarker: isDarkMode.value ? true : undefined,
            },
            userOptions: {
                annotatorPalette: COLOR_PICKER_PALETTE,
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                useCursorPointer: false,
                buttons: { pdf: true, img: true, csv: true, fullscreen: true },
                buttonTitles: {
                    open: "Open options",
                    close: "Close options",
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    fullscreen: "Toggle fullscreen",
                },
                print: {
                    scale: 2,
                    orientation: "auto",
                    overflowTolerance: 0.2,
                },
            },
            formater: isDarkMode.value ? null : undefined,
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
}

const { configCode, showAllConfig } = useConfigCode();

const dsTypeCode = computed(() => {
    return `type VueUiTableSparklineDatasetItem = {
  name: string
  values: number[]
  color?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiTableSparklineDatasetItem[] = [
  {
    name: "Serie 1",
    values: [0, 1, 2, 3, 5, 8],
    color: "#5f8bee",
  },
  {
    name: "Serie 2",
    values: [8, 12, 13, 25, 31, 42],
    color: "#42d392",
  },
  {
    name: "Serie 3",
    values: [66, 22, 33, 12, 55, 64],
    color: "#ff6400",
  },
  {
    name: "Serie 4",
    values: [54, 44, 34, 12, 32, 26],
    color: "#f7e97c"
  },
  {
    name: "Serie 5",
    values: [12, 14, 18, 25, 32, 64],
    color: "#42e9f5"
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
</script>

<template>
    <div class="overflow-x-auto">
        <BaseDocTitle name="VueUiTableSparkline" />

        <BaseDocDescription
            :text="translations.docs.tooltips.sparklineTable[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-table-sparkline"
            :configSource="mainConfig.vue_ui_table_sparkline"
        />

        <div
            :class="`transition-all mx-auto no-style ${isFixed ? 'fixed bottom-16 w-[300px] max-h-[500px] left-0 z-50 border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[1200px]'}`"
        >
            <Suspense>
                <template #default>
                    <BaseCard>
                        <VueUiTableSparkline
                            :dataset="dataset"
                            :config="config"
                            :key="key"
                        />
                    </BaseCard>
                </template>
                <template #fallback>
                    <BaseSpinner />
                </template>
            </Suspense>
        </div>

        <Rater itemId="vue_ui_table_sparkline" />

        <Box ref="box" showEmits showSlots showCallbacks signInfo="both">
            <template #dataset>
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

            <template #configuration>
                <DebugHint
                    component="VueUiTableSparkline"
                    configType="VueUiTableSparklineConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiTableSparklineConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiTableSparklineConfigFields
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
                    component="VueUiTableSparkline"
                    :names="['copyAlt']"
                />

                <ExposedMethods
                    component="VueUiTableSparkline"
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                    ]"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiTableSparkline"
                    :types="['source', 'user-menu']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-table-sparkline.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #callbacks>
                <UserOptionCallbacks
                    :items="['csv', 'fullscreen', 'img', 'pdf']"
                />
            </template>
        </Box>
    </div>
</template>
