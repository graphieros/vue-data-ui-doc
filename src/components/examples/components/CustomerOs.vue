<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";


const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);


const config = computed(() => {
    return {
    "useBlurOnHover": true,
    "style": {
        "fontFamily": "inherit",
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "layout": {
                "labels": {
                    "dataLabels": {
                        "prefix": "",
                        "suffix": ""
                    },
                    "captions": {
                        "show": true,
                        "showSerieName": true,
                        "serieNameAbbreviation": true,
                        "serieNameMaxAbbreviationSize": 3,
                        "fontSize": 25,
                        "showValue": true,
                        "showPercentage": true,
                        "roundingValue": 0,
                        "roundingPercentage": 0,
                        "offsetX": 10,
                        "offsetY": 0
                    }
                },
                "grid": {
                    "size": 10,
                    "spaceBetween": 0,
                    "vertical": false
                },
                "rect": {
                    "rounding": 2,
                    "stroke": "#1A1A1A",
                    "strokeWidth": 1,
                    "useGradient": true,
                    "gradientIntensity": 40
                }
            },
            "title": {
                "text": "Customer OS",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "2025",
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 16,
                    "bold": false
                }
            },
            "tooltip": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "showValue": true,
                "roundingValue": 0,
                "showPercentage": true,
                "roundingPercentage": 0
            },
            "legend": {
                "show": true,
                "backgroundColor":isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "bold": false,
                "roundingValue": 0,
                "roundingPercentage": 0
            }
        }
    },
    "userOptions": {
        "show": true
    },
    "table": {
        "show": false,
        "responsiveBreakpoint": 400,
        "columnNames": {
            "series": "Series",
            "value": "Value",
            "percentage": "Percentage"
        },
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
    }
}
})

const dataset = ref([
    {
        "name": "Windows",
        "values": [
            1250
        ],
        "color": "#42d392"
    },
    {
        "name": "Apple",
        "values": [
            643
        ],
        "color": "#6376DD"
    },
    {
        "name": "Linux",
        "values": [
            145
        ],
        "color": "#d2a441"
    }
]);

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
    <VueUiWaffle :config="config" :dataset="dataset" />
</template>
