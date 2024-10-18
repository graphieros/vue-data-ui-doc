<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocActions from "./BaseDocActions.vue";
import BaseNumberInput from "../BaseNumberInput.vue";

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

const configCode = ref(null)
const showAllConfig = ref(false);

watch(() => showAllConfig.value, (v) => {
    if (v) {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => d.setAttribute('open', 'true'))
    } else {
        Array.from(configCode.value.getElementsByTagName('details')).forEach(d => {
            if (d.hasAttribute('open')) {
                d.removeAttribute('open')
            }
        })
    }
})

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

        <BaseDocActions
            targetLink="vue-ui-molecule"
            :configSource="mainConfig.vue_ui_molecule"
        />

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
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <BaseDetails attr="links" :level="3" title="style.chart.links">
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.links.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.links.stroke">, (default: "#CCCCCC")</span>
                </BaseDetails>
                <BaseDetails attr="nodes" :level="3" title="style.chart.links">
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.nodes.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.nodes.stroke">, (default: "#FFFFFF")</span>
                    <span>strokeHovered: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.nodes.strokeHovered"><input v-else type="color" v-model="mutableConfig.style.chart.nodes.strokeHovered">, (default: "#2D353C")</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)</span>
                    <span> bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
                    <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)</span>
                    <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")</span>
                    <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.chart.tooltip.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)</span>
                    <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <span>borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)</span>
                    <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8")</span>
                    <span>borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.chart.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.chart.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)</span>
                    <span>backgroundOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundOpacity" min="0" max="100"><input v-else type="range" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.backgroundOpacity" min="0" max="100">, (default: 100)</span>
                    <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.tooltip.position"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.chart.tooltip.position"><option>left</option><option>center</option><option>right</option></select></span>
                    <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.offsetY" :min="0" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.offsetY" :min="0" :max="64"/></span>
                </BaseDetails>
                <BaseDetails attr="zoom" :level="3" title="style.chart.zoom">
                    <span>speed: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="2" step="0.1" v-model="mutableConfigDarkMode.style.chart.zoom.speed"><input v-else type="number" class="accent-app-blue" min="0" max="2" step="0.1" v-model="mutableConfig.style.chart.zoom.speed">, (default: 1)</span>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)</span>
            <BaseDetails attr="th" :level="2" title="table.th">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
                <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
            </BaseDetails>
            <BaseDetails attr="translations" :level="2" title="table.translations">
                <span>nodeName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.nodeName"><input v-else type="text" v-model="mutableConfig.table.translations.nodeName">, (default: "Node name")</span>
                <span>details: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.details"><input v-else type="text" v-model="mutableConfig.table.translations.details">, (default: "Details")</span>
                <span>ancestor: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.ancestor"><input v-else type="text" v-model="mutableConfig.table.translations.ancestor">, (default: "Parent node")</span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
                <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                <span>labels: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.labels" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.labels" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>tooltip: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.tooltip"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.tooltip">, (default: "Toggle tooltip")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
                <span>labels: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.labels"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.labels">, (default: "Toggle labels")</span>
                <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
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