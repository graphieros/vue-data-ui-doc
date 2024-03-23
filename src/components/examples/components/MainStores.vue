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
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "layout": {
                "labels": {
                    "quadrantLabels": {
                        "show": true,
                        "tl": {
                            "text": "Discount stores",
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "fontSize": 16,
                            "bold": true
                        },
                        "tr": {
                            "text": "Luxury Flagships",
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "fontSize": 16,
                            "bold": true
                        },
                        "br": {
                            "text": "Mass retailers",
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "fontSize": 16,
                            "bold": true
                        },
                        "bl": {
                            "text": "Hard discount",
                            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            "fontSize": 16,
                            "bold": true
                        }
                    },
                    "plotLabels": {
                        "showAsTag": false,
                        "show": true,
                        "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        "fontSize": 10,
                        "offsetY": 14
                    },
                    "axisLabels": {
                        "show": true,
                        "fontSize": 14,
                        "color": {
                            "positive": isDarkMode.value ? '#6A6A6A' : '#1A1A1A',
                            "negative": isDarkMode.value ? '#6A6A6A' : '#1A1A1A',
                        }
                    }
                },
                "grid": {
                    "stroke": isDarkMode.value ? '#6A6A6A' : '#e1e5e8',
                    "strokeWidth": 1.5,
                    "showArrows": true,
                    "graduations": {
                        "show": true,
                        "steps": 5,
                        "stroke": isDarkMode.value ? '#6A6A6A' : '#e1e5e8',
                        "strokeWidth": 0.5,
                        "fill": true,
                        "color": isDarkMode.value ? '#6A6A6A' : '#e1e5e8',
                        "roundingForce": 10
                    },
                    "xAxis": {
                        "auto": true,
                        "min": -100,
                        "max": 100,
                        "name": "Sales margin"
                    },
                    "yAxis": {
                        "auto": true,
                        "min": -100,
                        "max": 100,
                        "name": "Units sold"
                    }
                },
                "plots": {
                    "radius": 6,
                    "outline": true,
                    "outlineColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    "outlineWidth": 1
                },
                "areas": {
                    "show": true,
                    "opacity": 40,
                    "useGradient": true
                }
            },
            "title": {
                "text": "Main stores",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "2025 rankings",
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
                "bold": true
            },
            "legend": {
                "show": true,
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fondSize": 14,
                "bold": true
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
            "roundingValue": 0
        }
    },
    "translations": {
        "category": "Country",
        "item": "City",
        "side": "Category"
    }
}
})

const dataset = ref([
    {
        "name": "Brazil",
        "shape": "diamond",
        "color": "#42d392",
        "series": [
            {
                "name": "Rio de Janeiro",
                "x": 4,
                "y": -2
            },
            {
                "name": "Recife",
                "x": 2,
                "y": -1
            },
            {
                "name": "Brasilia",
                "x": 2,
                "y": 1
            },
            {
                "name": "Salvador",
                "x": -0.5,
                "y": 1
            },
            {
                "name": "São Paulo",
                "x": -1,
                "y": -1
            }
        ]
    },
    {
        "name": "France",
        "shape": "star",
        "color": "#6376DD",
        "series": [
            {
                "name": "Paris",
                "x": 6,
                "y": 6
            },
            {
                "name": "Lyon",
                "x": 3,
                "y": 1
            },
            {
                "name": "Marseille",
                "x": -3,
                "y": 2
            },
            {
                "name": "Toulouse",
                "x": -2,
                "y": -1
            },
            {
                "name": "Lille",
                "x": -1.4,
                "y": 2
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
    <VueUiQuadrant :config="config" :dataset="dataset" />
</template>
