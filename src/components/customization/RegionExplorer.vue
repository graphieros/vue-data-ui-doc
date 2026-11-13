<script setup>
import { ref, computed, useId } from "vue";
import { shiftColorHue } from "vue-data-ui/utils";
import { useMainStore } from "../../stores";

const store = useMainStore();
const pinId = useId();
const labels = computed(() => {
    const translations = {
        en: [
            "Revenue",
            "Customers",
            "Change",
            "Select a country",
            "Chart",
            "Table",
            "Table view",
            "Country",
            "Revenue by country",
            "Total",
        ],
        fr: [
            "Chiffre d’affaires",
            "Clients",
            "Variation",
            "Sélectionner un pays",
            "Graphique",
            "Tableau",
            "Vue tableau",
            "Pays",
            "Chiffre d’affaires par pays",
            "Total",
        ],
        pt: [
            "Receita",
            "Clientes",
            "Variação",
            "Selecione um país",
            "Gráfico",
            "Tabela",
            "Visualização em tabela",
            "País",
            "Receita por país",
            "Total",
        ],
        de: [
            "Umsatz",
            "Kunden",
            "Änderung",
            "Land auswählen",
            "Diagramm",
            "Tabelle",
            "Tabellenansicht",
            "Land",
            "Umsatz nach Land",
            "Gesamt",
        ],
        zh: [
            "收入",
            "客户",
            "变化",
            "选择国家",
            "图表",
            "表格",
            "表格视图",
            "国家",
            "各国收入",
            "总计",
        ],
        ja: [
            "売上",
            "顧客",
            "変化",
            "国を選択",
            "チャート",
            "テーブル",
            "テーブル表示",
            "国",
            "国別売上",
            "合計",
        ],
        es: [
            "Ingresos",
            "Clientes",
            "Cambio",
            "Selecciona un país",
            "Gráfico",
            "Tabla",
            "Vista de tabla",
            "País",
            "Ingresos por país",
            "Total",
        ],
        ko: [
            "매출",
            "고객",
            "변화",
            "국가 선택",
            "차트",
            "테이블",
            "테이블 보기",
            "국가",
            "국가별 매출",
            "합계",
        ],
        ar: [
            "الإيرادات",
            "العملاء",
            "التغير",
            "اختر بلدًا",
            "المخطط",
            "الجدول",
            "عرض الجدول",
            "البلد",
            "الإيرادات حسب البلد",
            "الإجمالي",
        ],
    };
    const [
        revenue,
        customers,
        change,
        selectRegion,
        chart,
        table,
        tableView,
        country,
        revenueByCountry,
        total,
    ] = translations[store.lang] || translations.en;
    return {
        revenue,
        customers,
        change,
        selectRegion,
        chart,
        table,
        tableView,
        country,
        revenueByCountry,
        total,
    };
});

const ink = computed(() => (store.isDarkMode ? "#E5E7EB" : "#0F172A"));
const lightInk = computed(() => (store.isDarkMode ? "#6A6A6A" : "#8A8A8A"));
const track = computed(() => (store.isDarkMode ? "#4A4A4A" : "#CBD5E1"));
const color = computed(() => (store.isDarkMode ? "#83a4f2" : "#3456a3"));

const periods = computed(() =>
    Array.from({ length: 12 }, (_, index) =>
        new Intl.DateTimeFormat(store.lang, {
            month: "short",
            timeZone: "UTC",
        }).format(new Date(Date.UTC(2026, index, 1))),
    ),
);

const number = (value, options = {}) =>
    new Intl.NumberFormat(store.lang, {
        maximumFractionDigits: 1,
        ...options,
    }).format(value);

const money = (value) =>
    number(value, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
        compactDisplay: "short",
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    });

function createHistoryConfig(title, formatter) {
    return {
        chart: {
            backgroundColor: "transparent",
            color: ink.value,
            fontFamily: "inherit",
            width: 500,
            height: 300,
            title: { text: title, color: ink.value, fontSize: 18 },
            legend: { show: false },
            userOptions: { show: false },
            zoom: { show: false },
            highlighter: {
                crosshairs: {
                    show: true,
                    stroke: lightInk.value,
                },
            },
            grid: {
                position: "start",
                stroke: track.value,
                showHorizontalLines: true,
                labels: {
                    color: ink.value,
                    fontSize: 14,
                    yAxis: {
                        scaleMin: 0,
                        useNiceScale: true,
                        commonScaleSteps: 5,
                        formatter: ({ value }) => formatter(value),
                    },
                    xAxisLabels: {
                        values: periods.value,
                        color: ink.value,
                        fontSize: 14,
                    },
                },
            },
            tooltip: {
                show: false,
            },
        },
        line: {
            area: {
                opacity: 15,
            },
        },
    };
}

