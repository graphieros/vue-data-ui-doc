<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { GripHorizontalIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";

const props = defineProps({
    snapOnResize: {
        type: Boolean,
        default: false
    },
    snapOnLoad: {
        type: Boolean,
        default: false,
    },
    backgroundColor: {
        type: String,
        default: 'bg-white dark:bg-[#2A2A2A]'
    },
    startTop: {
        type: Number,
        default: 120
    },
    resizable: {
        type: Boolean,
        default: false
    },
    width: {
        type: String,
        default: ''
    }
});

const store = useMainStore();

const draggableElement = ref(null);
const isDragging = ref(false);
const isInteracting = ref(false);

const resizeThreshold = 12;

let startY = 90;
let startX = 0;
let elementTop = 0;
let elementLeft = 0;

const startDrag = (event) => {
    if (isInteracting.value) return;

    const clientX = event.type.includes("touch")
        ? event.touches[0].clientX
        : event.clientX;
    const clientY = event.type.includes("touch")
        ? event.touches[0].clientY
        : event.clientY;

    const rect = draggableElement.value.getBoundingClientRect();

    if (
        props.resizable &&
        clientX >= rect.right - resizeThreshold &&
        clientY >= rect.bottom - resizeThreshold
    ) {
        return;
    }

    isDragging.value = true;
    startY = clientY;
    startX = clientX;
    elementTop = rect.top;
    elementLeft = rect.left;

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", handleDrag);
    window.addEventListener("touchend", endDrag);
};

const handleDrag = (event) => {
    if (!isDragging.value) return;

    const currentY =
        event.type === "touchmove" ? event.touches[0].clientY : event.clientY;
    let newTop = elementTop + (currentY - startY);

    const currentX =
        event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
    let newLeft = elementLeft + (currentX - startX);

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const elementHeight = draggableElement.value.offsetHeight;
    const elementWidth = draggableElement.value.offsetWidth;

    if (newTop < 90) {
        newTop = 90;
    } else if (newTop + elementHeight > windowHeight - 64) {
        newTop = windowHeight - elementHeight - 64;
    }

    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft > windowWidth - elementWidth - 24) {
        newLeft = windowWidth - elementWidth - 24;
    }

    draggableElement.value.style.top = `${newTop}px`;
    draggableElement.value.style.left = `${newLeft}px`;
};

const endDrag = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchmove", handleDrag);
    window.removeEventListener("touchend", endDrag);
};

onMounted(async () => {
    if (!draggableElement.value) return;
    draggableElement.value.style.top = `${props.startTop}px`;
    const elementWidth = draggableElement.value.offsetWidth;
    draggableElement.value.style.left = `${window.innerWidth - elementWidth - 42}px`;

    if (props.snapOnResize) {
        window.addEventListener("resize", snapRight);
    }
});

function snapRight(_e) {
    if (!draggableElement.value) return;
    const windowWidth = window.innerWidth;
    const elementWidth = draggableElement.value.offsetWidth;
    draggableElement.value.style.left = `${windowWidth - elementWidth - 24}px`;
}

watch(
    () => store.docSnap,
    async (bool) => {
        if (bool && props.snapOnLoad) {
            await nextTick();
            await nextTick();
            snapRight();
        }
    }
);

onUnmounted(() => {
    endDrag();
});
</script>

<template>
    <div ref="draggableElement" :class="[
        'hidden min-w-[300px] sm:flex fixed left-0 flex-col',
        backgroundColor,
        'p-4 pt-12 rounded cursor-move select-none',
        props.resizable ? 'resize overflow-hidden' : '',
        props.width ? props.width : '',
        'max-h-[calc(100vh-200px)]'
    ]" style="box-shadow: 0 6px 12px rgba(0,0,0,0.5); z-index: 1000" @mousedown="startDrag" @touchstart="startDrag">
        <div class="relative flex-none">
            <slot name="header"/>
            <GripHorizontalIcon class="absolute -top-8 left-1/2 -translate-x-1/2" size="20" />
            <div @mousedown="isInteracting = true" @mouseup="isInteracting = false"
                class="border-t border-gray-500 pt-2" style="cursor: initial">
            </div>
        </div>

        <div @mousedown="isInteracting = true" @mouseup="isInteracting = false" style="cursor: initial"
            class="flex-1 overflow-auto py-4">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.cursor-move {
    cursor: move;
}
</style>
