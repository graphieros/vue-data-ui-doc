<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiFlow from "../themes/ThemesVueUiFlow.vue";
import BaseDocActions from "./BaseDocActions.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
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
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
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
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            table: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            table: "Toggle table",
            fullscreen: "Toggle fullscreen",
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
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartFlow" stroke="#42d392" :strokeWidth="1.5" />
            VueUiFlow
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.flow[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
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
            <Suspense>
                <template #default>
                    <VueDataUi component="VueUiFlow" :dataset="dataset"
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key" />
                </template>
                <template #fallback>
                    <div class="min-h-[400px]"></div>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
            targetLink="vue-ui-flow"
            targetMaker="VueUiFlow"
            :configSource="mainConfig.vue_ui_flow"
        />

        <Box showSlots showThemes showEmits schema="vue_ui_flow">
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
                <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")</span>
                <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
                <BaseDetails attr="links" :level="3" title="style.chart.links">
                    <span>width: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.links.width" :min="100" :max="300" :step="10"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.links.width" :min="100" :max="300" :step="10"/>, (default: 200)</span>
                    <span>opacity:<BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.links.opacity" :min="0" :max="1" :step="0.01"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.links.opacity" :min="0" :max="1" :step="0.01"/>, (default: 0.8)</span>
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.links.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.links.stroke">, (default: "#FFFFFF")</span>
                    <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.links.strokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.links.strokeWidth" :min="0" :max="12"/>, (default: 1)</span>
                </BaseDetails>
                <BaseDetails attr="nodes" :level="3" title="style.chart.nodes">
                    <span>gap: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.gap" :min="0" :max="40"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.gap" :min="0" :max="40"/>, (default: 10)</span>
                    <span>minHeight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.minHeight" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.minHeight" :min="0" :max="100"/>, (default: 20)</span>
                    <span>width: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.width" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.width" :min="0" :max="100"/>, (default: 40)</span>
                    <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.nodes.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.nodes.stroke">, (default: "#FFFFFF")</span>
                    <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.strokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.strokeWidth" :min="0" :max="12"/>, (default: 1)</span>
                    <BaseDetails attr="labels" :level="4" title="style.chart.nodes.labels">
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.labels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.labels.fontSize" :min="8" :max="42"/>, (default: 14)</span>
                        <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.nodes.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.nodes.labels.prefix">, (default: "")</span>
                        <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.nodes.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.nodes.labels.suffix">, (default: "")</span>
                        <span>rounding: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.labels.rounding" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.labels.rounding" :min="0" :max="6"/>, (default: 0)</span>
                        <BaseDetails attr="abbreviation" :level="5" title="style.chart.nodes.labels.abbreviation">
                            <span>use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.nodes.labels.abbreviation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.nodes.labels.abbreviation.use" @change="forceChartUpdate()">, (default: true)</span>
                            <span>length: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.nodes.labels.abbreviation.length" :min="1" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.nodes.labels.abbreviation.length" :min="1" :max="12"/>, (default: 3)</span>
                        </BaseDetails>
                    </BaseDetails>
                </BaseDetails>
                <BaseDetails attr="padding" :level="3" title="style.chart.padding">
                    <span>top: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.top" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.top" :min="0" :max="100"/>, (default: 0)</span>
                    <span>right: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.right" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.right" :min="0" :max="100"/>, (default: 24)</span>
                    <span>bottom: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.bottom" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.bottom" :min="0" :max="100"/>, (default: 0)</span>
                    <span>left: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.padding.left" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.padding.left" :min="0" :max="100"/>, (default: 24)</span>
                </BaseDetails>
                <BaseDetails attr="title" :level="3" title="style.chart.title">
                    <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
                    <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
                    <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
                    <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
                    <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
                        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")</span>
                        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
                        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
                        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
                    </BaseDetails>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
            <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <span>source: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.source"><input v-else type="text" v-model="mutableConfig.table.columnNames.source">, (default: "Source"),</span>
                <span>target: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.target"><input v-else type="text" v-model="mutableConfig.table.columnNames.target">, (default: "Target")</span>
                <span>value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.columnNames.value"><input v-else type="text" v-model="mutableConfig.table.columnNames.value">, (default: "Value")</span>
            </BaseDetails>
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
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <span> pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
                <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
                <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
                <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
                <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
                <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
                <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
                <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
                <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
                <span>table: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.table"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.table">, (default: "Toggle table")</span>
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
                <div class="text-gray-500">
    {{ translations.slots.presentation[store.lang]  }}
</div>
<pre>
<code>
    &lt;VueUiFlow
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiFlow&gt;
</code>
</pre>
            </template>

            <!-- THEMES -->
            <template #tab6>
                <ThemesVueUiFlow/>
            </template>
        </Box>
    </div>
</template>