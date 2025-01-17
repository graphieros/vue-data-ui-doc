<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import DashboardGold from "../dashboards/DashboardGold.vue";
import DashboardHealth from "../dashboards/DashboardHealth.vue";

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

const themes = computed(() => {
    return [
        { link: 'gold', name: 'Gold', backgroundColor: '#fff8e1', color: '#424242' },
        { link: 'life-expectancy', name: 'Life expectancy', backgroundColor: '#f6f6fb', color: '#50606C' },
    ]
})

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>
    <div class="max-w-[1280px] px-12 2xl:px-4 mx-auto relative mt-12">
        <h1 class="text-[36px] text-center">Theme dashboards</h1>
    </div>
    <div class="flex place-items-center mx-auto max-w-[1000px] justify-center">
        <div class="mt-4 flex flex-row gap-4 flex-wrap justify-center">
            <button 
                v-for="theme in themes"
                @click="updateHash(theme.link)"
                :style="{
                    backgroundColor: theme.backgroundColor,
                    color: theme.color,
                    border: `1px solid ${theme.color}`
                }"
                class="px-4 py-2 rounded-md opacity-90 hover:opacity-100 transition-opacity flex flex-row place-items-center gap-2"
            >
                <span v-if="selectedLink === theme.link">⬤</span>
                <span>
                    {{ theme.name }}
                </span>
            </button>
        </div>
    </div>

    <DashboardHealth v-if="selectedLink === 'life-expectancy'"/>
    <DashboardGold v-if="selectedLink === 'gold'"/>
</template>