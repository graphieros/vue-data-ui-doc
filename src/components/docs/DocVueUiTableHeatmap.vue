<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon, InfoTriangleFilledIcon  } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue";

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    }
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const dataset = ref([
    {
        name: "Serie 1",
        values: [20, 30, 40, 50, 40, 30, 20,],
        color: '#1f77b4',
        shape: 'circle'
    },
    {
        name: "Serie 2",
        values: [30, 40, 50, 60, 50, 40, 30,],
        color: '#aec7e8',
        shape: 'triangle'
    },
    {
        name: "Serie 3",
        values: [40, 50, 60, 70, 60, 50, 40,],
        color: '#ff7f0e',
        shape: 'diamond'
    },
    {
        name: "Serie 4",
        values: [50, 60, 70, 80, 70, 60, 50,],
        color: '#ffbb78',
        shape: 'hexagon'
    },
    {
        name: "Serie 5",
        values: [60, 70, 80, 90, 80, 70, 60,],
        color: '#2ca02c',
        shape: 'star'
    },
]);

const config = ref({
    style: {
        backgroundColor: "#F3F4F6",
        color: "#2D353C",
        fontFamily: "inherit",
        shapeSize: 14,
        heatmapColors: {
            useIndividualScale: false,
            min: "#FFFFFF",
            max: "#5f8bee",
        },
    },
    table: {
        responsiveBreakpoint: 300,
        borderWidth: 1,
        showSum: true,
        showAverage: true,
        showMedian: true,
        head: {
            backgroundColor: "#F3F4F6",
            values: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "TOTAL", "AVG", "MED"],
        },
    },
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            fullscreen: true
        }
    },
});

