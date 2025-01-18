<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const globalITSpending = ref([
    { year: 2000, spending: 1.2 }, // Trillion USD
    { year: 2001, spending: 1.25 },
    { year: 2002, spending: 1.3 },
    { year: 2003, spending: 1.4 },
    { year: 2004, spending: 1.6 },
    { year: 2005, spending: 2.65 },
    { year: 2006, spending: 2.9 },
    { year: 2007, spending: 3.1 },
    { year: 2008, spending: 3.3 },
    { year: 2009, spending: 3.2 }, // Global financial crisis impact
    { year: 2010, spending: 3.4 },
    { year: 2011, spending: 3.6 },
    { year: 2012, spending: 3.8 },
    { year: 2013, spending: 4.0 },
    { year: 2014, spending: 4.2 },
    { year: 2015, spending: 4.3 },
    { year: 2016, spending: 4.5 },
    { year: 2017, spending: 4.7 },
    { year: 2018, spending: 4.8 },
    { year: 2019, spending: 4.9 },
    { year: 2020, spending: 4.3 }, // Pandemic impact
    { year: 2021, spending: 4.5 },
    { year: 2022, spending: 4.6 },
    { year: 2023, spending: 4.69 },
    { year: 2024, spending: 5.44 },
    { year: 2025, spending: 5.75 }
]);

const DATASET_XY_IT_SPENDING = computed(() => {
    return [
        {
            name: 'Global IT spending',
            series: globalITSpending.value.map(d => d.spending),
            type: 'bar',
            dataLabels: true,
            comments: ['', '', '', '', '', '', '', '', 'Global financial crisis', '', '', '', '', '', '', '', '', '', '', '', 'Pandemic impact']
        }
    ]
});

const CONFIG_XY_IT_SPENDING = computed(() => {
    return {
        chart: {
            userOptions: {
                show: false
            },
            height: 400,
            backgroundColor: isDarkMode.value ? '#4A4A4A' : '#FAFAFA',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            grid: {
                stroke: 'transparent',
                showHorizontalLines: true,
                labels: {
                    show: false,
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    xAxisLabels: {
                        values: globalITSpending.value.map(d => String(d.year)),
                        fontSize: 12,
                        rotation: -33,
                        yOffset: 0,
                        color: isDarkMode.value ? '#8A8A8A' : '#1A1A1A',
                    },
                    yAxis: {
                        scaleMax: 6
                    }
                }
            },
            highlighter: {
                color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
            },
            legend: {
                show: false,
            },
            padding: {
                bottom: 32,
                left: 32,
                right: 32,
                top: 0
            },
            title: {
                text: 'Global IT spending',
                color: isDarkMode.value ? '#549ed1' : '#1f77b4',
                textAlign: 'left',
                paddingLeft: 6,
                fontSize: 32,
                subtitle: {
                    text: '2000 - 2025 in Trillion $'
                }
            },
            tooltip: {
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                backgroundOpacity: 20,
                borderColor: isDarkMode.value ? '#6A6A6A' : '#e1e5e8',
                showPercentage: false,
                roundingValue: 2,
                
            },
            zoom: {
                color: isDarkMode.value ? '#8A8A8A' : '#CCCCCC',
                highlightColor: isDarkMode.value ? '#1f77b4' : '#1f77b4',
                minimap: {
                    show: true,
                    selectedColor: isDarkMode.value ? '#549ed1' : '#1f77b4',
                    lineColor: isDarkMode.value ? '#549ed1' : '#1f77b4',
                    indicatorColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                }
            }
        },
        bar: {
            borderRadius: 0,
            useGradient: false,
            periodGap: 0.2,
            labels: {
                show: true,
                rounding: 2,
                color: isDarkMode.value ? '#549ed1' : '#1f77b4'
            }
        },
    }
})

</script>

