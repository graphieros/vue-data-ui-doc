<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import ButtonSatisfactionBreakdown from "./ButtonSatisfactionBreakdown.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const stats = computed(() => {
    return store.ratings.breakdown;
})

// const stats = ref([
//   {
//     "id": 53,
//     "rating": 5,
//     "item_id": "vue_ui_age_pyramid",
//     "created_at": "2025-02-14 11:14:20"
//   },
//   {
//     "id": 52,
//     "rating": 1,
//     "item_id": "vue_ui_thermometer",
//     "created_at": "2025-02-14 08:43:51"
//   },
//   {
//     "id": 51,
//     "rating": 4,
//     "item_id": "vue_ui_kpi",
//     "created_at": "2025-02-14 03:07:50"
//   },
//   {
//     "id": 50,
//     "rating": 4,
//     "item_id": "vue_ui_kpi",
//     "created_at": "2025-02-13 13:00:16"
//   },
//   {
//     "id": 49,
//     "rating": 5,
//     "item_id": "vue_ui_bullet",
//     "created_at": "2025-02-13 09:42:49"
//   },
//   {
//     "id": 48,
//     "rating": 5,
//     "item_id": "vue_ui_quick_chart",
//     "created_at": "2025-02-13 04:49:29"
//   },
//   {
//     "id": 47,
//     "rating": 5,
//     "item_id": "vue_ui_xy",
//     "created_at": "2025-02-13 03:24:13"
//   },
//   {
//     "id": 46,
//     "rating": 5,
//     "item_id": "vue_ui_sparkgauge",
//     "created_at": "2025-02-12 10:10:54"
//   },
//   {
//     "id": 45,
//     "rating": 4,
//     "item_id": "vue_ui_table_heatmap",
//     "created_at": "2025-02-12 03:57:57"
//   },
//   {
//     "id": 44,
//     "rating": 5,
//     "item_id": "vue_ui_carousel_table",
//     "created_at": "2025-02-10 03:46:45"
//   },
//   {
//     "id": 42,
//     "rating": 4,
//     "item_id": "vue_ui_sparkgauge",
//     "created_at": "2025-02-08 07:46:48"
//   },
//   {
//     "id": 39,
//     "rating": 1,
//     "item_id": "vue_ui_kpi",
//     "created_at": "2025-02-07 06:16:10"
//   },
//   {
//     "id": 38,
//     "rating": 5,
//     "item_id": "vue_ui_kpi",
//     "created_at": "2025-02-07 03:39:02"
//   },
//   {
//     "id": 37,
//     "rating": 5,
//     "item_id": "vue_ui_donut",
//     "created_at": "2025-02-07 03:29:25"
//   },
//   {
//     "id": 35,
//     "rating": 5,
//     "item_id": "vue_ui_donut_evolution",
//     "created_at": "2025-02-06 11:41:28"
//   },
//   {
//     "id": 34,
//     "rating": 5,
//     "item_id": "vue_ui_table_sparkline",
//     "created_at": "2025-02-06 09:00:54"
//   }
// ])

