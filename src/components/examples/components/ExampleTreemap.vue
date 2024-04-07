<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";
import CONFIG from "../../../assets/default_configs.json";

const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const types = ref({
    classic: [
        'vue_ui_xy',
        'vue_ui_donut',
        'vue_ui_treemap',
        'vue_ui_waffle',
        'vue_ui_radar',
        'vue_ui_quadrant',
        'vue_ui_gauge',
        'vue_ui_wheel',
        'vue_ui_tiremarks',
        'vue_ui_onion',
        'vue_ui_vertical_bar',
        'vue_ui_heatmap',
        'vue_ui_scatter',
        'vue_ui_candlestick',
        'vue_ui_age_pyramid',
        'vue_ui_relation_circle',
        'vue_ui_thermometer',
        'vue_ui_rings',
        'vue_ui_mood_radar',
        'vue_ui_molecule',
        'vue_ui_nested_donuts',
        'vue_ui_galaxy'
    ],
    mini: [
        'vue_ui_sparkline',
        'vue_ui_sparkbar',
        'vue_ui_sparkstackbar',
        'vue_ui_sparkhistogram',
        'vue_ui_sparkgauge'
    ],
    combined: [
        'vue_ui_chestnut',
        'vue_ui_donut_evolution'
    ],
    tables: [
        'vue_ui_table',
        'vue_ui_table_sparkline'
    ],
    rating: [
        'vue_ui_rating',
        'vue_ui_smiley'
    ],
    utilities: [
        'vue_ui_screenshot',
        'vue_ui_skeleton',
        'vue_ui_dashboard',
        'vue_ui_annotator',
        'vue_ui_icon',
        'vue_ui_digits',
        'vue_ui_mini_loader',
        'vue_ui_kpi'
    ]
})

const dataset = computed(() => {
    const classic = Object.keys(CONFIG).map(c => {
        return {
            name: c.replace('vue_ui_', ''),
            value: countAttributes(CONFIG[c])
        }
    }).filter(c => types.value.classic.includes(`vue_ui_${c.name}`));
    const mini = Object.keys(CONFIG).map(c => {
        return {
            name: c.replace('vue_ui_', ''),
            value: countAttributes(CONFIG[c])
        }
    }).filter(c => types.value.mini.includes(`vue_ui_${c.name}`));
    const combined = Object.keys(CONFIG).map(c => {
        return {
            name: c.replace('vue_ui_', ''),
            value: countAttributes(CONFIG[c])
        }
    }).filter(c => types.value.combined.includes(`vue_ui_${c.name}`));
    const tables = Object.keys(CONFIG).map(c => {
        return {
            name: c.replace('vue_ui_', ''),
            value: countAttributes(CONFIG[c])
        }
    }).filter(c => types.value.tables.includes(`vue_ui_${c.name}`));
    const rating = Object.keys(CONFIG).map(c => {
        return {
            name: c.replace('vue_ui_', ''),
            value: countAttributes(CONFIG[c])
        }
    }).filter(c => types.value.rating.includes(`vue_ui_${c.name}`));
    const utilities = Object.keys(CONFIG).map(c => {
        return {
            name: c.replace('vue_ui_', ''),
            value: countAttributes(CONFIG[c])
        }
    }).filter(c => types.value.utilities.includes(`vue_ui_${c.name}`));

    return [
        {
            name: 'Classic',
            value: classic.map(c => c.value).reduce((a, b) => a + b, 0),
            children: classic
        },
        {
            name: 'Mini',
            value: mini.map(c => c.value).reduce((a, b) => a + b, 0),
            children: mini
        },
        {
            name: 'Combined',
            value: combined.map(c => c.value).reduce((a, b) => a + b, 0),
            children: combined
        },
        {
            name: 'Tables',
            value: tables.map(c => c.value).reduce((a, b) => a + b, 0),
            children: tables
        },
        {
            name: 'Rating',
            value: rating.map(c => c.value).reduce((a, b) => a + b, 0),
            children: rating
        },
        {
            name: 'Utilities',
            value: utilities.map(c => c.value).reduce((a, b) => a + b, 0),
            children: utilities
        },
    ]
})

const config = computed(() => {
    return {
        userOptions: {
            show: true
        },
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                height: 400,
                width: 800,
                padding: {
                    top: 0,
                    left: 6,
                    bottom: 12,
                    right: 6
                },
                layout: {
                    sorted: true,
                    rects: {
                        stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                        strokeWidth: 1,
                        borderRadius: 0,
                        colorRatio: 0.3,
                        gradient: {
                            show: true,
                            intensity: 30
                        },
                        selected: {
                            stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                            strokeWidth: 1,
                            unselectedOpacity: 0.6
                        }
                    },
                    labels: {
                        showDefaultLabels: true,
                        fontSize: 16,
                        minFontSize: 8,
                        hideUnderProportion: 0.02,
                        prefix: "Attrs: ",
                        suffix: "",
                        rounding: 0
                    }
                },
                legend: {
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    show: true,
                    fontSize: 16,
                    bold: false,
                    roundingValue: 0,
                    roundingPercentage: 0
                },
                title: {
                    text: "Vue Data UI",
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        color: "#A1A1A1",
                        text: "Config attributes breakdown",
                        fontSize: 16,
                        bold: false
                    }
                },
                tooltip: {
                    show: true,
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    fontSize: 14,
                    roundingValue: 1,
                    customFormat: null
                }
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 300,
            columnNames: {
                series: "Series",
                value: "Value",
                percentage: "Percentage"
            },
            th: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                outline: "none"
            },
            td: {
                backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                outline: "none",
                roundingValue: 0,
                roundingPercentage: 1
            }
        }
    }
})

function countAttributes(obj) {
    let count = 0;
    function countRecursive(obj) {
        for (let key in obj) {
            count += 1;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                countRecursive(obj[key]);
            }
        }
    }
    countRecursive(obj);

    return count;
}

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
    <VueDataUi component="VueUiTreemap" :config="config" :dataset="dataset" />
</template>