<template>
    <div class="flex flex-row flex-wrap max-w-[1200px] mx-auto gap-4 mt-12 p-4 bg-white dark:bg-[#3A3A3A]">
        <div class="flex-1 min-w-[300px] p-4 bg-[#FAFAFA] dark:bg-[#4A4A4A] rounded shadow-md">
            <VueDataUi
                component="VueUiKpi"
                :dataset="64"
                :config="{
                    backgroundColor: isDarkMode ? '#4A4A4A' : '#FAFAFA',
                    suffix: '%',
                    valueClass: `tabular-nums`,
                    valueCss: `color:${isDarkMode ? `#549ed1` : `#1f77b4`};font-size:4rem`
                }"
            >
                <template #comment-after>
                    <VueDataUi
                        component="VueUiSparkbar"
                        :dataset="[
                            {
                                name: '',
                                value: 64,
                                target: 100,
                                suffix: '%',
                                color: isDarkMode ? '#549ed1' : '#1f77b4'
                            }
                        ]"
                        :config="{
                            style: {
                                backgroundColor: 'transparent',
                                gutter: {
                                    backgroundColor: isDarkMode ? '#5A5A5A' : '#EAEAEA'
                                },
                                labels: {
                                    fontSize: 0
                                }
                            }
                        }"
                    />
                    <div class="text-xs mt-3">
                        of organizations plan to increase their IT budgets in 2025. Total IT spending is expected to grow 9% year over year.
                    </div>
                </template>
            </VueDataUi>
        </div>

        <div class="flex-1 min-w-[300px] p-4 bg-[#FAFAFA] dark:bg-[#4A4A4A] rounded shadow-md">
            <VueDataUi
                component="VueUiKpi"
                :dataset="54"
                :config="{
                    backgroundColor: isDarkMode ? '#4A4A4A' : '#FAFAFA',
                    suffix: '%',
                    valueClass: `tabular-nums`,
                    valueCss: `color:${isDarkMode ? `#549ed1` : `#1f77b4`};font-size:4rem`
                }"
            >
                <template #comment-after>
                    <VueDataUi
                        component="VueUiSparkbar"
                        :dataset="[
                            {
                                name: '',
                                value: 54,
                                target: 100,
                                suffix: '%',
                                color: isDarkMode ? '#549ed1' : '#1f77b4'
                            }
                        ]"
                        :config="{
                            style: {
                                backgroundColor: 'transparent',
                                gutter: {
                                    backgroundColor: isDarkMode ? '#5A5A5A' : '#EAEAEA'
                                },
                                labels: {
                                    fontSize: 0
                                }
                            }
                        }"
                    />
                    <div class="text-xs mt-3">
                        of companies plan to increase spending on generative AI, and 52% plan to raise security budgets in 2025.
                    </div>
                </template>
            </VueDataUi>
        </div>

        <div class="flex-1 min-w-[300px] p-4 bg-[#FAFAFA] dark:bg-[#4A4A4A] rounded shadow-md">
            <VueDataUi
                component="VueUiKpi"
                :dataset="57"
                :config="{
                    backgroundColor: isDarkMode ? '#4A4A4A' : '#FAFAFA',
                    suffix: '%',
                    valueClass: `tabular-nums`,
                    valueCss: `color:${isDarkMode ? `#549ed1` : `#1f77b4`};font-size:4rem`
                }"
            >
                <template #comment-after>
                    <VueDataUi
                        component="VueUiSparkbar"
                        :dataset="[
                            {
                                name: '',
                                value: 57,
                                target: 100,
                                suffix: '%',
                                color: isDarkMode ? '#549ed1' : '#1f77b4'
                            }
                        ]"
                        :config="{
                            style: {
                                backgroundColor: 'transparent',
                                gutter: {
                                    backgroundColor: isDarkMode ? '#5A5A5A' : '#EAEAEA'
                                },
                                labels: {
                                    fontSize: 0
                                }
                            }
                        }"
                    />
                    <div class="text-xs mt-3">
                        of senior tech leaders believe hiring IT talent is difficult amid skills gaps.
                    </div>
                </template>
            </VueDataUi>
        </div>
    </div>

    <div class="flex max-w-[1200px] mx-auto px-4 bg-white dark:bg-[#3A3A3A]">
        <div class="w-full p-2 bg-[#FAFAFA] dark:bg-[#4A4A4A] rounded shadow-md">
            <VueDataUi
                component="VueUiXy"
                :dataset="DATASET_XY_IT_SPENDING"
                :config="CONFIG_XY_IT_SPENDING"
            >
                <template #plot-comment="{ plot }">
                    <div :style="{ width: '100%', textAlign: 'center', marginTop: '-80px'}" class="flex flex-col place-items-center text-xs gap-2">
                        {{ plot.comment }}
                        <div class="animate-ping">
                            <VueUiIcon name="circleExclamation" :size="16" :stroke="isDarkMode ? '#549ed1' : '#1f77b4'"/>
                        </div>
                    </div>
                </template>
            </VueDataUi>
        </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 max-w-[1200px] mx-auto gap-4 p-4 bg-white dark:bg-[#3A3A3A]">
        
    </div>
</template>