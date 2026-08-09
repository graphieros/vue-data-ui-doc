<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../stores";
import useMobile from "../useMobile";
import { fillEmptyDays } from "./maker/lib";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const selectedPeriod = ref("_6M");

const periods = computed(() => ({
    _7D: {
        id: "_7D",
        name: "Last 7 days",
        amount: 7,
        unit: "day",
        plotRadius: 8,
    },
    _15D: {
        id: "_15D",
        name: "Last 15 days",
        amount: 15,
        unit: "day",
        plotRadius: 8,
    },
    _30D: {
        id: "_30D",
        name: "Last 30 days",
        amount: 30,
        unit: "day",
        plotRadius: 6,
    },
    _60D: {
        id: "_60D",
        name: "Last 60 days",
        amount: 60,
        unit: "day",
        plotRadius: 4,
    },
    _90D: {
        id: "_90D",
        name: "Last 90 days",
        amount: 90,
        unit: "day",
        plotRadius: 3,
    },
    _6M: {
        id: "_6M",
        name: "Last 6 months",
        amount: 6,
        unit: "month",
        plotRadius: 0.1,
    },
    _1Y: {
        id: "_1Y",
        name: "Last year",
        amount: 1,
        unit: "year",
        plotRadius: 0.1,
    },
    _2Y: {
        id: "_2Y",
        name: "Last 2 years",
        amount: 2,
        unit: "year",
        plotRadius: 0.1,
    },
    _3Y: {
        id: "_3Y",
        name: "Last 3 years",
        amount: 3,
        unit: "year",
        plotRadius: 0.1,
    },
    _ALL: {
        id: "_ALL",
        name: "Full history",
        amount: null,
        unit: "all",
        plotRadius: 0.1,
    },
}));

function parseDay(day) {
    if (typeof day !== "string") return null;

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const date = Number(match[3]);
    const parsed = new Date(Date.UTC(year, month - 1, date));

    if (
        parsed.getUTCFullYear() !== year ||
        parsed.getUTCMonth() !== month - 1 ||
        parsed.getUTCDate() !== date
    ) {
        return null;
    }

    return parsed;
}

function formatDay(date) {
    return date.toISOString().slice(0, 10);
}

function addDays(day, amount) {
    const date = parseDay(day);
    if (!date) return null;

    date.setUTCDate(date.getUTCDate() + amount);
    return formatDay(date);
}

function shiftCalendarDay(day, { amount, unit }) {
    const date = parseDay(day);
    if (!date) return null;

    if (unit === "day") {
        date.setUTCDate(date.getUTCDate() - amount);
        return formatDay(date);
    }

    const originalDate = date.getUTCDate();
    date.setUTCDate(1);

    if (unit === "month") {
        date.setUTCMonth(date.getUTCMonth() - amount);
    } else if (unit === "year") {
        date.setUTCFullYear(date.getUTCFullYear() - amount);
    } else {
        return null;
    }

    const lastDateOfTargetMonth = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
    ).getUTCDate();

    date.setUTCDate(Math.min(originalDate, lastDateOfTargetMonth));
    return formatDay(date);
}

function shiftOneYearBack(day) {
    const date = parseDay(day);
    if (!date) return null;

    const year = date.getUTCFullYear() - 1;
    const month = date.getUTCMonth();
    const dayOfMonth = date.getUTCDate();
    const shifted = new Date(Date.UTC(year, month, dayOfMonth));

    // There is no exact year-over-year counterpart for February 29.
    if (
        shifted.getUTCFullYear() !== year ||
        shifted.getUTCMonth() !== month ||
        shifted.getUTCDate() !== dayOfMonth
    ) {
        return null;
    }

    return formatDay(shifted);
}

function normalizeData(data) {
    if (!Array.isArray(data)) return [];

    return [...data]
        .filter((entry) => parseDay(entry?.day))
        .sort((a, b) => a.day.localeCompare(b.day));
}

function createDataMap(data) {
    return new Map(normalizeData(data).map((entry) => [entry.day, entry]));
}

function createDayRange(startDay, endDayExclusive) {
    if (!startDay || !endDayExclusive || startDay >= endDayExclusive) {
        return [];
    }

    const days = [];
    let cursor = startDay;

    while (cursor < endDayExclusive) {
        days.push(cursor);
        cursor = addDays(cursor, 1);
        if (!cursor) break;
    }

    return days;
}

const normalizedLibData = computed(() => normalizeData(store.downloads.lib));

