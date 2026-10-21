<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiSparklineConfigFields from "./configuration/VueUiSparklineConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ucSparkline from "../useCases/uc-sparkline.vue";
import ThemesVueUiSparkline from "../themes/ThemesVueUiSparkline.vue";
import { useConfig } from "../../assets/useConfig";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import BaseRandomButton from "../BaseRandomButton.vue";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import DatetimeFormatterDoc from "../DatetimeFormatterDoc.vue";
import BaseCard from "../BaseCard.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { createNumbers } from "../maker/lib.js";
import BaseZoomState from "../Base/BaseZoomState.vue";
import ZoomStateVueUiSparkline from "./zoom-state/ZoomStateVueUiSparkline.vue";

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

// const values = [0, 1, 0, 2, 1, 3, 2, 5, 3, 8, 5, 13, 8, 21, 13, 34, 21];

// const startYear = 2026;
// const startMonth = 0;

// const dataset = ref(
//   values.map((value, index) => {
//     const date = new Date(startYear, startMonth + index, 1);
//     return {
//       period: date.getTime(),
//       value
//     };
//   })
// );

const nums = createNumbers({
    count: 16,
    seed: "patak",
    trend: null,
    mult: 100,
});

const dataset = ref(
    nums.map((n, i) => ({
        period: `period ${i + 1}`,
        value: n,
    })),
);

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
            responsive: false,
            type: "line",
            a11y: {
                translations: {
                    keyboardNavigation:
                        "Use the left and right arrow keys to move between data points.",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            gradientPath: {
                show: false,
                segments: 256,
                colors: { high: "#34eb96", low: "#eb4034" },
            },
            temperatureColors: { show: false, colors: ["#34eb96", "#eb4034"] },
            downsample: { threshold: 1095 },
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                fontFamily: "inherit",
                chartWidth: 380,
                scaleMin: null,
                scaleMax: null,
                padding: { top: 12, right: 24, bottom: 3, left: 0 },
                animation: { show: true, animationFrames: 360 },
                line: {
                    color: "#1f77b4",
                    strokeWidth: isDarkMode.value ? 2 : 3,
                    smooth: true,
                    cutNullValues: false,
                    nullDashes: { show: false },
                    dashIndices: [],
                    dashArray: 4,
                    pulse: {
                        show: false,
                        loop: true,
                        color: isDarkMode.value ? "#aec7e880" : "#aec7e8",
                        radius: isDarkMode.value ? 2 : 3,
                        durationMs: 4000,
                        easeing: "ease-in-out",
                        cubicBezier: [0.45, 0.45, 0.55, 0.55],
                        trail: { show: true, length: 12, opacity: 0.5 },
                    },
                },
                bar: { borderRadius: 3, color: "#1f77b4" },
                zeroLine: { color: "#505050", strokeWidth: 1 },
                plot: {
                    show: true,
                    radius: 4,
                    stroke: "#FFFFFF",
                    strokeWidth: 1,
                },
                verticalIndicator: {
                    show: true,
                    strokeWidth: 1.5,
                    color: "#1f77b4",
                    strokeDasharray: 3,
                },
                dataLabel: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    position: "left",
                    fontSize: 48,
                    bold: true,
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    roundingValue: 1,
                    valueType: "latest",
                    prefix: "",
                    suffix: "",
                    datetimeFormatter: {
                        enable: false,
                        locale: "en",
                        useUTC: false,
                        januaryAsYear: false,
                        options: {
                            year: "yyyy",
                            month: `MMM 'yy`,
                            day: "dd MMM",
                            hour: "HH:mm",
                            minute: "HH:mm:ss",
                            second: "HH:mm:ss",
                        },
                    },
                },
                title: {
                    show: true,
                    textAlign: "left",
                    color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                    fontSize: 16,
                    bold: true,
                    text: "Title",
                },
                tooltip: {
                    show: false,
                    fontSize: 14,
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                    offsetY: 0,
                    borderWidth: 0,
                    borderColor: isDarkMode.value ? "#3A3A3A" : "#E1E5E8",
                    borderRadius: 2,
                    backgroundOpacity: 100,
                },
                area: {
                    show: true,
                    useGradient: true,
                    opacity: 30,
                    color: "#1f77b4",
                },
                zoom: {
                    show: true,
                    selection: {
                        fill: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        stroke: "transparent",
                        fillOpacity: 0.1,
                        strokeOpacity: 0.5,
                        strokeWidth: 1,
                        strokeDasharray: 0,
                    },
                    resetButton: {
                        show: true,
                        title: "Reset zoom · double-click chart or press Esc",
                        ariaLabel: "Reset zoom",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    },
                },
            },
            useCursorPointer: isDarkMode.value ? false : undefined,
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
    const arr = [];
    for (let i = 0; i < 17; i += 1) {
        arr.push({
            period: `Period ${i + 1}`,
            value: Math.random() * 100,
        });
    }
    dataset.value = arr;
}

const datasetContent = computed(() => {
    return `
  const dataset = ref(${JSON.stringify(dataset.value, null, 4)})
  `;
});

