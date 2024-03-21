<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const props = defineProps({
    values: {
        type: Array,
        default() {
            return []
        }
    }
})

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
    return {
    "style": {
        "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        "fontFamily": "inherit",
        "layout": {
            "height": 120,
            "width": 640,
            "padding": {
                "top": 24,
                "right": 0,
                "bottom": 36,
                "left": 0
            }
        },
        "bars": {
            "shape": "square",
            "strokeWidth": 0,
            "colors": {
                "positive": "#6376DD",
                "negative": "#ff6400",
                "gradient": {
                    "show": true
                }
            },
            "borderRadius": 24,
            "gap": 12
        },
        "labels": {
            "value": {
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "rounding": 1,
                "bold": true,
                "prefix": "",
                "suffix": "",
                "offsetY": -4
            },
            "valueLabel": {
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 14,
                "rounding": 0,
                "bold": false
            },
            "timeLabel": {
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": 12,
                "bold": false
            }
        },
        "selector": {
            "stroke": "#CCCCCC",
            "strokeWidth": 2,
            "strokeDasharray": 0,
            "borderRadius": 2
        },
        "title": {
            "text": "",
        }
    }
}
})

const dataset = ref([
    {
        "value": props.values[0],
        "valueLabel": "",
        "timeLabel": "09:00",
        "intensity": "1"
    },
    {
        "value": props.values[1],
        "valueLabel": "",
        "timeLabel": "10:00",
        "intensity": "1"
    },
    {
        "value": props.values[2],
        "valueLabel": "",
        "timeLabel": "11:00",
        "intensity": "1"
    },
    {
        "value": props.values[3],
        "valueLabel": "",
        "timeLabel": "12:00",
        "intensity": "1"
    },
    {
        "value": props.values[4],
        "valueLabel": "",
        "timeLabel": "13:00",
        "intensity": "1"
    },
    {
        "value": props.values[5],
        "valueLabel": "",
        "timeLabel": "14:00",
        "intensity": 1
    },
    {
        "value": props.values[6],
        "valueLabel": "",
        "timeLabel": "15:00",
        "intensity": "1"
    },
    {
        "value": props.values[7],
        "valueLabel": "",
        "timeLabel": "16:00",
        "intensity": "1"
    },
    {
        "value": props.values[8],
        "valueLabel": "",
        "timeLabel": "17:00",
        "intensity": "1"
    },
    {
        "value": props.values[9],
        "valueLabel": "",
        "timeLabel": "18:00",
        "intensity": "1"
    },
    {
        "value": props.values[10],
        "valueLabel": "",
        "timeLabel": "19:00",
        "intensity": "1"
    },
    {
        "value": props.values[11],
        "valueLabel": "",
        "timeLabel": "20:00",
        "intensity": "1"
    }
]);
</script>

<template>
    <VueUiSparkHistogram :config="config" :dataset="dataset" />
</template>
