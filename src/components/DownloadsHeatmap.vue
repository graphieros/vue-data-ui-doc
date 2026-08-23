<script setup>
import { ref, computed } from "vue";
import BaseCard from "./BaseCard.vue";
import { useMainStore } from "../stores/index.js";
import { adaptColorToBackground } from "vue-data-ui/utils";

const props = defineProps({
    data: { type: Array, default: () => [] },
    isLoading: { type: Boolean, default: false },
    url: { type: String, default: "/" },
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const WEEK_COUNT = 52;
const DAYS_PER_WEEK = 7;
const MONDAY_INDEX = 1;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function parseUtcDate(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date, amount) {
    return new Date(date.getTime() + amount * DAY_IN_MS);
}

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

const downloadsFormatter = new Intl.NumberFormat("en-US");
const tooltipDateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
});
const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
});

function getTooltipDate(datapoint, seriesIndex, series) {
    const row = series?.[seriesIndex];
    const weekIndex = row?.temperatures?.findIndex(
        (temperature) => temperature.id === datapoint?.id,
    );
    const weekStartValue = heatmap.value.weekStarts?.[weekIndex];
    const dayOffset = WEEK_DAYS.indexOf(datapoint?.yAxisName);

    if (weekIndex < 0 || !weekStartValue || dayOffset < 0) return "";

    const weekStart = parseUtcDate(weekStartValue);
    return tooltipDateFormatter.format(addDays(weekStart, dayOffset));
}

function formatDownloads(value) {
    return downloadsFormatter.format(Number(value) || 0);
}

const heatmap = computed(() => {
    const sortedData = [...props.data]
        .filter(
            (item) =>
                typeof item?.period === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(item.period) &&
                Number.isFinite(Number(item.value)),
        )
        .sort((a, b) => a.period.localeCompare(b.period));

    if (!sortedData.length) {
        return {
            dataset: [],
            xAxisValues: [],
        };
    }

    const valuesByDate = new Map(
        sortedData.map((item) => [item.period, Number(item.value)]),
    );

    // Anchor the grid to the viewer's current calendar week.
    // Weeks run Monday -> Sunday, so on a Sunday the rightmost column still
    // contains the preceding Saturday and today's Sunday.
    const now = new Date();
    const today = new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
    );
    const daysSinceMonday =
        (today.getUTCDay() - MONDAY_INDEX + DAYS_PER_WEEK) % DAYS_PER_WEEK;
    const currentWeekStart = addDays(today, -daysSinceMonday);
    const firstWeekStart = addDays(
        currentWeekStart,
        -(WEEK_COUNT - 1) * DAYS_PER_WEEK,
    );

    const weeks = Array.from({ length: WEEK_COUNT }, (_, weekIndex) => {
        const start = addDays(firstWeekStart, weekIndex * DAYS_PER_WEEK);
        const end = addDays(start, DAYS_PER_WEEK - 1);

        return {
            start,
            end,
            label: `From ${formatDate(start)} to ${formatDate(end)}`,
        };
    });

    // Keep rows in the same chronological order as each Monday -> Sunday week.
    const dataset = WEEK_DAYS.map((name, dayIndex) => ({
        name,
        values: weeks.map((week) => {
            const date = addDays(week.start, dayIndex);
            return valuesByDate.get(formatDate(date)) ?? 0;
        }),
    }));

    const xAxisValues = weeks.map((week, weekIndex) => {
        // Put the month label on the week containing the first day of that month.
        const labelDate =
            week.start.getUTCMonth() === week.end.getUTCMonth()
                ? week.start
                : week.end;
        const monthKey = `${labelDate.getUTCFullYear()}-${labelDate.getUTCMonth()}`;

        if (weekIndex === 0) {
            return monthFormatter.format(labelDate);
        }

        const previousWeek = weeks[weekIndex - 1];
        const previousLabelDate =
            previousWeek.start.getUTCMonth() === previousWeek.end.getUTCMonth()
                ? previousWeek.start
                : previousWeek.end;
        const previousMonthKey = `${previousLabelDate.getUTCFullYear()}-${previousLabelDate.getUTCMonth()}`;

        return monthKey === previousMonthKey
            ? ""
            : monthFormatter.format(labelDate);
    });

    return {
        dataset,
        xAxisValues,
        weekStarts: weeks.map((week) => formatDate(week.start)),
    };
});

const dataset = computed(() => heatmap.value.dataset);

const skeletonConfig = ref({
    type: "heatmap",
    style: {
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
        heatmap: {
            cellsX: 26,
            cellsY: 7,
            color: isDarkMode.value ? "#5c5c5c" : "#e1e5e8",
        },
    },
});

