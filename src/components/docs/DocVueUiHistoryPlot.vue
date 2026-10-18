<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiHistoryPlotConfigFields from "./configuration/VueUiHistoryPlotConfigFields.vue";
import { ref, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import ThemesVueUiHistoryPlot from "../themes/ThemesVueUiHistoryPlot.vue";
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
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

const dataset = ref([
    {
        name: "Series 1",
        values: [
            { x: 355, y: 2.3, label: "January" },
            { x: 112, y: 1.2, label: "February" },
            { x: 313, y: 0.4, label: "March" },
            { x: 555, y: 1.2, label: "April" },
        ],
    },
    {
        name: "Series 2",
        values: [
            { x: 1000, y: 2, label: "January" },
            { x: 655, y: 4, label: "February" },
            { x: 350, y: 3, label: "March" },
            { x: 815, y: 2.5, label: "April" },
        ],
        smooth: true,
    },
    {
        name: "Series 3",
        values: [
            { x: 100, y: 3.5, label: "January" },
            { x: 200, y: 2, label: "February" },
            { x: 500, y: 2, label: "March" },
            { x: 800, y: 1.5, label: "April" },
        ],
        smooth: true,
        temperatureColors: ["#42d392", "#ff3700"],
        temperatureAngle: 90,
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
            responsiveProportionalSizing: true,
            theme: "",
            customPalette: [],
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
                    csv: true,
                    img: true,
                    table: true,
                    labels: false,
                    fullscreen: true,
                    sort: false,
                    stack: false,
                    animation: false,
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
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353Cff",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353Cff",
                    outline: "none",
                    roundingValue: 0,
                },
                columnNames: {
                    series: "Series",
                    datapoint: "Datapoint",
                    x: "x",
                    y: "y",
                },
            },
            style: {
                fontFamily: "inherit",
                chart: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    height: 500,
                    width: 600,
                    padding: { top: 12, right: 12, bottom: 12, left: 12 },
                    grid: {
                        xAxis: {
                            show: true,
                            stroke: isDarkMode.value ? "#5A5A5A" : "#e1e5e8",
                            strokeWidth: 1,
                        },
                        horizontalLines: {
                            show: true,
                            stroke: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                            strokeWidth: 0.6,
                        },
                        yAxis: {
                            show: true,
                            stroke: isDarkMode.value ? "#5A5A5A" : "#e1e5e8",
                            strokeWidth: 1,
                        },
                        verticalLines: {
                            show: true,
                            stroke: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                            strokeWidth: 0.6,
                        },
                    },
                    axes: {
                        x: {
                            scaleMin: null,
                            scaleMax: null,
                            ticks: 10,
                            labels: {
                                show: true,
                                fontSize: 16,
                                color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                                bold: false,
                                rounding: 1,
                                offsetY: 0,
                                formatter: null,
                                prefix: "",
                                suffix: "",
                                rotation: 0,
                                autoRotate: { enable: true, angle: -30 },
                            },
                            name: {
                                text: "x Axis",
                                fontSize: 16,
                                offsetX: 0,
                                offsetY: -12,
                                bold: false,
                                color: isDarkMode.value ? "#8A8A8A" : "#2D353C",
                            },
                        },
                        y: {
                            scaleMin: null,
                            scaleMax: null,
                            ticks: 10,
                            labels: {
                                show: true,
                                fontSize: 16,
                                color: isDarkMode.value
                                    ? "#8A8A8A"
                                    : "#2D353Cff",
                                bold: false,
                                rounding: 1,
                                offsetX: 0,
                                formatter: null,
                                prefix: "",
                                suffix: "",
                            },
                            name: {
                                text: "y Axis",
                                fontSize: 16,
                                offsetX: 0,
                                offsetY: 0,
                                bold: false,
                                color: isDarkMode.value ? "#6A6A6A" : "#2D353C",
                            },
                        },
                    },
                    plots: {
                        radius: 16,
                        stroke: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        strokeWidth: 1,
                        unselectedOpacity: 0.1,
                        gradient: { show: true, intensity: 40 },
                        indexLabels: {
                            show: true,
                            startAtZero: false,
                            adaptColorToBackground: true,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            fontSize: 16,
                            bold: false,
                            offsetY: 0,
                            offsetX: 0,
                        },
                        labels: {
                            show: true,
                            fontSize: 10,
                            color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                            bold: false,
                            offsetY: 0,
                            offsetX: 0,
                        },
                    },
                    paths: {
                        show: true,
                        strokeWidth: 1.6,
                        useSerieColor: true,
                        stroke: isDarkMode.value ? "#6A6A6A" : "#2D353C",
                    },
                    legend: {
                        show: true,
                        bold: false,
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#f3f4f6",
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353Cff",
                        fontSize: 14,
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
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
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
                        color: isDarkMode.value ? "#CCCCCC" : "#2D353Cff",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#FFFFFFff",
                        fontSize: 14,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: isDarkMode.value ? 30 : 100,
                        position: "center",
                        offsetY: 24,
                        offsetX: 0,
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
                    },
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
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

const key = ref(0);

function forceChartUpdate() {
    key.value += 1;
}

const additionalTranslations = ref({
    temperatureColors: {
        en: 'Show the line as a gradient by using an array of colors, for example ["#FF0000", "#00FF00"]',
        fr: 'Affiche la ligne sous forme de dégradé en utilisant un tableau de couleurs, par exemple ["#FF0000", "#00FF00"]',
        pt: 'Mostra a linha como um gradiente usando um array de cores, por exemplo ["#FF0000", "#00FF00"]',
        de: 'Zeigt die Linie als Farbverlauf an, indem ein Array von Farben verwendet wird, zum Beispiel ["#FF0000", "#00FF00"]',
        zh: '使用颜色数组将线条显示为渐变色，例如 ["#FF0000", "#00FF00"]',
        ja: '色の配列を使用して線をグラデーションとして表示します。例: ["#FF0000", "#00FF00"]',
        es: 'Muestra la línea como un degradado usando un array de colores, por ejemplo ["#FF0000", "#00FF00"]',
        ko: '색상 배열을 사용하여 선을 그라데이션으로 표시합니다. 예: ["#FF0000", "#00FF00"]',
        ar: 'اعرض الخط كتدرج لوني باستخدام مصفوفة من الألوان، على سبيل المثال ["#FF0000", "#00FF00"]',
    },
    temperatureAngle: {
        en: "Defaults to 0. (0: top-bottom; 90: left-right; 180: bottom-top, etc)",
        fr: "La valeur par défaut est 0. (0 : haut-bas ; 90 : gauche-droite ; 180 : bas-haut, etc.)",
        pt: "O padrão é 0. (0: cima-baixo; 90: esquerda-direita; 180: baixo-cima, etc.)",
        de: "Standardwert ist 0. (0: oben-unten; 90: links-rechts; 180: unten-oben usw.)",
        zh: "默认为 0。（0：从上到下；90：从左到右；180：从下到上，等等）",
        ja: "デフォルトは 0 です。（0: 上から下、90: 左から右、180: 下から上、など）",
        es: "El valor predeterminado es 0. (0: arriba-abajo; 90: izquierda-derecha; 180: abajo-arriba, etc.)",
        ko: "기본값은 0입니다. (0: 위-아래; 90: 왼쪽-오른쪽; 180: 아래-위 등)",
        ar: "القيمة الافتراضية هي 0. (0: من الأعلى إلى الأسفل؛ 90: من اليسار إلى اليمين؛ 180: من الأسفل إلى الأعلى، إلخ)",
    },
    usePlotTemperatureColors: {
        en: "If temperatureColors are used, defaults to true if not set. Use false to opt out, and circles will take the colors of the series.",
        fr: "Si temperatureColors est utilisé, la valeur par défaut est true si elle n’est pas définie. Utilisez false pour désactiver cette option, et les cercles prendront les couleurs de la série.",
        pt: "Se temperatureColors for usado, o padrão será true se não estiver definido. Use false para desativar, e os círculos usarão as cores da série.",
        de: "Wenn temperatureColors verwendet wird, ist der Standardwert true, falls nicht festgelegt. Verwenden Sie false zum Deaktivieren; die Kreise übernehmen dann die Farben der Reihe.",
        zh: "如果使用了 temperatureColors，未设置时默认值为 true。使用 false 可选择退出，圆点将采用系列的颜色。",
        ja: "temperatureColors が使用されている場合、未設定時のデフォルトは true です。無効にするには false を使用します。円は系列の色を使用します。",
        es: "Si se usa temperatureColors, el valor predeterminado será true si no está definido. Usa false para desactivarlo, y los círculos tomarán los colores de la serie.",
        ko: "temperatureColors를 사용하는 경우 설정하지 않으면 기본값은 true입니다. 비활성화하려면 false를 사용하세요. 그러면 원은 시리즈의 색상을 사용합니다.",
        ar: "إذا تم استخدام temperatureColors، فستكون القيمة الافتراضية true إذا لم يتم تعيينها. استخدم false لإلغاء ذلك، وستأخذ الدوائر ألوان السلسلة.",
    },
});

const dsTypeCode = computed(() => {
    return `type VueUiHistoryPlotDatasetItem = {
    name: string
    values: Array<{
        x: number;
        y: number;
        label: string
    }>;
    smooth?: boolean; // v3.22.4+ false if not set
    temperatureColors?: string[]; // v3.22.4+ ${additionalTranslations.value.temperatureColors[store.lang]}
    temperatureAngle?: number; // v3.22.4+ ${additionalTranslations.value.temperatureAngle[store.lang]}
    usePlotTemperatureColors?: boolean; // v3.22.4+ ${additionalTranslations.value.usePlotTemperatureColors[store.lang]}
}`;
});

const codeDataset = ref(`const dataset: VueUiHistoryPlotDatasetItem[] = [
    {
        name: "Series 1",
        values: [
            { x: 355, y: 2.3, label: "January" },
            { x: 112, y: 1.2, label: "February" },
            { x: 313, y: 0.4, label: "March" },
            { x: 555, y: 1.2, label: "April" },
        ],
    },
    {
        name: "Series 2",
        values: [
            { x: 1000, y: 2, label: "January" },
            { x: 655, y: 4, label: "February" },
            { x: 350, y: 3, label: "March" },
            { x: 815, y: 2.5, label: "April" },
        ],
        smooth: true
    },
    {
        name: "Series 3",
        values: [
            { x: 100, y: 3.5, label: "January" },
            { x: 200, y: 2, label: "February" },
            { x: 500, y: 2, label: "March" },
            { x: 800, y: 1.5, label: "April" },
        ],
        smooth: true,
        temperatureColors: ['#42d392', '#ff3700'],
        temperatureAngle: 90
    },
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
    ref(`customFormat: ({ seriesIndex, datapoint, datapointIndex series, config }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiHistoryPlot" />

        <BaseDocDescription
            :text="translations.docs.tooltips.historyPlot[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-history-plot"
            targetMaker="VueUiHistoryPlot"
            :configSource="mainConfig.vue_ui_history_plot"
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
                    <VueDataUi
                        component="VueUiHistoryPlot"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton
                link="/examples/categories#vue-ui-history-plot"
            />
        </div>

        <Rater itemId="vue_ui_history_plot" />

        <BaseMigrationInfo autoRotate cssAnimation debug padding />

        <Box
            ref="box"
            showEmits
            showCallbacks
            showSlots
            showThemes
            showResponsive
            showTooltip
            signInfo="both"
            schema="vue_ui_history_plot"
        >
            <template #dataset>
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

            <template #configuration>
                <DebugHint
                    component="VueUiHistoryPlot"
                    configType="VueUiHistoryPlotConfig"
                />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="my-4">
                    TS type:
                    <code class="text-app-blue">VueUiHistoryPlotConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <code ref="configCode">
                    <VueUiHistoryPlotConfigFields
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

            <!-- EMITS -->
            <template #events-and-methods>
                <ComponentEmits
                    component="VueUiHistoryPlot"
                    :names="['selectLegend', 'selectDatapoint', 'copyAlt']"
                />

                <ExposedMethods
                    component="VueUiHistoryPlot"
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

            const historyPlotChart = ref(null);
            const historyPlotDataset = ref([]);

            onMounted(async () => {
                historyPlotDataset.value = await historyPlotChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiHistoryPlot
                ref="historyPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiHistoryPlot
                ref="historyPlotChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        historyPlotDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.historyPlotDataset = await this.$refs.historyPlotChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>

            <!-- SLOTS -->
            <template #slots>
                <BaseSlotDocumenter
                    componentName="VueUiHistoryPlot"
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
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-history-plot.vue"
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

            <!-- THEMES -->
            <template #themes>
                <ThemesVueUiHistoryPlot />
            </template>

            <template #responsive>
                <ResponsiveUnit height="500px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiHistoryPlot"
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
