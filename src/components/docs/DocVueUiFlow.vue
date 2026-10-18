<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiFlowConfigFields from "./configuration/VueUiFlowConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon, ExclamationCircleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiFlow from "../themes/ThemesVueUiFlow.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
    // Raw materials → Components
    ["Mining", "Copper", 40],
    ["Mining", "Lithium", 30],
    ["Mining", "Gold", 10],
    ["Mining", "Rare Earths", 30],

    // Components → Manufacturing
    ["Copper", "PCB Assembly", 40],
    ["Lithium", "Battery Production", 35],
    ["Gold", "Microchips", 15],
    ["Rare Earths", "Microchips", 20],

    // Manufacturing → Assembly
    ["PCB Assembly", "Phone Assembly", 40],
    ["Battery Production", "Phone Assembly", 30],
    ["Microchips", "Phone Assembly", 35],

    // Assembly → Distribution
    ["Phone Assembly", "Retail", 100],

    // Distribution → Consumers
    ["Retail", "Consumer Use", 100],

    // Consumers → End-of-life
    ["Consumer Use", "Recycling", 40],
    ["Consumer Use", "Landfill", 30],
    ["Consumer Use", "Resale", 30],

    // End-of-life → Secondary flow
    ["Recycling", "Recovered Materials", 25],
    ["Recycling", "E-Waste", 15],
    ["Resale", "Second-hand Use", 30],
]);

const codeDataset = ref(`const dataset: VueUiFlowDatasetItem[] = [
    // Raw materials → Components
    ['Mining', 'Copper', 40,],
    ['Mining', 'Lithium', 30,],
    ['Mining', 'Gold', 10,],
    ['Mining', 'Rare Earths', 20],

    // Components → Manufacturing
    ['Copper', 'PCB Assembly', 40],
    ['Lithium', 'Battery Production', 30],
    ['Gold', 'Microchips', 10],
    ['Rare Earths', 'Microchips', 20],

    // Manufacturing → Assembly
    ['PCB Assembly', 'Phone Assembly', 40],
    ['Battery Production', 'Phone Assembly', 30],
    ['Microchips', 'Phone Assembly', 30],

    // Assembly → Distribution
    ['Phone Assembly', 'Retail', 100],

    // Distribution → Consumers
    ['Retail', 'Consumer Use', 100],

    // Consumers → End-of-life
    ['Consumer Use', 'Recycling', 40],
    ['Consumer Use', 'Landfill', 30],
    ['Consumer Use', 'Resale', 30],

    // End-of-life → Secondary flow
    ['Recycling', 'Recovered Materials', 25],
    ['Recycling', 'E-Waste', 15],
    ['Resale', 'Second-hand Use', 30]
]`);

