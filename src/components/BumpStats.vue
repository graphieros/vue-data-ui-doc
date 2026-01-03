<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import { shiftHue } from "./maker/lib";

const props = defineProps({
    stats: { type: Array}
})

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const parseCreatedAtToUtcMonthKey = (createdAt) => {
    const [datePart = "1970-01-01", timePart = "00:00:00"] = String(createdAt).split(" ");
    const [yearStr, monthStr, dayStr] = datePart.split("-");
    const [hourStr = "0", minuteStr = "0", secondStr = "0"] = timePart.split(":");

    const year = Number(yearStr);
    const monthIndex = Number(monthStr) - 1;
    const day = Number(dayStr);

    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const second = Number(secondStr);

    const d = new Date(Date.UTC(year, monthIndex, day, hour, minute, second));
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
};

const monthKeyToUtcTs = (monthKey) => {
    const [y, m] = monthKey.split("-");
    return Date.UTC(Number(y), Number(m) - 1, 1);
};

const addUtcMonths = (monthKey, delta) => {
    const [y, m] = monthKey.split("-");
    const d = new Date(Date.UTC(Number(y), Number(m) - 1 + delta, 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
};

const buildContinuousMonthAxis = (monthKeys) => {
    if (!monthKeys.length) return [];

    const unique = [...new Set(monthKeys)].sort(
        (a, b) => monthKeyToUtcTs(a) - monthKeyToUtcTs(b)
    );

    const axis = [unique[0]];
    let current = unique[0];

    while (current !== unique[unique.length - 1]) {
        current = addUtcMonths(current, 1);
        axis.push(current);
        if (axis.length > 2400) break;
    }

    return axis;
};

const ratingsToBumpDataset = (rows, options = {}) => {
    const parsed = rows.map((r) => {
        const monthKey = parseCreatedAtToUtcMonthKey(r.created_at);
        return {
            itemId: r.item_id,
            monthKey,
        };
    });

    const monthAxis =
        options.monthAxis ??
        buildContinuousMonthAxis(parsed.map((p) => p.monthKey));

    const monthIndexByKey = Object.fromEntries(
        monthAxis.map((k, i) => [k, i])
    );

    // itemId -> monthKey -> count
    const agg = {};

    for (const { itemId, monthKey } of parsed) {
        agg[itemId] ??= {};
        agg[itemId][monthKey] ??= 0;
        agg[itemId][monthKey] += 1;
    }

    const dataset = Object.keys(agg)
        .sort((a, b) => a.localeCompare(b))
        .map((itemId) => {
            const values = Array(monthAxis.length).fill(0);
            const byMonth = agg[itemId]; // ← this was missing

            for (const [monthKey, count] of Object.entries(byMonth)) {
                const idx = monthIndexByKey[monthKey];
                if (idx !== undefined) {
                    values[idx] = count;
                }
            }

            return {
                name: itemId,
                values,
                ...(options.colorsByItemId?.[itemId]
                    ? { color: options.colorsByItemId[itemId] }
                    : {}),
            };
        });

    return { monthAxis, dataset };
};


const bumper = computed(() => {
    return ratingsToBumpDataset(props.stats);
})

const dataset = computed(() => bumper.value.dataset.toSorted((a, b) => b.values[0] - a.values[0]).map((d, i) => {
    return {
        ...d,
        name: d.name.replaceAll('vue_ui_', ''),
        color: shiftHue('#5f8aee', i / bumper.value.dataset.length / 1.5),
    }
}))

const config = computed(() => ({
    userOptions: { show: false },
    style: {
        chart: {
            height: 1300,
            backgroundColor: 'transparent',
            title: {
                text: 'Number of votes',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                subtitle: {
                    text: 'Monthly ranking'
                }
            },
            padding: {
                bottom: 48
            },
            layout: {
                lines: {
                    coatingColor: isDarkMode.value ? '#2A2A2A' : '#FFFFFF'
                },
                plots: {
                    stroke: isDarkMode.value ? '#2A2A2A' : '#FFFFFF',
                    labels: {
                        fontSize: 10
                    }
                },
                nameLabels: {
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    useSerieColor: isDarkMode.value,
                },
                timeLabels: {
                    values: bumper.value.monthAxis,
                    offsetY: 24,
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                }
            }
        }
    }
}))

</script>

<template>
    <div>
        <VueUiBump :dataset="dataset" :config="config"/>
    </div>
</template>