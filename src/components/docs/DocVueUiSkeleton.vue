<script setup>
import { ref } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";

const config = ref({
  type: "line",
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: true,
    line: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      path: {
        color: "#5c5c5c",
        strokeWidth: 1,
        showPlots: true
      }
    },
    bar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#5c5c5c",
      barWidth: 9
    },
    chestnut: {
      color: "#5C5C5C"
    },
    donut: {
      color: "#5c5c5c",
      strokeWidth: 64
    },
    onion: {
      color: "#5c5c5c"
    },
    gauge: {
      color: "#5c5c5c"
    },
    quadrant: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      plots: {
        radius: 1.5,
        color: "#5c5c5c"
      }
    },
    radar: {
      grid: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      shapes: {
        color: "#5c5c5c"
      }
    },
    waffle: {
      color: "#5c5c5c"
    },
    table: {
      th: {
        color: "#5c5c5c"
      },
      td: {
        color: "#5c5c5c",
        strokeWidth: 0.5
      }
    },
    rating: {
      color: "#5c5c5c",
      filled: true,
      strokeWidth: 1,
      maxWidth: 200
    },
    verticalBar: {
      axis: {
        show: true,
        color: "#5c5c5c",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#5c5c5c"
    },
    heatmap: {
      cellsX: 26,
      cellsY: 7,
      color: "#5c5c5c"
    },
    candlesticks: {
        axis: {
            show: true,
            color:"#5c5c5c",
            strokeWidth: 0.5
        },
        candle: {
            color:"#5c5c5c",
            strokeWidth: 1
        }
    },
    pyramid: {
      color: "#5c5c5c"
    }
  }
});

const type = ref("line");

const options = ref([
    "bar",
    "candlesticks",
    "chestnut",
    "donut",
    "gauge",
    "heatmap",
    "line",
    "onion",
    "pyramid",
    "quadrant",
    "radar",
    "rating",
    "table",
    "verticalBar",
    "waffle",
]);

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfig.value.type = type.value;
    forceChartUpdate();
}

const key = ref(0);
function forceChartUpdate() {
    key.value += 1;
}

