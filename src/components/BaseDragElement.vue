<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { GripHorizontalIcon } from "vue-tabler-icons";

const props = defineProps({
    snapOnResize: {
        type: Boolean,
        default: false
    }
})

const draggableElement = ref(null);
const isDragging = ref(false);
const isInteracting = ref(false);

let startY = 90;
let startX = 0;
let elementTop = 0;
let elementLeft = 0;

const startDrag = (event) => {
    if(isInteracting.value) return;
    isDragging.value = true;
    startY = event.type === "touchstart" ? event.touches[0].clientY : event.clientY;
    startX = event.type === 'touchStart' ? event.touches[0].clientX : event.clientX;
    elementTop = draggableElement.value.offsetTop;
    elementLeft = draggableElement.value.offsetLeft;
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

    const currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
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
    }
    
    if (newLeft > windowWidth - elementWidth - 24){
        newLeft = windowWidth - elementWidth - 24
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

onMounted(() => {
    draggableElement.value.style.top = `${120}px`;
    const elementWidth = draggableElement.value.offsetWidth;
    draggableElement.value.style.left = `${(window.innerWidth - elementWidth - 42)
        }px`;

    if (props.snapOnResize) {
        window.addEventListener('resize', snapRight)
    }
});

function snapRight(e) {
    const windowWidth = window.innerWidth;
    const elementWidth = draggableElement.value.offsetWidth;
    draggableElement.value.style.left = `${windowWidth - elementWidth - 24}px`
}

onUnmounted(() => {
    endDrag();
});
</script>

<template>
    <div ref="draggableElement"
        class="hidden sm:block fixed left-0 bg-gradient-to-br bg-white dark:bg-[#2A2A2A] p-4 pt-12 rounded cursor-move select-none py-6"
        style="box-shadow: 0 6px 12px rgba(0,0,0,0.5); z-index: 1000"
        @mousedown="startDrag" @touchstart="startDrag">
        <GripHorizontalIcon class="absolute top-3 left-1/2 -translate-x-1/2" size="20"/>
        
        <div @mousedown="isInteracting = true" @mouseup="isInteracting = false" style="cursor: initial">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.cursor-move {
    cursor: move;
}
</style>
