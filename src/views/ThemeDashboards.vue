<script setup>
import { ref, computed, onMounted, watch, markRaw } from "vue";
import { useMainStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import DashboardGold from "../dashboards/DashboardGold.vue";
import DashboardHealth from "../dashboards/DashboardHealth.vue";
import DashboardIT from "../dashboards/DashboardIT.vue";
import DashboardMonochrome from "../dashboards/DashboardMonochrome.vue";
import { adaptColorToBackground } from "../components/maker/lib";
import BasePageMenu from "../components/BasePageMenu.vue";
import { ChevronUpIcon, CurrencyEuroIcon, DeviceDesktopAnalyticsIcon, LeafIcon, PaintIcon } from "vue-tabler-icons";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => store.translations);

const router = useRouter();
const route = useRoute();

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    },
    {
        description: 'Theme dashboards',
    }
]);

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    let hash = route.hash ? capitalizeFirstLetter(route.hash.replace('#', '')).replaceAll('-', ' ') : null;
    if (hash === 'VueUiSparkhistogram') {
        hash = 'VueUiSparkHistogram'
    }
    const hashIcon = hash ? themes.value.find(c => c.component === hash) ? themes.value.find(c => c.component === hash).icon : undefined : undefined

    if (crumbs.value.length === 3) {
        crumbs.value.push({
            description: hash,
            icon: hashIcon
        })
    } else {
        crumbs.value[3] = {
            description: hash,
            icon: hashIcon
        }
    }
}

const selectedLink = ref('gold');

onMounted(() => {
    if (route.hash) {
        selectedLink.value = route.hash.replace('#', '');
        updateCrumb();
    } else {
        updateHash('gold');
        selectedLink.value = 'gold'
    }
});

function updateHash(link) {
    router.push({ path: route.path, hash: link ? `#${link}` : '' });
    selectedLink.value = link;
    setTimeout(updateCrumb, 100)
}

const baseColor = ref('#1f77b4')

const themes = computed(() => {
    return [
        { link: 'gold', name: 'Gold', backgroundColor: '#fff8e1', color: '#424242', icon: markRaw(CurrencyEuroIcon) },
        { link: 'life-expectancy', name: 'Life expectancy', backgroundColor: '#f6f6fb', color: '#50606C', icon: markRaw(LeafIcon) },
        { link: 'it-industry', name: 'IT industry', backgroundColor: '#f6f6fb', color: '#50606C', icon: markRaw(DeviceDesktopAnalyticsIcon) },
        { link: 'monochrome', name: 'Monochrome', backgroundColor: baseColor.value, color: adaptColorToBackground(baseColor.value), icon: markRaw(PaintIcon) },
    ]
})

watch(() => selectedLink.value, () => {
    baseColor.value = '#1f77b4';
})

function changeBaseColor(c) {
    baseColor.value = c;
}

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative mt-12">
        <h1 class="text-[36px] text-center">Theme dashboards</h1>
    </div>

    <BasePageMenu :items="themes" class="max-w-[1200px] mx-auto mt-6">
        <template #item="{ item }">
            <button
                :class="`h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] rounded-lg p-2 flex flex-col place-items-center justify-between relative`"
                @click="updateHash(item.link)"
                :style="{
                    backgroundColor: item.backgroundColor,
                    color: item.color,
                    opacity: selectedLink === item.link ? 1 : 0.6
                }"
            >
                <div class="h-fit w-fit flex place-items-center justify-center">
                    <component :is="item.icon" :color="item.color" :size="isMobile ? 22 : 32" :stroke-width="1.5"/>
                </div>
                <div class="text-sm" :style="{
                    lineHeight: isMobile ? '16px' : '20px',
                }">
                    {{ item.name }}
                </div>
                <ChevronUpIcon v-if="selectedLink === item.link" class="absolute -bottom-[20px] left-1/2 -translate-x-1/2 text-[#1A1A1A] dark:text-[#CCCCCC]"/>
            </button>
        </template>
    </BasePageMenu>

    <DashboardHealth v-if="selectedLink === 'life-expectancy'"/>
    <DashboardGold v-if="selectedLink === 'gold'"/>
    <DashboardIT v-if="selectedLink ===  'it-industry'"/>
    <DashboardMonochrome v-if="selectedLink === 'monochrome'" @changeBaseColor="changeBaseColor" />
</template>