function setType() {
    mutableConfig.value.type = type.value;
    forceChartUpdate();
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiSkeleton</h1>
        <h2 class="text-center text-gray-500">
            Placeholders while your data is getting fetched.<br><br>
        </h2>
        <div class="flex flex-row gap-6 justify-center mt-6 mb-6">
            <select v-model="type" class="h-10 px-2 border border-app-green" @change="setType">
                <option v-for="option in options" :value="option" >
                    {{ option }}
                </option>
            </select>
        </div>
        <div :class="`transition-all w-3/4 max-w-[600px] mx-auto overflow-visible pb-16 ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
          <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
            <VueUiSkeleton :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_skeleton)"><CopyIcon/> Copy default config as JSON</button>
        </div>
        <Box :activeTab="1">
            <template v-slot:tab0>
                No dataset required.
            </template>
            <template v-slot:tab1>
              <div class="flex gap-2">
                        <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                        <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
                    </div>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
  type: "{{ type }}",
  style: {
    backgroundColor: <input type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    maxHeight: 500,
    animated: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animated" @hange="forceChartUpdate()">, (default: true)
    line: {
      axis: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.axis.show">, (default: true)
        color: <input type="color" v-model="mutableConfig.style.line.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.line.axis.strokeWidth">, (default: 0.5)
      },
      path: {
        color: <input type="color" v-model="mutableConfig.style.line.path.color">, (default: "#e1e5e8")
        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.line.path.strokeWidth">, (default: 1)
        showPlots: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.path.showPlots">, (default: true)
      }
    },
    bar: {
      axis: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.bar.axis.show">, (default: true)
        color: <input type="color" v-model="mutableConfig.style.bar.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.bar.axis.strokeWidth">, (default: 0.5)
      },
      borderRadius: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.bar.borderRadius">, (default: 0.5)
      color: <input type="color" v-model="mutableConfig.style.bar.color">, (default: "#e1e5e8")
      barWidth: <input type="number" min="1" max="11" step="0.1" v-model="mutableConfig.style.bar.barWidth"> 9
    },
    chestnut: {
      color: <input type="color" v-model="mutableConfig.style.chestnut.color">, (default: "#e1e5e8")
    },
    donut: {
      color: <input type="color" v-model="mutableConfig.style.donut.color">, (default: "#e1e5e8")
      strokeWidth: <input type="number" min="10" max="200" v-model="mutableConfig.style.donut.strokeWidth">, (default: 64)
    },
    onion: {
      color: <input type="color" v-model="mutableConfig.style.onion.color">, (default: "#E1E5E8")
    },
    gauge: {
      color: <input type="color" v-model="mutableConfig.style.gauge.color">, (default: "#E1E5E8")
    },
    quadrant: {
      grid: {
        color: <input type="color" v-model="mutableConfig.style.quadrant.grid.color">, (default: "#E1E5E8")
        strokeWidth: <input type="number" min="0" max="20" step="0.1" v-model="mutableConfig.style.quadrant.grid.strokeWidth">, (default: 0.5)
      },
      plots: {
        radius: <input type="number" min="0" max="20" step="0.1" v-model="mutableConfig.style.quadrant.plots.radius">, (default: 1.5)
        color: <input type="color" v-model="mutableConfig.style.quadrant.plots.color">, (default: "#E1E5E8")
      }
    },
    radar: {
      grid: {
        color: <input type="color" v-model="mutableConfig.style.radar.grid.color">, (default: "#E1E5E8")
        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.radar.grid.strokeWidth">, (default: 0.5)
      },
      shapes: {
        color: <input type="color" v-model="mutableConfig.style.radar.shapes.color">, (default: "#E1E5E8")
      }
    },
    waffle: {
      color: <input type="color" v-model="mutableConfig.style.waffle.color">, (default: "#E1E5E8")
    },
    table: {
      th: {
        color: <input type="color" v-model="mutableConfig.style.table.th.color">, (default: "#E1E5E8")
      },
      td: {
        color: <input type="color" v-model="mutableConfig.style.table.td.color">, (default: "#E1E5E8"),
        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.table.td.strokeWidth">, (default: 0.5)
      }
    },
    rating: {
      color: <input type="color" v-model="mutableConfig.style.rating.color">, (default: "#E1E5E8")
      filled: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.filled">, (default: true)
      strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.rating.strokeWidth">, (default: 1)
      maxWidth: <input type="number" min="100" v-model="mutableConfig.style.rating.maxWidth">, (default: 200)
    },
    verticalBar: {
      axis: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.verticalBar.axis.show">, (default: true)
        color: <input type="color" v-model="mutableConfig.style.verticalBar.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.verticalBar.axis.strokeWidth">, (default: 0.5)
      },
      borderRadius: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.verticalBar.borderRadius">, (default: 0.5)
      color: <input type="color" v-model="mutableConfig.style.verticalBar.color">, (default: "#e1e5e8")
    },
    heatmap: {
      cellsX: 26,
      cellsY: 7,
      color: <input type="color" v-model="mutableConfig.style.heatmap.color">, (default: "#e1e5e8")
    },
    candlesticks: {
        axis: {
            show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.candlesticks.axis.show">, (default: true)
            color: <input type="color" v-model="mutableConfig.style.candlesticks.axis.color">, (default: "#e1e5e8")
            strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.candlesticks.axis.strokeWidth">, (default: 0.5)
        },
        candle: {
            color: <input type="color" v-model="mutableConfig.style.candlesticks.candle.color">, (default: "#e1e5e8")
            strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.candlesticks.candle.strokeWidth">, (default: 0.5)
        }
    },
    pyramid: {
      color: <input type="color" v-model="mutableConfig.style.pyramid.color">, (default: "#e1e5e8")
    }
  }
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>