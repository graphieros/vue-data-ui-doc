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
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "height": 800,
            "width": 1800,
            "zoom": {
                "show": false
            },
            "padding": {
                "top": 36,
                "right": 24,
                "bottom": 48,
                "left": 83
            },
            "highlighter": {
                "color": isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                "opacity": 5
            },
            "highlightArea": {
                "show": true,
                "from": 3,
                "to": 5,
                "color": "#FF0000",
                "opacity": 10,
                "caption": {
                    "text": "Low season",
                    "fontSize": 20,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "bold": false,
                    "offsetY": 0,
                    "width": "auto",
                    "padding": 3,
                    "textAlign": "center"
                }
            },
            "grid": {
                "stroke": "#e1e5e8",
                "showVerticalLines": false,
                "labels": {
                    "show": true,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 23,
                    "axis": {
                        "yLabel": "",
                        "xLabel": "",
                        "fontSize": 29
                    },
                    "xAxisLabels": {
                        "show": true,
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        "values": [
                            "JAN",
                            "FEB",
                            "MAR",
                            "APR",
                            "MAY",
                            "JUN",
                            "JUL",
                            "AUG",
                            "SEP",
                            "OCT",
                            "NOV",
                            "DEC"
                        ],
                        "fontSize": 24,
                        "showOnlyFirstAndLast": false,
                        "yOffset": 8
                    }
                }
            },
            "labels": {
                "fontSize": 19,
                "prefix": "",
                "suffix": "%"
            },
            "legend": {
                "show": true,
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 16
            },
            "title": {
                "show": true,
                "text": "Average Occupancy",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "offsetX": 0,
                "offsetY": 0,
                "subtitle": {
                    "text": "2025",
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
            "borderRadius": 2,
            "useGradient": true,
            "labels": {
                "show": true,
                "offsetY": -8,
                "rounding": 0,
                "color": "#1A1A1A"
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
        "line": {
            "radius": 6,
            "useGradient": true,
            "strokeWidth": 2,
            "labels": {
                "show": true,
                "offsetY": -8,
                "rounding": 0,
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            },
            "area": {
                "useGradient": true,
                "opacity": "26"
            }
        },
        "plot": {
            "radius": 6,
            "useGradient": true,
            "strokeWidth": 2,
            "labels": {
                "show": true,
                "offsetY": -8,
                "rounding": 0,
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
            45,
            75,
            64,
            34,
            32,
            27,
            67,
            83,
            35,
            55,
            78,
            92
        ],
        "color": "#6376DD",
        "type": "line",
        "shape": "circle",
        "useArea": true,
        "useProgression": false,
        "dataLabels": true,
        "smooth": true,
        "dashed": false,
        "useTag": "none"
    },
    {
        "name": "Brazil",
        "series": [
            87,
            76,
            65,
            55,
            43,
            19,
            86,
            88,
            45,
            67,
            43,
            76
        ],
        "color": "#42d392",
        "type": "line",
        "shape": "circle",
        "useArea": true,
        "useProgression": false,
        "dataLabels": true,
        "smooth": true,
        "dashed": false,
        "useTag": "none"
    },
    {
        "name": "Target",
        "series": [
            65,
            65,
            65,
            65,
            65,
            65,
            65,
            65,
            65,
            65,
            65,
            65
        ],
        "color": "#d2a441",
        "type": "line",
        "shape": "circle",
        "useArea": false,
        "useProgression": false,
        "dataLabels": false,
        "smooth": false,
        "dashed": false,
        "useTag": "start"
    }
]);

function getData() {
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
        <VueUiXy :config="config" :dataset="dataset">
        </VueUiXy>
</template>
