<script setup>
import { ref, computed, useTemplateRef, nextTick } from "vue";
import { VueUiHorizontalBar, VueUiAccordion } from "vue-data-ui";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});

const detailsRef = useTemplateRef("detailsRef");

async function close() {
    detailsRef.value.removeAttribute("open");
    await nextTick();
    detailsRef.value.scrollIntoView({
        block: "end",
        behavior: "smooth",
    });
}

const dataset = computed(() =>
    props.data.map((dp) => ({
        ...dp,
        color: "#5f8aee",
    })),
);

const chartHeight = computed(() => {
    const imposedPadding = 24;
    const unitHeight = 12;
    const minUnitHeight = 36;
    const baseHeight = dataset.value.length * unitHeight + imposedPadding;
    return Math.max(minUnitHeight, baseHeight);
});

const config = computed(() => ({
    userOptions: { show: false },
    style: {
        chart: {
            height: chartHeight.value,
            backgroundColor: "transparent",
            color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
            legend: {
                show: false,
            },
            layout: {
                highlighter: {
                    opacity: 0,
                },
                bars: {
                    gap: 3,
                    borderRadius: 1,
                    dataLabels: {
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 8,
                    },
                    nameLabels: {
                        color: isDarkMode.value ? "#CCCCCC" : "#1A1A1A",
                        fontSize: 8,
                    },
                },
            },
            tooltip: { show: false },
        },
    },
}));
</script>

<template>
    <div>
        <details ref="detailsRef">
            <summary class="select-none cursor-pointer">
                View keywords as horizontal bars
            </summary>
            <VueUiHorizontalBar :dataset :config />
            <button
                class="py-2 px-4 bg-[#CCCCCC] dark:bg-[#FFFFFF10] hover:bg-[#FAFAFA] dark:hover:bg-[#FFFFFF20] mt-2 rounded"
                @click="close"
            >
                Close
            </button>
        </details>
    </div>
</template>
