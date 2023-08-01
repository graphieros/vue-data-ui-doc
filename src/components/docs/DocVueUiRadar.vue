<script setup>
import { ref } from "vue";
import Box from "../Box.vue";

const dataset = ref({
  categories: [
    {
      name: "category 1",
      color: "#5f8bee",
    },
    {
      name: "category 2",
      color: "#42d392",
    },
    {
      name: "category 3",
      color: "#ff6400",
    }
],
  series: [
    {
      name: "Serie 1",
      values: [65, 45, 12],
      color: "",
      target: 100
    },
    {
      name: "Serie 2",
      values: [2525, 3472, 4950],
      color: "",
      target: 10000
    },
    {
      name: "Serie 3",
      values: [4.7, 1, 3],
      color: "",
      target: 5
    },
    {
      name: "Serie 4",
      values: [400, 250, 325],
      color: "",
      target: 500
    },
    {
      name: "Serie 5",
      values: [5, 9, 7],
      color: "",
      target: 10
    },
    {
      name: "Serie 6",
      values: [6, 7, 10],
      color: "",
      target: 10
    },
  ]
});

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                useDiv: true,
                plots: {
                    show: true,
                    radius: 2,
                },
                outerPolygon: {
                    stroke: "#6a6b6a",
                    strokeWidth: 1,
                },
                dataPolygon: {
                    strokeWidth: 1,
                    transparent: false,
                    opacity: 50,
                    useGradient: true,
                },
                grid: {
                    show: true,
                    stroke: "#565756",
                    strokeWidth: 0.5,
                    graduations: 5
                },
                labels: {
                    dataLabels: {
                        show: true,
                        fontSize: 12,
                        color: "#CCCCCC"
                    }
                },
            },
            title: {
                text: "Title",
                color: "#e1e5e8",
                fontSize: 20,
                bold: true,
                subtitle: {
                    color: "#A1A1A1",
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
                bold: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingPercentage: 0,
            }
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
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            useDiv: "Title & legend inside",
            showTable: "Show table"
        }
    },
    translations: {
        target: "Target"
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
        <h1 class="text-center font-satoshi-bold text-app-green mb-12 text-2xl">VueUiRadar</h1>
        <div class="w-2/3 mx-auto">
            <VueUiRadar :dataset="mutableDataset" :config="mutableConfig" :key="key"/>
        </div>
        <Box>
            <template v-slot:tab0>
                Datastructure:
                <div class="w-full overflow-x-auto border-b mb-6 border-gray-700">
<pre>
<code>
    {
        categories: [
            {
                name: string;
                color: string; <span class="text-app-orange">// HEX format is required for now</span>
            },
            {...}
        ],
        series: [
            {
                name: string;
                values: number[]; <span class="text-app-green">// must be of same length as categories</span>
                target: number; <span class="text-app-green">// if not used will default to max value</span>
            },
            {...} <span class="text-app-orange">// you must provide at least 3 series to create a polygon</span>
        ]
    }
</code>
</pre>
                </div>

                Example:
                <div class="w-full overflow-x-auto">
<pre>
<code>
const <span class="text-app-green">dataset</span> = {
    categories: [
        {
            name: "category 1",
            color: "#5f8bee"
        },
        {
            name: "category 2",
            color: "#42d392
        },
        {
            name: "category 3",
            color: "#ff6400"
        }
    ],
    <span class="text-app-green">// Each serie can have its own scale using the target attribute,
    // so you can represent all types of data relations (revenue, satisfaction, percentages...)</span>
    series: [
        {
            name: "Serie 1",
            values: [65, 45, 12],
            color: "",
            target: 100
        },
        {
            name: "Serie 2",
            values: [2525, 3472, 4950],
            color: "",
            target: 10000
        },
        {
            name: "Serie 3",
            values: [4.7, 1, 3],
            color: "",
            target: 5
        },
        {
            name: "Serie 4",
            values: [400, 250, 325],
            color: "",
            target: 500
        },
        {
            name: "Serie 5",
            values: [5, 9, 7],
            color: "",
            target: 10
        },
        {
            name: "Serie 6",
            values: [6, 7, 10],
            color: "",
            target: 10
        },
    ]
}
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
                    <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">RESET</button>
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
                plots: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.plots.show" @change="forceChartUpdate()">, (default: true),
                    radius: <input type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.plots.radius">, (default: 2)
                },
                outerPolygon: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.outerPolygon.stroke">, (default: "#CCCCCC") 
                    strokeWidth: <input type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.outerPolygon.strokeWidth">, (default: 1)
                },
                dataPolygon: {
                    strokeWidth: <input type="number" min="0" max="20" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.strokeWidth">, (default: 1)
                    transparent: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.transparent" @change="forceChartUpdate()">, (default: false),
                    opacity: <input type="range" min="0" max="100" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.opacity">, (default: 20)
                    useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.dataPolygon.useGradient" @change="forceChartUpdate()">, (default: true)
                },
                grid: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.show" @change="forceChartUpdate()">, (default: true)
                },
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")
                    strokeWidth: <input type="number" min="0" max="10" step="0.1" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 0.5)
                    graduations: <input type="number" min="0" max="30" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grid.graduations">, (default: 5)
                },
                labels: {
                    dataLabels: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.dataLabels.fontSize">, (default: 12)
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.dataLabels.color">, (default: "#2D353C")
                    }
                },
            },
            title: {
                text: <input type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            tooltip: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                color: <input type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                showValue: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showValue" @change="forceChartUpdate()">, (default: true)
                showPercentage: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.showPercentage" @change="forceChartUpdate()">, (default: true)
                roundingValue: <input type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.roundingValue">, (default: 0)
                roundingPercentage: <input type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.tooltip.roundingPercentage">, (default: 0)
            },
            legend: {
                show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                color: <input type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="50" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)
                roundingPercentage: <input type="number" min="0" max="3" step="1" class="accent-app-blue" v-model="mutableConfig.style.chart.legend.roundingPercentage">, (default: 0)
            }
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
    },
    userOptions: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside")
            showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
        }
    },
    translations: {
        target: <input type="text" v-model="mutableConfig.translations.target">, (default: "Target")
    }
}
</code>
</pre>                    
                </div>
            </template>
        </Box>
    </div>
</template>