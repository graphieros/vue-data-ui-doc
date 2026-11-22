<script setup>
import SparkHistogramExample from "./SparkHistogramExample.vue";

const dataset = [
    { timeLabel: "00:00", value: 160, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "01:00", value: 120, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "02:00", value: 90, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "03:00", value: 70, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "04:00", value: 80, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "05:00", value: 120, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "06:00", value: 180, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "07:00", value: 240, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "08:00", value: 320, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "09:00", value: 480, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "10:00", value: 620, valueLabel: "3%", intensity: 0.03 },
    { timeLabel: "11:00", value: 750, valueLabel: "5%", intensity: 0.05 },
    { timeLabel: "12:00", value: 810, valueLabel: "8%", intensity: 0.08 },
    { timeLabel: "13:00", value: 690, valueLabel: "4%", intensity: 0.04 },
    { timeLabel: "14:00", value: 570, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "15:00", value: 430, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "16:00", value: 400, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "17:00", value: 460, valueLabel: "3%", intensity: 0.03 },
    { timeLabel: "18:00", value: 520, valueLabel: "4%", intensity: 0.04 },
    { timeLabel: "19:00", value: 580, valueLabel: "3%", intensity: 0.03 },
    { timeLabel: "20:00", value: 540, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "21:00", value: 420, valueLabel: "2%", intensity: 0.02 },
    { timeLabel: "22:00", value: 300, valueLabel: "1%", intensity: 0.01 },
    { timeLabel: "23:00", value: 210, valueLabel: "1%", intensity: 0.01 },
].map((item) => ({
    ...item,
    intensity: 0.4 + (item.intensity / 0.08) * 0.6,
}));
</script>

<template>
    <SparkHistogramExample
        title="Website traffic"
        description="Visits per hour. The percentage shows the error rate; color intensity is scaled from 0% to 8% with a visible minimum."
        color="#8a5bb7"
        source="uc-spark-histogram-traffic.vue"
        :time-label-font-size="11"
        :dataset="dataset"
    />
</template>
