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
            "fontFamily":"inherit",
            "shape": "bar",
            "chart": {
                "animation": {
                    "use": true,
                    "speed":1,
                    "acceleration":1
                },
                "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "bar": {
                    "color": "#5f8bee",
                    "stroke": "#5f8bee",
                    "strokeWidth": 0.7,
                    "shadeColor": "#2D353C"
                },
                "box": {
                    "stroke": "#CCCCCC",
                    "strokeWidth": 0.7,
                    "strokeDasharray": 2,
                    "dimensions": {
                        "width": 160,
                        "height": 326,
                        "top": 27,
                        "bottom": 9,
                        "left": 24,
                        "right": 24,
                        "perspective": 18
                    }
                },
                "title": {
                    "text": "Boutique revenue",
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 20,
                    "bold": true,
                    "subtitle": {
                        "color": "#A1A1A1",
                        "text": "2025", 
                        "fontSize": 16,
                        "bold": false
                    }
                },
                "legend": {
                    "showDefault": true,
                    "fontSize": 10,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "bold": false,
                    "roundingValue": 0,
                    "roundingPercentage": 0,
                    "prefix": "",
                    "suffix": "k€",
                    "hideUnderPercentage": 3
                },
                "dataLabel": {
                    "show": true,
                    "bold": true,
                    "color": "#5f8bee",
                    "fontSize": 12,
                    "rounding": 1
                }
            }
        },
        "userOptions": {
            "show": true
        },
        "table": {
            "show": false,
            "responsiveBreakpoint": 300,
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

const dataset = ref({
    // percentage: 12,
    series: [
        {
            name: "Brazil",
            value: 153,
            color: "#42d392"
        },
        {
            name: "France",
            value: 255,
            color: "#6376DD"
        },
        {
            name: "India",
            value: 113,
            color: "#d98320"
        },
        {
            name: "Japan",
            value: 290,
            color: "#d94126"
        },
        {
            name: "Germany",
            value: 275,
            color: "#f5ee38"
        }
    ]
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
    <div class="w-full">
        <!-- <VueUi3dBar component="VueUi3dBar" :config="config" :dataset="dataset" /> -->
        <VueDataUi component="VueUi3dBar" :config="config" :dataset="dataset" />
    </div>
</template>