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

const dataset1 = ref({
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
            color: "#ff6400"
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee"
        },
        {
            from: 4,
            to: 5,
            color: "#42d392",
        },
    ]
});

const dataset2 = ref({
    base: 21200,
    value: -42,
    series: [
        {
            from: -100,
            to: 0,
            color: "#ff6400"
        },
        {
            from: 0,
            to: 100,
            color: "#42d392",
        },
    ]
});

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#F3F4F6",
            color: "#1A1A1A",
            animation: {
                use: true,
                speed: 1,
                acceleration: 1,
            },
            layout: {
                useDiv: false,
                track: {
                    size: 1,
                    useGradient: true,
                    gradientIntensity: 40,
                },
                markers: {
                    size: 1,
                    color: "#1A1A1A",
                    strokeWidth: 1,
                    stroke: "#1A1A1A",
                    backgroundColor: "#F3F4F6",
                    bold: true,
                    fontSizeRatio: 1,
                    offsetY: 0,
                    roundingValue: 0,
                },
                pointer: {
                    size: 1,
                    stroke: "#1A1A1A",
                    strokeWidth: 12,
                    useRatingColor: true,
                    color: "#1A1A1A",
                    circle: {
                        radius: 10,
                        stroke: "#1A1A1A",
                        strokeWidth: 2,
                        color: "#F3F4F6"
                    }
                }
            },
            legend: {
                fontSize: 48,
                prefix: "",
                suffix: "",
                roundingValue: 1,
                showPlusSymbol: true,
                useRatingColor: true,
                color: "#1A1A1A"
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
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            useDiv: "Title inside",
            showTable: "Show table"
        }
    },
    translations: {
        base: "Base"
    }
});
const darkModeConfig = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            animation: {
                use: true,
                speed: 1,
                acceleration: 1,
            },
            layout: {
                useDiv: false,
                track: {
                    size: 1,
                    useGradient: true,
                    gradientIntensity: 40,
                },
                markers: {
                    size: 1,
                    color: "#CCCCCC",
                    strokeWidth: 1,
                    stroke: "#CCCCCC",
                    backgroundColor: "#1A1A1A",
                    bold: true,
                    fontSizeRatio: 1,
                    offsetY: 0,
                    roundingValue: 0,
                },
                pointer: {
                    size: 1,
                    stroke: "#CCCCCC",
                    strokeWidth: 12,
                    useRatingColor: true,
                    color: "#1A1A1A",
                    circle: {
                        radius: 10,
                        stroke: "#CCCCCC",
                        strokeWidth: 2,
                        color: "#1A1A1A"
                    }
                }
            },
            legend: {
                fontSize: 48,
                prefix: "",
                suffix: "",
                roundingValue: 1,
                showPlusSymbol: true,
                useRatingColor: true,
                color: "#CCCCCC"
            },
            title: {
                text: "Title",
                color: "#E1E5E8",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Subtitle",
                    fontSize: 16,
                    bold: false
                }
            },
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            useDiv: "Title inside",
            showTable: "Show table"
        }
    },
    translations: {
        base: "Base"
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
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
} 

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiGauge</h1>
        <button v-if="!isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PinIcon/>
                </button>
        <div class="w-3/4 mx-auto flex flex-row gap-2">
            
            <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'w-1/2'}`">
                <button v-if="isFixed" @click="fixChart" class="p-2 text-black dark:text-app-green rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <PinnedOffIcon/>
                </button>
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                    <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
                </div>
                <VueUiGauge :dataset="dataset1" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_1_${key}`"/>
            </div>
            <div class="transition-all w-1/2">
                <VueUiGauge :dataset="dataset2" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`gauge_2_${key}`"/>
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green hover:shadow-xl transition-all" @click="copyToClipboard(mainConfig.vue_ui_gauge)"><CopyIcon/> Copy default config as JSON</button>
        </div>
        <Box>
            <template v-slot:tab0>
                Datastructure:
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        base: number; (optional)
        value: number;
        series: [
            <span class="text-gray-600 dark:text-app-green">// Set up the gauge steps:</span>
            {
                from: number;
                to: number;
            },
            {
                from: number;
                to: number;
            },
            {...and so on}
        ]
    }
