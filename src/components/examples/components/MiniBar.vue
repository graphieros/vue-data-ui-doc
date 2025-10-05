<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const props = defineProps({
    detail: {
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
        "backgroundColor": isDarkMode.value ? '#3A3A3A' : '#f9fafb',
        "fontFamily": "inherit",
        "layout": {
            "independant": true,
            "percentage": false,
            "target": 1500
        },
        "gutter": {
            "backgroundColor": isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
            "opacity": 100
        },
        "bar": {
            "gradient": {
                "show": true,
                "intensity": 40,
                "underlayerColor": "#FFFFFF"
            }
        },
        "gap": 4,
        "labels": {
            "fontSize": 16,
            "name": {
                "position": "top",
                "width": "100%",
                "color": isDarkMode.value ? '#CCCCCC' : '#2A2A2A',
                "bold": false
            },
            "value": {
                "show": true,
                "bold": true
            }
        }
    }
}
})

const dataset = computed(() => {
    return [
        {
            "name": "Accessories",
            "value": props.detail[0],
            "color": "#6376DD",
            "prefix": "k$ ",
            "suffix": "",
            "rounding": 1
        },
        {
            "name": "Hardware",
            "value": props.detail[1],
            "color": "#42d392",
            "prefix": "k$ ",
            "suffix": "",
            "rounding": 1
        },
        {
            "name": "Software",
            "value": props.detail[2],
            "color": "#ff6400",
            "prefix": "k$ ",
            "suffix": "",
            "rounding": 1
        }
    ]
})
</script>

<template>
    <VueUiSparkbar :config="config" :dataset="dataset" />
</template>
