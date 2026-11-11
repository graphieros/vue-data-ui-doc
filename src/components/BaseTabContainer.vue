<script setup>
import {
    ref,
    computed,
    onMounted,
    nextTick,
    onUnmounted,
    onBeforeUnmount,
    watch,
} from "vue";
import { useMainStore } from "../stores";
import {
    tabScrollAvailability,
    nearestTabScrollDelta,
    selectedTabScrollDelta,
} from "./tabScroll.js";

const props = defineProps({
    selectedIndexOnLoad: {
        type: Number,
        default: null,
    },
    containerClass: {
        type: String,
        default: "",
    },
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const isRtl = computed(() => store.lang === "ar");

const tabsContainer = ref(null);
const canScrollStart = ref(false);
const canScrollEnd = ref(false);
let scrollInterval = null;

const updateScrollButtons = () => {
    const container = tabsContainer.value;
    if (!container) return;
    const state = tabScrollAvailability(
        container.getBoundingClientRect(),
        Array.from(container.children, (child) =>
            child.getBoundingClientRect(),
        ),
        isRtl.value,
    );
    canScrollStart.value = state.start;
    canScrollEnd.value = state.end;
};

watch(
    () => props.selectedIndexOnLoad,
    (newIndex, oldIndex) => {
        if (newIndex !== oldIndex) {
            updateMenu();
        }
    },
);

const scrollToNearestElement = (direction) => {
    const container = tabsContainer.value;
    if (!container) return;
    const delta = nearestTabScrollDelta(
        container.getBoundingClientRect(),
        Array.from(container.children, (child) =>
            child.getBoundingClientRect(),
        ),
        direction,
        isRtl.value,
    );
    if (delta) container.scrollBy({ left: delta, behavior: "smooth" });
};

const startScrolling = (direction) => {
    if (scrollInterval) return;
    scrollInterval = setInterval(() => {
        scrollToNearestElement(direction);
    }, 100);
};

const stopScrolling = () => {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
};

const onScroll = () => {
    updateScrollButtons();
};

const menu = ref(null);

function updateMenu() {
    nextTick(() => {
        const container = tabsContainer.value;
        const child = container?.children[props.selectedIndexOnLoad];
        if (props.selectedIndexOnLoad !== null && child) {
            const delta = selectedTabScrollDelta(
                container.getBoundingClientRect(),
                child.getBoundingClientRect(),
                isRtl.value,
            );
            if (Math.abs(delta) > 1)
                container.scrollBy({ left: delta, behavior: "smooth" });
        }
        updateScrollButtons();
    });
}
watch(() => store.lang, updateMenu, { flush: "post" });

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        updateMenu();
    }
});

onMounted(() => {
    updateMenu();

    if (menu.value) {
        resizeObserver.observe(menu.value);
    }
});

onBeforeUnmount(() => {
    resizeObserver.disconnect();
});

onUnmounted(() => {
    stopScrolling();
});
</script>

<template>
    <div
        ref="menu"
        :dir="isRtl ? 'rtl' : 'ltr'"
        class="relative bg-gray-200 dark:bg-[#1A1A1A] rounded-2xl flex items-center px-6 shadow-[inset_0_2px_2px_rgba(0,0,0,0.1),0_2px_2px_#FFFFFF] dark:shadow-[inset_0_2px_2px_rgba(0,0,0,0.5),0_2px_2px_#FFFFFF40] mx-[24px]"
        style="width: calc(100% - 48px)"
    >
        <button
            v-show="canScrollStart"
            data-testid="tab-scroll-start"
            @click="scrollToNearestElement('start')"
            @mousedown="startScrolling('start')"
            @mouseup="stopScrolling"
            @mouseleave="stopScrolling"
            @touchstart="startScrolling('start')"
            @touchend="stopScrolling"
            class="absolute -start-5 p-2 bg-gray-100 dark:bg-[#3A3A3A] rounded-s-full z-10 hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
            style="height: calc(100% + 4px)"
        >
            <VueUiIcon
                :name="isRtl ? 'arrowRight' : 'arrowLeft'"
                :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"
            />
        </button>

        <div
            ref="tabsContainer"
            data-testid="tab-slider"
            :class="`flex select-none overflow-x-auto gap-4 scrollbar-hide w-full px-8 ${containerClass}`"
            @scroll="onScroll"
        >
            <slot name="content" />
        </div>

        <button
            v-show="canScrollEnd"
            data-testid="tab-scroll-end"
            @click="scrollToNearestElement('end')"
            @mousedown="startScrolling('end')"
            @mouseup="stopScrolling"
            @mouseleave="stopScrolling"
            @touchstart="startScrolling('end')"
            @touchend="stopScrolling"
            class="absolute -end-5 p-2 bg-gray-100 dark:bg-[#3A3A3A] rounded-e-full z-10 hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
            style="height: calc(100% + 4px)"
        >
            <VueUiIcon
                :name="isRtl ? 'arrowLeft' : 'arrowRight'"
                :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"
            />
        </button>
    </div>
</template>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