const ratings = computed(() => {
    const groups = Object.groupBy(stats.value, ({ item_id }) => item_id);
    return Object.keys(groups).map((component) => {
        const raters = groups[component].length;
        const breakdown = countRatings(Object.groupBy(groups[component], ({ rating }) => rating));
        return {
            name: component,
            raters,
            breakdown,
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

function countRatings(ratingsObj) {
    let result = {};
    
    for (let i = 1; i <= 5; i++) {
        if (ratingsObj[i]) {
            result[i] = ratingsObj[i].length;
        } else {
            result[i] = 0;
        }
    }
    
    return result;
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

    const ratingBreakdown = countRatings(Object.groupBy(stats.value, ({ rating }) =>  rating));

    return {
        dates,
        ratingsPerDay,
        averagePerDay,
        ratingBreakdown
    }
});

const ratingBreakdownBarDataset = computed(() => {
    const source = Object.keys(history.value.ratingBreakdown)
    const bd = source.map(key => {
        return history.value.ratingBreakdown[key] || 0
    })
    return [
        {
            name: 'Number of votes',
            series: bd,
            type: 'bar',
            dataLabels: true
        }
    ]
})

function makeRatingBreakdown(ratingBreakdown, name, type="bar") {
    const source = Object.keys(ratingBreakdown);
    const series = source.map(key => {
        return ratingBreakdown[key] || 0
    })
    return [
        {
            name,
            series,
            type,
            dataLabels: true
        }
    ]
}

const ratingBreakdownBarConfig = computed(() => {
    return {
        chart: {
            backgroundColor: 'transparent',
            grid: {
                labels: {
                    show: false,
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    xAxisLabels: {
                        values: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 24
                    },
                    yAxis: {
                        showBaseline: false,
                    }
                },
                stroke: isDarkMode.value ? '#6A6A6A' : '#CCCCCC'
            },
            highlighter: {
                color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
            },
            labels: {
                fontSize: 28
            },
            legend: {
                show: false,
            },
            tooltip: {
                backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                backgroundOpacity: 20,
                borderColor: isDarkMode.value ? '#3A3A3A' : '#E1E5E8',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                showPercentage: false,
            },
            userOptions: { show: false }
        },
        bar: {
            labels: {
                show: true,
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                offsetY: -12
            }
        }
    }
})

const xyDataset = computed(() => {
    return [
        {
            name: 'Average rating',
            series: history.value.averagePerDay,
            type: 'line',
            smooth: true,
            scaleMin: 0,
            scaleMax: 5,
            scaleSteps: 5,
            suffix: ' ⭐'
        },
        { 
            name: 'Ratings per day',
            series: history.value.ratingsPerDay,
            type: 'bar',
            scaleSteps: 5
        },
    ]
})

const xyConfig = computed(() => {
    return {
        chart: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            grid: {
                labels: {
                    fontSize: 20,
                    yAxis: {
                        useIndividualScale: true,
                        labelWidth: 64,
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
                bottom: 12,
                left: 80
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
                showPercentage: false,
                roundingValue: 1
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
        bar: {
            periodGap: 0.01,
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
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            },
            td: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
            },
        }
    }
})

const verticalBarDataset = computed(() => {
    return ratings.value.map(r => {
        return {
            name: `${r.name
                    .split('_')
                    .map((w, _i) => {
                        return capitalizeFirstLetter(w);
                    })
                    .join('')} ( ${r.raters} )`,
            value: r.average,
            color: '#1F77B4'
        }
    })
})

const verticalBarConfig = computed(() => {
    return {
        style: {
            chart: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
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
                                suffix: ' ⭐',
                                roundingValue: 1
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
                    roundingValue: 1
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
    <div v-if="ratings.length" class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiXy
            :dataset="xyDataset"
            :config="xyConfig"
        />
    </div>

    <div v-if="ratings.length" class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiVerticalBar
            :dataset="verticalBarDataset"
            :config="verticalBarConfig"
        />
    </div>

    <div v-if="ratings.length" class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiRating
            :dataset="{
                rating: history.ratingBreakdown
            }"
            :config="{
                type: 'star',
                readonly: true,
                style: {
                    backgroundColor: 'transparent',
                    title: {
                        text: 'Ratings breakdown',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 20,
                        bold: false,
                        offsetY: 40
                    },
                    star: {
                        inactiveColor: isDarkMode ? '#3A3A3A': '#FFFFFF'
                    },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        borderColor: isDarkMode ? '#fdd663' : '#E1E5E8',
                        offsetY: 12,
                    }
                }
            }"
        />
        <VueUiXy
            :dataset="ratingBreakdownBarDataset"
            :config="ratingBreakdownBarConfig"
        />
    </div>

    <h2 v-if="ratings.length" class="my-6 text-xl">
        User ratings of individual components
    </h2>
    <div class="flex flex-row flex-wrap gap-2 place-items-center justify-center z-10" v-if="ratings.length">
        <ButtonSatisfactionBreakdown 
            v-for="c in ratings"
            :dataset-gauge="{
                value: c.average,
                min: 1,
                max: 5,
                title: `${c.name
                    .split('_')
                    .map((w, _i) => {
                        return capitalizeFirstLetter(w);
                    })
                    .join('')} (${c.raters})`,
            }"
            :dataset-xy="makeRatingBreakdown(c.breakdown, 'Number of votes')"
            :config-gauge="{
                style: {
                    background: 'transparent',
                    basePosition: 64,
                    colors: {
                        min: '#5f8aee',
                        max: '#42d392',
                    },
                    dataLabel: {
                        fontSize: 28,
                        rounding: 1,
                        offsetY: -3,
                        suffix: ' ⭐'
                    },
                    gutter: {
                        color: isDarkMode ? '#3A3A3A' : '#CCCCCC',
                    },
                    title: {
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                    },
                },
            }"
            :config-xy="{
                ...ratingBreakdownBarConfig,
                chart: {
                    ...ratingBreakdownBarConfig.chart,
                    grid: {
                        ...ratingBreakdownBarConfig.chart.grid,
                        labels: {
                            ...ratingBreakdownBarConfig.chart.grid.labels,
                            xAxisLabels: {
                                ...ratingBreakdownBarConfig.chart.grid.labels.xAxisLabels,
                                values: isDarkMode ? ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'] : ['★', '★★', '★★★', '★★★★', '★★★★★'],
                                fontSize: isDarkMode ? 24: 36,
                                yOffset: isDarkMode ? 4 : -4
                            }
                        }
                    },
                    labels: {
                        fontSize: 64
                    },
                    padding: {
                        top: 100
                    }
                },
                bar: {
                    ...ratingBreakdownBarConfig.bar,
                    labels: {
                        ...ratingBreakdownBarConfig.bar.labels,
                        offsetY: -36
                    }
                }
            }"
        />
    </div>
</template>
