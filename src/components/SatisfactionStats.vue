const selectedDate = ref(latestItems.value[0].created_at.split(' ')[0])<script setup>
import { computed, watch, ref } from "vue";
import { useMainStore } from "../stores";
import ButtonSatisfactionBreakdown from "./ButtonSatisfactionBreakdown.vue";
import colorBridge from "color-bridge"
import { VueDataUi } from "vue-data-ui";
import mockStats from './mockStats.json'
import { createUid, fillEmptyDays } from "./maker/lib";

const { utils } = colorBridge();

const {
    shiftHue,
} = utils();

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const stats = computed(() => {
    // return mockStats;
    return store.ratings.breakdown;
})

watch(() => stats, () => {
    setTimeout(() => {
        const texts = document.querySelectorAll('.gauge-sat text');
        const withPath = Array.from(texts).filter(text => !!text.querySelector('textPath'));
        withPath.forEach((p, i) => {
            if (i === 0) {
                p.style.filter = 'hue-rotate(330deg)'
            }
            if (i === 1) {
                p.style.filter = 'hue-rotate(0deg)'
            }
            if (i === 2) {
                p.style.filter = 'hue-rotate(30deg)'
            }
            if (i === 3) {
                p.style.filter = 'hue-rotate(50deg)'
            }
        })
    },100)
}, { immediate: true, deep: true })

const heatmapDataset = computed(() => {

    function getISOWeek(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    }

    function addDayAndWeek(data) {
        const daysMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return data.map(item => {
            const dateObj = new Date(item.created_at.replace(" ", "T"));
            const day = daysMapping[dateObj.getDay()];
            const week = getISOWeek(dateObj);
            return {
                ...item,
                day,
                week
            };
        });
    }

    const augmentedData = addDayAndWeek(stats.value);

    const uniqueWeeks = Array.from(
        new Set(augmentedData.map(item => item.week))
    ).sort((a, b) => a - b);

    const orderedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grouped = {};

    augmentedData.forEach(item => {
        if (!grouped[item.day]) {
            grouped[item.day] = {};
        }
        grouped[item.day][item.week] = (grouped[item.day][item.week] || 0) + 1;
    });

    const result = orderedDays.map(day => {
        const values = uniqueWeeks.map(week => (grouped[day] && grouped[day][week]) || 0);
        return {
            name: day,
            values: values
        };
    });

    return result;
});

function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { year: d.getUTCFullYear(), week: weekNo };
}

