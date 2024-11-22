<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "../stores";

const props = defineProps({
    selectedIndexOnLoad: {
        type: Number,
        default: null
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
    <div ref="menu" class="relative w-full flex items-center border-gray-700 px-6">
        <button v-if="canScrollLeft" 
            @click="scrollToNearestElement('left')" 
            @mousedown="startScrolling('left')" 
            @mouseup="stopScrolling" 
            @mouseleave="stopScrolling"
            @touchstart="startScrolling('left')" 
            @touchend="stopScrolling"
            class="absolute -left-4 p-2 bg-gradient-to-b bg-gray-200 dark:bg-[#2A2A2A] rounded-tr rounded-br shadow-md z-10 h-full hover:bg-[#abc2f6] dark:hover:bg-[#3A3A3A] transition-colors">
            <VueUiIcon name="arrowLeft" :stroke="isDarkMode ? '#8A8A8A' : '#1A1A1A'" />
        </button>

        <div ref="tabsContainer" class="flex select-none overflow-x-auto space-x-4 scrollbar-hide w-full px-8"
            @scroll="onScroll">
            <slot name="content" />
        </div>

        <button v-if="canScrollRight" 
            @click="scrollToNearestElement('right')" 
            @mousedown="startScrolling('right')" 
            @mouseup="stopScrolling" 
            @mouseleave="stopScrolling"
            @touchstart="startScrolling('right')" 
            @touchend="stopScrolling"
            class="absolute -right-4 p-2 bg-gradient-to-b bg-gray-200 dark:bg-[#2A2A2A] rounded-tl rounded-bl shadow-md z-10 h-full hover:bg-[#abc2f6] dark:hover:bg-[#3A3A3A] transition-colors">
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
