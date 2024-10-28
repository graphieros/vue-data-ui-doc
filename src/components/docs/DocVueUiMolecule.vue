<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseComment from "../BaseComment.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const dataset = ref([
    {
        name: "Root",
        details: "This is the root node",
        nodes: [
            {
                name: 'node1',
                details: 'Lorem ipsum',
                nodes: [
                    {
                        name: 'node1.1', details: 'Lorem ipsum', nodes: [
                            { name: 'node1.1' },
                            { name: 'node1.2' },
                            { name: 'node1.3' },
                        ]
                    },
                    {
                        name: 'node1.2', nodes: [
                            { name: 'node1.2.1' },
                            { name: 'node1.2.2' },
                            { name: 'node1.2.3' },
                            { name: 'node1.2.4' },
                        ]
                    },
                    {
                        name: 'node1.3', nodes: [
                            { name: 'node1.3.1' },
                            { name: 'node1.3.2' },
                        ]
                    },
                    {
                        name: 'node1.4', nodes: [
                            { name: 'node1.4.1' },
                            { name: 'node1.4.2' },
                            { name: 'node1.4.3' },
                            { name: 'node1.4.4' },
                            { name: 'node1.4.5' },
                            { name: 'node1.4.6' },
                        ]
                    },
                    {
                        name: 'node1.5', nodes: [
                            { name: 'node1.5.1' },
                            { name: 'node1.5.2' },
                            { name: 'node1.5.3' },
                            { name: 'node1.5.4' },
                            { name: 'node1.5.5' },
                            { name: 'node1.5.6' },
                        ]
                    },
                    {
                        name: 'node1.6', nodes: [
                            { name: 'node1.6.1' },
                            { name: 'node1.6.2' },
                            { name: 'node1.6.3' },
                            { name: 'node1.6.4' },
                            { name: 'node1.6.5' },
                            { name: 'node1.6.6' },
                        ]
                    },
                ]
            },
            {
                name: 'node2',
                nodes: [
                    {
                        name: 'node2.1', nodes: [
                            { name: 'node2.1.1' },
                            { name: 'node2.1.2' },
                            { name: 'node2.1.3' },
                            { name: 'node2.1.4' },
                            { name: 'node2.1.5' },
                            {
                                name: 'node2.1.6', nodes: [
                                    { name: 'node2.1.6.1' },
                                    { name: 'node2.1.6.2' },
                                    { name: 'node2.1.6.3' },
                                    { name: 'node2.1.6.4' },
                                    { name: 'node2.1.6.5' },
                                    {
                                        name: 'node2.1.6.6', nodes: [
                                            { name: 'node2.1.6.6.1' },
                                            { name: 'node2.1.6.6.2' },
                                            { name: 'node2.1.6.6.3' },
                                            { name: 'node2.1.6.6.4' },
                                            { name: 'node2.1.6.6.5' },
                                            {
                                                name: 'node2.1.6.6.6', nodes: [
                                                    { name: 'node2.1.6.6.6.1' },
                                                    { name: 'node2.1.6.6.6.2' },
                                                    { name: 'node2.1.6.6.6.3' , nodes: [
                                                        { name: 'node2.1.6.6.6.3.1' },
                                                        { name: 'node2.1.6.6.6.3.2', nodes: [
                                                            { name: 'node2.1.6.6.6.3.2.1' },
                                                            { name: 'node2.1.6.6.6.3.2.2' },
                                                            { name: 'node2.1.6.6.6.3.2.3' },
                                                        ] },
                                                        { name: 'node2.1.6.6.6.3.3' },
                                                        { name: 'node2.1.6.6.6.3.4' },
                                                        { name: 'node2.1.6.6.6.3.5' },
                                                        { name: 'node2.1.6.6.6.3.6' },
                                                    ]},
                                                    { name: 'node2.1.6.6.6.4' },
                                                    { name: 'node2.1.6.6.6.5' },
                                                    { name: 'node2.1.6.6.6.6' },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                name: 'node3',
                nodes: [
                    { name: 'node3.1' },
                    { name: 'node3.2' },
                    { name: 'node3.3' },
                ]
            },
            {
                name: 'node4',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2', nodes: [
                        { name: 'node4.2.1'},
                        { name: 'node4.2.2'},
                        { name: 'node4.2.3'},
                    ] },
                    { name: 'node4.3' },
                    { name: 'node4.4', nodes: [
                        { name: 'node4.4.1'},
                        { name: 'node4.4.2'},
                        { name: 'node4.4.3'},
                        { name: 'node4.4.4'},
                        { name: 'node4.4.5'},
                    ] },
                ]
            },
            {
                name: 'node5',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2' },
                    { name: 'node4.3' },
                    { name: 'node4.4' },
                    { name: 'node4.5' },
                ]
            },
            {
                name: 'node6',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2' },
                    { name: 'node4.3' },
                    { name: 'node4.4' },
                ]
            },
        ]
    }
])

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            nodes: {
                stroke: "#FFFFFF",
                strokeHovered: "#2D353C"
            },
            links: {
                stroke: "#DDDDDD"
            },
            title: {
                text: "Title",
                color: "#2D353C",
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
            },
            tooltip: {
                show: true,
                color: "#2D353C",
                backgroundColor: "#FFFFFF",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 90,
                position: 'center',
                offsetY: 24
            },
            zoom: {
                speed: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#FAFAFA",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#FFFFFF",
            color: "#2D353C",
            outline: "none"
        },
        translations: {
            nodeName: "Node name",
            details: "Details",
            ancestor: "Parent node"
        }
    },
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            tooltip: "Toggle tooltip",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
        }
    }
});

