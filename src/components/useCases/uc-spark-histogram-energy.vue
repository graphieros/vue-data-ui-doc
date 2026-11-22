<script setup>
import SparkHistogramExample from "./SparkHistogramExample.vue";

const dataset = [
    { timeLabel: "Mon", value: 24, valueLabel: "30%", intensity: 0.3 },
    { timeLabel: "Tue", value: 29, valueLabel: "45%", intensity: 0.45 },
    { timeLabel: "Wed", value: 27, valueLabel: "40%", intensity: 0.4 },
    { timeLabel: "Thu", value: 31, valueLabel: "55%", intensity: 0.55 },
    { timeLabel: "Fri", value: 26, valueLabel: "48%", intensity: 0.48 },
    { timeLabel: "Sat", value: 21, valueLabel: "25%", intensity: 0.25 },
    { timeLabel: "Sun", value: 19, valueLabel: "20%", intensity: 0.2 },
];
</script>

<template>
    <SparkHistogramExample
        title="Energy consumption"
        description="Daily electricity use in kWh. The percentage and color intensity show the share used during peak hours."
        color="#d17c31"
        source="uc-spark-histogram-energy.vue"
        :dataset="dataset"
    />
</template>
