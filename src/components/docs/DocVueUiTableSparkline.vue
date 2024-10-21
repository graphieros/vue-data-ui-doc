<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseNumberInput from "../BaseNumberInput.vue";
import BaseDetails from "../BaseDetails.vue";
import BaseSpinner from "../BaseSpinner.vue";
import BaseDocActions from "./BaseDocActions.vue";
import BaseAttr from "../BaseAttr.vue";
import BaseComment from "../BaseComment.vue";

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
  sparkline: {
    useGradient: true,
    showArea: true,
    strokeWidth: 3,
    type: "line",
    smooth: true,
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
    bold: false
  },
  tbody: {
    backgroundColor: "#F3F4F6",
    color: "#2D353C",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false
  },
  userOptions: {
    show: true,
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
        }
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
  sparkline: {
    useGradient: true,
    showArea: true,
    strokeWidth: 3,
    type: "line",
    smooth: true,
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
    backgroundColor: "#1A1A1A",
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
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false
  },
  tbody: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontSize: 14,
    outline: "none",
    textAlign: "left",
    bold: false
  },
  userOptions: {
    show: true,
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
    <div class="overflow-x-auto">
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartTable" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">TableSparkline</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.sparklineTable[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto no-style ${isFixed ? 'fixed bottom-16 w-[300px] max-h-[500px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[1200px] overflow-x-auto'}`">
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
                <VueUiTableSparkline :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                  <BaseSpinner/>
              </template>
            </Suspense>
        </div>

        <BaseDocActions
          targetLink="vue-ui-table-sparkline"
          :configSource="mainConfig.vue_ui_table_sparkline"
        />

        <Box showEmits>
          <template #tab0>
            {{ translations.docs.datastructure[store.lang] }}
            <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiTableSparklineDatasetItem[]</code>
                </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
  [
    {
      name: string;
      values: number[];
      color?: string;
    },
    {...}
  ]
</code>
</pre>                
                </div>
                {{ translations.docs.example[store.lang] }} :
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset: VueUiTableSparklineDatasetItem[]</span> = [
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
]
</code>
</pre>                
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
    <span>colNames: [], <span class="text-app-blue text-xs">// {{ translations.docs.example[store.lang] }} : ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE"]</span></span>
    <span>customPalette: []; <span class="text-app-blue text-xs">// string[]</span></span>
    <span>fontFamily: "inherit",</span>
    <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.responsiveBreakpoint" :min="300" :max="800"/><BaseNumberInput v-else v-model:value="mutableConfig.responsiveBreakpoint" :min="300" :max="800"/>, (default: 500)</span>
    <span>roundingAverage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.roundingAverage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.roundingAverage" :min="0" :max="6"/>, (default: 500)</span>
    <span>roundingMedian: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.roundingMedian" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.roundingMedian" :min="0" :max="6"/>, (default: 500)</span>
    <span>roundingTotal: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.roundingTotal" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.roundingTotal" :min="0" :max="6"/>, (default: 500)</span>
    <span>roundingValues: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.roundingValues" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.roundingValues" :min="0" :max="6"/>, (default: 500)</span>
    <span>showAverage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showAverage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showAverage" @change="forceChartUpdate()">, (default: true)</span>
    <span>showMedian: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showMedian" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showMedian" @change="forceChartUpdate()">, (default: true)</span>
    <span>showSparklines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showSparklines" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showSparklines" @change="forceChartUpdate()">, (default: true)</span>
    <span>showTotal: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showTotal" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showTotal" @change="forceChartUpdate()">, (default: true)</span>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <BaseAttr name="prefix" attr="prefix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <BaseAttr name="suffix" attr="suffix" type="text" defaultVal="''" :light="mutableConfig" :dark="mutableConfigDarkMode"/>
    <span>formatter: null, <BaseComment>{{ translations.formatterLink[store.lang] }}</BaseComment></span>
    <BaseDetails attr="sparkline" :level="1">
      <span> useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.useGradient" @change="forceChartUpdate()">, (default: true)</span>
      <span> showArea: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.showArea" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.showArea" @change="forceChartUpdate()">, (default: true)</span>
      <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.sparkline.strokeWidth" :min="0" :max="12"/><BaseNumberInput v-else v-model:value="mutableConfig.sparkline.strokeWidth" :min="0" :max="12"/>, (default: 3) </span>
      <span>type: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.sparkline.type"><option>line</option><option>bar</option></select><select v-else v-model="mutableConfig.sparkline.type"><option>line</option><option>bar</option></select>, (default: "line")</span>
      <span>smooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.smooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.smooth" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="animation" :level="2" title="sparkline.animation">
        <span>animationFrames: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.sparkline.animation.animationFrames" :min="60" :max=600 :step="10"/><BaseNumberInput v-else v-model:value="mutableConfig.sparkline.animation.animationFrames" :min="60" :max="600"/>, (default: 360)</span>
        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.animation.show" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="tbody" :level="1">
      <span> backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.tbody.backgroundColor"><input v-else type="color" v-model="mutableConfig.tbody.backgroundColor">, (default: "#FFFFFF")</span>
      <span>color:  <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.tbody.color"><input v-else type="color" v-model="mutableConfig.tbody.color">, (default: "#2D353C")</span>
      <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.tbody.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.tbody.fontSize" :min="8" :max="42"/>, (default: 14)</span>
      <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.tbody.outline"><input v-else type="text" v-model="mutableConfig.tbody.outline">, (default: "none")</span>
      <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.tbody.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")</span>
      <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.tbody.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.tbody.bold" @change="forceChartUpdate()">, (default: false)</span>
    </BaseDetails>
    <BaseDetails attr="thead" :level="1">
      <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.thead.backgroundColor"><input v-else type="color" v-model="mutableConfig.thead.backgroundColor">, (default: "#FFFFFF")</span>
      <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.thead.color"><input v-else type="color" v-model="mutableConfig.thead.color">, (default: "#2D353C")</span>
      <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.thead.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.thead.fontSize" :min="8" :max="42"/>, (default: 14)</span>
      <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.thead.outline"><input v-else type="text" v-model="mutableConfig.thead.outline">, (default: "none")</span>
      <span> textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.thead.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")</span>
      <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.thead.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.thead.bold" @change="forceChartUpdate()">, (default: false)</span>
    </BaseDetails>
    <BaseDetails attr="title" :level="1">
      <span> backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.title.backgroundColor"><input v-else type="color" v-model="mutableConfig.title.backgroundColor">, (default: "#FFFFFF")</span>
      <span> color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.title.color"><input v-else type="color" v-model="mutableConfig.title.color">, (default: "#2D353C")</span>
      <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title.text"><input v-else type="text" v-model="mutableConfig.title.text">, (default: "")</span>
      <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
      <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.title.bold" @change="forceChartUpdate()">, (default: true)</span>
      <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.title.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.title.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "center")</span>
      <BaseDetails attr="subtitle" :level="2" title="title.subtitle">
        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.title.subtitle.text">, (default: "")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.title.subtitle.color">, (default: "#2D353C")</span>
        <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <span>serie: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.serie"><input v-else type="text" v-model="mutableConfig.translations.serie">, (default: "Serie")</span>
      <span>total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.total"><input v-else type="text" v-model="mutableConfig.translations.total">, (default: "Total")</span>
      <span>average: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.average"><input v-else type="text" v-model="mutableConfig.translations.average">, (default: "Average")</span>
      <span>median: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.median"><input v-else type="text" v-model="mutableConfig.translations.median">, (default: "Median")</span>
      <span>chart: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.chart"><input v-else type="text" v-model="mutableConfig.translations.chart">, (default: "Evolution")</span>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: false)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
        <span>fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)</span>
      </BaseDetails>
      <BaseDetails attr="buttonTitles" :level="2" title="userOptions.buttonTitles">
        <span>open: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.open"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.open">, (default: "Open options")</span>
        <span>close: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.close"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.close">, (default: "Close options")</span>
        <span>pdf: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.pdf"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.pdf">, (default: "Download PDF")</span>
        <span>csv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.csv"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.csv">, (default: "Download CSV")</span>
        <span>img: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.img"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.img">, (default: "Download PNG")</span>
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
              
          </template>
          <template #tab2>
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
          </template>
        </Box>
    </div>
</template>