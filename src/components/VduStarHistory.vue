<script setup>
import { ref, computed, useTemplateRef, nextTick } from "vue";
import { useMainStore } from "../stores";
import { ZoomCancelIcon, ZoomCheckIcon } from "vue-tabler-icons";
import { useAppEnv } from "../useAppEnv";
import Shape from "./Shape.vue";


const { isProd } = useAppEnv()
const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const source = computed(() => {
  return isProd ? store.starHistory : [
    {
        snapshot_date: "2023-07-24",
        stars: 0,
        fetched_at: "2023-07-24 07:59:14",
    },
    {
        snapshot_date: "2023-08-11",
        stars: 1,
        fetched_at: "2023-08-11 07:59:14",
    },
    {
        snapshot_date: "2024-03-22",
        stars: 100,
        fetched_at: "2024-03-22 07:59:14",
    },
    {
        snapshot_date: "2024-09-23",
        stars: 400,
        fetched_at: "2024-09-23 07:59:14",
    },
    {
        snapshot_date: "2024-10-01",
        stars: 700,
        fetched_at: "2024-10-01 07:59:14",
    },
    {
        snapshot_date: "2024-10-28",
        stars: 900,
        fetched_at: "2024-10-28 07:59:14",
    },
    {
        snapshot_date: "2025-01-01",
        stars: 1200,
        fetched_at: "2025-01-01 07:59:14",
    },
    {
        snapshot_date: "2025-05-21",
        stars: 1400,
        fetched_at: "2025-05-21 07:59:14",
    },
    {
        snapshot_date: "2025-06-03",
        stars: 1700,
        fetched_at: "2025-06-03 07:59:14",
    },
    {
        snapshot_date: "2025-09-19",
        stars: 1900,
        fetched_at: "2025-09-19 07:59:14",
    },
    {
        snapshot_date: "2026-03-03",
        stars: 2200,
        fetched_at: "2026-03-03 07:59:14",
    },
    {
        snapshot_date: "2026-07-07",
        stars: 2421,
        fetched_at: "2026-07-07 07:59:14",
    },
]
})

const lastStar = computed(() => store.stars);

const sourceWithLastStar = computed(() => {
    const sortedSource = [...source.value].sort((a, b) => {
        return dateToTimestamp(a.snapshot_date) - dateToTimestamp(b.snapshot_date);
    });

    if (!sortedSource.length) {
        return [];
    }

    const lastIndex = sortedSource.length - 1;

    return sortedSource.map((item, index) => {
        return {
            snapshot_date: item.snapshot_date,
            stars: index === lastIndex ? lastStar.value : item.stars,
        };
    });
});

const DAY_MS = 24 * 60 * 60 * 1000;

function dateToTimestamp(date) {
    return new Date(`${date}T00:00:00Z`).getTime();
}

function timestampToDate(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 10);
}

const normalizedSource = computed(() => {
    return sourceWithLastStar.value.flatMap((current, index) => {
        const next = sourceWithLastStar.value[index + 1];

        if (!next) {
            return [
                {
                    snapshot_date: current.snapshot_date,
                    stars: current.stars,
                },
            ];
        }

        const currentTimestamp = dateToTimestamp(current.snapshot_date);
        const nextTimestamp = dateToTimestamp(next.snapshot_date);
        const daysBetween = Math.round((nextTimestamp - currentTimestamp) / DAY_MS);

        return Array.from({ length: daysBetween }, (_, dayIndex) => {
            const ratio = dayIndex / daysBetween;
            const stars = current.stars + (next.stars - current.stars) * ratio;

            return {
                snapshot_date: timestampToDate(currentTimestamp + dayIndex * DAY_MS),
                stars: Math.round(stars),
            };
        });
    });
});

const dataset = computed(() => {
    return [
        {
            name: "vue-data-ui",
            series: normalizedSource.value.map(({ stars }) => stars),
            type: "line",
            shape: 'star',
            smooth: true,
            temperatureColors: isDarkMode.value ? ["#fdd663", "#42d392"] : ["#42d392", "#5f8aee"],
            color: isDarkMode.value ? "#fdd663" : "#42d392",
            useArea: true
        },
    ];
});

const isZoom = ref(false);

function toggleZoom() {
  isZoom.value = !isZoom.value;
}

const chart = useTemplateRef('chart')

const scaleMin = ref(0);

const to = ref(null);

async function zoomEnd() {
  to.value = setTimeout(() => {
    const d = chart.value.getData()
    const min = Math.min(...d[0].values)
    if (!d) return
    scaleMin.value = Math.min(...d[0].values)
  }, 10)
}

function zoomReset() {
  scaleMin.value = 0;
}

const dates = computed(() => normalizedSource.value.map(s => s.snapshot_date))

