<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

const router = useRouter();
const route = useRoute();

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    },
    {
        description: 'Themes',
    }
]);

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    let hash = route.hash ? route.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null;
    if (hash === 'VueUiSparkhistogram') {
        hash = 'VueUiSparkHistogram'
    }
    const hashIcon = hash ? themes.value.find(c => c.component === hash) ? themes.value.find(c => c.component === hash).icon : undefined : undefined

    if (crumbs.value.length === 3) {
        crumbs.value.push({
            description: hash,
            icon: hashIcon
        })
    } else {
        crumbs.value[3] = {
            description: hash,
            icon: hashIcon
        }
    }
}

const selectedLink = ref('');

onMounted(() => {
    if (route.hash) {
        selectedLink.value = route.hash.replace('#', '');
        updateCrumb();
    } else {
        updateHash('gold');
        selectedLink.value = themes.value.find(c => c.link === 'gold')
    }
});

function updateHash(link) {
    router.push({ path: route.path, hash: link ? `#${link}` : '' });
    selectedLink.value = link;
    setTimeout(updateCrumb, 100)
}

const themes = computed(() => {
    return [
        { link: 'gold' },
    ]
})

function createNumArray(n, m = 100) {
    let arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push(Math.round(Math.random() * m))
    }
    return arr;
}

const DATA_POOL = computed(() => {
    return {
        arr1: createNumArray(12, 30),
        arr2: createNumArray(12, 100),
        arr3: createNumArray(12, 50),
    }
})

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
        // {
        //     name: 'Series 2',
        //     series: DATA_POOL.value.arr2,
        //     type: 'line',
        //     dataLabels: true,
        //     smooth: true
        // },
        // {
        //     name: 'Series 3',
        //     series: DATA_POOL.value.arr3,
        //     type: 'bar',
        //     dataLabels: true
        // },
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


</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

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
                        Source: macrotrends
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
    </div>
</template>