function getWeekBoundary(date) {
    const day = date.getDay();
    const isoDay = day === 0 ? 7 : day;
    const monday = new Date(date);
    monday.setDate(date.getDate() - (isoDay - 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
}

function getWeekRanges(data) {

    const weekGroups = {};

    data.forEach(item => {

        const date = new Date(item.created_at.replace(" ", "T"));
        const { year, week } = getISOWeek(date);
        const key = `${year}-${week}`;

        if (!weekGroups[key]) {
            weekGroups[key] = date;
        }
    });

    const results = [];

    Object.keys(weekGroups).forEach(key => {
        const [, weekStr] = key.split('-');
        const weekNum = weekStr;
        const repDate = weekGroups[key];

        const { monday, sunday } = getWeekBoundary(repDate);
        const mondayStr = monday.toISOString().split('T')[0];
        const sundayStr = sunday.toISOString().split('T')[0];

        // results.push(`Week ${weekNum}: ${mondayStr} to ${sundayStr}`);
        results.push(`Week ${weekNum} `);
    });

    results.sort((a, b) => {
        const aWeek = parseInt(a.match(/^Week (\d+)/)[1], 10);
        const bWeek = parseInt(b.match(/^Week (\d+)/)[1], 10);
        // const aWeek = parseInt(a.match(/^Week (\d+):/)[1], 10);
        // const bWeek = parseInt(b.match(/^Week (\d+):/)[1], 10);
        return aWeek - bWeek;
    });

    return results;
}

const heatmapConfig = computed(() => {
    return {
        userOptions: { show: false },
        style: {
            backgroundColor: 'transparent',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            layout: {
                cells: {
                    rowTotal: {
                        value: {
                            show: true,
                        },
                        color: {
                            show: true
                        }
                    },
                    columnTotal: {
                        value: {
                            show: true,
                            rotation: 0,
                            offsetX: 0,
                            offsetY: 6
                        },
                        color: {
                            show: true
                        },
                    },
                    colors: {
                        hot: '#1F77B4',
                        cold: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                        underlayer: 'transparent'
                    },
                    spacing: 0,
                    selected: {
                        border: 2,
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                    }
                },
                dataLabels: {
                    yAxis: {
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
                    },
                    xAxis: {
                        values: getWeekRanges(stats.value),
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 9,
                        // showOnlyAtModulo: 4
                    }
                },
            },
            legend: { show: false },
            title: {
                text: 'Number of votes per day',
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
            },
        }
    }
})

function getCumulativeAveragePerDayWithMissingDays(statistics) {
    console.log(statistics)
    const ratingsByDate = {};
    statistics.forEach(entry => {
        const date = entry.created_at.split(' ')[0];
        if (!ratingsByDate[date]) {
            ratingsByDate[date] = [];
        }
        ratingsByDate[date].push(entry.rating);
    });

    const ratingDates = Object.keys(ratingsByDate).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const allDates = fillEmptyDays(ratingDates);

    let cumulativeSum = 0;
    let cumulativeCount = 0;
    const cumulativeAverages = [];

    allDates.forEach(date => {
        if (ratingsByDate[date]) {
            ratingsByDate[date].forEach(rating => {
                cumulativeSum += rating;
                cumulativeCount++;
            });
            cumulativeAverages.push({
                date: date,
                cumulativeAverage: cumulativeSum / cumulativeCount
            });
        } else {
            cumulativeAverages.push({
                date: date,
                cumulativeAverage: null
            });
        }
    });

    return cumulativeAverages;
}

function getMonthlyStatistics(statistics) {
    const monthLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthsData = {};

    statistics.forEach(entry => {
        const date = new Date(entry.created_at);
        const monthIndex = date.getMonth();
        if (!monthsData[monthIndex]) {
            monthsData[monthIndex] = { ratings: [] };
        }
        const rating = typeof entry.rating === 'number' ? entry.rating : parseFloat(entry.rating);
        monthsData[monthIndex].ratings.push(rating);
    });

    const result = [];
    for (const monthIndex in monthsData) {
        const index = parseInt(monthIndex, 10);
        const ratings = monthsData[index].ratings;
        const count = ratings.length;
        const sum = ratings.reduce((acc, cur) => acc + cur, 0);
        const average = sum / count;
        result.push({
            x: count,
            y: average,
            label: monthLabels[index]
        });
    }
    result.sort((a, b) => monthLabels.indexOf(a.label) - monthLabels.indexOf(b.label));
    return result;
}


const historyPlotDataset = computed(() => {
    return [{
        name: 'Average monthly rating and total votes',
        values: getMonthlyStatistics(JSON.parse(JSON.stringify(stats.value)))
    }]
})

const historyPlotConfig = computed(() => {
    return {
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                axes: {
                    x: {
                        labels: {
                            color: isDarkMode.value ? '#8A8A8A' : '#8A8A8A'
                        },
                        name: {
                            text: 'Number of votes',
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            offsetY: -12
                        }
                    },
                    y: {
                        scaleMin: 1,
                        scaleMax: 5,
                        labels: {
                            color: isDarkMode.value ? '#8A8A8A' : '#8A8A8A',
                        },
                        name: {
                            text: 'Average rating',
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        }
                    }
                },
                grid: {
                    xAxis: {
                        stroke: '#CCCCCC'
                    },
                    horizontalLines: {
                        stroke: isDarkMode.value ? '#4A4A4A' : '#E1E5E8'
                    },
                    verticalLines: {
                        stroke: isDarkMode.value ? '#4A4A4A' : '#E1E5E8'
                    },
                    yAxis: {
                        stroke: '#CCCCCC'
                    }
                },
                legend: { show: false },
                paths: {
                    strokeWidth: 6,
                    useSerieColor: false,
                    stroke: isDarkMode.value ? '#FFFFFF20' : '#1A1A1A20'
                },
                plots: {
                    radius: 6,
                    stroke: isDarkMode.value ? '#3A3A3A' : '#FFFFFF',
                    indexLabels: {
                        show: false,
                        fontSize: 8
                    },
                    labels: {
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        offsetY: 6
                    }
                },
                title: {
                    text: 'Monthly average rating & number of votes',
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
                    roundingValue: 2
                },
            }
        }
    }
})

