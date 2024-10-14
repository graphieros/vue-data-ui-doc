<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import SvgSlot from "../components/customization/SvgSlot.vue";
import LegendSlot from "../components/customization/LegendSlot.vue";
import TooltipSlot from "../components/customization/TooltipSlot.vue";
import OtherSlots from "../components/customization/OtherSlots.vue";
import ColorPalette from "../components/customization/ColorPalette.vue";
import CustomMenu from "../components/customization/CustomMenu.vue";
import MenuSlots from "../components/customization/MenuSlots.vue";
import Watermark from "../components/customization/Watermark.vue";
import { useRouter } from "vue-router";
import BaseCustomizationBox from "../components/customization/BaseCustomizationBox.vue";

const store = useMainStore();

const router = useRouter();

const currentRoute = computed(() => {
  return router.currentRoute.value.fullPath;
});

const translations = computed(() => {
  return store.translations;
});

function isSelected(route) {
  return currentRoute.value === route;
}

const selectedMenu = ref("svgSlot");
const menu = ref([
  { name: "svgSlot", label: "#svg slot", link: "/customization#svg-slot" },
  {
    name: "legendSlot",
    label: "#legend slot",
    link: "/customization#legend-slot",
  },
  {
    name: "tooltipSlot",
    label: "tooltip slots",
    link: "/customization#tooltip-slot",
  },
  {
    name: "otherSlots",
    label: "other slots",
    link: "/customization#other-slots",
  },
  { name: "colorPalette", label: "palette", link: "/customization#palette" },
  { name: "menuSlots", label: "menu slots", link: "/customization#menu-slots" },
  {
    name: "customMenu",
    label: "custom menu",
    link: "/customization#custom-menu",
  },
  {
    name: "watermark",
    label: "watermark",
    link: "/customization#watermark-slot",
  },
]);
</script>

<template>
  <div class="my-12 w-full mx-auto text-center">
    <h1 class="text-[64px] sm:text-[96px] text-center">
      {{ translations.menu.customization[store.lang] }}
    </h1>
    <div
      class="flex flex-row flex-wrap gap-4 place-items-center justify-center my-12"
    >
      <router-link v-for="menuItem in menu" :to="menuItem.link">
        <button
          :class="`transition-colorsrounded py-2 px-4 ${
            currentRoute === menuItem.link
              ? 'bg-[#5f8bee20] text-app-blue border-b border-app-blue'
              : 'hover:bg-[#5f8bee10]'
          }`"
          @click="selectedMenu = menuItem.name"
        >
          {{ menuItem.label }}
        </button>
      </router-link>
    </div>
  </div>
  <SvgSlot v-if="currentRoute === '/customization#svg-slot'" />

  <LegendSlot v-if="currentRoute === '/customization#legend-slot'" />
  <TooltipSlot v-if="currentRoute === '/customization#tooltip-slot'" />
  <OtherSlots v-if="currentRoute === '/customization#other-slots'" />
  <ColorPalette v-if="currentRoute === '/customization#palette'" />
  <MenuSlots v-if="currentRoute === '/customization#menu-slots'" />
  <CustomMenu v-if="currentRoute === '/customization#custom-menu'" />
  <Watermark v-if="currentRoute === '/customization#watermark-slot'" />
</template>
