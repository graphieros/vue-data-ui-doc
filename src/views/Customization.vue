<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import SvgSlot from "../components/customization/SvgSlot.vue";
import LegendSlot from "../components/customization/LegendSlot.vue";
import TooltipSlot from "../components/customization/TooltipSlot.vue";
import OtherSlots from "../components/customization/OtherSlots.vue";
import ColorPalette from "../components/customization/ColorPalette.vue";
import CustomMenu from "../components/customization/CustomMenu.vue";

const store = useMainStore();

const translations = computed(() => {
  return store.translations;
});

const selectedMenu = ref('svgSlot')
const menu = ref([
    { name: 'svgSlot', label: '#svg slot' },
    { name: 'legendSlot', label: '#legend slot'},
    { name: 'tooltipSlot', label: 'tooltip slots'},
    { name: 'otherSlots', label: 'other slots'},
    { name: 'colorPalette', label: 'palette'},
    { name: 'customMenu', label: 'custom menu'}
]);

</script>

<template>
    <div class="my-12 w-full mx-auto text-center">
        <h1 class="text-3xl flex flex-row gap-4 place-items-center justify-center">
            <img src="../assets/logo.png" class="h-6">
            {{ translations.menu.customization[store.lang] }}
        </h1>
        <div class="flex flex-row flex-wrap gap-4 place-items-center justify-center my-12">
            <button :class="`transition-colorsrounded py-2 px-4 ${selectedMenu === menuItem.name ? 'bg-[#5f8bee20] text-app-blue border-b border-app-blue' : 'hover:bg-[#5f8bee10]'}`" v-for="menuItem in menu" @click="selectedMenu = menuItem.name">{{ menuItem.label }}</button>
        </div>
    </div>
    <SvgSlot v-if="selectedMenu === 'svgSlot'" />
    <LegendSlot v-if="selectedMenu === 'legendSlot'" />
    <TooltipSlot v-if="selectedMenu === 'tooltipSlot'" />
    <OtherSlots v-if="selectedMenu === 'otherSlots'" />
    <ColorPalette v-if="selectedMenu === 'colorPalette'" />
    <CustomMenu v-if="selectedMenu === 'customMenu'" />
</template>