// The API always includes the current day as a trailing zero.
// That date is our exclusive cutoff and is never included in a chart series.
const cutoffDay = computed(() => normalizedLibData.value.at(-1)?.day ?? null);

const currentDates = computed(() => {
    const cutoff = cutoffDay.value;
    const period = periods.value[selectedPeriod.value];

    if (!cutoff || !period) return [];

    if (period.unit === "all") {
        const firstCompleteDay = normalizedLibData.value.find(
            (entry) => entry.day < cutoff,
        )?.day;

        return createDayRange(firstCompleteDay, cutoff);
    }

    const startDay = shiftCalendarDay(cutoff, period);
    return createDayRange(startDay, cutoff);
});

// The comparison is always year-over-year. It is not the block immediately
// preceding the selected period. Therefore every selector ends on the same
// previous-year date.
const previousDates = computed(() =>
    currentDates.value.map((day) => shiftOneYearBack(day)),
);

function getSeriesForDates(data, days) {
    const dataByDay = createDataMap(data);

    return days.map((day) => {
        if (!day) return null;
        const value = dataByDay.get(day)?.downloads;
        return Number.isFinite(value) ? value : null;
    });
}

const data_lib = computed(() =>
    getSeriesForDates(store.downloads.lib, currentDates.value),
);

const data_lib_previous = computed(() =>
    getSeriesForDates(store.downloads.lib, previousDates.value),
);

const data_cli = computed(() =>
    getSeriesForDates(store.downloads.cli, currentDates.value),
);

const data_color_bridge = computed(() =>
    getSeriesForDates(store.downloads.color_bridge, currentDates.value),
);

const data_vue_hi_code = computed(() =>
    getSeriesForDates(store.downloads.hiCode, currentDates.value),
);

const { isMobile } = useMobile();

const dates = computed(() => currentDates.value);

const source = [
    {
        date: "2026-01-24",
        name: "npmx",
    },
    {
        date: "2026-05-03",
        name: "agentscan",
    },
];

const keyDates = computed(() => {
    return source
        .map((item) => {
            const index = dates.value.indexOf(item.date);

            return index !== -1
                ? {
                      ...item,
                      index,
                  }
                : null;
        })
        .filter(Boolean);
});

function log(n) {
    console.log(n);
    return "";
}

const dataset = computed(() => {
    return [
        {
            name: "vue-data-ui",
            series: data_lib.value,
            type: "line",
            dataLabels: false,
            marked: true,
            temperatureColors: ["#83a4f2", "#3456a3"],
            color: "#83a4f2",
            useStepper: false,
        },
        {
            name: "vue-data-ui (same period last year)",
            series: data_lib_previous.value,
            type: "line",
            dataLabels: false,
            marked: false,
            color: isDarkMode.value ? "#ff8c0050" : "#ff370050",
            useStepper: false,
        },
    ];
});

const max = computed(() => {
    const values = [...data_lib.value, ...data_lib_previous.value].filter(
        Number.isFinite,
    );
    return values.length ? Math.max(...values) : 0;
});

function getProgress({ data, index }) {
    const n = data[0]?.series[index];
    const n_1 = data[1]?.series[index];
    if (!Number.isFinite(n) || !Number.isFinite(n_1) || n_1 === 0) return "";
    const ratio = Math.round((n / n_1 - 1) * 100);
    return `${ratio > 0 ? "+" : ""}${ratio}%`;
}

const selectedX = ref(null);

