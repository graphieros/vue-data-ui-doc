<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
    return {
        responsive: false,
        useCssAnimation: true,
        chart: {
            fontFamily: "inherit",
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#f3f4f6",
            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
            height: 700,
            width: 1800,
            zoom: {
                show: true,
                focusOnDrag: true,
                preview: {
                    enable: false,
                },
                minimap: {
                    show: true,
                }
            },
            highlighter: {
                color: isDarkMode.value ? "#FFFFFF" : "#1A1A1A",
                opacity: 5,
            },
            highlightArea: [
                {
                    show: true,
                    from: 3,
                    to: 5,
                    color: "#FF0000",
                    opacity: 10,
                    caption: {
                        text: "Low season",
                        fontSize: 20,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        bold: false,
                        offsetY: 0,
                        width: "auto",
                        padding: 3,
                        textAlign: "center",
                    },
                },
                {
                    show: true,
                    from: 12,
                    to: 13,
                    color: "#1f77b4",
                    opacity: 10,
                    caption: {
                        text: "France: closed for work",
                        fontSize: 20,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        bold: false,
                        offsetY: 0,
                        width: "auto",
                        padding: 3,
                        textAlign: "center",
                    },
                },
            ],
            grid: {
                position: "middle",
                stroke: "#e1e5e8",
                showVerticalLines: false,
                labels: {
                    show: true,
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 14,
                    axis: {
                        yLabel: "",
                        xLabel: "",
                        fontSize: 12,
                    },
                    yAxis: {
                        commonScaleSteps: 5,
                        scaleMax: 100,
                    },
                    xAxisLabels: {
                        show: true,
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        values: [
                            1735689600000, // Jan 2025
                            1738368000000, // Feb 2025
                            1740787200000, // Mar 2025
                            1743465600000, // Apr 2025
                            1746057600000, // May 2025
                            1748736000000, // Jun 2025
                            1751328000000, // Jul 2025
                            1754006400000, // Aug 2025
                            1756684800000, // Sep 2025
                            1759276800000, // Oct 2025
                            1761955200000, // Nov 2025
                            1764547200000, // Dec 2025
                            1767225600000, // Jan 2026
                            1769904000000, // Feb 2026
                            1772323200000, // Mar 2026
                            1775001600000, // Apr 2026
                            1777593600000, // May 2026
                            1780272000000, // Jun 2026
                            1782864000000, // Jul 2026
                            1785542400000, // Aug 2026
                            1788220800000, // Sep 2026
                            1790812800000, // Oct 2026
                            1793491200000, // Nov 2026
                            1796083200000, // Dec 2026
                            1798761600000  // Jan 2027
                        ],
                        datetimeFormatter: {
                            enable: true,
                        },
                        fontSize: 14,
                        showOnlyFirstAndLast: false,
                        yOffset: 8,
                    },
                },
            },
            labels: {
                fontSize: 16,
                prefix: "",
                suffix: "%",
            },
            legend: {
                position: 'top',
                show: true,
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontSize: 16,
            },
            title: {
                show: true,
                text: "Average Occupancy",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                fontSize: 20,
                bold: true,
                offsetX: 0,
                offsetY: 0,
                subtitle: {
                    text: "2025",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 16,
                },
            },
            tooltip: {
                show: true,
                showValue: true,
                showPercentage: false,
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                roundingValue: 0,
                roundingPercentage: 0,
            },
            userOptions: {
                show: true,
            },
        },
        bar: {
            borderRadius: 2,
            useGradient: true,
            labels: {
                show: true,
                offsetY: -8,
                rounding: 0,
                color: isDarkMode.value ? "#CCCCCC" : '#1A1A1A'
            },
            serieName: {
                show: false,
                offsetY: -6,
                useAbbreviation: true,
                abbreviationSize: 3,
                useSerieColor: true,
                color: "#1A1A1A",
            },
        },
        line: {
            radius: 6,
            useGradient: true,
            strokeWidth: 2,
            cutNullValues: true,
            labels: {
                show: true,
                offsetY: -8,
                rounding: 0,
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
            },
            area: {
                useGradient: true,
                opacity: "26",
            },
            tag: {
                followValue: true
            }
        },
        plot: {
            radius: 6,
            useGradient: true,
            strokeWidth: 2,
            labels: {
                show: true,
                offsetY: -8,
                rounding: 0,
                color: "#1A1A1A",
            },
        },
        showTable: false,
        table: {
            responsiveBreakpoint: 400,
            rounding: 0,
            sparkline: false,
            columnNames: {
                period: "Period",
                total: "Total",
            },
            th: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                outline: "",
            },
            td: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                outline: "",
            },
        },
    };
});

const dataset = ref([
    {
        name: "France",
        series: [25, 35, 44, 24, 22, 27, 47, 43, 55, 81, 89, 92, null, null, 87, 63, 35, 47, 67, 72, 85, 86, 89, 67],
        type: "line",
        shape: "circle",
        useArea: true,
        useProgression: false,
        dataLabels: true,
        smooth: true,
        dashed: false,
        useTag: "none",
    },
    {
        name: "China",
        series: [87, 76, 65, 55, 43, 19, 86, 88, 45, 67, 43, 76, 72, 66, 52, 44, 27, 85, 91, 85, 65, 61, 41, 78],
        type: "bar",
        shape: "circle",
        color: '#d62728',
        useArea: true,
        useProgression: false,
        dataLabels: true,
        smooth: true,
        dashed: false,
        useTag: "none",
    },
    {
        name: "Target",
        series: [65, 66, 65, 45, 43, 45, 65, 65, 70, 72, 75, 85, 85, 85, 80, 65, 65, 70, 72, 80, 75, 75, 72, 75],
        color: "#d2a441",
        type: "line",
        shape: "circle",
        useArea: false,
        useProgression: false,
        dataLabels: false,
        smooth: false,
        dashed: false,
        useTag: "start",
    },
]);

function getData() {
    return {
        config: config.value,
        dataset: dataset.value,
    };
}

defineExpose({
    getData,
});
</script>

<template>
    <VueUiXy :config="config" :dataset="dataset">
        <template #bar-gradient="{ series, positiveId, negativeId }">
            <linearGradient :id="positiveId" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" :stop-color="series.color" />
                <stop offset="100%" :stop-color="isDarkMode ? '#2A2A2A' : '#FFFFFF'" stop-opacity="0" />
            </linearGradient>
            <linearGradient :id="negativeId" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" :stop-color="isDarkMode ? '#2A2A2A' : '#FFFFFF'" stop-opacity="0" />
                <stop offset="100%" :stop-color="series.color" />
            </linearGradient>
        </template>

        <!-- <template #area-gradient="{ series, id }">
            <linearGradient :id="id" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" :stop-color="series.color" />
                <stop offset="100%" :stop-color="isDarkMode ? '#2A2A2A' : '#FFFFFF'" stop-opacity="0" />
            </linearGradient>
        </template> -->
    </VueUiXy>
</template>
