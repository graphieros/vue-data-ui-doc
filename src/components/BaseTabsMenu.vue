<script setup>
import { ref, watch, onMounted, computed } from "vue";
import IconSettings from "./IconSettings.vue";
import { useMainStore } from "../stores";

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    activeTab: {
        type: Number,
        default: 0
    }
});

const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode)

const tabsContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const updateScrollButtons = () => {
    const container = tabsContainer.value;
    if (container) {
        canScrollLeft.value = container.scrollLeft > 0;
        canScrollRight.value = container.scrollLeft < container.scrollWidth - container.clientWidth;
    }
};

const onScroll = () => {
    updateScrollButtons();
};

const scrollLeftButton = () => {
    tabsContainer.value.scrollBy({ left: -100, behavior: 'smooth' });
};

const scrollRightButton = () => {
    tabsContainer.value.scrollBy({ left: 100, behavior: 'smooth' });
};

const onMouseDown = (event) => {
    isDragging.value = true;
    startX.value = event.pageX - tabsContainer.value.offsetLeft;
    scrollLeft.value = tabsContainer.value.scrollLeft;
};

const onMouseMove = (event) => {
    if (!isDragging.value) return;
    const x = event.pageX - tabsContainer.value.offsetLeft;
    const dragVal = (x - startX.value) * 1.3;
    tabsContainer.value.scrollLeft = scrollLeft.value - dragVal;
    updateScrollButtons();
};

const onMouseUpOrLeave = () => {
    isDragging.value = false;
};

const onTouchStart = (event) => {
    startX.value = event.touches[0].clientX;
    scrollLeft.value = tabsContainer.value.scrollLeft;
    isDragging.value = true;
};

const onTouchMove = (event) => {
    if (!isDragging.value) return;
    const deltaX = startX.value - event.touches[0].clientX;
    tabsContainer.value.scrollLeft = scrollLeft.value + deltaX;
};

const onTouchEnd = () => {
    isDragging.value = false;
    updateScrollButtons();
};

onMounted(() => {
    updateScrollButtons();
    if (tabsContainer.value) {
        tabsContainer.value.addEventListener("mousedown", onMouseDown);
        tabsContainer.value.addEventListener("mousemove", onMouseMove);
        tabsContainer.value.addEventListener("mouseup", onMouseUpOrLeave);
        tabsContainer.value.addEventListener("mouseleave", onMouseUpOrLeave);
    }
});

watch(tabsContainer, updateScrollButtons);

const emit = defineEmits(['tabSelected']);
const selectTab = (item) => {
    emit('tabSelected', item);
};
</script>

<template>
    <div class="relative w-full flex items-center border-gray-700">
        <button v-if="canScrollLeft" @click="scrollLeftButton"
            class="absolute -left-4 p-2 bg-gradient-to-b bg-gray-200 dark:bg-[#2A2A2A] rounded-tr rounded-br shadow-md z-10 h-full hover:bg-[#abc2f6] dark:hover:bg-[#3A3A3A] transition-colors">
            <VueUiIcon name="arrowLeft" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"/>
        </button>

        <div
            ref="tabsContainer"
            class="flex select-none overflow-x-auto space-x-4 scrollbar-hide w-full px-8"
            @scroll="onScroll"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <div
                v-for="(item, index) in items"
                :key="index"
                :style="{ color: item.color, background: activeTab === item.order ? `${item.color}20` : undefined, borderBottom: activeTab === item.order ? `2px solid ${item.color}` : '2px solid transparent' }"
                :class="`flex flex-col items-center text-center justify-center cursor-pointer p-2 min-w-[90px] flex-shrink-0 whitespace-nowrap rounded-tl-md rounded-tr-md gap-2 hover:bg-[#1A1A1A10] dark:hover:bg-[#FFFFFF05] transition-colors`"
                @click="selectTab(item)"
            >
                <IconSettings v-if="item.icon === 'settings'" :stroke="isDarkMode ? '#5F8BEE' : '#1A1A1A'" :size="26" />
                <VueUiIcon v-else :name="item.icon" :stroke="item.color" />
                <span class="text-sm" dir="auto">{{ item.name }}</span>
            </div>
        </div>

        <button v-if="canScrollRight" @click="scrollRightButton"
            class="absolute -right-4 p-2 bg-gradient-to-b bg-gray-200 dark:bg-[#2A2A2A] rounded-tl rounded-bl shadow-md z-10 h-full hover:bg-[#abc2f6] dark:hover:bg-[#3A3A3A] transition-colors">
            <VueUiIcon name="arrowRight" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'"/>
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
