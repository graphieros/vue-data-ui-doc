<script setup>
import { ref, computed } from "vue";
import SOURCE from "../../vue-data-ui-size-history.json";
import VueUiXy from "vue-data-ui/vue-ui-xy";
import { useMainStore } from "../stores";
import { useBytesFormatter } from "../../useNumberFormatter";
import { mergeConfigs } from "vue-data-ui/utils";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const bytesFormatter = useBytesFormatter();

function filterStableVersions(versions) {
    return versions.filter(({ version }) => /^\d+\.\d+\.\d+$/.test(version));
}

function useNumberFormatter(options = {}) {
    const { locale } = useI18n();

    return computed(() => new Intl.NumberFormat(locale.value, options));
}

const stableVersions = filterStableVersions(SOURCE.versions);

const temperatureColors = computed(() => ["#ff3700", "#42d392"]);

const datasetPackageSize = computed(() => [
    {
        name: "Package size",
        type: "line",
        series: stableVersions.map((v) => v.totalBytes),
        useStepper: true,
        temperatureColors: temperatureColors.value,
        color: isDarkMode.value ? "#CCCCCC" : "#2A2A2A",
    },
]);

const datasetFileCount = computed(() => [
    {
        name: "File count",
        type: "line",
        series: stableVersions.map((v) => v.fileCount),
        useStepper: true,
        temperatureColors: temperatureColors.value,
        color: isDarkMode.value ? "#CCCCCC" : "#2A2A2A",
    },
]);

const versionNames = computed(() => stableVersions.map((v) => `v${v.version}`));

const XAXIS_LABELS_MOD_THRESHOLD = 12;

const selectedXIndex = ref(undefined);

const configBase = computed(() => ({
    downsample: {
        threshold: stableVersions.length + 1,
    },
    theme: isDarkMode.value ? "dark" : "",
    events: {
        datapointEnter: ({ seriesIndex }) => {
            console.log(seriesIndex);
            selectedXIndex.value = seriesIndex;
        },
        datapointLeave: () => {
            selectedXIndex.value = undefined;
        },
    },
    chart: {
        // userOptions: {
        //     position: "left",
        // },
        backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
        height: 300,
        padding: {
            left: 80,
            right: 24,
        },
        grid: {
            position: "start",
            showHorizontalLines: true,
            labels: {
                axis: {
                    xLabel: "Stable versions",
                    yLabelOffsetX: 12,
                },
                xAxisLabels: {
                    values: versionNames.value,
                    showOnlyAtModulo: true,
                    modulo: Math.max(
                        1,
                        Math.round(
                            versionNames.value.length /
                                XAXIS_LABELS_MOD_THRESHOLD,
                        ),
                    ),
                },
                yAxis: {
                    position: "right",
                    useNiceScale: true,
                    scaleValueOffsetX: 0,
                },
            },
        },
        highlighter: {
            useLine: true,
            crosshairs: {
                show: true,
            },
        },
        legend: { show: false },
        title: {
            textAlign: "left",
            paddingLeft: 38,
        },
        tooltip: { show: false },
        zoom: {
            autoFit: true,
            minimap: {
                show: true,
                frameColor: "transparent",
                selectedColor: isDarkMode.value ? undefined : "#CCCCCC",
            },
        },
    },
}));

const configPackageSize = computed(() =>
    mergeConfigs({
        defaultConfig: configBase.value,
        userConfig: {
            chart: {
                title: {
                    text: "Package size",
                },
                grid: {
                    labels: {
                        yAxis: {
                            formatter: ({ value }) =>
                                bytesFormatter.format(value ?? 0),
                        },
                    },
                },
            },
        },
    }),
);

const configFileCount = computed(() =>
    mergeConfigs({
        defaultConfig: configBase.value,
        userConfig: {
            chart: {
                title: {
                    text: "File count",
                },
            },
        },
    }),
);
</script>

<template>
    <div>
        <VueUiXy
            :dataset="datasetPackageSize"
            :config="configPackageSize"
            :selectedXIndex
        >
            <template #reset-action="{ reset }">
                <button
                    class="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-[#fafafa] hover:bg-[#e1e5e8] dark:bg-[#3A3A3A] dark:hover:bg-[#4A4A4A] transition-colors"
                    @click="reset"
                >
                    RESET ZOOM
                </button>
            </template>
        </VueUiXy>
        <VueUiXy
            :dataset="datasetFileCount"
            :config="configFileCount"
            :selectedXIndex
        >
            <template #reset-action="{ reset }">
                <button
                    class="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-[#fafafa] hover:bg-[#e1e5e8] dark:bg-[#3A3A3A] dark:hover:bg-[#4A4A4A] transition-colors"
                    @click="reset"
                >
                    RESET ZOOM
                </button>
            </template>
        </VueUiXy>
    </div>
</template>

<style scoped>
:deep(.atom-title) {
    padding-top: 3px;
}
</style>
