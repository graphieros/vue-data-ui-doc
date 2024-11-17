<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { GripVerticalIcon } from "vue-tabler-icons";

const draggableElement = ref(null);
const isDragging = ref(false);
let startY = 0;
let elementTop = 0;

const startDrag = (event) => {
    isDragging.value = true;
    startY = event.type === "touchstart" ? event.touches[0].clientY : event.clientY;
    elementTop = draggableElement.value.offsetTop;
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
    const windowHeight = window.innerHeight;
    const elementHeight = draggableElement.value.offsetHeight;

    if (newTop < 90) {
        newTop = 90;
    } else if (newTop + elementHeight > windowHeight - 64) {
        newTop = windowHeight - elementHeight - 64;
    }

    draggableElement.value.style.top = `${newTop}px`;
};

const endDrag = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchmove", handleDrag);
    window.removeEventListener("touchend", endDrag);
};

onMounted(() => {
    const elementHeight = draggableElement.value.offsetHeight;
    draggableElement.value.style.top = `${(window.innerHeight - elementHeight) / 2
        }px`;
});

onUnmounted(() => {
    endDrag();
});
</script>

<template>
    <div ref="draggableElement"
        class="hidden sm:block fixed left-0 bg-gradient-to-br from-app-blue-light to-app-blue text-white p-4 rounded-r shadow-md cursor-move select-none py-6"
        @mousedown="startDrag" @touchstart="startDrag">
        <GripVerticalIcon class="absolute top-1 right-0" size="16" />
        <slot />
    </div>
</template>

<style scoped>
.cursor-move {
    cursor: move;
}
</style>
