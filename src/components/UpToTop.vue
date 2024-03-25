<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const scrollY = ref(0)

onMounted(() => {
    window.addEventListener('scroll', setScrollY)
})

onUnmounted(() => {
    window.removeEventListener('scroll', setScrollY)
})

function setScrollY(e){
    console.log(e)
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
        <button @click="toTop" v-if="isScrolled" class="z-50 fixed bottom-4 right-2 rounded-full p-2 flex place-items-center justify-center topButton border border-app-green hover:bg-[#42d39220] transition-colors">
            <VueUiIcon name="arrowTop" stroke="#42d392"/>
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