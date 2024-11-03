<script setup>
import { ref, computed, watch, nextTick } from "vue";
import BaseCrumbs from "../components/BaseCrumbs.vue";
import useExamples from "../useExamples";
import { useMainStore } from "../stores";
import BaseDocActions from "../components/docs/BaseDocActions.vue";
import BaseDocHeaderActions from "../components/BaseDocHeaderActions.vue";

const { examples } = useExamples()
const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode);

const key = ref(0);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

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
})

</script>

<template>
    <div class="my-12 mx-auto text-center max-w-[60ch] flex flex-row place-items-center gap-4" dir="auto">
        <VueUiIcon name="annotator" :stroke="isDarkMode ? '#ff6600' : '#1A1A1A'" />
        ( {{ inProgress[store.lang] }} )
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[1400px] mx-auto flex-wrap place-items-center px-4 sm:px-16 mt-12">
        <div v-for="example in examples" :key="`${example.id}_${key}`" class=" flex-col inline-flex w-full bg-[#FFFFFF] dark:bg-[#2A2A2A] rounded shadow-md" :id="example.id">
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