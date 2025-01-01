<script setup>
import { ref, computed } from "vue";
import BaseLinkedSparklineUnit from "./BaseLinkedSparklineUnit.vue";
import LinkedSparklineWaffle from "./LinkedSparklineWaffle.vue";
import LinkedSparklineDonut from "./LinkedSparklineDonut.vue";

const props = defineProps({
    waffle: {
        type: Boolean,
        default: false
    },
    donut: {
        type: Boolean,
        default: false
    }
})

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

const lastIndex = ref(sparklines.value[0].dataset.length - 1);

const selectedIndex = ref(lastIndex.value);

function hoverIndex(index) {
    if ([null, undefined].includes(index)) {
        selectedIndex.value = lastIndex.value
    } else {
        selectedIndex.value = index;
    }
}

const selectedPeriod = computed(() => {
    if([null, undefined].includes(selectedIndex.value)) return ''
    return sparklines.value[0].dataset[selectedIndex.value].period;
});

const waffleDataset = computed(() => {
    if ([null, undefined].includes(selectedIndex.value)) return [];
    return sparklines.value.map(sparkline => {
        return {
            name: sparkline.title,
            values: [sparkline.dataset[selectedIndex.value].value],
            color: sparkline.color
        }
    })
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
            <div class="w-full rounded overflow-hidden">
                <LinkedSparklineWaffle
                    v-if="waffle"
                    :dataset="waffleDataset"
                    :active="![null, undefined].includes(selectedIndex)"
                />
                <LinkedSparklineDonut
                    v-if="donut"
                    :dataset="waffleDataset"
                    :active="![null, undefined].includes(selectedIndex)"
                />
            </div>
    </div>
</template>