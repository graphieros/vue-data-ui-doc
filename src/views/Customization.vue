<script setup>
import { ref, computed, watch } from "vue";
import { useMainStore } from "../stores";
import SvgSlot from "../components/customization/SvgSlot.vue";
import LegendSlot from "../components/customization/LegendSlot.vue";
import TooltipSlot from "../components/customization/TooltipSlot.vue";
import OtherSlots from "../components/customization/OtherSlots.vue";
import ColorPalette from "../components/customization/ColorPalette.vue";
import CustomMenu from "../components/customization/CustomMenu.vue";
import MenuSlots from "../components/customization/MenuSlots.vue";
import Watermark from "../components/customization/Watermark.vue";
import LabelFormatter from "../components/customization/LabelFormatter.vue";
import { useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import SourceSlot from "../components/customization/SourceSlot.vue";
import ChartSeeker from "../components/ChartSeeker.vue";
import ComposedComponents from "../components/customization/ComposedComponents.vue";
import { BulbIcon } from "vue-tabler-icons";
import Patterns from "../components/customization/Patterns.vue";
import ColorBridgeIcon from "../components/maker/ColorBridgeIcon.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";

const store = useMainStore();

const router = useRouter();

const currentRoute = computed(() => {
  return router.currentRoute.value.fullPath;
});

const translations = computed(() => {
  return store.translations;
});

const isDarkMode = computed(() => store.isDarkMode);

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
  {
    name: "formatter",
    label: "formatter",
    link: "/customization#formatter",
  },
  {
    name: "source",
    label: "source",
    link: "/customization#source",
  },
  {
    name: 'experiments',
    label: 'Component ideas',
    link: '/customization#experiments'
  },
  {
    name: 'patterns',
    label: 'Patterns',
    link: '/customization#patterns'
  }
]);

const docsCrumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.customization[store.lang],
        link: '/customization'
    },
])

function updateCrumb() {
    window.scrollTo(0,0);
    const hash = router.currentRoute.value.hash || null
    if (docsCrumbs.value.length === 2) {
        docsCrumbs.value.push({
            description: (hash || '').replace('#', '').replace('-', ' ')
        })
    } else {
        docsCrumbs.value[2] = {
            description: (hash || '').replace('#', '').replace('-', ' ')
        }
    }
}

watch(() => router.currentRoute.value, updateCrumb, { deep: true, immediate: true });

</script>

<template>
  <BaseCrumbs :tree="docsCrumbs" noMargin/>
  <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>

  <div class="my-12 w-full mx-auto text-center">

    <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
      <VueUiIcon name="palette" :size="80" :strokeWidth="0.8" class="hidden md:block" :stroke="isDarkMode ? '#de8b37' : '#de8b37'"/>
      <h1 class="text-[64px] sm:text-[96px] text-center">
        {{ translations.menu.customization[store.lang] }}
      </h1>
    </div>
    <div
      class="my-12 max-w-[800px] mx-auto"
    >
      <div class="border border-[#de8b3750] rounded-md p-4 place-items-center justify-center mx-6 grid grid-cols-2 sm:grid-cols-3 gap-2">        
        <router-link v-for="(menuItem, i) in menu" :to="menuItem.link" class="w-full">
          <button
            :class="`w-full transition-colors rounded py-2 px-4 flex flex-row gap-2 place-items-center ${
              currentRoute === menuItem.link ||
              (i === 0 && currentRoute === '/customization')
                ? 'bg-[#de8b3720] text-[#de8b37] border-b border-[#de8b37]'
                : 'hover:bg-[#de8b3720] bg-[#de8b3710]'
            }`"
            @click="selectedMenu = menuItem.name"
          >
            <BulbIcon v-if="menuItem.name === 'experiments'" class="text-black dark:text-app-gold"/>
            {{ menuItem.label }}
          </button>
        </router-link>
        <button class="w-full transition-colors rounded py-2 px-4 flex flex-row gap-2 place-items-center hover:bg-[#de8b3720] bg-[#de8b3710]">
          <a href="https://color-bridge.graphieros.com/" target="_blank" class="flex flex-row gap-2 place-items-center">
            <ColorBridgeIcon/> Color Bridge
          </a>
        </button>
      </div>
    </div>
  </div>
  <SvgSlot
    v-if="
      currentRoute === '/customization#svg-slot' ||
      currentRoute === '/customization'
    "
  />

  <LegendSlot v-if="currentRoute === '/customization#legend-slot'" />
  <TooltipSlot v-if="currentRoute === '/customization#tooltip-slot'" />
  <OtherSlots v-if="currentRoute === '/customization#other-slots'" />
  <ColorPalette v-if="currentRoute === '/customization#palette'" />
  <MenuSlots v-if="currentRoute === '/customization#menu-slots'" />
  <CustomMenu v-if="currentRoute === '/customization#custom-menu'" />
  <Watermark v-if="currentRoute === '/customization#watermark-slot'" />
  <LabelFormatter v-if="currentRoute === '/customization#formatter'" /> 
  <SourceSlot v-if="currentRoute === '/customization#source'"/>
  <Patterns v-if="currentRoute === '/customization#patterns'"/>
  <ComposedComponents v-if="currentRoute === '/customization#experiments'" />

  <ChartSeeker class="mt-12"/>
  <ConfirmCopy/>
</template>
