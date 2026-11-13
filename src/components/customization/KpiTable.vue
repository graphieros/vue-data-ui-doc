<script setup>
import { computed } from "vue";
import { shiftColorHue } from "vue-data-ui/utils";
import { useMainStore } from "../../stores";

const store = useMainStore();

const labels = computed(() => {
    const translations = {
        en: ["Revenue by team", "Team", "Revenue", "Target", "Target achieved"],
        fr: [
            "Chiffre d’affaires par équipe",
            "Équipe",
            "Chiffre d’affaires",
            "Objectif",
            "Objectif atteint",
        ],
        pt: [
            "Receita por equipe",
            "Equipe",
            "Receita",
            "Meta",
            "Meta atingida",
        ],
        de: ["Umsatz nach Team", "Team", "Umsatz", "Ziel", "Zielerreichung"],
        zh: ["各团队收入", "团队", "收入", "目标", "目标达成率"],
        ja: ["チーム別売上", "チーム", "売上", "目標", "目標達成率"],
        es: [
            "Ingresos por equipo",
            "Equipo",
            "Ingresos",
            "Objetivo",
            "Objetivo alcanzado",
        ],
        ko: ["팀별 매출", "팀", "매출", "목표", "목표 달성률"],
        ar: [
            "الإيرادات حسب الفريق",
            "الفريق",
            "الإيرادات",
            "الهدف",
            "نسبة تحقيق الهدف",
        ],
    };
    const [title, team, revenue, target, progress] =
        translations[store.lang] || translations.en;
    return { title, team, revenue, target, progress };
});

const rows = [
    { name: "Atlas", revenue: 3000, target: 30000 },
    { name: "Aurora", revenue: 8000, target: 40000 },
    { name: "Nova", revenue: 15000, target: 50000 },
    { name: "Vega", revenue: 10000, target: 25000 },
    { name: "Lyra", revenue: 20000, target: 40000 },
    { name: "Cosmos", revenue: 18000, target: 30000 },
    { name: "Stellar", revenue: 35000, target: 50000 },
    { name: "Horizon", revenue: 32000, target: 40000 },
    { name: "Zenith", revenue: 27000, target: 30000 },
    { name: "Orbit", revenue: 25000, target: 25000 },
];

const currency = computed(
    () =>
        new Intl.NumberFormat(store.lang, {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }),
);

function achievementColor(percentage) {
    const progress = Math.min(100, Math.max(0, percentage)) / 100;
    // The hue of #42d392 is 153.1°; shift it back to red at 0%.
    return shiftColorHue("#42d392", (progress - 1) * (153.1 / 360));
}

const gizmoConfig = computed(() => ({
    type: "gauge",
    size: 40,
    stroke: store.isDarkMode ? "#4A4A4A" : "#CBD5E1",
    textColor: store.isDarkMode ? "#E5E7EB" : "#0F172A",
    useGradient: store.isDarkMode,
    fontFamily: "inherit",
    showPercentage: true,
    a11y: { translations: { label: labels.value.progress } },
}));
</script>

<template>
    <div
        class="overflow-x-auto rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-gray-700 dark:bg-transparent dark:text-gray-200 dark:shadow-none"
    >
        <table class="w-full min-w-[500px] border-collapse text-sm">
            <caption
                class="border-b border-slate-200 bg-white px-5 py-4 text-start text-lg font-semibold text-slate-900 dark:border-gray-700 dark:bg-[#242424] dark:text-gray-200"
            >
                {{
                    labels.title
                }}
            </caption>
            <thead
                class="bg-slate-100 text-slate-600 dark:bg-[#242424] dark:text-gray-200"
            >
                <tr>
                    <th scope="col" class="px-5 py-3 text-start">
                        {{ labels.team }}
                    </th>
                    <th scope="col" class="px-5 py-3 text-end">
                        {{ labels.revenue }}
                    </th>
                    <th scope="col" class="px-5 py-3 text-end">
                        {{ labels.target }}
                    </th>
                    <th scope="col" class="px-5 py-3 text-center">
                        {{ labels.progress }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="row in rows"
                    :key="row.name"
                    class="border-t border-slate-200 even:bg-slate-50/70 hover:bg-blue-50/60 dark:border-gray-700 dark:even:bg-transparent dark:hover:bg-transparent"
                >
                    <th scope="row" class="px-5 py-3 text-start font-medium">
                        {{ row.name }}
                    </th>
                    <td class="px-5 py-3 text-end font-medium tabular-nums">
                        {{ currency.format(row.revenue) }}
                    </td>
                    <td
                        class="px-5 py-3 text-end tabular-nums text-slate-500 dark:text-gray-200"
                    >
                        {{ currency.format(row.target) }}
                    </td>
                    <td class="px-5 py-3">
                        <div dir="ltr" class="flex justify-center">
                            <VueUiGizmo
                                :dataset="(row.revenue / row.target) * 100"
                                :config="{
                                    ...gizmoConfig,
                                    color: achievementColor(
                                        (row.revenue / row.target) * 100,
                                    ),
                                }"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
