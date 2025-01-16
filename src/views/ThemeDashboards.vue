<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import DashboardGold from "../dashboards/DashboardGold.vue";

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
        description: 'Themes',
    }
]);

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    let hash = route.hash ? route.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null;
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

const selectedLink = ref('');

onMounted(() => {
    if (route.hash) {
        selectedLink.value = route.hash.replace('#', '');
        updateCrumb();
    } else {
        updateHash('gold');
        selectedLink.value = themes.value.find(c => c.link === 'gold')
    }
});

function updateHash(link) {
    router.push({ path: route.path, hash: link ? `#${link}` : '' });
    selectedLink.value = link;
    setTimeout(updateCrumb, 100)
}

const themes = computed(() => {
    return [
        { link: 'gold' },
    ]
})

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

    <DashboardGold/>
</template>