<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";
import VueUiSparkline from "vue-data-ui/vue-ui-sparkline";
import { createNumbers } from "../../maker/lib";
import { mergeConfigs } from "vue-data-ui/utils";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);
const selectedXIndex = ref(undefined);

const datasets = ref({
    A: createNumbers({ count: 31, seed: "alec", mult: 100, trend: "up" }).map(
        (n, i) => ({
            period: `Index ${i}`,
            value: n,
        }),
    ),
    B: createNumbers({ count: 31, seed: "npmx", mult: 100, trend: "up" }).map(
        (n, i) => ({
            period: `Index ${i}`,
            value: n,
        }),
    ),
});

const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    events: {
        datapointEnter: ({ seriesIndex }) => {
            selectedXIndex.value = seriesIndex;
        },
        datapointLeave: () => {
            selectedXIndex.value = undefined;
        },
    },
    style: {
        dataLabel: {
            fontSize: 52,
        },
        padding: {
            left: -100,
            right: 20,
        },
        zoom: {
            show: true,
        },
    },
}));

const configA = computed(() =>
    mergeConfigs({
        defaultConfig: config.value,
        userConfig: {
            style: {
                dataLabel: {
                    color: isDarkMode.value ? "#42d392" : undefined,
                },
                line: {
                    color: isDarkMode.value ? "#42d392" : undefined,
                },
                title: {
                    text: "Series A",
                    color: isDarkMode.value ? "#42d392" : undefined,
                },
            },
        },
    }),
);

const configB = computed(() =>
    mergeConfigs({
        defaultConfig: config.value,
        userConfig: {
            style: {
                dataLabel: {
                    color: isDarkMode.value ? "#ff8c00" : undefined,
                },
                line: {
                    color: isDarkMode.value ? "#ff8c00" : undefined,
                },
                title: {
                    text: "Series B",
                    color: isDarkMode.value ? "#ff8c00" : undefined,
                },
            },
        },
    }),
);

const zoomState = ref(null);
</script>

<template>
    <div
        class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A]"
    >
        <VueUiSparkline
            :dataset="datasets.A"
            :config="configA"
            v-model:zoom-state="zoomState"
            :selectedIndex="selectedXIndex"
        />
        <VueUiSparkline
            class="w-full"
            :dataset="datasets.B"
            :config="configB"
            v-model:zoom-state="zoomState"
            :selectedIndex="selectedXIndex"
        />
    </div>

    <!-- TODO: link -->
    <a href="/" target="_blank" class="underline text-app-blue mt-4">{{
        caseStore.code[store.lang]
    }}</a>
</template>
