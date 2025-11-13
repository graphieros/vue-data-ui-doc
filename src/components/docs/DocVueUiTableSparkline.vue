<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import BaseSlotDocumenter from "../BaseSlotDocumenter.vue";
import ExposedMethods from "../ExposedMethods.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import UserOptionCallbacks from "../UserOptionCallbacks.vue";
import { useRouter } from "vue-router";
import BaseTabLink from "../BaseTabLink.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const mainConfig = useConfig()

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);


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
        name: "Serie 1",
        values: [0, 1, 2, 3, 5, 8],
        color: "#5f8bee",
    },
    {
        name: "Serie 2",
        values: [8, 12, 13, 25, 31, 42],
        color: "#42d392",
    },
    {
        name: "Serie 3",
        values: [66, 22, 33, 12, 55, 64],
        color: "#ff6400",
    },
    {
        name: "Serie 4",
        values: [54, 44, 34, 12, 32, 26],
        color: "#f7e97c"
    },
    {
        name: "Serie 5",
        values: [12, 14, 18, 25, 32, 64],
        color: "#42e9f5"
    },
])

const config = ref({
  responsiveBreakpoint: 500,
  showAverage: true,
  showMedian: true,
  showTotal: true,
  roundingAverage: 0,
  roundingMedian: 0,
  roundingValues: 0,
  roundingTotal: 0,
  showSparklines: true,
  fontFamily: "inherit",
  colNames: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  prefix: '',
  suffix: '',
  formatter: null,
  sortedDataColumnIndices: [0,1,2,3,4,5],
  sortedSeriesName: true,
  sortedSum: true,
  sortedAverage: true,
  sortedMedian: true,
  resetSortOnClickOutside: true,
  sparkline: {
    useGradient: true,
    showArea: true,
    strokeWidth: 3,
    type: "line",
    smooth: true,
    dimensions: {
      width: 150,
      heightRatio: 1,
    },
    animation: {
      show: true,
      animationFrames: 360
    }
  },
  translations: {
    serie: "Serie",
    total: "Total",
    average: "Average",
    median: "Median",
    chart: "Evolution"
  },
  title: {
    backgroundColor: "#F3F4F6",
    text: "Title",
    fontSize: 18,
    color: "#2D353C",
    bold: true,
    textAlign: "center",
    subtitle: {
      text: "Subtitle",
      color: "#2D353C",
      fontSize: 14,
      bold: false
    }
  },
  thead: {
    backgroundColor: "#F3F4F6",
    color: "#2D353C",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false,
    showColorMarker: true
  },
  tbody: {
    backgroundColor: "#F3F4F6",
    color: "#2D353C",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false,
    selectedColor: {
      useSerieColor: true,
      fallback: "#2D353C05"
    }
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    buttons: {
            pdf: true,
            img: true,
            csv: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
  }
})

const darkModeConfig = ref({
  responsiveBreakpoint: 500,
  showAverage: true,
  showMedian: true,
  showTotal: true,
  roundingAverage: 0,
  roundingMedian: 0,
  roundingValues: 0,
  roundingTotal: 0,
  showSparklines: true,
  fontFamily: "inherit",
  colNames: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  prefix: '',
  suffix: '',
  formater: null,
  sortedDataColumnIndices: [0,1,2,3,4,5],
  sortedSeriesName: true,
  sortedSum: true,
  sortedAverage: true,
  sortedMedian: true,
  resetSortOnClickOutside: true,
  sparkline: {
    useGradient: true,
    showArea: true,
    strokeWidth: 3,
    type: "line",
    smooth: true,
    dimensions: {
      width: 150,
      heightRatio: 1,
    },
    animation: {
      show: true,
      animationFrames: 360
    }
  },
  translations: {
    serie: "Serie",
    total: "Total",
    average: "Average",
    median: "Median",
    chart: "Evolution"
  },
  title: {
    backgroundColor: "#2A2A2A",
    text: "Title",
    fontSize: 18,
    color: "#CCCCCC",
    bold: true,
    textAlign: "center",
    subtitle: {
      text: "Subtitle",
      color: "#CCCCCC",
      fontSize: 14,
      bold: false
    }
  },
  thead: {
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false
  },
  tbody: {
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false,
    showColorMarker: true,
    selectedColor: {
      useSerieColor: true,
      fallback: "#FFFFFF10"
    }
  },
  userOptions: {
    show: true,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    buttons: {
            pdf: true,
            img: true,
            csv: true,
            fullscreen: true
        },
        buttonTitles: {
            open: "Open options",
            close: "Close options",
            pdf: "Download PDF",
            csv: "Download CSV",
            img: "Download PNG",
            fullscreen: "Toggle fullscreen",
        },
        print: {
            scale: 2,
            orientation: 'auto',
            overflowTolerance: 0.2
        },
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
} 

const { configCode, showAllConfig } = useConfigCode()

const dsTypeCode = computed(() => {
  return `type VueUiTableSparklineDatasetItem = {
  name: string
  values: number[]
  color?: string
}`
})

const codeDataset = ref(`const dataset: VueUiTableSparklineDatasetItem[] = [
  {
    name: "Serie 1",
    values: [0, 1, 2, 3, 5, 8],
    color: "#5f8bee",
  },
  {
    name: "Serie 2",
    values: [8, 12, 13, 25, 31, 42],
    color: "#42d392",
  },
  {
    name: "Serie 3",
    values: [66, 22, 33, 12, 55, 64],
    color: "#ff6400",
  },
  {
    name: "Serie 4",
    values: [54, 44, 34, 12, 32, 26],
    color: "#f7e97c"
  },
  {
    name: "Serie 5",
    values: [12, 14, 18, 25, 32, 64],
    color: "#42e9f5"
  },
];`)

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
    <div class="overflow-x-auto">
      <BaseDocTitle name="VueUiTableSparkline" />

      <BaseDocDescription :text="translations.docs.tooltips.sparklineTable[store.lang]" />

        <BaseDocHeaderActions
          targetLink="vue-ui-table-sparkline"
          :configSource="mainConfig.vue_ui_table_sparkline"
        />

        <div :class="`transition-all mx-auto no-style ${isFixed ? 'fixed bottom-16 w-[300px] max-h-[500px] left-0 z-50 border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[1200px]'}`">
            <Suspense>
              <template #default>
                <BaseCard>
                  <VueUiTableSparkline :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
                </BaseCard>
              </template>
              <template #fallback>
                  <BaseSpinner/>
              </template>
            </Suspense>
        </div>

        <Rater itemId="vue_ui_table_sparkline" />

        <Box ref="box" showEmits showSlots showCallbacks signInfo="both">
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
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/>{{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiTableSparklineConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiTableSparklineConfig" equal>
    <span>theme: "", <BaseComment>"celebration" | "celebrationNight" | "zen" | "hack" | "concrete" | ""</BaseComment></span>
    <span>colNames: [], <BaseComment>{{ translations.docs.example[store.lang] }} : ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE"]</BaseComment></span>
    <span>customPalette: [], <BaseComment>string[]</BaseComment></span>
    <span>fontFamily: "inherit",</span>
    <BaseAttr name="responsiveBreakpoint" attr="responsiveBreakpoint" type="number" defaultVal="500" :min="300" :max="800" :step="50" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="roundingAverage" attr="roundingAverage" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="roundingMedian" attr="roundingMedian" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="roundingTotal" attr="roundingTotal" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="roundingValues" attr="roundingValues" type="number" defaultVal="0" :min="0" :max="6" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="showAverage" attr="showAverage" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseAttr name="showMedian" attr="showMedian" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseAttr name="showSparklines" attr="showSparklines" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseAttr name="showTotal" attr="showTotal" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
    <BaseAttr name="prefix" attr="prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="suffix" attr="suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>sortedDataColumnIndices: number[], <BaseComment>Since v2.4.49 Include data column indices to enable sorting functionality</BaseComment></span>
    <BaseAttr name="sortedSeriesName" attr="sortedSeriesName" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.49"/>
    <BaseAttr name="sortedSum" attr="sortedSum" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.49"/>
    <BaseAttr name="sortedAverage" attr="sortedAverage" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.49"/>
    <BaseAttr name="sortedMedian" attr="sortedMedian" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.49"/>
    <BaseAttr name="resetSortOnClickOutside" attr="resetSortOnClickOutside" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" comment="Since v2.4.49"/>
    <div class="flex flex-row gap-2 place-items-center">
        <BaseAttr inactive name="formatter" defaultVal="null" :comment="translations.formatterLink[store.lang]"/>
        <div class="min-w-[200px]">
            <BaseTabLink :action="() => goToPage('/customization#formatter')" icon="cursor">
                Go to page
            </BaseTabLink>
        </div>
    </div>
    <BaseDetails attr="sparkline" :level="1">
      <BaseAttr name="useGradient" attr="sparkline.useGradient" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="showArea" attr="sparkline.showArea" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="strokeWidth" attr="sparkline.strokeWidth"  type="number" defaultVal="3" :min="1" :max="12" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="type" attr="sparkline.type" type="select" defaultVal="line" :options="['line', 'bar']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="smooth" attr="sparkline.smooth" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="dimensions" :level="2" title="sparkline.dimensions">
        <BaseAttr name="width" attr="sparkline.dimensions.width" type="number" defaultVal="150" :min="100" :max="300" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="heightRatio" attr="sparkline.dimensions.heightRatio" type="range" defaultVal="1" :min="0.5" :max="2" :step="0.01" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="animation" :level="2" title="sparkline.animation">
        <BaseAttr name="show" attr="sparkline.animation.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
        <BaseAttr name="animationFrames" attr="sparkline.animation.animationFrames" type="number" defaultVal="360" :min="60" :max="600" :step="20" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="tbody" :level="1">
      <BaseAttr name="backgroundColor" attr="tbody.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="color" attr="tbody.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="fontSize" attr="tbody.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="outline" attr="tbody.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="textAlign" attr="tbody.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" />
      <BaseAttr name="bold" attr="tbody.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="showColorMarker" attr="tbody.showColorMarker" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="selectedColor" :level="2" title="tbody.selectedColor">
        <BaseAttr name="useSerieColor" attr="tbody.selectedColor.useSerieColor" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fallback" attr="tbody.selectedColor.fallback" type="text" defaultVal="#E1E5E8" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="thead" :level="1">
      <BaseAttr name="backgroundColor" attr="thead.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
      <BaseAttr name="color" attr="thead.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/> 
      <BaseAttr name="fontSize" attr="thead.fontSize" type="number" defaultVal="14" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="outline" attr="thead.outline" type="text" defaultVal="none" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="textAlign" attr="thead.textAlign" type="select" defaultVal="left" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="bold" attr="thead.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    </BaseDetails>
    <BaseDetails attr="title" :level="1">
      <BaseAttr name="backgroundColor" attr="title.backgroundColor" type="color" defaultVal="#FFFFFF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="color" attr="title.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="text" attr="title.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="fontSize" attr="title.fontSize" type="number" defaultVal="20" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="bold" attr="title.bold" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="textAlign" attr="title.textAlign" type="select" defaultVal="center" :options="['left', 'center', 'right']" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseDetails attr="subtitle" :level="2" title="title.subtitle">
        <BaseAttr name="text" attr="title.subtitle.text" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="color" attr="title.subtitle.color" type="color" defaultVal="#2D353C" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fontSize" attr="title.subtitle.fontSize" type="number" defaultVal="16" :min="8" :max="42" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="bold" attr="title.subtitle.bold" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <BaseAttr name="serie" attr="translations.serie" type="text" defaultVal="Serie" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="total" attr="translations.total" type="text" defaultVal="Total" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="average" attr="translations.average" type="text" defaultVal="Average" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="median" attr="translations.median" type="text" defaultVal="Median" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="chart" attr="translations.chart" type="text" defaultVal="Evolution" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <BaseAttr name="show" attr="userOptions.show" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      <BaseAttr name="showOnChartHover" attr="userOptions.showOnChartHover" type="checkbox" defaultVal="false" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseAttr name="keepStateOnChartLeave" attr="userOptions.keepStateOnChartLeave" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode" @change="forceChartUpdate()"/>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <BaseAttr name="pdf" attr="userOptions.buttons.pdf" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="img" attr="userOptions.buttons.img" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="csv" attr="userOptions.buttons.csv" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttons.fullscreen" type="checkbox" defaultVal="true" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <BaseAttr name="open" attr="userOptions.buttonTitles.open" type="text" defaultVal="Open options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="close" attr="userOptions.buttonTitles.close" type="text" defaultVal="Close options" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="pdf" attr="userOptions.buttonTitles.pdf" type="text" defaultVal="Download PDF" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="csv" attr="userOptions.buttonTitles.csv" type="text" defaultVal="Download CSV" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="img" attr="userOptions.buttonTitles.img" type="text" defaultVal="Download PNG" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
        <BaseAttr name="fullscreen" attr="userOptions.buttonTitles.fullscreen" type="text" defaultVal="Toggle fullscreen" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
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
  </BaseDetails>
</code>
              
          </template>
          <template #tab2>
            <ExposedMethods
              component="VueUiTableSparkline"
              :names="[
                'generatePdf',
                'generateCsv',
                'generateImage',
                'generateSvg',
              ]"
            />
          </template>

          <template #tab3>
            <BaseSlotDocumenter
                    componentName="VueUiTableSparkline"
                    :types="[
                        'source',
                        'user-menu',
                    ]" 
                />
          </template>

          <template #tab11>
            <UserOptionCallbacks
                :items="[
                    'csv',
                    'fullscreen',
                    'img',
                    'pdf',
                ]"
            />
        </template>
        </Box>
    </div>
</template>