const config = computed(() => {
    return {
        theme: "",
        responsive: false,
        customPalette: [],
        useCssAnimation: false,
        downsample: { threshold: 3000 },
        events: {
            datapointEnter: ({ datapoint, seriesIndex }) => {
                selectedX.value = seriesIndex;
            },
            datapointLeave: () => {
                selectedX.value = null;
            },
        },
        chart: {
            fontFamily: "inherit",
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
            height: 600,
            width: 1000,
            padding: {
                bottom: 24,
                left: 80,
                right: 0,
            },
            zoom: {
                show: true,
                autoFit: true,
                color: isDarkMode.value ? "#8A8A8A" : "#CCCCCC",
                highlightColor: isDarkMode.value ? "#314063" : "#3456a3",
                fontSize: 14,
                useResetSlot: false,
                startIndex: null,
                endIndex: null,
                enableRangeHandles: true,
                enableSelectionDrag: true,
                focusOnDrag: true,
                minimap: {
                    show: true,
                    smooth: false,
                    selectedColor: "#5f8aee",
                    selectedColorOpacity: 0.2,
                    lineColor: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                    frameColor: "transparent",
                    selectionRadius: 2,
                    indicatorColor: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                    verticalHandles: false,
                },
                preview: {
                    fill: "#42d39220",
                    stroke: "#42d39240",
                    strokeDasharray: 4,
                },
            },
            highlighter: {
                color: "#8A8A8A",
                opacity: 0,
                useLine: true,
                lineDasharray: 2,
                lineWidth: 1,
                crosshairs: {
                    show: true,
                    stroke: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    strokeWidth: 0.6,
                    strokeDasharray: 0,
                    // dot: {
                    //     fill: '',
                    //     stroke: '',
                    //     strokeWidth: 1
                    // }
                },
            },
            timeTag: {
                show: true,
                backgroundColor: isDarkMode.value ? "#3A3A3A" : "#E1E5E8",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontSize: 14,
                circleMarker: { radius: 3, color: "#2D353C" },
            },
            grid: {
                stroke: isDarkMode.value ? "#6A6A6A" : "#E1E5E8",
                showVerticalLines: false,
                showHorizontalLines: false,
                position: "middle",
                labels: {
                    show: true,
                    color: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                    fontSize: 16,
                    axis: {
                        yLabel: "",
                        yLabelOffsetX: 0,
                        xLabel: "",
                        xLabelOffsetY: 14,
                        fontSize: 14,
                    },
                    zeroLine: { show: true },
                    xAxis: { showBaseline: false },
                    yAxis: {
                        position: "right",
                        useNiceScale: true,
                        showBaseline: true,
                        commonScaleSteps: 10,
                        useIndividualScale: false,
                        stacked: false,
                        gap: 12,
                        labelWidth: 40,
                        formatter: null,
                        scaleValueOffsetX: 0,
                        // scaleMin: null,
                        // scaleMax: Math.ceil(max.value / 100) * 100,
                    },
                    xAxisLabels: {
                        color: isDarkMode.value ? "#8A8A8A" : "#1A1A1A",
                        show: false,
                        values: dates.value,
                        fontSize: 16,
                        showOnlyFirstAndLast: true,
                        showOnlyAtModulo: false,
                        modulo: 12,
                        yOffset: 0,
                        rotation: 0,
                    },
                },
            },
            labels: { fontSize: 20, prefix: "", suffix: "" },
            legend: {
                position: "top",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                show: true,
                fontSize: 14,
            },
            title: {
                text: "NPM downloads",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontSize: 20,
                bold: true,
                textAlign: "left",
                paddingLeft: 6,
                paddingRight: 0,
                subtitle: {
                    color: "#A1A1A1",
                    text: "Vue Data UI",
                    fontSize: 16,
                    bold: false,
                },
                show: true,
            },
            tooltip: {
                show: isMobile.value,
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: isDarkMode.value ? "#4A4A4A" : "#E1E5E8",
                borderWidth: 1,
                backgroundOpacity: 10,
                position: "center",
                offsetY: 24,
                showTimeLabel: true,
                showValue: true,
                showPercentage: true,
                roundingValue: 0,
                roundingPercentage: 0,
            },
        },
        line: {
            radius: 3,
            useGradient: false,
            strokeWidth: 3,
            tag: {
                followValue: true,
                formatter: ({ value, config }) => {
                    const { serieName } = config;
                    return `
          <div style="display:flex;align-items:center;gap:4px">
            <span style="font-size: 10px">${serieName}</span>
            <span>${value}</span>
          </div>
          `;
                },
            },
            dot: {
                useSerieColor: false,
                fill: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                strokeWidth: 2,
            },
            labels: {
                show: isMobile.value,
                offsetY: -18,
                rounding: 0,
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                formatter: null,
            },
            area: { useGradient: true, opacity: 30 },
            interLine: {
                pairs: [["vue-data-ui", "vue-data-ui (same period last year)"]],
            },
        },
        table: {
            responsiveBreakpoint: 400,
            rounding: 0,
            sparkline: true,
            showSum: true,
            columnNames: { period: "Period", total: "Total" },
            th: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                outline: "none",
            },
            td: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                outline: "none",
            },
        },
        showTable: false,
    };
});

function selectLegend(legend) {
    console.log({ legend });
}

function selectX(x) {
    console.log(x);
}

