<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const props = defineProps({
    title: {
        type: String,
        default: ""
    },
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
    "type": "line",
    "style": {
        "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        "fontFamily": "inherit",
        "zeroLine": {
            "color": "#CCCCCC",
            "strokeWidth": 1
        },
        "line": {
            "color": "#6376DD",
            "strokeWidth": 3,
            "smooth": true
        },
        "area": {
            "show": true,
            "useGradient": true,
            "opacity": 30,
            "color": "#6376DD"
        },
        "bar": {
            "color": "#6376DD",
            "borderRadius": 3
        },
        "verticalIndicator": {
            "show": true,
            "color": "#6376DD",
            "strokeWidth": 1.5,
            "strokeDasharray": 3
        },
        "plot": {
            "show": true,
            "radius": 4,
            "stroke": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            "strokeWidth": 1
        },
        "dataLabel": {
            "position": "left",
            "fontSize": 32,
            "bold": true,
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "roundingValue": 0,
            "valueType": "sum",
            "prefix": "k$ ",
            "suffix": ""
        },
        "title": {
            "show": true,
            "text": props.title,
            "fontSize": 20,
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "bold": true
        }
    }
}
})

const dataset = ref([
    {
        "period": "JAN",
        "value": props.values[0]
    },
    {
        "period": "FEB",
        "value": props.values[1]
    },
    {
        "period": "MAR",
        "value": props.values[2]
    },
    {
        "period": "APR",
        "value": props.values[3]
    },
    {
        "period": "MAY",
        "value": props.values[4]
    },
    {
        "period": "JUN",
        "value": props.values[5]
    },
    {
        "period": "JUL",
        "value": props.values[6]
    },
    {
        "period": "AUG",
        "value": props.values[7]
    },
    {
        "period": "SEP",
        "value": props.values[8]
    },
    {
        "period": "OCT",
        "value": props.values[9]
    },
    {
        "period": "NOV",
        "value": props.values[10]
    },
    {
        "period": "DEC",
        "value": props.values[11]
    }
]);
</script>

<template>
    <VueUiSparkline :config="config" :dataset="dataset" />
</template>
