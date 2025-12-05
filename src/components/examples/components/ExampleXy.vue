<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";


const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);


const config = computed(() => {
    return {
    "useCssAnimation": true,
    "chart": {
        "fontFamily": "inherit",
        "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        "height": 600,
        "width": 1000,
        "zoom": {
            "show": false
        },
        "highlighter": {
            "color": "#1A1A1A",
            "opacity": 0
        },
        "grid": {
            "stroke": "#e1e5e8",
            "showVerticalLines": false,
            "labels": {
                "show": true,
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 30,
                "axis": {
                    "yLabel": "",
                    "xLabel": "",
                    "fontSize": 30
                },
                "xAxisLabels": {
                    "show": true,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "values": [
                        "2025",
                        "Japan",
                        "India",
                        "Germany",
                        "Brazil"
                    ],
                    "fontSize": 18,
                    "showOnlyFirstAndLast": false,
                    "yOffset": 8
                }
            }
        },
        "labels": {
            "fontSize": 30,
            "prefix": "",
            "suffix": ""
        },
        "legend": {
            "show": true,
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "fontSize": 16
        },
        "title": {
            "show": true,
            "text": "Phone calls",
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "fontSize": 20,
            "bold": true,
            "offsetX": 0,
            "offsetY": 0,
            "subtitle": {
                "text": "Average number per hour 2025",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 16
            }
        },
        "tooltip": {
            "show": true,
            "showValue": true,
            "showPercentage": false,
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "roundingValue": 0,
            "roundingPercentage": 0
        },
        "userOptions": {
            "show": true
        }
    },
    "bar": {
        "innerGap": 0.2,
        "periodGap": 0.007,
        "borderRadius": 4,
        "useGradient": true,
        "labels": {
            "show": true,
            "offsetY": -8,
            "rounding": 0,
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        },
        "serieName": {
            "show": false,
            "offsetY": -6,
            "useAbbreviation": true,
            "abbreviationSize": 3,
            "useSerieColor": true,
            "color": "#1A1A1A"
        }
    },
    "showTable": false,
    "table": {
        "responsiveBreakpoint": 400,
        "rounding": 0,
        "sparkline": false,
        "columnNames": {
            "period": "Period",
            "total": "Total"
        },
        "th": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "outline": ""
        },
        "td": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "outline": ""
        }
    }
}
})

const dataset = ref([
    {
        "name": "France",
        "series": [
            150
        ],
        "color": "#6376DD",
        "type": "bar",
        "shape": "circle",
        "useArea": false,
        "useProgression": false,
        "dataLabels": true,
        "smooth": false,
        "dashed": false,
        "useTag": "none"
    },
    {
        "name": "Brazil",
        "series": [
            125
        ],
        "color": "#68d241",
        "type": "bar",
        "shape": "circle",
        "useArea": false,
        "useProgression": false,
        "dataLabels": true,
        "smooth": false,
        "dashed": false,
        "useTag": "none"
    },
    {
        "name": "India",
        "series": [
            225
        ],
        "color": "#ec823c",
        "type": "bar",
        "shape": "circle",
        "useArea": false,
        "useProgression": false,
        "dataLabels": true,
        "smooth": false,
        "dashed": false,
        "useTag": "none"
    },
    {
        "name": "Japan",
        "series": [
            145
        ],
        "color": "#d53434",
        "type": "bar",
        "shape": "circle",
        "useArea": false,
        "useProgression": false,
        "dataLabels": true,
        "smooth": false,
        "dashed": false,
        "useTag": "none"
    },
    {
        "name": "Germany",
        "series": [
            163
        ],
        "color": "#eae439",
        "type": "bar",
        "shape": "circle",
        "useArea": false,
        "useProgression": false,
        "dataLabels": true,
        "smooth": false,
        "dashed": false,
        "useTag": "none"
    }
].sort((a, b) => b.series[0] - a.series[0]))

function getData(){
    return {
        config: config.value,
        dataset: dataset.value
    }
}

defineExpose({
    getData
})

</script>

<template>
    <VueUiXy :config="config" :dataset="dataset" />
</template>
