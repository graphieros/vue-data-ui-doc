<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../../stores";
import { useCaseStore } from "../../../stores/cases";
import VueUiCandlestick from "vue-data-ui/vue-ui-candlestick";

const store = useMainStore();
const caseStore = useCaseStore();
const isDarkMode = computed(() => store.isDarkMode);
const selectedXIndex = ref(undefined);

function generateRandomCandlestickData({
    count = 12,
    startDate = Date.UTC(2026, 0, 1), // starting date
    interval = 30 * 24 * 60 * 60 * 1000, // 1 month in ms
    startPrice = 100,
    volatility = 0.2, // 20% volatility
} = {}) {
    const data = [];
    let lastClose = startPrice;

    for (let i = 0; i < count; i++) {
        const timestamp = startDate + i * interval;
        const changePercent = (Math.random() - 0.5) * volatility;
        const open = lastClose;
        const close = open * (1 + changePercent);
        const high = Math.max(open, close) * (1 + Math.random() * volatility);
        const low = Math.min(open, close) * (1 - Math.random() * volatility);
        const volume = Math.round(1000 + Math.random() * 9000);

        data.push([
            timestamp,
            Math.round(open),
            Math.round(high),
            Math.round(low),
            Math.round(close),
            volume,
        ]);

        lastClose = close;
    }
    return data;
}

const datasets = ref({
    A: generateRandomCandlestickData({ count: 60 }),
    B: generateRandomCandlestickData({ count: 60 }),
});

const config = computed(() => ({
    theme: isDarkMode.value ? "dark" : "",
    type: "ohlc",
    userOptions: { show: false },
    events: {
        datapointEnter: ({ seriesIndex }) => {
            selectedXIndex.value = seriesIndex;
        },
        datapointLeave: () => {
            selectedXIndex.value = undefined;
        },
    },
    style: {
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
        layout: {
            grid: {
                horizontalLines: { show: true },
                xAxis: {
                    dataLabels: {
                        showOnlyAtModulo: true,
                        rotation: -45,
                        autoRotate: {
                            enable: false,
                        },
                        datetimeFormatter: {
                            enable: true,
                            locale: "en",
                            useUTC: false,
                            januaryAsYear: false,
                            options: {
                                year: "yyyy",
                                month: `MMM 'yy`,
                                day: "dd MMM",
                                hour: "HH:mm",
                                minute: "HH:mm:ss",
                                second: "HH:mm:ss",
                            },
                        },
                    },
                },
                yAxis: {
                    position: "right",
                },
            },
            padding: {
                top: 42,
                right: 12,
                left: 36,
            },
        },
        tooltip: {
            backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
            backgroundOpacity: 0,
        },
        zoom: {
            autoFit: true,
            minimap: {
                show: true,
                additionalHeight: -12,
                frameColor: "transparent",
            },
            dragToZoom: {
                show: true,
            },
        },
    },
}));

const zoomState = ref(null);
</script>

<template>
    <div
        class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded-lg"
    >
        <VueUiCandlestick
            :dataset="datasets.A"
            :config
            :selectedXIndex="selectedXIndex"
            v-model:zoomState="zoomState"
        />
        <VueUiCandlestick
            :dataset="datasets.B"
            :config
            :selectedXIndex="selectedXIndex"
            v-model:zoomState="zoomState"
        />
    </div>
    <!-- TODO: link -->
    <a href="/" target="_blank" class="underline text-app-blue mt-4">{{
        caseStore.code[store.lang]
    }}</a>
</template>
