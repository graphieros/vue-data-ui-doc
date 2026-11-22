<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Email",
        values: [
            {
                x: 80,
                y: 4,
                label: "Jan",
            },
            {
                x: 95,
                y: 5,
                label: "Feb",
            },
            {
                x: 120,
                y: 7,
                label: "Mar",
            },
            {
                x: 105,
                y: 5,
                label: "Apr",
            },
            {
                x: 90,
                y: 3.5,
                label: "May",
            },
            {
                x: 85,
                y: 3,
                label: "Jun",
            },
        ],
    },
    {
        name: "Identity",
        values: [
            {
                x: 60,
                y: 3,
                label: "Jan",
            },
            {
                x: 70,
                y: 4,
                label: "Feb",
            },
            {
                x: 85,
                y: 5,
                label: "Mar",
            },
            {
                x: 75,
                y: 4,
                label: "Apr",
            },
            {
                x: 65,
                y: 3,
                label: "May",
            },
            {
                x: 55,
                y: 2.5,
                label: "Jun",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="IT service performance"
        description="Compare monthly ticket volume and response time for two services."
        x-axis="Tickets / month"
        y-axis="Response time (hours)"
        source="uc-history-services.vue"
        :dataset="dataset"
    />
</template>
