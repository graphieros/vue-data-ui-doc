<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiFlow from "../themes/ThemesVueUiFlow.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
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
    ['A1', 'B1', 10],
    ['A1', 'B2', 10],
    ['B1', 'C1', 5],
    ['B1', 'C2', 5],
    ['B1', 'C3', 5],
    ['B1', 'C4', 5],
    ['A2', 'B1', 10],
    ['B2', 'C5', 10],
    ['C3', 'D1', 2],
    ['C4', 'D1', 2],
    ['C5', 'D1', 2],
    ['C2', 'D2', 2],
    ['C3', 'D2', 1],
]);

const config = ref({
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            padding: {
                top: 0,
                left: 24,
                right: 24,
                bottom: 0
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
            nodes: {
                gap: 10,
                minHeight: 20,
                width: 40,
                labels: {
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
                width: 200,
                opacity: 0.8,
                stroke: "#FFFFFF",
                strokeWidth: 1
            }
        }
    },
    table: {
        show: false,
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
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true,
            annotator: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
            annotator: "Toggle annotator"
        }
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            padding: {
                top: 0,
                left: 24,
                right: 24,
                bottom: 0
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
            nodes: {
                gap: 10,
                minHeight: 20,
                width: 40,
                labels: {
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
                width: 200,
                opacity: 0.8,
                stroke: "#1A1A1A",
                strokeWidth: 1
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        columnNames: {
            source: "Source",
            target: "Target",
            value: "Value"
        },
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "none"
        },
        td: {
            backgroundColor: "#1A1A1A",
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

</script>

<template>
    <div>
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartFlow" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Flow</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.flow[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-flow"
            targetMaker="VueUiFlow"
            :configSource="mainConfig.vue_ui_flow"
        />

        <div
            :class="`transition-all mx-auto w-1/2`">
            <Teleport to="#docSnap" :disabled="!isFixed || isMobile">
                <template v-if="!isMobile">
                    <button @click="fixChart"
                        class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <PinnedOffIcon v-if="isFixed" />
                        <div v-else class="relative overflow-visible">
                            <PinIcon class="peer overflow-visible" />
                            <div
                                class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                                {{ hintPin[store.lang] }}
                            </div>
                        </div>
                    </button>
                    <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                        <button @click="resetDefault"
                            class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                        translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                            class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                            <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                        </button>
                    </div>
                </template>
                <Suspense>
                    <template #default>
                        <VueDataUi component="VueUiFlow" :dataset="dataset"
                            :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                    </template>
                    <template #fallback>
                        <BaseSpinner/>
                    </template>
                </Suspense>
            </Teleport>
        </div>

        <Box showSlots showThemes showEmits schema="vue_ui_flow" signInfo="positiveOnly">
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div>
                    TS type: <code class="text-app-green">VueUiFlowDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700 mt-4">
<pre>
<code>
    [
        [ string, string, number ],
        [...]
    ]
</code>
</pre>
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiFlowDatasetItem[]</span> = [
    ['A1', 'B1', 10],
    ['A1', 'B2', 10],
    ['B1', 'C1', 5],
    ['B1', 'C2', 5],
    ['B1', 'C3', 5],
    ['B1', 'C4', 5],
    ['A2', 'B1', 10],
    ['B2', 'C5', 10],
    ['C3', 'D1', 2],
    ['C4', 'D1', 2],
    ['C5', 'D1', 2],
    ['C2', 'D2', 2],
    ['C3', 'D2', 1],
]
</code>
</pre>                    
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

<code ref="configCode">
    <BaseDetails attr="const config: VueUiFlowConfig" equal>
        <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
        <span>customPalette: []; // string[]</span>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseDetails attr="links" :level="3" title="style.chart.links">
                    <BaseAttr name="width" attr="style.chart.links.width" type="number" defaultVal="200" :min="100" :max="300" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                    <BaseAttr name="opacity" attr="style.chart.links.opacity" type="range" defaultVal="0.8" :min="0.1" :max="1" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="stroke" attr="style.chart.links.stroke" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="strokeWidth" attr="style.chart.links.strokeWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
                <BaseDetails attr="nodes" :level="3" title="style.chart.nodes">
                    <BaseAttr name="gap" attr="style.chart.nodes.gap" type="number" defaultVal="10" :min="0" :max="40" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="minHeight" attr="style.chart.nodes.minHeight" type="number" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <BaseAttr name="top" attr="style.chart.padding.top" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="right" attr="style.chart.padding.right" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="bottom" attr="style.chart.padding.bottom" type="number" defaultVal="0" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="left" attr="style.chart.padding.left" type="number" defaultVal="24" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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

            onMounted(() => {
                flowDataset.value = flowChart.value.getData();
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
                mounted () {
                    this.flowDataset = this.$refs.flowChart.getData();
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
                </div>
            </template>

            <!-- SLOTS -->
            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiFlow"
                    :types="[
                        'svg',
                        'watermark',
                        'source'
                    ]" 
                />
            </template>

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiFlow/>
            </template>
        </Box>
    </div>
</template>