<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Campaign A",
        values: [
            {
                x: 4,
                y: 120,
                label: "W1",
            },
            {
                x: 5,
                y: 155,
                label: "W2",
            },
            {
                x: 6,
                y: 170,
                label: "W3",
            },
            {
                x: 7,
                y: 205,
                label: "W4",
            },
            {
                x: 6,
                y: 195,
                label: "W5",
            },
            {
                x: 8,
                y: 230,
                label: "W6",
            },
        ],
    },
    {
        name: "Campaign B",
        values: [
            {
                x: 3,
                y: 85,
                label: "W1",
            },
            {
                x: 4,
                y: 115,
                label: "W2",
            },
            {
                x: 5,
                y: 145,
                label: "W3",
            },
            {
                x: 5.5,
                y: 150,
                label: "W4",
            },
            {
                x: 4.5,
                y: 135,
                label: "W5",
            },
            {
                x: 7,
                y: 190,
                label: "W6",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Marketing campaigns"
        description="Compare weekly advertising spend and conversions."
        x-axis="Ad spend ($ thousands)"
        y-axis="Conversions"
        source="uc-history-marketing.vue"
        :dataset="dataset"
    />
</template>
