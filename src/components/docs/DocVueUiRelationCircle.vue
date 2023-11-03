<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";

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

const dataset = ref([
  {
    id: "01",
    label: "Lorem",
    relations: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
    color: "#eb4034",
  },
  {
    id: "02",
    label: "Ipsum",
    relations: ["01", "03", "07", "06", "07"],
    weights: [3, 2, 9, 7, 1],
    color: "#e0992d",
  },
  {
    id: "03",
    label: "Dolor",
    relations: ["01", "02"],
    weights: [2, 5],
    color: "#decc2c",
  },
  {
    id: "04",
    label: "Consectetur",
    relations: ["01", "05", "10"],
    weights: [2, 1, 4],
    color: "#a8de2a",
  },
  {
    id: "05",
    label: "Amet",
    relations: ["01", "04", "07", "10"],
    weights: [2, 3, 4, 5],
    color: "#5ed622",
  },
  {
    id: "06",
    label: "Rherum",
    relations: ["01", "02"],
    weights: [4, 1],
    color: "#21d92d",
  },
  {
    id: "07",
    label: "Delecta",
    relations: ["01", "02", "08", "12"],
    weights: [4, 8, 2, 1],
    color: "#23d97b",
  },
  {
    id: "08",
    label: "Nitimur",
    relations: ["01", "07", "12", "01"],
    weights: [7, 3, 2, 3],
    color: "#29d6c2",
  },
  {
    id: "09",
    label: "Vetitum",
    relations: ["01"],
    weights: [1],
    color: "#2aacdb",
  },
  {
    id: "10",
    label: "Monumentum",
    relations: ["01", "04", "05"],
    weights: [4, 1, 4],
    color: "#295bd9",
  },
  {
    id: "11",
    label: "Aere",
    relations: ["01"],
    weights: [3],
    color: "#523ed6",
  },
  {
    id: "12",
    label: "Perennius",
    relations: ["01", "07", "08"],
    weights: [8, 1, 1],
    color: "#8235db",
  },
]);

const config = ref({
  style: {
    backgroundColor: "#f3f4f6",
    fontFamily: "inherit",
    size: 400,
    limit: 50,
    animation: {
      show: true,
      speedMs: 300
    },
    labels: {
      color: "#2D353C",
      fontSize: 10
    },
    links: {
      curved: true,
      maxWidth: 3
    },
    circle: {
      radiusProportion: 0.3,
      stroke: "#CCCCCC",
      strokeWidth: 1,
      offsetY: 0
    },
    plot: {
      radius: 2,
      color: "#2D353C"
    },
    title: {
      useDiv: true,
      text: "Title",
      color: "#2D353C",
      fontSize: 20,
      bold: true,
      subtitle: {
        color: "#A1A1A1",
        text: "Subtitle",
        fontSize: 16,
        bold: false
      }
    }
  }
});

const darkModeConfig = ref({
  style: {
    backgroundColor: "#1A1A1A",
    fontFamily: "inherit",
    size: 400,
    limit: 50,
    animation: {
      show: true,
      speedMs: 300
    },
    labels: {
      color: "#CCCCCC",
      fontSize: 10
    },
    links: {
      curved: true,
      maxWidth: 3
    },
    circle: {
      radiusProportion: 0.3,
      stroke: "#565656",
      strokeWidth: 1,
      offsetY: 0
    },
    plot: {
      radius: 2,
      color: "#FAFAFA"
    },
    title: {
      useDiv: true,
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
    }
  }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
    forceChartUpdate();
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiRelationCircle</h1>
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
            <VueUiRelationCircle :dataset="dataset" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_relation_circle)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
        </div>
        <Box>
                <template v-slot:tab0>
                    {{ translations.docs.datastructure[store.lang] }}
                    <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            id: string | number;
            label: string;
            relations: Array&lt;string | number&gt; ; <span class="dark:text-app-green text-gray-500">// {{ translations.docs.comments.relationCircle.relations[store.lang] }}</span>
            weights?: number[]; <span class="dark:text-app-green text-gray-500">// {{ translations.docs.comments.relationCircle.weight[store.lang] }}</span>
            color?: string;
        },
        {...}
    ]
