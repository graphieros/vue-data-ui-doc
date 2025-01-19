<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const scrollY = ref(0)

onMounted(() => {
    window.addEventListener('scroll', setScrollY)
})

onUnmounted(() => {
    window.removeEventListener('scroll', setScrollY)
})

function setScrollY(e){
    scrollY.value = window.scrollY
}

const isScrolled = computed(() => {
    return scrollY.value > 600;
})

function toTop(){
    window.scrollTo(0,0)
}

</script>

<template>
    <transition name="fade">
        <button @click="toTop" v-if="isScrolled" class="hover:-translate-y-[2px] z-50 fixed bottom-20 right-2 rounded-full p-2 flex place-items-center justify-center topButton border border-app-blue dark:border-app-green hover:bg-[#5f8aee20]  hover:dark:bg-[#42d39220] transition-all hover:shadow-md">
            <VueUiIcon name="arrowTop" :stroke="isDarkMode ? '#42d392' : '#5f8aee'"/>
        </button>
    </transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>