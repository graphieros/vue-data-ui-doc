<script setup>
import { ref, computed, watch } from "vue";
import SOURCE from "../../vue-data-ui-size-history.json";
import VueUiXy from "vue-data-ui/vue-ui-xy";
import { useMainStore } from "../stores";
import { useBytesFormatter } from "../../useNumberFormatter";
import { mergeConfigs } from "vue-data-ui/utils";
import VueUiLabel from "vue-data-ui/vue-ui-label";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const bytesFormatter = useBytesFormatter();

function filterStableVersions(versions) {
    return versions.filter(({ version }) => /^\d+\.\d+\.\d+$/.test(version));
}

const stableVersions = filterStableVersions(SOURCE.versions);

const zoomState = ref(null);

const temperatureColors = computed(() => ["#ff3700", "#ff8c00", "#42d392"]);

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
            selectedXIndex.value = seriesIndex;
        },
        datapointLeave: () => {
            selectedXIndex.value = undefined;
        },
    },
    line: {
        strokeWidth: 1.5,
    },
    chart: {
        userOptions: { show: false },
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
            preview: {
                enable: true,
            },
            autoFit: true,
            minimap: {
                show: true,
                frameColor: "transparent",
                selectedColor: isDarkMode.value ? undefined : "#CCCCCC",
            },
            dragToZoom: {
                show: true,
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
                            scaleMax: Math.max(
                                ...datasetPackageSize.value[0].series,
                            ),
                            formatter: ({ value }) =>
                                bytesFormatter.format(value ?? 0),
                        },
                    },
                },
            },
        },
    }),
);

const configFileCount = computed(() => {
    return mergeConfigs({
        defaultConfig: configBase.value,
        userConfig: {
            chart: {
                title: {
                    text: "File count",
                },
                grid: {
                    labels: {
                        yAxis: {
                            scaleMax: Math.max(
                                ...datasetFileCount.value[0].series,
                            ),
                        },
                    },
                },
            },
        },
    });
});

const labels = [
    {
        version: "v2.3.4",
        text: "Implemented tree-shaking",
        position: "top",
        maxWidth: 120,
        linkLen: 60,
        markerColor: "#42d392",
    },
    {
        version: "v3.14.0",
        text: "A mishap",
        position: "left",
        maxWidth: 120,
        linkLen: 30,
        markerColor: "#ff3700",
    },
    {
        version: "v3.20.1",
        text: "Other mishap trying to implement provenance",
        position: "top",
        maxWidth: 120,
        linkLen: 80,
        markerColor: "#ff3700",
    },
];

const showComments = ref(false);
const labelStep = ref(0);

watch(showComments, () => {
    labelStep.value += 1;
});

function getLabel(label, svg) {
    const plots = svg.data[0].plots;
    const index =
        versionNames.value.findIndex((v) => v === label.version) -
        svg.slicer.start;

    const thatPlot = plots[index];

    if (!thatPlot) return undefined;

    const textColor = isDarkMode.value ? "#CCCCCC" : "#1A1A1A";

    return {
        dataset: {
            x: plots[index].x,
            y: plots[index].y,
        },
        config: {
            box: {
                maxWidth: label.maxWidth,
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                borderColor: "#6A6A6A",
            },
            content: {
                text: label.text,
                color: textColor,
                fontSize: 14,
                lineHeight: 18,
            },
            drag: {
                iconColor: textColor,
            },
            link: {
                length: label.linkLen,
                stroke: "#6A6A6A",
                strokeDasharray: "1 3",
                targetPlot: {
                    stroke: label.markerColor,
                },
            },
            title: {
                text: label.version,
                color: textColor,
                bold: true,
                marker: {
                    color: label.markerColor,
                    size: 8,
                },
            },
            position: label.position,
        },
    };
}
</script>

<template>
    <div>
        <VueUiXy
            v-model:zoom-state="zoomState"
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
            v-model:zoom-state="zoomState"
            :dataset="datasetFileCount"
            :config="configFileCount"
            :selectedXIndex
            :key="`fc_${labelStep}`"
        >
            <template #reset-action="{ reset }">
                <button
                    class="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-[#fafafa] hover:bg-[#e1e5e8] dark:bg-[#3A3A3A] dark:hover:bg-[#4A4A4A] transition-colors"
                    @click="reset"
                >
                    RESET ZOOM
                </button>
            </template>

            <template #svg="{ svg }">
                <template v-if="showComments">
                    <VueUiLabel
                        v-for="label in labels"
                        :key="`file_count_label_${label.version}_${labelStep}`"
                        v-bind="getLabel(label, svg)"
                    />
                </template>
            </template>
        </VueUiXy>
        <label class="flex flex-row gap-2 justify-center items-center mt-4">
            <span>Show comments</span>
            <input type="checkbox" v-model="showComments" />
        </label>
    </div>
</template>

<style scoped>
:deep(.atom-title) {
    padding-top: 3px;
}
</style>
