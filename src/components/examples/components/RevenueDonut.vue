<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
    return {
        useCssAnimation: true,
        useBlurOnHover: true,
        style: {
            fontFamily: "inherit",
            chart: {
                useGradient: true,
                gradientIntensity: 40,
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                layout: {
                    curvedMarkers: true,
                    labels: {
                        dataLabels: {
                            show: true,
                            hideUnderValue: 3,
                            prefix: "",
                            suffix: "k$ ",
                        },
                        value: {
                            show: true,
                            rounding: 0,
                        },
                        percentage: {
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: true,
                            fontSize: 14,
                        },
                        name: {
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            bold: false,
                            fontSize: 14,
                        },
                        hollow: {
                            total: {
                                show: true,
                                bold: false,
                                fontSize: 18,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                text: "Total",
                                offsetY: -14,
                                value: {
                                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                    fontSize: 18,
                                    bold: true,
                                    prefix: "k$ ",
                                    suffix: "",
                                    offsetY: -9,
                                    rounding: 0,
                                },
                            },
                            average: {
                                show: true,
                                bold: false,
                                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                fontSize: 18,
                                text: "Average",
                                offsetY: 5,
                                value: {
                                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                                    fontSize: 18,
                                    bold: true,
                                    prefix: "k$ ",
                                    suffix: "",
                                    offsetY: 11,
                                    rounding: 0,
                                },
                            },
                        },
                    },
                    donut: {
                        strokeWidth: 64,
                        borderWidth: 1,
                    },
                },
                legend: {
                    show: true,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 16,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0,
                },
                title: {
                    text: "Boutique revenue",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        text: "2025",
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 16,
                        bold: false,
                    },
                },
                tooltip: {
                    show: true,
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                    color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                    fontSize: 14,
                    showValue: true,
                    roundingValue: 0,
                    showPercentage: true,
                    roundingPercentage: 0,
                },
            },
        },
        userOptions: {
            show: true,
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
            columnNames: {
                series: "Series",
                value: "Value",
                percentage: "Percentage",
            },
            th: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                outline: "none",
            },
            td: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                outline: "none",
                roundingValue: 0,
                roundingPercentage: 0,
            },
        },
    };
});

const dataset = ref(
    [
        {
            name: "Brazil",
            values: [153],
            color: "#42d392",
        },
        {
            name: "France",
            values: [255],
            color: "#6376DD",
        },
        {
            name: "India",
            values: [113],
            color: "#d98320",
        },
        {
            name: "Japan",
            values: [290],
            color: "#d94126",
        },
        {
            name: "Germany",
            values: [275],
            color: "#f5ee38",
        },
    ].sort((a, b) => b.values[0] - a.values[0])
);

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
    <div>
        <VueDataUi component="VueUiDonut" :config="config" :dataset="dataset" />
    </div>
</template>
