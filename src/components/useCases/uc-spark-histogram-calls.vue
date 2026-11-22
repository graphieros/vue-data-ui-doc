<script setup>
import SparkHistogramExample from "./SparkHistogramExample.vue";

const dataset = [
    { timeLabel: "00:00", value: 4, valueLabel: "5%", intensity: 0.05 },
    { timeLabel: "01:00", value: 3, valueLabel: "4%", intensity: 0.04 },
    { timeLabel: "02:00", value: 2, valueLabel: "3%", intensity: 0.03 },
    { timeLabel: "03:00", value: 2, valueLabel: "3%", intensity: 0.03 },
    { timeLabel: "04:00", value: 3, valueLabel: "4%", intensity: 0.04 },
    { timeLabel: "05:00", value: 5, valueLabel: "6%", intensity: 0.06 },
    { timeLabel: "06:00", value: 10, valueLabel: "10%", intensity: 0.1 },
    { timeLabel: "07:00", value: 18, valueLabel: "15%", intensity: 0.15 },
    { timeLabel: "08:00", value: 30, valueLabel: "20%", intensity: 0.2 },
    { timeLabel: "09:00", value: 45, valueLabel: "40%", intensity: 0.4 },
    { timeLabel: "10:00", value: 65, valueLabel: "65%", intensity: 0.65 },
    { timeLabel: "11:00", value: 72, valueLabel: "80%", intensity: 0.8 },
    { timeLabel: "12:00", value: 54, valueLabel: "55%", intensity: 0.55 },
    { timeLabel: "13:00", value: 68, valueLabel: "75%", intensity: 0.75 },
    { timeLabel: "14:00", value: 47, valueLabel: "38%", intensity: 0.38 },
    { timeLabel: "15:00", value: 32, valueLabel: "22%", intensity: 0.22 },
    { timeLabel: "16:00", value: 28, valueLabel: "20%", intensity: 0.2 },
    { timeLabel: "17:00", value: 22, valueLabel: "16%", intensity: 0.16 },
    { timeLabel: "18:00", value: 18, valueLabel: "14%", intensity: 0.14 },
    { timeLabel: "19:00", value: 14, valueLabel: "12%", intensity: 0.12 },
    { timeLabel: "20:00", value: 10, valueLabel: "10%", intensity: 0.1 },
    { timeLabel: "21:00", value: 8, valueLabel: "8%", intensity: 0.08 },
    { timeLabel: "22:00", value: 6, valueLabel: "7%", intensity: 0.07 },
    { timeLabel: "23:00", value: 5, valueLabel: "6%", intensity: 0.06 },
];
</script>

<template>
    <SparkHistogramExample
        title="Call center workload"
        description="Calls received per hour. The percentage and color intensity show average queue occupancy."
        color="#4b83bf"
        source="uc-spark-histogram-calls.vue"
        :time-label-font-size="11"
        :dataset="dataset"
    />
</template>
