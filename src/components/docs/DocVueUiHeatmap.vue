<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

const store = useMainStore();
const key = ref(0);


watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const dataset = computed(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const arr = [];
    const dsLen = 26;
    const serieLen = days.length;
    for (let i = 0; i < serieLen; i += 1) {
        const values = [];
        for (let j = 0; j < dsLen; j += 1) {
        values.push(Math.random()*100)
        }
        arr.push({
            name: `${days[i]}`,
            values
        })
    }
    return arr
});

const config = ref({
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    fontFamily: "inherit",
    layout: {
      useDiv: true,
      padding: {
        top: 36,
        right: 12,
        bottom: 12,
        left: 48
      },
      cells: {
        height: 36,
        value: {
          show: true,
          fontSize: 12,
          bold: false,
          roundingValue: 0,
          color: "#FFFFFF"
        },
        colors: {
          hot: "#ff6400",
          cold: "#5f8bee",
          underlayer: "#1A1A1A"
        },
        spacing: 2,
        selected: {
          border: 2,
          color: "#FFFFFF"
        }
      },
      dataLabels: {
        xAxis: {
          show: true,
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          offsetX: 0,
          offsetY: 0
        },
        yAxis: {
          show: true,
          values: [],
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          offsetY: 0,
          offsetX: 0
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
      bold: true,
      roundingValue: 0
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
      roundingValue: 0
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiHeatmap</h1>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
            <VueUiHeatmap :dataset="dataset" :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_heatmap)"><CopyIcon/> Copy default config as JSON</button>
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
            values: number[];
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
        name: "Mon",
        values: [31, 58, 12, 25, 13]
    },
    {
        name: "Tue",
        values: [3, 12, 7, 9, 15, 27]
    },
    {
        name: "Wed",
        values: [8, 9, 3, 18, 11, 7]
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
      useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.useDiv" @change="forceChartUpdate()">, (default: true)
      padding: {
        top: <input type="number" min="0" v-model="mutableConfig.style.layout.padding.top">, (default: 36)
        right: <input type="number" min="0" v-model="mutableConfig.style.layout.padding.right">, (default: 12)
        bottom: <input type="number" min="0" v-model="mutableConfig.style.layout.padding.bottom">, (default: 12)
        left: <input type="number" min="0" v-model="mutableConfig.style.layout.padding.left">, (default: 48)
      },
      cells: {
        height: <input type="number" min="12" max="100" v-model="mutableConfig.style.layout.cells.height">, (default: 36)
        value: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.cells.value.show" @change="forceChartUpdate()">, (default: false)
          fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.layout.cells.value.fontSize">, (default: 18)
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.cells.value.bold" @change="forceChartUpdate()">, (default: false)
          roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.layout.cells.value.roundingValue">, (default: 0)
          color: <input type="color" v-model="mutableConfig.style.layout.cells.value.color">, (default: "#2D353C")
        },
        colors: {
          hot: <input type="color" v-model="mutableConfig.style.layout.cells.colors.hot">, (default: "#dc3912")
          cold: <input type="color" v-model="mutableConfig.style.layout.cells.colors.cold">, (default: "#3366cc")
          underlayer: "#FFFFFF"
        },
        spacing: <input type="number" min="0" max="28" v-model="mutableConfig.style.layout.cells.spacing">, (default: 2)
        selected: {
          border: <input type="number" min="0" max="12" v-model="mutableConfig.style.layout.cells.selected.border">, (default: 2)
          color: <input type="color" v-model="mutableConfig.style.layout.cells.selected.color">, (default: "#2D353C")
        }
      },
      dataLabels: {
        xAxis: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.show" @change="forceChartUpdate()">, (default: false)
          values: [],
          fontSize: <input type="number" min="4" max="36" v-model="mutableConfig.style.layout.dataLabels.xAxis.fontSize">, (default: 8)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.xAxis.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.xAxis.bold" @change="forceChartUpdate()">, (default: false)
          offsetX: <input type="number" v-model="mutableConfig.style.layout.dataLabels.xAxis.offsetX">, (default: 0)
          offsetY: <input type="number" v-model="mutableConfig.style.layout.dataLabels.xAxis.offsetY">, (default: 0)
        },
        yAxis: {
          show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.show" @change="forceChartUpdate()">, (default: true)
          values: [],
          fontSize: <input type="number" min="4" max="36" v-model="mutableConfig.style.layout.dataLabels.yAxis.fontSize">, (default: 8)
          color: <input type="color" v-model="mutableConfig.style.layout.dataLabels.yAxis.color">, (default: "#2D353C")
          bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.layout.dataLabels.yAxis.bold" @change="forceChartUpdate()">, (default: false)
          offsetX: <input type="number" v-model="mutableConfig.style.layout.dataLabels.yAxis.offsetX">, (default: 0)
          offsetY: <input type="number" v-model="mutableConfig.style.layout.dataLabels.yAxis.offsetY">, (default: 0)
        }
      }
    },
    title: {
      text: <input type="text" v-model="mutableConfig.style.title.text">, (default: "")
      color: <input type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="64" v-model="mutableConfig.style.title.fontSize">, (default: 20)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
      subtitle: {
        color: <input type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
        text: <input type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
        fontSize: <input type="number" min="6" max="64" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
      }
    },
    legend: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.show" @change="forceChartUpdate()">, (default: true)
      backgroundColor: <input type="color" v-model="mutableConfig.style.legend.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.style.legend.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="36" v-model="mutableConfig.style.legend.fontSize">, (default: 12)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.legend.bold" @change="forceChartUpdate()">, (default: true)
      roundingValue: <input type="number" min="0"  max="3" v-model="mutableConfig.style.legend.roundingValue">, (default: 0)
    },
    tooltip: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.tooltip.show" @change="forceChartUpdate()">, (default: true)
      backgroundColor: <input type="color" v-model="mutableConfig.style.tooltip.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.style.tooltip.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="36" v-model="mutableConfig.style.tooltip.fontSize">, (default: 14)
      roundingValue: <input type="number" min="0"  max="3" v-model="mutableConfig.style.tooltip.roundingValue">, (default: 0)
    }
  },
  userOptions: {
    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
    title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
    labels: {
      useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
      showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
    }
  },
  table: {
    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
    th: {
      backgroundColor: <input type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
      color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
      outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
    },
    td: {
      backgroundColor: <input type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
      color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
      outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
      roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
    }
  }
}
</code>
</pre>                
            </template>
        </Box>
    </div>
</template>