const dsTypeCode = ref(`type VueUiFlowDatasetItem = [string, string, number]`);

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
                        "Use the left and right, or up and down arrow keys to move between datapoints",
                    tableAvailable:
                        "A data table for this chart is available below.",
                    tableCaption: "Chart data table",
                },
            },
            nodeCategories: {
                Mining: "raw",
                Copper: "component",
                Lithium: "component",
                Gold: "component",
                "Rare Earths": "component",
                "PCB Assembly": "manufacturing",
                "Battery Production": "manufacturing",
                Microchips: "manufacturing",
                "Phone Assembly": "assembly",
                Retail: "distribution",
                "Consumer Use": "consumer",
                Recycling: "endOfLife",
                Landfill: "endOfLife",
                Resale: "endOfLife",
                "Recovered Materials": "secondary",
                "E-Waste": "secondary",
                "Second-hand Use": "secondary",
            },
            nodeCategoryColors: {
                raw: "#8B4513",
                component: "#1E90FF",
                manufacturing: "#FFD700",
                assembly: "#FF8C00",
                distribution: "#A020F0",
                consumer: "#228B22",
                endOfLife: "#B22222",
                secondary: "#20B2AA",
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
                    pdf: "Download PDF",
                    csv: "Download CSV",
                    img: "Download PNG",
                    table: "Toggle table",
                    fullscreen: "Toggle fullscreen",
                    annotator: "Toggle annotator",
                    tooltip: "Toggle tooltip",
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
                    height: 300,
                    width: 1000,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    legend: {
                        backgroundColor: isDarkMode.value
                            ? "#2A2A2A"
                            : "#F3F4F6",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        show: true,
                        fontSize: 14,
                        bold: false,
                        position: "bottom",
                    },
                    tooltip: {
                        teleportTo: "body",
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        backgroundColor: isDarkMode.value
                            ? "#1A1A1A"
                            : "#F3F4F6",
                        fontSize: 14,
                        showValue: true,
                        roundingValue: 0,
                        customFormat: null,
                        borderRadius: 4,
                        borderColor: isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                        borderWidth: 1,
                        backgroundOpacity: 30,
                        position: "center",
                        offsetY: 24,
                        offsetX: 0,
                        showPercentage: true,
                        roundingPercentage: 0,
                        translations: {
                            from: "From:",
                            to: "To:",
                            percentOfTotal: "Percent of total:",
                        },
                        smooth: true,
                        smoothForce: 0.18,
                        smoothSnapThreshold: 0.25,
                    },
                    padding: { top: 12, left: 12, right: 12, bottom: 12 },
                    title: {
                        text: "Material Flow in the Smartphone Lifecycle",
                        color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                        fontSize: 20,
                        bold: true,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        subtitle: {
                            color: "#A1A1A1",
                            text: "From Raw‐Material Extraction through Manufacturing, Use and End-of-Life",
                            fontSize: 16,
                            bold: false,
                        },
                    },
                    nodes: {
                        gap: 10,
                        width: 40,
                        labels: {
                            show: true,
                            showValue: true,
                            fontSize: 14,
                            abbreviation: { use: true, length: 3 },
                            prefix: "",
                            suffix: "",
                            rounding: 0,
                        },
                        stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        strokeWidth: 1,
                        borderRadius: 2,
                    },
                    links: {
                        opacity: 0.8,
                        stroke: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        strokeWidth: 1,
                        smooth: true,
                    },
                },
            },
            table: {
                show: false,
                useDialog: false,
                responsiveBreakpoint: 400,
                columnNames: {
                    source: "Source",
                    target: "Target",
                    value: "Value",
                },
                th: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FAFAFA",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
                },
                td: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#CCCCCC" : "#2D353C",
                    outline: "none",
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

