<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

function makeDsUnit() {
    const rand = Math.random() * 100;
    const data = [
        {
            name: "New visitors",
            values: [Math.round(Math.random() * rand) || 1],
        },
        {
            name: "Redirected",
            values: [Math.round(Math.random() * rand) || 1],
        },
        {
            name: "Members",
            values: [Math.round(Math.random() * rand) || 1],
        },
    ];
    const total = data.map((d) => d.values[0]).reduce((a, b) => a + b, 0);
    return {
        data,
        total,
    };
}

function makeTime(i) {
    const value = i === 24 ? 0 : i;
    return value < 10 ? `0${value}:00` : `${value}:00`;
}

function makeDs(n) {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
        const unit = makeDsUnit();
        arr.push({
            ...unit,
            time: makeTime(i),
        });
    }
    return arr;
}

const waffles = computed(() => {
    const units = makeDs(24);
    return units.map((unit) => {
        return {
            ...unit,
            config: {
                userOptions: { show: false },
                style: {
                    chart: {
                        backgroundColor: "transparent",
                        layout: {
                            grid: {
                                size: Math.ceil(Math.sqrt(unit.total)) || 1,
                            },
                            rect: {
                                useGradient: false,
                            },
                        },
                        legend: {
                            show: false,
                        },
                        tooltip: {
                            backgroundColor: isDarkMode.value
                                ? "#1A1A1A"
                                : "#CCCCCC",
                            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                            backgroundOpacity: 70,
                        },
                    },
                },
            },
        };
    });
});
</script>

<template>
    <div class="text-center mt-12 text-2xl">Visitors per hour</div>
    <div class="w-full flex flex-row flex-wrap gap-1 justify-center px-6 my-12">
        <div
            class="w-[100px] sm:w-[200px] flex flex-col"
            v-for="(waffle, i) in waffles"
            :key="`waffle_${i}`"
        >
            <div class="flex flex-row gap-1">
                <span>{{ waffle.time }}</span>
                <span>•</span>
                <span>Total: {{ waffle.total }}</span>
            </div>
            <VueDataUi
                component="VueUiWaffle"
                :dataset="waffle.data"
                :config="waffle.config"
            />
        </div>
    </div>
</template>
