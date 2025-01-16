<script setup>
import { ref, computed } from "vue";
import { getPalette } from "vue-data-ui";

const GOLD_YEARLY_SINCE_2000 = ref([
    279.29,
    271.19,
    310.08,
    363.83,
    409.53,
    444.99,
    604.34,
    696.43,
    872.37,
    973.66,
    1226.66,
    1573.16,
    1668.86,
    1409.51,
    1266.06,
    1158.86,
    1251.92,
    1260.39,
    1268.93,
    1393.34,
    1773.73,
    1798.89,
    1801.87,
    1943.00,
    2388.98,
    2659.72
])

const USA_INFLATION_RATE = ref([
3.36, // 2000
  2.85, // 2001
  1.58, // 2002
  2.28, // 2003
  2.66, // 2004
  3.39, // 2005
  3.23, // 2006
  2.85, // 2007
  3.84, // 2008
 -0.36, // 2009
  1.64, // 2010
  3.16, // 2011
  2.07, // 2012
  1.46, // 2013
  1.62, // 2014
  0.12, // 2015
  1.26, // 2016
  2.13, // 2017
  2.49, // 2018
  1.76, // 2019
  1.23, // 2020
  4.70, // 2021
  8.00, // 2022
  4.12, // 2023
  2.89, // 2024
  0.63  // 2025 (projected)
])

const GOLD_YEARS = computed(() => {
    let year = 2000;
    const arr = []
    for (let i = 0; i < GOLD_YEARLY_SINCE_2000.value.length; i += 1) {
        arr.push(year);
        year += 1;
    }
    return arr;
})

const DATASET_XY = computed(() => {
    return [
        {
            name: '$/Oz',
            series: GOLD_YEARLY_SINCE_2000.value,
            type: 'line',
            dataLabels: false,
            useArea: true,
            prefix: '$'
        },
        {
            name: 'USA inflation rate',
            series: USA_INFLATION_RATE.value,
            type: 'line',
            dataLabels: false,
            useArea: false,
            suffix: '%',
            color: '#1A1A1A'
        },
    ]
})

const CONFIG_XY = computed(() => {
    return {
        chart: {
            grid: {
                position: 'start',
                frame: {
                    show: true,
                    stroke: '#9F8A8A'
                },
                labels: {
                    yAxis: {
                        scaleMax: 3000,
                        useIndividualScale: true,
                    },
                    xAxisLabels: {
                        values: GOLD_YEARS.value.map(y => String(y)),
                        rotation: -33,
                        yOffset: 12
                    }
                },
            },
            labels: {
                fontSize: 18,
            },
            legend: {
                show: false,
            },
            padding: {
                left: 80,
            },
            title: {
                text: 'Gold yearly average closing price in $ (oz)',
                textAlign: 'left',
                paddingLeft: 14,
                subtitle: {
                    text: `${GOLD_YEARS.value[0]} - ${GOLD_YEARS.value.at(-1)}`,
                }
            },
            tooltip: {
                showPercentage: false
            }
        },
        bar: {
            periodGap: 0.1,
            border: {
                useSerieColor: false,
                strokeWidth: 1,
            },
            labels: {
                show: true
            }
        },
        line: {
            radius: 6,
            useGradient: false,
            dot: {
                useSerieColor: false,
                fill: '#FFFFFF',
                strokeWidth: 3
            },
            labels: {
                show: true,
                offsetY: -16
            }
        },
        table: {
            showSum: false
        }
    }
});

const DATASET_DONUT = computed(() => {
    return [
        {
            name: 'Proven reserves',
            values: [52000]
        },
        {
            name: 'Jewellery',
            values: [95550]
        },
        {
            name: 'ETFs',
            values: [46500]
        },
        {
            name: 'Central banks',
            values: [35700]
        },
        {
            name: 'Other',
            values: [31100]
        },
    ].sort((a, b) => b.values.reduce((i,j) => i + j, 0) - a.values.reduce((i,j) => i + j, 0))
})

