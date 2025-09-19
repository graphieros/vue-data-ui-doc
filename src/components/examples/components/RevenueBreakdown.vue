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
        "userOptions": {
            "show": true
        },
        "style": {
            "chart": {
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "useGradient": true,
                "gradientIntensity": 40,
                "layout": {
                    "labels": {
                        "dataLabels": {
                            "show": true,
                            "fontSize": 14,
                            "useSerieColor": false,
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "hideUnderValue": 3,
                            "prefix": "k$ ",
                            "suffix": "",
                            "offsetX": 4,
                            "offsetY": 4,
                            "showValue": true,
                            "showPercentage": true,
                            "boldValue": false,
                            "boldPercentage": false,
                            "roundingValue": 0,
                            "roundingPercentage": 0,
                            "showDonutName": true,
                            "boldDonutName": true,
                            "donutNameAbbreviation": false,
                            "donutNameMaxAbbreviationSize": 3,
                            "donutNameOffsetY": -6
                        }
                    },
                    "donut": {
                        "strokeWidth": 200,
                        "borderWidth": 2,
                        "spacingRatio": 0.6
                    }
                },
                "legend": {
                    "show": true,
                    "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 14,
                    "bold": false,
                    "roundingValue": 0,
                    "roundingPercentage": 0
                },
                "title": {
                    "text": "Revenue breakdown",
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 20,
                    "bold": true,
                    "subtitle": {
                        "text": "2025 Europe - America",
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        "fontSize": 16,
                        "bold": false
                    }
                },
                "tooltip": {
                    "show": true,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    "fontSize": 14,
                    "showValue": true,
                    "roundingValue": 0,
                    "showPercentage": true,
                    "roundingPercentage": 0
                }
            },
            "fontFamily": "inherit"
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
        "name": "Europe",
        "series": [
            {
                "name": "Boutique",
                "color": "#1f77b4",
                "values": [
                    125
                ]
            },
            {
                "name": "Online shop",
                "color": "#aec7e8",
                "values": [
                    190
                ]
            }
        ]
    },
    {
        "name": "America",
        "series": [
            {
                "name": "Boutique",
                "color": "#1f77b4",
                "values": [
                    455
                ]
            },
            {
                "name": "Online shop",
                "color": "#aec7e8",
                "values": [
                    842
                ]
            }
        ]
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
    <VueUiNestedDonuts :config="config" :dataset="dataset" />
</template>
