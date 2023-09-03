<script setup>
import {ref} from "vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import Box from "../Box.vue";
import mainConfig from "../../assets/default_configs.json";

    const dataset = ref([
        {
            name: "Serie 1",
            color: "#5f8bee",
            values: [100]
        },
        {
            name: "Serie 2",
            color: "#42d392",
            values: [200]
        },
        {
            name: "Serie 3",
            color: "#ff6400",
            values: [300, 1]
        }
    ]);

    const config = ref({
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                layout: {
                    grid: {
                        size: 20,
                        spaceBetween: 0,
                        vertical: false,
                    },
                    rect: {
                        rounded: true,
                        rounding:2,
                        stroke: "#1A1A1A",
                        strokeWidth: 3,
                        useGradient: true,
                        gradientIntensity: 40,
                    },
                    useDiv: true,
                },
                title: {
                    text: "Title",
                    color: "#FAFAFA",
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        color: "#CCCCCC",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false
                    }
                },
                tooltip: {
                    show: true,
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    fontSize: 14,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
                legend: {
                    show: true,
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    bold: false,
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
            }
        }
    });

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableDataset = ref(JSON.parse(JSON.stringify(dataset.value)));
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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiWaffle</h1>
        <div :class="`transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">RESET</button>
                <button @click="copyToClipboard(config)" class="flex gap-1 text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> Copy this config as JSON</button>
            </div>
            <VueUiWaffle :dataset="dataset" :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_waffle)"><CopyIcon/> Copy default config as JSON</button>
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
            color: string; <span class="text-app-orange">// HEX, RGB, HSL</span>
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
        name: "Series 1",
        color: <input type="color" v-model="mutableDataset[0].color">, 
        values: [100]
    },
    {
        name: "Series 2",
        color: <input type="color" v-model="mutableDataset[1].color">,
        values: [200]
    },
    {
        name: "Series 1",
        color: <input type="color" v-model="mutableDataset[2].color">,
        values: [300, 1]
    },
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
        fontFamily: "inherit",
        chart: {
            backgroundColor: <input type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true) <span class="text-app-blue">// display title & legend outside of the svg</span>
                grid: {
                    size: <input type="number" min="2" max="50" v-model="mutableConfig.style.chart.layout.grid.size">, (default: 20), <span class="text-app-blue">// results in a 20 x 20 grid</span>
                    spaceBetween: <input type="number" min="0" max="5" step="0.1" v-model="mutableConfig.style.chart.layout.grid.spaceBetween">, (default: 0)
                    vertical: <input type="checkbox" v-model="mutableConfig.style.chart.layout.grid.vertical" @change="forceChartUpdate()">, (default: false)
                },
                rect: {
                    rounded: <input type="checkbox" v-model="mutableConfig.style.chart.layout.rect.rounded" change="forceChartUpdate()">, (default: true)
                    rounding: <input type="number" min="0" max="100" step="1" v-model="mutableConfig.style.chart.layout.rect.rounding">, (default: 2),
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.rect.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.rect.strokeWidth">, (default: 2)
                    useGradient: <input type="checkbox" v-model="mutableConfig.style.chart.layout.rect.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.rect.gradientIntensity">, (default: 40)
                },
            },
            title: {
                    color: <input type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                    text: <input type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                    fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                    subtitle: {
                        color: <input type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                        text: <input type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                        fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                    }
                },
                tooltip: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                    color: <input type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                    fontSize: fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                    showValue: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)
                    showPercentage: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)
                    roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue" @change="forceChartUpdate()">, (default: 0)
                    roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
                }
                legend: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                    color: backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                    fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                    roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)
                    roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
                },
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
            backgroundColor: <input type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #E1E5E8")
        },
        td: {
            backgroundColor: <input type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #E1E5E8")
            roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
            roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
        }
    }
}
</code>
</pre>
            </template>

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">returns the current visible series when selecting / unselecting the legend:</div>
    <pre>
    <code>
    [
        {
            name: string;
            value: number;
            color: string;
            proportion: number;
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

            const waffleChart = ref(null);
            const waffleDataset = ref([]);

            onMounted(() => {
                waffleDataset.value = waffleChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiWaffle
                ref="waffleChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        waffleDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.waffleDataset = this.$refs.waffleChart.getData();
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