const historyConfig = computed(() =>
    createHistoryConfig(labels.value.revenue, money),
);
const customersHistoryConfig = computed(() =>
    createHistoryConfig(labels.value.customers, (value) =>
        number(value, { maximumFractionDigits: 0 }),
    ),
);

const selectedCode = ref("FRA");
const showMapTooltip = ref(false);
const showHistoryTable = ref(false);

const regions = [
    {
        code: "FRA",
        region: "FR",
        coordinates: [2, 46],
        revenue: 48000,
        customers: 1200,
        growth: 18,
        revenueHistory: [
            39000, 42500, 41000, 46000, 44000, 52000, 49000, 43000, 46500,
            51000, 45500, 48000,
        ],
        customersHistory: [
            920, 980, 1010, 960, 1080, 1150, 1120, 1070, 1180, 1250, 1160, 1200,
        ],
    },
    {
        code: "DEU",
        region: "DE",
        coordinates: [10, 51],
        revenue: 72000,
        customers: 1800,
        growth: 24,
        revenueHistory: [
            56000, 59000, 63500, 61000, 67000, 65000, 69000, 71000, 68000,
            74500, 70000, 72000,
        ],
        customersHistory: [
            1420, 1450, 1510, 1480, 1600, 1660, 1620, 1700, 1750, 1720, 1850,
            1800,
        ],
    },
    {
        code: "USA",
        region: "US",
        coordinates: [-99, 39],
        revenue: 96000,
        customers: 2400,
        growth: 32,
        revenueHistory: [
            68000, 74000, 71000, 83000, 79000, 88000, 85000, 92000, 86000,
            103000, 99000, 96000,
        ],
        customersHistory: [
            1720, 1900, 1830, 2050, 1980, 2200, 2110, 2280, 2220, 2550, 2460,
            2400,
        ],
    },
    {
        code: "JPN",
        region: "JP",
        coordinates: [138, 37],
        revenue: 64000,
        customers: 1600,
        growth: 21,
        revenueHistory: [
            62000, 59000, 66000, 61000, 58000, 56000, 60000, 62500, 61000,
            67000, 65000, 64000,
        ],
        customersHistory: [
            1500, 1470, 1580, 1510, 1450, 1410, 1480, 1560, 1530, 1650, 1630,
            1600,
        ],
    },
    {
        code: "CHN",
        region: "CN",
        coordinates: [104, 35],
        revenue: 112000,
        customers: 2800,
        growth: 38,
        revenueHistory: [
            78000, 80000, 84000, 90000, 93000, 98000, 96000, 104000, 108000,
            110000, 115000, 112000,
        ],
        customersHistory: [
            1900, 1980, 2060, 2250, 2310, 2440, 2380, 2550, 2640, 2720, 2850,
            2800,
        ],
    },
    {
        code: "BRA",
        region: "BR",
        coordinates: [-52, -12],
        revenue: 40000,
        customers: 1000,
        growth: 15,
        revenueHistory: [
            26000, 31000, 29000, 33000, 36000, 32000, 39000, 41000, 37000,
            35000, 43000, 40000,
        ],
        customersHistory: [
            640, 710, 690, 780, 850, 810, 910, 960, 890, 870, 1040, 1000,
        ],
    },
    {
        code: "AUS",
        region: "AU",
        coordinates: [134, -25],
        revenue: 8000,
        customers: 200,
        growth: 5,
        revenueHistory: [
            9200, 8800, 8400, 7600, 7900, 7100, 6800, 7400, 7700, 8500, 8200,
            8000,
        ],
        customersHistory: [
            230, 225, 210, 190, 195, 180, 170, 185, 192, 208, 205, 200,
        ],
    },
    {
        code: "ZAF",
        region: "ZA",
        coordinates: [25, -29],
        revenue: 4000,
        customers: 100,
        growth: 3,
        revenueHistory: [
            1800, 2200, 2100, 2800, 2400, 3000, 3200, 2700, 3500, 3300, 4200,
            4000,
        ],
        customersHistory: [42, 48, 45, 62, 57, 68, 73, 65, 82, 79, 106, 100],
    },
];
const selected = computed(() =>
    regions.find((region) => region.code === selectedCode.value),
);

