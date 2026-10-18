<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import { ref, computed, watch, nextTick, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import BaseDropdown from "../BaseDropdown.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            type: type.value,
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                color: "#CCCCCC",
                maxHeight: 500,
                animated: true,
                flow: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                parallelCoordinatePlot: {
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                },
                sparkline: {
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                    strokeWidth: 0.7,
                },
                line: {
                    axis: {
                        show: true,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    path: {
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 1,
                        showPlots: true,
                    },
                },
                donutEvolution: {
                    axis: {
                        show: true,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    donuts: {
                        strokeWidth: 0.5,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                    },
                },
                bar: {
                    axis: {
                        show: true,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    borderRadius: 0.5,
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                    barWidth: 9,
                },
                chestnut: { color: isDarkMode.value ? "#5C5C5C" : "#C4C4C4" },
                donut: {
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                    strokeWidth: 64,
                },
                onion: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                gauge: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                quadrant: {
                    grid: {
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    plots: {
                        radius: 1.5,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                    },
                },
                radar: {
                    grid: {
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    shapes: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                },
                waffle: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                table: {
                    th: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                    td: {
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                },
                rating: {
                    useSmiley: false,
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                    filled: true,
                    strokeWidth: 1,
                    maxWidth: 200,
                },
                verticalBar: {
                    axis: {
                        show: true,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    borderRadius: 0.5,
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                },
                heatmap: {
                    cellsX: 26,
                    cellsY: 7,
                    color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                },
                candlesticks: {
                    axis: {
                        show: true,
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 0.5,
                    },
                    candle: {
                        color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4",
                        strokeWidth: 1,
                    },
                },
                pyramid: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                wheel: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
                rings: { color: isDarkMode.value ? "#5c5c5c" : "#C4C4C4" },
            },
        }),
    set: configState.set,
});

const type = ref("line");

const options = ref(
    [
        "bar",
        "bar3d",
        "bullet",
        "candlesticks",
        "chestnut",
        "donut",
        "donutEvolution",
        "flow",
        "gauge",
        "heatmap",
        "line",
        "molecule",
        "onion",
        "parallelCoordinatePlot",
        "pyramid",
        "quadrant",
        "radar",
        "rating",
        "relationCircle",
        "rings",
        "sparkHistogram",
        "sparkStackbar",
        "sparkbar",
        "sparkline",
        "table",
        "thermometer",
        "tiremarks",
        "verticalBar",
        "waffle",
        "wheel",
        "ridgeline",
        "chord",
    ].map((el) => {
        return {
            value: el,
            text: el,
        };
    }),
);

function resetDefault() {
    configState.reset();

    forceChartUpdate();
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}
</script>

<template>
    <div>
        <BaseDocTitle name="VueUiSkeleton" />

        <BaseDocDescription
            :text="translations.docs.comments.skeleton.p1[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-skeleton"
            :configSource="mainConfig.vue_ui_skeleton"
        />

        <div class="flex flex-row justify-center w-full">
            <div>
                <DocSnapper
                    :isFixed="isFixed"
                    :disabled="!isFixed || isMobile"
                    @fixChart="fixChart"
                    @resetDefault="resetDefault"
                    @copyToClipboard="copyToClipboard(config)"
                    @change="forceChartUpdate"
                >
                    <BaseCard>
                        <div
                            class="flex flex-col gap-1 justify-center place-items-center mt-6 mb-6"
                        >
                            <label for="skeletons" class="text-xs text-left"
                                >Select skeleton type:</label
                            >
                            <BaseDropdown
                                :options="options"
                                option-target="value"
                                additional-option-target="text"
                                v-model:value="type"
                                :width="255"
                                id="skeletons"
                            >
                                <template #selected="{ selectedOption }">
                                    {{ selectedOption.text }}
                                </template>
                                <template #option="{ option }">
                                    {{ option.text }}
                                </template>
                            </BaseDropdown>
                        </div>
                        <VueUiSkeleton
                            :config="{ ...config, type: type }"
                            :key="key"
                        />
                        <div
                            v-if="[type].includes('rating')"
                            class="mt-4 mx-auto flex flex-row place-items-center justify-center gap-2"
                        >
                            <input
                                id="useSmiley"
                                v-if="isDarkMode"
                                type="checkbox"
                                class="accent-app-blue"
                                v-model="config.style.rating.useSmiley"
                            /><input
                                id="useSmiley"
                                v-else
                                type="checkbox"
                                class="accent-app-blue"
                                v-model="config.style.rating.useSmiley"
                                @change="forceChartUpdate()"
                            />
                            <label for="useSmiley">
                                {{
                                    translations.docs.comments.skeleton.smiley[
                                        store.lang
                                    ]
                                }}
                            </label>
                        </div>
                    </BaseCard>
                </DocSnapper>
            </div>
        </div>

        <Box :activeTab="1">
            <template v-slot:tab0>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template v-slot:tab1>
                <BaseCopyConfig :config="config" @reset="resetDefault" />

                <div class="mt-4">
                    TS type:
                    <code class="text-app-blue">VueUiSkeletonConfig</code>
                </div>
                <pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiSkeletonConfig</span> = {
  type: "{{ type }}",
  style: {
    backgroundColor: <input  type="color" v-model="config.style.backgroundColor">, (default: "#FFFFFF")
    maxHeight: 500,
    animated: <input  type="checkbox" class="accent-app-blue" v-model="config.style.animated" @hange="forceChartUpdate()">, (default: true)
    line: {
      axis: {
        show: <input  type="checkbox" class="accent-app-blue" v-model="config.style.line.axis.show">, (default: true)
        color: <input  type="color" v-model="config.style.line.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.line.axis.strokeWidth">, (default: 0.5)
      },
      path: {
        color: <input  type="color" v-model="config.style.line.path.color">, (default: "#e1e5e8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.line.path.strokeWidth">, (default: 1)
        showPlots: <input  type="checkbox" class="accent-app-blue" v-model="config.style.line.path.showPlots">, (default: true)
      }
    },
    donutEvolution: {
      axis: {
        show: <input  type="checkbox" class="accent-app-blue" v-model="config.style.donutEvolution.axis.show">, (default: true)
        color: <input  type="color" v-model="config.style.donutEvolution.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.donutEvolution.axis.strokeWidth">, (default: 0.5)
      },
      donuts: {
        color: <input  type="color" v-model="config.style.donutEvolution.donuts.color">, (default: "#e1e5e8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.donutEvolution.donuts.strokeWidth">, (default: 0.5)
      }
    },
    bar: {
      axis: {
        show: <input  type="checkbox" class="accent-app-blue" v-model="config.style.bar.axis.show">, (default: true)
        color: <input  type="color" v-model="config.style.bar.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.bar.axis.strokeWidth">, (default: 0.5)
      },
      borderRadius: <input  type="number" min="0" max="5" step="0.1" v-model="config.style.bar.borderRadius">, (default: 0.5)
      color: <input  type="color" v-model="config.style.bar.color">, (default: "#e1e5e8")
      barWidth: <input  type="number" min="1" max="11" step="0.1" v-model="config.style.bar.barWidth">, (default: 9)
    },
    chestnut: {
      color: <input  type="color" v-model="config.style.chestnut.color">, (default: "#e1e5e8")
    },
    donut: {
      color: <input  type="color" v-model="config.style.donut.color">, (default: "#e1e5e8")
      strokeWidth: <input  type="number" min="10" max="200" v-model="config.style.donut.strokeWidth">, (default: 64)
    },
    onion: {
      color: <input  type="color" v-model="config.style.onion.color">, (default: "#E1E5E8")
    },
    gauge: {
      color: <input  type="color" v-model="config.style.gauge.color">, (default: "#E1E5E8")
    },
    quadrant: {
      grid: {
        color: <input  type="color" v-model="config.style.quadrant.grid.color">, (default: "#E1E5E8")
        strokeWidth: <input  type="number" min="0" max="20" step="0.1" v-model="config.style.quadrant.grid.strokeWidth">, (default: 0.5)
      },
      plots: {
        radius: <input  type="number" min="0" max="20" step="0.1" v-model="config.style.quadrant.plots.radius">, (default: 1.5)
        color: <input  type="color" v-model="config.style.quadrant.plots.color">, (default: "#E1E5E8")
      }
    },
    radar: {
      grid: {
        color: <input  type="color" v-model="config.style.radar.grid.color">, (default: "#E1E5E8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.radar.grid.strokeWidth">, (default: 0.5)
      },
      shapes: {
        color: <input  type="color" v-model="config.style.radar.shapes.color">, (default: "#E1E5E8")
      }
    },
    waffle: {
      color: <input  type="color" v-model="config.style.waffle.color">, (default: "#E1E5E8")
    },
    table: {
      th: {
        color: <input  type="color" v-model="config.style.table.th.color">, (default: "#E1E5E8")
      },
      td: {
        color: <input  type="color" v-model="config.style.table.td.color">, (default: "#E1E5E8"),
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.table.td.strokeWidth">, (default: 0.5)
      }
    },
    rating: {
      useSmiley: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="config.style.rating.useSmiley"><input v-else type="checkbox" class="accent-app-blue" v-model="config.style.rating.useSmiley" @change="forceChartUpdate()">, (default: false)
      color: <input  type="color" v-model="config.style.rating.color">, (default: "#E1E5E8")
      filled: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="config.style.rating.filled" @hange="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="config.style.rating.filled">, (default: true)
      strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.rating.strokeWidth">, (default: 1)
      maxWidth: <input  type="number" min="100" v-model="config.style.rating.maxWidth">, (default: 200)
    },
    sparkline: {
      color: <input  type="color" v-model="config.style.sparkline.color">, (default: "#E1E5E8")
      strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="config.style.sparkline.strokeWidth"><input v-else type="number" min="0" max="5" step="0.1" v-model="config.style.sparkline.strokeWidth">, (default: 0.7)
    },
    verticalBar: {
      axis: {
        show: <input  type="checkbox" class="accent-app-blue" v-model="config.style.verticalBar.axis.show">, (default: true)
        color: <input  type="color" v-model="config.style.verticalBar.axis.color">, (default: "#e1e5e8")
        strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.verticalBar.axis.strokeWidth">, (default: 0.5)
      },
      borderRadius: <input  type="number" min="0" max="5" step="0.1" v-model="config.style.verticalBar.borderRadius">, (default: 0.5)
      color: <input  type="color" v-model="config.style.verticalBar.color">, (default: "#e1e5e8")
    },
    heatmap: {
      cellsX: 26,
      cellsY: 7,
      color: <input  type="color" v-model="config.style.heatmap.color">, (default: "#e1e5e8")
    },
    candlesticks: {
        axis: {
            show: <input  type="checkbox" class="accent-app-blue" v-model="config.style.candlesticks.axis.show">, (default: true)
            color: <input  type="color" v-model="config.style.candlesticks.axis.color">, (default: "#e1e5e8")
            strokeWidth: <input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="config.style.candlesticks.axis.strokeWidth"><input v-if="isDarkMode" type="number" min="0" max="10" step="0.1" v-model="config.style.candlesticks.axis.strokeWidth">, (default: 0.5)
        },
        candle: {
            color: <input  type="color" v-model="config.style.candlesticks.candle.color">, (default: "#e1e5e8")
            strokeWidth: <input  type="number" min="0" max="10" step="0.1" v-model="config.style.candlesticks.candle.strokeWidth">, (default: 0.5)
        }
    },
    pyramid: {
      color: <input  type="color" v-model="config.style.pyramid.color">, (default: "#e1e5e8")
    }
    rings: {
      color: <input  type="color" v-model="config.style.rings.color">, (default: "#e1e5e8")
    }
    wheel: {
      color: <input  type="color" v-model="config.style.wheel.color">, (default: "#e1e5e8")
    },
    flow: {
      color: <input  type="color" v-model="config.style.flow.color">, (default: "#e1e5e8")
    },
    parallelCoordinatePlot: {
      color: <input  type="color" v-model="config.style.parallelCoordinatePlot.color">, (default: "#e1e5e8")
    }
  }
}
</code>
</pre>
            </template>
        </Box>
    </div>
</template>
