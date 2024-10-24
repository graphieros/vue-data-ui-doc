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
    "useBlurOnHover": true,
    "style": {
        "fontFamily": "inherit",
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "layout": {
                "labels": {
                    "dataLabels": {
                        "prefix": "$ ",
                        "suffix": ""
                    }
                },
                "rings": {
                    "stroke": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    "strokeWidth": 2,
                    "gradient": {
                        "show": true,
                        "intensity": 100,
                        "underlayerColor": "#FFFFFF"
                    },
                    "useShadow": true
                }
            },
            "legend": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "roundingValue": 0,
                "roundingPercentage": 0
            },
            "title": {
                "text": "Market share",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "2025 projection",
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
                "showPercentage": true,
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
            "series": "Series",
            "value": "Value",
            "percentage": "Percentage"
        }
    }
}
})

const dataset = ref([
    {
        "name": "Europe",
        "values": [
            8400
        ],
        "color": "#6376DD"
    },
    {
        "name": "America",
        "values": [
            14299
        ],
        "color": "#42d392"
    },
    {
        "name": "Asia",
        "values": [
            18900
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
    <VueUiRings :config="config" :dataset="dataset" />
</template>
