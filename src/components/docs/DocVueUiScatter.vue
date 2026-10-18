<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiScatterConfigFields from "./configuration/VueUiScatterConfigFields.vue";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiScatter from "../themes/ThemesVueUiScatter.vue";
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
import ucScatter from "../useCases/uc-scatter.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import ComponentEmits from "../ComponentEmits.vue";
import DebugHint from "../DebugHint.vue";
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

const scat1 = computed(() => {
    const arr = [];
    for (let i = -100; i < 100; i += 1) {
        arr.push({
            x: Math.random() * (Math.random() > 0.3 ? i / 3 : -i / 5),
            y: (Math.random() * i) / 20,
            name: `plot_${i}_cluster_1`,
        });
    }
    return arr;
});

const scat2 = computed(() => {
    const arr = [];
    for (let i = -100; i < 100; i += 1) {
        arr.push({
            x: Math.random() * (Math.random() > 0.1 ? i / 10 : -i / 10),
            y: (Math.random() * i) / 10,
            name: `plot_${i}_cluster_2`,
        });
    }
    return arr;
});

const dataset = computed(() => {
    return [
        {
            name: "Cluster 1",
            values: scat1.value,
            color: "#42d392",
            shape: "star",
        },
        {
            name: "Cluster 2",
            values: scat2.value,
            color: "#ff6400",
            shape: "triangle",
        },
    ];
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            debug: false,
            loading: false,
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
            downsample: { threshold: 1095 },
            responsive: false,
            useCssAnimation: true,
            usePerformanceMode: false,
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontFamily: "inherit",
                layout: {
                    height: 316,
                    width: 512,
                    padding: { top: 0, right: 0, bottom: 0, left: 0 },
                    axis: {
                        show: true,
                        stroke: isDarkMode.value ? "#565656" : "#C4C4C4",
                        strokeWidth: 1,
                        xMin: null,
                        xMax: null,
                        yMin: null,
                        yMax: null,
                    },
                    marginalBars: {
                        show: true,
                        size: 40,
                        tranches: 20,
                        opacity: 0.5,
                        fill: isDarkMode.value ? "#CCCCCC" : "##2D353C",
                        strokeWidth: 0.5,
                        offset: 20,
                        borderRadius: 2,
                        useGradient: true,
                        showLines: true,
                        linesStrokeWidth: 1,
                        highlighter: {
                            show: true,
                            opacity: 0.1,
                            color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                            stroke: isDarkMode.value ? "#6A6A6A" : "#1A1A1A",
                            strokeWidth: 0.5,
                            strokeDasharray: 2,
                            highlightBothAxes: false,
                        },
                    },
                    plots: {
                        radius: 3,
                        hoverRadiusRatio: 3,
                        stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                        strokeWidth: 0.3,
                        opacity: 0.6,
                        opacityNotSelected: 0.6,
                        name: {
                            show: false,
                            fontSize: 12,
                            offsetY: 0,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        },
                        significance: {
                            show: true,
                            useDistanceOpacity: false,
                            deviationThreshold: 10,
                            opacity: 0.3,
                        },
                        deviation: {
                            translation: "deviation",
                            roundingValue: 1,
                        },
                        giftWrap: {
                            show: false,
                            strokeWidth: 1,
                            strokeDasharray: 0,
                            fillOpacity: 0.2,
                        },
                        selectors: {
                            show: true,
                            stroke: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            strokeWidth: 0.7,
                            strokeDasharray: 0,
                            labels: {
                                fontSize: 8,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                rounding: 2,
                                bold: false,
                                showName: true,
                                prefix: "",
                                suffix: "",
                                x: { formatter: null },
                                y: { formatter: null },
                            },
                            markers: {
                                radius: 1.5,
                                stroke: isDarkMode.value
                                    ? "#CCCCCC"
                                    : "#1A1A1A",
                                strokeWidth: 0.5,
                                fill: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                            },
                        },
                    },
                    correlation: {
                        show: true,
                        strokeDasharray: 2,
                        strokeWidth: 1,
                        label: {
                            show: true,
                            fontSize: 8,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: true,
                            roundingValue: 2,
                            useSerieColor: true,
                        },
                    },
                    dataLabels: {
                        reverseAxisLabels: isDarkMode.value ? undefined : false,
                        xAxis: {
                            name: "xAxis",
                            show: true,
                            fontSize: 8,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            roundingValue: 0,
                            offsetX: 0,
                            offsetY: 0,
                            showValue: true,
                            scales: {
                                show: false,
                                steps: 10,
                                useNiceScale: true,
                                labels: {
                                    formatter: null,
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 12,
                                    offsetY: 0,
                                },
                                verticalLines: {
                                    show: false,
                                    stroke: isDarkMode.value
                                        ? "#4A4A4A"
                                        : "#E1E5E8",
                                    strokeWidth: 1,
                                },
                            },
                        },
                        yAxis: {
                            name: "yAxis",
                            show: true,
                            fontSize: 8,
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            roundingValue: 0,
                            offsetX: 0,
                            offsetY: 0,
                            showValue: true,
                            scales: {
                                show: false,
                                steps: 10,
                                useNiceScale: true,
                                labels: {
                                    formatter: null,
                                    color: isDarkMode.value
                                        ? "#CCCCCC"
                                        : "#1A1A1A",
                                    fontSize: 12,
                                    offsetX: 0,
                                },
                                horizontalLines: {
                                    show: false,
                                    stroke: isDarkMode.value
                                        ? "#4A4A4A"
                                        : "#E1E5E8",
                                    strokeWidth: 1,
                                },
                            },
                        },
                        reversedAxisLabels: isDarkMode.value
                            ? false
                            : undefined,
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
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 12,
                    bold: true,
                    roundingValue: 0,
                    position: "bottom",
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
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 14,
                    roundingValue: 0,
                    customFormat: null,
                    showShape: true,
                    prefix: "",
                    suffix: "",
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
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    outline: "none",
                    roundingValue: 2,
                    roundingAverage: 1,
                },
                translations: {
                    correlationCoefficient: "Correlation Coef.",
                    nbrPlots: "Nbr plots",
                    average: "Average",
                    series: "Series",
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
    return `type VueUiScatterDatasetItem = {
  name: string
  color?: string // ${translations.value.docs.comments.xy.color[store.lang]}
  shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star" // default: "circle"
  values: Array<{
    x: number
    y: number
    name?: string
    weight?: number // ${translations.value.docs.comments.scatterWeight[store.lang]}
  }>
}`;
});

const codeDataset = ref(`const dataset: VueUiScatterDatasetItem[] = [
  {
    name: "Cluster 1",
    values: [
      {
        x: 1,
        y: 1,
        name: "Cluster 1 point 1"
      },
      {
        x: 0,
        y: -1,
        name: "Cluster 1 point 2"
      },
      {
        x: 2,
        y: 3,
        name: "Cluster 1 point 3"
      },
    ]
},
{
    name: "Cluster 2",
    values: [
      {
        x: -5,
        y: -4,
        name: "Cluster 2 point 1"
      },
      {
        x: 13,
        y: 8,
        name: "Cluster 2 point 2"
      },
      {
        x: -2,
        y: -7,
        name: "Cluster 2 point 3"
      },
    ]
  }
];`);

const performanceModeComment = ref({
    en: "Enable performance mode when your dataset is large (> 1000) and when you do not wish to downsample the data. Performance mode will generate a single dom node per series. When this mode is enabled, note that plot.significance will have no effect on plot opacity.",
    fr: "Activez le mode performance lorsque votre jeu de données est volumineux (> 1000) et que vous ne souhaitez pas réduire l’échantillon de données. Le mode performance générera un seul nœud DOM par série. Lorsque ce mode est activé, notez que plot.significance n’aura aucun effet sur l’opacité du tracé.",
    pt: "Ative o modo de desempenho quando seu conjunto de dados for grande (> 1000) e quando você não quiser reduzir a amostragem dos dados. O modo de desempenho gerará um único nó DOM por série. Quando este modo estiver ativado, observe que plot.significance não terá efeito na opacidade do gráfico.",
    de: "Aktivieren Sie den Leistungsmodus, wenn Ihr Datensatz groß ist (> 1000) und Sie die Daten nicht herunterstichproben möchten. Der Leistungsmodus generiert einen einzelnen DOM-Knoten pro Serie. Wenn dieser Modus aktiviert ist, beachten Sie, dass plot.significance keinen Einfluss auf die Transparenz des Plots hat.",
    zh: "当您的数据集很大（>1000）并且不希望对数据进行降采样时，请启用性能模式。性能模式将为每个系列生成一个 DOM 节点。启用此模式时，请注意 plot.significance 对绘图的不透明度将没有影响。",
    ja: "データセットが大きい場合（>1000）やデータをダウンサンプリングしたくない場合は、パフォーマンスモードを有効にしてください。パフォーマンスモードでは、シリーズごとに1つのDOMノードが生成されます。このモードを有効にすると、plot.significanceはプロットの不透明度に影響しないことに注意してください。",
    es: "Active el modo de rendimiento cuando su conjunto de datos sea grande (> 1000) y cuando no desee reducir la muestra de los datos. El modo de rendimiento generará un solo nodo DOM por serie. Cuando este modo esté habilitado, tenga en cuenta que plot.significance no tendrá efecto en la opacidad del gráfico.",
    ko: "데이터셋이 크고 (>1000) 데이터를 다운샘플링하고 싶지 않을 때 성능 모드를 활성화하세요. 성능 모드는 시리즈당 하나의 DOM 노드를 생성합니다. 이 모드가 활성화되면 plot.significance는 플롯 불투명도에 영향을 주지 않습니다.",
    ar: "قم بتمكين وضع الأداء عندما يكون حجم مجموعة البيانات كبيرًا (> 1000) وعندما لا ترغب في تقليل حجم البيانات. سيؤدي وضع الأداء إلى إنشاء عقدة DOM واحدة لكل سلسلة. عند تفعيل هذا الوضع، لاحظ أن plot.significance لن يكون له أي تأثير على شفافية المخطط.",
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

const freesetyleScript = ref(`const dataset = ref([
  {
    name: 'Cluster A',
    values: [
      { x: -10, y: -20, name: 'p0' },
      { x: 2, y: 10, name: 'p1', /* metadata: */ marked: true },
      { x: 12, y: 16, name: 'p2' },
      { x: 11, y: 11, name: 'p3' },
      { x: 20, y: 10, name: 'p4' },
    ],
    color: '#FF0000',
    // metadata:
    marked: true
  }
]);

function freestyle({ drawingArea, data }) {
  const marked = (data || []).filter((d) => !!d?.marked);
  const markedPlots = marked[0]?.plots.filter((p) => !!p?.v?.marked);
  const circles = (markedPlots || []).map((p) => {
    return \`
      <g style="pointer-events: none;">
          <circle
              cx="\${p?.x}"
              cy="\${p?.y}"
              r="20"
              stroke="#FF0000"
              fill="none"
          />
          <path
              d="M\${p?.x - 20},\${p?.y} \${p?.x - 5},\${p?.y}
              M\${p?.x},\${p?.y - 20} \${p?.x},\${p?.y - 5}
              M\${p?.x + 20},\${p?.y} \${p?.x + 5},\${p?.y}
              M\${p?.x},\${p?.y + 20} \${p?.x},\${p?.y + 5}"
              stroke="#FF0000"
          />
      </g>
  \`;
  });
  return circles;
}
`);

const freestyleTemplate =
    ref(`<VueUiScatter :dataset="dataset" :config="config">
  <template #svg="{ svg }">
    <g v-html="freestyle(svg)"/>
  <template>
</VueUiScatter>
`);

function freestyle({ drawingArea, data }) {
    const marked = (data || []).filter((d) => !!d?.marked);
    const markedPlots = marked[0]?.plots.filter((p) => !!p?.v?.marked);
    const circles = (markedPlots || []).map((p) => {
        return `
            <g style="pointer-events: none;">
                <circle
                    cx="${p?.x}"
                    cy="${p?.y}"
                    r="20"
                    stroke="#FF0000"
                    fill="none"
                />
                <path
                    d="M${p?.x - 20},${p?.y} ${p?.x - 5},${p?.y} M${p?.x},${
                        p?.y - 20
                    } ${p?.x},${p?.y - 5} M${p?.x + 20},${p?.y} ${p?.x + 5},${p?.y} M${p?.x},${
                        p?.y + 20
                    } ${p?.x},${p?.y + 5}"
                    stroke="#FF0000"
                />
            </g>
        `;
    });
    return circles;
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
        <BaseDocTitle name="VueUiScatter" />

        <BaseDocDescription
            :text="translations.docs.tooltips.scatter[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-scatter"
            targetMaker="VueUiScatter"
            :configSource="mainConfig.vue_ui_scatter"
        />

        <div :class="`transition-all mx-auto w-full sm:w-2/3`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueUiScatter
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-scatter" />
        </div>

        <Rater itemId="vue_ui_scatter" />

        <BaseMigrationInfo cssAnimation debug padding />

        <Box
            ref="box"
            showEmits
            showSlots
            showTooltip
            showCallbacks
            showThemes
            showUseCases
            showResponsive
            schema="vue_ui_scatter"
            signInfo="both"
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
                    component="VueUiScatter"
                    configType="VueUiScatterConfig"
                />

                <div class="flex gap-2">
                    <button
                        @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all"
                    >
                        {{ translations.docs.reset[store.lang] }}
                    </button>
                    <button
                        @click="copyToClipboard(config)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"
                    >
                        <CopyIcon />
                        {{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiScatterConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiScatterConfigFields
                        :config="config"
                        :context="{
                            forceChartUpdate,
                            goToPage,
                            performanceModeComment,
                            setActiveTab,
                            store,
                            translations,
                        }"
                    />
                </code>
            </template>
            <template v-slot:events-and-methods>
                <ComponentEmits
                    component="VueUiScatter"
                    :names="['selectLegend', 'copyAlt']"
                />

                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">
                        {{ translations.docs.emits.xy.getData[store.lang] }}
                    </div>
                    <pre>
    <span class="text-gray-600 dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const scatterChart = ref(null);
            const scatterDataset = ref([]);

            onMounted(async () => {
                scatterDataset.value = await scatterChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiScatter
                ref="scatterChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiScatter
                ref="scatterChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        scatterDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                async mounted () {
                    this.scatterDataset = await this.$refs.scatterChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>

                <ExposedMethods
                    component="VueUiScatter"
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
            </template>

            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiScatter"
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-scatter.vue"
                        />
                    </template>
                    <template #after="item">
                        <div v-if="item.names.includes('svg')" class="p-6">
                            {{ item.freestyle }}
                            <CodeParser
                                language="javascript"
                                :content="freesetyleScript"
                            />
                            <CodeParser
                                language="html"
                                :content="freestyleTemplate"
                            />
                            <div class="p-4 bg-white">
                                <VueUiScatter
                                    :dataset="[
                                        {
                                            name: 'Cluster A',
                                            values: [
                                                { x: -10, y: -20, name: 'p0' },
                                                {
                                                    x: 2,
                                                    y: 10,
                                                    name: 'p1',
                                                    marked: true,
                                                },
                                                { x: 12, y: 16, name: 'p2' },
                                                { x: 11, y: 11, name: 'p3' },
                                                { x: 20, y: 10, name: 'p5' },
                                            ],
                                            color: '#FF0000',
                                            marked: true,
                                        },
                                    ]"
                                    :config="{
                                        style: {
                                            layout: {
                                                padding: {
                                                    left: 0,
                                                    right: 6,
                                                    bottom: 12,
                                                },
                                            },
                                        },
                                    }"
                                >
                                    <template #svg="{ svg }">
                                        <g v-html="freestyle(svg)" />
                                    </template>
                                </VueUiScatter>
                            </div>
                        </div>
                    </template>
                </BaseSlotDocumenter>
            </template>
            <template #custom-tooltip>
                <h3 class="mb-4">
                    {{ translations.customFormat[store.lang] }}
                </h3>
                <code class="text-gray-500 dark:text-[#8A8A8A]"
                    >config.style.tooltip.customFormat</code
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

            <template #use-cases>
                <uc-scatter />
            </template>

            <template #themes>
                <ThemesVueUiScatter />
            </template>

            <template #responsive>
                <ResponsiveUnit>
                    <template #chart>
                        <VueUiScatter
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
                        'tooltip',
                        'svg',
                    ]"
                />
            </template>
        </Box>
    </div>
</template>
