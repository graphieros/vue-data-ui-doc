<script setup>
import { ref, watch, nextTick, computed } from "vue";
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

</script>

<template>
    <div class="overflow-x-auto">
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartTable" stroke="#42d392" :strokeWidth="1.5" />
            VueUiTableSparkline
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
            <VueUiTableSparkline :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_table_sparkline)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-table-sparkline"/>
        </div>
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
<pre>
<code>
const <span class="text-app-blue">config: VueUiTableSparklineConfig</span> = {
  customPalette: []; // string[]
  responsiveBreakpoint: <input v-if="isDarkMode" type="number" min="300" max="650" v-model="mutableConfigDarkMode.responsiveBreakpoint"><input v-else type="number" min="300" max="650" v-model="mutableConfig.responsiveBreakpoint">, (default: 500)
  showAverage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showAverage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showAverage" @change="forceChartUpdate()">, (default: true)
  showMedian: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showMedian" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showMedian" @change="forceChartUpdate()">, (default: true)
  showTotal: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showTotal" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showTotal" @change="forceChartUpdate()">, (default: true)
  roundingAverage: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.roundingAverage"><input v-else type="number" min="0" max="5" v-model="mutableConfig.roundingAverage">, (default: 0)
  roundingMedian: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.roundingMedian"><input v-else type="number" min="0" max="5" v-model="mutableConfig.roundingMedian">, (default: 0)
  roundingValues: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.roundingValues"><input v-else type="number" min="0" max="5" v-model="mutableConfig.roundingValues">, (default: 0)
  roundingTotal: <input v-if="isDarkMode" type="number" min="0" max="5" v-model="mutableConfigDarkMode.roundingTotal"><input v-else type="number" min="0" max="5" v-model="mutableConfig.roundingTotal">, (default: 0)
  showSparklines: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.showSparklines" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.showSparklines" @change="forceChartUpdate()">, (default: true)
  fontFamily: "inherit",
  colNames: [], // {{ translations.docs.example[store.lang] }} : ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE"]
  sparkline: {
    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.useGradient" @change="forceChartUpdate()">, (default: true)
    showArea: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.showArea" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.showArea" @change="forceChartUpdate()">, (default: true)
    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.sparkline.strokeWidth"><input v-else type="number" min="0" max="12" v-model="mutableConfig.sparkline.strokeWidth">, (default: 0)
    type: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.sparkline.type"><option>line</option><option>bar</option></select><select v-else v-model="mutableConfig.sparkline.type"><option>line</option><option>bar</option></select>, (default: "line")
    smooth: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.smooth" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.smooth" @change="forceChartUpdate()">, (default: true)
    animation: {
      show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.sparkline.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.sparkline.animation.show" @change="forceChartUpdate()">, (default: true)
      animationFrames: <input v-if="isDarkMode" type="number" min="0" max="1000" v-model="mutableConfigDarkMode.sparkline.animation.animationFrames"><input v-else type="number" min="0" max="1000" v-model="mutableConfig.sparkline.animation.animationFrames">, (default: 360)
    }
  },
  translations: {
    serie: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.serie"><input v-else type="text" v-model="mutableConfig.translations.serie">, (default: "Serie")
    total: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.total"><input v-else type="text" v-model="mutableConfig.translations.total">, (default: "Total")
    average: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.average"><input v-else type="text" v-model="mutableConfig.translations.average">, (default: "Average")
    median: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.median"><input v-else type="text" v-model="mutableConfig.translations.median">, (default: "Median")
    chart: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.chart"><input v-else type="text" v-model="mutableConfig.translations.chart">, (default: "Evolution")
  },
  title: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.title.backgroundColor"><input v-else type="color" v-model="mutableConfig.title.backgroundColor">, (default: "#FFFFFF")
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.title.color"><input v-else type="color" v-model="mutableConfig.title.color">, (default: "#2D353C")
    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title.text"><input v-else type="text" v-model="mutableConfig.title.text">, (default: "")
    fontSize: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableConfigDarkMode.title.fontSize"><input v-else type="number" min="0" max="48" v-model="mutableConfig.title.fontSize">, (default: 18)
    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.title.bold" @change="forceChartUpdate()">, (default: true)
    textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.title.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.title.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "center")
    subtitle: {
      text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.title.subtitle.text">, (default: "")
      color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.title.subtitle.color">, (default: "#2D353C")
      fontSize: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableConfigDarkMode.title.subtitle.fontSize"><input v-else type="number" min="0" max="48" v-model="mutableConfig.title.subtitle.fontSize">, (default: 14)
      bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
    }
  },
  thead: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.thead.backgroundColor"><input v-else type="color" v-model="mutableConfig.thead.backgroundColor">, (default: "#FFFFFF")
    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.thead.color"><input v-else type="color" v-model="mutableConfig.thead.color">, (default: "#2D353C")
    fontSize: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableConfigDarkMode.thead.fontSize"><input v-else type="number" min="0" max="48" v-model="mutableConfig.thead.fontSize">, (default: 14)
    outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.thead.outline"><input v-else type="text" v-model="mutableConfig.thead.outline">, (default: "none")
    textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.thead.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.thead.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")
    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.thead.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.thead.bold" @change="forceChartUpdate()">, (default: false)
  },
  tbody: {
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.tbody.backgroundColor"><input v-else type="color" v-model="mutableConfig.tbody.backgroundColor">, (default: "#FFFFFF")
    color:  <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.tbody.color"><input v-else type="color" v-model="mutableConfig.tbody.color">, (default: "#2D353C")
    fontSize: <input v-if="isDarkMode" type="number" min="0" max="48" v-model="mutableConfigDarkMode.tbody.fontSize"><input v-else type="number" min="0" max="48" v-model="mutableConfig.tbody.fontSize">, (default: 14)
    outline: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.tbody.outline"><input v-else type="text" v-model="mutableConfig.tbody.outline">, (default: "none")
    textAlign: <select v-if="isDarkMode" v-model="mutableConfigDarkMode.tbody.textAlign"><option>left</option><option>center</option><option>right</option></select><select v-else v-model="mutableConfig.tbody.textAlign"><option>left</option><option>center</option><option>right</option></select>, (default: "left")
    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.tbody.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.tbody.bold" @change="forceChartUpdate()">, (default: false)
  },
  userOptions: {
    show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: false)
    buttons: {
        pdf: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.pdf" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.pdf" @change="forceChartUpdate()">, (default: true)
        img: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.img" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.img" @change="forceChartUpdate()">, (default: true)
        csv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.csv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.csv" @change="forceChartUpdate()">, (default: true)
        fullscreen: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.buttons.fullscreen" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.buttons.fullscreen" @change="forceChartUpdate()">, (default: true)
    }
  }
}
</code>
</pre>                
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