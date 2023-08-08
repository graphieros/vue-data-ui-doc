<script setup>
import { ref } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon } from "vue-tabler-icons";

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
        name: "Serie 1",
        color: "#ff6400",
        values: [300, 1]
    },
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: true,
            gradientIntensity: 40,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                useDiv: false,
                labels: {
                    dataLabels: {
                        show: true,
                        hideUnderValue: 3,
                    },
                    percentage: {
                        color: "#CCCCCC",
                        bold: true,
                        fontSize: 18
                    },
                    name: {
                        color: "#CCCCCC",
                        bold: false,
                        fontSize: 14,
                    },
                    hollow: {
                        total: {
                            show: true,
                            bold: false,
                            fontSize: 18,
                            color: "#CCCCCC",
                            text:  "Total",
                            offsetY: -16,
                            value: {
                                color: "#CCCCCC",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: -12,
                                rounding: 0,
                            }
                        },
                        average: {
                            show: true,
                            bold: false,
                            fontSize: 18,
                            color: "#CCCCCC",
                            text:  "Average",
                            offsetY: 0,
                            value: {
                                color: "#CCCCCC",
                                fontSize: 18,
                                bold: true,
                                suffix: "",
                                prefix: "",
                                offsetY: 6,
                                rounding: 0,
                            }
                        }
                    }
                },
                donut: {
                    strokeWidth: 64
                },
            },
            legend: {
                    backgroundColor: "#1A1A1A",
                    color: "#CCCCCC",
                    show: true,
                    fontSize: 16,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
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
                color: "#CCCCCC",
                backgroundColor: "#1A1A1A",
                fontSize: 14,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
            }
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            dataLabels: "Show datalabels",
            useDiv: "Title & legend inside",
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        average: "Average",
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
        <h1 class="text-center font-satoshi-bold text-app-green mb-12 text-2xl">VueUiDonut</h1>
        <div :class="`transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <VueUiDonut :dataset="mutableDataset" :config="mutableConfig" :key="key"/>
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
                <div class="w-full overflow-x-auto">
                    <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4">RESET</button>
                    <button @click="copyToClipboard" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">Copy this config as JSON</button>
                </div>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
    style: {
        fontFamily: "inherit",
        chart: {
            useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.useGradient">, (default: true)
            gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.gradientIntensity">, (default: 40)
            backgroundColor: <input type="color" v-model="mutableConfig.style.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.style.chart.color">, (default: "#2D353C")
            layout: {
                useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.useDiv" @change="forceChartUpdate()">, (default: true) <span class="text-app-blue">// display title & legend outside of the svg</span>
                labels: {
                    dataLabels: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                        hideUnderValue: <input type="number" min="0" max="10" v-model="mutableConfig.style.chart.layout.labels.dataLabels.hideUnderValue">, (default: 3) <span class="text-app-blue">// hide datalabels under this value</span>
                    },
                    percentage: {
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.percentage.color">, (default: "#2D353C")
                        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.percentage.bold" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.percentage.fontSize">, (default: 18)
                    },
                    name: {
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.name.color">, (default: "#2D353C")
                        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.name.bold" @change="forceChartUpdate()">, (default: false)
                        fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.name.fontSize">, (default: 14)
                    },
                    hollow: {
                        total: {
                            show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.total.show" @change="forceChartUpdate()">, (default: true)
                            bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.total.bold" @change="forceChartUpdate()">, (default: false)
                            fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.total.fontSize">, (default: 18)
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.total.color">, (default: "#AAAAAA")
                            text: <input type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.total.text">, (default: "Total")
                            offsetY: <input type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.total.offsetY">, (default: 0)
                            value: {
                                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.bold" @change="forceChartUpdate()">, (default: true)
                                fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.fontSize">, (default: 18)
                                color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.color">, (default: "#AAAAAA")
                                offsetY: <input type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.offsetY">, (default: 0)
                                rounding: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.rounding">, (default: 0)
                                suffix: <input type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.suffix">, (default: "")
                                prefix: <input type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.total.value.prefix">, (default: "")
                            }
                        },
                        average: {
                            show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.average.show" @change="forceChartUpdate()">, (default: true)
                            bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.average.bold" @change="forceChartUpdate()">, (default: false)
                            fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.average.fontSize">, (default: 18)
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.average.color">, (default: "#AAAAAA")
                            text: <input type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.average.text">, (default: "Average")
                            offsetY: <input type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.average.offsetY">, (default: 0)
                            value: {
                                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.bold" @change="forceChartUpdate()">, (default: true)
                                fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.fontSize">, (default: 18)
                                color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.color">, (default: "#AAAAAA")
                                offsetY: <input type="number" min="-30" max="30" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.offsetY">, (default: 0)
                                rounding: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.rounding">, (default: 0)
                                suffix: <input type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.suffix">, (default: "")
                                prefix: <input type="text" v-model="mutableConfig.style.chart.layout.labels.hollow.average.value.prefix">, (default: "")
                            }
                        }
                    },
                    donut: {
                        strokeWidth: <input type="number" min="6" max="100" v-model="mutableConfig.style.chart.layout.donut.strokeWidth">, (default: 64)
                    }
                },
                legend: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                    backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                    color: backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                    fontSize: <input type="number" min="6" max="42" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 16)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: false)
                    roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingValue" @change="forceChartUpdate()">, (default: 0)
                    roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.legend.roundingPercentage" @change="forceChartUpdate()">, (default: 0)
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
            }
        }
    },
    userOptions: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            dataLabels: <input type="text" v-model="mutableConfig.userOptions.labels.dataLabels">, (default: "Show datalabels")
            useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
            showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
        }
    },
    translations: {
        total: <input type="text" v-model="mutableConfig.translations.total">, (default: "Total")
        average: <input type="text" v-model="mutableConfig.translations.average">, (default: "Average")
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

            const donutChart = ref(null);
            const donutDataset = ref([]);

            onMounted(() => {
                donutDataset.value = donutChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonut
                ref="donutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiDonut
                ref="donutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        donutDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.donutDataset = this.$refs.donutChart.getData();
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