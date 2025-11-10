<script setup>
import { ref, computed, watch, markRaw, onMounted } from "vue";
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
import { BulbIcon, CategoryIcon, CubeUnfoldedIcon, ExternalLinkIcon, GridPatternIcon, ListIcon, MathFunctionIcon, Menu2Icon, MicroscopeIcon, PaletteIcon, RegisteredIcon, SvgIcon, TextCaptionIcon, TooltipIcon } from "vue-tabler-icons";
import Patterns from "../components/customization/Patterns.vue";
import ColorBridgeIcon from "../components/maker/ColorBridgeIcon.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import BaseCard from "../components/BaseCard.vue";
import BasePageMenu from "../components/BasePageMenu.vue";
import useMobile from "../useMobile";
import BackgroundPattern from "../components/BackgroundPattern.vue";
import BaseMenuPattern from "../components/BaseMenuPattern.vue";

const store = useMainStore();
const router = useRouter();
const { isMobile } = useMobile();

const currentRoute = computed(() => {
  return router.currentRoute.value.fullPath;
});

const translations = computed(() => {
  return store.translations;
});

const isDarkMode = computed(() => store.isDarkMode);

const selectedMenu = ref("svgSlot");

function isSelected(item, index) {
  return currentRoute.value === item.link || (index === 0 && currentRoute.value === '/customization');
}

const menu = ref([
  { 
    name: "svgSlot", 
    label: "#svg slot", 
    link: "/customization#svg-slot",
    icon: markRaw(SvgIcon)
  },
  {
    name: "legendSlot",
    label: "#legend slot",
    link: "/customization#legend-slot",
    icon: markRaw(ListIcon)
  },
  {
    name: "tooltipSlot",
    label: "tooltip slots",
    link: "/customization#tooltip-slot",
    icon: markRaw(TooltipIcon)
  },
  {
    name: "otherSlots",
    label: "other slots",
    link: "/customization#other-slots",
    icon: markRaw(CubeUnfoldedIcon)
  },
  { 
    name: "colorPalette", 
    label: "palette", 
    link: "/customization#palette",
    icon: markRaw(PaletteIcon)
  },
  { 
    name: "menuSlots", 
    label: "menu slots", 
    link: "/customization#menu-slots",
    icon: markRaw(Menu2Icon)
  },
  {
    name: "customMenu",
    label: "custom menu",
    link: "/customization#custom-menu",
    icon: markRaw(CategoryIcon)
  },
  {
    name: "watermark",
    label: "watermark",
    link: "/customization#watermark-slot",
    icon: markRaw(RegisteredIcon)
  },
  {
    name: "formatter",
    label: "formatter",
    link: "/customization#formatter",
    icon: markRaw(MathFunctionIcon)
  },
  {
    name: "source",
    label: "source",
    link: "/customization#source",
    icon: markRaw(TextCaptionIcon)
  },
  {
    name: 'experiments',
    label: 'Component ideas',
    link: '/customization#experiments',
    icon: markRaw(BulbIcon)
  },
  {
    name: 'patterns',
    label: 'Patterns',
    link: '/customization#patterns',
    icon: markRaw(GridPatternIcon)
  },
  {
    name: 'colorBridge',
    label: 'Color Bridge',
    link: 'https://color-bridge.graphieros.com/',
    icon: ''
  }
]);

watch(() => router.currentRoute.value, (v) => {
  const hash = router.currentRoute.value.hash;
  if (!hash) {
    selectedMenu.value  = 'svgSlot';
  } else {
      const currentMenu = menu.value.find(el => el.link.split('#')[1] === hash.replaceAll('#', ''));
  selectedMenu.value = currentMenu.name || 'svgSlot'
  }
}, { immediate: true })

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
  <BackgroundPattern v-if="isDarkMode">
        <template #defs>
            <BaseMenuPattern
                menu="customization"
                id="pat"
                stroke="#de8b37"
                patternTransform="scale(0.5) rotate(45)"
                strokeWidth="0.5"
            />
        </template>
    </BackgroundPattern>
  <BaseCrumbs :tree="docsCrumbs" noMargin/>
  <div :class="{'vdui': isDarkMode, 'pointer-events-none': true}"/>

  <div class="my-12 w-full mx-auto text-center max-w-[1200px]">

    <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
      <VueUiIcon class="hidden md:block" name="palette" :size="80" :strokeWidth="0.8" :stroke="isDarkMode ? '#de8b37' : '#de8b37'"/>
      <h1 class="font-inter-bold text-[36px] sm:text-[72px] text-center">
        {{ translations.menu.customization[store.lang] }}
      </h1>
    </div>

    <BasePageMenu :items="menu">
      <template #item="{ item, index }">
        <component :is="item.link.startsWith('http') ? 'a' : 'router-link'" :to="item.link" :target="item.link.startsWith('http') ? '_blank' : '_self'" :href="item.link">
          <button
              :class="`relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] rounded-lg p-2 flex flex-col place-items-center justify-between ${isSelected(item, index) ? 'bg-gradient-to-b from-[#efb376] to-[#de8b37] dark:from-[#de8b3770] dark:to-[#de8b3720]' : 'bg-white dark:bg-[#de8b3715] hover:bg-[#FBFBFB] dark:hover:bg-[#de8b3730] '} transition-colors`"
              @click="selectedMenu = item.name"
          >
              <div class="h-fit w-fit flex place-items-center justify-center relative">
                  <ColorBridgeIcon v-if="item.name === 'colorBridge'"/>
                  <component v-else :is="item.icon" :color="isDarkMode ? item.name === 'experiments' ? '#fdd663' : '#de8b37' : '#1A1A1A'" :size="isMobile ? 22 : 32" :stroke-width="1.5"/>
                </div>
                <ExternalLinkIcon v-if="item.name === 'colorBridge'" class="absolute top-1 right-1" :size="18"/>
              <div class="text-sm" :style="{
                  lineHeight: isMobile ? '16px' : '20px'
              }">
                  {{ item.label }}
              </div>
          </button>
        </component>
      </template>
    </BasePageMenu>
  </div>

  <h2 class="text-center text-4xl font-inter-medium w-full mx-auto max-w-[1200px]">
    {{ menu.find(el => el.name === selectedMenu).label }}
  </h2>

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
