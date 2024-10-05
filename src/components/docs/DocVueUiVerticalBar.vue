<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiVerticalBar from "../themes/ThemesVueUiVerticalBar.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
})

const dataset = ref([
    {
    name: "Serie 1",
    value: 100,
    children: [
      {
        name: "serie 1 child 1",
        value: 80
      },
      {
        name: "serie 1 child 2",
        value: 20
      },
    ]
  },
  {
    name: "Serie 2",
    value: 345,
  },
  {
    name: "Serie 3",
    value: 210,
  },
  {
    name: "Serie 4",
    value: 188,
  },
  {
    name: "Serie 5",
    value: 120,
    children: [
      {
        name: "Serie 5 child 1",
        value: 60,
      },
      {
        name: "Serie 5 child 2",
        value: 20,
      },
      {
        name: "Serie 5 child 3",
        value: 40,
      },
    ]
  }
]);

const config = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      layout: {
        bars: {
          sort: "desc",
          useStroke: false,
          strokeWidth: 2,
          height: 32,
          gap: 6,
          borderRadius: 4,
          offsetX: 64,
          paddingRight: 0,
          useGradient: true,
          gradientIntensity: 20,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#1A1A1A",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#1A1A1A",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#1A1A1A",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#1A1A1A",
          opacity: 5
        },
        separators: {
          show: true,
          color: "#CCCCCC",
          strokeWidth: 1
        }
      },
      title: {
        text: "Title",
        color: "#1A1A1A",
        fontSize: 20,
        bold: true,
        subtitle: {
          color: "#565656",
          text: "Subtitle",
          fontSize: 16,
          bold: false
        }
      },
      legend: {
        position: "top",
        show: true,
        fontSize: 14,
        color: "#1A1A1A",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#F3F4F6",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#F3F4F6",
        color: "#1A1A1A",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: "",
        customFormat: null,
        borderRadius: 4,
        borderColor:"#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 90
      }
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
        sort: true,
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
        sort: "Toggle sort",
        fullscreen: "Toggle fullscreen",
    }
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none"
    },
    td: {
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
  }
});
const darkModeConfig = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      layout: {
        bars: {
          sort: "desc",
          useStroke: false,
          strokeWidth: 2,
          height: 32,
          gap: 6,
          borderRadius: 4,
          offsetX: 64,
          paddingRight: 0,
          useGradient: true,
          gradientIntensity: 20,
          fillOpacity: 10,
          underlayerColor: "#FFFFFF",
          dataLabels: {
            color: "#CCCCCC",
            bold: true,
            fontSize: 12,
            value: {
              show: true,
              roundingValue: 0,
              prefix: "",
              suffix: ""
            },
            percentage: {
              show: true,
              roundingPercentage: 0
            },
            offsetX: 0
          },
          nameLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          },
          parentLabels: {
            show: true,
            color: "#CCCCCC",
            bold: false,
            fontSize: 10,
            offsetX: 0
          }
        },
        highlighter: {
          color: "#FFFFFF",
          opacity: 5
        },
        separators: {
          show: true,
          color: "#343434",
          strokeWidth: 1
        }
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
      legend: {
        position: "top",
        show: true,
        fontSize: 14,
        color: "#CCCCCC",
        bold: true,
        roundingValue: 0,
        backgroundColor: "#1A1A1A",
        roundingPercentage: 0,
        prefix: "",
        suffix: ""
      },
      tooltip: {
        show: true,
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
        prefix: "",
        suffix: "",
        customFormat: null,
        borderRadius: 4,
        borderColor:"#3A3A3A",
        borderWidth: 1,
        backgroundOpacity: 90
      }
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
      sort: true,
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
        sort: "Toggle sort",
        fullscreen: "Toggle fullscreen",
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
      outline: "none",
      roundingValue: 0,
      roundingPercentage: 0,
      prefix: "",
      suffix: ""
    }
  },
  translations: {
    parentName: "Serie",
    childName: "Child",
    value: "value",
    percentageToTotal: "%/total",
    percentageToSerie: "%/serie"
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
            <VueUiIcon name="chartVerticalBar" stroke="#42d392" :strokeWidth="1.5" />
            VueUiVerticalBar
        </h1>
    <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.verticalBar[store.lang] }}
        </p>
    <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
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
                <VueUiVerticalBar :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                    <div class="min-h-[500px]"></div>
                </template>
            </Suspense>
        </div>

        <BaseDocActions
          targetLink="vue-ui-vertical-bar"
          targetMaker="VueUiVerticalBar"
          :configSource="mainConfig.vue_ui_vertical_bar"
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_vertical_bar">
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiVerticalBarDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            value: number;
            color: string; <span class="text-app-green">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            children: [
                <span class="text-app-green">// {{ translations.docs.comments.verticalBar.breakdown[store.lang] }}</span>
                {
                    name: string;
                    value: number;
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>          
                </div>
                {{ translations.docs.example[store.lang] }}:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-app-green">dataset: VueUiVerticalBarDatasetItem[]</span> = [
    {
        name: "Serie 1",
        value: 100,
        children: [
        {
            name: "serie 1 child 1",
            value: 80
        },
        {
            name: "serie 1 child 2",
            value: 20
        },
        ]
    },
    {
        name: "Serie 2",
        value: 345,
    },
    {
        name: "Serie 3",
        value: 210,
    },
    {
        name: "Serie 4",
        value: 188,
    },
    {
        name: "Serie 5",
        value: 120,
        children: [
        {
            name: "Serie 5 child 1",
            value: 60,
        },
        {
            name: "Serie 5 child 2",
            value: 20,
        },
        {
            name: "Serie 5 child 3",
            value: 40,
        },
        ]
    }
]
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiVerticalBarConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config:VueUiVerticalBarConfig" equal>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <span>customPalette: []; <span class="text-app-blue text-xs">// string[]</span></span>
    <span>useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation" @change="forceChartUpdate()">, (default: true)</span>
    <BaseDetails attr="style" :level="1">
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="chart" :level="2" title="style.chart">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")</span>
        <BaseDetails attr="layout" :level="3" title="style.chart.layout">
          <BaseDetails attr="bars" :level="4" title="style.chart.layout.bars">
            <span>sort: "desc", <span class="text-gray-600 dark:text-app-blue text-xs">// "desc" | "asc"</span></span>
            <span>useStroke: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.useStroke" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.useStroke" @change="forceChartUpdate()">, (default: false)</span>
            <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.strokeWidth" :min="0" :max="20"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.strokeWidth" :min="0" :max="20"/>, (default: 2)</span>
            <span>height: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.height" :min="1" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.height" :min="1" :max="100"/>, (default: 32)</span>
            <span>gap: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.gap" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.gap" :min="0" :max="100"/>, (default: 6)</span>
            <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.borderRadius" :min="0" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.borderRadius" :min="0" :max="100"/>, (default: 4)</span>
            <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
            <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.useGradient" @change="forceChartUpdate()">, (default: true)</span>
            <span>gradientIntensity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.gradientIntensity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.bars.gradientIntensity">, (default: 20)</span>
            <span>fillOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.chart.layout.bars.fillOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.bars.fillOpacity">, (default: 90)</span>
            <span> underlayerColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.underlayerColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.underlayerColor">,  (default: "#FFFFFF")</span>
            <BaseDetails attr="dataLabels" :level="5" title="style.chart.layout.bars.dataLabels">
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.dataLabels.color">, (default: "#2D353C")</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.dataLabels.bold" @change="forceChartUpdate()">, (default: true)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.dataLabels.fontSize" :min="8" :max="42"/>, (default: 12)</span>
              <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.dataLabels.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
              <BaseDetails attr="percentage" :level="6" title="style.chart.layout.bars.dataLabels.percentage">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.percentage.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.dataLabels.percentage.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.percentage.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.dataLabels.percentage.roundingPercentage" :min="0" :max="6"/>, (default: 0)</span>
              </BaseDetails>
              <BaseDetails attr="value" :level="6" title="style.chart.layout.bars.dataLabels.value">
                <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.show" @change="forceChartUpdate()">, (default: true)</span>
                <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.dataLabels.value.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
                <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.prefix">, (default: "")</span>
                <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.layout.bars.dataLabels.value.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.layout.bars.dataLabels.value.suffix">, (default: "")</span>
              </BaseDetails>
            </BaseDetails>
            <BaseDetails attr="nameLabels" :level="5" title="style.chart.layout.bars.nameLabels">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.nameLabels.show" @change="forceChartUpdate()">, (default: true)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.nameLabels.color">, (default: "#2D353C")</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.nameLabels.bold" @change="forceChartUpdate()">, (default: true)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.nameLabels.fontSize" :min="8" :max="42"/>, (default: 10)</span>
              <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.nameLabels.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.nameLabels.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
            </BaseDetails>
            <BaseDetails attr="parentLabels" :level="5" title="style.chart.layout.bars.parentLabels">
              <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.parentLabels.show" @change="forceChartUpdate()">, (default: true)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.bars.parentLabels.color">, (default: "#2D353C")</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.bars.parentLabels.bold" @change="forceChartUpdate()">, (default: false)</span>
              <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.parentLabels.fontSize" :min="8" :max="42"/>, (default: 10)</span>
              <span>offsetX: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.bars.parentLabels.offsetX" :min="-100" :max="100"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.bars.parentLabels.offsetX" :min="-100" :max="100"/>, (default: 0)</span>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="highlighter" :level="4" title="style.chart.layout.highlighter">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.highlighter.color">, (default: "#2D353C")</span>
            <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.highlighter.opacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.highlighter.opacity">, (default: 5)</span>
          </BaseDetails>
          <BaseDetails attr="separators" :level="4" title="style.chart.layout.separators">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.separators.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.separators.show" @change="forceChartUpdate()">, (default: true)</span>
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.separators.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.separators.color">, (default: "#E1E5E8")</span>
            <span>strokeWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.layout.separators.strokeWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.layout.separators.strokeWidth" :min="0" :max="24"/>, (default: 1)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="legend" :level="3" title="style.chart.legend">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.chart.legend.position"><option>top</option><option>bottom</option></select><select v-else v-model="mutableConfig.style.chart.legend.position"><option>top</option><option>bottom</option></select>, (default: "top")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.fontSize" :min="8" :max="42"/>, (default: 14)</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")</span>
          <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")</span>
          <span>bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)</span>
          <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
          <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.legend.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.legend.roundingPercentage" :min="0" :max="6"/>,, (default: 0)</span>
          <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.prefix">, (default: "")</span>
          <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.suffix">, (default: "")</span>
          <span></span>
        </BaseDetails>
        <BaseDetails attr="title" :level="3" title="style.chart.title">
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.fontSize" :min="8" :max="42"/>, (default: 20)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)</span>
          <BaseDetails attr="subtitle" :level="4" title="style.chart.title.subtitle">
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default:"#A1A1A1")</span>
            <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")</span>
            <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.title.subtitle.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.title.subtitle.fontSize" :min="8" :max="42"/>, (default: 16)</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="tooltip" :level="3" title="style.chart.tooltip">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)</span>
          <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")</span>
          <span>fontSize: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.fontSize" :min="8" :max="42"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.fontSize" :min="8" :max="42"/>, (default: 14)</span>
          <span>showValue: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showValue" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)</span>
          <span>showPercentage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.showPercentage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)</span>
          <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.roundingValue" :min="0" :max="6" />, (default: 0)</span>
          <span>roundingPercentage: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.roundingPercentage" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.roundingPercentage" :min="0" :max="6" />, (default: 0)</span>
          <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.tooltip.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.tooltip.prefix">, (default: "")</span>
          <span> suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.tooltip.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.tooltip.suffix">, (default: "")</span>
          <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
          <span>borderRadius: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.borderRadius" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.borderRadius" :min="0" :max="24" />, (default: 4)</span>
          <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.chart.tooltip.borderColor">, (default: "#e1e5e8"),</span>
          <span>borderWidth: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.chart.tooltip.borderWidth" :min="0" :max="24"/><BaseNumberInput v-else v-model:value="mutableConfig.style.chart.tooltip.borderWidth" :min="0" :max="24" />, (default: 1)</span>
          <span>backgroundOpacity: <input v-if="isDarkMode" type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.tooltip.backgroundOpacity"><input v-else type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.backgroundOpacity">, (default: 100)</span>
        </BaseDetails>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)</span>
      <span>responsiveBreakpoint: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.responsiveBreakpoint" :min="300" :max="800" :step="10"/><BaseNumberInput v-else v-model:value="mutableConfig.table.responsiveBreakpoint" :min="300" :max="800"/>, (default: 400)</span>
      <BaseDetails attr="th" :level="2" title="table.th">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
        <span>roundingValue: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.table.td.roundingValue" :min="0" :max="6"/><BaseNumberInput v-else v-model:value="mutableConfig.table.td.roundingValue" :min="0" :max="6"/>, (default: 0)</span>
        <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.prefix"><input v-else type="text" v-model="mutableConfig.table.td.prefix">, (default: "")</span>
        <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.suffix"><input v-else type="text" v-model="mutableConfig.table.td.suffix">, (default: "")</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="translations" :level="1">
      <span>parentName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.parentName"><input v-else type="text" v-model="mutableConfig.translations.parentName">, (default: "Serie")</span>
      <span>childName: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.childName"><input v-else type="text" v-model="mutableConfig.translations.childName">, (default: "Child")</span>
      <span>value: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.value"><input v-else type="text" v-model="mutableConfig.translations.value">, (default: "value")</span>
      <span>percentageToTotal: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.percentageToTotal"><input v-else type="text" v-model="mutableConfig.translations.percentageToTotal">, (default: "%/total")</span>
      <span>percentageToSerie: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.percentageToSerie"><input v-else type="text" v-model="mutableConfig.translations.percentageToSerie">, (default: "%/serie")</span>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
        <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
        <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
        <span>sort: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.sort" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.sort" @change="forceChartUpdate()">, (default: true)</span>
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
        <span>sort: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.sort"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.sort">, (default: "Toggle sort")</span>
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
                <div class="overflow-x-auto">
             
                </div>
            </template>
            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">{{ translations.docs.emits.xy.selectLegend[store.lang] }}</div>
