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
            "useGradient": false,
            "gradientIntensity": 20,
            "layout": {
                "gutter": {
                    "color": isDarkMode.value ? '#3A3A3A' : '#e1e5e8',
                    "width": 0.62
                },
                "track": {
                    "width": 0.62
                },
                "labels": {
                    "show": true,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 14,
                    "bold": true,
                    "roundingValue": 0,
                    "roundingPercentage": 0,
                    "offsetX": 0,
                    "offsetY": 0,
                    "value": {
                        "show": false
                    },
                    "percentage": {
                        "show": true
                    }
                }
            },
            "title": {
                "text": "AverageOccupancy",
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
            "legend": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "bold": true,
                "roundingValue": 0,
                "roundingPercentage": 0
            },
            "tooltip": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
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
            "backgroundColor":isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "outline": "none"
        },
        "td": {
            "backgroundColor":isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "roundingValue": 0,
            "roundingPercentage": 0
        },
        "translations": {
            "value": "Value",
            "percentage": "Percentage",
            "serie": "Series"
        }
    }
}
})

const dataset = ref([
    {
        "name": "Brazil",
        "percentage": 80,
        "color": "#42d392",
        "prefix": "",
        "suffix": ""
    },
    {
        "name": "France",
        "percentage": 68,
        "color": "#5f8bee",
        "prefix": "",
        "suffix": ""
    },
    {
        "name": "Japan",
        "percentage": 92,
        "color": "#ff6400",
        "prefix": "",
        "suffix": ""
    },
    {
        "name": "India",
        "percentage": 88,
        "color": "#d2ac41",
        "prefix": "",
        "suffix": ""
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
    <VueUiOnion :config="config" :dataset="dataset" />
</template>
