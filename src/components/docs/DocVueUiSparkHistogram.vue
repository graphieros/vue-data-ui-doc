<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSparkHistogramConfigFields from "./configuration/VueUiSparkHistogramConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiSparkHistogram from "../themes/ThemesVueUiSparkHistogram.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

const currentShape = ref("square");

const shapes = ref([
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star",
]);

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
        value: 1.2,
        valueLabel: "20%",
        timeLabel: "09:00",
        intensity: 0.2,
    },
    {
        value: 1.3,
        valueLabel: "50%",
        timeLabel: "10:00",
        intensity: 0.5,
    },
    {
        value: 1.1,
        valueLabel: "60%",
        timeLabel: "11:00",
        intensity: 0.6,
    },
    {
        value: 0.8,
        valueLabel: "70%",
        timeLabel: "12:00",
        intensity: 0.7,
    },
    {
        value: 2,
        valueLabel: "100%",
        timeLabel: "13:00",
        intensity: 1,
    },
    {
        value: 2.1,
        valueLabel: "100%",
        timeLabel: "14:00",
        intensity: 1,
    },
    {
        value: 2.3,
        valueLabel: "80%",
        timeLabel: "15:00",
        intensity: 0.8,
    },
    {
        value: 2.1,
        valueLabel: "70%",
        timeLabel: "16:00",
        intensity: 0.7,
    },
    {
        value: 0.9,
        valueLabel: "60%",
        timeLabel: "17:00",
        intensity: 0.6,
    },
    {
        value: 0.7,
        valueLabel: "50%",
        timeLabel: "18:00",
        intensity: 0.5,
    },
    {
        value: 0.3,
        valueLabel: "30%",
        timeLabel: "19:00",
        intensity: 0.3,
    },
    {
        value: 0.2,
        valueLabel: "20%",
        timeLabel: "20:00",
        intensity: 0.2,
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
                        "Use the left and right arrow keys to move between data points.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                    series: "Series",
                    time: "Time",
                    value: "Value",
                    label: "Label",
                },
            },
            style: {
                backgroundColor: isDarkMode.value ? "#1A1A1A00" : "#F3F4F6",
                fontFamily: "inherit",
                animation: { show: true, speedMs: 500 },
                layout: {
                    height: 160,
                    width: 1200,
                    padding: { top: 36, right: 0, left: 0, bottom: 64 },
                },
                bars: {
                    shape: currentShape.value,
                    strokeWidth: 0,
                    colors: {
                        positive: "#5f8bee",
                        negative: "#ff6400",
                        gradient: { show: true },
                    },
                    borderRadius: 24,
                    gap: 12,
                },
                labels: {
                    value: {
                        show: true,
                        fontSize: 24,
                        minFontSize: isDarkMode.value ? undefined : 6,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        bold: true,
                        rounding: 1,
                        prefix: "",
                        suffix: "",
                        offsetY: -4,
                    },
                    valueLabel: {
                        show: true,
                        fontSize: 24,
                        minFontSize: isDarkMode.value ? undefined : 6,
                        color: isDarkMode.value ? "#777777" : "#2D353C",
                        bold: false,
                        rounding: 0,
                    },
                    timeLabel: {
                        show: true,
                        fontSize: 24,
                        minFontSize: isDarkMode.value ? undefined : 6,
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                        bold: false,
                    },
                },
                selector: {
                    stroke: "#5f8bee",
                    borderRadius: 12,
                    strokeWidth: 0,
                    strokeDasharray: 0,
                    fill: isDarkMode.value ? "#FFFFFF10" : "#2D353C10",
                },
                title: {
                    textAlign: "left",
                    text: "Rainfall in mm",
                    color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                    fontSize: 16,
                    bold: true,
                    margin: "0 0 6px 0",
                    subtitle: {
                        color: "#A1A1A1",
                        text: "",
                        fontSize: 12,
                        bold: false,
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
    return `type VueUiSparkHistogramDatasetItem = {
  value: number
  intensity?: number // (0 to 1)
  valueLabel?: string
  timeLabel?: string
}`;
});

const codeDataset = ref(`const dataset: VueUiSparkHistogramDatasetItem[] = [
  {
    value: 1.2,
    valueLabel: "20%",
    timeLabel: "09:00",
    intensity: 0.2,
  },
  {
    value: 1.3,
    valueLabel: "50%",
    timeLabel: "10:00",
    intensity: 0.5,
  },
  {
    value: 1.1,
    valueLabel: "60%",
    timeLabel: "11:00",
    intensity: 0.6,
  },
  {
    value: 0.8,
    valueLabel: "70%",
    timeLabel: "12:00",
    intensity: 0.7,
  },
  {
    value: 2,
    valueLabel: "100%",
    timeLabel: "13:00",
    intensity: 1,
  },
  {
    value: 2.1,
    valueLabel: "100%",
    timeLabel: "14:00",
    intensity: 1,
  },
  {
    value: 2.3,
    valueLabel: "80%",
    timeLabel: "15:00",
    intensity: 0.8,
  },
  {
    value: 2.1,
    valueLabel: "70%",
    timeLabel: "16:00",
    intensity: 0.7,
  },
  {
    value: 0.9,
    valueLabel: "60%",
    timeLabel: "17:00",
    intensity: 0.6,
  },
  {
    value: 0.7,
    valueLabel: "50%",
    timeLabel: "18:00",
    intensity: 0.5,
  },
  {
    value: 0.3,
    valueLabel: "30%",
    timeLabel: "19:00",
    intensity: 0.3,
  },
  {
    value: 0.2,
    valueLabel: "20%",
    timeLabel: "20:00",
    intensity: 0.2,
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
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiSparkHistogram" />

        <BaseDocDescription
            :text="translations.docs.tooltips.histogram[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkhistogram"
            targetMaker="VueUiSparkHistogram"
            :configSource="mainConfig.vue_ui_sparkhistogram"
        />

        <div :class="`transition-all mx-auto sm:w-full max-w-[600px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiSparkHistogram
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-sparkhistogram"
            />
        </div>

        <Rater itemId="vue_ui_sparkhistogram" />

        <BaseMigrationInfo debug />

        <Box
            ref="box"
            showResponsive
            showEmits
            showThemes
            showSlots
            schema="vue_ui_sparkhistogram"
            signInfo="positiveOnly"
        >
            <template #tab0>
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

            <template #tab1>
                <DebugHint
                    component="VueUiSparkHistogram"
                    configType="VueUiSparkHistogramConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiSparkHistogramConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiSparkHistogramConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            shapes,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template #tab2>
                <ComponentEmits
                    component="VueUiSparkHistogram"
                    :names="['selectDatapoint']"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiSparkHistogram"
                    :types="['hint', 'source', 'chart-background']"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-sparkhistogram.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #tab6>
                <ThemesVueUiSparkHistogram />
            </template>

            <template #tab7>
                <ResponsiveUnit height="250px" minHeight="200px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiSparkHistogram"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>
