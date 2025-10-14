<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "../stores";

const props = defineProps({
    selectedIndexOnLoad: {
        type: Number,
        default: null
    },
    containerClass: {
        type: String,
        default: ''
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const tabsContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
let scrollInterval = null;

const updateScrollButtons = () => {
    const container = tabsContainer.value;
    if (container) {
        canScrollLeft.value = container.scrollLeft > 0;
        canScrollRight.value =
            container.scrollLeft < container.scrollWidth - container.clientWidth;
    }
};

watch(() => props.selectedIndexOnLoad, (newIndex, oldIndex) => {
    if(newIndex !== oldIndex) {
        updateMenu()
    }
})

const scrollToNearestElement = (direction) => {
    const container = tabsContainer.value;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const children = Array.from(container.children);

    if (direction === "left") {
        for (let i = children.length - 1; i >= 0; i -= 1) {
            const childRect = children[i].getBoundingClientRect();
            if ((childRect.left + 24) < containerRect.left) {
                container.scrollTo({
                    left: children[i].offsetLeft - 24,
                    behavior: "smooth",
                });
                break;
            }
        }
    } else if (direction === "right") {
        for (const child of children) {
            const childRect = child.getBoundingClientRect();
            if ((childRect.right + 20) > containerRect.right) {
                container.scrollTo({
                    left: child.offsetLeft - container.clientWidth + child.clientWidth + 24,
                    behavior: "smooth",
                });
                break;
            }
        }
    }
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
    updateScrollButtons();
    nextTick(() => {
        if (props.selectedIndexOnLoad !== null && tabsContainer.value) {
            const children = Array.from(tabsContainer.value.children);
            tabsContainer.value.scrollTo({
                left: children[props.selectedIndexOnLoad].offsetLeft - 24,
                behavior: "smooth",
            });
        }
    });
}

const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            updateMenu()
        }
    })

onMounted(() => {
    updateMenu();

    if (menu.value) {
        resizeObserver.observe(menu.value)
    }
});

onBeforeUnmount(() => {
    resizeObserver.disconnect()
})

onUnmounted(() => {
    stopScrolling();
});

</script>

<template>
    <div ref="menu" class="relative bg-gray-200 dark:bg-[#1A1A1A] rounded-2xl flex items-center px-6 shadow-[inset_0_2px_2px_rgba(0,0,0,0.1),0_2px_2px_#FFFFFF] dark:shadow-[inset_0_2px_2px_rgba(0,0,0,0.5),0_2px_2px_#FFFFFF40] mx-[24px]" style="width: calc(100% - 48px)">
        <button v-show="canScrollLeft" 
            @click="scrollToNearestElement('left')" 
            @mousedown="startScrolling('left')" 
            @mouseup="stopScrolling" 
            @mouseleave="stopScrolling"
            @touchstart="startScrolling('left')" 
            @touchend="stopScrolling"
            class="absolute -left-5 p-2 bg-gray-100 dark:bg-[#3A3A3A] rounded-l-full z-10 hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]" style="height: calc(100% + 4px)">
            <VueUiIcon name="arrowLeft" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'" />
        </button>

        <div ref="tabsContainer" :class="`flex select-none overflow-x-auto space-x-4 scrollbar-hide w-full px-8 ${containerClass}`"
            @scroll="onScroll">
            <slot name="content" />
        </div>

        <button v-show="canScrollRight" 
            @click="scrollToNearestElement('right')" 
            @mousedown="startScrolling('right')" 
            @mouseup="stopScrolling" 
            @mouseleave="stopScrolling"
            @touchstart="startScrolling('right')" 
            @touchend="stopScrolling"
            class="absolute -right-5 p-2 bg-gray-100 dark:bg-[#3A3A3A] rounded-r-full z-10 hover:bg-gray-50 dark:hover:bg-[#4A4A4A] transition-all shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]" style="height: calc(100% + 4px)">
            <VueUiIcon name="arrowRight" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'" />
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
