<script setup>
import { ref, computed } from "vue";
import BaseLinkedSparklineUnit from "./BaseLinkedSparklineUnit.vue";

function makeSparklineRandomDataset(scale=1000, n=24, periodName="Period") {
    const arr = [];

    for (let i = 0; i < n; i += 1) {
        arr.push({
            period: `${i + 1 < 10 ? '0' : ''}${i + 1}-01-2026`,
            value: Math.round(Math.random() * scale)
        });
    }

    return arr;
}

const sparklines = computed(() => {
    return [
        {
            lineColor: '#5f8aee',
            color: "#5f8aee",
            gradient: "#abc2f6",
            dataset: makeSparklineRandomDataset(1000),
            title: 'Users',
        },
        {
            lineColor: '#c95304',
            color: "#ff6600",
            gradient: '#faa770',
            dataset: makeSparklineRandomDataset(800),
            title: 'Viewers',
        },
        {
            lineColor: '#21a368',
            color: "#42d392",
            gradient: '#87e6bb',
            dataset: makeSparklineRandomDataset(400),
            title: 'Subscribers',
        },
    ]
})

const scaleMax = computed(() => {
    return Math.max(...sparklines.value.flatMap(sparkline => Math.max(...sparkline.dataset.map(ds => ds.value))))
})

const selectedIndex = ref(null);

function hoverIndex(index) {
    selectedIndex.value = index;
}

const selectedPeriod = computed(() => {
    if([null, undefined].includes(selectedIndex.value)) return ''
    return sparklines.value[0].dataset[selectedIndex.value].period;
})

</script>

<template>
    <div class="flex flex-col text-white gap-2 w-[400px] mx-auto">
        <span class="tabular-nums text-gray-500">
            Monthly statistics: {{ selectedPeriod}}
        </span>
        <BaseLinkedSparklineUnit
            v-for="sparkline in sparklines"
            :dataset="sparkline.dataset"
            :color="sparkline.color"
            :gradient="sparkline.gradient"
            :lineColor="sparkline.lineColor"
            :title="sparkline.title"
            :selectedIndex="selectedIndex"
            :scaleMax="scaleMax"
            @hoverIndex="hoverIndex"
        />
    </div>
</template>