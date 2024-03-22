<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";
import temperatures from "../../../assets/temp.json";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

Date.prototype.getWeek = function () {
    const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const heatmapDataset = computed(() => {
    const weeklyData = [];
    let currentWeek = null;
    let weeklySum = 0;


    temperatures.time.forEach((dataPoint, i) => {
        const date = new Date(dataPoint);
        const weekNumber = date.getWeek();

        if (currentWeek === null) {
            currentWeek = weekNumber;
        }

        if (currentWeek !== weekNumber) {
            weeklyData.push({ period: `week ${currentWeek}`, value: weeklySum, short: `w${currentWeek}` });
            currentWeek = weekNumber;
            weeklySum = 0;
        }
        weeklySum += temperatures.temperature[i];
    });

    if (currentWeek !== null) {
        weeklyData.push({ period: `week ${currentWeek}`, value: weeklySum, short: `w${currentWeek}` });
    }
    return weeklyData;
});

const usableHeatmapData = computed(() => {

const result = [
  { name: "Sun", values: [] },
  { name: "Mon", values: [] },
  { name: "Tue", values: [] },
  { name: "Wed", values: [] },
  { name: "Thu", values: [] },
  { name: "Fri", values: [] },
  { name: "Sat", values: [] },
];

temperatures.time.forEach((item, i) => {

  const dayOfWeek = new Date(item).getDay();
  if(!isNaN(dayOfWeek)) {
      result[dayOfWeek].values.push(temperatures.temperature[i]);
  }
});

return result;
});

const config = computed(() => {
    return {
                style: {
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    fontFamily: "inherit",
                    layout: {
                        useDiv: true,
                        padding: {
                            top: 36,
                            right: 12,
                            bottom: 12,
                            left: 48
                        },
                        cells: {
                            height: 24,
                            value: {
                                show: true,
                                fontSize: 8,
                                bold: false,
                                roundingValue: 0,
                                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            },
                            colors: {
                                hot: "#ff6400",
                                cold: "#5f8bee",
                                underlayer: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                            },
                            spacing: 0.5,
                            selected: {
                                border: 2,
                                color: "#2D353C"
                            }
                        },
                        dataLabels: {
                            xAxis: {
                                show: true,
                                values: heatmapDataset.value.map(p => p.short),
                                fontSize: 8,
                                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                                bold: false,
                                offsetX: 0,
                                offsetY: 0
                            },
                            yAxis: {
                                show: true,
                                values: [],
                                fontSize: 8,
                                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                                bold: false,
                                offsetY: 0,
                                offsetX: 0
                            }
                        }
                    },
                    title: {
                        text: "Paris daily temperatures 2023 in °C",
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 16,
                        bold: true,
                    },
                    legend: {
                        show: true,
                        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 6,
                        bold: true,
                        roundingValue: 0
                    },
                    tooltip: {
                        show: true,
                        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 14,
                        roundingValue: 0
                    }
                },
                "table": {
        "show": false,
        "responsiveBreakpoint": 400,
        "th": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "outline": "none"
        },
        "td": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "outline": "none",
            "roundingValue": 0,
            "roundingPercentage": 0
        }
    },
                userOptions: {
                    show: true,
                },
            }
})

function getData() {
    return {
        config: config.value,
        dataset: usableHeatmapData.value
    }
}

defineExpose({
    getData
})

</script>

<template>
    <VueUiHeatmap :config="config" :dataset="usableHeatmapData" />
</template>