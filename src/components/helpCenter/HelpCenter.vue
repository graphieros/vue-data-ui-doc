<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../../stores";
import { useHelpStore } from "../../stores/help";
import HelpConfiguration from "./HelpConfiguration.vue";
import HelpDataset from "./HelpDataset.vue";
import HelpVueDataUiComponent from "./HelpVueDataUiComponent.vue";
import HelpNuxt from "./HelpNuxt.vue";

const store = useMainStore();
const help = useHelpStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = computed(() => store.translations);

const helpCenter = ref(null);

function openHelpCenter() {
    if (helpCenter.value) {
        helpCenter.value.showModal();
    }
}

function closeDialog() {
    if (helpCenter.value) {
        helpCenter.value.close();
    }
}

function handleOutsideClick(event) {
    if (helpCenter.value) {
        const rect = helpCenter.value.getBoundingClientRect();
        if (
            event.clientY < rect.top ||
            event.clientY > rect.bottom ||
            event.clientX < rect.left ||
            event.clientX > rect.right
        ) {
            helpCenter.value.close();
        }
    }
}

onMounted(() => {
    if (helpCenter.value) {
        helpCenter.value.addEventListener("click", handleOutsideClick);
    }
});

onBeforeUnmount(() => {
    if (helpCenter.value) {
        helpCenter.value.removeEventListener("click", handleOutsideClick);
    }
});

const linksTranslations = computed(() => {
    return {
        issueLib: {
            en: "Report an issue with the components library",
            fr: "Signaler un problème avec la bibliothèque de composants",
            pt: "Relatar um problema com a biblioteca de componentes",
            de: "Ein Problem mit der Komponentenbibliothek melden",
            zh: "报告组件库的问题",
            jp: "コンポーネントライブラリに関する問題を報告する",
            es: "Reportar un problema con la biblioteca de componentes",
            ko: "컴포넌트 라이브러리 문제 보고",
            ar: "الإبلاغ عن مشكلة في مكتبة المكونات"
        },
        issueSite: {
            en: "Report an issue about this website",
            fr: "Signaler un problème sur ce site web",
            pt: "Relatar um problema neste site",
            de: "Ein Problem mit dieser Website melden",
            zh: "报告有关此网站的问题",
            jp: "このウェブサイトに関する問題を報告する",
            es: "Reportar un problema con este sitio web",
            ko: "이 웹사이트 문제 신고",
            ar: "الإبلاغ عن مشكلة في هذا الموقع"
        }
    }
})

</script>

<template>
    <button @click="openHelpCenter" class="fixed z-50 right-2 top-[92px] flex place-items-center justify-center rounded-full bg-gradient-to-b from-[#ffa793] to-[#dd7963] h-[42px] w-[42px] hover:-translate-y-[2px] transition-all">
        <VueUiIcon name="circleQuestion" stroke="#1A1A1A"/>
        <div class="absolute -bottom-5 text-xs text-app-orange">HELP</div>
    </button>

    <dialog id="dialog" ref="helpCenter" class="shadow-xl fixed p-6 glass h-screen  w-full max-w-[1000px] max-h-[764px] rounded-lg bg-[#e1e5e8] dark:bg-[#2A2A2A] text-black dark:text-gray-300 border border-app-orange overflow-hidden">
        <button @click="closeDialog" class="absolute top-6 right-6 z-50">
            <VueUiIcon name="close" :stroke="isDarkMode ? '#ff6400' : '#1A1A1A'"/>
        </button>
        <div class="w-full flex place-items-center gap-4 px-10 absolute top-6 left-0 text-app-orange">
            <VueUiIcon name="circleQuestion" stroke="#FF6400"/> {{ help.title[store.lang] }}
        </div>
        <div class="h-full max-h-[600px] overflow-auto mt-14 px-4" style="overscroll-behavior: contain;">
            <HelpConfiguration/>
            <HelpDataset/>
            <HelpVueDataUiComponent/>
            <HelpNuxt/>
            <div class="w-full flex flex-col place-items-start border-t border-gray-500 mt-2 pt-4">
                <button class="p-2" dir="auto">
                    <a href="https://github.com/graphieros/vue-data-ui/issues" target="_blank" class="underline text-app-blue">
                        {{ linksTranslations.issueLib[store.lang] }}
                    </a>
                </button>
                <button class="p-2" dir="auto">
                    <a href="https://github.com/graphieros/vue-data-ui-doc/issues" target="_blank" class="underline text-app-blue">
                        {{ linksTranslations.issueSite[store.lang] }}
                    </a>
                </button>
            </div>
        </div>


        <div class="w-full flex place-items-center justify-end absolute bottom-6 right-6 gap-4">
            <button
                class="h-[40px] px-6 rounded-lg border border-app-orange text-black dark:text-app-orange hover:bg-gradient-to-br hover:from-app-orange hover:to-orange-700 hover:text-white hover:dark:text-white transition-colors"
                @click="closeDialog()"
            >
                {{ store.translations.search.close[store.lang] }}
            </button>
            <router-link data-cy="link-docs" to="/docs">
                <button
                class="h-[40px] px-6 rounded-lg border border-app-green text-black dark:text-app-green hover:bg-gradient-to-br hover:from-app-green hover:to-green-700 hover:text-white hover:dark:text-white transition-colors" @click="closeDialog()">
            
                {{ translations.menu.docs[store.lang] }}
                </button>
            </router-link>
        </div>
    </dialog>
</template>