const CONFIG_DONUT = computed(() => {
    return {
        style: {
            chart: {
                useGradient: false,
                layout: {
                    donut: {
                        useShadow: false
                    },
                    labels: {
                        dataLabels: {
                            suffix: 't'
                        },
                        value: {
                            show: false,
                        },
                        hollow: {
                            show: false,
                            average: {
                                show: false
                            },
                            total: {
                                show: true,
                                offsetY: -10,
                                value: {
                                    offsetY: -3,
                                    suffix: 't'
                                }
                            }
                        }
                    }
                },
                title: {
                    text: 'Total estimated gold above ground in tons',
                }
            }
        },
    }
})

const DATASET_CANDLESTICK = ref([
    ["2000", 290.25, 312.70, 263.80, 272.65, 0],
    ["2001", 272.65, 293.25, 255.95, 276.50, 0],
    ["2002", 276.50, 349.00, 276.50, 342.75, 0],
    ["2003", 342.75, 416.25, 319.90, 416.25, 0],
    ["2004", 416.25, 454.20, 375.00, 438.40, 0],
    ["2005", 438.40, 536.50, 411.10, 518.90, 0],
    ["2006", 518.90, 725.00, 524.75, 635.70, 0],
    ["2007", 635.70, 841.10, 608.30, 833.75, 0],
    ["2008", 833.75, 1011.25, 712.50, 869.75, 0],
    ["2009", 869.75, 1226.25, 810.00, 1104.00, 0],
    ["2010", 1104.00, 1431.25, 1058.00, 1420.25, 0],
    ["2011", 1420.25, 1923.70, 1319.00, 1566.80, 0],
    ["2012", 1566.80, 1798.10, 1540.00, 1675.80, 0],
    ["2013", 1675.80, 1694.75, 1192.00, 1202.30, 0],
    ["2014", 1202.30, 1385.00, 1142.10, 1184.10, 0],
    ["2015", 1184.10, 1307.80, 1049.40, 1060.20, 0],
    ["2016", 1060.20, 1366.25, 1060.20, 1151.70, 0],
    ["2017", 1151.70, 1357.70, 1151.70, 1303.05, 0],
    ["2018", 1303.05, 1365.40, 1176.70, 1281.65, 0],
    ["2019", 1281.65, 1542.60, 1270.05, 1523.00, 0],
    ["2020", 1523.00, 2058.40, 1472.35, 1895.10, 0],
    ["2021", 1895.10, 1954.40, 1678.00, 1828.60, 0],
    ["2022", 1828.60, 2043.30, 1626.65, 1824.32, 0],
    ["2023", 1824.32, 2115.10, 1811.27, 2062.92, 0],
    ["2024", 2062.92, 2785.87, 1992.06, 2624.60, 0]
]);

const CONFIG_CANDLESTICK = computed(() => {
    return {
        style: {
            layout: {
                grid: {
                    xAxis: {
                        dataLabels: {
                            rotation: -33,
                            fontSize: 7
                        }
                    },
                    yAxis: {
                        dataLabels: {
                            prefix: '$',
                            fontSize: 9
                        }
                    }
                },
                padding: {
                    right: 24
                }
            },
            title: {
                text: 'Gold yearly prices OHLC in $ (oz)',
                textAlign: 'left',
                paddingLeft: 14,
                subtitle: {
                    text: `${GOLD_YEARS.value[0]} - ${GOLD_YEARS.value.at(-2)}`,
                }
            },
            tooltip: {
                prefix: '$'
            }
        }
    }
})

const DATASET_STACKBAR = [
    {
        name: "China",
        series: [175, 180, 185, 190, 195, 200, 205, 210, 220, 230, 240, 250, 260, 270, 280, 300, 320, 340, 360, 380, 400, 420, 330],
        color: '#d62728'
    },
    {
        name: "Australia",
        series: [285, 270, 260, 250, 245, 240, 235, 230, 225, 220, 215, 210, 205, 200, 195, 190, 185, 180, 175, 170, 165, 160, 320],
        color: '#e7ba52'
    },
    {
        name: "Russia",
        series: [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320],
        color: '#1f77b4'
    },
    {
        name: "United States",
        series: [350, 340, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 170],
        color: '#17becf'
    },
    {
        name: "South Africa",
        series: [430, 420, 410, 400, 390, 380, 370, 360, 350, 340, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 110],
        color: '#e7969c'
    },
    {
        name: "Canada",
        series: [160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 220],
        color: '#8c564b'
    },
    {
        name: "Peru",
        series: [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 100],
        color: '#ff7f0e'
    },
    {
        name: "Indonesia",
        series: [140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 70],
        color: '#2ca02c'
    },
    {
        name: "Uzbekistan",
        series: [80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 100],
        color: '#6b6ecf'
    },
    {
        name: "Ghana",
        series: [70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 90],
        color: '#9c9ede'
    },
];

