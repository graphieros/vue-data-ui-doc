<script setup>
import { computed, ref, useTemplateRef } from "vue";
import { useParentSize } from "vue-data-ui/composables";
import { VueUiXy } from "vue-data-ui/vue-ui-xy";
import { useMainStore } from "../../../stores";
import BaseCard from "../../BaseCard.vue";
import CodeParser from "../../customization/CodeParser.vue";
import { parentSizeTranslations } from "./parentSizeTranslations.js";

const store = useMainStore();
const text = computed(
    () => parentSizeTranslations[store.lang] || parentSizeTranslations.en,
);
const target = useTemplateRef("parent-size-target");
const scale = ref(1);
const offsetHeight = ref(-150);
const observe = ref(true);
const { width, height } = useParentSize(target, {
    scale,
    offsetHeight,
    observe,
});
const chartLabels = {
    en: ["Monthly revenue (€)", "Revenue", "Target"],
    fr: ["Chiffre d’affaires mensuel (€)", "Chiffre d’affaires", "Objectif"],
    pt: ["Receita mensal (€)", "Receita", "Meta"],
    de: ["Monatlicher Umsatz (€)", "Umsatz", "Ziel"],
    es: ["Ingresos mensuales (€)", "Ingresos", "Objetivo"],
    zh: ["月收入（€）", "收入", "目标"],
    ja: ["月次売上（€）", "売上", "目標"],
    ko: ["월별 매출 (€)", "매출", "목표"],
    ar: ["الإيرادات الشهرية (€)", "الإيرادات", "الهدف"],
};
const labels = computed(() => chartLabels[store.lang] || chartLabels.en);
const dataset = computed(() => [
    {
        name: labels.value[1],
        type: "line",
        series: [12000, 15500, 14000, 18500, 21000, 23500, 22000, 24000],
    },
]);
const config = computed(() => ({
    theme: store.isDarkMode ? "dark" : "",
    responsive: false,
    chart: {
        width: width.value ?? 600,
        height: height.value ?? 360,
        title: { text: labels.value[0], fontSize: 18 },
        userOptions: { show: false },
        grid: {
            labels: {
                xAxisLabels: {
                    values: Array.from(
                        { length: dataset.value[0].series.length },
                        (_, month) =>
                            new Intl.DateTimeFormat(store.lang, {
                                month: "short",
                                timeZone: "UTC",
                            }).format(new Date(Date.UTC(2026, month, 1))),
                    ),
                },
            },
        },
        zoom: {
            minimap: {
                show: true,
            },
        },
    },
}));
const formatSize = (value) =>
    value === undefined ? text.value.unavailable : `${value.toFixed(1)}px`;
const options = [
    { name: "scale", type: "number", default: "1" },
    { name: "offsetWidth", type: "number", default: "0" },
    { name: "offsetHeight", type: "number", default: "0" },
    { name: "maxWidth", type: "number", default: "window.innerWidth" },
    { name: "maxHeight", type: "number", default: "window.innerHeight" },
    { name: "observe", type: "boolean", default: "true" },
];
const formula = `width  = Math.min((parentWidth  + offsetWidth)  * scale, maxWidth);
height = Math.min((parentHeight + offsetHeight) * scale, maxHeight);`;
const exampleScript = `import { computed, ref, useTemplateRef } from "vue";
import { VueUiXy, type VueUiXyConfig, type VueUiXyDatasetItem } from "vue-data-ui/vue-ui-xy";
import { useParentSize } from "vue-data-ui/composables";
import "vue-data-ui/style.css";

const target = useTemplateRef<HTMLDivElement>("chart-host");
const scale = ref(1);
const offsetHeight = ref(-150);
const observe = ref(true);

const { width, height, stop } = useParentSize(target, {
  scale,
  offsetHeight,
  observe,
});

const dataset = ref<VueUiXyDatasetItem[]>([
  { name: "Revenue", type: "line", series: [12000, 15500, 14000, 18500, 21000, 23500, 22000, 24000] },
]);

const config = computed<VueUiXyConfig>(() => ({
  responsive: false,
  chart: {
    width: width.value ?? 600,
    height: height.value ?? 360,
    title: { text: "Monthly revenue (€)", fontSize: 18 },
    userOptions: { show: false },
    zoom: { minimap: { show: true } },
    grid: { labels: { xAxisLabels: { values: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] } } },
  },
}));

// Optional: stop() permanently stops tracking for this instance.
// Setup-scope cleanup is automatic; no manual stop is needed on unmount.`;
const exampleTemplate = `<div class="chart-container">
  <div ref="chart-host" class="chart-host">
    <VueUiXy :dataset="dataset" :config="config" />
  </div>
</div>`;
const exampleStyle = `.chart-container {
  width: 100%;
  height: 360px;
  min-width: 0;
  resize: both;
  overflow: auto;
}

.chart-host {
  width: 100%;
  min-width: 0;
}

/* Keep CSS width independent of the scaled chart dimensions. */`;
</script>

