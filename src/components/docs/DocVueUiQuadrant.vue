<script setup>
import { ref } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";

const dataset = ref([
    {
    name: "Stars",
    shape: "star",
    color: "#5f8bee",
    series: [
      {
        name: "Star 1",
        x: 50,
        y: 50
      },
      {
        name: "Star 2",
        x: -10,
        y: -10
      },
      {
        name: "Star 3",
        x: -15,
        y: 20
      },
      {
        name: "Star 4",
        x: 15,
        y: -20
      },
    ]
  },
  {
    name: "Triangles",
    shape: "triangle",
    color: "#42d392",
    series: [
      {
        name: "Triangle 1",
        x: -50,
        y: -50
      },
      {
        name: "Triangle 2",
        x: 25,
        y: -25
      },
      {
        name: "Triangle 3",
        x: -25,
        y: 25
      },
      {
        name: "Triangle 4",
        x: 10,
        y: 10
      }
    ]
  },
  {
    name: "Hexagons",
    shape: "hexagon",
    color: "#ff6400",
    series: [
      {
        name: "Hexagon 1",
        x: -39,
        y: 39
      },
      {
        name: "Hexagon 2",
        x: -2,
        y: 45
      },
      {
        name: "Hexagon 3",
        x: -15,
        y: 30
      },
    ]
  },
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            height: 512, // change to size only ? impose ?
            width: 512,
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                useDiv: true,
                labels: {
                    quadrantLabels: {
                        show: true,
                        tl: {
                            text: "top left",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                        tr: {
                            text: "top right",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                        br: {
                            text: "bottom right",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                        bl: {
                            text: "bottom left",
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        },
                    },
                    plotLabels: {
                        show: true,
                        fontSize: 10,
                        color: "#CCCCCC",
                        offsetY: 10,
                    },
                    axisLabels: {
                        show: true,
                        fontSize: 14,
                        color: {
                            positive: "#CCCCCC",
                            negative: "#CCCCCC"
                        }
                    }
                },
                grid: {
                    stroke: "#AAAAAA",
                    strokeWidth: 0.5,
                    showArrows: true,
                    graduations: {
                        stroke: "#AAAAAA",
                        strokeWidth: 0.5,
                        show: true,
                        steps: 5,
                        fill: true,
                        color: "#E1E5E8",
                        roundingForce: 10,
                    },
                    xAxis: {
                        min: -100,
                        max: 100,
                        auto: true,
                        name: "xAxis"
                    },
                    yAxis: {
                        min: -100,
                        max: 100,
                        auto: true,
                        name: "yAxis"
                    }
                },
                plots: {
                    radius: 6,
                    outline: true,
                    outlineColor: "#CCCCCC",
                    outlineWidth: 0.5,
                },
                areas: {
                    show: true,
                    opacity: 50,
                    useGradient: true,
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
            tooltip: {
                show: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
                roundingValue: 0,
            },
            legend: {
                show: true,
                bold: true,
                backgroundColor: "#1A1A1A",
                color: "#CCCCCC",
                fontSize: 14,
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
            roundingValue: 0
        }
    },
    userOptions: {
        show: true,
        title: "options",
        labels: {
            useDiv: "Title & legend inside",
            showTable: "Show table",
            showPlotLabels: "Show plot labels"
        }
    },
    translations: {
        category: "Category",
        item: "Item",
        side: "Side"
    }
});

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableDataset  = ref(dataset.value);

function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
}

const key = ref(0);
function forceChartUpdate() {
    key.value += 1;
}

const shapes = ref([
    "circle",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "star"
]);

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
        <h1 class="text-center font-satoshi-bold text-app-blue mb-12 text-2xl">VueUiQuadrant</h1>
        <div :class="`transition-all w-1/2 mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-white bg-[rgb(26,26,26)]' : ''}`">
            <button @click="fixChart" class="p-2 text-app-green rounded-full hover:bg-gray-700">
                <PinnedOffIcon v-if="isFixed"/>
                <PinIcon v-else/>
            </button>
            <VueUiQuadrant :dataset="mutableDataset" :config="mutableConfig" :key="key"/>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-colors" @click="copyToClipboard(mainConfig.vue_ui_quadrant)"><CopyIcon/> Copy default config as JSON</button>
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
            shape: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon" | "star", (default: "circle")
            color: string;
            series: [
                {
                    name: string;
                    x: number;
                    y: number;
                },
                {...}
            ]
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
        name: "Stars",
        shape: <select v-model="mutableDataset[0].shape"><option v-for="shape in shapes" :value="shape">{{ shape }}</option></select>,
        color: <input type="color" v-model="mutableDataset[0].color">,
        series: [
            {
                name: "Star 1",
                x: 50,
                y: 50
            },
            {
                name: "Star 2",
                x: -10,
                y: -10
            },
            {
                name: "Star 3",
                x: -15,
                y: 20
            },
            {
                name: "Star 4",
                x: 15,
                y: -20
            },
        ]
  },
  {
    name: "Triangles",
    shape: <select v-model="mutableDataset[1].shape"><option v-for="shape in shapes" :value="shape">{{ shape }}</option></select>,
    color: <input type="color" v-model="mutableDataset[1].color">,
        series: [
            {
                name: "Triangle 1",
                x: -50,
                y: -50
            },
            {
                name: "Triangle 2",
                x: 25,
                y: -25
            },
            {
                name: "Triangle 3",
                x: -25,
                y: 25
            },
            {
                name: "Triangle 4",
                x: 10,
                y: 10
            }
        ]
  },
  {
    name: "Hexagons",
    shape: <select v-model="mutableDataset[2].shape"><option v-for="shape in shapes" :value="shape">{{ shape }}</option></select>,
    color: <input type="color" v-model="mutableDataset[2].color">,
    series: [
        {
            name: "Hexagon 1",
            x: -39,
            y: 39
        },
        {
            name: "Hexagon 2",
            x: -2,
            y: 45
        },
        {
            name: "Hexagon 3",
            x: -15,
            y: 30
        },
    ]
  },
]
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab1>
                <div class="w-full overflow-x-auto">
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
                labels: {
                    quadrantLabels: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.show" @change="forceChartUpdate()">, (default: true)
                        tl: {
                            text: <input type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.text">, (default: "")
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.color">, (default: "#2D353C")
                            fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.fontSize">, (default: 16)
                            bold: <input type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tr.bold" @change="forceChartUpdate()">, (default: true)
                        },
                        tr: {
                            text: <input type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.text">, (default: "")
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.color">, (default: "#2D353C")
                            fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.fontSize">, (default: 16)
                            bold: <input type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.tl.bold" @change="forceChartUpdate()">, (default: true)
                        },
                        br: {
                            text: <input type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.text">, (default: "")
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.color">, (default: "#2D353C")
                            fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.fontSize">, (default: 16)
                            bold: <input type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.br.bold" @change="forceChartUpdate()">, (default: true)
                        },
                        bl: {
                            text: <input type="text" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.text">, (default: "")
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.color">, (default: "#2D353C")
                            fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.fontSize">, (default: 16)
                            bold: <input type="checkbox" v-model="mutableConfig.style.chart.layout.labels.quadrantLabels.bl.bold" @change="forceChartUpdate()">, (default: true)
                        },
                    },
                    plotLabels: {
                        show: <input type="checkbox" v-model="mutableConfig.style.chart.layout.labels.plotLabels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.plotLabels.fontSize">, (default: 10)
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.labels.plotLabels.color">, (default: "#2D353C") 
                        offsetY: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.plotLabels.offsetY">, (default: 8)
                    },
                    axisLabels: {
                        show: <input type="checkbox" v-model="mutableConfig.style.chart.layout.labels.axisLabels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.layout.labels.axisLabels.fontSize">, (default: 14)
                        color: {
                            positive: <input type="color" v-model="mutableConfig.style.chart.layout.labels.axisLabels.color.positive">,  (default: "#2D353C")
                            negative: <input type="color" v-model="mutableConfig.style.chart.layout.labels.axisLabels.color.negative">,  (default: "#2D353C")
                        }
                    }
                },
                grid: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.grid.stroke">, (default: "#e1e5e8")
                    strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.grid.strokeWidth">, (default: 1.5)
                    showArrows: <input type="checkbox" v-model="mutableConfig.style.chart.layout.grid.showArrows" @change="forceChartUpdate()">, (default: true)
                    graduations: {
                        show: <input type="checkbox" v-model="mutableConfig.style.chart.layout.grid.graduations.show" @change="forceChartUpdate()">, (default: true)
                        stroke: <input type="color" v-model="mutableConfig.style.chart.layout.grid.graduations.stroke">, (default: "#e1e5e8")
                        strokeWidth: <input type="number" min="0" max="10" step="0.1" v-model="mutableConfig.style.chart.layout.grid.graduations.strokeWidth">, (default: 0.5)
                        steps: <input type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.grid.graduations.steps">, (default: 5)
                        fill: <input type="checkbox" v-model="mutableConfig.style.chart.layout.grid.graduations.fill" @change="forceChartUpdate()">, (default: true),
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.grid.graduations.color">, (default: "#e1e5e8")
                        roundingForce: <input type="range" min="0" max="200" v-model="mutableConfig.style.chart.layout.grid.graduations.roundingForce">, (default: 10)
                    },
                    xAxis: {
                        min: <input type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.xAxis.min">, (default: -100) <span class="text-app-blue">// used when auto is false</span>
                        max: <input type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.xAxis.max">, (default: 100) <span class="text-app-blue">// used when auto is false</span>
                        auto: <input type="checkbox" v-model="mutableConfig.style.chart.layout.grid.xAxis.auto" @change="forceChartUpdate()">, (default: true)
                        name: <input type="text" v-model="mutableConfig.style.chart.layout.grid.xAxis.name">, (default: "")
                    },
                    yAxis: {
                        min: <input type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.yAxis.min">, (default: -100) <span class="text-app-blue">// used when auto is false</span>
                        max: <input type="number" step="1" v-model="mutableConfig.style.chart.layout.grid.yAxis.max">, (default: 100) <span class="text-app-blue">// used when auto is false</span>
                        auto: <input type="checkbox" v-model="mutableConfig.style.chart.layout.grid.yAxis.auto" @change="forceChartUpdate()">, (default: true)
                        name: <input type="text" v-model="mutableConfig.style.chart.layout.grid.yAxis.name">, (default: "")
                    }
                },
                plots: {
                    radius: <input type="number" min="1" max="100" v-model="mutableConfig.style.chart.layout.plots.radius">, (default: 6) <span class="text-app-blue">// used when auto is false</span>
                    outline: <input type="checkbox" v-model="mutableConfig.style.chart.layout.plots.outline" @change="forceChartUpdate()">, (default: true)
                    outlineColor: <input type="color" v-model="mutableConfig.style.chart.layout.plots.outlineColor">, (default: "#FFFFFF")
                    outlineWidth: <input type="number" min="0" step="0.1" max="10" v-model="mutableConfig.style.chart.layout.plots.outlineWidth">, (default: 1)
                },
                areas: {
                    show: <input type="checkbox" v-model="mutableConfig.style.chart.layout.areas.show" @change="forceChartUpdate()">, (default: true)
                    opacity: <input type="range" min="0" max="100" v-model="mutableConfig.style.chart.layout.areas.opacity">, (default: 40)
                    useGradient: <input type="checkbox" v-model="mutableConfig.style.chart.layout.areas.useGradient" @change="forceChartUpdate()">, (default: true)
                }
            },
            title: {
                text: <input type="text" v-model="mutableConfig.style.chart.title.text">, (default: "")
                color: <input type="color" v-model="mutableConfig.style.chart.title.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.fontSize">, (default: 20)
                bold: <input type="checkbox" v-model="mutableConfig.style.chart.title.bold" @change="forceChartUpdate()">, (default: true)
                subtitle: {
                    color: <input type="color" v-model="mutableConfig.style.chart.title.subtitle.color">, (default: "#A1A1A1")
                    text: <input type="text" v-model="mutableConfig.style.chart.title.subtitle.text">, (default: "")
                    fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.title.subtitle.fontSize">, (default: 16)
                    bold: <input type="checkbox" v-model="mutableConfig.style.chart.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                }
            },
            tooltip: {
                show: <input type="checkbox" v-model="mutableConfig.style.chart.tooltip.show" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.tooltip.backgroundColor">, (default: "#FFFFFF")
                color: <input type="color" v-model="mutableConfig.style.chart.tooltip.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.tooltip.fontSize">, (default: 14)
                roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.tooltip.roundingValue">, (default: 0)
            },
            legend: {
                show: <input type="checkbox" v-model="mutableConfig.style.chart.legend.show" @change="forceChartUpdate()">, (default: true)
                bold: <input type="checkbox" v-model="mutableConfig.style.chart.legend.bold" @change="forceChartUpdate()">, (default: true)
                backgroundColor: <input type="color" v-model="mutableConfig.style.chart.legend.backgroundColor">, (default: "#FFFFFF")
                color: <input type="color" v-model="mutableConfig.style.chart.legend.color">, (default: "#2D353C")
                fontSize: <input type="number" min="6" max="30" v-model="mutableConfig.style.chart.legend.fontSize">, (default: 14)
            }
        }
    },
    table: {
        show: <input type="checkbox" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        th: {
            backgroundColor: <input type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
            color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
        },
        td: {
            backgroundColor: <input type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF"),
            color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
            roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
        }
    },
    userOptions: {
        show: <input type="checkbox" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            showPlotLabels: <input type="text" v-model="mutableConfig.userOptions.labels.showPlotLabels">, (default: "Show plot labels"),
            useDiv: <input type="text" v-model="mutableConfig.userOptions.labels.useDiv">, (default: "Title & legend inside"),
            showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table"),
        }
    },
    translations: {
        category: <input type="text" v-model="mutableConfig.translations.category">, (default: "Category"),
        item: <input type="text" v-model="mutableConfig.translations.item">, (default: "Item"),
        side: <input type="text" v-model="mutableConfig.translations.side">, (default: "Side"),
    }
}
</code>
</pre>                    
                </div>
            </template>
            
            <template v-slot:tab2>
            
                <div class="overflow-auto">                
                <div><code><b>@selectLegend</b></code></div>
                <div class="text-gray-400 pl-5">returns the current visible categories  with their items when selecting / unselecting the legend:</div>
