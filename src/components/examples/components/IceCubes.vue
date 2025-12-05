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
        "shape": "bar",
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "animation": {
                "use": true,
                "speed": 1,
                "acceleration": 1
            },
            "box": {
                "stroke": isDarkMode.value ? '#5A5A5A' : '#CCCCCC',
                "strokeWidth": 0.7,
                "strokeDasharray": 3,
                "dimensions": {
                    "width": 128,
                    "height": 256,
                    "top": 36,
                    "right": 24,
                    "bottom": 9,
                    "left": 24,
                    "perspective": 14
                }
            },
            "bar": {
                "color": "#64b5dd",
                "stroke": "#64a3dd",
                "strokeWidth": 0.7
            },
            "dataLabel": {
                "show": true,
                "color": "#64b5dd",
                "fontSize": 12,
                "bold": true,
                "rounding": 1
            },
            "title": {
                "text": "Ice cubes",
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 20,
                "bold": true,
                "subtitle": {
                    "text": "Sales / target 2025",
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": 16,
                    "bold": false
                }
            }
        },
        "fontFamily": "inherit"
    },
    "userOptions": {
        "show": true
    }
}
})

const dataset = ref({
    "percentage": 66.5
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
    <VueUi3dBar :config="config" :dataset="dataset" />
</template>