const config = computed(() => ({
  theme: isDarkMode.value ? 'dark' : '',
  downsample: {
    threshold: 20000,
  },
  chart:{
    backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
    userOptions: { show: false },
    padding: {
      right: 105
    },
    grid: {
      showHorizontalLines: true,
      labels: {
        axis: {
          yLabel: 'Stars',
          fontSize: 24,
        },
        yAxis: {
          useNiceScale: true,
          scaleMin: scaleMin.value,
          commonScaleSteps: 6
        },
        xAxisLabels: {
          values: dates.value,
          showOnlyAtModulo: 12,
          rotation: -30,
          autoRotate: {
            enable: false,
          },
          datetimeFormatter: {
            enable: true,
            options: {
              year: 'yyyy-MM-dd',
              month: 'yyyy-MM-dd',
              day: 'yyyy-MM-dd',
              hour: 'yyyy-MM-dd',
              minute: 'yyyy-MM-dd',
            }
          }
        }
      }
    },
    highlighter: {
      opacity: 0,
      useLine: true,
      lineDasharray: 0,
      crosshairs: {
        show: true,
        stroke: isDarkMode.value ? '#666666' : '#4A4A4A',
        strokeDasharray: 6,
        dot: {
          radius: 4
        }
      }
    },
    legend: { show: false },
    title: {
      text: 'vue-data-ui',
      subtitle: {
        text: 'Github stars history'
      }
    },
    tooltip: {show: false },
    zoom: { 
      show: isZoom.value,
      keepState: true,
      maxWidth: 720,
      highlightColor: isDarkMode.value ? '#2A2A2A' : '#E1E5E8',
      minimap: {
        show: true,
        frameColor: 'transparent',
        indicatorColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        selectedColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        selectedColorOpacity: 0.06
      },
      preview: {
        fill: isDarkMode.value ? '#CCCCCC10' : '#1A1A1A10'
      }
    },
  },
  line: {
    radius: 4,
  }
}));

function createStar({ plot, radius, apexes = 5 }) {
    const centerX = plot.x;
    const centerY = plot.y;
    const innerCirclePoints = apexes;
    const innerRadius = (radius * 3.5) / innerCirclePoints;
    const innerOuterRadiusRatio = 2;
    const outerRadius = innerRadius * innerOuterRadiusRatio;
    return calcStarPoints({
        centerX,
        centerY,
        innerCirclePoints,
        innerRadius,
        outerRadius,
    });
}

function calcStarPoints({
    centerX,
    centerY,
    innerCirclePoints,
    innerRadius,
    outerRadius,
}) {
    const angle = Math.PI / innerCirclePoints;
    const angleOffsetToCenterStar = 60;
    const totalPoints = innerCirclePoints * 2;
    let points = "";
    for (let i = 0; i < totalPoints; i += 1) {
        let isEvenIndex = i % 2 == 0;
        let r = isEvenIndex ? outerRadius : innerRadius;
        let currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
        let currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
        points += `${currX},${currY} `;
    }
    return points;
}

function drawLastLabel(svg) {
  const data = Array.isArray(svg?.data) ? svg.data : []
  if (!data.length) return ''

  const dataLabels = []

  for (const serie of data) {
    const lastPlot = serie.plots.at(-1)

    dataLabels.push(`
      <text
        text-anchor="start"
        dominant-baseline="middle"
        x="${lastPlot.x + 24}"
        y="${lastPlot.y}"
        font-size="24"
        fill="${isDarkMode.value ? '#fdd663' : '#1A1A1A'}"
        stroke="${isDarkMode.value ? '#1A1A1A' : '#FFFFFF'}"
        stroke-width="1"
        paint-order="stroke fill"
      >
        ${lastPlot.value}
      </text>
      <polygon 
        points="${createStar({plot: {x: lastPlot.x, y: lastPlot.y}, radius: 8 })}"
        fill="${isDarkMode.value ? '#fdd663' : '#42d392'}"
        stroke="${isDarkMode.value ? '#1A1A1A' : '#FFFFFF'}"
        stroke-width="2"
      />
    `)
  }

  return dataLabels.join('\n')
}

const landmarks = [
  {
    date: '2024-09-22',
    name: 'tweet',
    description: '@posva tweets about vue-data-ui',
  },
  {
    date: '2025-05-22',
    name: 'blog',
    description: 'popular blog article on XMSUMI',
  },
]

const keyDates = computed(() => {
  const dateList = dates.value ?? []
  const lastDate = dateList.at(-1)
  if (!lastDate) {
    return []
  }

  const millisecondsInADay = 1 * 24 * 60 * 60 * 1000
  const lastDateTime = new Date(lastDate).getTime()

  return landmarks
    .map((item) => {
      const index = dateList.indexOf(item.date)
      if (index === -1) {
        return null
      }
      const landmarkDateTime = new Date(item.date).getTime()

      return {
        ...item,
        index,
        visible: lastDateTime - landmarkDateTime >= millisecondsInADay,
      }
    })
    .filter(Boolean)
})