function selectTimeLabel(selectedTimeLabel) {
    console.log({ selectedTimeLabel });
}
function getCumulativeAveragePerDayWithMissingDays(statistics) {
    const ratingsByDate = {};
    statistics.forEach((entry) => {
        const date = entry.day;
        if (!ratingsByDate[date]) {
            ratingsByDate[date] = [];
        }
        ratingsByDate[date].push(entry.downloads);
    });

    const ratingDates = Object.keys(ratingsByDate).sort(
        (a, b) => new Date(a) - new Date(b),
    );

    const allDates = fillEmptyDays(ratingDates);

    let cumulativeSum = 0;
    let cumulativeCount = 0;
    const cumulativeAverages = [];

    allDates.forEach((date) => {
        if (ratingsByDate[date]) {
            ratingsByDate[date].forEach((rating) => {
                cumulativeSum += rating;
                cumulativeCount++;
            });
            cumulativeAverages.push({
                date: date,
                cumulativeAverage: cumulativeSum / cumulativeCount,
            });
        } else {
            cumulativeAverages.push({
                date: date,
                cumulativeAverage: null,
            });
        }
    });

    return cumulativeAverages;
}

const datasetCumulativeAverage = computed(() => {
    return [
        {
            name: "Downloads cumulative average",
            type: "line",
            series: getCumulativeAveragePerDayWithMissingDays(
                store.downloads.lib,
            ).map((d) => {
                return d.cumulativeAverage;
            }),
            useTag: "start",
            useArea: true,
        },
    ];
});

const configCumulativeAverage = computed(() => {
    return {
        ...config.value,
        showTable: false,
        downsample: { threshold: 2000 },
        line: {
            ...config.value.line,
            labels: {
                ...config.value.line.labels,
                show: false,
            },
            tag: {
                followValue: true,
                formatter: ({ value, config }) => {
                    const { serieName } = config;
                    return `
          <div style="display:flex;align-items:center;gap:4px">
            <span style="font-variant-numeric: tabular-nums">${value.toFixed(0)}</span>
          </div>
          `;
                },
            },
        },
        chart: {
            ...config.value.chart,
            zoom: {
                focusOnDrag: true,
                autoFit: true,
                minimap: {
                    show: true,
                },
                preview: {
                    fill: "#42d39220",
                    stroke: "#42d39240",
                    strokeDasharray: 4,
                },
            },
            tooltip: {
                show: false,
            },
            title: {
                ...config.value.chart.title,
                text: "Vue Data UI",
                subtitle: {
                    ...config.value.chart.title.subtitle,
                    text: "Daily downloads cumulative average",
                },
            },
            legend: { show: false },
            grid: {
                ...config.value.chart.grid,
                labels: {
                    ...config.value.chart.grid.labels,
                    xAxisLabels: {
                        ...config.value.chart.grid.labels.xAxisLabels,
                        values: getCumulativeAveragePerDayWithMissingDays(
                            store.downloads.lib,
                        ).map((d) => d.date),
                        show: false,
                    },
                },
            },
        },
    };
});

function getObjectByY(arr, type = "max") {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    return arr.reduce((selected, current) => {
        if (type === "min") {
            return current?.y < selected?.y ? current : selected;
        }
        return current?.y > selected?.y ? current : selected;
    });
}

function freestyle({ drawingArea, data }) {
    const filtered = (data || []).filter((d) => !!d?.marked);
    const lines = (filtered || []).map((d, i) => {
        const max = getObjectByY(d?.plots || [], "min");
        const min = getObjectByY(d?.plots || [], "max");

        const pointStart = (d?.plots || [])[0];
        const pointEnd = (d?.plots || []).at(-1);
        return `
      <line
        x1="${pointStart?.x}"
        x2="${pointEnd?.x}"
        y1="${pointStart?.y}"
        y2="${pointEnd?.y}"
        stroke="${isDarkMode.value ? "#3A3A3A" : "#FFFFFF"}"
        stroke-width="2"
        stroke-dasharray="3"
        stroke-linecap="round"
      />
      <line
        x1="${pointStart?.x}"
        x2="${pointEnd?.x}"
        y1="${pointStart?.y}"
        y2="${pointEnd?.y}"
        stroke="${d?.color}"
        stroke-dasharray="3"
        stroke-linecap="round"
      />
      <circle
        class="flashy-pos"
        cx="${max?.x}"
        cy="${max?.y}"
        r="12"
        stroke="#2ca02c"
        fill="#2ca02c50"
        stroke-width="2"
        fill="none"
      />
      <circle
        class="flashy-neg"
        cx="${min?.x}"
        cy="${min?.y}"
        r="12"
        stroke="#d62728"
        stroke-width="2"
        fill="#d6272850"
      />
    `;
    });
    return lines;
}
</script>