<pre>
<code>
    [
        {
            color: string;
            name: string;
            shape: "circle" | "triangle" | "square" | "diamond" | "pentagon" | "hexagon"| "star";
            series: [
                {
                    name: string;
                    x: number;
                    y: number;
                    quadrantSide: "tl" | "tr" | "br" | "bl";
                    sideName: string;
                },
                {...}
            ]
        },
        {...}
    ]
</code>
</pre>
                <div class="pt-6 border-t border-gray-700"><code><b>@selectPlot</b></code></div>
                <div class="text-gray-400 pl-5">returns the data of the selected plot on click:</div>    
<pre>
<code>
    {
        category: string;
        itemName: string;
        x: number;
        y: number;
        quadrantSide: "tl" | "tr" | "br" | "bl";
        sideName: string; 
    }
</code>
</pre>
                <div class="pt-6 border-t border-gray-700"><code><b>@selectSide</b></code></div>
                <div class="text-gray-400 pl-5">returns the data of all the plots located on the area on click of a corner label:</div>
<pre>
<code>
    {
        quadrantSide: "tl" | "tr" | "br" | "bl";
        sideName: string;
        items: [
            {
                category: string;
                itemName: string;
                x: number;
                y: number;
            },
            {...}
        ] 
    }
</code>
</pre>
                <div class="pt-6 border-t border-gray-700"><code><b>getData</b></code></div>
                <div class="text-gray-400 pl-5 mb-4">call this method from the parent to get the full formatted dataset.</div>
    <pre>
    <span class="text-app-green">Using composition API:</span>
    <code>
        <span class="text-gray-400">&lt;script setup&gt;</span>
            import { ref, onMounted } from "vue";

            const quadrantChart = ref(null);
            const quadrantDataset = ref([]);

            onMounted(() => {
                quadrantDataset.value = quadrantChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiQuadrant
                ref="quadrantChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiQuadrant
                ref="quadrantChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        quadrantDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.quadrantDataset = this.$refs.quadrantChart.getData();
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