<script setup>
import { ref } from "vue";
import Box from "../Box.vue";

const dataset = ref([
    {
    name: "Root1",
    color: "#ff6400",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
            color: "#F17171"
          },
          {
            name: "break 1.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 1.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
            color: "#F17171"
          },
          {
            name: "break 1.2.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 1.2.3",
            value: 70,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 1.3.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 1.3.3",
            value: 75,
            color: "#42d392"
          },
        ]
      },

    ]
  },
  {
    name: "Root2",
    color: "#5f8bee",
    branches: [
      {
        name: "branch 2.1",
        value: 200,
        breakdown: [
          {
            name: "break 2.1.1",
            value: 150,
            color: "#F17171"
          },
          {
            name: "break 2.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 2.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.2",
        value: 300,
        breakdown: [
          {
            name: "break 2.2.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 2.2.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 2.2.3",
            value: 150,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 2.3",
        value: 125,
        breakdown: [
          {
            name: "break 2.3.1",
            value: 80,
            color: "#F17171"
          },
          {
            name: "break 2.3.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 2.3.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
    ]
  },
  {
    name: "Root3",
    color: "#42d392",
    branches: [
      {
        name: "branch 3.1",
        value: 120,
        breakdown: [
          {
            name: "break 3.1.1",
            value: 100,
            color: "#F17171"
          },
          {
            name: "break 3.1.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 3.1.3",
            value: 10,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.2",
        value: 90,
        breakdown: [
          {
            name: "break 3.2.1",
            value: 30,
            color: "#F17171"
          },
          {
            name: "break 3.2.2",
            value: 30,
            color: "#ffc800"
          },
          {
            name: "break 3.2.3",
            value: 40,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 3.3",
        value: 390,
        breakdown: [
          {
            name: "break 3.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 3.3.2",
            value: 200,
            color: "#ffc800"
          },
          {
            name: "break 3.3.3",
            value: 100,
            color: "#42d392"
          },
        ]
      }
    ]
  },
]);

const config = ref({
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            layout: {
                grandTotal: {
                    show: true,
                    fontSize: 20,
                    bold: true,
                    suffix: "",
                    prefix: "",
                    roundingValue: 0,
                    color: "#CCCCCC",
                    text: "Grand total",
                    offsetY: 0,
                },
                roots: {
                    stroke: "#1A1A1A",
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        fontSize: 16,
                        adaptColorToBackground: true,
                        color: "#CCCCCC",
                        bold: true,
                        roundingValue: 0,
                        prefix: "",
                        suffix: "",
                        name: {
                            color: "#CCCCCC",
                            fontSize: 16,
                            bold: true,
                        }
                    }
                },
                verticalSeparator: {
                    stroke: "#1A1A1A",
                    strokeWidth: 5,
                },
                links: {
                    opacity: 20,
                },
                branches: {
                    stroke: "#1A1A1A",
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 30,
                    underlayerColor: "#1A1A1A",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        fontSize: 14,
                        color: "#CCCCCC",
                        bold: true,
                        dataLabels: {
                            show: true,
                            hideUnderValue: 5,
                            fontSize: 14,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "",
                            suffix: "",
                        }
                    }
                },
                nuts: {
                    offsetX: 20,
                    useGradient: true,
                    gradientIntensity: 30,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 40,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: "#CCCCCC",
                                fontSize: 12,
                                bold: false,
                                prefix: "",
                                suffix: ""
                            },
                            core: {
                                total: {
                                    color: "#CCCCCC",
                                    fontSize: 24,
                                    bold: false,
                                },
                                value: {
                                    color: "#FAFAFA",
                                    fontSize: 24,
                                    bold: true,
                                    prefix: "",
                                    suffix: ""
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: 16,
                    color: "#CCCCCC",
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "",
                    suffix: ""
                },
                title: {
                    color: "#FAFAFA",
                    fontSize: 20,
                    text: "Title",
                    bold: true,
                    offsetY:0,
                    subtitle: {
                        text: "Subtitle",
                        color: "#CCCCCC",
                        bold: false,
                        fontSize: 16,
                        offsetY: 0,
                    }
                }
            }
        }
    },
    table: {
        show: false,
        th: {
            backgroundColor: "#1A1A1A",
            color: "#CCCCCC",
            outline: "1px solid #e1e5e8",
            translations: {
                rootName: "root name",
                rootValue: "root value",
                rootToTotal: "%/total",
                branchName: "branch name",
                branchValue: "branch value",
                branchToRoot: "%/root",
                branchToTotal: "%/total",
                nutName: "nut name",
                nutValue: "nut value",
                nutToBranch: "%/branch",
                nutToRoot: "%/root",
                nutToTotal: "%/total"
            }
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
            showTable: "Show table"
        }
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of"
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

</script>

<template>
    <div>
        <h1 class="text-center font-satoshi-bold text-app-green mb-12 text-2xl">VueUiChestnut</h1>
        <div class="w-3/4 mx-auto overflow-visible pb-16">
            <VueUiChestnut :dataset="dataset" :config="mutableConfig" :key="key"/>
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
            color: string; <span class="text-app-green">// will default to internal palette if not provided</span>
            branches: [
                {
                    name: string;
                    value: number;
                    breakdown: [
                        {
                            name: string;
                            value: string;
                            color: string; <span class="text-app-green">// will default to internal palette if not provided</span>
                        },
                        {...}
                    ]
                },
                {...}
            ]
        }
    ]
</code>
</pre>                
                </div>

                Example:
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-app-green">dataset</span> = [
    {
    name: "Root1",
    color: "#ff6400",
    branches: [
      {
        name: "branch 1.1",
        value: 200,
        breakdown: [
          {
            name: "break 1.1.1",
            value: 50,
            color: "#F17171"
          },
          {
            name: "break 1.1.2",
            value: 25,
            color: "#ffc800"
          },
          {
            name: "break 1.1.3",
            value: 25,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.2",
        value: 100,
        breakdown: [
          {
            name: "break 1.2.1",
            value: 10,
            color: "#F17171"
          },
          {
            name: "break 1.2.2",
            value: 20,
            color: "#ffc800"
          },
          {
            name: "break 1.2.3",
            value: 70,
            color: "#42d392"
          },
        ]
      },
      {
        name: "branch 1.3",
        value: 175,
        breakdown: [
          {
            name: "break 1.3.1",
            value: 90,
            color: "#F17171"
          },
          {
            name: "break 1.3.2",
            value: 10,
            color: "#ffc800"
          },
          {
            name: "break 1.3.3",
            value: 75,
            color: "#42d392"
          },
        ]
      },
    ]
  },
  {...and so on}
]
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab1>
                <div class="w-ull overflow-x-auto">
                    <button @click="resetDefault" class="text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue">RESET</button>
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
            layout: {
                grandTotal: {
                    show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grandTotal.show" @change="forceChartUpdate()">, (default: true)
                    fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.grandTotal.fontSize">, (default: 20)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.grandTotal.bold" @change="forceChartUpdate()">, (default: true)
                    prefix: <input type="text" v-model="mutableConfig.style.chart.layout.grandTotal.prefix">, (default: "")
                    suffix: <input type="text" v-model="mutableConfig.style.chart.layout.grandTotal.suffix">, (default: "")
                    roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.grandTotal.roundingValue">, (default: 0)
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.grandTotal.color">, (default: "#2D353C")
                    text: <input type="text" v-model="mutableConfig.style.chart.layout.grandTotal.text">, (default: "Grand total")
                    offsetY: <input type="number" v-model="mutableConfig.style.chart.layout.grandTotal.offsetY">, (default: 0)
                },
                roots: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.roots.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input type="number" min="0" max="50" v-model="mutableConfig.style.chart.layout.roots.strokeWidth">, (default: 5)
                    useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.roots.gradientIntensity">, (default: 20)
                    unerlayerColor: <input type="color" v-model="mutableConfig.style.chart.layout.roots.underlayerColor">, (default: "#FFFFFF")
                    labels: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.roots.labels.fontSize">, (default: 16)
                        adaptColorToBackground: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.adaptColorToBackground" @change="forceChartUpdate()">, (default: true)
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.roots.labels.color">, (default: "#FFFFFF")
                        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.bold" @change="forceChartUpdate()">, (default: true)
                        roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.roots.labels.roundingValue">, (default: 0)
                        prefix: <input type="text" v-model="mutableConfig.style.chart.layout.roots.labels.prefix">, (default: "")
                        suffix: <input type="text" v-model="mutableConfig.style.chart.layout.roots.labels.suffix">, (default: "")
                        name: {
                            color: <input type="color" v-model="mutableConfig.style.chart.layout.roots.labels.name.color">, (default: "#2D353C")
                            fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.roots.labels.name.fontSize">, (default: 16)
                            bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.roots.labels.name.bold" @change="forceChartUpdate()">, (default: true)
                        }
                    }
                },
                verticalSeparator: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.verticalSeparator.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input type="number" min="0" max="20" v-model="mutableConfig.style.chart.layout.verticalSeparator.strokeWidth">, (default: 5)
                },
                links: {
                    opacity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.links.opacity">, (default: 10)
                },
                branches: {
                    stroke: <input type="color" v-model="mutableConfig.style.chart.layout.branches.stroke">, (default: "#FFFFFF")
                    strokeWidth: <input type="number" min="0" max="20" v-model="mutableConfig.style.chart.layout.branches.strokeWidth">, (default: 0)
                    borderRadius: <input type="number" min="0" max="16" v-model="mutableConfig.style.chart.layout.branches.strokeWidth">, (default: 6)
                    useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.branches.gradientIntensity">, (default: 20)
                    underlayerColor: <input type="color" v-model="mutableConfig.style.chart.layout.branches.underlayerColor">, (default: "#FFFFFF")
                    widthRatio: <input type="number" min="0" max="1.8" step="0.1" v-model="mutableConfig.style.chart.layout.branches.widthRatio">, (default: 1.5)
                    labels: {
                        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.labels.show" @change="forceChartUpdate()">, (default: true)
                        fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.branches.labels.fontSize">, (default: 14)
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.branches.labels.color">, (default: "#2D353C")
                        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.labels.bold" @change="forceChartUpdate()">, (default: true)
                        dataLabels: {
                            show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.show" @change="forceChartUpdate()">, (default: true)
                            hideUnderValue: <input type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.hideUnderValue">, (default: 5)
                            fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.fontSize">, (default: 14)
                            roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.roundingValue">, (default: 0)
                            roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.roundingPercentage">, (default: 0)
                            prefix: <input type="text" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.prefix">, (default: "")
                            suffix: <input type="text" v-model="mutableConfig.style.chart.layout.branches.labels.dataLabels.suffix">, (default: "")
                        }
                    }
                },
                nuts: {
                    offsetX: <input type="number" v-model="mutableConfig.style.chart.layout.nuts.offsetX">, (default: 20)
                    useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.useGradient" @change="forceChartUpdate()">, (default: true)
                    gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.nuts.gradientIntensity">, (default: 30)
                    selected: {
                        useMotion: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.useMotion" @change="forceChartUpdate()">, (default: true)
                        useGradient: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.useGradient" @change="forceChartUpdate()">, (default: true)
                        gradientIntensity: <input type="range" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.style.chart.layout.nuts.selected.gradientIntensity">, (default: 40)
                        roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.nuts.selected.roundingValue">, (default: 0)
                        roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.nuts.selected.roundingPercentage">, (default: 0)
                        labels: {
                            dataLabels: {
                                hideUnderValue: <input type="number" min="0" max="20" step="1" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.hideUnderValue">, (default: 5)
                                color: <input type="color" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.color">, (default: "#2D353C")
                                fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.fontSize">, (default: 12)
                                bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.bold" @change="forceChartUpdate()">, (default: true)
                                prefix: <input type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.prefix">, (default: "")
                                suffix: <input type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.dataLabels.suffix">, (default: "")
                            },
                            core: {
                                total: {
                                    color: <input type="color" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.total.color">, (default: "#2D353C")
                                    fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.total.fontSize">, (default: 24)
                                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.total.bold" @change="forceChartUpdate()">, (default: true)
                                },
                                value: {
                                    color: <input type="color" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.color">, (default: "#2D353C")
                                    fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.fontSize">, (default: 24)
                                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.bold" @change="forceChartUpdate()">, (default: true)
                                    prefix: <input type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.prefix">, (default: "")
                                    suffix: <input type="text" v-model="mutableConfig.style.chart.layout.nuts.selected.labels.core.value.suffix">, (default: "")
                                }
                            }
                        }
                    }
                },
                legend: {
                    fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.legend.fontSize">, (default: 16)
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.legend.color">, (default: "#2D353C")
                    roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.legend.roundingValue">, (default: 0)
                    roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.style.chart.layout.legend.roundingPercentage">, (default: 0)
                    prefix: <input type="text" v-model="mutableConfig.style.chart.layout.legend.prefix">, (default: "")
                    suffix: <input type="text" v-model="mutableConfig.style.chart.layout.legend.suffix">, (default: "")
                },
                title: {
                    text: <input type="text" v-model="mutableConfig.style.chart.layout.title.text">, (default: "")
                    color: <input type="color" v-model="mutableConfig.style.chart.layout.title.color">, (default: "#2D353C")
                    fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.title.fontSize">, (default: 20)
                    bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.title.bold" @change="forceChartUpdate()">, (default: true)
                    offsetY: <input type="number" v-model="mutableConfig.style.chart.layout.title.offsetY">, (default: 0)
                    subtitle: {
                        text: <input type="text" v-model="mutableConfig.style.chart.layout.title.subtitle.text">, (default: "")
                        color: <input type="color" v-model="mutableConfig.style.chart.layout.title.subtitle.color">, (default: "#CCCCCC")
                        fontSize: <input type="number" min="6" max="50" v-model="mutableConfig.style.chart.layout.title.subtitle.fontSize">, (default: 16)
                        bold: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.style.chart.layout.title.subtitle.bold" @change="forceChartUpdate()">, (default: false)
                        offsetY: <input type="number" v-model="mutableConfig.style.chart.layout.title.subtitle.offsetY">, (default: 0)
                    }
                }
            }
        }
    },
    table: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.table.show" @change="forceChartUpdate()">, (default: false)
        th: {
            backgroundColor: <input type="color" v-model="mutableConfig.table.th.backgroundColor">, (default: "#FAFAFA")
            color: <input type="color" v-model="mutableConfig.table.th.color">, (default: "#2D353C")
            outline: <input type="text" v-model="mutableConfig.table.th.outline">, (default: "1px solid #e1e5e8")
            translations: {
                rootName: <input type="text" v-model="mutableConfig.table.th.translations.rootName">, (default: "root name")
                rootValue: <input type="text" v-model="mutableConfig.table.th.translations.rootValue">, (default: "root value")
                rootToTotal: <input type="text" v-model="mutableConfig.table.th.translations.rootToTotal">, (default: "%/total")
                branchName: <input type="text" v-model="mutableConfig.table.th.translations.branchName">, (default: "branch name")
                branchValue: <input type="text" v-model="mutableConfig.table.th.translations.branchValue">, (default: "branch value")
                branchToRoot: <input type="text" v-model="mutableConfig.table.th.translations.branchToRoot">, (default: "%/root")
                branchToTotal: <input type="text" v-model="mutableConfig.table.th.translations.branchToTotal">, (default: "%/total")
                nutName: <input type="text" v-model="mutableConfig.table.th.translations.nutName">, (default: "nut name")
                nutValue: <input type="text" v-model="mutableConfig.table.th.translations.nutValue">, (default: "nut value")
                nutToBranch: <input type="text" v-model="mutableConfig.table.th.translations.nutToBranch">, (default: "%/branch")
                nutToRoot: <input type="text" v-model="mutableConfig.table.th.translations.nutToRoot">, (default: "%/root")
                nutToTotal: <input type="text" v-model="mutableConfig.table.th.translations.nutToTotal">, (default: "%/total")
            }
        },
        td: {
            backgroundColor: <input type="color" v-model="mutableConfig.table.td.backgroundColor">, (default: "#FFFFFF")
            color: <input type="color" v-model="mutableConfig.table.td.color">, (default: "#2D353C")
            outline: <input type="text" v-model="mutableConfig.table.td.outline">, (default: "1px solid #e1e5e8")
            roundingValue: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingValue">, (default: 0)
            roundingPercentage: <input type="number" min="0" max="3" v-model="mutableConfig.table.td.roundingPercentage">, (default: 0)
        }
    },
    userOptions: {
        show: <input type="checkbox" class="accent-app-blue" v-model="mutableConfig.userOptions.show" @change="forceChartUpdate()">, (default: true)
        title: <input type="text" v-model="mutableConfig.userOptions.title">, (default: "options")
        labels: {
            showTable: <input type="text" v-model="mutableConfig.userOptions.labels.showTable">, (default: "Show table")
        }
    },
    translations: {
        total: <input type="text" v-model="mutableConfig.translations.total">, (default: "Total")
        proportionToTree: <input type="text" v-model="mutableConfig.translations.proportionToTree">, (default: "of grand total"),
        of: <input type="text" v-model="mutableConfig.translations.of">, (default: "of")
    }
}
</code>
</pre>                
                </div>
            </template>

            <template v-slot:tab2>
              <div><code>@selectRoot</code></div>
              <div class="text-gray-400 pl-5">returns the selected root data</div>
<pre>
<code>
{
  branches: [
    {
      breakdown: [
        {
          branchName: string;
          branchTotal: number;
          color: string;
          id: string;
          name: string;
          proportionToBranch: number;
          proportionToRoot: number;
          proportionToTree: number;
          rootIndex: number;
          rootName: string;
          table: {
            branchName: string;
            branchToRoot: number;
            branchToTotal: number;
            branchValue: number;
            nutName: string;
            nutToBranch: number;
            nutToRoot: number;
            nutToTotal: number;
            rootName: string;
            rootToTotal: number;
            rootValue: number;
          },
          type: "nut";
          value: number;
        },
        {...}
      ],
      color: string;
      id: string;
      name: string;
      proportionToTotal: number;
      rootIndex: number;
      rootName: string;
      type: "branch";
      value: number;
    },
    {...}
  ],
  color: string;
  id: string;
  name: string;
  r: number;
  rootIndex: number;
  total: number;
  type: "root",
  x: number;
  y: number;
}
</code>
</pre>
              <div><code>@selectBranch</code></div>
              <div class="text-gray-400 pl-5">returns the selected branch data:</div>
<pre>
<code>
{
  breakdown: [
    {
      branchName: string;
      branchTotal: number;
      color: string;
      id: string;
      name: string;
      proportionToBranch: number;
      proportionToRoot: number;
      proportionToTree: number;
      rootIndex: number;
      rootName: string;
      table: {
        branchName: string;
        branchToRoot: number;
        branchToTotal: number;
        branchValue: number;
        nutName: string;
        nutToBranch: number;
        nutToRoot: number;
        nutToTotal: number;
        rootName: string;
        rootToTotal: number;
        rootValue: number;
      },
      type: "nut";
      value: number;
    },
    {...}
  ],
  color: string;
  id: string;
  name: string;
  proportionToTotal: number;
  rootIndex: number;
  rootName: string;
  type: "branch";
  value: number;
}
</code>
</pre>
              <div><code>@selectNut</code></div>
              <div class="text-gray-400 pl-5">returns the selected donut data:</div>
<pre>
<code>
[
  {
      branchName: string;
      branchTotal: number;
      color: string;
      id: string;
      name: string;
      proportionToBranch: number;
      proportionToRoot: number;
      proportionToTree: number;
      rootIndex: number;
      rootName: string;
      table: {
        branchName: string;
        branchToRoot: number;
        branchToTotal: number;
        branchValue: number;
        nutName: string;
        nutToBranch: number;
        nutToRoot: number;
        nutToTotal: number;
        rootName: string;
        rootToTotal: number;
        rootValue: number;
      },
      type: "nut";
      value: number;
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

            const chestnutChart = ref(null);
            const chestnutDataset = ref([]);

            onMounted(() => {
                chestnutDataset.value = chestnutChart.value.getData();
            });

            const config = ref({
                <span class="text-gray-500">// your config here</span>
            });
            const dataset = ref([
                <span class="text-gray-500">// your dataset here</span>
            ]);

        <span class="text-gray-400">&lt;/script&gt;</span>

        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiChestnut
                ref="chestnutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>
    </code>
    <span class="text-app-green">Using options API:</span>
    <code>
        <span class="text-gray-400">&lt;template&gt;</span>
            &lt;VueUiChestnut
                ref="chestnutChart"
                :config="config"
                :dataset="dataset"
            /&gt;
        <span class="text-gray-400">&lt;/template&gt;</span>

        <span class="text-gray-400">&lt;script&gt;</span>
            export default {
                data() {
                    return {
                        chestnutDataset: [],
                        config: {
                            <span class="text-gray-500">// your config here</span>
                        },
                        dataset: [
                            <span class="text-gray-500">// your dataset here</span>
                        ]
                    }
                },
                mounted () {
                    this.chestnutDataset = this.$refs.chestnutChart.getData();
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