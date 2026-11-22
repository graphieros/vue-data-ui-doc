<script setup>
import SparkHistogramExample from "./SparkHistogramExample.vue";

const dataset = [
    { timeLabel: "Mon", value: 35, valueLabel: "20%", intensity: 0.2 },
    { timeLabel: "Tue", value: 50, valueLabel: "40%", intensity: 0.4 },
    { timeLabel: "Wed", value: 25, valueLabel: "15%", intensity: 0.15 },
    { timeLabel: "Thu", value: 45, valueLabel: "35%", intensity: 0.35 },
    { timeLabel: "Fri", value: 30, valueLabel: "25%", intensity: 0.25 },
    { timeLabel: "Sat", value: 70, valueLabel: "55%", intensity: 0.55 },
    { timeLabel: "Sun", value: 40, valueLabel: "30%", intensity: 0.3 },
];
</script>

<template>
    <SparkHistogramExample
        title="Daily exercise"
        description="Minutes active per day. The percentage and color intensity show the share spent at high effort."
        color="#b45b98"
        source="uc-spark-histogram-exercise.vue"
        :dataset="dataset"
    />
</template>
