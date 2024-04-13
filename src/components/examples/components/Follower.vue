<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../../../stores";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const isFetching = computed(() => store.isFetching);

const position = ref({
    x: -100,
    y: -100
})

function setClientPosition({ clientX, clientY, ...rest }) {
    position.value.x = clientX - 50;
    position.value.y = clientY - 50;
  }
  
  function setFingerPosition(data) {
    position.value.x = data.targetTouches[0].clientX - 50;
    position.value.y = data.targetTouches[0].clientY - 50;
}

onMounted(() => {
    const vdui = document.getElementById('app');
    vdui.addEventListener('mousemove', setClientPosition);
    vdui.addEventListener('touchmove', setFingerPosition);
})

onBeforeUnmount(() => {
    const vdui = document.getElementById('app');
    vdui.removeEventListener('mousemove', setClientPosition);
    vdui.removeEventListener('touchmove', setFingerPosition);
})

</script>

<template>
    <svg class="invisible sm:visible" :style="`z-index: 9999999999; pointer-events: none;background: transparent; position:fixed; top:${position.y}px; left:${position.x}px;`" viewBox="0 0 100 100" height="100" width="100">
        <defs>
            <radialGradient id="follower" fy="30%" fx="30%">
                <stop offset="10%" stop-color="#FFFFFF10" />
                <stop offset="95%" stop-color="transparent" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="url(#follower)" :stroke="isDarkMode ? '#CCCCCC20' : '#1A1A1A20'"/>
        <circle cx="50" cy="50" r="49" fill="none" stroke="#42d392" :class="{'follower-action': !isFetching, 'follower-action-fetching': isFetching}"/>
    </svg>
</template>

<style scoped>
.follower-action {
    animation: follow infinite linear 20s;
    stroke-dasharray: 308;
    stroke-dashoffset: 310;
    transform-origin: center;
}
.follower-action-fetching {
    animation: follow infinite linear 1s;
    stroke-dasharray: 300;
    stroke-dashoffset: 310;
    transform-origin: center;
}

@keyframes follow {
    to {
        transform: rotate(360deg);
    }
}

</style>