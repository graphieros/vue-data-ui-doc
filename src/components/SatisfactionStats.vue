<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const stats = computed(() => {
    return store.ratings.breakdown;
})

// const stats = ref([
//         {
//             "id": 39,
//             "rating": 1,
//             "item_id": "vue_ui_kpi",
//             "created_at": "2025-02-07 06:16:10"
//         },
//         {
//             "id": 38,
//             "rating": 5,
//             "item_id": "vue_ui_kpi",
//             "created_at": "2025-02-07 03:39:02"
//         },
//         {
//             "id": 37,
//             "rating": 5,
//             "item_id": "vue_ui_donut",
//             "created_at": "2025-02-07 03:29:25"
//         },
//         {
//             "id": 35,
//             "rating": 5,
//             "item_id": "vue_ui_donut_evolution",
//             "created_at": "2025-02-06 11:41:28"
//         },
//         {
//             "id": 34,
//             "rating": 5,
//             "item_id": "vue_ui_table_sparkline",
//             "created_at": "2025-02-10 09:00:54"
//         }
//     ])

const ratings = computed(() => {
    const groups = Object.groupBy(stats.value, ({ item_id }) => item_id);
    return Object.keys(groups).map((component) => {
        const raters = groups[component].length;
        return {
            name: component,
            raters,
            average:
                groups[component].map((r) => r.rating).reduce((a, b) => a + b, 0) /
                raters || 0,
        };
    });
});

function fillEmptyDays(dates) {
    const parsedDates = dates.map(dateStr => {
        const parts = dateStr.split('-');
        return new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
    });

    if (parsedDates.length === 0) return [];

    parsedDates.sort((a, b) => a - b);
    const startDate = parsedDates[0];
    const endDate = parsedDates[parsedDates.length - 1];

    if (isNaN(startDate) || isNaN(endDate)) return [];

    const result = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        result.push(`${year}-${month}-${day}`);
        currentDate = new Date(year, currentDate.getMonth(), currentDate.getDate() + 1);
    }
    return result;
}

function dateToTimestamp(dateStr) {
    const date = new Date(dateStr);
    return Math.floor(date.getTime() / 1000);
}

const history = computed(() => {
    const groups = Object.groupBy(stats.value.map(s => {
        const created_at = s.created_at.split(' ')[0];
        return {
            ...s,
            created_at,
            timestamp: dateToTimestamp(created_at)
        }
    }), ({ created_at }) => created_at)

    const dates = fillEmptyDays(Object.keys(groups).toSorted((a, b) => dateToTimestamp(a) - dateToTimestamp(b)))
    
    const ratingsPerDay = dates.map(date => {
        return groups[date] ? groups[date].length : null
    });
    const averagePerDay = dates.map(date => {
        return groups[date] ? groups[date].map(user => user.rating).reduce((a, b) => a + b, 0) / groups[date].length : null
    })

    return {
        dates,
        ratingsPerDay,
        averagePerDay
    }
});

const xyDataset = computed(() => {
    return [
        {
            name: 'Average rating per day',
            series: history.value.averagePerDay,
            type: 'line',
            scaleMin: 0,
            scaleMax: 5,
        },
        { 
            name: 'Ratings per day',
            series: history.value.ratingsPerDay,
            type: 'bar',
        },
    ]
})

const xyConfig = computed(() => {
    return {
        chart: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#F3F4F6',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            grid: {
                labels: {
                    yAxis: {
                        useIndividualScale: true
                    },
                    xAxisLabels: {
                        values: history.value.dates,
                        show: false,
                    }
                }
            },
            highlighter: {
                color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
            },
            legend: {
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            },
            padding: {
                bottom: 6
            },
            title: {
                text: 'User ratings history',
                color: isDarkMode.value ? '#1F77B4' : '#1A1A1A',
                textAlign: 'center',
                subtitle: {
                    text: `${history.value.dates[0]} to ${history.value.dates.at(-1)}`,
                    color: isDarkMode.value ? '#AEC7E8' : "#A1A1A1"
                }
            },
            tooltip: {
                backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                backgroundOpacity: 20,
                borderColor: isDarkMode.value ? '#3A3A3A' : '#E1E5E8',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                showPercentage: false
            },
            userOptions: {
                buttons: {
                    labels: false
                }
            },
            zoom: {
                color: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                highlightColor: '#1F77B4'
            }
        },
        line: {
            radius: 6,
            useGradient: false,
            dot: {
                useSerieColor: false,
                fill: isDarkMode.value ? '#AEC7E8' : '#FFFFFF',
                strokeWidth: 2
            },
            labels: {
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            }
        },
        table: {
            showSum: false,
            th: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#F3F4F6',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            },
            td: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#F3F4F6',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            },
        }
    }
})

const verticalBarDataset = computed(() => {
    return ratings.value.map(r => {
        return {
            name: `${r.name} (${r.raters})`,
            value: r.average,
            color: '#1F77B4'
        }
    })
})

const verticalBarConfig = computed(() => {
    return {
        style: {
            chart: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#F3F4F6',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                layout: {
                    bars: {
                        borderRadius: 1,
                        dataLabels: {
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            offsetX: 8,
                            percentage: {
                                show: false
                            },
                            value: {
                                suffix: ' ⭐'
                            }
                        },
                        height: 24,
                        nameLabels: {
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            offsetX: -12,
                            fontSize: 12
                        }
                    },
                    highlighter: {
                        color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
                    },
                    separators: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                title: {
                    text: 'Component satisfaction ranking',
                    color: isDarkMode.value ? '#1F77B4' : '#1A1A1A',
                    textAlign: 'center',
                    subtitle: {
                        text: `${history.value.dates[0]} to ${history.value.dates.at(-1)}`,
                        color: isDarkMode.value ? '#AEC7E8' : "#A1A1A1"
                    }
                },
                tooltip: {
                    showPercentage: false,
                    suffix: ' ⭐',
                    backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                    backgroundOpacity: 20,
                    borderColor: isDarkMode.value ? '#3A3A3A' : '#E1E5E8',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                }
            }
        },
        userOptions: {
            buttons: {
                table: false
            }
        }
    }
})

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
</script>

<template>
    <h1 v-if="ratings.length" class="my-6 text-xl">
        User ratings of individual components
    </h1>
    <div class="flex flex-row flex-wrap gap-6" v-if="ratings.length">
        <div class="w-[150px] p-2 bg-[#F3F4F6] dark:bg-[#2A2A2A] rounded-md shadow-md" v-for="c in ratings">
            <VueUiSparkgauge :dataset="{
                value: c.average,
                min: 1,
                max: 5,
                title: `${c.name
                    .split('_')
                    .map((w, _i) => {
                        return capitalizeFirstLetter(w);
                    })
                    .join('')} (${c.raters})`,
            }" :config="{
            style: {
                background: 'transparent',
                basePosition: 64,
                colors: {
                    min: '#5f8aee',
                    max: '#42d392',
                },
                dataLabel: {
                    fontSize: 42,
                    rounding: 1,
                    offsetY: -3,
                },
                gutter: {
                    color: isDarkMode ? '#3A3A3A' : '#CCCCCC',
                },
                title: {
                    color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                },
            },
        }" />
        </div>
    </div>

    <div v-if="ratings.length" class="w-full max-w-[600px] p-4 bg-[#F3F4F6] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiXy
            :dataset="xyDataset"
            :config="xyConfig"
        />
    </div>

    <div v-if="ratings.length" class="w-full max-w-[600px] p-4 bg-[#F3F4F6] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiVerticalBar
            :dataset="verticalBarDataset"
            :config="verticalBarConfig"
        />
    </div>
</template>
