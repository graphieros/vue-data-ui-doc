<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon, InfoTriangleFilledIcon  } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    }
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Serie 1",
        values: [20, 30, 40, 50, 40, 30, 20,],
        color: '#1f77b4',
        shape: 'circle'
    },
    {
        name: "Serie 2",
        values: [30, 40, 50, 60, 50, 40, 30,],
        color: '#aec7e8',
        shape: 'triangle'
    },
    {
        name: "Serie 3",
        values: [40, 50, 60, 70, 60, 50, 40,],
        color: '#ff7f0e',
        shape: 'diamond'
    },
    {
        name: "Serie 4",
        values: [50, 60, 70, 80, 70, 60, 50,],
        color: '#ffbb78',
        shape: 'hexagon'
    },
    {
        name: "Serie 5",
        values: [60, 70, 80, 90, 80, 70, 60,],
        color: '#2ca02c',
        shape: 'star'
    },
]);

const config = ref({
    style: {
        backgroundColor: "#F3F4F6",
        color: "#2D353C",
        fontFamily: "inherit",
        shapeSize: 14,
        heatmapColors: {
            useIndividualScale: false,
            min: "#FFFFFF",
            max: "#5f8bee",
        },
    },
    table: {
        responsiveBreakpoint: 400,
        borderWidth: 1,
        showSum: true,
        showAverage: true,
        showMedian: true,
        head: {
            backgroundColor: "#F3F4F6",
            values: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "TOTAL", "AVG", "MED"],
        },
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            fullscreen: true
        },
        buttonTitles: {
            open: 'Open options',
            close: 'Close options',
            pdf: 'Download PDF',
            csv: 'Download CSV',
            img: 'Download PNG',
            fullscreen: 'Toggle fullscreen'
        },
        print: {
            scale: 2,
        },
    },
});

const darkModeConfig = ref({
    style: {
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontFamily: "inherit",
        shapeSize: 14,
        heatmapColors: {
            useIndividualScale: false,
            min: "#FFFFFF",
            max: "#5f8bee",
        },
    },
    table: {
        responsiveBreakpoint: 400,
        borderWidth: 1,
        showSum: true,
        showAverage: true,
        showMedian: true,
        head: {
            backgroundColor: "#1A1A1A",
            values: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "TOTAL", "AVG", "MED"],
        },
    },
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'left',
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            fullscreen: true
        },
        buttonTitles: {
            open: 'Open options',
            close: 'Close options',
            pdf: 'Download PDF',
            csv: 'Download CSV',
            img: 'Download PNG',
            fullscreen: 'Toggle fullscreen'
        },
        print: {
            scale: 2,
        },
    },
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

const dsTypeCode = computed(() => {
    return `type VueUiTableHeatmapDatasetItem = {
    name: string
    values: (number | string)[]
    color?: string
    shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star"
}`
})

