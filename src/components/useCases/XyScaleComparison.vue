<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../../stores";
import { xyScales } from "../../translations/xyScales.js";
import UseCaseTitle from "./UseCaseTitle.vue";
import CodeParser from "../customization/CodeParser.vue";

const store = useMainStore();
const text = computed(() => xyScales[store.lang] || xyScales.en);
const scale = ref("linear");
const scales = ["linear", "log", "symlog"];
const values = [
    -10000, -3000, -1000, -100, -10, -1, -0.1, -0.01, 0, 0.01, 0.1, 1, 10, 100,
    1000, 3000, 10000,
];
const dataset = [{ name: "A", type: "line", series: values }];
const numberFormat = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 3,
});

const formatter = ({ value }) => numberFormat.format(value);

const config = computed(() => ({
    theme: store.isDarkMode ? "dark" : "",
    chart: {
        backgroundColor: store.isDarkMode ? "#2A2A2A" : "#FFFFFF",
        title: { text: text.value.title, subtitle: { text: scale.value } },
        grid: {
            labels: {
                yAxis: {
                    scale: scale.value,
                    symlogConstant: 1,
                    rounding: 3,
                    formatter,
                },
                xAxisLabels: { values: values.map((_, i) => String(i + 1)) },
            },
        },
        tooltip: { roundingValue: 3, showPercentage: false },
        zoom: { show: true, minimap: { show: true } },
    },
    line: { labels: { show: true, rounding: 3, formatter } },
}));

const code = computed(
    () => `const config = ref({
    chart: {
        grid: {
            labels: {
                yAxis: {
                    scale: "${scale.value}",${scale.value === "symlog" ? "\n                    symlogConstant: 1," : ""}
                },
            },
        },
    },
})`,
);
</script>

<template>
    <section class="mb-12">
        <UseCaseTitle>
            <template #title>{{ text.title }}</template>
            <template #description>{{ text.description }}</template>
        </UseCaseTitle>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <button
                v-for="option in scales"
                :key="option"
                type="button"
                :aria-pressed="scale === option"
                class="flex flex-col rounded-lg border text-start transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-blue"
                :class="
                    scale === option
                        ? 'border-app-blue bg-app-blue-light dark:bg-[#5f8aee20]'
                        : 'border-gray-300 dark:border-gray-600'
                "
                @click="scale = option"
            >
                <span class="block w-full shadow-md px-4 py-3 font-mono">{{
                    option
                }}</span>
                <span class="p-4 text-sm">{{ text[option] }}</span>
            </button>
        </div>
        <div dir="ltr" style="height: inherit">
            <VueUiXy
                :key="`${scale}_${store.isDarkMode}`"
                :dataset="dataset"
                :config="config"
            />
        </div>
        <CodeParser
            :content="code"
            language="javascript"
            @copy="store.copy()"
        />
    </section>
</template>