const config = computed(() => {
    return {
        style: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "transparent",
            color: "#2D353C",
            fontFamily: "inherit",
            layout: {
                height: 160,
                padding: {
                    top: 0,
                },
                cells: {
                    height: 24,
                    rowTotal: {
                        value: {
                            show: false,
                        },
                        color: {
                            show: false,
                        },
                    },
                    columnTotal: {
                        value: {
                            show: false,
                            rotation: 0,
                            offsetX: 0,
                            offsetY: 0,
                        },
                        color: {
                            show: false,
                        },
                    },
                    value: {
                        show: false,
                        fontSize: 8,
                        bold: false,
                        roundingValue: 0,
                        color: isDarkMode.value ? "#FAFAFA" : "#1A1A1A",
                    },
                    colors: {
                        hot: isDarkMode.value ? "#42d392" : "#1f77b4",
                        cold: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                        underlayer: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    },
                    spacing: 0,
                    selected: {
                        border: 2,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    },
                },
                dataLabels: {
                    xAxis: {
                        show: true,
                        values: heatmap.value.xAxisValues,
                        fontSize: 12,
                        color: isDarkMode.value ? "#BBBBBB" : "#1A1A1A",
                        bold: false,
                        offsetX: 0,
                        offsetY: 0,
                        showOnlyAtModulo: 1,
                        autoRotate: {
                            enable: false,
                        },
                    },
                    yAxis: {
                        show: true,
                        values: WEEK_DAYS,
                        fontSize: 14,
                        color: isDarkMode.value ? "#BBBBBB" : "#1A1A1A",
                        bold: false,
                        offsetY: 0,
                        offsetX: 0,
                    },
                },
            },
            title: {
                textAlign: "left",
                text: "Downloads heatmap",
                color: isDarkMode.value ? "#9A9A9A" : "#2D353C",
                fontSize: 16,
                bold: true,
                margin: "0 0 6px 0",
                subtitle: {
                    color: "#A1A1A1",
                    text: "Last 52 weeks",
                    fontSize: 12,
                    bold: false,
                },
            },
            legend: {
                show: true,
                backgroundColor: isDarkMode.value ? "#1A1A1A" : "#f3f4f6",
                color: isDarkMode.value ? "#BBBBBB" : "#1A1A1A",
                fontSize: 12,
                bold: true,
                roundingValue: 0,
                width: 48,
            },
            tooltip: {
                show: true,
                backgroundColor: isDarkMode.value ? "#1A1A1A" : "#FFFFFF",
                color: isDarkMode.value ? "#BBBBBB" : "#1A1A1A",
                fontSize: 14,
                roundingValue: 0,
                backgroundOpacity: 0,
                borderColor: isDarkMode.value ? "#4A4A4A" : "#e1e5e8",
            },
        },
        userOptions: {
            show: false,
        },
    };
});
</script>

<template>
    <BaseCard v-if="data.length" class="max-w-[800px] mx-auto mt-6">
        <VueUiSkeleton v-if="isLoading" :config="skeletonConfig" />
        <VueUiHeatmap v-else :dataset :config>
            <template #tooltip="{ datapoint, seriesIndex, series }">
                <div class="px-3 py-2 text-left">
                    <div
                        class="mt-0.5 text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >
                        {{ getTooltipDate(datapoint, seriesIndex, series) }}
                    </div>
                    <div class="mt-2 flex items-center gap-2">
                        <span
                            class="h-2.5 w-2.5 shrink-0 rounded-sm"
                            :style="{
                                backgroundColor: datapoint.color,
                                border: `0.5px solid ${adaptColorToBackground(
                                    datapoint.color,
                                    {
                                        dark: isDarkMode
                                            ? '#1A1A1A'
                                            : '#6A6A6A',
                                        light: isDarkMode
                                            ? '#1A1A1A'
                                            : '#CCCCCC',
                                    },
                                )}`,
                            }"
                        />
                        <span class="text-sm text-gray-700 dark:text-gray-300">
                            <strong
                                class="font-semibold text-gray-900 dark:text-gray-100"
                            >
                                {{ formatDownloads(datapoint.value) }}
                            </strong>
                            downloads
                        </span>
                    </div>
                </div>
            </template>
            <template #source>
                <div class="text-xs text-gray-500 text-left mt-3 pl-2">
                    Source:
                    <a class="text-app-blue underline" :href="url">
                        api.npmjs.org
                    </a>
                </div>
            </template>
        </VueUiHeatmap>
    </BaseCard>
</template>
