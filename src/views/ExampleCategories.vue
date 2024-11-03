<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import useExamples from "../useExamples";
import { useMainStore } from "../stores";
import BaseDocHeaderActions from "../components/BaseDocHeaderActions.vue";
import BaseTabContainer from "../components/BaseTabContainer.vue";
import { useRoute, useRouter } from "vue-router";

const { examples } = useExamples()
const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode); 
const router = useRouter();
const route = useRoute();
const translations = computed(() => store.translations);

const key = ref(0);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const crumbs = ref([
    {
        description: translations.value.menu.docs[store.lang],
        link: '/docs'
    },
    {
        description: translations.value.menu.examples[store.lang],
        link: '/examples'
    }
]);

function updateCrumb() {
    window.scrollTo(0,0);
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    const hash = route.hash ? route.hash.replace('#', '').split('-').map(s => capitalizeFirstLetter(s)).join('') : null

    if (crumbs.value.length === 2) {
        crumbs.value.push({
            description: hash,
        })
    } else {
        crumbs.value[2] = {
            description: hash
        }
    }
}

const categories = ref([
    { 
        link: 'vue-ui-xy', 
        icon: 'chartLine', 
        component: 'VueUiXy',
        thumb: new URL('../assets/thumb_xy.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_xy_light.png', import.meta.url).href,
    },
    { 
        link: 'vue-ui-donut', 
        icon: 'chartDonut', 
        component: 'VueUiDonut',
        thumb: new URL('../assets/thumb_donut.png', import.meta.url).href,
        thumbLight: new URL('../assets/thumb_donut_light.png', import.meta.url).href,
    }
]);

const inProgress = ref({
    en: 'This page is new, many more examples will be added and organized.',
    fr: 'Cette page est nouvelle, de nombreux autres exemples seront ajoutés et organisés.',
    pt: 'Esta página é nova, muitos mais exemplos serão adicionados e organizados.',
    de: 'Diese Seite ist neu, viele weitere Beispiele werden hinzugefügt und organisiert.',
    zh: '此页面为新建，将会添加和整理更多示例。',
    jp: 'このページは新しく、多くの例が追加され、整理される予定です。',
    es: 'Esta página es nueva, se agregarán y organizarán muchos más ejemplos.',
    ko: '이 페이지는 새로 만들어졌으며, 더 많은 예제가 추가되고 정리될 예정입니다.',
    ar: 'هذه الصفحة جديدة، سيتم إضافة وتنظيم المزيد من الأمثلة.'
});

const selectedLink = ref('');

onMounted(() => {
    if (route.hash) {
        selectedLink.value = route.hash.replace('#', '');
        updateCrumb();
    } else {
        updateHash('vue-ui-xy');
    }
});

function updateHash(link) {
    router.push({ path: route.path, hash: link ? `#${link}` : '' });
    selectedLink.value = link;
    setTimeout(updateCrumb, 100)
}

const filteredExamples = computed(() => {
    return examples.value.filter(e => e.link === selectedLink.value)
})

const hoveredLink = ref(null);

</script>

<template>
    <BaseCrumbs :tree="crumbs" noMargin showMobile/>

    <!-- CHART TYPE SELECTION -->
    <div class="fixed top-[87px] left-0 w-full bg-[#F2F3F6] dark:bg-[#232323] z-50 py-4 drop-shadow-md">
        <div class="w-full max-w-[1400px] mx-auto px-4 sm:px-12">
            <BaseTabContainer>
                <template #content>
                    <div v-for="category in categories" class="relative rounded w-[100px] sm:w-[150px] h-[100px] sm:h-[100px] flex-shrink-0 bg-[#F2F3F6] dark:bg-[#232323]" @mouseover="hoveredLink = category" @mouseleave="hoveredLink = null">
                        <button @click="updateHash(category.link)" :class="`p-2 flex flex-col place-items-center justify-center h-full w-full rounded border ${selectedLink === category.link ? 'border-app-blue' : 'border-transparent'}`">
                            <img class="h-full rounded" :src="isDarkMode ? category.thumb : category.thumbLight">
                        </button>
                        <Transition name="fade">
                            <div style="width: calc(100% - 2px)" class="text-shadow-md absolute top-0 left-[1px] pointer-events-none bg-[#1A1A1A10] dark:bg-[#FFFFFF10] h-full flex place-items-end justify-center" v-if="(hoveredLink && hoveredLink.link === category.link) || selectedLink === category.link">
                                <div class="w-full pb-3 pt-2 text-center bg-[#1A1A1A80] text-white">
                                    {{ category.component }}
                                </div>
                            </div>
                        </Transition>
                    </div>
                </template>
            </BaseTabContainer>
        </div>
    </div>

    <div class="px-16 my-12 mx-auto text-center max-w-[60ch] flex flex-col place-items-center gap-4 mt-[200px]" dir="auto">
        <VueUiIcon name="annotator" :stroke="isDarkMode ? '#ff6600' : '#1A1A1A'" />
        {{ inProgress[store.lang] }}
    </div>

    <!-- EXAMPLES DISPLAY -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[1400px] mx-auto flex-wrap place-items-center px-4 sm:px-16 mt-12 sm:mt-20">
        <div v-for="example in filteredExamples" :key="`${example.id}_${key}`" class=" flex-col inline-flex w-full bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded shadow-md" :id="example.id">
            <div dir="auto" class="bg-gray-200 dark:bg-[rgb(35,35,35)] p-4 rounded-t">
                <div class="flex flex-row gap-4 place-items-center">
                    <div class="flex flex-row gap-2 place-items-center pb-5 border-b w-fit border-app-blue dark:border-[#6A6A6A]">
                        <VueUiIcon :name="example.icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        <h2 class="text-gray-800 dark:text-[#1F77B4]">{{ example.component }}</h2>
                    </div>
                    <BaseDocHeaderActions
                        :defaultConfig="false"
                        :customConfig="example.config"
                        :customDataset="example.dataset"
                        justify="justify-start"
                    />
                </div>
                <p class="text-sm">{{  example.description[store.lang] }}</p>
            </div>

            <Suspense>
                <div class="w-full p-4">
                    <VueDataUi :component="example.component" :dataset="example.dataset" :config="example.config"/>
                </div>
            </Suspense>
        </div>
    </div>
</template>