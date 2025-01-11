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
        <img class="loader-logo fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" alt="Vue Data UI logo" src="../assets/logo.png" width="80" height="80"/>
        <span :class="{ 'loader': true, 'loader-dark': isDarkMode, 'loader-light': !isDarkMode }"></span>
    </div>
</template>

<style scoped>

.loader-dark,
.loader-light {
    border-top: 4px solid #5f8aee;
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

.loader-logo {
    animation: loader-logo 1s infinite alternate-reverse;
}

@keyframes loader-logo {
    from {
        transform: translateX(-50%) translateY(-50%) scale(0.5);
    }
    to {
        transform: translateX(-50%) translateY(-50%) scale(1);
    }
}
</style>