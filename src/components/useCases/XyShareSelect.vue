<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import { mergeConfigs } from "vue-data-ui";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function getLastDaysTimestamps(daysCount) {
    const result = [];
    const today = new Date();
    
    for (let i = daysCount - 1; i >= 0; i -= 1) {
        const date = new Date(today);
        date.setHours(0, 0, 0, 0);
        date.setDate(today.getDate() - i);
        result.push(date.getTime());
    }
    
    return result;
}

function makeDs(n) {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push(Math.random() * (100 + (i * 10)))
    }
    return arr;
}

const datasets = computed(() => {
    return {
        chartA: [
            {
                name: 'Series A',
                series: makeDs(100),
                type: 'line',
                smooth: true,
                color: '#1f77b4',
                useArea: true
            }
        ],
        chartB: [
            {
                name: 'Series B',
                series: makeDs(100),
                type: 'line',
                smooth: true,
                color: '#ff7f0e',
                useArea: true,
            }
        ],
    }
})

const selectedXIndex = ref(undefined);

const config = computed(() => {
    return {
        events: {
            datapointEnter: ({ seriesIndex }) => {
                selectedXIndex.value = seriesIndex;
            },
            datapointLeave: () => {
                selectedXIndex.value = undefined;
            }
        },
        chart: {
            userOptions: { show: false },
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            grid: {
                stroke: isDarkMode.value ? '#8A8A8A' : '#8A8A8A',
                labels: {
                    color: isDarkMode.value ? '#9A9A9A' : '#1A1A1A',
                    xAxisLabels: {
                        color: isDarkMode.value ? '#9A9A9A' : '#1A1A1A',
                        values: getLastDaysTimestamps(100),
                        datetimeFormatter: {
                            enable: true,
                            useUTC: true,
                            options: {
                                month: 'yyyy-dd-MM',
                                day: 'yyyy-dd-MM',
                                minute: 'yyyy-dd-MM',
                                second: 'yyyy-dd-MM',
                            }
                        },
                        showOnlyAtModulo: true,
                        modulo: 12,
                        autoRotate: {
                            angle: -45
                        }
                    }
                }
            },
            highlighter: {
                useLine: true,
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                lineDasharray: 6
            },
            legend: {
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            },
            title: {
                color: isDarkMode.value ? '#9A9A9A' : '#1A1A1A',
            },
            tooltip: {
                showPercentage: false,
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                borderColor: isDarkMode.value ? '#4A4A4A' : '#9A9A9A',
                backgroundOpacity: 10
            },
            zoom: {
                preview: {
                    fill:  isDarkMode.value ? '#1A1A1A50' : '#1A1A1A10',
                    strokeDasharray: 8
                }
            }
        }
    }
});

const configA = computed(() => {
    return mergeConfigs({
        defaultConfig: config.value,
        userConfig: {
            chart: {
                title: {
                    text: 'Chart A'
                },
            }
        }
    })
})

const configB = computed(() => {
    return mergeConfigs({
        defaultConfig: config.value,
        userConfig: {
            chart: {
                title: {
                    text: 'Chart B'
                }
            }
        }
    })
})


</script>

<template>
    <div class="flex gap-2 flex-wrap align-center justify-around rounded p-2 pt-4 mb-4 bg-white dark:bg-[#2A2A2A]">
        <div class="w-full max-w-[400px]">
            <VueUiXy
                :dataset="datasets.chartA"
                :config="configA"
                :selectedXIndex="selectedXIndex"
            />
        </div>
        <div class="w-full max-w-[400px]">
            <VueUiXy
                :dataset="datasets.chartB"
                :config="configB"
                :selectedXIndex="selectedXIndex"
            />
        </div>
    </div>
</template>