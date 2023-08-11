<script setup>
import { ref } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon } from "vue-tabler-icons";

const dataset = ref([
    {
    name: "Serie 1",
    percentage: 21,
    value: 1200,
    color: "#5f8bee",
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 2",
    percentage: 34,
    value: 1000,
    color: "#ff6400",
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 3",
    percentage: 55,
    value: 500,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 4",
    color: "#42d392",
    percentage: 79,
    value: 1280,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 5",
    percentage: 52,
    value: 145,
    prefix: "",
    suffix: "",
    
  },
  {
    name: "Serie 6",
    percentage: 100,
    value: 13,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 7",
    percentage: 54,
    value: 450,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 8",
    percentage: 88,
    value: 202,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 9",
    percentage: 65,
    value: 132,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 10",
    percentage: 75,
    value: 654,
    prefix: "",
    suffix: "",
  },
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            useGradient: false,
            gradientIntensity: 20,
            layout: {
                useDiv: false,
                gutter: {
                    color: "#3A3A3A",
                    width: 0.62,
                },
                track: {
                    width: 0.62,
                },
                labels: {
                    show: true,
                    fontSize: 14,
                    color: "#CCCCCC",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    bold: true,
                    offsetY: 0,
                    offsetX: 0,
                    value: {
                        show: true,
                    },
                    percentage: {
                        show: true,
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
                bold: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingValue: 0,
                roundingPercentage: 0,
            }
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
            roundingValue: 0,
            roundingPercentage: 0
        },
        translations: {
            value: "Value",
            percentage: "Percentage",
            serie: "Serie"
        }
    }
});

const slicer = ref(4);

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)).slice(0,slicer.value));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}

const key = ref(0);
function forceChartUpdate() {
    key.value += 1;
}

function updateDataset() {
    mutableDataset.value = JSON.parse(JSON.stringify(dataset.value.slice(0,slicer.value)));
}

function copyToClipboard() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(mutableConfig.value);
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiOnion</h1>
        <div :class="`transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <VueUiOnion :dataset="mutableDataset" :config="mutableConfig" :key="key"/>
        </div>

        <div class="mt-6 flex flex-col gap-3">
            <label for="player">Show more / less series : </label>
            <input id="player" type="range" :min="1" :max="10" v-model="slicer" @input="updateDataset" class="accent-app-green max-w-[200px]">
        </div>
        <Box showEmits>
            <template v-slot:tab0>
                Datastructure:
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    [
        {
            name: string;
            percentage: number; <span class="text-app-green">// 0 to 100</span>
            value: number; <span class="text-app-green">// optional, used for display</span>
            color: string; <span class="text-app-orange">// HEX, RGB, HSL</span>
            prefix: string; <span class="text-app-green">// optional, used with the value</span>
            suffix: string; <span class="text-app-green">// optional, used with the value</span>
        }
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
        name: "Serie 1",
        percentage: 21,
        value: 1200,
        color: "#5f8bee"
    },
    {
        name: "Serie 2",
        percentage: 34,
        value: 1000,
        color: "#ff6400"
    },
    {
        name: "Serie 3",
        percentage: 55,
        value: 500
    },
    {
        name: "Serie 4",
        color: "#42d392",
        percentage: 79,
        value: 1280
    }
];
</code>
</pre>                
                </div>
            </template>
            <template v-slot:tab1>
                <div class="w-ull overflow-x-auto">
                  <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                    <button @click="copyToClipboard" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">Copy this config as JSON</button>
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
            useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.useGradient" @change="forceChartUpdate()">, (default: false) <span class="text-app-orange">// works best on a white background for now</span>
            gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.gradientIntensity">, (default: 20)
            layout: {
                useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true)
                gutter: {
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.gutter.color">, (default: "#e1e5e8")
                    width: <input type="range" class="accent-app-blue" min="0" max="1" step="0.1" v-model="mutableConfig.style.chart.layout.gutter.width">, (default: 0.62)
                },
                track: {
                    width: <input type="range" class="accent-app-blue" min="0" max="1" step="0.1" v-model="mutableConfig.style.chart.layout.track.width">, (default: 0.62)
                },
                labels: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.show" @change="forceChartUpdate()">, (default: true)
                    fontSize: <input type="number" class="accent-app-blue" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.fontSize">, (default: 14)
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.color">, (default: "#2D353C")
                    roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.roundingValue">, (default: 0)
                    roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.roundingPercentage">, (default: 0)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.bold" @change="forceChartUpdate()">, (default: true)
                    offsetY: <input type="number" v-model="mutableConfig.style.chart.layout.labels.offsetY">, (default: 0)
                    offsetX: <input type="number" v-model="mutableConfig.style.chart.layout.labels.offsetX">, (default: 0)
                    value: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.value.show" @change="forceChartUpdate()">, (default: true)
                    },
                    percentage: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.percentage.show" @change="forceChartUpdate()">, (default: true)
                    }
                }
            },
            title: {
                text: <input type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input type="number" class="accent-app-blue" min="6" max="30" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: "#A1A1A1",
                    text: <input type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input type="number" class="accent-app-blue" min="6" max="30" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            legend: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                color: <input type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                fontSize: <input type="number" class="accent-app-blue" min="6" max="30" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)
                roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage">, (default: 0)
            }
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
            roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
        },
        translations: {
            value: <input type="text" v-model="mutableConfig.table.translations.value">, (default: "Value")
            percentage: <input type="text" v-model="mutableConfig.table.translations.percentage">, (default: "Percentage")
            serie: <input type="text" v-model="mutableConfig.table.translations.serie">, (default: "Serie")
        }
    }
}
</code>
</pre>  
                </div>
            </template>
            <template v-slot:tab2>
                <div><code>@selectLegend</code></div>       
                <div class="text-gray-400 pl-5">returns the current visible series when selecting / unselecting the legend:</div>
<pre>
<code>
[
    {
        color: string;
        id: string;
        name: string;
        path: {
            active: string;
            bgDashArray: string;
            bgDashOffset: string;
            dashArray: sring;
            dashOffset: string;
            fullOffset: number;
        },
        percentage: number;
        prefix: string;
        suffix: string;
        radius: number;
        value: number:
    },
    {...}
]
</code>
</pre>
<div class="pt-4 border-t border-gray-700 overflow-x-auto">
                    <div><code>getData</code></div>
                    <div class="text-gray-400 pl-5 mb-4">call this method from the parent to get the full formatted dataset.</div>
    <pre>
    <span class="text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const onionChart = ref(null);
            const onionDataset = ref([]);

            onMounted(() => {
                onionDataset.value = onionChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiOnion
                ref="onionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiOnion
                ref="onionChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        onionDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.onionDataset = this.$refs.onionChart.getData();
                }
            }
        <span class="text-gray-400">&lt;/script&gt;</span>
    </code>
    </pre>
                </div>
            </template>
        </Box>
    </div>
</template>