const countryNames = computed(
    () => new Intl.DisplayNames([store.lang], { type: "region" }),
);

const maxRevenue = computed(() =>
    Math.max(1, ...regions.map((region) => region.revenue)),
);

const dataset = computed(() => {
    return Object.fromEntries(
        regions.map((region) => [
            region.code,
            {
                value: region.revenue,
                // Match the KPI table's red-to-green hue scale.
                color: shiftColorHue(
                    "#42d392",
                    (region.revenue / maxRevenue.value - 1) * (153.1 / 360),
                ),
            },
        ]),
    );
});

const tableRows = computed(() =>
    [...regions]
        .sort((a, b) => b.revenue - a.revenue)
        .map((region) => ({
            ...region,
            name: countryNames.value.of(region.region),
            sparkbarDataset: [
                {
                    name: labels.value.revenue,
                    value: region.revenue,
                    color: dataset.value[region.code].color,
                    target: maxRevenue.value,
                    formatter: ({ value }) => money(value),
                },
            ],
        })),
);

const sparkbarConfig = computed(() => ({
    style: {
        backgroundColor: "transparent",
        fontFamily: "inherit",
        animation: { show: true },
        layout: {
            independant: true,
            percentage: false,
            target: maxRevenue.value,
            showTargetValue: false,
        },
        gutter: { backgroundColor: track.value, opacity: 35 },
        bar: { borderRadius: 12, gradient: { show: false } },
        labels: {
            fontSize: 14,
            name: { color: ink.value, position: "top-left" },
            value: { show: true, bold: true },
        },
        title: { text: "" },
    },
}));

const history = computed(() => [
    {
        name: labels.value.revenue,
        type: "line",
        series: [...selected.value.revenueHistory],
        color: dataset.value[selectedCode.value].color,
        smooth: true,
        useArea: true,
        dataLabels: false,
        prefix: "€",
    },
]);

const customerHistory = computed(() => [
    {
        name: labels.value.customers,
        type: "bar",
        series: [...selected.value.customersHistory],
        color: dataset.value[selectedCode.value].color,
        smooth: true,
        useArea: true,
        dataLabels: false,
    },
]);

const donutDataset = computed(() => [
    {
        name: countryNames.value.of(selected.value.region),
        values: [selected.value.revenue],
        color: dataset.value[selectedCode.value].color,
    },
    {
        name: "Other",
        values: [
            regions.reduce(
                (sum, region) =>
                    region.code === selectedCode.value
                        ? sum
                        : sum + region.revenue,
                0,
            ),
        ],
        color: store.isDarkMode ? "#374151" : "#E2E8F0",
    },
]);

const donutConfig = computed(() => ({
    sorted: false,
    userOptions: { show: false },
    useBlurOnHover: false,
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "transparent",
            color: ink.value,
            width: 400,
            height: 300,
            title: { text: "" },
            useGradient: false,
            legend: {
                show: false,
            },
            tooltip: { show: false },
            layout: {
                curvedMarkers: true,
                labels: {
                    dataLabels: {
                        hideUnderValue: 0,
                        smallArcClusterThreshold: 0,
                    },
                    percentage: {
                        color: ink.value,
                    },
                    value: {
                        formatter: ({ value }) => money(value),
                    },
                    name: {
                        show: true,
                        color: ink.value,
                    },
                    hollow: {
                        total: {
                            color: ink.value,
                            text: labels.value.total,
                            value: {
                                color: ink.value,
                                formatter: ({ value }) => money(value),
                            },
                        },
                        average: { show: false },
                    },
                },
            },
        },
    },
}));

