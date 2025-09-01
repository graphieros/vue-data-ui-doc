<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui";
import ThemesVueUiWordCloud from "../themes/ThemesVueUiWordCloud.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseComment from "../BaseComment.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseViewExampleButton from "../BaseViewExampleButton.vue";
import { shiftHue } from "../maker/lib";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseMigrationInfo from "../BaseMigrationInfo.vue";

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
})

function makeColors({ colorStart, iterations, force }) {
    let color = colorStart;
    const arr = [colorStart];
    for (let i = 0; i < iterations; i += 1) {
        color = shiftHue(color, force);
        arr.push(color)
    }
    return arr;
}

// This could be a textarea
const dataset = ref(createWordCloudDatasetFromPlainText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar pretium venenatis. Donec imperdiet elit id porttitor tristique. Aenean ac commodo justo. Vestibulum placerat molestie nisl, sit amet lacinia nulla posuere quis. Aenean ullamcorper eu ex vitae facilisis. Aliquam erat volutpat. Proin nunc felis, porttitor quis commodo lacinia, gravida sed orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus mattis vitae tellus ac luctus. Vestibulum faucibus sem nec varius eleifend. In gravida venenatis ipsum sit amet ultricies. Nam efficitur, dui ac imperdiet vestibulum, justo metus consectetur libero, posuere tempor neque magna vitae augue. Etiam gravida massa quis turpis vulputate, ac tempus nisi imperdiet. Donec at laoreet ligula. Nulla id ex sagittis, tincidunt lectus ut, gravida mauris. Nulla consectetur semper sem. Maecenas lacinia facilisis ex, lobortis lacinia orci ornare tristique. Nam quis erat a nunc vehicula finibus. Quisque vitae nibh condimentum, condimentum erat eu, finibus risus. Duis sodales orci vel ullamcorper ullamcorper. In hac habitasse platea dictumst. Vivamus tempus ut nulla id commodo. Cras lectus sem, porttitor id sem eu, posuere fringilla turpis. Integer pretium erat sed ipsum gravida ullamcorper. Nam facilisis metus non lorem congue imperdiet. Sed quis cursus eros. Pellentesque venenatis pellentesque turpis suscipit accumsan. Nam arcu quam, faucibus et arcu pretium, eleifend consequat lacus. Aliquam nec risus nec justo maximus ultricies at et velit. Nam at lacinia massa. Sed elit dolor, consequat in massa at, egestas accumsan ex. Aenean quis suscipit ipsum, ac condimentum eros. Sed eleifend nisi arcu, et iaculis mi semper quis. Mauris vel dui nisi. Fusce finibus lacus a tempus tristique. Sed molestie orci a velit facilisis ornare. Pellentesque ullamcorper sed velit ut iaculis. Fusce urna dolor, rutrum sit amet consequat et, vulputate a risus. Sed faucibus sem nec urna lobortis dapibus. Nam in nisl a dui euismod gravida non in erat. Cras lobortis vitae diam sed elementum. Sed cursus tempor enim, nec ornare sem facilisis non. Pellentesque euismod sit amet magna eget tempor. Proin tincidunt dignissim nulla vitae molestie. Proin gravida ac urna ut facilisis. Vestibulum sit amet ex non quam ornare scelerisque. Etiam pharetra magna neque. Cras maximus, ipsum at imperdiet interdum, nibh orci vulputate erat, vitae varius elit lectus sed nibh. Maecenas eget nulla ultricies, pharetra ante non, cursus risus. Mauris nec felis tincidunt, viverra lectus quis, feugiat tortor.`, word => word.toLowerCase()).sort((a, b) => b.value - a.value));

const themes = ref([
    '',
    'zen',
    'hack',
    'concrete'
])

const selectedTheme = ref(themes.value[0]);

const config = ref({
    debug: false,
    loading: false,
    responsive: false,
    theme: "",
    customPalette: makeColors({
        colorStart: '#5f8aee',
        iterations: 200,
        force: 0.0006
    }),
    useCssAnimation: true,
    animationDelayMs: 20,
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
            annotator: true
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
            annotator: "Toggle annotator"
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
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            height: 1000,
            width: 1000,
            zoom: {
                show: true,
            },
            words: {
                maxFontSize: 100,
                minFontSize: 20,
                bold: false,
                proximity: 20,
                packingWeight: 10,
                color: "#2D353C",
                usePalette: true
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
                color: "#1A1A1A",
                backgroundColor: "#F3F4F6",
                fontSize: 14,
                roundingValue: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#e1e5e8",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Word",
            value: "Value"
        },
        th: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none"
        },
        td: {
            backgroundColor: "#F3F4F6",
            color: "#2D353C",
            outline: "none",
            roundingValue: 0,
            prefix: "",
            suffix: ""
        }
    }
})

const darkModeConfig = ref({
    debug: false,
    loading: false,
    responsive: false,
    theme: "",
    customPalette: makeColors({
        colorStart: '#5f8aee',
        iterations: 200,
        force: 0.0006
    }),
    useCssAnimation: true,
    animationDelayMs: 20,
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
            annotator: true
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
            annotator: "Toggle annotator"
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
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            height: 1000,
            width: 1000,
            zoom: {
                show: true,
            },
            words: {
                maxFontSize: 100,
                minFontSize: 20,
                bold: false,
                proximity: 20,
                packingWeight: 10,
                color: "#CCCCCC",
                usePalette: true
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
                roundingValue: 0,
                customFormat: null,
                borderRadius: 4,
                borderColor:"#3A3A3A",
                borderWidth: 1,
                backgroundOpacity: 30,
                position: "center",
                offsetY: 24
            }
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 300,
        columnNames: {
            series: "Word",
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
            outline: "none",
            roundingValue: 0,
            prefix: "",
            suffix: ""
        }
    }
})

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

const dsTypeCode = ref(`type VueUiWordCloudDatasetItem = {
    name: string
    value: number
}`)

const codeDataset1 = ref(`const dataset: VueUiWordCloudDatasetItem[] = [
    { name: 'lorem', value: 100 },
    { name: 'ipsum', value: 65 },
    { name: 'dolor', value: 80 },
    { name: 'sit', value: 86 },
    { name: 'amet', value: 32 },
];`)

const codeDataset2 = computed(() => {
    return `
    // ${translations.value.wordCloud.dataset[store.lang]}
    
    import { createWordCloudDatasetFromPlainText } from "vue-data-ui";

    const plainText = "orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar pretium venenatis. Donec imperdiet elit id porttitor tristique. Aenean ac commodo justo. Vestibulum placerat molestie nisl, sit amet lacinia nulla posuere quis. Aenean ullamcorper eu ex vitae facilisis. Aliquam erat volutpat. Proin nunc felis, porttitor quis commodo lacinia, gravida sed orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus mattis vitae tellus ac luctus. Vestibulum faucibus sem nec varius eleifend. In gravida venenatis ipsum sit amet ultricies.";

    const dataset = createWordCloudDatasetFromPlainText(plainText)
        .sort((a, b) => b.value - a.value);

    // An optional callback can also be passed to the function to format text output:
    const uppercaseDataset = createWordCloudDatasetFromPlainText(plainText, word => word.toUpperCase())
        .sort((a, b) => b.value - a.value);`
})

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiWordCloud" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.wordCloud[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-word-cloud"
            targetMaker="VueUiWordCloud"
            :configSource="mainConfig.vue_ui_word_cloud"
        />

        <div
            :class="`transition-all mx-auto w-1/2`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(isDarkMode ? darkModeConfig : config)"
            >
                <VueDataUi 
                    component="VueUiWordCloud" 
                    :dataset="dataset" 
                    :config="isDarkMode ? {...mutableConfigDarkMode, theme: selectedTheme } : {...mutableConfig, theme: selectedTheme}" 
                    :key="key" 
                />
            </DocSnapper>
        </div>

        <div class="w-full flex justify-center mt-6">
            <BaseViewExampleButton link="/examples/categories#vue-ui-word-cloud"/>
        </div>

        <Rater itemId="vue_ui_word_cloud" />

        <BaseMigrationInfo
            debug 
        />

        <Box showSlots showEmits showThemes showResponsive schema="vue_ui_word_cloud">
            <template #tab0>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">

        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="dsTypeCode"
            :title="translations.docs.datastructure[store.lang]"
            class="my-6"
        />

        <CodeParser
            language="typescript"
            @copy="store.copy()"
            :content="codeDataset1"
            :title="translations.docs.example[store.lang]"
        />   

        <CodeParser
            class="mt-6"
            language="typescript"
            @copy="store.copy()"
            :content="codeDataset2"
        />   
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon />{{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiWordCloudConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiWordCloudConfig" equal>
        <span>responsive: false, <BaseComment>{{ translations.responsive[store.lang] }}</BaseComment></span>
        <BaseAttr inactive name="debug" defaultVal="false"/>
        <BaseAttr name="loading" attr="loading" type="checkbox" defaultVal="false"  :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
        <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
        <BaseAttr name="useCssAnimation" attr="useCssAnimation" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="events" :level="1">
            <BaseAttr inactive name="datapointEnter" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})" />
            <BaseAttr inactive name="datapointLeave" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
            <BaseAttr inactive name="datapointClick" defaultVal="null" comment="({datapoint, seriesIndex} => { console.log(datapoint)})"/>
        </BaseDetails>
        <BaseAttr name="animationDelayMs" attr="animationDelayMs" type="range" defaultVal="20" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseDetails attr="style" :level="1">
            <span>fontFamily: "inherit",</span>
            <BaseDetails attr="chart" :level="2" title="style.chart">
                <BaseAttr name="backgroundColor" attr="style.chart.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="color" attr="style.chart.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="height" attr="style.chart.height" type="number" defaultVal="300" :min="300" :max="2000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="width" attr="style.chart.width" type="number" defaultVal="512" :min="300" :max="2000" :step="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseDetails attr="zoom" :level="3" title="style.chart.zoom">
                    <BaseAttr name="show" attr="style.chart.zoom.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
                <BaseDetails attr="words" :level="3" title="style.chart.words">
                    <BaseAttr name="maxFontSize" attr="style.chart.words.maxFontSize" type="number" defaultVal="100" :min="20" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="minFontSize" attr="style.chart.words.minFontSize" type="number" defaultVal="10" :min="10" :max="200" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="proximity" attr="style.chart.words.proximity" type="number" defaultVal="10" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="packingWeight" attr="style.chart.words.packingWeight" type="number" defaultVal="1" :min="0" :max="20" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="color" attr="style.chart.words.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="bold" attr="style.chart.words.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="usePalette" attr="style.chart.words.usePalette" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                </BaseDetails>
                <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
                    <BaseAttr name="show" attr="style.chart.tooltip.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="backgroundColor" attr="style.chart.tooltip.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="color" attr="style.chart.tooltip.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="fontSize" attr="style.chart.tooltip.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="roundingValue" attr="style.chart.tooltip.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <span>customFormat: null, <span class="text-gray-600 dark:text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
                    <BaseAttr name="borderRadius" attr="style.chart.tooltip.borderRadius" type="number" defaultVal="4" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderColor" attr="style.chart.tooltip.borderColor" type="color" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="borderWidth" attr="style.chart.tooltip.borderWidth" type="number" defaultVal="1" :min="0" :max="24" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="backgroundOpacity" attr="style.chart.tooltip.backgroundOpacity" type="number" defaultVal="100" :min="0" :max="100" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                    <BaseAttr name="position" attr="style.chart.tooltip.position" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                    <BaseAttr name="offsetY" attr="style.chart.tooltip.offsetY" type="number" defaultVal="24" :min="-50" :max="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                </BaseDetails>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="show" attr="table.show" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" defaultVal="400" :min="300" :max="800" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseDetails attr="columnNames" :level="2" title="table.columnNames">
                <BaseAttr name="series" attr="table.columnNames.series" type="text" defaultVal="Word" :light="mutableConfig" :dark="mutableConfigDarkMode" />
                <BaseAttr name="value" attr="table.columnNames.value" type="text" defaultVal="Value" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            </BaseDetails>
            <BaseDetails attr="th" :level="2" title="table.th">
                <BaseAttr name="backgroundColor" attr="table.th.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.th.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.th.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="td" :level="2" title="table.td">
                <BaseAttr name="backgroundColor" attr="table.td.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="color" attr="table.td.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="outline" attr="table.td.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="roundingValue" attr="table.td.roundingValue" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="prefix" attr="table.td.prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="suffix" attr="table.td.suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" />
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="tooltip" attr="userOptions.buttons.tooltip" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="table" attr="userOptions.buttons.table" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
                <BaseAttr name="annotator" attr="userOptions.buttons.annotator" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="tooltip" attr="userOptions.buttonTitles.tooltip" type="text" defaultVal="Toggle tooltip" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="table" attr="userOptions.buttonTitles.table" type="text" defaultVal="Toggle table" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
                <BaseAttr name="annotator" attr="userOptions.buttonTitles.annotator" type="text" defaultVal="Toggle annotator" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()" />
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

            const wordCloudData = ref(null);
            const wordCloudDataset = ref([]);

            onMounted(async () => {
                wordCloudDataset.value = await wordCloudData.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWordCloud
                ref="wordCloudData"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWordCloud
                ref="wordCloudData"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        wordCloudDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                async mounted () {
                    this.wordCloudDataset = await this.$refs.wordCloudData.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                <ExposedMethods
                    component="VueUiWordCloud"
                    getImage
                    :names="[
                        'generatePdf',
                        'generateCsv',
                        'generateImage',
                        'toggleTable'
                    ]"
                />
                </div>
            </template>

            <template #tab3>
                <BaseSlotDocumenter
                    componentName="VueUiWordCloud"
                    :types="[
                        'svg',
                        'reset-action',
                        'watermark',
                        'source',
                        'chart-background'
                    ]" 
                />
            </template>

            <template #tab6>
                <ThemesVueUiWordCloud />
            </template>

            <template #tab7>
                <ResponsiveUnit>
                    <template #chart>
                        <VueDataUi 
                            component="VueUiWordCloud" 
                            :dataset="dataset"
                            :config="
                                isDarkMode ? {
                                    ...mutableConfigDarkMode, 
                                    theme: selectedTheme,
                                    responsive: true
                                    } 
                                    : {
                                        ...mutableConfig, 
                                        theme: selectedTheme,
                                        responsive: true
                                    }" 
                            :key="key" 
                        />
                    </template>
                </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>