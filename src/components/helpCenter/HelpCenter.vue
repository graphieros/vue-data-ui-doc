<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { useHelpStore } from "../../stores/help";
import HelpConfiguration from "./HelpConfiguration.vue";
import HelpDataset from "./HelpDataset.vue";
import HelpVueDataUiComponent from "./HelpVueDataUiComponent.vue";
import HelpNuxt from "./HelpNuxt.vue";

const store = useMainStore()
const help = useHelpStore()
const isDarkMode = computed(() => store.isDarkMode)

const translations = computed(() => {
    return store.translations;
})

const helpCenter = ref(null);

function openHelpCenter() {
    helpCenter.value.showModal();
}

function closeDialog() {
    helpCenter.value.close();
}

onMounted(() => {
    HTMLDialogElement.prototype.triggerShow = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function() {
    this.triggerShow();
    this.onclick = event => {
        let rect = this.getBoundingClientRect();
        if(event.clientY < rect.top || event.clientY > rect.bottom) return this.close();
        if(event.clientX < rect.left || event.clientX > rect.right) return this.close();
    }
}
})

</script>

<template>
    <button @click="openHelpCenter" class="fixed z-50 right-2 top-[79px] flex place-items-center justify-center rounded-full bg-gradient-to-b from-[#ffa793] to-[#dd7963] h-[42px] w-[42px] hover:-translate-y-[2px] transition-all">
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