<script setup>
import { ref, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";

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
})
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
    color: "#42d392"
  },
  {
    name: "Cluster 2",
    values: scat2.value,
    color: "#ff6400"
  }
]});

const config = ref({
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
      plots: {
        radius: 2,
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
        }
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
      roundingValue: 0
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
    th: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "1px solid #e1e5e8"
    },
    td: {
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      outline: "1px solid #e1e5e8",
      roundingValue: 2,
      roundingAverage: 1
    },
    translations: {
      correlationCoefficient: "Correlation Coef.",
      nbrPlots: "Nbr plots",
      average: "Average"
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}
const key = ref(0);
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
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
} 

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiScatter</h1>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
            <VueUiScatter :dataset="dataset" :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_scatter)"><CopyIcon/> Copy default config as JSON</button>
        </div>
        <Box>
            <template v-slot:tab0>
                Datastructure:
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            color: string; <span class="text-gray-500">// optional. Will default to internal palette if not provided</span>
            values: [
                { 
                    x: number; 
                    y: number; 
                    name: string; <span class="text-gray-500">// optional</span>
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>                
                </div>
                Example:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-app-green">dataset</span> = [
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
                    <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
                </div>

<pre>
<code>
const <span class="text-app-blue">config</span> = {
  style: {
    backgroundColor: <input type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    color: <input type="color" v-model="mutableConfig.style.color">, (default: "#2D353C")
    fontFamily: "inherit",
    layout: {
      useDiv: true,
      height: <input type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfig.style.layout.height">, (default: 316)
      width: <input type="range" min="200" max="1000" class="accent-app-blue" v-model="mutableConfig.style.layout.width">, (default: 512)
      padding: {
        top: 36,
        right: 48,
        bottom: 36,
        left: 48
      },
      axis: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.axis.show">, (default: true)
        stroke: <input type="color" v-model="mutableConfig.style.layout.axis.stroke">, (default: "#e1e5e8")
        strokeWidth: <input type="range" min="0" max="12" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.axis.strokeWidth">, (default: 1)
      },
      plots: {
        radius: <input type="range" class="accent-app-blue" min="0" max="24" step="0.1" v-model="mutableConfig.style.layout.plots.radius">, (default: 2)
        stroke: <input type="color" v-model="mutableConfig.style.layout.plots.stroke">, (default: "#FFFFFF")
        strokeWidth: <input type="range" class="accent-app-blue" min="0" max="6" step="0.1" v-model="mutableConfig.style.layout.plots.strokeWidth">, (default: 0.3)
        opacity: <input type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.opacity">, (default: 0.6)
        significance: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.show">, (default: true)
          deviationThreshold: <input type="range" min="0.1" max="100" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.deviationThreshold">, (default: 10)
          opacity: <input type="range" min="0" max="1" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.plots.significance.opacity">, (default: 0.3)
        },
        deviation: {
          translation: <input type="text" v-model="mutableConfig.style.layout.plots.deviation.translation">, (default: "deviation")
          roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.layout.plots.deviation.roundingValue">, (default: 1)
        }
      },
      correlation: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.show">, (default: true)
        strokeDasharray: <input type="range" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.strokeDasharray">, (default: 2)
        strokeWidth: <input type="range" min="0.1" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.strokeWidth">, (default: 1)
        label: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.show">, (default: true)
          fontSize: <input type="number" min="6" max="36" v-model="mutableConfig.style.layout.correlation.label.fontSize">, (default: 12)
          color: <input type="color" v-model="mutableConfig.style.layout.correlation.label.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.bold">, (default: true)
          roundingValue: <input type="number" min="0" max="5" v-model="mutableConfig.style.layout.correlation.label.roundingValue">, (default: 2)
          useSerieColor: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.correlation.label.useSerieColor">, (default: true)
        }
      },
      dataLabels: {
        xAxis: {
          name: <input type="text" v-model="mutableConfig.style.layout.dataLabels.xAxis.name">, (default: "xAxis")
          show: true,
          fontSize: <input type="number" min="4" max="32" v-model="mutableConfig.style.layout.dataLabels.xAxis.fontSize">, (default: 8)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold">, (default: false)
          roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.layout.dataLabels.xAxis.roundingValue">, (default: 0)
        },
        yAxis: {
            name: <input type="text" v-model="mutableConfig.style.layout.dataLabels.yAxis.name">, (default: "yAxis")
          show: true,
          fontSize: <input type="number" min="4" max="32" v-model="mutableConfig.style.layout.dataLabels.yAxis.fontSize">, (default: 8)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold">, (default: false)
          roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.layout.dataLabels.yAxis.roundingValue">, (default: 0)
        }
      }
    },
    title: {
      text: <input type="text" v-model="mutableConfig.style.title.text">, (default: "")
      color: <input type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input type="number" min="12" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold">, (default: true)
      subtitle: {
        color: <input type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
        text: <input type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
        fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold">, (default: false)
      }
    },
    legend: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show">, (default: true)
      backgroundColor: <input type="color" v-model="mutableConfig.style.legend.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.style.legend.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="24" v-model="mutableConfig.style.legend.fontSize">, (default: 12)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.bold">, (default: true)
    },
    tooltip: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show">, (default: true)
      backgroundColor: <input type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="24" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
    }
  },
  userOptions: {
    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show">, (default: true)
    title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
    labels: {
      useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
      showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
    }
  },
  table: {
    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show">, (default: false)
    th: {
      backgroundColor: <input type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
      color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
      outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
    },
    td: {
      backgroundColor: <input type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
      outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
      roundingValue: <input type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingValue">, (default: 2)
      roundingAverage: <input type="number" min="0" max="5" v-model="mutableConfig.table.td.roundingAverage">, (default: 1)
    },
    translations: {
      correlationCoefficient: <input type="text" v-model="mutableConfig.table.translations.correlationCoefficient">, (default: "Correlation Coef.")
      nbrPlots: <input type="text" v-model="mutableConfig.table.translations.nbrPlots">, (default: Nbr plots")
      average: <input type="text" v-model="mutableConfig.table.translations.average">, (default: "Average")
    }
  }
}
</code>
</pre>                
            </template>
        </Box>
    </div>
</template>