const CONFIG_STACKBAR = computed(() => {
    return {
        style: {
            chart: {
                bars: {
                    dataLabels: {
                        fontSize: 10,
                    },
                    totalValues: {
                        fontSize: 12
                    }
                },
                padding: {
                    left: 64,
                },
                title: {
                    text: 'Gold production in tons',
                    textAlign: 'left',
                    paddingLeft: 14,
                    subtitle: {
                        text: `${GOLD_YEARS.value[0]} - 2022`,
                    }
                },
                grid: {
                    x: {
                        timeLabels: {
                            values: GOLD_YEARS.value.map(y => String(y)),
                            rotation: -33,
                            fontSize: 12
                        }
                    }
                }
            }
        }
    }
})

</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 max-w-[1200px] mx-auto gap-4 mt-12 p-4 bg-white dark:bg-[#3A3A3A]">
        <div class="w-full h-full bg-[#fff8e1]">
            <VueDataUi
                component="VueUiXy"
                :dataset="DATASET_XY"
                :config="{
                    ...CONFIG_XY,
                    theme: 'celebration'
                }"
            >
                <template #chart-background>
                    <div class="w-full h-full bg-gradient-to-t from-[#FFFFFF40] to-transparent">
                        <img src="../assets/gold.png" class="object-cover w-full h-full opacity-20">
                    </div>
                </template>
                <template #source>
                    <div class="text-xs px-4 text-left text-[#8A8A8A]">
                        Source: Macrotrends
                    </div>
                </template>
            </VueDataUi>
        </div>

        <div class="w-full place-items-center bg-[#fff8e1] h-full">
            <VueDataUi
                component="VueUiDonut"
                :dataset="DATASET_DONUT"
                :config="{
                    ...CONFIG_DONUT,
                    theme: 'celebration'
                }"
            >
                <template #source>
                    <div class="text-xs px-4 text-left text-[#8A8A8A]">
                        Source: Metals Focus, Refinitiv GFMS, US Geological Survey, World Gold Council, as of the end of 2022. Value calculated using the LBMA Gold Price at the end of the year.
                    </div>
                </template>
            </VueDataUi>
        </div>

        <div class="w-full place-items-center bg-[#fff8e1] h-full">
            <VueDataUi
                component="VueUiCandlestick"
                :dataset="DATASET_CANDLESTICK"
                :config="{
                    ...CONFIG_CANDLESTICK,
                    theme: 'celebration'
                }"
            >
                <template #chart-background>
                    <div class="w-full h-full bg-gradient-to-t from-[#FFFFFF40] to-transparent">
                        <img src="../assets/gold.png" class="object-cover w-full h-full opacity-[0.15]">
                    </div>
                </template>
                <template #source>
                    <div class="text-xs px-4 text-left text-[#8A8A8A]">
                        Source: Macrotrends<br>
                        The volumes in the dataset are null because gold trading does not have a single consolidated volume figure in the way that stocks or other exchange-traded instruments do.
                    </div>
                </template>
            </VueDataUi>
        </div>

        <div class="w-full place-items-center bg-[#fff8e1] h-full">
            <VueDataUi
                component="VueUiStackbar"
                :dataset="DATASET_STACKBAR"
                :config="{
                    ...CONFIG_STACKBAR,
                    theme: 'celebration'
                }"
            >
                <template #chart-background>
                    <div class="w-full h-full bg-gradient-to-t from-[#FFFFFF40] to-transparent">
                        <img src="../assets/gold.png" class="object-cover w-full h-full opacity-[0.15]">
                    </div>
                </template>
                <template #source>
                    <div class="text-xs px-4 text-left text-[#8A8A8A]">
                        Source: U.S. Geological Survey's Mineral Commodity Summaries
                    </div>
                </template>
            </VueDataUi>
        </div>
    </div>
</template>