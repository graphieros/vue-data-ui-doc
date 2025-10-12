<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon, ExclamationCircleIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiFlow from "../themes/ThemesVueUiFlow.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
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

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);
const { isMobile } = useMobile()

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    // Raw materials → Components
    ['Mining', 'Copper', 40,],
    ['Mining', 'Lithium', 30,],
    ['Mining', 'Gold', 10,],
    ['Mining', 'Rare Earths', 30],

    // Components → Manufacturing
    ['Copper', 'PCB Assembly', 40],
    ['Lithium', 'Battery Production', 35],
    ['Gold', 'Microchips', 15],
    ['Rare Earths', 'Microchips', 20],

    // Manufacturing → Assembly
    ['PCB Assembly', 'Phone Assembly', 40],
    ['Battery Production', 'Phone Assembly', 30],
    ['Microchips', 'Phone Assembly', 35],

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
]`)

const dsTypeCode = ref(`type VueUiFlowDatasetItem = [string, string, number]`)

const config = ref({
    debug: false,
    loading: false,
    responsive: false,
    nodeCategories: {
            // Raw Materials
            'Mining': 'raw',

            // Components
            'Copper': 'component',
            'Lithium': 'component',
            'Gold': 'component',
            'Rare Earths': 'component',

            // Manufacturing
            'PCB Assembly': 'manufacturing',
            'Battery Production': 'manufacturing',
            'Microchips': 'manufacturing',

            // Assembly
            'Phone Assembly': 'assembly',

            // Distribution
            'Retail': 'distribution',

            // Consumer Use
            'Consumer Use': 'consumer',

            // End-of-life
            'Recycling': 'endOfLife',
            'Landfill': 'endOfLife',
            'Resale': 'endOfLife',

            // Secondary flow
            'Recovered Materials': 'secondary',
            'E-Waste': 'secondary',
            'Second-hand Use': 'secondary'
        },
        nodeCategoryColors: {
            raw: '#8B4513',             // Brown - for extraction
            component: '#1E90FF',       // Blue - technical materials
            manufacturing: '#FFD700',   // Gold - active production
            assembly: '#FF8C00',        // Dark orange
            distribution: '#A020F0',    // Purple - logistics
            consumer: '#228B22',        // Green - use phase
            endOfLife: '#B22222',       // Firebrick red
            secondary: '#20B2AA'        // Light sea green - reuse/recover
        },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
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
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            height: 300,
            width: 1000,
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            legend: {
                backgroundColor: "#F3F4F6",
                color: "#1A1A1A",
                show: true,
                fontSize: 14,
                bold: false,
                position: 'bottom'
            },
            tooltip: {
                show: true,
                color: "#1A1A1A",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24,
                showPercentage: true,
                roundingPercentage: 0,
                translations: {
                    from: 'From:',
                    to: 'To:',
                    percentOfTotal: 'Percent of total:'
                },
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
            padding: {
                top: 12,
                left: 12,
                right: 12,
                bottom: 12
            },
            title: {
                text: "Material Flow in the Smartphone Lifecycle",
                color: "#2D353C",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "From Raw‐Material Extraction through Manufacturing, Use and End-of-Life",
                    fontSize: 16,
                    bold: false
                }
            },
            nodes: {
                gap: 10,
                width: 40,
                labels: {
                    show: true,
                    fontSize: 14,
                    abbreviation: {
                        use: true,
                        length: 3
                    },
                    prefix: "",
                    suffix: "",
                    rounding: 0
                },
                stroke: "#FFFFFF",
                strokeWidth: 1
            },
            links: {
                opacity: 0.8,
                stroke: "#FFFFFF",
                strokeWidth: 1
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        columnNames: {
            source: "Source",
            target: "Target",
            value: "Value"
        },
        th: {
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none"
        }
    }
});

const darkModeConfig = ref({
    debug: false,
    loading: false,
    responsive: false,
    nodeCategories: {
        // Raw Materials
        'Mining': 'raw',

        // Components
        'Copper': 'component',
        'Lithium': 'component',
        'Gold': 'component',
        'Rare Earths': 'component',

        // Manufacturing
        'PCB Assembly': 'manufacturing',
        'Battery Production': 'manufacturing',
        'Microchips': 'manufacturing',

        // Assembly
        'Phone Assembly': 'assembly',

        // Distribution
        'Retail': 'distribution',

        // Consumer Use
        'Consumer Use': 'consumer',

        // End-of-life
        'Recycling': 'endOfLife',
        'Landfill': 'endOfLife',
        'Resale': 'endOfLife',

        // Secondary flow
        'Recovered Materials': 'secondary',
        'E-Waste': 'secondary',
        'Second-hand Use': 'secondary'
    },
    nodeCategoryColors: {
        raw: '#8B4513',
        component: '#1E90FF',
        manufacturing: '#FFD700',
        assembly: '#FF8C00', 
        distribution: '#A020F0',
        consumer: '#228B22',
        endOfLife: '#B22222',  
        secondary: '#20B2AA'        
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
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
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            height: 300,
            width: 1000,
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            padding: {
                top: 12,
                left: 12,
                right: 12,
                bottom: 12
            },
            legend: {
                backgroundColor: "#2A2A2A",
                color: "#CCCCCC",
                show: true,
                fontSize: 14,
                bold: false,
                position: 'bottom'
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24,
                showPercentage: true,
                roundingPercentage: 0,
                translations: {
                    from: 'From:',
                    to: 'To:',
                    percentOfTotal: 'Percent of total:'
                },
                smooth: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25
            },
            title: {
                text: "Material Flow in the Smartphone Lifecycle",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "From Raw‐Material Extraction through Manufacturing, Use and End-of-Life",
                    fontSize: 16,
                    bold: false
                }
            },
            nodes: {
                gap: 10,
                width: 40,
                labels: {
                    show: true,
                    fontSize: 14,
                    abbreviation: {
                        use: true,
                        length: 3
                    },
                    prefix: "",
                    suffix: "",
                    rounding: 0
                },
                stroke: "#1A1A1A",
                strokeWidth: 1
            },
            links: {
                opacity: 0.8,
                stroke: "#1A1A1A",
                strokeWidth: 1
            }
        }
    },
    table: {
        show: false,
        useDialog: false,
        responsiveBreakpoint: 400,
        columnNames: {
            source: "Source",
            target: "Target",
            value: "Value"
        },
        th: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#2A2A2A",
            color: "#CCCCCC",
            outline: "none"
        }
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const { configCode, showAllConfig } = useConfigCode()

const additionalTranslations = computed(() => {
    return {
        nodeCategories: {
            en: `Map dataset keys to specific categories (will appear in legend); example: { Mining: 'component' }`,
            fr: `Associez les clés du jeu de données à des catégories spécifiques (apparaîtront dans la légende) ; exemple : { Mining: 'component' }`,
            pt: `Mapeie as chaves do conjunto de dados para categorias específicas (serão exibidas na legenda); exemplo: { Mining: 'component' }`,
            de: `Ordnen Sie die Schlüssel des Datensatzes bestimmten Kategorien zu (werden in der Legende angezeigt); Beispiel: { Mining: 'component' }`,
            zh: `将数据集键映射到特定类别（将出现在图例中）；示例：{ Mining: 'component' }`,
            jp: `データセットのキーを特定のカテゴリにマッピングします（凡例に表示されます）；例: { Mining: 'component' }`,
            es: `Mapear claves del conjunto de datos a categorías específicas (aparecerán en la leyenda); ejemplo: { Mining: 'component' }`,
            ko: `데이터셋 키를 특정 카테고리에 매핑합니다(범례에 표시됨); 예: { Mining: 'component' }`,
            ar: `قم بتعيين مفاتيح مجموعة البيانات إلى فئات محددة (ستظهر في وسيلة الإيضاح)؛ مثال: { Mining: 'component' }`
        },
        nodeCategoryColors: {
            en: `Map node categories to custom colors; example: { component: '#1E90FF' }`,
            fr: `Associez les catégories de nœuds à des couleurs personnalisées ; exemple : { component: '#1E90FF' }`,
            pt: `Mapeie as categorias de nó para cores personalizadas; exemplo: { component: '#1E90FF' }`,
            de: `Ordnen Sie Knotenkategorien benutzerdefinierten Farben zu; Beispiel: { component: '#1E90FF' }`,
            zh: `将节点类别映射到自定义颜色；示例：{ component: '#1E90FF' }`,
            jp: `ノードカテゴリをカスタムカラーにマッピングします；例: { component: '#1E90FF' }`,
            es: `Mapear categorías de nodos a colores personalizados; ejemplo: { component: '#1E90FF' }`,
            ko: `노드 카테고리를 사용자 지정 색상에 매핑합니다; 예: { component: '#1E90FF' }`,
            ar: `قم بتعيين فئات العقد إلى ألوان مخصصة؛ مثال: { component: '#1E90FF' }`
        },
        legend: {
            en: 'A legend can be displayed, if nodeCategories and nodeCategoryColors are provided.',
            fr: 'Une légende peut être affichée si nodeCategories et nodeCategoryColors sont fournis.',
            pt: 'Uma legenda pode ser exibida se nodeCategories e nodeCategoryColors forem fornecidos.',
            de: 'Eine Legende kann angezeigt werden, wenn nodeCategories und nodeCategoryColors bereitgestellt werden.',
            zh: '如果提供了 nodeCategories 和 nodeCategoryColors，则可以显示图例。',
            jp: 'nodeCategories と nodeCategoryColors が提供されている場合、凡例を表示できます。',
            es: 'Se puede mostrar una leyenda si se proporcionan nodeCategories y nodeCategoryColors.',
            ko: 'nodeCategories 및 nodeCategoryColors가 제공되면 범례를 표시할 수 있습니다.',
            ar: 'يمكن عرض وسيلة إيضاح إذا تم توفير nodeCategories و nodeCategoryColors.'
        }
    }
})

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiFlow" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.flow[store.lang] }}
        </p>

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
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueDataUi component="VueUiFlow" :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_flow" />

        <BaseMigrationInfo
            debug 
            padding
        />

        <Box showSlots showThemes showEmits showTooltip showResponsive schema="vue_ui_flow" signInfo="positiveOnly">
            <template #tab0>

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
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiFlowConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<div class="flex flew-row gap-2 text-app-orange">
    <ExclamationCircleIcon/>
    {{ additionalTranslations.legend[store.lang] }}
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiFlowConfig" equal>
        <span>responsive: false; <span class="text-app-blue break-keep text-xs">// {{ translations.responsive[store.lang] }}</span></span>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>theme: "", ("celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: [],<BaseComment>string[]</BaseComment></span>
        <span>nodeCategories: {},<BaseComment>{{ additionalTranslations.nodeCategories[store.lang] }}</BaseComment></span>
        <span>nodeCategoryColors: {},<BaseComment>{{ additionalTranslations.nodeCategoryColors[store.lang] }}</BaseComment></span>
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="1000" :min="300" :max="2000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="600" :min="300" :max="2000" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseDetails attr="links" :level="3" title="style.chart.links">
                    <BaseAttr name="opacity" attr="style.chart.links.opacity" type="range" defaultVal="0.8" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.links.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.links.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="nodes" :level="3" title="style.chart.nodes">
                    <BaseAttr name="gap" attr="style.chart.nodes.gap" type="number" defaultVal="10" :min="0" :max="40" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="width" attr="style.chart.nodes.width" type="number" defaultVal="40" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.nodes.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWdith" attr="style.chart.nodes.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="labels" :level="4" title="style.chart.nodes.labels">
                        <BaseAttr name="fontSize" attr="style.chart.nodes.labels.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="prefix" attr="style.chart.node.labels.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="suffix" attr="style.chart.node.labels.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
                        <BaseAttr name="rounding" attr="style.chart.nodes.labels.rounding" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseDetails attr="abbreviation" :level="5" title="style.chart.nodes.labels.abbreviation">
                            <BaseAttr name="use" attr="style.chart.nodes.labels.abbreviation.use" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                            <BaseAttr name="length" attr="style.chart.nodes.labels.abbreviation.length" type="number" defaultVal="3" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="legend" :level="3" title="style.chart.legend">
                    <BaseAttr name="show" attr="style.chart.legend.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.legend.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.legend.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.legend.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.legend.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.legend.position" type="select" defaultVal="bottom" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="showPercentage" attr="style.chart.tooltip.showPercentage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingPercentage" attr="style.chart.tooltip.roundingPercentage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <span>customFormat: null, <span class="text-gray-600 dark:text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smooth" attr="style.chart.tooltip.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothForce" attr="style.chart.tooltip.smoothForce" type="number" defaultVal="0.18" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="smoothSnapThreshold" attr="style.chart.tooltip.smoothSnapThreshold" type="number" defaultVal="0.25" :min="0.1" :max="24" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="translations" :level="4" title="style.chart.tooltip.translations">
                        <BaseAttr name="from" attr="style.chart.tooltip.translations.from" type="text" defaultVal="From:" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="to" attr="style.chart.tooltip.translations.to" type="text" defaultVal="To:" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="percentOfTotal" attr="style.chart.tooltip.translations.percentOfTotal" type="text" defaultVal="Percent of total:" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="12" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="64" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#A1A1A1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="useDialog" attr="table.useDialog" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="since v3.1.0"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="source" attr="table.columnNames.source" type="text" defaultVal="Source" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="target" attr="table.columnNames.target" type="text" defaultVal="Target" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FAFAFA" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
                <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            
            </template>

            <template #tab2>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
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
                </div>
            </template>

            <!-- SLOTS -->
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiFlow"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'chart-background',
                        'legend'
                    ]" 
                />
            </template>

            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">datapoint</span> }) => {
    <span class="text-gray-400">// use args to build your custom content</span>
    const content = "My custom content";
    return `&lt;div&gt;${content}&lt;/div&gt;`
}
</code>
</pre> 
Using custom mode, the tooltip will be headless.
Target the following css class to apply custom styles:
<pre>
<code>
.vue-data-ui-custom-tooltip
</code>
</pre>
            </template>

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiFlow/>
            </template>

            <template #tab7>
                <ResponsiveUnit height="400px" minHeight="300px">
                    <template #chart>
                        <VueDataUi
                            component="VueUiFlow"
                            :dataset="dataset"
                            :config="
                                isDarkMode 
                                    ? {
                                        ...mutableConfigDarkMode,
                                        responsive: true
                                    }
                                    : {
                                        ...mutableConfig,
                                        responsive: true
                                    }
                                " 
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>