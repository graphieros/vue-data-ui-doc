<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";

const props = defineProps({
    value: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ''
    },
    isModel: {
        type: Boolean,
        default: false
    },
    mainTitle: {
        type: String,
        default: "Satisfaction"
    },
    titleFontSize: {
        type: Number,
        default: 20
    },
    subtitleFontSize: {
        type: Number,
        default: 16
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
        "chart": {
            "backgroundColor": isDarkMode.value ? '#2A2A2A' : '#f3f4f6',
            "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            "animation": {
                "use": true,
                "speed": 0.5,
                "acceleration": 1
            },
            "layout": {
                "wheel": {
                    "ticks": {
                        "rounded": true,
                        "inactiveColor": isDarkMode.value ? '#4A4A4A' : '#e1e5e8',
                        "activeColor": "#FFA000",
                        "gradient": {
                            "show": true,
                            "shiftHueIntensity": 50
                        }
                    }
                },
                "innerCircle": {
                    "show": true,
                    "stroke": isDarkMode.value ? '#5A5A5A' : '#e1e5e8',
                    "strokeWidth": 1
                },
                "percentage": {
                    "show": true,
                    "fontSize": 64,
                    "rounding": 1,
                    "bold": true
                }
            },
            "title": {
                "text": props.mainTitle,
                "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                "fontSize": props.titleFontSize,
                "bold": true,
                "subtitle": {
                    "text": props.title,
                    "color": isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    "fontSize": props.subtitleFontSize,
                    "bold": false
                }
            }
        }
    },
    "userOptions": {
        "show": false
    }
}
})


const dataset = ref({
    "percentage": props.value
});

function getData() {
    return {
        dataset: dataset.value,
        config: config.value
    }

}

defineExpose({
    getData
})

</script>

<template>
    <VueUiWheel :config="config" :dataset="dataset" />
</template>