function calcAverage(ds) {
    let arr = []
    let sum = []
    Object.keys(ds).forEach(key => {
        arr.push(Number(key) * ds[key])
        sum.push(ds[key])
    })
    return arr.reduce((a, b) => a + b, 0) / sum.reduce((a, b) => a + b, 0)
}

const gaugeDataset = computed(() => {
    return {
        value: calcAverage(history.value.ratingBreakdown),
        series: [
            { from: 1, to: 2, color: '#c97047', name: '🙁' },
            { from: 2, to: 3, color: '#c5c947', name: '😐' },
            { from: 3, to: 4, color: '#86c947', name: '🙂' },
            { from: 4, to: 5, color: '#54b840', name: '😀' },
        ]
    }
})

const ratings = computed(() => {
    const groups = Object.groupBy(stats.value, ({ item_id }) => item_id);
    return Object.keys(groups).map((component) => {
        const raters = groups[component].length;
        const breakdown = countRatings(Object.groupBy(groups[component], ({ rating }) => rating));
        return {
            id: createUid(),
            name: component,
            raters,
            breakdown,
            average:
                groups[component].map((r) => r.rating).reduce((a, b) => a + b, 0) /
                raters || 0,
        };
    })
});

const individualRatings = computed(() => {
    return [...ratings.value].toSorted((a, b) => detailSortMode.value === 'byVotes' ? b.raters - a.raters : b.average - a.average)
})

const today = new Date().toISOString().slice(0, 10)
const selectedDate = ref(today)

const latestItems = computed(() => {
  if (!Array.isArray(stats.value) || !stats.value.length || !selectedDate.value) return [];
  return stats.value
    .filter(item => item && typeof item.created_at === 'string')
    .filter(item => item.created_at.split(' ')[0] === selectedDate.value)
    .map(item => ({
      ...item,
      stars: Array(item.rating).fill('⭐').join(''),
      name: item.item_id
        .split('_')
        .map(capitalizeFirstLetter)
        .join('')
    }))
});


const stackbarData = computed(() => {
    const stripped = stats.value.map(s => ({
        ...s,
        created_at: s.created_at.split(' ')[0]
    }));

    const groups = Object.groupBy(stripped, ({ created_at }) => created_at);

    const dates = fillEmptyDays(
        Object.keys(groups).toSorted((a, b) => dateToTimestamp(a) - dateToTimestamp(b))
    );

    const defaultRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const t = dates.map(date => {
        let series;
        if (groups[date]) {
            series = countRatings(
                Object.groupBy(groups[date], ({ rating }) => rating)
            );
            series = { ...defaultRatings, ...series };
        } else {
            series = { ...defaultRatings };
        }
        return series;
    });

    const colors = [
        '#fc5603',
        '#ff8c00',
        '#ffd500',
        '#07e319',
        '#1F77B4'
    ];

    const arr = [];
    for (let i = 1; i <= 5; i += 1) {
        arr.push({
            name: Array(i).fill('⭐').join(''),
            series: t.map(series => series[i]),
            color: colors[i - 1]
        });
    }
    return arr;
});


const stackbarConfig = computed(() => {
    return {
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                bars: {
                    distributed: false,
                    gapRatio: 0,
                    totalValues: {
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    },
                    dataLabels: {
                        show: false
                    }
                },
                grid: {
                    x: {
                        axisColor: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                        timeLabels: {
                            show: false,
                            values: history.value.dates
                        }
                    },
                    y: {
                        axisColor: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                        axisName: {
                            show: true,
                            text: 'Number of votes',
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            fontSize: 24
                        },
                        axisLabels: {
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            fontSize: 16,
                            rounding: 1
                        }
                    }
                },
                highlighter: {
                    color: isDarkMode.value ? '#FFFFFF' : '#1A1A1A'
                },
                legend: {
                    backgroundColor: 'transparent',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                },
                title: {
                    text: 'Satisfaction survey, ratings breakdown',
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
                },
                zoom: {
                    color: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                    highlightColor: '#1F77B4',
                    startIndex: history.value.averagePerDay.length - 14,
                    endIndex: history.value.averagePerDay.length - 1
                }
            }
        }
    }
})

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

    const ratingBreakdown = countRatings(Object.groupBy(stats.value, ({ rating }) => rating));

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

