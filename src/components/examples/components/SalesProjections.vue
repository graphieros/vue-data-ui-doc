<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";


const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
    return {
    "style": {
        "chart": {
            "layout": {
                "grid": {
                    "xAxis": {
                        "dataLabels": {
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
                            "show": true,
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "fontSize": 10,
                            "showOnlyFirstAndLast": true
                        }
                    },
                    "show": true,
                    "stroke": isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
                    "strokeWidth": 0.7,
                    "showVerticalLines": true,
                    "yAxis": {
                        "dataLabels": {
                            "show": true,
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "fontSize": 12,
                            "bold": false,
                            "roundingValue": 0,
                            "offsetX": 0
                        }
                    }
                },
                "padding": {
                    "top": 24,
                    "right": 48,
                    "bottom": 24,
                    "left": 48
                },
                "line": {
                    "show": true,
                    "stroke": isDarkMode.value ? '#6A6A6A' : '#CCCCCC',
                    "strokeWidth": 4
                },
                "highlighter": {
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "opacity": 5
                },
                "dataLabels": {
                    "show": true,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 10,
                    "bold": true,
                    "rounding": 0,
                    "offsetY": 0,
                    "prefix": "$",
                    "suffix": ""
                }
            },
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "title": {
                "text": "Sales breakdown",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "2025 projections",
                    "color": "#A1A1A1",
                    "fontSize": 16,
                    "bold": false
                }
            },
            "legend": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "bold": false,
                "fontSize": 14,
                "roundingValue": 0,
                "roundingPercentage": 0
            }
        },
        "fontFamily": "inherit"
    },
    "userOptions": {
        "show": true
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
        },
        "columnNames": {
            "period": "Period",
            "total": "Total"
        }
    }
}
})

const dataset = ref([
    {
        "name": "Europe",
        "values": [
            255,
            325,
            412,
            241,
            315,
            243,
            413,
            367,
            200,
            125,
            400,
            629
        ],
        "color": "#6376DD"
    },
    {
        "name": "America",
        "values": [
            540,
            620,
            512,
            455,
            670,
            312,
            225,
            650,
            570,
            455,
            900,
            1200
        ],
        "color": "#42d392"
    },
    {
        "name": "China",
        "values": [
            459,
            412,
            125,
            112,
            115,
            540,
            655,
            259,
            325,
            368,
            678,
            887
        ],
        "color": "#ff6400"
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
    <VueUiDonutEvolution :config="config" :dataset="dataset">
        <template #svg>
            <slot></slot>
        </template>
    </VueUiDonutEvolution>
</template>