const showLandmarks = ref(false);
function toggleLandmarks() {
  showLandmarks.value = !showLandmarks.value;
}

</script>

<template>
    <div :class="`p-4 bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-md mb-4 relative ${isDarkMode ? 'dark-mode' : 'light-mode'}`">
      <div class="absolute top-2 right-2 z-10 flex flex-row">
        <button 
          @click="toggleZoom" 
          class="bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#3A3A3A] dark:text-[#8A8A8A] p-2 hover:bg-[#E1E5E8] dark:hover:bg-[#2A2A2A] transition-colors rounded w-10 flex align-center items-center justify-center">
          <ZoomCheckIcon v-if="isZoom"/>
          <ZoomCancelIcon v-else/>
        </button>
        <button 
          @click="toggleLandmarks" 
          class="bg-[#FFFFFF] dark:bg-[#1A1A1A] text-[#3A3A3A] dark:text-[#8A8A8A] p-2 hover:bg-[#E1E5E8] dark:hover:bg-[#2A2A2A] transition-colors rounded w-10 flex align-center items-center justify-center">
          <VueUiIcon name="tooltip" v-if="showLandmarks" :stroke="isDarkMode ? '#8A8A8A' : '#3A3A3A'" :size="18"/>
          <VueUiIcon v-else name="tooltipDisabled" :stroke="isDarkMode ? '#8A8A8A' : '#3A3A3A'" :size="18"/>
        </button>
      </div>

      <VueUiXy :dataset :config @zoomEnd="zoomEnd" @zoomReset="zoomReset" ref="chart">
        <template #svg="{ svg }">
          <g>
            <polygon
              :points="createStar({ plot: { x: svg.drawingArea.left + svg.drawingArea.width / 2, y: svg.drawingArea.top + svg.drawingArea.height / 2 }, radius: svg.drawingArea.height / 3 })"
              fill="#66666610"
            />
            <g v-html="drawLastLabel(svg)"/>
          </g>

                <g
                v-for="(plot, i) in svg?.data?.[0]?.plots"
                :key="`plot_${i}`"
                style="pointer-events: none"
              >
                <template
                  v-for="(landmark, j) in keyDates"
                  :key="`${landmark?.date}-${landmark?.name}-${j}`"
                >
                  <g
                    v-if="
                      landmark &&
                      landmark.index === i + svg.slicer.start
                      && showLandmarks
                    "
                  >
                    <line
                      :x1="plot.x"
                      :x2="plot.x"
                      :y1="svg.drawingArea.top"
                      :y2="svg.drawingArea.bottom"
                      :stroke="isDarkMode ? '#CCCCCC40' : '#2A2A2A40'"
                      :stroke-width="2"
                      stroke-dasharray="2 4"
                    />
                    <Shape
                    
                    />
                    <circle
                      :cx="plot.x"
                      :cy="plot.y"
                      :r="4"
                      :fill="isDarkMode ? '#fdd663' : '#42d392'"
                      :stroke="isDarkMode ? '#1A1A1A' : '#FFFFFF'"
                    />
                    <circle
                      :cx="plot.x"
                      :cy="plot.y"
                      :r="18"
                      fill="transparent"
                      :stroke="isDarkMode ? '#8A8A8A' : '#3A3A3A'"
                    />
                    <!-- Landmark label -->
                    <text
                      :transform="`translate(${plot.x - 8}, ${svg.drawingArea.top + 6}) rotate(-90)`"
                      text-anchor="end"
                      :font-size="14"
                      :fill="isDarkMode ? '#CCCCCC' : '#2A2A2A'"
                      :stroke="isDarkMode ? '#1A1A1A' : '#FFFFFF'"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      paint-order="stroke fill"
                    >
                      {{ landmark.description }}
                    </text>
                  </g>
                </template>
              </g>
        </template>

        <template #area-gradient="{ series, id: gradientId }">
            <linearGradient :id="gradientId" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" :stop-color="series.color" stop-opacity="0.2" />
              <stop offset="100%" :stop-color="isDarkMode ? '#1A1A1A' : '#FFFFFF'" stop-opacity="0" />
            </linearGradient>
          </template>
      </VueUiXy>
    </div>
</template>

<style scoped>
.dark-mode :deep(.vdui-shape-star) {
  stroke: #1A1A1A;
  stroke-width: 1 !important;
}
.light-mode :deep(.vdui-shape-star) {
  stroke: #FFFFFF;
  stroke-width: 1 !important;
}
</style>