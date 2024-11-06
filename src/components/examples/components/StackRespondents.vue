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
        "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        "fontFamily": "inherit",
        "bar": {
            "gradient": {
                "show": true,
                "intensity": 40,
                "underlayerColor": "#FFFFFF"
            }
        },
        "legend": {
            "show": true,
            "textAlign": "left",
            "fontSize": 12,
            "margin": "24px 0 0 0",
            "name": {
                "color": isDarkMode.value ? '#CCCCCC' : '#2A2A2A',
                "bold": false
            },
            "value": {
                "show": true,
                "color": isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
                "rounding": 0,
                "prefix": "",
                "suffix": ""
            },
            "percentage": {
                "show": true,
                "color": isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
                "rounding": 1,
                "bold": true
            }
        },
        "title": {
            "text": "",
        }
    }
}
})
const dataset = computed(() => {
    return [
        {
            "name": "18-29",
            "value": props.detail[0],
            "color": "#6376DD"
        },
        {
            "name": "30-39",
            "value": props.detail[1],
            "color": "#42d392"
        },
        {
            "name": "40-49",
            "value": props.detail[2],
            "color": "#ff6400"
        },
        {
            "name": "50+",
            "value": props.detail[3],
            "color": "#ffdd00"
        }
    ]
})


</script>

<template>
    <VueUiSparkStackbar :config="config" :dataset="dataset" />
</template>
