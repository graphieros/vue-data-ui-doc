<script setup>
import { ref } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";

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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiGauge</h1>
        <button v-if="!isFixed" @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                    <PinIcon/>
                </button>
        <div class="w-3/4 mx-auto flex flex-row gap-2">
            
            <div :class="`transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
                <button v-if="isFixed" @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                    <PinnedOffIcon/>
                </button>
                <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
                <VueUiGauge :dataset="dataset1" :config="mutableConfig" :key="`gauge_1_${key}`"/>
            </div>
            <div class="transition-all w-1/2">
                <VueUiGauge :dataset="dataset2" :config="mutableConfig" :key="`gauge_2_${key}`"/>
            </div>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_gauge)"><CopyIcon/> Copy default config as JSON</button>
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
            <span class="text-app-green">// Set up the gauge steps:</span>
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
const <span class="text-app-green">dataset</span> = {
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
const <span class="text-app-green">dataset</span> = {
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
                        <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                        <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
                    </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.chart.backgroundColor">,  (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            animation: {
                use: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.animation.use" @change="forceChartUpdate()">, (default: true)
                speed: 1,
                acceleration: 1,
            },
            layout: {
                useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: false)
                track: {
                    size: <input type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.track.size">, (default: 1)
                    useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.track.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: 40,
                },
                markers: {
                    size: <input type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.markers.size">, (default: 1)
                    backgroundColor: <input type="color" v-model="mutableConfig.style.chart.layout.markers.backgroundColor">, (default: "#FFFFFF")
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.markers.color">, (default: "#2D353C")
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.markers.stroke">, (default: "#2D353C")
                    strokeWidth: <input type="number" min="0" max="3" step="0.1" v-model="mutableConfig.style.chart.layout.markers.strokeWidth">, (default: 1)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.markers.bold" @change="forceChartUpdate()">, (default: true)
                    fontSizeRatio: <input type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.markers.fontSizeRatio">, (default: 1)
                    offsetY: <input type="number" min="-30" max="30" step="1" v-model="mutableConfig.style.chart.layout.markers.offsetY">, (default: 0)
                    roundingValue: <input type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.layout.markers.roundingValue">, (default: 0)
                },
                pointer: {
                    size: <input type="number" min="0.5" max="2" step="0.1" v-model="mutableConfig.style.chart.layout.pointer.size">, (default: 1)
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.pointer.stroke">, (default: "#2D353C")
                    strokeWidth: <input type="number" min="0" max="30" step="1" v-model="mutableConfig.style.chart.layout.pointer.strokeWidth">, (default: 12)
                    useRatingColor: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.pointer.useRatingColor" @change="forceChartUpdate()">, (default: true)
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.pointer.color">, (default: "#CCCCCC")
                    circle: {
                        radius: <input type="number" min="0" max="30" step="1" v-model="mutableConfig.style.chart.layout.pointer.circle.radius">, (default: 10),
                        stroke: <input type="color" v-model="mutableConfig.style.chart.layout.pointer.circle.stroke">, (default: "#2D353C")
                        strokeWidth: <input type="number" min="0" max="20" step="0.1" v-model="mutableConfig.style.chart.layout.pointer.circle.strokeWidth">, (default: 2),
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.pointer.circle.color">, (default: "#FFFFFF")
                    }
                }
            },
            legend: {
                fontSize: <input type="number" min="6" max="100" step="1" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 48),
                prefix: <input type="text" v-model="mutableConfig.style.chart.legend.prefix">, (default: "")
                suffix: <input type="text" v-model="mutableConfig.style.chart.legend.suffix">, (default: "")
                roundingValue: <input type="number" min="0" max="3" step="1" v-model="mutableConfig.style.chart.legend.roundingValue">, (default: 0),
                showPlusSymbol: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.showPlusSymbol" @change="forceChartUpdate()">, (default: true)
                useRatingColor: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.useRatingColor" @change="forceChartUpdate()">, (default: true)
                color: <input type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
            },
            title: {
                text: <input type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input type="number" min="6" max="30" step="1" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
        }
    },
    userOptions: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title inside")
        }
    },
    translations: {
        base: <input type="text" v-model="mutableConfig.translations.base">, (default: "Base")
    }
}
</code>
</pre>                
                </div>
            </template>
        </Box>
    </div>

</template>