const darkModeConfig = ref({
    style: {
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontFamily: "inherit",
        shapeSize: 14,
        heatmapColors: {
            useIndividualScale: false,
            min: "#FFFFFF",
            max: "#5f8bee",
        },
    },
    table: {
        responsiveBreakpoint: 300,
        borderWidth: 1,
        showSum: true,
        showAverage: true,
        showMedian: true,
        head: {
            backgroundColor: "#1A1A1A",
            values: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "TOTAL", "AVG", "MED"],
        },
    },
    userOptions: {
        show: true,
        buttons: {
            pdf: true,
            img: true,
            csv: true,
            fullscreen: true
        }
    },
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
        <h1
            class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="chartTable" stroke="#42d392" :strokeWidth="1.5" />
            VueUiTableHeatmap
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.tableHeatmap[store.lang] }}
        </p>
        <div
            :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] max-h-[500px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[1200px]'}`">
            <button @click="fixChart"
                class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed" />
                <div v-else class="relative overflow-visible">
                    <PinIcon class="peer overflow-visible" />
                    <div
                        class="text-black dark:text-gray-300 hidden peer-hover:flex left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2 place-items-center absolute z-10 bg-gray-200 shadow-xl dark:bg-black-100 text-xs text-left w-[180px] p-2 rounded">
                        {{ hintPin[store.lang] }}
                    </div>
                </div>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault"
                    class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{
                translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)"
                    class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">
                    <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                </button>
            </div>


            <VueDataUi component="VueUiTableHeatmap" :dataset="dataset"
                :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                <template #caption>
                    <div style="width: 100%; height: 40px" class="pb-8 font-black text-2xl text-left pl-2">
                        TITLE
                    </div>
                </template>

                <template #head="{ value, rowIndex, type }">
                    {{ value }}
                </template>

                <template #rowTitle="{ value, rowIndex, colIndex, type, isResponsive }">
                    <div :style="`height: 40px; display: flex; align-items:center; justify-content: flex-start; padding: 0 6px;font-weight:${isResponsive ? 'bold' : 'normal'}`"
                        class="bg-gray-200 dark:bg-[#2A2A2A] w-full">
                        {{ value }}
                    </div>
                </template>
                <template #cell="{ value, rowIndex, colIndex, type, color, textColor }">
                    <div :style="`height: 40px; display: flex; align-items:center; justify-content: flex-end; padding: 0 6px;background:${color};color:${textColor}`"
                        class="relative">
                        {{ value }}
                    </div>
                </template>
                <template #sum="{ value }">
                    <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                        class="bg-gray-200 dark:bg-[#2A2A2A]">
                        {{ value }}
                    </div>
                </template>
                <template #average="{ value }">
                    <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                        class="bg-gray-200 dark:bg-[#2A2A2A]">
                        {{ value.toFixed(1) }}
                    </div>
                </template>
                <template #median="{ value }">
                    <div style="height:40px; display: flex; text-align:center; align-items:center; justify-content: flex-end; padding: 0 6px;"
                        class="bg-gray-200 dark:bg-[#2A2A2A]">
                        {{ value.toFixed(1) }}
                    </div>
                </template>
            </VueDataUi>


        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button
                class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all"
                @click="copyToClipboard(mainConfig.vue_ui_table_heatmap)">
                <CopyIcon /> {{ translations.docs.copyDefaultConfig[store.lang] }}
            </button>
            <GitHubLink link="vue-ui-table-heatmap" />
            <!-- <MakerLink to="VueUiTableHeatmap"/> -->
        </div>

        <Box showSlots>
            <template #warning>
                <InfoTriangleFilledIcon/>
                {{ translations.slots.warning[store.lang] }}
            </template>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="mt-4">
                    TS type: <code class="text-app-green">VueUiTableHeatmapDatasetItem[]</code>
                    <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
                        <pre>
<code>
    [
        {
            name: string;
            values: Array&lt;number | string&gt;
            color?: string;
            shape?: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star";
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
const <span class="text-black dark:text-app-green">dataset: VueUiTableHeatmapDatasetItem[]</span> = [
    {
        name: "Serie 1",
        values: [20, 30, 40, 50, 40, 30, 20,],
        color: '#1f77b4',
        shape: 'circle'
    },
    {
        name: "Serie 2",
        values: [30, 40, 50, 60, 50, 40, 30,],
        color: '#aec7e8',
        shape: 'triangle'
    },
    {
        name: "Serie 3",
        values: [40, 50, 60, 70, 60, 50, 40,],
        color: '#ff7f0e',
        shape: 'diamond'
    },
    {
        name: "Serie 4",
        values: [50, 60, 70, 80, 70, 60, 50,],
        color: '#ffbb78',
        shape: 'hexagon'
    },
    {
        name: "Serie 5",
        values: [60, 70, 80, 90, 80, 70, 60,],
        color: '#2ca02c',
        shape: 'star'
    },
]
</code>    
</pre>
                    </div>
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault"
                        class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{
                translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)"
                        class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all">
                        <CopyIcon /> {{ translations.docs.copyThisConfig[store.lang] }}
                    </button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiTableHeatmapConfig</code>
                </div>
                <pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiTableHeatmapConfig</span> = {
    style: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.backgroundColor">, (default: "#FFFFFF")
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.color"><input v-else type="color" v-model="mutableConfig.style.color">, (default"#2D353C")
        fontFamily: "inherit",
        shapeSize: <input v-if="isDarkMode" type="number" min="8" max="36" v-model="mutableConfigDarkMode.style.shapeSize"><input v-else type="number" min="8" max="36" v-model="mutableConfig.style.shapeSize">, (default: 14)
        heatmapColors: {
            useIndividualScale: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.heatmapColors.useIndividualScale" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.heatmapColors.useIndividualScale" @change="forceChartUpdate()">, (default: false)
            min: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.heatmapColors.min"><input v-else type="color" v-model="mutableConfig.style.heatmapColors.min">, (default: "#FFFFFF")
            max: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.heatmapColors.max"><input v-else type="color" v-model="mutableConfig.style.heatmapColors.max">, (default: "#5f8bee")
        }
    },
    table: {
        responsiveBreakpoint: 300,
        borderWidth: <input v-if="isDarkMode" type="number" min="0" max="12" v-model="mutableConfigDarkMode.table.borderWidth"><input v-else type="number" min="0" max="12" v-model="mutableConfig.table.borderWidth">, (default: 1)
        showSum: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.showSum" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.showSum" @change="forceChartUpdate()">, (default: false)
        showAverage: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.showAverage" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.showAverage" @change="forceChartUpdate()">, (default: false)
        showMedian: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.table.showMedian" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.showMedian" @change="forceChartUpdate()">, (default: false)
        head: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.table.head.backgroundColor"><input v-else type="color" v-model="mutableConfig.table.head.backgroundColor">, (default: "#FFFFFF")
            values: string[]
        }
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

            <template #tab3>
                <ul class="mb-6">
                    <li>#caption</li>
                    <li>#rowTitle</li>
                    <li>#cell</li>
                    <li>#sum</li>
                    <li>#average</li>
                    <li>#median</li>
                </ul>
                <code class="dark:text-gray-400">
                    &lt;VueUiTableHeatmap<br>
                    &nbsp;&nbsp;:dataset="dataset"<br>
                    &nbsp;&nbsp;:config="config"<br>
                    &gt;<br>

                    &nbsp;&nbsp;&lt;template #caption&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;TITLE&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #head="{ value, rowIndex, type }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #rowTitle="{ value, rowIndex, colIndex, type, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #cell="{ value, rowIndex, colIndex, type, color, textColor, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #sum="{ value, rowIndex, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #average="{ value, rowIndex, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #median="{ value, rowIndex, isResponsive }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<span v-pre>{{ value }}</span>&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>
                    &lt;/VueUiTableHeatmap&gt;
                </code>
            </template>
        </Box>
    </div>
</template>