const config = computed(() => ({
    userOptions: { show: false },
    projection: "equirectangular",
    events: {
        datapointEnter: ({ datapoint }) => {
            showMapTooltip.value = regions.some(
                (region) => region.code === datapoint?.code,
            );
        },
        datapointLeave: () => {
            showMapTooltip.value = false;
        },
    },
    style: {
        fontFamily: "inherit",
        chart: {
            backgroundColor: "transparent",
            color: ink.value,
            title: { text: "" },
            dimensions: { width: 800, height: 420 },
            dataLabels: { formatter: ({ value }) => money(value) },
            territory: {
                showTaiwanAsPartOfChina: true,
                emptyColor: store.isDarkMode ? "#374151" : "#E2E8F0",
                stroke: store.isDarkMode ? "#374151" : "#E2E8F0",
                strokeWidthSelected: 1,
                colors: { min: "#ff8c00", max: "#87e6bb" },
            },
            legend: { show: false },
            tooltip: {
                show: showMapTooltip.value,
                showMinimap: false,
                color: ink.value,
                backgroundColor: store.isDarkMode ? "#242424" : "#FFFFFF",
            },
        },
    },
}));

function pinPosition({ width, height }) {
    const [longitude, latitude] = selected.value.coordinates;
    // Match VueUiWorld's equirectangular projection (90°N to 80°S).
    return {
        x: ((longitude + 180) / 360) * width,
        y: ((90 - latitude) / 170) * height,
    };
}

