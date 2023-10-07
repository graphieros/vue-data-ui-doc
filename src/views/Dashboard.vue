<script setup>
import { ref, computed, defineAsyncComponent, markRaw } from "vue";
import AppSkeletons from '../components/AppSkeletons.vue';
import { useMainStore } from '../stores';

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const charts = computed(() => {
    return [
        {
            component: defineAsyncComponent(() => import("vue-data-ui").then(module => module.VueUiXy)),
            padding: "p-6",
            config: {
                table: {
                        rounding: 9,
                        th: {
                            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FAFAFA',
                            color: isDarkMode.value ? '#FAFAFA': "#1A1A1A",
                        },
                        td: {
                            backgroundColor: isDarkMode.value ? '#1A1A1A' : "#FFFFFF",
                            color: isDarkMode.value ? '#FAFAFA' : "#1A1A1A"
                        }
                    },
                chart: {
                    backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                    color: isDarkMode.value ? "#c8c8c8" : "#1A1A1A",
                    height: 300,
                    width: 500,
                    zoom: {
                        color: "#FF0000"
                    },
                    highlighter: {
                        color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                        opacity: 10,
                    },
                    tooltip: {
                        roundingValue: 9,
                        backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                        color: isDarkMode.value ? '#FAFAFA' : "#1A1A1A",
                    },
                    legend: {
                        color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A'
                    },
                    title: {
                        text: "World population",
                        color: isDarkMode.value ? '#FAFAFA' : "#1A1A1A",
                        subtitle: {
                            text: "From 1951 to 2023, in Billions"
                        }
                    },
                    grid: {
                        labels: {
                            color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A',
                            xAxisLabels: {
                                showOnlyFirstAndLast: true,
                                values: [
                                    1951,
                                    1952,
                                    1953,
                                    1954,
                                    1955,
                                    1956,
                                    1957,
                                    1958,
                                    1959,
                                    1960,
                                    1961,
                                    1962,
                                    1963,
                                    1964,
                                    1965,
                                    1966,
                                    1967,
                                    1968,
                                    1969,
                                    1970,
                                    1971,
                                    1972,
                                    1973,
                                    1974,
                                    1975,
                                    1976,
                                    1977,
                                    1978,
                                    1979,
                                    1980,
                                    1981,
                                    1982,
                                    1983,
                                    1984,
                                    1985,
                                    1986,
                                    1987,
                                    1988,
                                    1989,
                                    1990,
                                    1991,
                                    1992,
                                    1993,
                                    1994,
                                    1995,
                                    1996,
                                    1997,
                                    1998,
                                    1999,
                                    2000,
                                    2001,
                                    2002,
                                    2003,
                                    2004,
                                    2005,
                                    2006,
                                    2007,
                                    2008,
                                    2009,
                                    2010,
                                    2011,
                                    2012,
                                    2013,
                                    2014,
                                    2015,
                                    2016,
                                    2017,
                                    2018,
                                    2019,
                                    2020,
                                    2021,
                                    2022,
                                    2023

                                ]
                            }
                        }
                    }
                }
            },
            dataset: [
                {
                    name: "Count",
                    series: [
                        2.543130380,
                        2.590270899,
                        2.640278797,
                        2.691979339,
                        2.746072141,
                        2.801002631,
                        2.857866857,
                        2.916108097,
                        2.970292188,
                        3.019233434,
                        3.068370609,
                        3.126686743,
                        3.195779247,
                        3.267212338,
                        3.337111983,
                        3.406417036,
                        3.475448166,
                        3.546810808,
                        3.620655275,
                        3.695390336,
                        3.770163092,
                        3.844800885,
                        3.920251504,
                        3.995517077,
                        4.069437231,
                        4.142505882,
                        4.215772490,
                        4.289657708,
                        4.365582871,
                        4.444007706,
                        4.524627658,
                        4.607984871,
                        4.691884238,
                        4.775836074,
                        4.861730613,
                        4.950063339,
                        5.040984495,
                        5.132293974,
                        5.223704308,
                        5.316175862,
                        5.406245867,
                        5.492686093,
                        5.577433523,
                        5.660727993,
                        5.743219454,
                        5.825145298,
                        5.906481261,
                        5.987312480,
                        6.067758458,
                        6.148898975,
                        6.230746982,
                        6.312407360,
                        6.393898365,
                        6.475751478,
                        6.558176119,
                        6.641416218,
                        6.725948544,
                        6.811597272,
                        6.898305908,
                        6.985603105,
                        7.073125425,
                        7.161697921,
                        7.250593370,
                        7.339013419,
                        7.426597537,
                        7.513474238,
                        7.599822404,
                        7.683789828,
                        7.764951032,
                        7.840952880,
                        7.909295151,
                        7.975105156,
                        8.045311447,
                    ],
                    type: "bar"
                }
            ]
        },
        {
            component: defineAsyncComponent(() => import("vue-data-ui").then(module => module.VueUiDonut)),
            padding: "p-6",
            config: {
                table: {

                        th: {
                            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FAFAFA',
                            color: isDarkMode.value ? '#FAFAFA': "#1A1A1A",
                        },
                        td: {
                            backgroundColor: isDarkMode.value ? '#1A1A1A' : "#FFFFFF",
                            color: isDarkMode.value ? '#FAFAFA' : "#1A1A1A"
                        }
                    },
                style: {
                    chart: {
                        backgroundColor: isDarkMode.value ? '#1A1A1A' : "#FFFFFF",
                        color: isDarkMode.value ? '#C8C8C8' : "#1A1A1A",
                        layout: {
                            labels: {
                                percentage: {
                                    color: isDarkMode.value ? '#C4C4C4' : '#1A1A1A'
                                },
                                name: {
                                    color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A'
                                },
                                hollow: {
                                    total: {
                                        show: false
                                    },
                                    average: {
                                        show: false
                                    }
                                }
                            }
                        },
                        title: {
                            text: "GDP per country",
                            color: isDarkMode.value ? '#FAFAFA' : "#1A1A1A",
                            subtitle: {
                                text: "IMF 2023 forecast in Million USD"
                            }
                        },
                        legend: {
                            backgroundColor: isDarkMode.value ? '#1A1A1A' : "#FFFFFF",
                            color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A',
                            fontSize: 10
                        },
                        tooltip: {
                            backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                            color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A'
                        }
                    }
                }
            },
            dataset: [
                {
                    name: "United States",
                    values: [105568776]
                },
                {
                    name: "China",
                    values: [26854599]
                },
                {
                    name: "Japan",
                    values: [4409738]
                },
                {
                    name: "Germany",
                    values: [4308854]
                },
                {
                    name: "India",
                    values: [3736882]
                },
                {
                    name: "United Kingdom",
                    values: [3158938]
                },
                {
                    name: "France",
                    values: [2923489]
                },
                {
                    name: "Italy",
                    values: [2169745]
                },
                {
                    name: "Canada",
                    values: [2089672]
                },
                {
                    name: "Brazil",
                    values: [2081235]
                },
            ]
        },
        {
            component: defineAsyncComponent(() => import("vue-data-ui").then(module => module.VueUiRadar)),
            padding: "p-6 px-10",
            config: {
                translations: {
                    target: "Max"
                },
                table: {
                    th: {
                        backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FAFAFA",
                        color: isDarkMode.value ? "#FAFAFA": "#1A1A1A"
                    },
                    td: {
                        backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FAFAFA",
                        color: isDarkMode.value ? "#FAFAFA": "#1A1A1A",
                        roundingValue: 0,
                        roundingPercentage: 1
                    }
                },
                style: {
                    chart: {
                        backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                        color: isDarkMode.value ? "#C8C8C8" : "#1A1A1A",
                        layout: {
                            labels: {
                                dataLabels: {
                                    color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A"
                                }
                            },
                            dataPolygon: {
                                opacity: isDarkMode.value ? 30 : 20
                            },
                            grid: {
                                stroke: isDarkMode.value ? '#565656' : '#e1e5e8'
                            }
                        },
                        legend: {
                            backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                            color: isDarkMode.value ? "#FAFAFA" : "1A1A1A",
                            fontSize: 10,
                            bold: false,
                        },
                        title: {
                            text: "USA, Japan, China",
                            color: isDarkMode.value ? '#FAFAFA' : '#1A1A1A',
                            subtitle: {
                                text: "Main indicators (estimations)"
                            }
                        },
                        tooltip: {
                            backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                            color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A"
                        }
                    }
                }
            },
            dataset: {
                categories: [
                    {
                        name: "United States"
                    },
                    {
                        name: "China"
                    },
                    {
                        name: "Japan"
                    }
                ],
                series: [
                    {
                        name: "Population in Millions",
                        values: [331, 1400, 126],
                        target: 1400
                    },
                    {
                        name: "Life expectancy",
                        values: [77.3, 76.7, 84.6],
                        target: 100
                    },
                    {
                        name: "Litteracy rate",
                        values: [99.9, 95, 99.9],
                        target: 100
                    },
                    {
                        name: "Poverty rate",
                        values: [10.5, 3.1, 15],
                        target: 100
                    },
                    {
                        name: "Healthcare exp./GDP",
                        values: [17.7, 6.6, 10.9],
                        target: 100
                    },
                    {
                        name: "GDP per capita in USD",
                        values: [67000, 12000, 42500],
                        target: 67000
                    },
                    {
                        name: "Nuclear warheads",
                        values: [5500, 350, 0],
                        target: 5500
                    },
                ]
            }
        }
    ]
})

</script>

<template>
    <div class="mx-auto w-5/6 mt-12">
        <div class="fixed top-0 left-0 h-screen w-screen z-0" style="opacity:0.4">
            <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>
            <AppSkeletons/>
        </div>
      <div class="z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <template v-for="chart in charts">
            <div :class="`z-20 h-fit ${chart.padding} ${isDarkMode ? 'bg-black' : 'bg-white'}`">
                <component :is="chart.component" :dataset="chart.dataset" :config="chart.config"/>
            </div>
        </template>
      </div>
    </div>
</template>

