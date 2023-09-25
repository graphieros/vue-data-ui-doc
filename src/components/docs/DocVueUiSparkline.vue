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

const dataset = ref([
  {
    period: "period 1",
    value: -21.66
  },
  {
    period: "period 2",
    value: -13
  },
  {
    period: "period 3",
    value: -8
  },
  {
    period: "period 4",
    value: -5
  },
  {
    period: "period 5",
    value: -3
  },
  {
    period: "period 6",
    value: -2
  },
  {
    period: "period 7",
    value: -1
  },
  {
    period: "period 8",
    value: -1
  },
  {
    period: "period 9",
    value: 0
  },
  {
    period: "period 10",
    value: 1
  },
  {
    period: "period 11",
    value: 1
  },
  {
    period: "period 12",
    value: 2
  },
  {
    period: "period 13",
    value: 3
  },
  {
    period: "period 14",
    value: 5
  },
  {
    period: "period 15",
    value: 8
  },
  {
    period: "period 16",
    value: 13
  },
  {
    period: "period 17",
    value: 21
  },
]);

const config = ref({
  style: {
    backgroundColor: "#242424",
    fontFamily: "inherit",
    line: {
      color: "#5f8bee",
      strokeWidth: 3
    },
    zeroLine: {
      color: "#505050",
      strokeWidth: 1
    },
    plot: {
      show: true,
      radius: 4,
      stroke: "#FFFFFF",
      strokeWidth: 1
    },
    verticalIndicator: {
      show: true,
      strokeWidth: 1.5
    },
    dataLabel: {
      position: "left",
      fontSize: 48,
      bold: true,
      color: "#CCCCCC",
      roundingValue: 1,
      valueType: "latest"
    },
    title: {
      show: true,
      textAlign: "left",
      color: "#FAFAFA",
      fontSize: 16,
      bold: true,
      text: "Title"
    },
    area: {
      show: true,
      useGradient: true,
      opacity: 30,
      color: "#5f8bee"
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiSparkline</h1>
        <div :class="`pb-6 transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
            <VueUiSparkline :dataset="dataset" :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_sparkline)"><CopyIcon/> Copy default config as JSON</button>
        </div>
        <Box>
            <template v-slot:tab0>
                Datastructure:
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            period: string;
            value: number;
        },
        {...}
    ]
</code>
</pre>          Example:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-app-green">dataset</span> = [
    {
    period: "period 1",
    value: -21.66
  },
  {
    period: "period 2",
    value: -13
  },
  {
    period: "period 3",
    value: -8
  },
  {
    period: "period 4",
    value: -5
  },
  {
    period: "period 5",
    value: -3
  },
  {
    period: "period 6",
    value: -2
  },
  {
    period: "period 7",
    value: -1
  },
  {
    period: "period 8",
    value: -1
  },
  {
    period: "period 9",
    value: 0
  },
  {
    period: "period 10",
    value: 1
  },
  {
    period: "period 11",
    value: 1
  },
  {
    period: "period 12",
    value: 2
  },
  {
    period: "period 13",
    value: 3
  },
  {
    period: "period 14",
    value: 5
  },
  {
    period: "period 15",
    value: 8
  },
  {
    period: "period 16",
    value: 13
  },
  {
    period: "period 17",
    value: 21
  },
]
</code>
</pre>                
                </div>
                </div>
            </template>
            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                  <div class="flex gap-2">
                        <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                        <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
                    </div>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
  style: {
    backgroundColor: <input type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
    fontFamily: "inherit",
    line: {
      color: <input type="color" v-model="mutableConfig.style.line.color"> "#3366cc",
      strokeWidth: <input type="number" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.line.strokeWidth">, (default: 3)
    },
    zeroLine: {
      color: <input type="color" v-model="mutableConfig.style.zeroLine.color">, (default: "#2D353C")
      strokeWidth: <input type="number" min="0.1" max="6" step="0.1" v-model="mutableConfig.style.zeroLine.strokeWidth">, (default: 1)
    },
    plot: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.plot.show">, (default: true)
      radius: <input type="number" min="1" max="20" step="0.1" v-model="mutableConfig.style.plot.radius">, (default: 4)
      stroke: <input type="color" v-model="mutableConfig.style.plot.stroke">, (default: "#FFFFFF")
      strokeWidth: <input type="number" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.plot.strokeWidth">, (default: 1)
    },
    verticalIndicator: {
      show:  <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.verticalIndicator.show">, (default: true)
      strokeWidth: <input type="number" min="0.1" max="10" step="0.1" v-model="mutableConfig.style.verticalIndicator.strokeWidth">, (default: 1.5)
    },
    dataLabel: {
      position: <input type="text" v-model="mutableConfig.style.dataLabel.position">, (default: "left", other option: "right")
      fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.dataLabel.fontSize">, (default: 20)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.dataLabel.bold" @change="forceChartUpdate()">, (default: true)
      color: <input type="color" v-model="mutableConfig.style.dataLabel.color">, (default: "#2D353C")
      roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.dataLabel.roundingValue">, (default: 0)
      valueType: <input type="text" v-model="mutableConfig.style.dataLabel.valueType">, (default: "latest", other options: "sum"; "average")
    },
    title: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.show">, (default: true)
      textAlign: <input type="text" v-model="mutableConfig.style.title.textAlign"> (default: "left", other options: "center"; "right")
      color: <input type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
      fontSize: <input type="number" min="6" max="48" v-model="mutableConfig.style.title.fontSize">, (default: 16)
      bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
      text: <input type="text" v-model="mutableConfig.style.title.text">, (default: "")
    },
    area: {
      show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.area.show">, (default: true)
      useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.area.useGradient">, (default: true)
      opacity: <input type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.area.opacity">, (default: 30)
      color: <input type="color" v-model="mutableConfig.style.area.color">, (default: "#3366cc")
    }
  }
}
</code>
</pre>                    
                </div>
            </template>
        </Box>
    </div>
</template>