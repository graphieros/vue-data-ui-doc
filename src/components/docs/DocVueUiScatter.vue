<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import ThemesVueUiScatter from "../themes/ThemesVueUiScatter.vue";
import ResponsiveUnit from "./responsive/ResponsiveUnit.vue";
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
});

const scat1 = computed(() => {
  const arr = [];
  for(let i = -100; i < 100; i += 1) {
    arr.push({
      x: Math.random()*(Math.random() > 0.3 ? i/3 : -i /5),
      y: Math.random()*i/20,
      name: `plot_${i}_cluster_1`
    });
  }
  return arr;
});

const scat2 = computed(() => {
  const arr = [];
  for(let i = -100; i < 100; i += 1) {
    arr.push({
      x: Math.random()*(Math.random() > 0.1 ? i/10 : -i /10),
      y: Math.random()*i/10,
      name: `plot_${i}_cluster_2`
    });
  }
  return arr;
});

const dataset = computed(() => {
  
  return [
  {
    name: "Cluster 1",
    values: scat1.value,
    color: "#42d392",
    shape: "star"
  },
  {
    name: "Cluster 2",
    values: scat2.value,
    color: "#ff6400",
    shape: "triangle"
  }
]});

const darkModeConfig = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    layout: {
      height: 316,
      width: 512,
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      axis: {
        show: true,
        stroke: "#565656",
        strokeWidth: 1
      },
      marginalBars: {
        show: true,
        size: 40,
        tranches: 20,
        opacity: 0.5,
        fill: '#CCCCCC',
        strokeWidth: 0.5,
        offset: 20,
        borderRadius: 2,
        useGradient: true,
        showLines: true,
        linesStrokeWidth: 1
      },
      plots: {
        radius: 3,
        stroke: "#1A1A1A",
        strokeWidth: 0.3,
        opacity: 0.6,
        significance: {
          show: true,
          useDistanceOpacity: false,
          deviationThreshold: 10,
          opacity: 0.3
        },
        deviation: {
          translation: "deviation",
          roundingValue: 1
        },
        giftWrap: {
          show: false,
          strokeWidth: 1,
          strokeDasharray: 0,
          fillOpacity: 0.2
        },
        selectors: {
            show: true,
            stroke: "#CCCCCC",
            strokeWidth: 0.7,
            strokeDasharray: 0,
            labels: {
              fontSize: 8,
              color: "#CCCCCC",
              rounding: 2,
              bold: false,
              showName: true,
              prefix: "",
              suffix: ""
            },
            markers: {
              radius: 1.5,
              stroke: "#CCCCCC",
              strokeWidth: 0.5,
              fill: "#1A1A1A"
            }
        },
      },
      correlation: {
        show: true,
        strokeDasharray: 2,
        strokeWidth: 1,
        label: {
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: true,
          roundingValue: 2,
          useSerieColor: true
        }
      },
      dataLabels: {
        xAxis: {
          name: "xAxis",
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          name: "yAxis",
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
        }
      }
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
    legend: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 12,
      bold: true,
      roundingValue: 0
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      showShape: true,
      prefix: "",
      suffix: "",
      borderRadius: 4,
      borderColor:"#3A3A3A",
      borderWidth: 1,
      backgroundOpacity: 90,
      position: 'center',
      offsetY: 24
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
      roundingValue: 2,
      roundingAverage: 1
    },
    translations: {
      correlationCoefficient: "Correlation Coef.",
      nbrPlots: "Nbr plots",
      average: "Average",
      series: "Series"
    }
  }
});
const config = ref({
  responsive: false,
  useCssAnimation: true,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    layout: {
      height: 316,
      width: 512,
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      axis: {
        show: true,
        stroke: "#C4C4C4",
        strokeWidth: 1
      },
      marginalBars: {
        show: true,
        size: 40,
        tranches: 20,
        opacity: 0.5,
        fill: '##2D353C',
        strokeWidth: 0.5,
        offset: 20,
        borderRadius: 2,
        useGradient: true,
        showLines: true,
        linesStrokeWidth: 1
      },
      plots: {
        radius: 3,
        stroke: "#F3F4F6",
        strokeWidth: 0.3,
        opacity: 0.6,
        significance: {
          show: true,
          useDistanceOpacity: false,
          deviationThreshold: 10,
          opacity: 0.3
        },
        deviation: {
          translation: "deviation",
          roundingValue: 1
        },
        giftWrap: {
          show: false,
          strokeWidth: 1,
          strokeDasharray: 0,
          fillOpacity: 0.2
        },
        selectors: {
            show: true,
            stroke: "#1A1A1A",
            strokeWidth: 0.7,
            strokeDasharray: 0,
            labels: {
              fontSize: 8,
              color: "#1A1A1A",
              rounding: 2,
              bold: false,
              showName: true,
              prefix: "",
              suffix: ""
            },
            markers: {
              radius: 1.5,
              stroke: "#1A1A1A",
              strokeWidth: 0.5,
              fill: "#FFFFFF"
            }
        },
      },
      correlation: {
        show: true,
        strokeDasharray: 2,
        strokeWidth: 1,
        label: {
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: true,
          roundingValue: 2,
          useSerieColor: true
        }
      },
      dataLabels: {
        xAxis: {
          name: "xAxis",
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          name: "yAxis",
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: false,
          roundingValue: 0,
          offsetX: 0,
          offsetY: 0
        }
      }
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
        color: "#565656",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    },
    legend: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 12,
      bold: true,
      roundingValue: 0
    },
    tooltip: {
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 14,
      roundingValue: 0,
      customFormat: null,
      showShape: true,
      prefix: "",
      suffix: "",
      borderRadius: 4,
      borderColor:"#e1e5e8",
      borderWidth: 1,
      backgroundOpacity: 90,
      position: 'center',
      offsetY: 24
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
      roundingValue: 2,
      roundingAverage: 1
    },
    translations: {
      correlationCoefficient: "Correlation Coef.",
      nbrPlots: "Nbr plots",
      average: "Average",
      series: "Series"
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
            <VueUiIcon name="chartScatter" stroke="#42d392" :strokeWidth="1.5" />
            <span>VueUi<span class="text-black dark:text-app-blue-light">Scatter</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.scatter[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-16 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : ''}`">
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
                <VueUiScatter :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
              </template>
              <template #fallback>
                <BaseSpinner/>
              </template>
            </Suspense>
        </div>

        <BaseDocActions
          targetLink="vue-ui-scatter"
          targetMaker="VueUiScatter"
          :configSource="mainConfig.vue_ui_scatter"
        />

        <Box showEmits showSlots showTooltip showThemes showResponsive schema="vue_ui_scatter">
            <template v-slot:tab0>
              {{ translations.docs.datastructure[store.lang] }}
              <div class="mt-4">
                TS type: <code class="text-app-green">VueUiScatterDatasetItem[]</code>
              </div>
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string; <span class="text-gray-500">// {{ translations.docs.comments.xy.color[store.lang] }}</span>
            shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star ";
            values: [
                { 
                    x: number; 
                    y: number; 
                    name?: string;
                    weight?: number; <span class="text-gray-500">// {{ translations.docs.comments.scatterWeight[store.lang] }}</span>
                },
                {...}
            ]
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
const <span class="text-black dark:text-app-green">dataset: VueUiScatterDatasetItem[]</span> = [
    {
        name: "Cluster 1",
        values: [
            {
                x: 1,
                y: 1,
                name: "Cluster 1 point 1"
            },
            {
                x: 0,
                y: -1,
                name: "Cluster 1 point 2"
            },
            {
                x: 2,
                y: 3,
                name: "Cluster 1 point 3"
            },
        ]
    },
    {
        name: "Cluster 2",
        values: [
            {
                x: -5,
                y: -4,
                name: "Cluster 2 point 1"
            },
            {
                x: 13,
                y: 8,
                name: "Cluster 2 point 2"
            },
            {
                x: -2,
                y: -7,
                name: "Cluster 2 point 3"
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
                  TS type: <code class="text-app-blue">VueUiScatterConfig</code>
                </div>

<div class="my-4">
    Toggle tree view: <input type="checkbox" v-model="showAllConfig">
</div>

<code ref="configCode">
  <BaseDetails attr="const config: VueUiScatterConfig" equal>
    <span>responsive: false; <span class="text-app-blue text-xs">// {{ translations.responsive[store.lang] }}</span></span>
    <span>theme: "", ("zen" | "hack" | "concrete" | "")</span>
    <span>customPalette: []; // string[]</span>
    <span>useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation">, (default: true)</span>
    <BaseDetails attr="style" :level="1">
      <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")</span>
      <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")</span>
      <span>fontFamily: "inherit",</span>
      <BaseDetails attr="layout" :level="2" title="style.layout">
        <span> height: <input v-if="isDarkMode" type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.height"><input v-else type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfig.style.layout.height">, (default: 316)</span>
        <span>width: <input v-if="isDarkMode" type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.width"><input v-else type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfig.style.layout.width">, (default: 512)</span>
        <BaseDetails attr="axis" :level="3" title="style.layout.axis">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.axis.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.axis.show">, (default: true)</span>
          <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.axis.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.axis.stroke">, (default: "#e1e5e8")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0" max="12" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.axis.strokeWidth"><input v-else type="range" min="0" max="12" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.axis.strokeWidth">, (default: 1)</span>
        </BaseDetails>
        <BaseDetails attr="correlation" :level="3" title="style.layout.correlation">
          <span> show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.show">, (default: true)</span>
          <span>strokeDasharray: <input v-if="isDarkMode" type="range" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.strokeDasharray"><input v-else type="range" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.strokeDasharray">, (default: 2)</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.strokeWidth">, (default: 1)</span>
          <BaseDetails attr="label" :level="4" title="style.layout.correlation.label">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.label.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.show">, (default: true)</span>
            <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="36" v-model="mutableConfigDarkMode.style.layout.correlation.label.fontSize"><input v-else type="number" min="6" max="36" v-model="mutableConfig.style.layout.correlation.label.fontSize">, (default: 12)</span>
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.correlation.label.color"><input v-else type="color" v-model="mutableConfig.style.layout.correlation.label.color">, (default: "#2D353C")</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.label.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.bold">, (default: true)</span>
            <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.style.layout.correlation.label.roundingValue"><input v-else type="number" min="0" max="5" v-model="mutableConfig.style.layout.correlation.label.roundingValue">, (default: 2)</span>
            <span>useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.label.useSerieColor"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.useSerieColor">, (default: true)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="dataLabels" :level="3" title="style.layout.dataLabels">
          <BaseDetails attr="xAxis" :level="4" title="style.layout.dataLabels.xAxis">
            <span> name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.name"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.xAxis.name">, (default: "xAxis")</span>
            <span>show: true,</span>
            <span>fontSize: <input v-if="isDarkMode" type="number" min="4" max="32" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.fontSize"><input v-else type="number" min="4" max="32" v-model="mutableConfig.style.layout.dataLabels.xAxis.fontSize">, (default: 10)</span>
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold">, (default: false)</span>
            <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.dataLabels.xAxis.roundingValue">, (default: 0)</span>
            <span>offsetX: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.offsetX"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.layout.dataLabels.xAxis.offsetX">, (default: 0)</span>
            <span>offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.offsetY"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.layout.dataLabels.xAxis.offsetY">, (default: 0)</span>
          </BaseDetails>
          <BaseDetails attr="yAxis" :level="4" title="style.layout.dataLabels.yAxis">
            <span>name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.name"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.yAxis.name">, (default: "yAxis")</span>
            <span>show: true,</span>
            <span>fontSize: <input v-if="isDarkMode" type="number" min="4" max="32" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.fontSize"><input v-else type="number" min="4" max="32" v-model="mutableConfig.style.layout.dataLabels.yAxis.fontSize">, (default: 10)</span>
            <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")</span>
            <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold">, (default: false)</span>
            <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.dataLabels.yAxis.roundingValue">, (default: 0)</span>
            <span>offsetX: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.offsetX"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.layout.dataLabels.yAxis.offsetX">, (default: 0)</span>
            <span>offsetY: <input v-if="isDarkMode" type="number" min="-100" max="100" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.offsetY"><input v-else type="number" min="-100" max="100" v-model="mutableConfig.style.layout.dataLabels.yAxis.offsetY">, (default: 0)</span>
          </BaseDetails>
        </BaseDetails>
        <BaseDetails attr="marginalBars" :level="3" title="style.layout.marginalBars">
          <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.show">, (default: false)</span>
          <span>size: 40,</span>
          <span>tranches: <input v-if="isDarkMode" type="number" min="10" max="100" v-model="mutableConfigDarkMode.style.layout.marginalBars.tranches"><input v-else type="number" min="10" max="100" v-model="mutableConfig.style.layout.marginalBars.tranches">, (default: 20)</span>
          <span>opacity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.layout.marginalBars.opacity"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.layout.marginalBars.opacity">, (default: 1)</span>
          <span>fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.marginalBars.fill"><input v-else type="color" v-model="mutableConfig.style.layout.marginalBars.fill">, (default: "#2D353C")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.strokeWidth" @change="forceChartUpdate()">, (default: 1)</span>
          <span>offset: 20,</span>
          <span>borderRadius: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.layout.marginalBars.borderRadius"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.layout.marginalBars.borderRadius">, (default: 2)</span>
          <span>useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.show">, (default: true)</span>
          <span>showLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.showLines"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.showLines">, (default: false)</span>
          <span>linesStrokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.linesStrokeWidth" @change="forceChartUpdate()"><input v-else type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.linesStrokeWidth" @change="forceChartUpdate()">, (default: 1)</span>
        </BaseDetails>
        <BaseDetails attr="padding" :level="3" title="style.layout.padding">
          <span>top: 36,</span>
          <span>right: 48,</span>
          <span>bottom: 36,</span>
          <span>left: 48,</span>
        </BaseDetails>
        <BaseDetails attr="plots" :level="3" title="style.layout.plots">
          <span>radius: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.radius"><input v-else type="range" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.style.layout.plots.radius">, (default: 2)</span>
          <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.plots.stroke">, (default: "#FFFFFF")</span>
          <span>strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="6" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="6" step="0.1" v-model="mutableConfig.style.layout.plots.strokeWidth">, (default: 0.3)</span>
          <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.opacity"><input v-else type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.opacity">, (default: 0.6)</span>
          <BaseDetails attr="deviation" :level="4" title="style.layout.plots.deviation">
            <span>translation: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.plots.deviation.translation"><input v-else type="text" v-model="mutableConfig.style.layout.plots.deviation.translation">, (default: "deviation")</span>
            <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.plots.deviation.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.plots.deviation.roundingValue">, (default: 1)</span>
          </BaseDetails>
          <BaseDetails attr="giftWrap" :level="4" title="style.layout.plots.giftWrap">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.giftWrap.show">, (default: false)</span>
            <span>strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.layout.plots.giftWrap.strokeWidth">, (default: 1)</span>
            <span>strokeDasharray: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.strokeDasharray"><input v-else type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfig.style.layout.plots.giftWrap.strokeDasharray">, (default: 0)</span>
            <span>fillOpacity: <input v-if="isDarkMode" type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.fillOpacity"><input v-else type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.giftWrap.fillOpacity">, (default: 0.2)</span>
          </BaseDetails>
          <BaseDetails attr="selectors" :level="4" title="style.layout.plots.selectors">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.selectors.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.selectors.show">, (default: true)</span>
            <span>stroke:  <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.stroke">, (default: "#2D353C")</span>
            <span>strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.selectors.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.layout.plots.selectors.strokeWidth">, (default: 0.7)</span>
            <span>strokeDasharray: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.selectors.strokeDasharray"><input v-else type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfig.style.layout.plots.selectors.strokeDasharray">, (default: 0)</span>
            <BaseDetails attr="labels" :level="5" title="style.layout.plots.selectors.labels">
              <span>fontSize: <input v-if="isDarkMode" type="number" min="4" max="32" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.fontSize"><input v-else type="number" min="4" max="32" v-model="mutableConfig.style.layout.plots.selectors.labels.fontSize">, (default: 12)</span>
              <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.color"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.labels.color">, (default: "#2D353C")</span>
              <span>rounding: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.rounding"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.layout.plots.selectors.labels.rounding">, (default: 12)</span>
              <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.selectors.labels.bold">, (default: false)</span>
              <span>showName: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.showName"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.selectors.labels.showName">, (default: true)</span>
              <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.layout.plots.selectors.labels.prefix">, (default: "")</span>
              <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.layout.plots.selectors.labels.suffix">, (default: "")</span>
            </BaseDetails>
            <BaseDetails attr="markers" :level="5" title="style.layout.plots.selectors.markers">
              <span>radius: <input v-if="isDarkMode" type="number" min="0" max="32" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.radius"><input v-else type="number" min="0" max="32" v-model="mutableConfig.style.layout.plots.selectors.markers.radius">, (default: 12)</span>
              <span>stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.markers.stroke">, (default: "#FFFFFF")</span>
              <span>strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.layout.plots.selectors.markers.strokeWidth">, (default: 0.5)</span>
              <span>fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.fill"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.markers.fill">, (default: "#2D353C")</span>
            </BaseDetails>
          </BaseDetails>
          <BaseDetails attr="significance" :level="4" title="style.layout.plots.significance">
            <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.show">, (default: true)</span>
            <span>useDistanceOpacity: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.useDistanceOpacity"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.useDistanceOpacity">, (default: false)</span>
            <span>deviationThreshold: <input v-if="isDarkMode" type="range" min="0.1" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.deviationThreshold"><input v-else type="range" min="0.1" max="100" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.deviationThreshold">, (default: 10)</span>
            <span>opacity: <input v-if="isDarkMode" type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.opacity"><input v-else type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.opacity">, (default: 0.3)</span>
          </BaseDetails>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="legend" :level="2" title="style.legend">
        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show">, (default: true)</span>
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.legend.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.color"><input v-else type="color" v-model="mutableConfig.style.legend.color">, (default: "#2D353C")</span>
        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="24" v-model="mutableConfigDarkMode.style.legend.fontSize"><input v-else type="number" min="6" max="24" v-model="mutableConfig.style.legend.fontSize">, (default: 12)</span>
        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.bold">, (default: true)</span>
        <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="4" v-model="mutableConfigDarkMode.style.legend.roundingValue"><input v-else type="number" min="0" max="4" v-model="mutableConfig.style.legend.roundingValue">, (default: 0)</span>
      </BaseDetails>
      <BaseDetails attr="title" :level="2" title="style.title">
        <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")</span>
        <span>fontSize: <input v-if="isDarkMode" type="number" min="12" max="64" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="12" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)</span>
        <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold">, (default: true)</span>
        <span>textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.title.textAlign" @change="forceChartUpdate()"><option>left</option><option>center</option><option>right</option></select></span>
        <span>paddingLeft: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.paddingLeft" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
        <span>paddingRight: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/><BaseNumberInput v-else v-model:value="mutableConfig.style.title.paddingRight" :min="0" :max="48" @change="forceChartUpdate()"/>, (default: 0)</span>
        <BaseDetails attr="subtitle" :level="3" title="style.title.subtitle">
          <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")</span>
          <span>text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")</span>
          <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)</span>
          <span>bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold">, (default: false)</span>
        </BaseDetails>
      </BaseDetails>
      <BaseDetails attr="tooltip" :level="2" title="style.tooltip">
        <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)</span>
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")</span>
        <span>fontSize: <input v-if="isDarkMode" type="number" min="6" max="24" v-model="mutableConfigDarkMode.style.tooltip.fontSize"><input v-else type="number" min="6" max="24" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)</span>
        <span>showShape: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.showShape"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.showShape">, (default: true)</span>
        <span>prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.prefix"><input v-else type="text" v-model="mutableConfig.style.tooltip.prefix">, (default: "")</span>
        <span>suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.suffix"><input v-else type="text" v-model="mutableConfig.style.tooltip.suffix">, (default: "")</span>
        <span>customFormat: null, <span class="text-app-blue text-xs">// default behavior. To customize content, see 'custom tooltip' tab</span></span>
        <span>borderRadius: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.tooltip.borderRadius" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.tooltip.borderRadius" @change="forceChartUpdate()">, (default: 4)</span>
        <span>borderColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.borderColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.borderColor">, (default: "#e1e5e8")</span>
        <span>borderWidth: <input v-if="isDarkMode" type="number" min="0" max="24" v-model="mutableConfigDarkMode.style.tooltip.borderWidth" @change="forceChartUpdate()"><input v-else type="number" min="0" max="24" v-model="mutableConfig.style.tooltip.borderWidth" @change="forceChartUpdate()">, (default: 1)</span>
        <span>backgroundOpacity: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.style.tooltip.backgroundOpacity"><input v-else type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.tooltip.backgroundOpacity">, (default: 100)</span>
        <span>position: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.style.tooltip.position"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.style.tooltip.position"><option>left</option><option>center</option><option>right</option></select></span>
        <span>offsetY: <BaseNumberInput v-if="isDarkMode" v-model:value="mutableConfigDarkMode.style.tooltip.offsetY" :min="0" :max="64"/><BaseNumberInput v-else v-model:value="mutableConfig.style.tooltip.offsetY" :min="0" :max="64"/></span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="table" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show">, (default: false)</span>
      <span>responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)</span>
      <BaseDetails attr="th" :level="2" title="table.th">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "none")</span>
      </BaseDetails>
      <BaseDetails attr="td" :level="2" title="table.td">
        <span>backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")</span>
        <span>color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")</span>
        <span>outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "none")</span>
        <span>roundingValue: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingValue">, (default: 2)</span>
        <span>roundingAverage: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.table.td.roundingAverage"><input v-else type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingAverage">, (default: 1)</span>
      </BaseDetails>
      <BaseDetails attr="translations" :level="2" title="table.translations">
        <span>correlationCoefficient: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.correlationCoefficient"><input v-else type="text" v-model="mutableConfig.table.translations.correlationCoefficient">, (default: "Correlation Coef.")</span>
        <span>nbrPlots: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.nbrPlots"><input v-else type="text" v-model="mutableConfig.table.translations.nbrPlots">, (default: Nbr plots")</span>
        <span>average: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.average"><input v-else type="text" v-model="mutableConfig.table.translations.average">, (default: "Average")</span>
        <span>series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.series"><input v-else type="text" v-model="mutableConfig.table.translations.series">, (default: "Series")</span>
      </BaseDetails>
    </BaseDetails>
    <BaseDetails attr="userOptions" :level="1">
      <span>show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show">, (default: true)</span>
      <BaseDetails attr="buttons" :level="2" title="userOptions.buttons">
        <span>tooltip: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.tooltip" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.tooltip" @change="forceChartUpdate()">, (default: true)</span>
        <span>pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)</span>
        <span>img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)</span>
        <span>csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)</span>
        <span>table: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.table" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.table" @change="forceChartUpdate()">, (default: true)</span>
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
        <span>fullscreen: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.buttonTitles.fullscreen"><input v-else type="text" v-model="mutableConfig.userOptions.buttonTitles.fullscreen">, (default: "Toggle fullscreen")</span>
      </BaseDetails>
    </BaseDetails>
  </BaseDetails>
</code>
               
            </template>
            <template v-slot:tab2>
              <div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">{{ translations.docs.emits.xy.getData[store.lang] }}</div>
    <pre>
    <span class="text-gray-600 dark:text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const scatterChart = ref(null);
            const scatterDataset = ref([]);

            onMounted(() => {
                scatterDataset.value = scatterChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiScatter
                ref="scatterChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-gray-600 dark:text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiScatter
                ref="scatterChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        scatterDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.scatterDataset = this.$refs.scatterChart.getData();
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
            </template>

            <template #tab3>
                <div class="text-gray-500">
                    {{ translations.slots.presentation[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiScatter
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #svg="{ svg }"&gt;
            &lt;circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" /&gt;
        &lt;/template&gt;
    &lt;/VueUiScatter&gt;
</code>
</pre>                    
<div class="text-gray-500">
                    {{ translations.slots.legendDetail[store.lang]  }}
                </div>
<pre>
<code>
    &lt;VueUiScatter
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #legend="{ legend }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiScatter&gt;
</code>
</pre>

<div class="text-gray-500">
    {{ translations.slots.tooltip[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiScatter
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #tooltip-before="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
        &lt;template #tooltip-after="{ datapoint, seriesIndex, series, config }"&gt;
            ...your content here
        &lt;/template&gt;
    &lt;/VueUiScatter&gt;
</code>
</pre> 

<div class="text-gray-500">
    {{ translations.slots.watermark[store.lang]  }}
</div>

<pre>
<code>
    &lt;VueUiScatter
        :config="config"
        :dataset="dataset"
    &gt;
        &lt;template #watermark="{ isPrinting }"&gt;
            &lt;div v-if="isPrinting"&gt;WATERMARK&lt;/div&gt;
        &lt;/template&gt;
    &lt;/VueUiScatter&gt;
</code>
</pre>
            </template>
            <template #tab4>
<pre>
<code>
<span class="text-gray-400">config.style.tooltip.customFormat</span>

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
              <ThemesVueUiScatter />
            </template>

            <template #tab7>
              <ResponsiveUnit>
                <template #chart>
                  <VueUiScatter 
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