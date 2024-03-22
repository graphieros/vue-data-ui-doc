<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";


const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);


const config = computed(() => {
    return {"useCssAnimation": true,
    "style": {
        "fontFamily": "inherit",
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "layout": {
                "plots": {
                    "show": true,
                    "radius": 2
                },
                "outerPolygon": {
                    "stroke": isDarkMode.value ? '#5A5A5A' : '#1A1A1A',
                    "strokeWidth": 1
                },
                "dataPolygon": {
                    "strokeWidth": 1,
                    "transparent": false,
                    "opacity": 20,
                    "useGradient": true
                },
                "grid": {
                    "show": true,
                    "stroke": isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
                    "strokeWidth": 0.5,
                    "graduations": 5
                },
                "labels": {
                    "dataLabels": {
                        "show": true,
                        "fontSize": 12,
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    }
                }
            },
            "title": {
                "text": "Services",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "2025 per region",
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
                "roundingValue": 0,
                "roundingPercentage": 0
            },
            "legend": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "bold": true,
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
        }
    },
    "translations": {
        "target": "Target",
        "value": "Value",
        "datapoint": "Datapoint"
    }
}
})

const dataset = computed(() => {
    return {
    categories: [
        {
            "name": "Europe",
            "color": "#42d392"
        },
        {
            "name": "America",
            "color": "#6376DD"
        }
    ],
    series: [
        {
            "name": "Satisfaction",
            values: [
                8.2,
                7.7
            ],
            target: 10
        },
        {
            "name": "Revenue",
            values: [
                7550,
                9200
            ],
            target: 10000
        },
        {
            "name": "Average ticket",
            values: [
                216,
                265
            ],
            target: 300
        },
        {
            "name": "Occupancy",
            values: [
                62,
                72
            ],
            target: 100
        },
        {
            "name": "Quality",
            values: [
                7.2,
                5.3
            ],
            target: 10
        },
        {
            "name": "Phonecalls",
            values: [
                3500,
                4200
            ],
            target: 5000
        }
    ]
}
});

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
    <VueUiRadar :config="config" :dataset="dataset" />
</template>