</code>
</pre>                
                </div>

                Example 1:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = {
    base: 12250,
    value: 4.2,
    series: [
        {
            from: 1,
            to: 3,
            color: "#ff6400"
        },
        {
            from: 3,
            to: 4,
            color: "#5f8bee"
        },
        {
            from: 4,
            to: 5,
            color: "#42d392",
        },
    ]
}
</code>
</pre>                
                </div>
                Example 2:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = {
    base: 21200,
    value: -42,
    series: [
        {
            from: -100,
            to: 0,
            color: "#ff6400"
        },
        {
            from: 0,
            to: 100,
            color: "#42d392",
        },
    ]
}
</code>
</pre>               
                </div>
            </template>
            <template v-slot:tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">RESET</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> Copy this config as JSON</button>
                </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-black dark:text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")
            color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.color"><input v-else type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            animation: {
                use: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.animation.use" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)
                speed: 1,
                acceleration: 1,
            },
            layout: {
                useDiv: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.useDiv" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: false)
                track: {
                    size: <input v-if="isDarkMode" type="number" min="0.5" max="2" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.track.size"><input v-else type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.track.size">, (default: 1)
                    useGradient: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.track.useGradient" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.track.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: 40,
                },
                markers: {
                    size: <input v-if="isDarkMode" type="number" min="0.5" max="2" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.markers.size"><input v-else type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.markers.size">, (default: 1)
                    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.markers.backgroundColor"><input v-else type="color" v-model="mutableConfig.style.chart.layout.markers.backgroundColor">, (default: "#FFFFFF")
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.markers.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.markers.color">, (default: "#2D353C")
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.markers.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.markers.stroke">, (default: "#2D353C")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="3" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.markers.strokeWidth"><input v-else type="number" min="0" max="3" step="0.1" v-model="mutableConfig.style.chart.layout.markers.strokeWidth">, (default: 1)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.markers.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.markers.bold" @change="forceChartUpdate()">, (default: true)
                    fontSizeRatio: <input v-if="isDarkMode" type="number" min="0.5" max="2" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.markers.fontSizeRatio"><input v-else type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.markers.fontSizeRatio">, (default: 1)
                    offsetY: <input v-if="isDarkMode" type="number" min="-30" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.layout.markers.offsetY"><input v-else type="number" min="-30" max="30" step="1" v-model="mutableConfig.style.chart.layout.markers.offsetY">, (default: 0)
                    roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.layout.markers.roundingValue"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.markers.roundingValue">, (default: 0)
                },
                pointer: {
                    size: <input v-if="isDarkMode" type="number" min="0.5" max="2" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.pointer.size"><input v-else type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.pointer.size">, (default: 1)
                    stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.stroke">, (default: "#2D353C")
                    strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.layout.pointer.strokeWidth"><input v-else type="number" min="0" max="30" step="1" v-model="mutableConfig.style.chart.layout.pointer.strokeWidth">, (default: 12)
                    useRatingColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.layout.pointer.useRatingColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.pointer.useRatingColor" @change="forceChartUpdate()">, (default: true)
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.color">, (default: "#CCCCCC")
                    circle: {
                        radius: <input v-if="isDarkMode" type="number" min="0" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.layout.pointer.circle.radius"><input v-else type="number" min="0" max="30" step="1" v-model="mutableConfig.style.chart.layout.pointer.circle.radius">, (default: 10),
                        stroke: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.circle.stroke"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.circle.stroke">, (default: "#2D353C")
                        strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="20" step="0.1" v-model="mutableConfigDarkMode.style.chart.layout.pointer.circle.strokeWidth"><input v-else type="number" min="0" max="20" step="0.1" v-model="mutableConfig.style.chart.layout.pointer.circle.strokeWidth">, (default: 2),
                        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.layout.pointer.circle.color"><input v-else type="color" v-model="mutableConfig.style.chart.layout.pointer.circle.color">, (default: "#FFFFFF")
                    }
                }
            },
            legend: {
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="100" step="1" v-model="mutableConfigDarkMode.style.chart.legend.fontSize"><input v-else type="number" min="6" max="100" step="1" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 48),
                prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.prefix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.prefix">, (default: "")
                suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.legend.suffix"><input v-else type="text" v-model="mutableConfig.style.chart.legend.suffix">, (default: "")
                roundingValue: <input v-if="isDarkMode" type="number" min="0" max="3" step="1" v-model="mutableConfigDarkMode.style.chart.legend.roundingValue"><input v-else type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.legend.roundingValue">, (default: 0),
                showPlusSymbol: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.showPlusSymbol" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.showPlusSymbol" @change="forceChartUpdate()">, (default: true)
                useRatingColor: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.legend.useRatingColor" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.useRatingColor" @change="forceChartUpdate()">, (default: true)
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.legend.color"><input v-else type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
            },
            title: {
                text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.style.chart.title.subtitle.color"><input v-else type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.style.chart.title.subtitle.text"><input v-else type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input v-if="isDarkMode" type="number" min="6" max="30" step="1" v-model="mutableConfigDarkMode.style.chart.title.subtitle.fontSize"><input v-else type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.style.chart.title.subtitle.bold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
        }
    },
    userOptions: {
        show: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.userOptions.show" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.title"><input v-else type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            useDiv: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.userOptions.labels.useDiv"><input v-else type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title inside")
        }
    },
    translations: {
        base: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.translations.base"><input v-else type="text" v-model="mutableConfig.translations.base">, (default: "Base")
    }
}
</code>
</pre>                
                </div>
            </template>
        </Box>
    </div>

</template>