<pre>
<code>
[
    {
        children: [
            {
                childIndex: number;
                color: string;
                isChild: boolean;
                isFirstChild: boolean;
                isLastChild: boolean;
                name: string;
                parentId: string;
                parentName: string;
                parentValue: number;
                value: number;
            },
            {...}
        ],
        color: string;
        hasChildren: boolean;
        id: string;
        isChild: boolean;
        name: string;
        value: number;
    },
    {...}
]
</code>
</pre>
<div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-black dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const verticalBarChart = ref(null);
            const verticalBarDataset = ref([]);

            onMounted(() => {
                verticalBarDataset.value = verticalBarChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-black dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiVerticalBar
                ref="verticalBarChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        verticalBarDataset: [],
                        config: {
                            <span class="text-gray-500">// {{ translations.docs.comments.yourConfigHere[store.lang] }}</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// {{ translations.docs.comments.yourDatasetHere[store.lang] }}</span>
                        ]
                    }
                },
                mounted () {
                    this.verticalBarDataset = this.$refs.verticalBarChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
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
                    <div><code>toggleSort</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.toggleSort[store.lang] }}</div>
                </div>
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiVerticalBar
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiVerticalBar&gt;
</code>
</pre> 
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.chart.tooltip.customFormat</span>

customFormat: ({ <span class="text-app-blue">seriesIndex, datapoint, series, config</span> }) => {
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

            <template #tab6>
              <ThemesVueUiVerticalBar />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiVerticalBar 
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
                    :key="key"
                  />
                </template>
              </ResponsiveUnit>
            </template>
        </Box>
    </div>
</template>