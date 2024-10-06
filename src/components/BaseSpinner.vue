<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => {
    return store.isDarkMode;
})

</script>

<template>
    <div class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <span :class="{ 'loader': true, 'loader-dark': isDarkMode, 'loader-light': !isDarkMode }"></span>
    </div>
</template>

<style scoped>

.loader-dark {
    border-top: 4px solid #FFF;
}

.loader-light {
    border-top: 4px solid #1A1A1A;
}

.loader {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: inline-block;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

.loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border-bottom: 4px solid #42d392;
    border-left: 4px solid transparent;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>