<template>
    <BaseCard id="use-parent-size" class="mt-12">
        <div class="p-4 space-y-5" dir="auto">
            <h2 class="text-xl"><code>useParentSize</code></h2>
            <p>{{ text.description }}</p>
            <p>{{ text.target }}</p>

            <h3 class="text-lg font-bold">{{ text.options }}</h3>
            <p>{{ text.reactivity }}</p>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse" dir="auto">
                    <thead>
                        <tr>
                            <th scope="col">{{ text.property }}</th>
                            <th scope="col">{{ text.type }}</th>
                            <th scope="col">{{ text.default }}</th>
                            <th scope="col">{{ text.behavior }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="option in options" :key="option.name">
                            <th scope="row">
                                <code>{{ option.name }}</code>
                            </th>
                            <td>
                                <code>{{ option.type }}</code>
                            </td>
                            <td>
                                <code>{{ option.default }}</code>
                            </td>
                            <td>{{ text[option.name] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <CodeParser
                language="javascript"
                :content="formula"
                @copy="store.copy()"
            />
            <p>{{ text.measurement }}</p>

            <h3 class="text-lg font-bold">{{ text.returns }}</h3>
            <p><code>width, height</code> - {{ text.dimensions }}</p>
            <p><code>stop()</code> - {{ text.stop }}</p>
            <p>{{ text.lifecycle }}</p>
            <p>{{ text.ssr }}</p>

            <h3 class="text-lg font-bold">{{ text.demo }}</h3>
            <p>{{ text.demoHint }}</p>
            <div class="flex flex-wrap gap-5 items-center" dir="ltr">
                <label class="flex flex-row gap-1">
                    <span>scale</span>
                    <input
                        v-model.number="scale"
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.05"
                    />
                    <div class="w-12">
                        <code>{{ scale }}</code>
                    </div>
                </label>
                <div class="flex flex-col gap-2">
                    <label class="flex flex-row gap-1">
                        <span>offsetHeight</span>
                        <input
                            aria-describedby="offset-height-hint"
                            v-model.number="offsetHeight"
                            type="range"
                            min="-200"
                            max="200"
                            step="1"
                        />
                        <div class="w-12">
                            <code
                                >{{
                                    offsetHeight >= 0
                                        ? `+${offsetHeight}`
                                        : offsetHeight
                                }}px</code
                            >
                        </div>
                    </label>
                    <p
                        id="offset-height-hint"
                        class="text-sm max-w-md"
                        dir="auto"
                    >
                        {{ text.offsetHeightHint }}
                    </p>
                </div>
                <label
                    ><input v-model="observe" type="checkbox" /> observe</label
                >
            </div>
            <div class="flex flex-wrap gap-4" aria-live="polite" dir="ltr">
                <code>width: {{ formatSize(width) }}</code>
                <code>height: {{ formatSize(height) }}</code>
            </div>
            <div class="parent-size-demo bg-gray-100 dark:bg-[#1A1A1A]">
                <div ref="parent-size-target" class="chart-host">
                    <VueUiXy :dataset="dataset" :config="config" />
                </div>
            </div>

            <h3 class="text-lg font-bold">{{ text.example }}</h3>
            <p>{{ text.layout }}</p>
            <CodeParser
                title="script setup (TypeScript)"
                language="typescript"
                :content="exampleScript"
                @copy="store.copy()"
            />
            <CodeParser
                title="template"
                language="html"
                :content="exampleTemplate"
                @copy="store.copy()"
            />
            <CodeParser
                title="style"
                language="css"
                :content="exampleStyle"
                @copy="store.copy()"
            />
        </div>
    </BaseCard>
</template>

<style scoped>
th,
td {
    padding: 0.75rem;
    border-bottom: 1px solid #6b72804d;
    vertical-align: top;
    text-align: start;
}
.chart-host {
    width: 100%;
    min-width: 0;
}
.parent-size-demo {
    width: 100%;
    height: 360px;
    min-width: min(320px, 100%);
    min-height: 240px;
    max-width: 100%;
    resize: both;
    overflow: auto;
    outline: 1px solid #6b7280;
    border-radius: 0.5rem;
}
</style>
