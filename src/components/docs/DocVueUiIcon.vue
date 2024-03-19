<script setup>
import { ref, watch, nextTick, computed } from "vue";
import { XIcon, CopyIcon, CheckIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { copyText } from "../maker/lib";

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const icons = ref([
    "close",
    "excel",
    "image",
    "labelClose",
    "labelOpen",
    "menu",
    "pdf",
    "sort",
    "spin",
    "tableClose",
    "tableOpen",
    "fullscreen",
    "exitFullscreen"
]);

const specialIcons = ref([
    "annotator",
    "arrowBottom",
    "arrowLeft",
    "arrowRight",
    "arrowTop",
    "chart3dBar",
    "chartAgePyramid",
    "chartBar",
    "chartCandlestick",
    "chartChestnut",
    "chartCluster",
    "chartDonut",
    "chartNestedDonuts",
    "chartDonutEvolution",
    "chartGauge",
    "chartHeatmap",
    "chartLine",
    "chartMoodRadar",
    "chartOnion",
    "chartQuadrant",
    "chartRadar",
    "chartRelationCircle",
    "chartRings",
    "chartScatter",
    "chartSparkHistogram",
    "chartSparkStackbar",
    "chartTable",
    "chartThermometer",
    "chartTiremarks",
    "chartVerticalBar",
    "chartWaffle",
    "chartWheel",
    "circleCancel",
    "circleCheck",
    "circleExclamation",
    "circleQuestion",
    "dashboard",
    "digit0",
    "digit1",
    "digit2",
    "digit3",
    "digit4",
    "digit5",
    "digit6",
    "digit7",
    "digit8",
    "digit9",
    "moodEmbarrassed",
    "moodSad",
    "moodFlat",
    "moodNeutral",
    "smiley",
    "moodHappy",
    "moodSurprised",
    "moodWink",
    "moodLaughing",
    "screenshot",
    "skeleton",
    "sort",
    "sortReverse",
    "star",
    
])

const selectedIcon = ref("smiley")

function useModal(state) {
    const dialog = document.getElementById('iconDialog');
    if(!dialog) return;

    if(state === "open") {
        dialog.showModal();
    } else {
        dialog.close();
    }
}

function selectIcon(icon) {
    selectedIcon.value = icon;
    useModal("open");
}

const isCopied = ref(false);

function requestCopy() {
    const text = `
        &lt;VueUiIcon
            name="${selectedIcon.value}"
            :size="24"
            stroke="${ isDarkMode.value ? '___CCCCCC' : '___1A1A1A'}"
        /&gt;
    `;
    copyText(text, document.getElementById('iconDialog'));
    isCopied.value = true;
    setTimeout(() => {
        isCopied.value = false;
    }, 1000)
}

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="smiley" stroke="#42d392" :strokeWidth="1.5" />
            VueUiIcon
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.icon[store.lang] }}
        </p>

        <div class="border border-[#5f8bee] py-6 mt-6 rounded-lg bg-[#5f8bee10]">
            <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">{{ translations.docs.tooltips.iconUserOptions[store.lang] }}</p>
            <div class="flex flex-wrap gap-4 place-items-center place-content-center mt-12">
                <div v-for="icon in icons">
                    <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] p-6 rounded-lg cursor-pointer hover:outline hover:outline-app-blue" @click="selectIcon(icon)">
                        <VueUiIcon :isSpin="icon === 'spin'" :name="icon" :stroke="isDarkMode ? '#FFFFFF' : '#1A1A1A'"/>
                        <div class="dark:text-gray-400 text-black text-xs">{{ icon }}</div>
                    </div>
                </div>
            </div>
        </div>

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center mt-12">
                {{ translations.docs.tooltips.iconSpecial[store.lang] }}
        </p>

        <div class="flex flex-wrap gap-4 place-items-center place-content-center">
            <div v-for="icon in specialIcons">
                <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] p-6 rounded-lg cursor-pointer hover:outline hover:outline-app-blue" @click="selectIcon(icon)">
                    <VueUiIcon :isSpin="icon === 'spin'" :name="icon" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <div class="dark:text-gray-400 text-black text-xs">{{ icon }}</div>
                </div>
            </div>
        </div>
        
        <dialog id="iconDialog"  :class="`glass fixed h-screen max-h-[400px] w-full max-w-[400px] p-6 rounded-lg bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(36,36,36,0.8)] text-black dark:text-gray-300 border dark:border-gray-700`">
            <div class="z-10 w-full text-2xl sticky top-0 font-black">
            <div class="flex flex-row gap-2 place-items-center text-app-blue">
                {{ selectedIcon }}
            </div>
            <button class="absolute top-2 right-2" @click="useModal('close')">
                <XIcon class="text-black dark:text-app-green" />
            </button>
            </div>

            <div class="mx-auto flex place-items-center justify-center flex-col gap-6 mt-6">
                <VueUiIcon :name="selectedIcon" :size="128" :strokeWidth="1.2" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
            <div @click="requestCopy" class="relative">
                <CopyIcon class="absolute -top-2 -right-2 cursor-pointer" v-if="!isCopied" />
                <CheckIcon v-else class="absolute text-app-green -top-2 -right-2 cursor-pointer animate-ping"/>
                <code>
                    &lt;<span class="text-app-green">VueUiIcon</span><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;name="{{ selectedIcon }}"<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;:size="24"<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;stroke="{{ isDarkMode ? '#CCCCCC' : '#1A1A1A' }}"<br>
                    /&gt;
                </code>
            </div>
            </div>
        </dialog>

        <div class="w-full text-center my-12">

<code>
    &lt;<span class="text-app-green">VueUiIcon</span>
        name="moodHappy"
        :size="24"
        stroke="#1A1A1A"
        :strokeWidth="1.5"
        :isSpin="false"
    /&gt;
</code>
          
        </div>
    </div>
</template>