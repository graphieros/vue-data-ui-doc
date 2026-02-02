<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const _404 = ref({
    en: "This page cannot be found.",
    fr: "Cette page est introuvable.",
    pt: "Esta página não pode ser encontrada.",
    de: "Diese Seite kann nicht gefunden werden.",
    zh: "此页面无法找到。",
    ja: "このページは見つかりません。",
    es: "Esta página no se puede encontrar.",
    ko: "이 페이지를 찾을 수 없습니다.",
    ar: "يتعذر العثور على هذه الصفحة.",
});

const home = ref({
    en: "Home page",
    fr: "Page d'accueil",
    pt: "Página inicial",
    de: "Startseite",
    zh: "首页",
    ja: "ホームページ",
    es: "Página de inicio",
    ko: "홈페이지",
    ar: "الصفحة الرئيسية",
});
</script>

<template>
    <div class="w-full flex flex-col place-items-center justify-center h-screen gap-6">
        <VueUiIcon name="moodNeutral" stroke="#5f8aee" :size="130" />
        <p class="text-xl" dir="auto">{{ _404[store.lang] }}</p>
        <router-link to="/">
            <button
                class="bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-black font-bold hover:from-app-blue hover:to-app-green transition-colors flex flex-row place-items-center gap-2" dir="auto">
                <VueUiIcon name="homeFilled" stroke="#1A1A1A" />
                {{ home[store.lang] }}
            </button>
        </router-link>
    </div>
</template>