const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            nodes: {
                stroke: "#1A1A1A",
                strokeHovered: "#FAFAFA"
            },
            links: {
                stroke: "#3A3A3A"
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
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
            tooltip: {
                show: true,
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 90,
                position: 'center',
                offsetY: 24
            },
            zoom: {
                speed: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        translations: {
            nodeName: "Node name",
            details: "Details",
            ancestor: "Parent node"
        }
    },
    userOptions: {
        show: true,
        buttons: {
            tooltip: true,
            pdf: true,
            img: true,
            csv: true,
            table: true,
            labels: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            tooltip: "Toggle tooltip",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            labels: "Toggle labels",
            fullscreen: "Toggle fullscreen",
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
}

const { configCode, showAllConfig } = useConfigCode()

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartCluster" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Molecule</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.molecule[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-molecule"
            :configSource="mainConfig.vue_ui_molecule"
        />

        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
            <button @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible"/>
                    <div class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <Suspense>
                <template #default>
                    <VueUiMolecule :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </template>
                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <Box showEmits showSlots showTooltip>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiMoleculeDatasetNode[]</code>
                </div>

                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            details?: string;
            nodes: [
                {
                    name: string,
                    details?: string;
                    nodes?: ...
                }
            ]
        },
        {...}
    ]
</code>
</pre>                
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiMoleculeDatasetNode[]</span> = [
    {
        name: "Root",
        details: "This is the root node",
        nodes: [
            {
                name: 'node1',
                details: 'Lorem ipsum',
                nodes: [
                    {
                        name: 'node1.1', details: 'Lorem ipsum', nodes: [
                            { name: 'node1.1' },
                            { name: 'node1.2' },
                            { name: 'node1.3' },
                        ]
                    },
                    {
                        name: 'node1.2', nodes: [
                            { name: 'node1.2.1' },
                            { name: 'node1.2.2' },
                            { name: 'node1.2.3' },
                            { name: 'node1.2.4' },
                        ]
                    },
                    {
                        name: 'node1.3', nodes: [
                            { name: 'node1.3.1' },
                            { name: 'node1.3.2' },
                        ]
                    },
                    {
                        name: 'node1.4', nodes: [
                            { name: 'node1.4.1' },
                            { name: 'node1.4.2' },
                            { name: 'node1.4.3' },
                            { name: 'node1.4.4' },
                            { name: 'node1.4.5' },
                            { name: 'node1.4.6' },
                        ]
                    },
                    {
                        name: 'node1.5', nodes: [
                            { name: 'node1.5.1' },
                            { name: 'node1.5.2' },
                            { name: 'node1.5.3' },
                            { name: 'node1.5.4' },
                            { name: 'node1.5.5' },
                            { name: 'node1.5.6' },
                        ]
                    },
                    {
                        name: 'node1.6', nodes: [
                            { name: 'node1.6.1' },
                            { name: 'node1.6.2' },
                            { name: 'node1.6.3' },
                            { name: 'node1.6.4' },
                            { name: 'node1.6.5' },
                            { name: 'node1.6.6' },
                        ]
                    },
                ]
            },
            {
                name: 'node2',
                nodes: [
                    {
                        name: 'node2.1', nodes: [
                            { name: 'node2.1.1' },
                            { name: 'node2.1.2' },
                            { name: 'node2.1.3' },
                            { name: 'node2.1.4' },
                            { name: 'node2.1.5' },
                            {
                                name: 'node2.1.6', nodes: [
                                    { name: 'node2.1.6.1' },
                                    { name: 'node2.1.6.2' },
                                    { name: 'node2.1.6.3' },
                                    { name: 'node2.1.6.4' },
                                    { name: 'node2.1.6.5' },
                                    {
                                        name: 'node2.1.6.6', nodes: [
                                            { name: 'node2.1.6.6.1' },
                                            { name: 'node2.1.6.6.2' },
                                            { name: 'node2.1.6.6.3' },
                                            { name: 'node2.1.6.6.4' },
                                            { name: 'node2.1.6.6.5' },
                                            {
                                                name: 'node2.1.6.6.6', nodes: [
                                                    { name: 'node2.1.6.6.6.1' },
                                                    { name: 'node2.1.6.6.6.2' },
                                                    { name: 'node2.1.6.6.6.3' },
                                                    { name: 'node2.1.6.6.6.4' },
                                                    { name: 'node2.1.6.6.6.5' },
                                                    { name: 'node2.1.6.6.6.6' },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                name: 'node3',
                nodes: [
                    { name: 'node3.1' },
                    { name: 'node3.2' },
                    { name: 'node3.3' },
                ]
            },
            {
                name: 'node4',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2', nodes: [
                        { name: 'node4.2.1'},
                        { name: 'node4.2.2'},
                        { name: 'node4.2.3'},
                    ] },
                    { name: 'node4.3' },
                    { name: 'node4.4', nodes: [
                        { name: 'node4.4.1'},
                        { name: 'node4.4.2'},
                        { name: 'node4.4.3'},
                        { name: 'node4.4.4'},
                        { name: 'node4.4.5'},
                    ] },
                ]
            },
            {
                name: 'node5',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2' },
                    { name: 'node4.3' },
                    { name: 'node4.4' },
                    { name: 'node4.5' },
                ]
            },
            {
                name: 'node6',
                nodes: [
                    { name: 'node4.1' },
                    { name: 'node4.2' },
                    { name: 'node4.3' },
                    { name: 'node4.4' },
                ]
            },
        ]
    }
]
</code>
</pre>                
                </div>
                </div>
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiMoleculeConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiMoleculeConfig">
        <span>theme: "", <BaseComment>"zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseDetails attr="links" :level="3" title="style.chart.links">
                    <BaseAttr name="stroke" attr="style.chart.links.stroke" type="color" defaultVal="#CCCCCC" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="nodes" :level="3" title="style.chart.links">
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.nodes.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.nodes.stroke">, (default: "#FFFFFF")</span>
                    <span>strokeHovered: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.nodes.strokeHovered"><input v-else type="color" v-model="mutableConfig.style.chart.nodes.strokeHovered">, (default: "#2D353C")</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <BaseAttr name="color" attr="style.chart.title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="text" attr="style.chart.title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="fontSize" attr="style.chart.title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="textAlign" attr="style.chart.title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingLeft" attr="style.chart.title.paddingLeft" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="paddingRight" attr="style.chart.title.paddingRight" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <BaseAttr name="color" attr="style.chart.title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="text" attr="style.chart.title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="fontSize" attr="style.chart.title.subtitle.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                        <BaseAttr name="bold" attr="style.chart.title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <span>customFormat: null, <span class="text-gray-600 dark:text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="zoom" :level="3" title="style.chart.zoom">
                    <BaseAttr name="zoom" attr="style.chart.zoom.speed" type="number" :min="0" :max="2" :step="0.1" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="translations" :level="2" title="table.translations">
                <BaseAttr name="nodeName" attr="table.translations.nodeName" type="text" defaultVal="Node name" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="details" attr="table.translations.details" type="text" defaultVal="Details" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="ancestor" attr="table.translations.ancestor" type="text" defaultVal="Parent node" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="labels" attr="userOptions.buttons.labels" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="labels" attr="userOptions.buttonTitles.labels" type="text" defaultVal="Toggle labels" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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

            const moleculeChart = ref(null);
            const moleculeDataset = ref([]);

            onMounted(() => {
                moleculeDataset.value = moleculeChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMolecule
                ref="moleculeChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiMolecule
                ref="moleculeChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        moleculeDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.moleculeDataset = this.$refs.moleculeChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generatePdf</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generatePdf[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateCsv</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateCsv[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>generateImage</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.generateImage[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleTable</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleTable[store.lang] }}</div>
                </div>
                <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>toggleLabels</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleLabels[store.lang] }}</div>
                </div>
                </div>
            </template>
            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiMolecule
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiMolecule&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiMolecule
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiMolecule&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiMolecule
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiMolecule&gt;
</code>
</pre>
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">datapoint, series, config</span> }) => {
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
        </Box>
    </div>
</template>