const additionalTranslations = computed(() => {
    return {
        nodeCategories: {
            en: `Map dataset keys to specific categories (will appear in legend); example: { Mining: 'component' }`,
            fr: `Associez les clés du jeu de données à des catégories spécifiques (apparaîtront dans la légende) ; exemple : { Mining: 'component' }`,
            pt: `Mapeie as chaves do conjunto de dados para categorias específicas (serão exibidas na legenda); exemplo: { Mining: 'component' }`,
            de: `Ordnen Sie die Schlüssel des Datensatzes bestimmten Kategorien zu (werden in der Legende angezeigt); Beispiel: { Mining: 'component' }`,
            zh: `将数据集键映射到特定类别（将出现在图例中）；示例：{ Mining: 'component' }`,
            ja: `データセットのキーを特定のカテゴリにマッピングします（凡例に表示されます）；例: { Mining: 'component' }`,
            es: `Mapear claves del conjunto de datos a categorías específicas (aparecerán en la leyenda); ejemplo: { Mining: 'component' }`,
            ko: `데이터셋 키를 특정 카테고리에 매핑합니다(범례에 표시됨); 예: { Mining: 'component' }`,
            ar: `قم بتعيين مفاتيح مجموعة البيانات إلى فئات محددة (ستظهر في وسيلة الإيضاح)؛ مثال: { Mining: 'component' }`,
        },
        nodeCategoryColors: {
            en: `Map node categories to custom colors; example: { component: '#1E90FF' }`,
            fr: `Associez les catégories de nœuds à des couleurs personnalisées ; exemple : { component: '#1E90FF' }`,
            pt: `Mapeie as categorias de nó para cores personalizadas; exemplo: { component: '#1E90FF' }`,
            de: `Ordnen Sie Knotenkategorien benutzerdefinierten Farben zu; Beispiel: { component: '#1E90FF' }`,
            zh: `将节点类别映射到自定义颜色；示例：{ component: '#1E90FF' }`,
            ja: `ノードカテゴリをカスタムカラーにマッピングします；例: { component: '#1E90FF' }`,
            es: `Mapear categorías de nodos a colores personalizados; ejemplo: { component: '#1E90FF' }`,
            ko: `노드 카테고리를 사용자 지정 색상에 매핑합니다; 예: { component: '#1E90FF' }`,
            ar: `قم بتعيين فئات العقد إلى ألوان مخصصة؛ مثال: { component: '#1E90FF' }`,
        },
        legend: {
            en: "A legend can be displayed, if nodeCategories and nodeCategoryColors are provided.",
            fr: "Une légende peut être affichée si nodeCategories et nodeCategoryColors sont fournis.",
            pt: "Uma legenda pode ser exibida se nodeCategories e nodeCategoryColors forem fornecidos.",
            de: "Eine Legende kann angezeigt werden, wenn nodeCategories und nodeCategoryColors bereitgestellt werden.",
            zh: "如果提供了 nodeCategories 和 nodeCategoryColors，则可以显示图例。",
            ja: "nodeCategories と nodeCategoryColors が提供されている場合、凡例を表示できます。",
            es: "Se puede mostrar una leyenda si se proporcionan nodeCategories y nodeCategoryColors.",
            ko: "nodeCategories 및 nodeCategoryColors가 제공되면 범례를 표시할 수 있습니다.",
            ar: "يمكن عرض وسيلة إيضاح إذا تم توفير nodeCategories و nodeCategoryColors.",
        },
    };
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

const customFormatCode = ref(`customFormat: ({ datapoint }) => {
    // ${translations.value.customFormatArgs[store.lang]}
    const content = "My custom content";
    return \`<div>\${content}</div>\`;
}`);
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiFlow" />

        <BaseDocDescription
            :text="translations.docs.tooltips.flow[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-flow"
            targetMaker="VueUiFlow"
            :configSource="mainConfig.vue_ui_flow"
        />

        <div :class="`transition-all mx-auto w-full`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        component="VueUiFlow"
                        :dataset="dataset"
                        :config="config"
                        :key="key"
                    />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_flow" />

        <BaseMigrationInfo debug padding />

        <Box
            ref="box"
            showSlots
            showThemes
            showEmits
            showTooltip
            showResponsive
            showCallbacks
            schema="vue_ui_flow"
            signInfo="positiveOnly"
        >
            <template #dataset>
                <CodeParser
                    language="typescript"
                    @copy="store.copy()"
                    :title="translations.docs.datastructure[store.lang]"
                    :content="dsTypeCode"
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
            </template>

            <!-- CONFIG -->
            <template #configuration>
                <DebugHint component="VueUiFlow" configType="VueUiFlowConfig" />

                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiFlowConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view:
                    <input type="checkbox" v-model="showAllConfig" />
                </div>

                <div class="flex flew-row gap-2 text-app-orange">
                    <ExclamationCircleIcon />
                    {{ additionalTranslations.legend[store.lang] }}
                </div>

                <code ref="configCode">
                    <VueUiFlowConfigFields
                        :config="config"
                        :context="{
                            additionalTranslations,
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
                <ComponentEmits component="VueUiFlow" :names="['copyAlt']" />
                <ExposedMethods
                    component="VueUiFlow"
                    getImage
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

            const flowChart = ref(null);
            const flowDataset = ref([]);

            onMounted(async () => {
                flowDataset.value = await flowChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFlow
                ref="flowChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiFlow
                ref="flowChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        flowDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.flowDataset = await this.$refs.flowChart.getData();
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
                    componentName="VueUiFlow"
                    :types="[
                        'hint',
                        'svg',
                        'tooltip-before',
                        'tooltip',
                        'tooltip-after',
                        'watermark',
                        'source',
                        'chart-background',
                        'legend',
                        'user-menu',
                        'annotator-actions',
                    ]"
                >
                    <template #top>
                        <BaseSlotsImplementationLink
                            link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-flow.vue"
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
                <ThemesVueUiFlow />
            </template>

            <template #responsive>
                <ResponsiveUnit height="400px" minHeight="300px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiFlow"
                            :dataset="dataset"
                            :config="{
                                ...config,
                                responsive: true,
                            }"
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
