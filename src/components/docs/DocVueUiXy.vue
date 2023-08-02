<script setup>
import { ref } from "vue";
import Box from "../Box.vue";

const dataset = ref([
    {
        name: "Series 1",
        series: [ -55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        type: "bar",
        color: "rgb(95,139,238)"
    },
    {
        name: "Series 2",
        series: [ 55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],
        type: "line",
        color: "rgb(66,211,146)"
    },
    {
        name: "Series 3",
        series: [ 64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],
        type: "plot",
        color: "rgb(255,100,0)"
    },
]);


const config = ref({
    chart: {
        backgroundColor: "#1A1A1A",
        color: "#c8c8c8",
        height: 300,
        width: 500,
        padding: {
            top:  36,
            right: 12,
            bottom: 36,
            left: 48
        },
        grid: {
            stroke: "#e1e5e8",
            showVerticalLines: false,
            labels: {
                show: true,
                color: "#c8c8c8",
                fontSize: 12,
                axis: {
                    yLabel: "yLabel",
                    xLabel: "xLabel",
                    fontSize: 12
                },
                xAxisLabels: {
                    color: "#c8c8c8",
                    show: true,
                    values: ['JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
                    fontSize: 6,
                }
            }
        },
        legend: {
            show: true,
            color: "#c8c8c8",
            useDiv: true,
            fontSize: 16
        },
        title: {
           show:true,
           text: "Title",
           color: "#c8c8c8",
           fontSize: 20,
           bold: true,
           subtitle: {
            fontSize: 16,
            color: "#c8c8c8",
            text: "Subtitle"
           }
        },
        tooltip: {
            color: "#FFFFFF",
            backgroundColor: "#1A1A1A",
            show: true,
            showValue: true,
            showPercentage: false,
            roundingValue: 0,
            roundingPercentage: 0,
        },
        userOptions: {
            show: true,
            title:"options",
            labels: {
                dataLabels: "Show datalabels",
                titleInside: "Title inside",
                legendInside: "Legend inside",
                showTable: "Show table"
            }
        },
    },
    bar: {
        useGradient: true,
        labels: {
            show: true,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    line: {
        radius: 3,
        useGradient: true,
        strokeWidth: 2,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }

    },
    plot: {
        radius: 3,
        useGradient: true,
        labels: {
            show: false,
            offsetY: -6,
            rounding: 0,
            color: "#c8c8c8",
        }
    },
    table: {
        rounding: 0,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "1px solid #e1e5e8"
        },
        td: {
            backgroundColor: "#1A1A1A",
            color: "#c8c8c8",
            outline: "1px solid #e1e5e8",
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


</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-green mb-12 text-2xl">VueUiXy</h1>
        <div class="w-1/2 mx-auto">
            <VueUiXy :dataset="mutableDataset" :config="mutableConfig" :key="key"/>
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
            series: number[];
            type: "bar" | "line" | "plot";
            color: string;
        },
        {...}
    ]
</code>
</pre>      
            </div>


            Example:
            <div class="w-full overflow-x-auto">
                    
<pre class="break-words">
<code class="break-words">
const <span class="text-app-green">dataset</span> = [
    {
        name: <span class="text-app-blue">"Series 1",</span>
        series: <span class="text-app-blue">[-55, -34, -21, -13, -8, -5, -3, -2, -1, -1, 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],</span>
        type:<span class="text-app-blue"><select v-model="mutableDataset[0].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-blue">"rgb(95,139,238)",</span>
    },
    {
        name: <span class="text-app-green">"Series 2",</span>
        series: <span class="text-app-green">[55, 34, 21, 13, 8, 5, 3, 2, 1, 1, 0, -1, -1, -2, -3, -5, -8, -13, -21, -34, -55],</span>
        type:<span class="text-app-green"><select v-model="mutableDataset[1].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-green">"rgb(66,211,146)"</span>
    },
    {
        name: <span class="text-app-orange">"Series 3",</span>
        series: <span class="text-app-orange">[64, 60, 52, 42, 30, 16, 0, -18, -38, -46, -50, -46, -38, -18, 0, 16, 30, 42, 52, 60, 64],</span>
        type:<span class="text-app-orange"><select v-model="mutableDataset[2].type">
            <option>bar</option>
            <option>line</option>
            <option>plot</option>
        </select>,</span>
        color: <span class="text-app-orange">"rgb(255,100,0)"</span>
    },
];
</code>
</pre>
            </div>
                </template>

            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                    <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">RESET</button>
                    <p class="mt-3 text-gray-400">
                        You can override the css (check out the styles.css in the package)
                    </p>
<pre>
<code>
const <span class="text-app-blue">config</span> = {
        chart: {
            fontFamily: "inherit",
            backgroundColor: <input type="color" v-model="mutableConfig.chart.backgroundColor">, (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.chart.color">, (default:"#000000")
            height: <input type="number" min="50" max="2000" v-model="mutableConfig.chart.height">, (default: 300)
            width: <input type="number" min="50" max="2000" v-model="mutableConfig.chart.width">, (default: 500)
            padding: {
                top: <input type="number" min="0" max="200" v-model="mutableConfig.chart.padding.top">, (default: 36)
                right: <input type="number" min="0" max="200" v-model="mutableConfig.chart.padding.right">, (default: 12)
                bottom: <input type="number" min="0" max="200" v-model="mutableConfig.chart.padding.bottom">, (default: 12)
                left: <input type="number" min="0" max="200" v-model="mutableConfig.chart.padding.left">, (default: 48)
            },
            grid: {
                stroke: <input type="color" v-model="mutableConfig.chart.grid.stroke">, (default: "#E1E5E8"),
                showVerticalLines: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.showVerticalLines"> (default: false)
                labels: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.show">, (default: true)
                    color: <input type="color" v-model="mutableConfig.chart.grid.labels.color">, (default: "#000000"),
                    fontSize: <input type="number" min="1" max="50" v-model="mutableConfig.chart.grid.labels.fontSize">, (default: 12)
                    axis: {
                        yLabel: <input type="text" v-model="mutableConfig.chart.grid.labels.axis.yLabel">, (default: "")
                        xLabel: <input type="text" v-model="mutableConfig.chart.grid.labels.axis.xLabel">, (default: "")
                        fontSize: <input type="number" min="1" max="50" v-model="mutableConfig.chart.grid.labels.axis.fontSize">, (default: 12)
                    },
                    xAxisLabels: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.grid.labels.xAxisLabels.show">, (default: true)
                        color: <input type="color" v-model="mutableConfig.chart.grid.labels.xAxisLabels.color">, (default: "#000000"),
                        fontSize: <input type="number" min="1" max="50" v-model="mutableConfig.chart.grid.labels.xAxisLabels.fontSize">, (default: 6)
                        values: <span class="text-app-blue">string[]</span>,
                    }
                }
            },
            legend: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.legend.show">, (default: true),
                color: <input type="color" v-model="mutableConfig.chart.legend.color">, (default: "#000000"),
                fontSize: <input type="number" min="1" max="50" v-model="mutableConfig.chart.legend.fontSize">, (default: 16)
                useDiv: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.legend.useDiv">, (default: true),
            },
            title: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.title.show">, (default: true)
                text: <input type="text" v-model="mutableConfig.chart.title.text">, (default: "")
                color: <input type="color" v-model="mutableConfig.chart.title.color">, (default: "#000000"),
                fontSize: <input type="number" min="1" max="50" v-model="mutableConfig.chart.title.fontSize">, (default: 20)
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.title.bold">, (default: true)
                subtitle: {
                    fontSize: <input type="number" min="1" max="50" v-model="mutableConfig.chart.title.subtitle.fontSize">, (default: 16)
                    color: <input type="color" v-model="mutableConfig.chart.title.subtitle.color">, (default: "#808080"),
                    text: <input type="text" v-model="mutableConfig.chart.title.subtitle.text">, (default: "")
                }
            },
            tooltip: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.show">, (default: true)
                color: <input type="color" v-model="mutableConfig.chart.tooltip.color">, (default: "#000000"),
                backgroundColor: <input type="color" v-model="mutableConfig.chart.tooltip.backgroundColor">, (default: "#FFFFFF"),
                showValue: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.showValue">, (default: true)
                showPercentage: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.tooltip.showPercentage">, (default: false)
            },
            userOptions: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.chart.userOptions.show">, (default: true)
                title: <input type="text" v-model="mutableConfig.chart.userOptions.title">, (default: "options")
                labels: {
                    dataLabels: <input type="text" v-model="mutableConfig.chart.userOptions.labels.dataLabels">, (default: "Show datalabels")
                    titleInside: <input type="text" v-model="mutableConfig.chart.userOptions.labels.titleInside">, (default: "Title inside")
                    legendInside: <input type="text" v-model="mutableConfig.chart.userOptions.labels.legendInside">, (default: "Legend inside")
                    showTable: <input type="text" v-model="mutableConfig.chart.userOptions.labels.showTable">, (default: "Show table")
                },
            },
        },
        <span class="text-app-green">// use the following for the config of a specific chart type:</span>
        bar: {
            useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.useGradient">, (default: true)
            labels: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.bar.labels.show">, (default: false)
                offsetY: <input type="number" min="-50" max="50" v-model="mutableConfig.bar.labels.offsetY">, (default: -6)
                rounding: <input type="number" min="0" max="5" v-model="mutableConfig.bar.labels.rounding">, (default: 0)
                color: <input type="color" v-model="mutableConfig.bar.labels.color">, (default: "#000000"),
            }
        },
        line: {
            radius: <input type="number" min="0" max="50" v-model="mutableConfig.line.radius">, (default: 3)
            strokeWidth: <input type="number" min="0" max="50" v-model="mutableConfig.line.strokeWidth">, (default: 2)
            labels: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.line.labels.show">, (default: false)
                offsetY: <input type="number" min="-50" max="50" v-model="mutableConfig.line.labels.offsetY">, (default: -6)
                rounding: <input type="number" min="0" max="5" v-model="mutableConfig.line.labels.rounding">, (default: 0)
                color: <input type="color" v-model="mutableConfig.line.labels.color">, (default: "#000000"),
            }
        },
        plot: {
            radius: <input type="number" min="0" max="50" v-model="mutableConfig.plot.radius">, (default: 3)
            labels: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.plot.labels.show">, (default: false)
                offsetY: <input type="number" min="-50" max="50" v-model="mutableConfig.plot.labels.offsetY">, (default: -6)
                rounding: <input type="number" min="0" max="5" v-model="mutableConfig.plot.labels.rounding">, (default: 0)
                color: <input type="color" v-model="mutableConfig.plot.labels.color">, (default: "#000000"),
            }
        },
        table: {
            rounding: <input type="number" min="0" max="3" v-model="mutableConfig.table.rounding">, (default: 0)
            th: {
                backgroundColor: <input type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA"),
                color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C"),
                outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
            },
            td: {
                backgroundColor: <input type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FAFAFA"),
                color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C"),
                outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
            }
        }
    }
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab2>
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">returns the current visible series when selecting / unselecting the legend:</div>
    <pre>
    <code>
    [
        {
            name: string;
            values: number[];
            color: string;
            type: "bar" | "line" | "plot"
        },
        {...}
    ]
    </code>
    </pre>
                <div><code><b>@selectX</b></code></div>
                <div class="text-gray-400 pl-5">returns the current visible series at the selected x index when clicking on the chart :</div>
    <pre>
    <code>
    {
        dataset: [
            {
                name: string;
                value: number;
                color: string;
                type: "bar" | "line" | "plot"
            },
            {...}
        ],
        index: number;
        indexLabel: string;
    }
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

            const xyChart = ref(null);
            const xyDataset = ref([]);

            onMounted(() => {
                xyDataset.value = xyChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXy
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiXy
                ref="xyChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        xyDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.xyDataset = this.$refs.xyChart.getData();
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