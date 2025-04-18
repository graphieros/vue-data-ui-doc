<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import ButtonSatisfactionBreakdown from "./ButtonSatisfactionBreakdown.vue";
import colorBridge from "color-bridge"
import { VueDataUi } from "vue-data-ui";
import useExamples from "../useExamples";
import mockStats from './mockStats.json'

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
                            offsetY: 40
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
                        rotation: -45,
                        fontSize: 9,
                        // showOnlyAtModulo: 4
                    }
                },
                padding: {
                    top: 64
                }
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
                padding: {
                    left: 64,
                    bottom: 64
                },
                // paths: {
                //     strokeWidth: 10,
                //     useSerieColor: false,
                //     stroke: isDarkMode.value ? '#FFFFFF20' : '#1A1A1A10'
                // },
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
            name: component,
            raters,
            breakdown,
            average:
                groups[component].map((r) => r.rating).reduce((a, b) => a + b, 0) /
                raters || 0,
        };
    });
});

const latestItems = computed(() => {
    if (!stats.value.length) return [];
    const dates = stats.value.map(item => item.created_at.split(' ')[0]);
    const latestDate = dates.reduce((max, date) => date > max ? date : max, dates[0]);
    return stats.value.filter(item => item.created_at.split(' ')[0] === latestDate).map(item => {
        return {
            ...item,
            stars: Array(item.rating).fill('⭐').join(''),
            name: `${item.item_id
                .split('_')
                .map((w, _i) => {
                    return capitalizeFirstLetter(w);
                })
                .join('')}`
        }
    })
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
                padding: {
                    top: 0,
                    right: 36,
                    bottom: 0,
                    left: 64
                },
                title: {
                    text: 'Ratings daily breakdown',
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
                        scaleLabelOffsetX: 20,
                        scaleValueOffsetX: -20,
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
        <div class="max-w-[300px] mx-auto">
            <VueUiGauge :dataset="gaugeDataset" :config="{
                userOptions: { show: false },
                style: {
                    chart: {
                        backgroundColor: 'transparent',
                        color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                        layout: {
                            radiusRatio: 0.8,
                            track: { size: 0 },
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
                        },
                        legend: {
                            showPlusSymbol: false,
                            roundingValue: 2
                        },
                        title: {
                            text: `Ratings breakdown (${stats.length} votes)`,
                            color: isDarkMode ? '#CCCCCC' : '#1A1A1A',
                            fontSize: 20,
                            bold: false,
                            offsetY: 40,
                        },
                    }
                }
            }" />
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
        <div class="text-xl text-center mb-4 flex flex-col">
            <span>Latest votes</span>
            <span class="text-xs text-gray-500">{{ latestItems[0].created_at.split(' ')[0] }}</span>
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
        <VueDataUi component="VueUiHeatmap" :dataset="heatmapDataset" :config="heatmapConfig" />
    </div>

    <div v-if="ratings.length"
        class="w-full max-w-[600px] p-4 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-md shadow-md mt-6">
        <VueDataUi component="VueUiHistoryPlot" :dataset="historyPlotDataset" :config="historyPlotConfig" />
    </div>

    <h2 v-if="ratings.length" class="my-6 text-xl">
        User ratings of individual components
    </h2>
    <div class="flex flex-row flex-wrap gap-2 place-items-center justify-center z-10" v-if="ratings.length">
        <ButtonSatisfactionBreakdown v-for="c in ratings" :dataset-gauge="{
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
            style: {
                background: 'transparent',
                basePosition: 64,
                colors: {
                    min: '#1f77b4',
                    max: '#aec7e8',
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
