<script setup>
import { ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, CaretRightIcon } from "vue-tabler-icons";
import { useRouter } from "vue-router";

const router = useRouter();

const currentRoute = computed(() => {
    return router.currentRoute.value.fullPath
})

const isOpen = ref(window.innerWidth > 768);

const emit = defineEmits(['toggle']);

function toggle() {
    isOpen.value = !isOpen.value;
    emit('toggle', isOpen.value);
}

function closeIfOpen(){
    if(window.innerWidth <= 768 && isOpen.value) {
        isOpen.value = false;
        emit('toggle', isOpen.value);
    }
}

function isSelected(route) {
    return currentRoute.value === route;
}

</script>

<template>
    <aside :class="`transition-all fixed left-0 top-[49px] ${isOpen ? 'w-[300px]' : 'w-[59px]'} h-[calc(100svh_-_49px)] bg-black overflow-y-auto border-r border-gray-700 p-6`">
    <button class="absolute right-4 top-4" v-if="isOpen" @click="toggle">
        <ChevronLeftIcon class="text-app-green"/>
    </button>
    <button class="absolute top-5 left-1/2 -translate-x-1/2" v-if="!isOpen" @click="toggle">
        <ChevronRightIcon class="text-app-green animate-ping sm:animate-none"/>
    </button>
    <template v-if="isOpen">
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Charts</div>
            <router-link to="/docs#vue-ui-xy" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-xy') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-xy')" class="-ml-6"/> VueUiXy</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-donut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-donut')" class="-ml-6"/> VueUiDonut</div>
            </router-link>
            <router-link to="/docs#vue-ui-waffle" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-waffle') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-waffle')" class="-ml-6"/> VueUiWaffle</div>
            </router-link>
            <router-link to="/docs#vue-ui-radar" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-radar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-radar')" class="-ml-6"/> VueUiRadar</div>
            </router-link>
            <router-link to="/docs#vue-ui-quadrant" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-quadrant') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-quadrant')" class="-ml-6"/> VueUiQuadrant</div>
            </router-link>
            <router-link to="/docs#vue-ui-gauge" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-gauge') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-gauge')" class="-ml-6"/> VueUiGauge</div>
            </router-link>
            <router-link to="/docs#vue-ui-chestnut" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-chestnut') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-chestnut')" class="-ml-6"/> VueUiChestnut</div>
            </router-link>
            <router-link to="/docs#vue-ui-onion" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-onion') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-onion')" class="-ml-6"/> VueUiOnion</div>
            </router-link>
            <router-link to="/docs#vue-ui-vertical-bar" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-vertical-bar') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-vertical-bar')" class="-ml-6"/> VueUiVerticalBar</div>
            </router-link>
            <router-link to="/docs#vue-ui-sparkline" >
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-sparkline') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-sparkline')" class="-ml-6"/> VueUiSparkline</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Tables</div>
            <router-link to="/docs#vue-ui-table">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-table') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-table')" class="-ml-6"/> VueUiTable</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Rating</div>
            <router-link to="/docs#vue-ui-rating">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-rating') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-rating')" class="-ml-6"/> VueUiRating</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Utilities</div>
            <router-link to="/docs#vue-ui-screenshot">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-screenshot') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-screenshot')" class="-ml-6"/> VueUiScreenshot</div>
            </router-link>
            <router-link to="/docs#vue-ui-skeleton">
                <div :class="`flex transition-all gap-1 pl-6 ${isSelected('/docs#vue-ui-skeleton') ? 'text-app-blue hover:cursor-default' : 'hover:underline'}`" @click="closeIfOpen"><CaretRightIcon v-if="isSelected('/docs#vue-ui-skeleton')" class="-ml-6"/> VueUiSkeleton</div>
            </router-link>
        </section>
    </template>
    </aside>
</template>