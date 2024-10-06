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
.loader {
    width: 120px;
    height: 120px;
    display: inline-block;
    position: relative;
}

.loader-dark::after,
.loader-dark::before {
    border: 3px solid #FFF;
}

.loader-light::after,
.loader-light::before {
    border: 3px solid #1A1A1A;
}

.loader::after,
.loader::before {
    content: '';
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    animation: animloader 2s linear infinite;
}

.loader::after {
    animation-delay: 1s;
}

@keyframes animloader {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>