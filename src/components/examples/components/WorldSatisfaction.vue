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
        "fontFamily": "inherit",
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "animation": {
                "use": false,
                "speed": 1,
                "acceleration": 1
            },
            "layout": {
                "track": {
                    "size": 1,
                    "useGradient": true,
                    "gradientIntensity": 20
                },
                "markers": {
                    "size": 1,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "bold": true,
                    "fontSizeRatio": 1,
                    "offsetY": 0,
                    "stroke": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "strokeWidth": 1,
                    "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    "roundingValue": 0
                },
                "pointer": {
                    "size": 1,
                    "stroke": "#2A2A2A",
                    "strokeWidth": 12,
                    "useRatingColor": true,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "circle": {
                        "radius": 10,
                        "stroke": "#2A2A2A",
                        "strokeWidth": 2,
                        "color": "#FFFFFF"
                    }
                }
            },
            "legend": {
                "fontSize": 48,
                "prefix": "",
                "suffix": "",
                "showPlusSymbol": true,
                "useRatingColor": true,
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "roundingValue": 1
            },
            "title": {
                "text": "World satisfaction",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "2025",
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 16,
                    "bold": false
                }
            }
        }
    },
    "userOptions": {
        "show": true
    }
}
});

const dataset = ref({
    "series": [
        {
            "from": -100,
            "to": 0,
            "color": "#dd8264",
        },
        {
            "from": 0,
            "to": 30,
            "color": "#d2b341",
        },
        {
            "from": 30,
            "to": 60,
            "color": "#bad241",
        },
        {
            "from": 60,
            "to": 100,
            "color": "#42d392",
        }
    ],
    "value": 54
})

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
    <VueUiGauge :config="config" :dataset="dataset" />
</template>