const codeDataset = ref(`const dataset: VueUiTableHeatmapDatasetItem[] = [
    {
        name: "Serie 1",
        values: [20, 30, 40, 50, 40, 30, 20,],
        color: '#1f77b4',
        shape: 'circle'
    },
    {
        name: "Serie 2",
        values: [30, 40, 50, 60, 50, 40, 30,],
        color: '#aec7e8',
        shape: 'triangle'
    },
    {
        name: "Serie 3",
        values: [40, 50, 60, 70, 60, 50, 40,],
        color: '#ff7f0e',
        shape: 'diamond'
    },
    {
        name: "Serie 4",
        values: [50, 60, 70, 80, 70, 60, 50,],
        color: '#ffbb78',
        shape: 'hexagon'
    },
    {
        name: "Serie 5",
        values: [60, 70, 80, 90, 80, 70, 60,],
        color: '#2ca02c',
        shape: 'star'
    },
];`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiTableHeatmap" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.tableHeatmap[store.lang] }}
        </p>

        <BaseDocHeaderActions
            targetLink="vue-ui-table-heatmap"
            :configSource="mainConfig.vue_ui_table_heatmap"
        />

        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] max-h-[500px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[1200px]'}`">

            <Suspense>
                <template #default>
                    <VueDataUi component="VueUiTableHeatmap" :dataset="dataset"
                        :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                        <template #caption>
                            <div style="width: 100%; height: 40px" class="pb-8 font-black text-2xl text-left pl-2">
                                TITLE
                            </div>
                        </template>
        
                        <template #head="{ value, rowIndex, type }">
                            <div class="text-black dark:text-gray-300">
                                {{ value }}
                            </div>
                        </template>
        
                        <template #rowTitle="{ value, rowIndex, colIndex, type, isResponsive }">
                            <div :style="`height: 40px; display: flex; align-items:center; justify-content: flex-start; padding: 0 6px;font-weight:${isResponsive ? 'bold' : 'normal'}`"
                                class="bg-gray-200 dark:bg-[#2A2A2A] w-full">
                                {{ value }}
                            </div>
                        </template>
                        <template #cell="{ value, rowIndex, colIndex, type, color, textColor }">
                            <div :style="`height: 40px; display: flex; align-items:center; justify-content: flex-end; padding: 0 6px;background:${color};color:${textColor}`"
                                class="relative">
                                {{ value }}
                            </div>
                        </template>
                        <template #sum="{ value }">
                            <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                                class="bg-gray-200 dark:bg-[#2A2A2A]">
                                {{ value }}
                            </div>
                        </template>
                        <template #average="{ value }">
                            <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                                class="bg-gray-200 dark:bg-[#2A2A2A]">
                                {{ value.toFixed(1) }}
                            </div>
                        </template>
                        <template #median="{ value }">
                            <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                                class="bg-gray-200 dark:bg-[#2A2A2A]">
                                {{ value.toFixed(1) }}
                            </div>
                        </template>
                    </VueDataUi>
                </template>

                <template #fallback>
                    <BaseSpinner/>
                </template>
            </Suspense>
        </div>

        <Rater itemId="vue_ui_table_heatmap" />

        <Box showSlots signInfo="both">
            <template #warning>
                <InfoTriangleFilledIcon/>
                {{ translations.slots.warning[store.lang] }}
            </template>
            <template #tab0>
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

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiTableHeatmapConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
    <BaseDetails attr="const config: VueUiTableHeatmapConfig" equal>
        <BaseDetails attr="style" :level="1">
            <BaseAttr name="backgroundColor" attr="style.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="color" attr="style.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <span>fontFamily: "inherit",</span>
            <BaseAttr name="shapeSize" attr="style.shapeSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="heatmapColors" :level="2" title="style.heatmapColors">
                <BaseAttr name="useIndividualScale" attr="style.heatmapColors.useIndividualScale" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="min" attr="style.heatmapColors.min" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="max" attr="style.heatmapColors.max" type="color" defaultVal="#5F8BEE" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="table" :level="1">
            <BaseAttr name="responsiveBreakpoint" attr="table.responsiveBreakpoint" type="number" defaultVal="400" :min="300" :max="800" :step="10" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="borderWidth" attr="table.borderWidth" type="number" defaultVal="1" :min="0" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showSum" attr="table.showSum" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showAverage" attr="table.showAverage" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showMedian" attr="table.showMedian" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="head" :level="2" title="table.head">
                <BaseAttr name="backgroundColor" attr="table.head.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <span>values: [], <BaseComment>String[]</BaseComment></span>
            </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="userOptions" :level="1">
            <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
            <BaseAttr name="position" attr="userOptions.position" type="select" defaultVal="right" :options="['right', 'left']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
                <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultval="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultval="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultval="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultval="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
                <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
                <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
            </BaseDetails>
            <BaseDetails attr="print" :level="2" title="userOptions.print">
                <BaseAttr name="scale" attr="userOptions.print.scale" type="number" :min="1" :max="5" defaultVal="2" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Set print quality (higher = larger file)"/>
            </BaseDetails>
        </BaseDetails>
    </BaseDetails>
</code>
            </template>

            <template #tab3>
                <ul class="mb-6">
                    <li>#caption</li>
                    <li>#rowTitle</li>
                    <li>#cell</li>
                    <li>#sum</li>
                    <li>#average</li>
                    <li>#median</li>
                </ul>
                <code class="dark:text-gray-400">
                    &lt;VueUiTableHeatmap<br>
                    &nbsp;&nbsp;:dataset="dataset"<br>
                    &nbsp;&nbsp;:config="config"<br>
                    &gt;<br>

                    &nbsp;&nbsp;&lt;template #caption&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;TITLE&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #head="{ value, rowIndex, type }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #rowTitle="{ value, rowIndex, colIndex, type, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #cell="{ value, rowIndex, colIndex, type, color, textColor, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #sum="{ value, rowIndex, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #average="{ value, rowIndex, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #median="{ value, rowIndex, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>
                    &lt;/VueUiTableHeatmap&gt;
                </code>

                <div class="text-gray-500 mt-6">
    {{ translations.slots.source[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiTableHeatmap
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #source&gt;
            &lt;div&gt;Source: Lorem ipsum...&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiXy&gt;
</code>
</pre>
            </template>
        </Box>
    </div>
</template>
