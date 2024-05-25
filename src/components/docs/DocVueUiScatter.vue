<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";

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
  useCssAnimation: true,
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    layout: {
      useDiv: true,
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
          roundingValue: 0
        },
        yAxis: {
          name: "yAxis",
          show: true,
          fontSize: 8,
          color: "#CCCCCC",
          bold: false,
          roundingValue: 0
        }
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
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 12,
      bold: true
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
      suffix: ""
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title & legend inside",
      showTable: "Show table"
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
  useCssAnimation: true,
  style: {
    backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    fontFamily: "inherit",
    layout: {
      useDiv: true,
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
          roundingValue: 0
        },
        yAxis: {
          name: "yAxis",
          show: true,
          fontSize: 8,
          color: "#1A1A1A",
          bold: false,
          roundingValue: 0
        }
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
      show: true,
      backgroundColor: "#F3F4F6",
      color: "#1A1A1A",
      fontSize: 12,
      bold: true
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
      suffix: ""
    }
  },
  userOptions: {
    show: true,
    title: "options",
    labels: {
      useDiv: "Title & legend inside",
      showTable: "Show table"
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

</script>

<template>
    <div>
      <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartScatter" stroke="#42d392" :strokeWidth="1.5" />
            VueUiScatter
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.scatter[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : ''}`">
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
            <VueUiScatter :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_scatter)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-scatter"/>
            <MakerLink to="VueUiScatter"/>
        </div>
        <Box showEmits showSlots showTooltip>
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

<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiScatterConfig</span> = {
  useCssAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useCssAnimation"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useCssAnimation">, (default: true)
  style: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")
    fontFamily: "inherit",
    layout: {
      useDiv: true,
      height: <input v-if="isDarkMode" type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.height"><input v-else type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfig.style.layout.height">, (default: 316)
      width: <input v-if="isDarkMode" type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.width"><input v-else type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfig.style.layout.width">, (default: 512)
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      axis: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.axis.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.axis.show">, (default: true)
        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.axis.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.axis.stroke">, (default: "#e1e5e8")
        strokeWidth: <input v-if="isDarkMode" type="range" min="0" max="12" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.axis.strokeWidth"><input v-else type="range" min="0" max="12" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.axis.strokeWidth">, (default: 1)
      },
      plots: {
        radius: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.radius"><input v-else type="range" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.style.layout.plots.radius">, (default: 2)
        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.plots.stroke">, (default: "#FFFFFF")
        strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="6" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="6" step="0.1" v-model="mutableConfig.style.layout.plots.strokeWidth">, (default: 0.3)
        opacity: <input v-if="isDarkMode" type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.opacity"><input v-else type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.opacity">, (default: 0.6)
        significance: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.show">, (default: true)
          deviationThreshold: <input v-if="isDarkMode" type="range" min="0.1" max="100" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.deviationThreshold"><input v-else type="range" min="0.1" max="100" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.deviationThreshold">, (default: 10)
          opacity: <input v-if="isDarkMode" type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.significance.opacity"><input v-else type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.opacity">, (default: 0.3)
        },
        deviation: {
          translation: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.plots.deviation.translation"><input v-else type="text" v-model="mutableConfig.style.layout.plots.deviation.translation">, (default: "deviation")
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.plots.deviation.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.plots.deviation.roundingValue">, (default: 1)
        },
        giftWrap: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.giftWrap.show">, (default: false)
          strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.layout.plots.giftWrap.strokeWidth">, (default: 1)
          strokeDasharray: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.strokeDasharray"><input v-else type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfig.style.layout.plots.giftWrap.strokeDasharray">, (default: 0)
          fillOpacity: <input v-if="isDarkMode" type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.giftWrap.fillOpacity"><input v-else type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.giftWrap.fillOpacity">, (default: 0.2)
        },
        selectors: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.selectors.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.selectors.show">, (default: true)
            stroke:  <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.stroke">, (default: "#2D353C")
            strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.selectors.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.layout.plots.selectors.strokeWidth">, (default: 0.7)
            strokeDasharray: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.selectors.strokeDasharray"><input v-else type="range" class="accent-app-blue" min="0" max="64" step="0.1" v-model="mutableConfig.style.layout.plots.selectors.strokeDasharray">, (default: 0)
            labels: {
              fontSize: <input v-if="isDarkMode" type="number" min="4" max="32" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.fontSize"><input v-else type="number" min="4" max="32" v-model="mutableConfig.style.layout.plots.selectors.labels.fontSize">, (default: 12)
              color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.color"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.labels.color">, (default: "#2D353C")
              rounding: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.rounding"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.layout.plots.selectors.labels.rounding">, (default: 12)
              bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.selectors.labels.bold">, (default: false)
              showName: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.showName"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.selectors.labels.showName">, (default: true)
              prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.prefix"><input v-else type="text" v-model="mutableConfig.style.layout.plots.selectors.labels.prefix">, (default: "")
              suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.plots.selectors.labels.suffix"><input v-else type="text" v-model="mutableConfig.style.layout.plots.selectors.labels.suffix">, (default: "")
            },
            markers: {
              radius: <input v-if="isDarkMode" type="number" min="0" max="32" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.radius"><input v-else type="number" min="0" max="32" v-model="mutableConfig.style.layout.plots.selectors.markers.radius">, (default: 12)
              stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.stroke"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.markers.stroke">, (default: "#FFFFFF")
              strokeWidth: <input v-if="isDarkMode" type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.strokeWidth"><input v-else type="range" class="accent-app-blue" min="0" max="12" step="0.1" v-model="mutableConfig.style.layout.plots.selectors.markers.strokeWidth">, (default: 0.5)
              fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.plots.selectors.markers.fill"><input v-else type="color" v-model="mutableConfig.style.layout.plots.selectors.markers.fill">, (default: "#2D353C")
            }
        },
      },
      marginalBars: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.show">, (default: false)
        size: 40,
        tranches: <input v-if="isDarkMode" type="number" min="10" max="100" v-model="mutableConfigDarkMode.style.layout.marginalBars.tranches"><input v-else type="number" min="10" max="100" v-model="mutableConfig.style.layout.marginalBars.tranches">, (default: 20)
        opacity: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfigDarkMode.style.layout.marginalBars.opacity"><input v-else type="number" class="accent-app-blue" min="0" max="1" step="0.01" v-model="mutableConfig.style.layout.marginalBars.opacity">, (default: 1)
        fill: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.marginalBars.fill"><input v-else type="color" v-model="mutableConfig.style.layout.marginalBars.fill">, (default: "#2D353C")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.strokeWidth" @change="forceChartUpdate()"><input v-else type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.strokeWidth" @change="forceChartUpdate()">, (default: 1)
        offset: 20,
        borderRadius: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.style.layout.marginalBars.borderRadius"><input v-else type="number" min="0" max="12" v-model="mutableConfig.style.layout.marginalBars.borderRadius">, (default: 2)
        useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.useGradient"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.show">, (default: true)
        showLines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.showLines"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.showLines">, (default: false)
        linesStrokeWidth: <input v-if="isDarkMode" type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.marginalBars.linesStrokeWidth" @change="forceChartUpdate()"><input v-else type="number" min="0.1" max="6" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.marginalBars.linesStrokeWidth" @change="forceChartUpdate()">, (default: 1)
      },
      correlation: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.show">, (default: true)
        strokeDasharray: <input v-if="isDarkMode" type="range" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.strokeDasharray"><input v-else type="range" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.strokeDasharray">, (default: 2)
        strokeWidth: <input v-if="isDarkMode" type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.strokeWidth"><input v-else type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.strokeWidth">, (default: 1)
        label: {
          show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.label.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.show">, (default: true)
          fontSize: <input v-if="isDarkMode" type="number" min="6" max="36" v-model="mutableConfigDarkMode.style.layout.correlation.label.fontSize"><input v-else type="number" min="6" max="36" v-model="mutableConfig.style.layout.correlation.label.fontSize">, (default: 12)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.correlation.label.color"><input v-else type="color" v-model="mutableConfig.style.layout.correlation.label.color">, (default: "#2D353C")
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.label.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.bold">, (default: true)
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.style.layout.correlation.label.roundingValue"><input v-else type="number" min="0" max="5" v-model="mutableConfig.style.layout.correlation.label.roundingValue">, (default: 2)
          useSerieColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.correlation.label.useSerieColor"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.useSerieColor">, (default: true)
        }
      },
      dataLabels: {
        xAxis: {
          name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.name"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.xAxis.name">, (default: "xAxis")
          show: true,
          fontSize: <input v-if="isDarkMode" type="number" min="4" max="32" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.fontSize"><input v-else type="number" min="4" max="32" v-model="mutableConfig.style.layout.dataLabels.xAxis.fontSize">, (default: 8)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold">, (default: false)
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.dataLabels.xAxis.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.dataLabels.xAxis.roundingValue">, (default: 0)
        },
        yAxis: {
            name: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.name"><input v-else type="text" v-model="mutableConfig.style.layout.dataLabels.yAxis.name">, (default: "yAxis")
          show: true,
          fontSize: <input v-if="isDarkMode" type="number" min="4" max="32" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.fontSize"><input v-else type="number" min="4" max="32" v-model="mutableConfig.style.layout.dataLabels.yAxis.fontSize">, (default: 8)
          color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.color"><input v-else type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")
          bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold">, (default: false)
          roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" v-model="mutableConfigDarkMode.style.layout.dataLabels.yAxis.roundingValue"><input v-else type="number" min="0" max="3" v-model="mutableConfig.style.layout.dataLabels.yAxis.roundingValue">, (default: 0)
        }
      }
    },
    title: {
      text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="12" max="64" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="12" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold">, (default: true)
      subtitle: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
        text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
        fontSize: <input v-if="isDarkMode" type="number" min="6" max="48" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
        bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold">, (default: false)
      }
    },
    legend: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show">, (default: true)
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.legend.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.legend.color"><input v-else type="color" v-model="mutableConfig.style.legend.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="24" v-model="mutableConfigDarkMode.style.legend.fontSize"><input v-else type="number" min="6" max="24" v-model="mutableConfig.style.legend.fontSize">, (default: 12)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.legend.bold"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.bold">, (default: true)
    },
    tooltip: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.tooltip.color"><input v-else type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="6" max="24" v-model="mutableConfigDarkMode.style.tooltip.fontSize"><input v-else type="number" min="6" max="24" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
      showShape: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.tooltip.showShape"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.showShape">, (default: true)
      prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.prefix"><input v-else type="text" v-model="mutableConfig.style.tooltip.prefix">, (default: "")
      suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.tooltip.suffix"><input v-else type="text" v-model="mutableConfig.style.tooltip.suffix">, (default: "")
      customFormat: null, // default behavior. To customize content, see 'custom tooltip' tab
    }
  },
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show">, (default: true)
    title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
    labels: {
      useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
      showTable: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.showTable"><input v-else type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
    }
  },
  table: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show">, (default: false)
    responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="0" max="650" v-model="mutableConfigDarkMode.table.responsiveBreakpoint" @change="forceChartUpdate()"><input v-else type="number" min="0" max="650" v-model="mutableConfig.table.responsiveBreakpoint" @change="forceChartUpdate()">, (default: 400)
    th: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.th.color"><input v-else type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
      outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.th.outline"><input v-else type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
    },
    td: {
      backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.td.color"><input v-else type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
      outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.td.outline"><input v-else type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
      roundingValue: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.table.td.roundingValue"><input v-else type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingValue">, (default: 2)
      roundingAverage: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.table.td.roundingAverage"><input v-else type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingAverage">, (default: 1)
    },
    translations: {
      correlationCoefficient: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.correlationCoefficient"><input v-else type="text" v-model="mutableConfig.table.translations.correlationCoefficient">, (default: "Correlation Coef.")
      nbrPlots: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.nbrPlots"><input v-else type="text" v-model="mutableConfig.table.translations.nbrPlots">, (default: Nbr plots")
      average: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.average"><input v-else type="text" v-model="mutableConfig.table.translations.average">, (default: "Average")
      series: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.table.translations.series"><input v-else type="text" v-model="mutableConfig.table.translations.series">, (default: "Series")
    }
  }
}
</code>
</pre>                
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
        </Box>
    </div>
</template>