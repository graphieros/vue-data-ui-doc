<script setup>
import { ref, watch, onMounted, computed } from "vue";
import "tailwindcss/tailwind.css";
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

const touchStartX = ref(0);
const scrollStartX = ref(0);

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

const scrollLeft = () => {
    tabsContainer.value.scrollBy({ left: -100, behavior: 'smooth' });
};

const scrollRight = () => {
    tabsContainer.value.scrollBy({ left: 100, behavior: 'smooth' });
};

const onTouchStart = (event) => {
    touchStartX.value = event.touches[0].clientX;
    scrollStartX.value = tabsContainer.value.scrollLeft;
};

const onTouchMove = (event) => {
    const deltaX = touchStartX.value - event.touches[0].clientX;
    tabsContainer.value.scrollLeft = scrollStartX.value + deltaX;
};

const onTouchEnd = () => {
    updateScrollButtons();
};


onMounted(updateScrollButtons);
watch(tabsContainer, updateScrollButtons);

const emit = defineEmits(['tabSelected']);
const selectTab = (item) => {
    emit('tabSelected', item);
};
</script>

<template>
    <div class="relative w-full flex items-center border-gray-700 border-b">
        <button v-if="canScrollLeft" @click="scrollLeft"
            class="absolute -left-4 p-2 bg-gray-100 dark:bg-[#3A3A3A] rounded-full shadow-md z-10 border-l-2 border-app-blue dark:border-[#8A8A8A]">
            <VueUiIcon name="arrowLeft" :stroke="isDarkMode ? '#CCCCCC' : '#5A5A5A'"/>
            <i class="fas fa-chevron-left"></i>
        </button>

        <div ref="tabsContainer" class="flex select-none overflow-x-auto space-x-4 scrollbar-hide w-full px-8" @scroll="onScroll">
            <div v-for="(item, index) in items" :key="index" :style="{ color: item.color, background: activeTab === item.order ? `${item.color}20` : 'transparent', borderBottom: activeTab === item.order ? `2px solid ${item.color}` : '2px solid transparent' }"
                :class="`flex flex-col items-center text-center justify-center cursor-pointer p-2 min-w-[80px] rounded-tl-md rounded-tr-md gap-2`" @click="selectTab(item)">
                <IconSettings v-if="item.icon === 'settings'" :stroke="isDarkMode ? '#5F8BEE' : '#1A1A1A'" :size="26" />
                <VueUiIcon v-else :name="item.icon" :stroke="item.color" />
                <span class="text-sm" dir="auto">{{ item.name }}</span>
            </div>
        </div>

        <button v-if="canScrollRight" @click="scrollRight"
            class="absolute -right-4 p-2 bg-gray-100 dark:bg-[#3A3A3A] rounded-full shadow-md z-10 border-r-2 border-app-blue dark:border-[#8A8A8A]">
            <VueUiIcon name="arrowRight" :stroke="isDarkMode ? '#CCCCCC' : '#5A5A5A'"/>
        </button>
    </div>
</template>

<style scoped>
.scrollbar-hide {
    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>