<script setup>

import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode)

const props = defineProps({
    value: {
        type: Number,
        default: 0,
    }
})

const config = computed(() => {
    return {
        "style": {
            "fontFamily": "inherit",
            "chart": {
                "backgroundColor": isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                "color": "#1A1A1A",
                "animation": {
                    "use": false,
                    "speed": 0.5,
                    "acceleration": 1
                },
                "layout": {
                    "wheel": {
                        "ticks": {
                            "rounded": true,
                            "inactiveColor": isDarkMode.value ? "#3A3A3A" : "#e1e5e8",
                            "activeColor": "#5f8bee",
                            "gradient": {
                                "show": true,
                                "shiftHueIntensity": "-20"
                            }
                        }
                    },
                    "innerCircle": {
                        "show": true,
                        "stroke": "#e1e5e8",
                        "strokeWidth": 1
                    },
                    "percentage": {
                        "show": true,
                        "fontSize": 90,
                        "rounding": 0,
                        "bold": true
                    }
                },
                "title": {
                    "text": "",
                    "color": "#1A1A1A",
                    "fontSize": 20,
                    "bold": true,
                    "subtitle": {
                        "text": "",
                        "color": "#A1A1A1",
                        "fontSize": 16,
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


const dataset = computed(() => {
    return {
        "percentage": props.value
    }
})

</script>

<template>
    <VueUiWheel :config="config" :dataset="dataset" />
</template>
