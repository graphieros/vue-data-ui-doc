<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiHorizontalBarConfigFields from "./configuration/VueUiHorizontalBarConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiVerticalBar from "../themes/ThemesVueUiVerticalBar.vue";
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
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import DebugHint from "../DebugHint.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";
import { COLOR_PICKER_PALETTE } from "../../consts.js";
import TricksVueUiHorizontalBar from "./tricks/TricksVueUiHorizontalBar.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

watch(
    () => store.isDarkMode,
    (_val) => {
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
        value: 100,
        children: [
            {
                name: "serie 1 child 1",
                value: 80,
            },
            {
                name: "serie 1 child 2",
                value: 20,
            },
        ],
    },
    {
        name: "Serie 2",
        value: 345,
    },
    {
        name: "Serie 3",
        value: 210,
    },
    {
        name: "Serie 4",
        value: 188,
    },
    {
        name: "Serie 5",
        value: 120,
        children: [
            {
                name: "Serie 5 child 1",
                value: 60,
            },
            {
                name: "Serie 5 child 2",
                value: 20,
            },
            {
                name: "Serie 5 child 3",
                value: 40,
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
            events: {
                datapointEnter: null,
                datapointLeave: null,
                datapointClick: null,
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    width: 512,
                    height: 316,
                    layout: {
                        bars: {
                            rowColor: null,
                            rowRadius: 4,
                            sort: "desc",
                            useStroke: false,
                            strokeWidth: 2,
                            gap: 6,
                            borderRadius: 4,
                            offsetX: 0,
                            paddingRight: 0,
                            useGradient: true,
                            gradientIntensity: 20,
                            fillOpacity: 10,
                            underlayerColor: "#FFFFFF",
                            dataLabels: {
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: true,
                                fontSize: 12,
                                value: {
                                    show: true,
                                    roundingValue: 0,
                                    prefix: "",
                                    suffix: "",
                                },
                                percentage: {
                                    show: true,
                                    roundingPercentage: 0,
                                },
                                offsetX: 0,
                            },
                            nameLabels: {
                                show: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: false,
                                fontSize: 10,
                                offsetX: 0,
                            },
                            parentLabels: {
                                show: true,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                bold: false,
                                fontSize: 10,
                                offsetX: 0,
                                paddingBottom: 0,
                            },
                        },
                        highlighter: {
                            color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                            opacity: 5,
                        },
                        separators: {
                            show: true,
                            color: isDarkMode.value ? "#5A5A5A" : "#CCCCCC",
                            strokeWidth: 1,
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
                        position: "top",
                        show: true,
                        fontSize: 14,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        bold: true,
                        roundingValue: 0,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        roundingPercentage: 0,
                        prefix: "",
                        suffix: "",
                        showValue: true,
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
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 14,
                        showValue: true,
                        showPercentage: true,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        prefix: "",
                        suffix: "",
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: isDarkMode.value ? 50 : 30,
                        position: "center",
                        offsetY: 24,
                        offsetX: 0,
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
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
                    sort: true,
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
                    sort: "Toggle sort",
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
                    prefix: "",
                    suffix: "",
                },
            },
            translations: {
                parentName: "Serie",
                childName: "Child",
                value: "value",
                percentageToTotal: "%/total",
                percentageToSerie: "%/serie",
            },
        }),
    set: configState.set,
});

const renameWarning = ref({
    en: "This component was renamed to VueUiHorizontalBar. Using the old VueUiVerticalBar will work in v3, but we recommend you switch to the new name.",
    fr: "Ce composant a été renommé en VueUiHorizontalBar. L’ancien VueUiVerticalBar continuera de fonctionner en v3, mais nous vous recommandons de passer au nouveau nom.",
    pt: "Este componente foi renomeado para VueUiHorizontalBar. Usar o antigo VueUiVerticalBar continuará funcionando na v3, mas recomendamos que você mude para o novo nome.",
    de: "Diese Komponente wurde in VueUiHorizontalBar umbenannt. Die Verwendung von VueUiVerticalBar funktioniert in v3 weiterhin, wir empfehlen jedoch, zum neuen Namen zu wechseln.",
    zh: "该组件已重命名为 VueUiHorizontalBar。旧的 VueUiVerticalBar 在 v3 中仍可使用，但建议您切换到新名称。",
    ja: "このコンポーネントは VueUiHorizontalBar に名称変更されました。従来の VueUiVerticalBar も v3 では動作しますが、新しい名称への移行をおすすめします。",
    es: "Este componente pasó a llamarse VueUiHorizontalBar. El antiguo VueUiVerticalBar seguirá funcionando en la v3, pero te recomendamos cambiar al nuevo nombre.",
    ko: "이 컴포넌트는 VueUiHorizontalBar로 이름이 변경되었습니다. 기존 VueUiVerticalBar는 v3에서 계속 동작하지만, 새로운 이름으로 전환하길 권장합니다.",
    ar: "تمت إعادة تسمية هذا المكوّن إلى VueUiHorizontalBar. سيستمر الاسم القديم VueUiVerticalBar بالعمل في الإصدار v3، لكن نوصي بالانتقال إلى الاسم الجديد.",
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
    dataset.value[0].children[1].value = Math.random() * 65;
    dataset.value[0].value = dataset.value[0].children
        .map((c) => c.value)
        .reduce((a, b) => a + b, 0);

    dataset.value[1].value = Math.random() * 300;
    dataset.value[2].value = Math.random() * 250;
    dataset.value[3].value = Math.random() * 200;

    dataset.value[4].children[0].value = Math.random() * 100;
    dataset.value[4].children[1].value = Math.random() * 100;
    dataset.value[4].children[2].value = Math.random() * 100;
    dataset.value[4].value = dataset.value[4].children
        .map((c) => c.value)
        .reduce((a, b) => a + b, 0);
}

const dsTypeCode = computed(() => {
    return `type VueUiHorizontalBarDatasetItem = {
  name: string;
  value: number;
  color: string; // ${translations.value.docs.comments.xy.color[store.lang]}
  children: Array<{  // ${translations.value.docs.comments.verticalBar.breakdown[store.lang]}
    name: string;
    value: number;
  }>
}`;
});

const codeDataset = ref(`const dataset: VueUiHorizontalBarDatasetItem[] = [
  {
    name: "Serie 1",
    value: 100,
    children: [
      {
        name: "serie 1 child 1",
        value: 80
      },
      {
        name: "serie 1 child 2",
        value: 20
      },
    ]
  },
  {
    name: "Serie 2",
    value: 345,
  },
  {
    name: "Serie 3",
    value: 210,
  },
  {
    name: "Serie 4",
    value: 188,
  },
  {
    name: "Serie 5",
    value: 120,
    children: [
      {
        name: "Serie 5 child 1",
        value: 60,
    },
      {
        name: "Serie 5 child 2",
        value: 20,
      },
      {
        name: "Serie 5 child 3",
        value: 40,
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
        <BaseDocTitle name="VueUiHorizontalBar" />

        <BaseDocDescription
            :text="translations.docs.tooltips.verticalBar[store.lang]"
        />

        <div
            class="mx-auto max-w-[500px] rounded-xl text-md text-[#c2410c] dark:text-app-orange p-4 border border-app-orange flex bg-[#ff370010] gap-4"
        >
            <div class="h-[40px] w-[40px]">
                <VueUiIcon name="circleExclamation" stroke="#ff6600" />
            </div>
            {{ renameWarning[store.lang] }}
        </div>

        <BaseDocHeaderActions
            targetLink="vue-ui-vertical-bar"
            targetMaker="VueUiHorizontalBar"
            :configSource="mainConfig.vue_ui_horizontal_bar"
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
                    <VueUiHorizontalBar
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
            <BaseRandomButton @click="randomizeData" />
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-horizontal-bar"
            />
        </div>

        <Rater itemId="vue_ui_horizontal_bar" />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showThemes
            showResponsive
            showPatterns
            showCallbacks
            showTricks
            schema="vue_ui_horizontal_bar"
            signInfo="both"
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

                <div class="w-full overflow-x auto">
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
                    component="VueUiHorizontalBar"
                    configType="VueUiHorizontalBarConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiHorizontalBarConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiHorizontalBarConfigFields
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
                <div class="overflow-x-auto"></div>
            </template>
            <template v-slot:events-and-methods>
                <ComponentEmits
                    component="VueUiHorizontalBar"
                    :names="['selectDatapoint', 'selectLegend', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiHorizontalBar"
                    getImage
                    showHideSeries
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'generateSvg',
                        'toggleTable',
                        'toggleSort',
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

            const verticalBarChart = ref(null);
            const verticalBarDataset = ref([]);

            onMounted(async () => {
                verticalBarDataset.value = await verticalBarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        verticalBarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.verticalBarDataset = await this.$refs.verticalBarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiHorizontalBar"
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
                        'pattern',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-horizontal-bar.vue"
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
                <ThemesVueUiVerticalBar />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiVerticalBar
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
                <VueUiVerticalBar
                    :dataset="dataset"
                    :config="config"
                    :key="key"
                >
                    <template #pattern="{ seriesIndex, patternId }">
                        <VueUiPattern
                            :id="patternId"
                            name="maze"
                            stroke="#FFFFFF80"
                            :strokeWidth="3"
                            :scale="0.5"
                        />
                    </template>
                </VueUiVerticalBar>
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
                        'sort',
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>

            <template #tips-and-tricks>
                <TricksVueUiHorizontalBar />
            </template>
        </Box>
    </div>
</template>