const codeDataset = ref(`const dataset: VueUiSparklineDatasetItem[] = [
  {
    period: "period 1",
    value: 0
  },
  {
    period: "period 2",
    value: -1
  },
  {
    period: "period 3",
    value: 2
  },
  {
    period: "period 4",
    value: -3
  },
  {
    period: "period 5",
    value: 4
  },
  {
    period: "period 6",
    value: -5
  },
  {
    period: "period 7",
    value: 6
  },
  {
    period: "period 8",
    value: -7
  },
  {
    period: "period 9",
    value: 8
  },
  {
    period: "period 10",
    value: -9
  },
  {
    period: "period 11",
    value: 10
  },
  {
    period: "period 12",
    value: -11
  },
  {
    period: "period 13",
    value: 12
  },
  {
    period: "period 14",
    value: -13
  },
  {
    period: "period 15",
    value: 14
  },
  {
    period: "period 16",
    value: -15
  },
  {
    period: "period 17",
    value: 16
  },
]`);

const currentConfig = computed(() => {
    return JSON.stringify(config.value, null, 2);
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

const prefersReduced = ref({
    en: "Pulse animation will not show if prefers-reduced-motion",
    fr: "L’animation de pulsation ne s’affichera pas si prefers-reduced-motion est activé",
    pt: "A animação de pulso não será exibida se prefers-reduced-motion estiver ativado",
    de: "Die Pulsanimation wird nicht angezeigt, wenn prefers-reduced-motion aktiviert ist",
    zh: "如果启用了 prefers-reduced-motion，脉冲动画将不会显示",
    ja: "prefers-reduced-motion が有効な場合、パルスアニメーションは表示されません",
    es: "La animación de pulso no se mostrará si prefers-reduced-motion está activado",
    ko: "prefers-reduced-motion이 활성화된 경우 펄스 애니메이션이 표시되지 않습니다",
    ar: "لن يتم عرض حركة النبض إذا كان prefers-reduced-motion مفعّلًا",
});
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiSparkline" />

        <BaseDocDescription
            :text="translations.docs.tooltips.sparkline[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-sparkline"
            targetMaker="VueUiSparkline"
            :configSource="mainConfig.vue_ui_sparkline"
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
                    <VueUiSparkline
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    >
                    </VueUiSparkline>
                </BaseCard>
            </DocSnapper>
            <div class="flex flex-row gap-2">
                <BaseRandomButton @click="randomizeData" />
            </div>
            <div
                class="flex flex-col justify-center mt-4 place-items-center text-[12px]"
            >
                <code class="text-[12px]">
                    <BaseAttr
                        name="Show pulse"
                        attr="style.line.pulse.show"
                        defaultVal="false"
                        type="checkbox"
                        :config="config"
                    />
                </code>
                {{ prefersReduced[store.lang] }}
            </div>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-sparkline"
            />
        </div>

        <Rater itemId="vue_ui_sparkline" />

        <BaseMigrationInfo debug padding />

        <Box
            ref="box"
            :showDatetimeFormatter="true"
            showSlots
            showEmits
            showUseCases
            showThemes
            showResponsive
            showZoomState
            schema="vue_ui_sparkline"
            signInfo="both"
        >
            <template v-slot:dataset>
                <div
                    class="w-full overflow-x-auto border-b mb-6 border-gray-700"
                >
                    <CodeParser
                        language="typescript"
                        @copy="store.copy()"
                        :title="translations.docs.datastructure[store.lang]"
                        :content="`type VueUiSparklineDatasetItem = {
  period: string
  value: number
}
  `"
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
            <template v-slot:configuration>
                <div class="w-full overflow-x-auto">
                    <DebugHint
                        component="VueUiSparkline"
                        configType="VueUiSparklineConfig"
                    />

                    <BaseCopyConfig :config="config" @reset="resetDefault" />

                    <div class="mt-4">
                        TS type:
                        <code class="text-app-blue">VueUiSparklineConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>

                    <code ref="configCode">
                        <VueUiSparklineConfigFields
                            :config="config"
                            :context="{
                                forceChartUpdate,
                                goToPage,
                                store,
                                translations,
                            }"
                        />
                    </code>
                </div>
            </template>

            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiSparkline"
                    :names="['selectDatapoint', 'hoverIndex']"
                />
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiSparkline"
                    :types="[
                        'svg-underlayer',
                        'hint',
                        'svg',
                        'before',
                        'source',
                        'chart-background',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-sparkline.vue"
                        />
                    </template>
                </BaseSlotDocumenter>
            </template>

            <template #use-cases>
                <ucSparkline />
            </template>

            <template #themes>
                <ThemesVueUiSparkline />
            </template>

            <template #responsive>
                <ResponsiveUnit minHeight="100px" height="150px">
                    <template #chart>
                        <VueUiSparkline
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

            <template #datetime-formatter>
                <DatetimeFormatterDoc
                    path="style.dataLabel.datetimeFormatter"
                />
            </template>

            <template #zoom-state>
                <BaseZoomState component="VueUiSparkline">
                    <ZoomStateVueUiSparkline />
                </BaseZoomState>
            </template>
        </Box>

        <!-- <DocJsonConfigAccordion>
        <template #content>
          <CodeParser :content="currentConfig" language="javascript"/>
        </template>
      </DocJsonConfigAccordion> -->
    </div>
</template>