</code>
</pre>              {{ translations.docs.example[store.lang] }} :
                        <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = [
    {
        id: "01",
        label: "Lorem",
        relations: ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        weights: [5, 3, 10, 2, 9, 3, 1, 2, 3, 7, 1],
        color: "#eb4034",
    },
    {
        id: "02",
        label: "Ipsum",
        relations: ["01", "03", "07", "06", "07"],
        weights: [3, 2, 9, 7, 1],
        color: "#e0992d",
    },
    {
        id: "03",
        label: "Dolor",
        relations: ["01", "02"],
        weights: [2, 5],
        color: "#decc2c",
    },
    {
        id: "04",
        label: "Consectetur",
        relations: ["01", "05", "10"],
        weights: [2, 1, 4],
        color: "#a8de2a",
    },
    {
        id: "05",
        label: "Amet",
        relations: ["01", "04", "07", "10"],
        weights: [2, 3, 4, 5],
        color: "#5ed622",
    },
    {
        id: "06",
        label: "Rherum",
        relations: ["01", "02"],
        weights: [4, 1],
        color: "#21d92d",
    },
    {
        id: "07",
        label: "Delecta",
        relations: ["01", "02", "08", "12"],
        weights: [4, 8, 2, 1],
        color: "#23d97b",
    },
    {
        id: "08",
        label: "Nitimur",
        relations: ["01", "07", "12", "01"],
        weights: [7, 3, 2, 3],
        color: "#29d6c2",
    },
    {
        id: "09",
        label: "Vetitum",
        relations: ["01"],
        weights: [1],
        color: "#2aacdb",
    },
    {
        id: "10",
        label: "Monumentum",
        relations: ["01", "04", "05"],
        weights: [4, 1, 4],
        color: "#295bd9",
    },
    {
        id: "11",
        label: "Aere",
        relations: ["01"],
        weights: [3],
        color: "#523ed6",
    },
    {
        id: "12",
        label: "Perennius",
        relations: ["01", "07", "08"],
        weights: [8, 1, 1],
        color: "#8235db",
    }
];
</code>
</pre>                        
                        </div>
                    </div>
                </template>

                <template v-slot:tab1>
                    <div class="flex gap-2">
                        <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                        <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                    </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config</span> = {
    style: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        fontFamily: "inherit",
        size: 400,
        limit: <input v-if="isDarkMode" type="number" min="0" max="1000" step="1" v-model="mutableConfigDarkMode.style.limit" @change="forceChartUpdate"><input v-else type="number" min="0" max="1000" step="1" v-model="mutableConfig.style.limit" @change="forceChartUpdate"> , (default: 50) <span class="dark:text-app-blue text-gray-500">// {{ translations.docs.comments.relationCircle.limit[store.lang] }}</span>
        animation: {
            show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.animation.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.animation.show" @change="forceChartUpdate()">, (default: true)
            speedMs: <input v-if="isDarkMode" type="number" min="0" max="10000" step="50" v-model="mutableConfigDarkMode.style.animation.speedMs" @change="forceChartUpdate"><input v-else type="number" min="0" max="10000" step="50" v-model="mutableConfig.style.animation.speedMs" @change="forceChartUpdate"> , (default: 300)
        },
        labels: {
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.labels.color"><input v-else type="color" v-model="mutableConfig.style.labels.color">, (default: "#2D353C")
            fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.labels.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.labels.fontSize">, (default: 10)
        },
        links: {
            curved: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.links.curved" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.links.curved" @change="forceChartUpdate()">, (default: true)
            maxWidth: 3
        },
        circle: {
            radiusProportion: <input v-if="isDarkMode" type="number" min="0" max="1" step="0.1" v-model="mutableConfigDarkMode.style.circle.radiusProportion" @change="forceChartUpdate"><input v-else type="number" min="0" max="1" step="0.1" v-model="mutableConfig.style.circle.radiusProportion" @change="forceChartUpdate">, (default: 0.2)
            stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.circle.stroke"><input v-else type="color" v-model="mutableConfig.style.circle.stroke">,  (default: "#CCCCCC")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="12" step="0.1" v-model="mutableConfigDarkMode.style.circle.strokeWidth"><input v-else type="number" min="0" max="12" step="0.1" v-model="mutableConfig.style.circle.strokeWidth">, (default: 1)
            offsetY: <input v-if="isDarkMode" type="number" v-model="mutableConfigDarkMode.style.circle.offsetY" @change="forceChartUpdate"><input v-else type="number" v-model="mutableConfig.style.circle.offsetY" @change="forceChartUpdate">, (default: 0)
        },
        plot: {
            radius: <input v-if="isDarkMode" type="number" min="0" max="6" step="0.1" v-model="mutableConfigDarkMode.style.plot.radius"><input v-else type="number" min="0" max="6" step="0.1" v-model="mutableConfig.style.plot.radius">, (default: 2)
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.plot.color"><input v-else type="color" v-model="mutableConfig.style.plot.color">, (default: "#2D353C")
        },
        title: {
            useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.useDiv" @change="forceChartUpdate()">, (default: true)
            text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.text"><input v-else type="text" v-model="mutableConfig.style.title.text">, (default: "")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.color"><input v-else type="color" v-model="mutableConfig.style.title.color">, (default: "#2D353C")
            fontSize: fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.title.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.title.fontSize">, (default: 20)
            bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.bold" @change="forceChartUpdate()">, (default: true)
            subtitle: {
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.title.subtitle.color">, (default: "#A1A1A1")
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.title.subtitle.text">, (default: "")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="42" v-model="mutableConfigDarkMode.style.title.subtitle.fontSize"><input v-else type="number" min="6" max="42" v-model="mutableConfig.style.title.subtitle.fontSize">, (default: 16)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
            }
        }
    }
}
</code>
</pre>                    
                </template>
            </Box>
    </div>
</template>