function selectCountry(datapoint) {
    if (regions.some((region) => region.code === datapoint?.code))
        selectedCode.value = datapoint.code;
}
</script>
<template>
    <div
        class="rounded-xl border border-slate-200 bg-white p-5 text-slate-900 dark:border-gray-700 dark:bg-[#242424] dark:text-gray-200"
        :dir="store.lang === 'ar' ? 'rtl' : 'ltr'"
    >
        <div class="mb-4 flex flex-wrap items-center gap-3">
            <label
                >{{ labels.selectRegion }}
                <select
                    v-model="selectedCode"
                    class="rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-blue dark:bg-[#242424] dark:text-gray-200"
                >
                    <option
                        v-for="region in regions"
                        :key="region.code"
                        :value="region.code"
                    >
                        {{ countryNames.of(region.region) }}
                    </option>
                </select></label
            >
        </div>
        <div dir="ltr" class="w-full min-w-0">
            <VueUiWorld
                :dataset="dataset"
                :config="config"
                @selectDatapoint="selectCountry"
            >
                <template #svg="{ svg }">
                    <defs>
                        <radialGradient
                            :id="`${pinId}-head`"
                            cx="32%"
                            cy="28%"
                            r="75%"
                        >
                            <stop offset="0%" stop-color="#ff7777" />
                            <stop offset="30%" stop-color="#ff1717" />
                            <stop offset="70%" stop-color="#c60000" />
                            <stop offset="100%" stop-color="#790000" />
                        </radialGradient>
                        <linearGradient :id="`${pinId}-stem`" x1="0%" x2="100%">
                            <stop offset="0%" stop-color="#e2e8ed" />
                            <stop offset="45%" stop-color="#bcc5ca" />
                            <stop offset="100%" stop-color="#78848b" />
                        </linearGradient>
                    </defs>
                    <g
                        :transform="`translate(${pinPosition(svg).x} ${pinPosition(svg).y})`"
                        pointer-events="none"
                        aria-hidden="true"
                    >
                        <ellipse
                            cx="0.3"
                            cy="0.4"
                            rx="2"
                            ry="0.65"
                            fill="#000000"
                            opacity="0.2"
                        />
                        <path
                            d="M-1.35-8.5h2.7L.65 0a.65.3 0 0 1-1.3 0Z"
                            :fill="`url(#${pinId}-stem)`"
                        />
                        <circle
                            cx="0"
                            cy="-12"
                            r="5"
                            :fill="`url(#${pinId}-head)`"
                            stroke="#a00000"
                            stroke-width="0.2"
                        />
                    </g>
                </template>
            </VueUiWorld>
        </div>
        <h3 class="mb-3 text-lg font-semibold">
            {{ countryNames.of(selected.region) }}
        </h3>
        <div class="grid gap-4 sm:grid-cols-3" aria-live="polite">
            <div
                class="min-w-0 rounded-lg border border-slate-200 p-4 dark:border-gray-600"
            >
                <p class="text-sm text-slate-500 dark:text-gray-400">
                    {{ labels.revenue }}
                </p>
                <div class="text-2xl font-semibold tabular-nums">
                    {{ money(selected.revenue) }}
                </div>
            </div>
            <div
                class="min-w-0 rounded-lg border border-slate-200 p-4 dark:border-gray-600"
            >
                <p class="text-sm text-slate-500 dark:text-gray-400">
                    {{ labels.customers }}
                </p>
                <div class="text-2xl font-semibold tabular-nums">
                    {{ number(selected.customers) }}
                </div>
            </div>
            <div
                class="min-w-0 rounded-lg border border-slate-200 p-4 dark:border-gray-600"
            >
                <p class="text-sm text-slate-500 dark:text-gray-400">
                    {{ labels.change }}
                </p>
                <div class="text-2xl font-semibold tabular-nums">
                    +{{ number(selected.growth) }}%
                </div>
            </div>
        </div>
        <div class="mt-6">
            <div class="mb-4 flex items-center justify-end gap-3 text-sm">
                <span>{{ labels.chart }}</span>
                <button
                    type="button"
                    role="switch"
                    :aria-checked="showHistoryTable"
                    :aria-label="labels.tableView"
                    :aria-controls="`${pinId}-revenue-view`"
                    class="relative h-6 w-11 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-blue"
                    :class="
                        showHistoryTable
                            ? 'bg-app-blue'
                            : 'bg-slate-400 dark:bg-gray-600'
                    "
                    @click="showHistoryTable = !showHistoryTable"
                    dir="ltr"
                >
                    <span
                        class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
                        :class="
                            showHistoryTable ? 'translate-x-5' : 'translate-x-0'
                        "
                    />
                </button>
                <span>{{ labels.table }}</span>
            </div>
            <div :id="`${pinId}-revenue-view`">
                <div v-if="showHistoryTable" class="overflow-x-auto">
                    <table class="w-full min-w-[620px] border-collapse text-sm">
                        <caption class="pb-3 text-start font-semibold">
                            {{
                                labels.revenueByCountry
                            }}
                        </caption>
                        <thead
                            class="bg-slate-100 text-slate-600 dark:bg-[#303030] dark:text-gray-200"
                        >
                            <tr>
                                <th scope="col" class="px-4 py-3 text-start">
                                    {{ labels.country }}
                                </th>
                                <th scope="col" class="px-4 py-3 text-start">
                                    {{ labels.revenue }}
                                </th>
                                <th scope="col" class="px-4 py-3 text-end">
                                    {{ labels.customers }}
                                </th>
                                <th scope="col" class="px-4 py-3 text-end">
                                    {{ labels.change }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="row in tableRows"
                                :key="row.code"
                                class="cursor-pointer border-t border-slate-200 hover:bg-[#f7f8fa] dark:border-gray-700 dark:hover:bg-[#272a2f]"
                                :class="{
                                    'bg-[#f7f8fa] dark:bg-[#272a2f]':
                                        row.code === selectedCode,
                                }"
                                @click="selectCountry(row)"
                            >
                                <th
                                    scope="row"
                                    class="px-4 py-3 text-start font-medium"
                                >
                                    <button
                                        type="button"
                                        class="cursor-pointer rounded text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-blue"
                                        :aria-pressed="
                                            row.code === selectedCode
                                        "
                                    >
                                        {{ row.name }}
                                    </button>
                                </th>
                                <td class="w-[45%] min-w-[220px] px-4 py-3">
                                    <div dir="ltr">
                                        <VueUiSparkbar
                                            :dataset="row.sparkbarDataset"
                                            :config="sparkbarConfig"
                                        />
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-end tabular-nums">
                                    {{ number(row.customers) }}
                                </td>
                                <td class="px-4 py-3 text-end tabular-nums">
                                    +{{ number(row.growth) }}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else dir="ltr">
                    <div class="flex flex-wrap gap-4 md:flex-nowrap">
                        <div class="w-full min-w-0 md:flex-1">
                            <VueUiXy
                                :dataset="history"
                                :config="historyConfig"
                            />
                        </div>
                        <div class="w-full min-w-0 md:flex-1">
                            <VueUiDonut
                                :dataset="donutDataset"
                                :config="donutConfig"
                            />
                        </div>
                        <div class="w-full min-w-0 md:flex-1">
                            <VueUiXy
                                :dataset="customerHistory"
                                :config="customersHistoryConfig"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
