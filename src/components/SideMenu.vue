<script setup>
import { ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "vue-tabler-icons";

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

</script>

<template>
    <aside :class="`fixed left-0 top-[49px] ${isOpen ? 'w-[300px]' : 'w-[59px]'} h-[calc(100svh_-_49px)] bg-black overflow-y-auto border-r border-gray-700 p-6`">
    <button class="absolute right-4 top-4" v-if="isOpen" @click="toggle">
        <ChevronLeftIcon class="text-app-green"/>
    </button>
    <button class="absolute top-5 left-1/2 -translate-x-1/2" v-if="!isOpen" @click="toggle">
        <ChevronRightIcon class="text-app-green"/>
    </button>
    <template v-if="isOpen">
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Charts</div>
            <router-link to="/docs#vue-ui-xy" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiXy</div>
            </router-link>
            <router-link to="/docs#vue-ui-donut" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiDonut</div>
            </router-link>
            <router-link to="/docs#vue-ui-waffle" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiWaffle</div>
            </router-link>
            <router-link to="/docs#vue-ui-radar" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiRadar</div>
            </router-link>
            <router-link to="/docs#vue-ui-quadrant" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiQuadrant</div>
            </router-link>
            <router-link to="/docs#vue-ui-gauge" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiGauge</div>
            </router-link>
            <router-link to="/docs#vue-ui-chestnut" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiChestnut</div>
            </router-link>
            <router-link to="/docs#vue-ui-onion" >
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiOnion</div>
            </router-link>
        </section>
        <section class="mb-6">
            <div class="font-satoshi-bold text-app-green">Tables</div>
            <router-link to="/docs#vue-ui-table">
                <div class="pl-6 hover:underline" @click="closeIfOpen">VueUiTable</div>
            </router-link>
        </section>
    </template>
    </aside>
</template>