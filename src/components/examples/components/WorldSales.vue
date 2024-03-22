<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";


const store = useMainStore();
const lang = computed(() => store.lang);
const translations = computed(() => store.translations);
const isDarkMode = computed(() => store.isDarkMode);

const config = computed(() => {
    return {
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            layout: {
                grandTotal: {
                    show: true,
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    fontSize: 20,
                    text: "Grand total",
                    bold: true,
                    prefix: "$ ",
                    suffix: "",
                    roundingValue: 0,
                    offsetY: 0,
                },
                roots: {
                    stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    strokeWidth: 5,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    labels: {
                        show: true,
                        adaptColorToBackground: true,
                        color: "#FFFFFF",
                        fontSize: 16,
                        bold: true,
                        prefix: "$ ",
                        suffix: "",
                        roundingValue: 0,
                        name: {
                            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                            fontSize: 16,
                            bold: true,
                        },
                    },
                },
                verticalSeparator: {
                    stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    strokeWidth: 5,
                },
                links: {
                    opacity: 10,
                },
                branches: {
                    stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    strokeWidth: 0,
                    borderRadius: 6,
                    useGradient: true,
                    gradientIntensity: 20,
                    underlayerColor: "#FFFFFF",
                    widthRatio: 1.5,
                    labels: {
                        show: true,
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 14,
                        bold: true,
                        dataLabels: {
                            show: true,
                            fontSize: 14,
                            hideUnderValue: 5,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            prefix: "$ ",
                            suffix: "",
                        },
                    },
                },
                nuts: {
                    useGradient: true,
                    gradientIntensity: 30,
                    offsetX: 0,
                    selected: {
                        useMotion: true,
                        useGradient: true,
                        gradientIntensity: 40,
                        roundingValue: 0,
                        roundingPercentage: 0,
                        labels: {
                            dataLabels: {
                                hideUnderValue: 5,
                                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                                fontSize: 12,
                                bold: true,
                                prefix: "$ ",
                                suffix: "",
                            },
                            core: {
                                total: {
                                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                                    fontSize: 14,
                                    bold: true,
                                },
                                value: {
                                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                                    fontSize: 14,
                                    bold: true,
                                    prefix: "$ ",
                                    suffix: "",
                                },
                            },
                        },
                    },
                },
                legend: {
                    fontSize: 16,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: "$ ",
                    suffix: "",
                },
                title: {
                    text: "Retail revenue",
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    fontSize: 20,
                    bold: true,
                    offsetY: 0,
                    subtitle: {
                        text: "2025 projections",
                        color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                        fontSize: 16,
                        bold: false,
                        offsetY: 0,
                    },
                },
            },
        },
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            outline: "none",
            translations: {
                rootName: "Region",
                rootValue: "Region value",
                rootToTotal: "% / total",
                branchName: "Country",
                branchValue: "Country value",
                branchToRoot: "% / region",
                branchToTotal: "% / total",
                nutName: "breakdown name",
                nutValue: "breakdown value",
                nutToBranch: "% / country",
                nutToRoot: "% / region",
                nutToTotal: "% / total",
            },
        },
        td: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
            color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            outline: "none",
            roundingValue: 0,
            roundingPercentage: 0,
        },
    },
    userOptions: {
        show: true,
    },
    translations: {
        total: "Total",
        proportionToTree: "of grand total",
        of: "of",
    },
}
})

const dataset = ref([
    {
        name: "America",
        color: "#42d392",
        branches: [
            {
                name: "Brazil",
                value: 9520,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 4200,
                        color: "#f542e3",
                    },
                    {
                        name: "Online shop",
                        value: 5320,
                        color: "#f5c542",
                    },
                ],
            },
            {
                name: "Mexico",
                value: 4485,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 1320,
                        color: "#f542e3",
                    },
                    {
                        name: "Online shop",
                        value: 3165,
                        color: "#f5c542",
                    },
                ],
            },
            {
                name: "USA",
                value: 19676,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 6940,
                        color: "#f542e3",
                    },
                    {
                        name: "Online shop",
                        value: 12736,
                        color: "#f5c542",
                    },
                ],
            },
        ],
    },
    {
        name: "Europe",
        color: "#6376DD",
        branches: [
            {
                name: "France",
                value: 13750,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 6500,
                        color: "#f542e3",
                    },
                    {
                        name: "Online shop",
                        value: 7250,
                        color: "#f5c542",
                    },
                ],
            },
            {
                name: "Germany",
                value: 14550,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 4930,
                        color: "#f537e3",
                    },
                    {
                        name: "Online shop",
                        value: 9620,
                        color: "#f5c542",
                    },
                ],
            },
            {
                name: "Spain",
                value: 10056,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 3843,
                        color: "#f537e3",
                    },
                    {
                        name: "Online shop",
                        value: 6213,
                        color: "#f5c542",
                    },
                ],
            },
        ],
    },
    {
        name: "Asia",
        color: "#f04f19",
        branches: [
            {
                name: "India",
                value: 9620,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 7400,
                        color: "#f537e3",
                    },
                    {
                        name: "Online shop",
                        value: 2220,
                        color: "#f5bb42",
                    },
                ],
            },
            {
                name: "Japan",
                value: 12670,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 4250,
                        color: "#f537e3",
                    },
                    {
                        name: "Online shop",
                        value: 8420,
                        color: "#f5c542",
                    },
                ],
            },
            {
                name: "China",
                value: 26209,
                breakdown: [
                    {
                        name: "Boutique",
                        value: 8620,
                        color: "#f537e3",
                    },
                    {
                        name: "Online shop",
                        value: 17589,
                        color: "#f5c542",
                    },
                ],
            },
        ],
    },
]);

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
    <VueUiChestnut :config="config" :dataset="dataset" />
</template>
