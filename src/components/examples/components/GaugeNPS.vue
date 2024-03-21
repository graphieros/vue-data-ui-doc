<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const props = defineProps({
    dataset: {
        type: Object,
        default()  {
            return {}
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
        "fontFamily": "inherit",
        "background": isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
        "height": 84,
        "basePosition": 72,
        "animation": {
            "show": true,
            "speedMs": 150
        },
        "title": {
            "show": false,
        },
        "dataLabel": {
            "fontSize": 38,
            "autoColor": true,
            "color": "#1A1A1A",
            "offsetY": -3,
            "bold": false,
            "rounding": 1,
            "prefix": "",
            "suffix": ""
        },
        "colors": {
            "min": "#FF0000",
            "max": "#00FF00"
        },
        "track": {
            "autoColor": true,
            "color": "#5f8bee",
            "strokeLinecap": "round"
        },
        "gutter": {
            "color": isDarkMode.value ? "#4A4A4A" : "#e1e5e8",
            "strokeLinecap": "round"
        }
    }
}
})

</script>

<template>
    <div style="width:100px">
        <VueUiSparkgauge :config="config" :dataset="dataset" />
    </div>
</template>