function makeRatingBreakdown(ratingBreakdown, name, type = "bar") {
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
            userOptions: { show: false },
        },
        bar: {
            labels: {
                show: true,
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                offsetY: -12,
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
            suffix: ' ⭐',
            scaleLabel: 'Satisfaction rating'
        },
        {
            name: 'Cumulative average',
            series: getCumulativeAveragePerDayWithMissingDays(stats.value).map(d => d.cumulativeAverage),
            type: 'line',
            smooth: true,
            scaleMin: 0,
            scaleMax: 5,
            scaleSteps: 5,
            suffix: ' ⭐',
            color: '#ff7f0e',
            scaleLabel: 'Satisfaction rating'
        },
        {
            name: 'Number of daily votes',
            series: history.value.ratingsPerDay,
            type: 'bar',
            scaleSteps: 5,
            color: '#aec7e8'
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
                        labelWidth: 32,
                        scaleLabelOffsetX: 0,
                        scaleValueOffsetX: 0,
                        groupColor: isDarkMode.value ? '#8A8A8A' : '#1A1A1A'

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
            title: {
                text: 'Satisfaction survey history',
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
                roundingValue: 2
            },
            userOptions: {
                buttons: {
                    labels: false
                }
            },
            zoom: {
                color: isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                highlightColor: '#1F77B4',
                startIndex: history.value.averagePerDay.length - 14,
                endIndex: history.value.averagePerDay.length - 1
            }
        },
        bar: {
            periodGap: 0.01,
        },
        line: {
            radius: 4,
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
    return ratings.value.sort((a, b) => b.raters - a.raters).map((r, i) => {
        return {
            name: `${r.name
                .split('_')
                .map((w, _i) => {
                    return capitalizeFirstLetter(w);
                })
                .join('')} ( ${r.raters} )`,
            value: r.average,
            raters: r.raters
        }
    })
        .toSorted((a, b) => b.value - a.value)
        .map((r, i) => {
            return {
                ...r,
                color: shiftHue({
                    hexColor: '#1F77B4',
                    force: -i / ratings.value.length / 5
                })
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
                        gap: 2,
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
                        height: 16,
                        nameLabels: {
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            offsetX: -12,
                            fontSize: 10
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

function toVueUiMoodRadarDataset(data) {
    return data.reduce(
        (acc, { rating }) => {
        const key = String(rating);
        if (acc.hasOwnProperty(key)) acc[key]++;
        return acc;
        },
        { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
    );
}

const radarDataset = computed(() => {
    if(!stats.value) return undefined
    return toVueUiMoodRadarDataset(stats.value)
})

const radarConfig = computed(() => {
    return {
        userOptions: { show: false },
        style: {
            chart: {
                backgroundColor: 'transparent',
                layout: {
                    dataLabel: {
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        roundingPercentage: 2
                    },
                    dataPolygon: {
                        color: '#1f77b4',
                        stroke: '#1f77b4',
                        strokeWidth: 1,
                        gradient: {
                            intensity: 7
                        }
                    },
                    grid: {
                        stroke: isDarkMode.value ? '#5A5A5A' : '#CCCCCC'
                    },
                    outerPolygon: {
                        stroke: isDarkMode.value ? '#7A7A7A' : '#BBBBBB'
                    }
                },
                legend: {
                    show: false
                }
            }
        }
    }
})

const detailSortMode = ref('byVotes') // or 'byRatings'

function getDateFromAxis({ xAxisName, yAxisName }, year = new Date().getFullYear()) {
    const daysMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekNum = parseInt(xAxisName.replace(/[^0-9]/g, ""), 10);
    const dayIndex = daysMapping.indexOf(yAxisName);
    if (isNaN(weekNum) || dayIndex === -1) return null;

    for (let month = 0; month < 12; month += 1) {
        for (let day = 1; day <= 31; day += 1) {
            let date;
            try {
                date = new Date(Date.UTC(year, month, day));
                if (date.getUTCMonth() !== month) continue;
            } catch {
                continue;
            }
            if (date.getUTCDay() !== dayIndex) continue;

            const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

            if (weekNo === weekNum) {
                const yyyy = date.getUTCFullYear();
                const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
                const dd = String(date.getUTCDate()).padStart(2, "0");
                return `${yyyy}-${mm}-${dd}`;
            }
        }
    }
    return null;
}

function selectHeatmapCell(cell) {
    console.log(cell)
    selectedDate.value = getDateFromAxis(cell);
}

</script>

<template>
    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiXy :dataset="xyDataset" :config="xyConfig" />
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueUiVerticalBar :dataset="verticalBarDataset" :config="verticalBarConfig" />
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <div class="text-center text-xl">Ratings breakdown ({{ stats.length }} votes)</div>
        <div class="flex flex-row place-items-center gap-2">
            <div class="w-full">
                <VueUiGauge :dataset="gaugeDataset" :config="{
                    userOptions: { show: false },
                    style: {
                        chart: {
                            backgroundColor: 'transparent',
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                            layout: {
                                radiusRatio: 0.8,
                                track: { size: 0.1 },
                                markers: {
                                    offsetY: 40,
                                    color: isDarkMode ? '#8A8A8A' : '#1A1A1A'
                                },
                                segmentNames: { fontSize: 55 },
                                segmentSeparators: {
                                    show: true,
                                    stroke: isDarkMode ? '#4A4A4A' : '#CCCCCC',
                                    offsetOut: 36,
                                    offsetIn: 150
                                },
                                pointer: {
                                    size: 1.1,
                                    stroke: 'transparent',
                                    circle: {
                                        color: isDarkMode ? '#6A6A6A' : '#FFFFFF'
                                    }
                                },
                                indicatorArc: {
                                    show: true,
                                    fill: isDarkMode ? '#FFFFFF10' : '#00000010',
                                    radius: 1000
                                },
                            },
                            legend: {
                                showPlusSymbol: false,
                                roundingValue: 2
                            },
                            // title: {
                            //     text: `Ratings breakdown (${stats.length} votes)`,
                            //     color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                            //     fontSize: 20,
                            //     bold: false,
                            //     offsetY: 40,
                            // },
                        }
                    }
                }" />
            </div>
            <div class="w-full">
                <VueUiMoodRadar :dataset="radarDataset" :config="radarConfig"/>
            </div>
        </div>

        <!-- <VueUiRating :dataset="{
            rating: history.ratingBreakdown
        }" :config="{
                type: 'star',
                readonly: true,
                style: {
                    backgroundColor: 'transparent',
                    title: {
                        text: `Ratings breakdown (${stats.length} votes)`,
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 20,
                        bold: false,
                        offsetY: 40,
                    },
                    star: {
                        inactiveColor: isDarkMode ? '#3A3A3A' : '#FFFFFF'
                    },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        borderColor: isDarkMode ? '#fdd663' : '#E1E5E8',
                        offsetY: 12,
                    }
                }
            }" /> -->
        <VueUiXy :dataset="ratingBreakdownBarDataset" :config="{
            ...ratingBreakdownBarConfig,
            bar: {
                ...ratingBreakdownBarConfig.bar,
                labels: {
                    ...ratingBreakdownBarConfig.bar.labels,
                    formatter: ({ value }) => {
                        if (!value) return value
                        return `${value} (${Math.round(value / stats.length * 100)}%)`
                    }
                }
            }
        }" />
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueDataUi component="VueUiStackbar" :dataset="stackbarData" :config="stackbarConfig" />
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueDataUi component="VueUiHeatmap" :dataset="heatmapDataset" :config="heatmapConfig" @selectDatapoint="selectHeatmapCell"/>
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <div class="text-xl text-center mb-4 flex flex-col">
            <span>Latest votes ({{ latestItems.length }})</span>
            <input
                id="date"
                type="date"
                v-model="selectedDate"
                class="
                    mx-auto
                    mt-3
                    block w-52 px-3 py-1 rounded-xl shadow
                    focus:ring-2 focus:ring-app-blue focus:border-app-blue
                    border border-gray-300 bg-white text-gray-800
                    hover:border-blue-400
                    transition duration-200 outline-none
                    dark:border-gray-700 dark:bg-[#FFFFFF50] dark:text-[#1A1A1A]
                    dark:focus:border-app-blue dark:focus:ring-app-blue
                    dark:hover:border-app-blue
                    dark:placeholder-gray-400
                "
                placeholder="YYYY-MM-DD"
            />
        </div>
        <div class="w-full text-center text-gray-500" v-if="latestItems.length === 0">
            No votes were cast on this day.
        </div>
        <ul>
            <li v-for="item in latestItems" class="flex flex-row gap-2">
                <span>{{ item.stars }}</span>
                <span class="text-gray-400 dark:text-gray-500">VueUi<span class="text-black dark:text-gray-200">{{
                    item.name.replaceAll('VueUi', '') }}</span></span>
            </li>
        </ul>
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueDataUi component="VueUiHistoryPlot" :dataset="historyPlotDataset" :config="historyPlotConfig" />
    </div>

    <h2 v-if="ratings.length" class="mt-12 mb-3 text-xl">
        User ratings of individual components
    </h2>

    <div class="flex flex-row place-items-center justify-center mb-6 gap-4">
        <label class="flex flex-row gap-1 place-items-center cursor-pointer">
            <span :class="`select-none ${detailSortMode === 'byVotes' ? 'text-app-blue' : ''}`">By votes</span>
            <input type="radio" v-model="detailSortMode" class="accent-app-blue" value="byVotes">
        </label>
        <label class="flex flex-row gap-1 place-items-center cursor-pointer">
            <span :class="`select-none ${detailSortMode === 'byRatings' ? 'text-app-blue' : ''}`">By ratings</span>
            <input type="radio" v-model="detailSortMode" class="accent-app-blue" value="byRatings">
        </label>
    </div>

    <div class="flex flex-row flex-wrap gap-2 place-items-center justify-center z-10" v-if="ratings.length">
        <ButtonSatisfactionBreakdown
            v-for="c in individualRatings"
            :key="c.id"
            :dataset-gauge="{
            value: c.average,
            series: [
                { from: 1, to: 3, color: '#c97047' , name: 'BAD' },
                { from: 3, to: 4, color: '#FFDD00', name: 'ACCEPTABLE' },
                { from: 4, to: 5, color: '#54b840', name: 'VERY GOOD' }
            ]
        }" 
            :total="c.raters"
            :datasetRating="{ rating: c.average }"
            :configRating="{
                readonly: true,
                style: {
                    backgroundColor: 'transparent',
                    star: {
                        inactiveColor: 'transparent'
                    }
                }
            }"
            :name="c.name
                .split('_')
                .map((w, _i) => {
                    return capitalizeFirstLetter(w);
                })
                .join('')"
        :dataset-xy="makeRatingBreakdown(c.breakdown, 'Number of votes')" :config-gauge="{
            userOptions: { show: false },
            style: {
                chart: {
                    backgroundColor: 'transparent',
                    layout: {
                        indicatorArc: {
                            show: true,
                            fill: isDarkMode ? '#4A4A4A' : '#E1E5E8',
                            radius: 100
                        },
                        markers: {
                            show: false,
                        },
                        pointer: {
                            stroke: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                            circle: {
                                radius: 18,
                                stroke: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                                color: isDarkMode ? '#5A5A5A' : '#8A8A8A'
                            }
                        },
                        segmentNames: {
                            fontSize: 24
                        }
                    },
                    legend: {
                        roundingValue: 2,
                        fontSize: 63
                    }
                }
            },
        }" :config-xy="{
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
                            fontSize: isDarkMode ? 24 : 36,
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
        }" />
    </div>
</template>