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
    "style": {
        "fontFamily": "inherit",
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "layout": {
                "highlighter": {
                    "color": isDarkMode.value ? '#FFFFFF' : '#1A1A1A',
                    "opacity": 5
                },
                "separators": {
                    "show": true,
                    "color": isDarkMode.value ? '#5A5A5A' : '#e1e5e8',
                    "strokeWidth": 1
                },
                "bars": {
                    "sort": "desc",
                    "useStroke": false,
                    "strokeWidth": 2,
                    "height": 32,
                    "gap": 6,
                    "borderRadius": 4,
                    "offsetX": 64,
                    "paddingRight": 24,
                    "useGradient": true,
                    "gradientIntensity": 20,
                    "fillOpacity": 90,
                    "underlayerColor": "#FFFFFF",
                    "dataLabels": {
                        "offsetX": 12,
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        "fontSize": 12,
                        "bold": true,
                        "value": {
                            "show": true,
                            "roundingValue": 0,
                            "prefix": "$ ",
                            "suffix": ""
                        },
                        "percentage": {
                            "show": true,
                            "roundingPercentage": 0
                        }
                    },
                    "nameLabels": {
                        "show": true,
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        "fontSize": 10,
                        "bold": false,
                        "offsetX": -12
                    },
                    "parentLabels": {
                        "show": true,
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        "fontSize": 16,
                        "bold": false,
                        "offsetX": 0
                    }
                }
            },
            "title": {
                "text": "Sales breakdown",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "Projections 2025",
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 16,
                    "bold": false
                }
            },
            "legend": {
                "show": true,
                "position": "top",
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "bold": true,
                "roundingValue": 0,
                "roundingPercentage": 0,
                "prefix": "$ ",
                "suffix": ""
            },
            "tooltip": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "showValue": true,
                "showPercentage": true,
                "roundingValue": 0,
                "roundingPercentage": 0,
                "prefix": "$",
                "suffix": ""
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
            "roundingPercentage": 0,
            "prefix": "$",
            "suffix": ""
        }
    },
    "translations": {
        "childName": "Ragion",
        "parentName": "Ragion",
        "value": "Value",
        "percentageToTotal": "% / total",
        "percentageToSerie": "% / region"
    }
}
})

const dataset = ref([
    {
        "name": "America",
        "value": 39167,
        "color": "#42d392",
        "children": [
            {
                "name": "Brazil",
                "value": 12400
            },
            {
                "name": "Mexico",
                "value": 8200
            },
            {
                "name": "USA",
                "value": 18567
            }
        ]
    },
    {
        "name": "Euope",
        "value": 30120,
        "color": "#6376DD",
        "children": [
            {
                "name": "France",
                "value": 9600
            },
            {
                "name": "Germany",
                "value": 11320
            },
            {
                "name": "Spain",
                "value": 9200
            }
        ]
    },
    {
        "name": "Asia",
        "value": 48420,
        "color": "#ff6400",
        "children": [
            {
                "name": "China",
                "value": 22400
            },
            {
                "name": "Japan",
                "value": 13600
            },
            {
                "name": "India",
                "value": 12420
            }
        ]
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
    <VueUiVerticalBar :config="config" :dataset="dataset" />
</template>
