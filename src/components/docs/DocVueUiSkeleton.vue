<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";

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

const config = ref({
  type: "line",
  style: {
    backgroundColor: "#F3F4F6",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: true,
    sparkline: {
      color: "#C4C4C4",
      strokeWidth: 0.7
    },
    line: {
      axis: {
        show: true,
        color: "#C4C4C4",
        strokeWidth: 0.5
      },
      path: {
        color: "#C4C4C4",
        strokeWidth: 1,
        showPlots: true
      }
    },
    bar: {
      axis: {
        show: true,
        color: "#C4C4C4",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#C4C4C4",
      barWidth: 9
    },
    chestnut: {
      color: "#C4C4C4"
    },
    donut: {
      color: "#C4C4C4",
      strokeWidth: 64
    },
    onion: {
      color: "#C4C4C4"
    },
    gauge: {
      color: "#C4C4C4"
    },
    quadrant: {
      grid: {
        color: "#C4C4C4",
        strokeWidth: 0.5
      },
      plots: {
        radius: 1.5,
        color: "#C4C4C4"
      }
    },
    radar: {
      grid: {
        color: "#C4C4C4",
        strokeWidth: 0.5
      },
      shapes: {
        color: "#C4C4C4"
      }
    },
    waffle: {
      color: "#C4C4C4"
    },
    table: {
      th: {
        color: "#C4C4C4"
      },
      td: {
        color: "#C4C4C4",
        strokeWidth: 0.5
      }
    },
    rating: {
      useSmiley: false,
      color: "#C4C4C4",
      filled: true,
      strokeWidth: 1,
      maxWidth: 200
    },
    verticalBar: {
      axis: {
        show: true,
        color: "#C4C4C4",
        strokeWidth: 0.5
      },
      borderRadius: 0.5,
      color: "#C4C4C4"
    },
    heatmap: {
      cellsX: 26,
      cellsY: 7,
      color: "#C4C4C4"
    },
    candlesticks: {
        axis: {
            show: true,
            color:"#C4C4C4",
            strokeWidth: 0.5
        },
        candle: {
            color:"#C4C4C4",
            strokeWidth: 1
        }
    },
    pyramid: {
      color: "#C4C4C4"
    },
    wheel: {
      color: "#C4C4C4"
    },
    rings: {
      color: "#C4C4C4"
    }
  }
});
const darkModeConfig = ref({
  type: "line",
  style: {
    backgroundColor: "#1A1A1A",
    color: "#CCCCCC",
    maxHeight: 500,
    animated: true,
    sparkline: {
      color: "#5c5c5c",
      strokeWidth: 0.7
    },
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
      useSmiley: false,
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
    },
    wheel: {
      color: "#5c5c5c"
    },
    rings: {
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
    "rings",
    "sparkline",
    "table",
    "verticalBar",
    "waffle",
    "wheel",
]);

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    mutableConfig.value.type = type.value;
    mutableConfigDarkMode.value.type = type.value;
    forceChartUpdate();
}

function forceChartUpdate() {
    key.value += 1;
}

function setType() {
    mutableConfig.value.type = type.value;
    mutableConfigDarkMode.value.type = type.value;
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
            <VueUiIcon name="skeleton" stroke="#42d392" :strokeWidth="1.5" />
            VueUiSkeleton
        </h1>
        <h2 class="text-center text-gray-500">
            {{ translations.docs.comments.skeleton.p1[store.lang] }}<br><br>
        </h2>
        <div class="flex flex-row gap-6 justify-center mt-6 mb-6">
            <select v-model="type" class="h-10 px-2 border border-app-green" @change="setType">
                <option v-for="option in options" :value="option" >
                    {{ option }}
                </option>
            </select>
        </div>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-3/4'}`">
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
            <VueUiSkeleton :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
            <div v-if="[mutableConfig.type, mutableConfigDarkMode.type].includes('rating')" class="mt-4 mx-auto flex flex-row place-items-center justify-center gap-2">
              <input id="useSmiley" v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.rating.useSmiley"><input id="useSmiley" v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.useSmiley" @change="forceChartUpdate()">
              <label for="useSmiley">
                {{ translations.docs.comments.skeleton.smiley[store.lang] }}
              </label>
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_skeleton)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-skeleton"/>
        </div>
        <Box :activeTab="1">
            <template v-slot:tab0>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template v-slot:tab1>
              <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                  TS type: <code class="text-app-blue">VueUiSkeletonConfig</code>
                </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiSkeletonConfig</span> = {
  type: "{{ type }}",
  style: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    maxHeight: 500,
    animated: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animated" @hange="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animated" @hange="forceChartUpdate()">, (default: true)
    line: {
      axis: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.line.axis.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.axis.show">, (default: true)
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.line.axis.color"><input v-else type="color" v-model="mutableConfig.style.line.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.line.axis.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.line.axis.strokeWidth">, (default: 0.5)
      },
      path: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.line.path.color"><input v-else type="color" v-model="mutableConfig.style.line.path.color">, (default: "#e1e5e8")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.line.path.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.line.path.strokeWidth">, (default: 1)
        showPlots: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.line.path.showPlots"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.line.path.showPlots">, (default: true)
      }
    },
    bar: {
      axis: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.bar.axis.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.bar.axis.show">, (default: true)
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bar.axis.color"><input v-else type="color" v-model="mutableConfig.style.bar.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.bar.axis.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.bar.axis.strokeWidth">, (default: 0.5)
      },
      borderRadius: <input v-if="isDarkMode" type="number" min="0" max="5" step="0.1" v-model="mutableConfigDarkMode.style.bar.borderRadius"><input v-else type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.bar.borderRadius">, (default: 0.5)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.bar.color"><input v-else type="color" v-model="mutableConfig.style.bar.color">, (default: "#e1e5e8")
      barWidth: <input v-if="isDarkMode" type="number" min="1" max="11" step="0.1" v-model="mutableConfigDarkMode.style.bar.barWidth"><input v-else type="number" min="1" max="11" step="0.1" v-model="mutableConfig.style.bar.barWidth">, (default: 9)
    },
    chestnut: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chestnut.color"><input v-else type="color" v-model="mutableConfig.style.chestnut.color">, (default: "#e1e5e8")
    },
    donut: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.donut.color"><input v-else type="color" v-model="mutableConfig.style.donut.color">, (default: "#e1e5e8")
      strokeWidth: <input v-if="isDarkMode" type="number" min="10" max="200" v-model="mutableConfigDarkMode.style.donut.strokeWidth"><input v-else type="number" min="10" max="200" v-model="mutableConfig.style.donut.strokeWidth">, (default: 64)
    },
    onion: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.onion.color"><input v-else type="color" v-model="mutableConfig.style.onion.color">, (default: "#E1E5E8")
    },
    gauge: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.gauge.color"><input v-else type="color" v-model="mutableConfig.style.gauge.color">, (default: "#E1E5E8")
    },
    quadrant: {
      grid: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.quadrant.grid.color"><input v-else type="color" v-model="mutableConfig.style.quadrant.grid.color">, (default: "#E1E5E8")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.1" v-model="mutableConfigDarkMode.style.quadrant.grid.strokeWidth"><input v-else type="number" min="0" max="20" step="0.1" v-model="mutableConfig.style.quadrant.grid.strokeWidth">, (default: 0.5)
      },
      plots: {
        radius: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.1" v-model="mutableConfigDarkMode.style.quadrant.plots.radius"><input v-else type="number" min="0" max="20" step="0.1" v-model="mutableConfig.style.quadrant.plots.radius">, (default: 1.5)
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.quadrant.plots.color"><input v-else type="color" v-model="mutableConfig.style.quadrant.plots.color">, (default: "#E1E5E8")
      }
    },
    radar: {
      grid: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.radar.grid.color"><input v-else type="color" v-model="mutableConfig.style.radar.grid.color">, (default: "#E1E5E8")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.radar.grid.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.radar.grid.strokeWidth">, (default: 0.5)
      },
      shapes: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.radar.shapes.color"><input v-else type="color" v-model="mutableConfig.style.radar.shapes.color">, (default: "#E1E5E8")
      }
    },
    waffle: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.waffle.color"><input v-else type="color" v-model="mutableConfig.style.waffle.color">, (default: "#E1E5E8")
    },
    table: {
      th: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.table.th.color"><input v-else type="color" v-model="mutableConfig.style.table.th.color">, (default: "#E1E5E8")
      },
      td: {
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.table.td.color"><input v-else type="color" v-model="mutableConfig.style.table.td.color">, (default: "#E1E5E8"),
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.table.td.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.table.td.strokeWidth">, (default: 0.5)
      }
    },
    rating: {
      useSmiley: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.rating.useSmiley"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.useSmiley" @change="forceChartUpdate()">, (default: false)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rating.color"><input v-else type="color" v-model="mutableConfig.style.rating.color">, (default: "#E1E5E8")
      filled: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.rating.filled" @hange="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.rating.filled">, (default: true)
      strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.rating.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.rating.strokeWidth">, (default: 1)
      maxWidth: <input v-if="isDarkMode" type="number" min="100" v-model="mutableConfigDarkMode.style.rating.maxWidth"><input v-else type="number" min="100" v-model="mutableConfig.style.rating.maxWidth">, (default: 200)
    },
    sparkline: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.sparkline.color"><input v-else type="color" v-model="mutableConfig.style.sparkline.color">, (default: "#E1E5E8")
      strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.sparkline.strokeWidth"><input v-else type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.sparkline.strokeWidth">, (default: 0.7)
    },
    verticalBar: {
      axis: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.verticalBar.axis.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.verticalBar.axis.show">, (default: true)
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.verticalBar.axis.color"><input v-else type="color" v-model="mutableConfig.style.verticalBar.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.verticalBar.axis.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.verticalBar.axis.strokeWidth">, (default: 0.5)
      },
      borderRadius: <input v-if="isDarkMode" type="number" min="0" max="5" step="0.1" v-model="mutableConfigDarkMode.style.verticalBar.borderRadius"><input v-else type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.verticalBar.borderRadius">, (default: 0.5)
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.verticalBar.color"><input v-else type="color" v-model="mutableConfig.style.verticalBar.color">, (default: "#e1e5e8")
    },
    heatmap: {
      cellsX: 26,
      cellsY: 7,
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.heatmap.color"><input v-else type="color" v-model="mutableConfig.style.heatmap.color">, (default: "#e1e5e8")
    },
    candlesticks: {
        axis: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.candlesticks.axis.show"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.candlesticks.axis.show">, (default: true)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.candlesticks.axis.color"><input v-else type="color" v-model="mutableConfig.style.candlesticks.axis.color">, (default: "#e1e5e8")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.candlesticks.axis.strokeWidth"><input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.candlesticks.axis.strokeWidth">, (default: 0.5)
        },
        candle: {
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.candlesticks.candle.color"><input v-else type="color" v-model="mutableConfig.style.candlesticks.candle.color">, (default: "#e1e5e8")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="mutableConfigDarkMode.style.candlesticks.candle.strokeWidth"><input v-else type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.candlesticks.candle.strokeWidth">, (default: 0.5)
        }
    },
    pyramid: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.pyramid.color"><input v-else type="color" v-model="mutableConfig.style.pyramid.color">, (default: "#e1e5e8")
    }
    rings: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.rings.color"><input v-else type="color" v-model="mutableConfig.style.rings.color">, (default: "#e1e5e8")
    }
    wheel: {
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.wheel.color"><input v-else type="color" v-model="mutableConfig.style.wheel.color">, (default: "#e1e5e8")
    }
  }
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>