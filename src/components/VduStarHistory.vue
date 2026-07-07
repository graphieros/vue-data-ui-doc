<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
// const source = ref([
//     {
//         snapshot_date: "2023-07-24",
//         stars: 0,
//         fetched_at: "2023-07-24 07:59:14",
//     },
//     {
//         snapshot_date: "2023-08-11",
//         stars: 1,
//         fetched_at: "2023-08-11 07:59:14",
//     },
//     {
//         snapshot_date: "2024-03-22",
//         stars: 100,
//         fetched_at: "2024-03-22 07:59:14",
//     },
//     {
//         snapshot_date: "2024-09-23",
//         stars: 400,
//         fetched_at: "2024-09-23 07:59:14",
//     },
//     {
//         snapshot_date: "2024-10-01",
//         stars: 700,
//         fetched_at: "2024-10-01 07:59:14",
//     },
//     {
//         snapshot_date: "2024-10-28",
//         stars: 900,
//         fetched_at: "2024-10-28 07:59:14",
//     },
//     {
//         snapshot_date: "2025-01-01",
//         stars: 1200,
//         fetched_at: "2025-01-01 07:59:14",
//     },
//     {
//         snapshot_date: "2025-05-21",
//         stars: 1400,
//         fetched_at: "2025-05-21 07:59:14",
//     },
//     {
//         snapshot_date: "2025-06-03",
//         stars: 1700,
//         fetched_at: "2025-06-03 07:59:14",
//     },
//     {
//         snapshot_date: "2025-09-19",
//         stars: 1900,
//         fetched_at: "2025-09-19 07:59:14",
//     },
//     {
//         snapshot_date: "2026-03-03",
//         stars: 2200,
//         fetched_at: "2026-03-03 07:59:14",
//     },
//     {
//         snapshot_date: "2026-07-07",
//         stars: 2421,
//         fetched_at: "2026-07-07 07:59:14",
//     },
// ])

const source = computed(() => store.starHistory);
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
            smooth: true,
            temperatureColors: isDarkMode.value ? ["#fdd663", "#42d392"] : ["#42d392", "#5f8aee"],
            color: isDarkMode.value ? "#fdd663" : "#42d392",
            useArea: true
        },
    ];
});


const config = computed(() => ({
  theme: isDarkMode.value ? 'dark' : '',
  downsample: {
    threshold: 20000,
  },
  chart:{
    backgroundColor: 'transparent',
    userOptions: { show: false },
    padding: {
      right: 90
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
        },
        xAxisLabels: {
          values: normalizedSource.value.map(s => s.snapshot_date),
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
    zoom: { show: false },
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
        x="${lastPlot.x + 12}"
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

</script>

<template>
    <div class="p-4 bg-[#FFFFFF] dark:bg-[#1A1A1A] rounded-md mb-4">
      <VueUiXy :dataset :config>
        <template #svg="{ svg }">
          <g v-html="drawLastLabel(svg)"/>
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