<template>
    <div class="flex flex-col p-4 rounded bg-white dark:bg-[#2A2A2A]">
        <div class="flex flex-col gap-1 pt-2 mb-2">
            <label
                for="period"
                class="text-xs text-black dark:text-[#CCCCCC] px-2"
                >Select period:</label
            >
            <select
                id="period"
                v-model="selectedPeriod"
                class="h-[36px] w-fit px-2"
            >
                <option v-for="period in periods" :value="period.id">
                    {{ period.name }}
                </option>
            </select>
        </div>
        <VueDataUi
            component="VueUiXy"
            :dataset="dataset"
            :config="config"
            @selectLegend="selectLegend"
            @selectX="selectX"
            @selectTimeLabel="selectTimeLabel"
        >
            <template #svg="{ svg }">
                <!-- <g v-html="freestyle(svg)" /> -->

                <!-- Key dates -->
                <g
                    v-for="(stone, i) in svg.data[0].plots"
                    :key="`plot_${i}`"
                    style="pointer-events: none"
                >
                    <template v-for="(s, j) in keyDates" :key="s.name">
                        <g v-if="s.index === i + svg.slicer.start">
                            <line
                                :x1="stone.x"
                                :x2="stone.x"
                                :y1="svg.drawingArea.top"
                                :y2="svg.drawingArea.bottom"
                                :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"
                                stroke-linecap="round"
                                stroke-dasharray="0.5 12"
                                stroke-width="3"
                            />
                            <text
                                :fill="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
                                font-size="18"
                                :transform="`translate(${stone.x + 14}, ${svg.drawingArea.top + 4}) rotate(-90)`"
                                text-anchor="end"
                                dominant-baseline="middle"
                            >
                                {{ s.name }}
                            </text>
                        </g>
                    </template>
                </g>

                <!-- n-1 -->
                <g v-if="selectedX != null">
                    <template v-for="(point, i) in svg.data[0].plots">
                        <text
                            v-if="selectedX === i + svg.slicer.start"
                            :x="point.x"
                            :y="point.y - 16"
                            :fill="isDarkMode ? '#CCCCCC' : '#1A1A1A'"
                            font-size="20"
                            text-anchor="middle"
                            :stroke="isDarkMode ? '#2A2A2A' : '#FFFFFF'"
                            stroke-width="6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            paint-order="stroke fill"
                        >
                            {{
                                getProgress({
                                    index: i,
                                    data: svg.data,
                                })
                            }}
                        </text>
                    </template>
                </g>
            </template>
            <template #chart-background>
                <div
                    class="w-full h-full bg-gradient-to-br from-white dark:from-[#FFFFFF10] to-transparent"
                />
            </template>
        </VueDataUi>

        <div class="border-t border-gray-500 my-12" />
        <VueDataUi
            component="VueUiXy"
            :dataset="datasetCumulativeAverage"
            :config="configCumulativeAverage"
        >
            <template #chart-background>
                <div
                    class="w-full h-full bg-gradient-to-br from-white dark:from-[#FFFFFF10] to-transparent"
                />
            </template>
            <template #pattern="{ patternId }">
                <VueUiPattern
                    :id="patternId"
                    name="grid"
                    :stroke="isDarkMode ? '#1f77b460' : '#FAFAFA'"
                />
            </template>
            <template #source>
                <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                    Source: api.npmjs.org
                </div>
            </template>
        </VueDataUi>
    </div>
</template>

<style>
.flashy-pos {
    animation: flashy-pos infinite 1s alternate-reverse;
}
.flashy-neg {
    animation: flashy-neg infinite 1s alternate-reverse;
}

@keyframes flashy-pos {
    from {
        r: 6;
        stroke: transparent;
        stroke-width: 1;
    }
    to {
        r: 12;
        stroke: #2ca02c;
        stroke-width: 3;
    }
}
@keyframes flashy-neg {
    from {
        r: 6;
        stroke: transparent;
        stroke-width: 1;
    }
    to {
        r: 12;
        stroke: #d62728;
        stroke-width: 3;
    }
}
</style>
