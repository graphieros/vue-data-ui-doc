<script setup>
import { shallowRef, computed } from "vue";
import DATA from "../../vdu-breakdown.json";
import VueUiCirclePack from "vue-data-ui/vue-ui-circle-pack";
import { useMainStore } from "../stores";
import { getPalette } from "vue-data-ui/utils";
import VueUiTreemap from "vue-data-ui/vue-ui-treemap";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const PALETTE = getPalette()

function buildDataset() {
  const groups = new Map();

  DATA.files.forEach((file) => {
    const extension = file.extension || "[no extension]";

    if (!groups.has(extension)) {
      groups.set(extension, {
        name: extension,
        value: 0,
        children: [],
      });
    }

    const group = groups.get(extension);

    group.value += file.bytes;
    if (file.filename === 'vue' || file.filename === 'vue-ui') return
    group.children.push({
      name: file.filename,
      value: file.bytes,
    });
  });

  return Array.from(groups.values())
    .filter((group) => group.name !== "[no extension]")
    .map((group, i) => ({
      ...group,
      color: PALETTE[i % PALETTE.length],
      children: group.children.sort((a, b) => b.value - a.value)
    }))
    .sort((a, b) => b.value - a.value);
}

const ALL_DATASET = buildDataset();

const GROUPS = ALL_DATASET.map(({ name, value, color }) => ({
  name,
  value,
  color,
}));

const dataset = computed(() => {
  return ALL_DATASET
});

function formatBytes({ value }) {
  if (!Number.isFinite(value) || value < 0) return "0 B";
  if (value === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(value) / Math.log(1024)),
    units.length - 1,
  );

  const size = value / 1024 ** exponent;

  const formatter = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: size >= 10 || exponent === 0 ? 0 : 1,
  });

  return `${formatter.format(size)} ${units[exponent]}`;
}

const config = computed(() => ({
  theme: isDarkMode.value ? "dark" : "",
  style: {
    chart: {
      backgroundColor: isDarkMode.value ? '#3A3A3A' : '#F3F4F6',
      circles: {
        strokeWidth: 0.1,
        labels: {
          value: {
            formatter: ({ value }) => formatBytes({ value }),
          },
        },
      },
    },
  },
}));

const treemapConfig = computed(() => ({
  theme: isDarkMode.value ? "dark" : "",
  style: {
    chart: {
      backgroundColor: isDarkMode.value ? '#3A3A3A' : '#F3F4F6',
      layout: {
        labels: {
          fontSize: 24,
          minFontSize: 3,
          hideUnderProportion: 0,
          formatter: ({ value }) => formatBytes({ value }),
        },
        rects: {
          strokeWidth: 1,
          proportionalStrokeWidthMuliplier: 120,
        }
      }
    }
  }
}))
</script>

<template>
  <div class="p-2 bg-[#F3F4F6] dark:bg-[#1A1A1A] rounded-2xl mb-4">
    <VueUiCirclePack
      :dataset="dataset"
      :config="config"
    />
    <VueUiTreemap :dataset :config="treemapConfig"/>
  </div>
</template>

<style scoped>
:deep(.vue-data-ui-component) {
  border-radius: 10px;
}
</style>