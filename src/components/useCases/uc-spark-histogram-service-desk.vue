<script setup>
import SparkHistogramExample from "./SparkHistogramExample.vue";

const dataset = [
    { timeLabel: "00:00", value: 3, valueLabel: "5%", intensity: 0.05 },
    { timeLabel: "01:00", value: 2, valueLabel: "4%", intensity: 0.04 },
    { timeLabel: "02:00", value: 2, valueLabel: "4%", intensity: 0.04 },
    { timeLabel: "03:00", value: 1, valueLabel: "3%", intensity: 0.03 },
    { timeLabel: "04:00", value: 2, valueLabel: "5%", intensity: 0.05 },
    { timeLabel: "05:00", value: 3, valueLabel: "5%", intensity: 0.05 },
    { timeLabel: "06:00", value: 5, valueLabel: "6%", intensity: 0.06 },
    { timeLabel: "07:00", value: 8, valueLabel: "8%", intensity: 0.08 },
    { timeLabel: "08:00", value: 12, valueLabel: "8%", intensity: 0.08 },
    { timeLabel: "09:00", value: 20, valueLabel: "15%", intensity: 0.15 },
    { timeLabel: "10:00", value: 28, valueLabel: "25%", intensity: 0.25 },
    { timeLabel: "11:00", value: 24, valueLabel: "20%", intensity: 0.2 },
    { timeLabel: "12:00", value: 18, valueLabel: "11%", intensity: 0.11 },
    { timeLabel: "13:00", value: 26, valueLabel: "30%", intensity: 0.3 },
    { timeLabel: "14:00", value: 21, valueLabel: "19%", intensity: 0.19 },
    { timeLabel: "15:00", value: 15, valueLabel: "7%", intensity: 0.07 },
    { timeLabel: "16:00", value: 14, valueLabel: "12%", intensity: 0.12 },
    { timeLabel: "17:00", value: 11, valueLabel: "10%", intensity: 0.1 },
    { timeLabel: "18:00", value: 9, valueLabel: "9%", intensity: 0.09 },
    { timeLabel: "19:00", value: 7, valueLabel: "8%", intensity: 0.08 },
    { timeLabel: "20:00", value: 6, valueLabel: "7%", intensity: 0.07 },
    { timeLabel: "21:00", value: 5, valueLabel: "6%", intensity: 0.06 },
    { timeLabel: "22:00", value: 4, valueLabel: "5%", intensity: 0.05 },
    { timeLabel: "23:00", value: 3, valueLabel: "5%", intensity: 0.05 },
].map((item) => ({
    ...item,
    intensity: 0.4 + (item.intensity / 0.3) * 0.6,
}));
</script>

<template>
    <SparkHistogramExample
        title="IT service desk activity"
        description="Tickets received per hour. The percentage shows the share that breached the response target; color intensity is scaled from 0% to 30% with a visible minimum."
        color="#5279d1"
        source="uc-spark-histogram-service-desk.vue"
        :time-label-font-size="11"
        :dataset="dataset"
    />
</template>
