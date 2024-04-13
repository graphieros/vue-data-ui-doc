<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => {
    return store.translations;
})

const waffleDataset = ref([
    {
        name: "Serie 1",
        color: "#5f8bee",
        values: [100]
    },
    {
        name: "Serie 2",
        color: "#42d392",
        values: [200]
    },
    {
        name: "Serie 3",
        color: "#ff6400",
        values: [300, 1]
    }
]);

const waffleConfig = computed(() => {
    return {
        useBlurOnHover: true,
        useCustomCells: true,
        style: {
            fontFamily: "inherit",
            chart: {
                backgroundColor: "#FFFFFF",
                color: "#2D353C",
                layout: {
                    labels: {
                        dataLabels: {
                            prefix: "",
                            suffix: ""
                        },
                        captions: {
                            show: false,
                            showSerieName: false,
                            serieNameAbbreviation: true,
                            serieNameMaxAbbreviationSize: 3,
                            fontSize: 12,
                            showValue: true,
                            showPercentage: true,
                            roundingValue: 0,
                            roundingPercentage: 0,
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    grid: {
                        size: 10,
                        spaceBetween: 2,
                        vertical: false
                    },
                    rect: {
                        rounded: true,
                        rounding: 2,
                        stroke: "#2D353C",
                        strokeWidth: 1,
                        useGradient: true,
                        gradientIntensity: 40
                    },
                    useDiv: true
                },
                title: {
                    text: "Attendies satisfaction",
                    color: "#2D353C",
                    fontSize: 20,
                    bold: true,
                    subtitle: {
                        color: "#A1A1A1",
                        text: "Yearly meeting",
                        fontSize: 16,
                        bold: false
                    }
                },
                tooltip: {
                    show: true,
                    backgroundColor: "#FFFFFF",
                    color: "#2D353C",
                    fontSize: 14,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    customFormat: null
                },
                legend: {
                    show: true,
                    bold: true,
                    backgroundColor: "#FFFFFF",
                    color: "#2D353C",
                    fontSize: 14,
                    roundingValue: 0,
                    roundingPercentage: 0
                }
            }
        },
        userOptions: {
            show: true,
            title: "options",
            labels: {
                useDiv: "Title & legend inside",
                showTable: "Show table"
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
            columnNames: {
                series: "Series",
                value: "Value",
                percentage: "Percentage"
            },
            th: {
                backgroundColor: "#FAFAFA",
                color: "#2D353C",
                outline: "none"
            },
            td: {
                backgroundColor: "#FFFFFF",
                color: "#2D353C",
                outline: "none",
                roundingValue: 0,
                roundingPercentage: 0
            }
        }
    }
})

</script>

<template>
<div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
    <h2 class="mb-4 text-xl text-left w-full">&lt;VueUiWaffle /&gt;</h2>
    <h3 class="w-full text-left text-xl mb-2">#cell slot</h3>
    <p class="text-left">
        {{ translations.customization.otherSlots.waffle[store.lang] }}
    </p>
    <div class="w-full text-left py-4 my-4 px-4 bg-gray-200 dark:bg-gray-800">
        <code class="text-left text-xs">
            &lt;VueUiWaffle<br>
            &nbsp;&nbsp;:config="config"<br>
            &nbsp;&nbsp;:dataset="dataset"<br>
            &gt;<br>
            &nbsp;&nbsp;&lt;template #cell="{ cell, isSelected }"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div :style="`opacity:${isSelected ? 1 : 0.3}`"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiIcon<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-if="cell.name === 'Serie 3'"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name="moodFlat"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size="40"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:stroke="cell.color"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiIcon<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-if="cell.name === 'Serie 2'"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name="moodHappy"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size="40"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:stroke="cell.color"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiIcon<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-if="cell.name === 'Serie 1'"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name="smiley"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size="40"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:stroke="cell.color"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/template&gt;<br>
            &lt;/VueUiWaffle&gt;
        </code>
    </div>
    <div class="w-full bg-white flex justify-center">
        <div class="w-full max-w-[400px] p-2 bg-white">
            <VueDataUi component="VueUiWaffle" :dataset="waffleDataset" :config="waffleConfig">
                <template #cell="{ cell, isSelected }">
                    <div class="flex place-items-center justify-center transition-opacity h-full w-full" :style="`opacity: ${isSelected ? 1 : 0.3}`">
                        <VueUiIcon v-if="cell.name === 'Serie 3'" name="moodFlat" :size="40" :stroke="cell.color"/>
                        <VueUiIcon v-if="cell.name === 'Serie 2'" name="moodHappy" :size="40" :stroke="cell.color"/>
                        <VueUiIcon v-if="cell.name === 'Serie 1'" name="smiley" :size="40" :stroke="cell.color"/>
                    </div>
                </template>
            </VueDataUi>
        </div>
    </div>
</div>
</template>