<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import BaseAttr from "../BaseAttr.vue";
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
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import ThemesVueUiDag from "../themes/ThemesVueUiDag.vue";

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

const dataset = ref({
    nodes: [
        { id: "A", label: "A",},
        { id: "B", label: "B",},
        { id: "C", label: "C",},
        { id: "D", label: "D" },
    ],
    edges: [
        { from: "A", to: "B",},
        { from: "B", to: "A" },
        { from: "B", to: "A" },
        { from: "C", to: "A" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
    ]
});

const codeDataset = ref(`const dataset: VueUiDagDataset = {
    nodes: [
        { id: "A", label: "A",},
        { id: "B", label: "B",},
        { id: "C", label: "C",},
        { id: "D", label: "D" },
    ],
    edges: [
        { from: "A", to: "B",},
        { from: "B", to: "A" },
        { from: "B", to: "A" },
        { from: "C", to: "A" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
    ]
}`)

const dsTypeCode = ref(`type VueUiDagNode = {
    [key: string]: any;
    id: string;
    label: string;
    backgroundColor?: string; // set a specific background color for a given node
    color?: string; // set a specific text color for a given node
}

type VueUiDagEdge = {
    from: string;
    to: string;
    color?: string; // set a specific stroke color for a given edge
}

type VueUiDagDataset = {
    nodes: VueUiDagNode[];
    edges: VueUiDagEdge[];
}`)

const config = ref({
    loading: false,
    debug: false,
    theme: '',
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            img: true,
            svg: true,
            fullscreen: true,
            annotator: true,
            zoom: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            svg: "Download SVG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator",
            zoom: "Toggle zoom lock"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    style: {
        fontFamily: 'inherit',
        chart: {
            backgroundColor: '#F3F4F6',
            color: '#1A1A1A',
            layout: {
                rankDirection: 'TB',
                rankSeparation: 60,
                nodeSeparation: 50,
                edgeSeparation: 30,
                nodeWidth: 100,
                nodeHeight: 40,
                curvedEdges: true,
                padding: 48,
                arrowShape: 'vee',
                arrowSize: 8,
                align: undefined
            },
            nodes: {
                stroke: '#8A8A8A',
                strokeWidth: 1,
                borderRadius: 3,
                backgroundColor: '#E1E5E8',
                labels: {
                    color: '#1A1A1A',
                    fontSize: 12,
                    bold: false,
                },
                tooltip: {
                    showOnClick: true,
                    backgroundColor: '#3A3A3A',
                    color: '#CCCCCC',
                    maxWidth: '300px'
                }
            },
            edges: {
                stroke: '#8A8A8A',
                strokeWidth: 1
            },
            midpoints: {
                show: true,
                radius: 4,
                stroke: '#8A8A8A',
                fill: '#F3F4F6',
                strokeWidth: 1,
                tooltip: {
                    maxWidth: '300px',
                    backgroundColor: '#3A3A3A',
                    color: '#CCCCCC'
                }
            },
            controls: {
                position: 'bottom',
                show: true,
                backgroundColor: '#F3F4F6',
                buttonColor: '#F3F4F6',
                color: '#1A1A1A',
                fontSize: 14,
                border: '1px solid #CCCCCC',
                padding: '0.5rem',
                borderRadius: '0.25rem'
            },
            zoom: {
                active: true
            },
            title: {
                text: "Title",
                color: "#1A1A1A",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    }
});

const darkModeConfig = ref({
    loading: false,
    debug: false,
    theme: '',
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            img: true,
            svg: true,
            fullscreen: true,
            annotator: true,
            zoom: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            img: "Download PNG",
            svg: "Download SVG",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator",
            zoom: "Toggle zoom lock"
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
    },
    style: {
        fontFamily: 'inherit',
        chart: {
            backgroundColor: '#1A1A1A',
            color: '#CCCCCC',
            layout: {
                rankDirection: 'TB',
                rankSeparation: 60,
                nodeSeparation: 50,
                edgeSeparation: 30,
                nodeWidth: 100,
                nodeHeight: 40,
                curvedEdges: true,
                padding: 48,
                arrowShape: 'vee',
                arrowSize: 8,
                align: undefined
            },
            nodes: {
                stroke: '#6A6A6A',
                strokeWidth: 1,
                borderRadius: 3,
                backgroundColor: '#3A3A3A',
                labels: {
                    color: '#CCCCCC',
                    fontSize: 12,
                    bold: false,
                },
                tooltip: {
                    showOnClick: true,
                    backgroundColor: '#2A2A2A',
                    color: '#CCCCCC',
                    maxWidth: '300px'
                }
            },
            edges: {
                stroke: '#6A6A6A',
                strokeWidth: 1
            },
            midpoints: {
                show: true,
                radius: 4,
                stroke: '#6A6A6A',
                fill: '#1A1A1A',
                strokeWidth: 1,
                tooltip: {
                    maxWidth: '300px',
                    backgroundColor: '#2A2A2A',
                    color: '#CCCCCC'
                }
            },
            controls: {
                position: 'bottom',
                show: true,
                backgroundColor: '#1A1A1A',
                buttonColor: '#1A1A1A',
                color: '#8A8A8A',
                fontSize: 14,
                border: '1px solid #3A3A3A',
                padding: '0.5rem',
                borderRadius: '0.25rem'
            },
            zoom: {
                active: true
            },
            title: {
                text: "Title",
                color: "#FAFAFA",
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: "#CCCCCC",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            }
        }
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
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

const box = ref(null);

function setActiveTab(tab) {
    if (!box.value) return;
    box.value.setActiveTab(tab);
}

const router = useRouter();
function goToPage(route) {
    router.push(route)
}

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiDag" />
        <BaseDocDescription :text="translations.docs.tooltips.dag[store.lang]" />

        <BaseDocHeaderActions
            targetLink="vue-ui-dag"
            :configSource="mainConfig.vue_ui_dag"
        />

        <div :class="`mx-auto max-w-[400px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <BaseCard>
                    <VueUiDag :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </BaseCard>
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-dag"/>
        </div>
        
        <Rater itemId="vue_ui_dag" />

        <Box ref="box" showEmits showSlots showThemes showCallbacks schema="vue_ui_dag">
            <template #tab0>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
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

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiDagConfig</code>
                </div>

                <div class="my-4">
                    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
                </div>
<code ref="configCode">
    <BaseDetails attr="const config: VueUiDagConfig" equal>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr inactive name="debug" attr="debug" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>theme: "", <BaseComment>"dark" | "celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
                <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="zoom" attr="userOptions.buttons.zoom" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
                <BaseAttr name="zoom" attr="userOptions.buttonTitles.zoom" type="text" defaultVal="Toggle zoom lock" :light="mutableConfig" :dark="mutableConfigDarkMode"  />
            </BaseDetails>
            <BaseDetails attr="callbacks" :level="2" title="userOptions.callbacks">
                <BaseTabLink :action="() => setActiveTab(11)" icon="lambda">
                    Check out 'callbacks' tab
                </BaseTabLink>
            </BaseDetails>
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
                <BaseAttr inactive name="orientation" defaultVal="auto" comment="'auto' | 'l' | 'p'"/>
                <BaseAttr inactive name="overflowTolerance" defaultVal="0.2"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="style" :level="1">
            <BaseAttr name="fontFamily" attr="style.fontFamily" type="text" defaultVal="'inherit'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="chart" title="style.chart" :level="2">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="layout" title="style.chart.layout" :level="3">
                    <BaseAttr name="rankDirection" attr="style.chart.layout.rankDirection" type="select" defaultVal="TB" :options="['TB', 'RL', 'BT', 'RL']" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="rankSeparation" attr="style.chart.layout.rankSeparation" type="number" defaultVal="60" :min="10" :max="100" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="nodeSeparation" attr="style.chart.layout.nodeSeparation" type="number" defaultVal="50" :min="10" :max="100" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="edgeSeparation" attr="style.chart.layout.edgeSeparation" type="number" defaultVal="30" :min="10" :max="100" :step="5" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="nodeWidth" attr="style.chart.layout.nodeWidth" type="number" defaultVal="100" :min="10" :max="200" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
                    <BaseAttr name="nodeHeight" attr="style.chart.layout.nodeHeight" type="number" defaultVal="40" :min="10" :max="80" :step="5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="curvedEdges" attr="style.chart.layout.curvedEdges" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="padding" attr="style.chart.layout.padding" type="number" defaultVal="48" :min="0" :max="100" :step="5" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="arrowShape" attr="style.chart.layout.arrowShape" type="select" defaultVal="'vee'" :options="['undirected', 'normal', 'vee']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="arrowSize" attr="style.chart.layout.arrowSize" type="number" defaultVal="8" :min="2" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="align" attr="style.chart.layout.align" type="select" defaultVal="undefined" :options="['UL', 'UR', 'DL', 'DR']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="nodes" title="style.chart.nodes" :level="3">
                    <BaseAttr name="stroke" attr="style.chart.nodes.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.nodes.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderRadius" attr="style.chart.nodes.borderRadius" type="number" defaultVal="3" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.nodes.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Individual colors can be defined in the dataset"/>
                    <BaseDetails attr="labels" title="style.chart.nodes.labels" :level="4">
                        <BaseAttr name="color" attr="style.chart.nodes.labels.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.nodes.labels.fontSize" type="number" defaultVal="12" :min="8" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.nodes.labels.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                    <BaseDetails attr="tooltip" title="style.chart.nodes.tooltip" :level="4">
                        <BaseAttr name="showOnClick" attr="style.chart.nodes.tooltip.showOnClick" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Tip: use the #tooltip-node slot to customize tooltip content"/>
                        <BaseAttr name="backgroundColor" attr="style.chart.nodes.tooltip.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.nodes.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="maxWidth" attr="style.chart.nodes.tooltip.maxWidth" type="text" defaultVal="'300px'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="edges" title="style.chart.edges" :level="3">
                    <BaseAttr name="stroke" attr="style.chart.edges.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.edges.strokeWidth" type="number" defaultVal="1" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="midpoints" title="style.chart.midpoints" :level="3">
                    <BaseAttr name="show" attr="style.chart.midpoints.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Tip: use the #tooltip-midpoint slot to customize tooltip content"/>
                    <BaseAttr name="radius" attr="style.chart.midpoints.radius" type="number" defaultVal="4" :min="0" :max="16" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.midpoints.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fill" attr="style.chart.midpoints.fill" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.midpoints.strokeWidth" type="number" defaultVal="1" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="tooltip" title="style.chart.midpoints.tooltip" :level="4">
                        <BaseAttr name="maxWidth" attr="style.chart.midpoints.tooltip.maxWidth" type="text" defaultVal="'300px'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="backgroundColor" attr="style.chart.midpoints.tooltip.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="color" attr="style.chart.midpoints.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="controls" title="style.chart.controls" :level="3">
                    <BaseAttr name="show" attr="style.chart.controls.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.controls.position" type="select" defaultVal="'bottom'" :options="['top', 'bottom']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.controls.backgroundColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.controls.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.controls.fontSize" type="number" defaultVal="14" :min="8" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="border" attr="style.chart.controls.border" type="text" defaultVal="'1px solid #CCCCCC'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="padding" attr="style.chart.controls.padding" type="text" defaultVal="'0.5rem'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderRadius" attr="style.chart.controls.borderRadius" type="text" defaultVal="'0.25rem'" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="zoom" title="style.chart.zoom" :level="3">
                    <BaseAttr name="active" attr="style.chart.zoom.active" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="When inactive, pan zoom is disabled, but controls can still be used"/>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab2>
                <ExposedMethods
                    component="VueUiDag"
                    getImage
                    :names="[
                        'getData',
                        'generatePdf',
                        'generateImage',
                        'generateSvg',
                        'resetZoom',
                        'zoomIn',
                        'zoomOut',
                        'switchDirection'
                    ]"
                />
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiDag"
                    :types="[
                        'svg',
                        'watermark',
                        'source',
                        'user-menu',
                        'annotator-actions',
                        'node',
                        'node-label',
                        'tooltip-node',
                        'tooltip-midpoint'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiDag/>
            </template>

            <template #tab11>
                <UserOptionCallbacks
                    :items="[
                        'annotator',
                        'fullscreen',
                        'img',
                        'pdf',
                        'svg',
                        'zoom'
                    ]"
                />
            </template>

        </Box>

    </div>
</template>