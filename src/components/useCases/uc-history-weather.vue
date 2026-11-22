<script setup>
import HistoryPlotExample from "./HistoryPlotExample.vue";

const dataset = [
    {
        name: "Coastal city",
        values: [
            {
                x: 5,
                y: 85,
                label: "Jan",
            },
            {
                x: 6,
                y: 75,
                label: "Feb",
            },
            {
                x: 9,
                y: 65,
                label: "Mar",
            },
            {
                x: 12,
                y: 55,
                label: "Apr",
            },
            {
                x: 16,
                y: 50,
                label: "May",
            },
            {
                x: 19,
                y: 45,
                label: "Jun",
            },
            {
                x: 21,
                y: 35,
                label: "Jul",
            },
            {
                x: 21,
                y: 40,
                label: "Aug",
            },
            {
                x: 18,
                y: 55,
                label: "Sep",
            },
            {
                x: 14,
                y: 75,
                label: "Oct",
            },
            {
                x: 9,
                y: 90,
                label: "Nov",
            },
            {
                x: 6,
                y: 95,
                label: "Dec",
            },
        ],
    },
    {
        name: "Inland city",
        values: [
            {
                x: -2,
                y: 45,
                label: "Jan",
            },
            {
                x: 0,
                y: 40,
                label: "Feb",
            },
            {
                x: 5,
                y: 50,
                label: "Mar",
            },
            {
                x: 11,
                y: 60,
                label: "Apr",
            },
            {
                x: 16,
                y: 75,
                label: "May",
            },
            {
                x: 21,
                y: 85,
                label: "Jun",
            },
            {
                x: 24,
                y: 80,
                label: "Jul",
            },
            {
                x: 23,
                y: 70,
                label: "Aug",
            },
            {
                x: 18,
                y: 60,
                label: "Sep",
            },
            {
                x: 12,
                y: 55,
                label: "Oct",
            },
            {
                x: 5,
                y: 50,
                label: "Nov",
            },
            {
                x: 0,
                y: 45,
                label: "Dec",
            },
        ],
    },
];
</script>

<template>
    <HistoryPlotExample
        title="Seasonal weather patterns"
        description="Compare monthly average temperature and rainfall for two illustrative cities."
        x-axis="Temperature (°C)"
        y-axis="Rainfall (mm)"
        source="uc-history-weather.vue"
        :dataset="dataset"
    />
</template>
