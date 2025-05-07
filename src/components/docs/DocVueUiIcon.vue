<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import { XIcon, CopyIcon, CheckIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { copyText } from "../maker/lib";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import ConfirmCopy from "../ConfirmCopy.vue";

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const icons = ref([
    "annotator",
    "annotatorDisabled",
    "close",
    "excel",
    "exitFullscreen",
    "fullscreen",
    "image",
    "labelClose",
    "labelOpen",
    "menu",
    "pause",
    "pdf",
    "play",
    "sort",
    "spin",
    "stack",
    "tableClose",
    "tableOpen",
    "tooltip",
    "unstack",
]);

const specialIcons = ref([
    "accordion",
    "annotator",
    "annotatorDisabled",
    "arrowBottom",
    "arrowLeft",
    "arrowRight",
    "arrowTop",
    "battery",
    "boxes",
    "carouselTable",
    "chart3dBar",
    "chartAgePyramid",
    "chartBar",
    "chartBullet",
    "chartCandlestick",
    "chartChestnut",
    "chartCirclePack",
    "chartCluster",
    "chartDonut",
    "chartDonutEvolution",
    "chartDumbbell",
    "chartFlow",
    "chartFunnel",
    "chartGalaxy",
    "chartGauge",
    "chartHeatmap",
    "chartHistoryPlot",
    "chartLine",
    "chartMoodRadar",
    "chartNestedDonuts",
    "chartOnion",
    "chartParallelCoordinatePlot",
    "chartQuadrant",
    "chartRadar",
    "chartRelationCircle",
    "chartRings",
    "chartScatter",
    "chartSparkHistogram",
    "chartSparkStackbar",
    "chartSparkbar",
    "chartSparkline",
    "chartStackbar",
    "chartStripPlot",
    "chartTable",
    "chartTableSparkline",
    "chartThermometer",
    "chartTiremarks",
    "chartTreemap",
    "chartVerticalBar",
    "chartWaffle",
    "chartWheel",
    "chartWordCloud",
    "circle",
    "circleCancel",
    "circleCheck",
    "circleExclamation",
    "circleFill",
    "circleQuestion",
    "clipBoard",
    "clipboardBar",
    "clipboardDonut",
    "clipboardLine",
    "clipboardVariable",
    "copy",
    "copyLeft",
    "csv",
    "cursor",
    "dashboard",
    "diamond",
    "diamondFill",
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
    "func",
    "home",
    "homeFilled",
    "hexagon",
    "hexagonFill",
    "kpi",
    "kpiBox",
    "lambda",
    "lap",
    "legend",
    "moodEmbarrassed",
    "moodFlat",
    "moodHappy",
    "moodLaughing",
    "moodNeutral",
    "moodSad",
    "moodSurprised",
    "moodWink",
    "mu",
    "numbers",
    "palette",
    "pentagon",
    "pentagonFill",
    "people",
    "ratio",
    "restart",
    "screenshot",
    "settings",
    "sigma",
    "skeleton",
    "smiley",
    "sort",
    "sortReverse",
    "square",
    "squareFill",
    "star",
    "starFace",
    "starFill",
    "stop",
    "trash",
    "trend",
    "trendDown",
    "trendUp",
    "triangle",
    "triangleFill",
    "vueDataUi",
    "window",
    "zoomMinus",
    "zoomPlus",
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

const currentIndex = ref(0);

function previous() {
    if (currentIndex.value === 0) {
        currentIndex.value = [...icons.value, ...specialIcons.value].length - 1;
    } else {
        currentIndex.value -= 1;
    }
    selectedIcon.value = [...icons.value, ...specialIcons.value][currentIndex.value];
}

function next() {
    if (currentIndex.value === [...icons.value,...specialIcons.value].length - 1) {
        currentIndex.value = 0;
    } else {
        currentIndex.value += 1;
    }
    selectedIcon.value = [...icons.value, ...specialIcons.value][currentIndex.value];
}

function selectIcon(icon) {
    selectedIcon.value = icon;
    currentIndex.value = [...icons.value,...specialIcons.value].indexOf(icon);
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

const code = computed(() => {
    return `
    <VueUiIcon
        name="${selectedIcon.value}"
        :size="24"
        stroke="${ isDarkMode.value ? '#CCCCCC' : '#1A1A1A'}"
    />
    `
})

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiIcon" />

        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.icon[store.lang] }}
        </p>

        <div class="border border-[#5f8bee] py-6 mt-6 rounded-lg bg-[#5f8bee10]">
            <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">{{ translations.docs.tooltips.iconUserOptions[store.lang] }}</p>
            <div class="flex flex-wrap gap-4 place-items-center place-content-center mt-12">
                <div v-for="icon in icons">
                    <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] p-6 rounded-lg cursor-pointer hover:scale-125 hover:bg-[#00000010] dark:hover:bg-[#00000020] transition-all" @click="selectIcon(icon)">
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
                <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] p-6 rounded-lg cursor-pointer hover:bg-[#00000010] dark:hover:bg-[#FFFFFF03] hover:scale-125 transition-all" @click="selectIcon(icon)">
                    <VueUiIcon :isSpin="icon === 'spin'" :name="icon" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                    <div class="dark:text-gray-400 text-black text-xs">{{ icon }}</div>
                </div>
            </div>
        </div>
        
        <dialog id="iconDialog"  :class="`glass fixed h-screen max-h-[450px] w-full max-w-[400px] p-6 rounded-lg bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(36,36,36,0.8)] text-black dark:text-gray-300 border dark:border-[#2A2A2A]`">
            <div class="z-10 w-full text-2xl sticky top-0 font-black">
            <div class="select-none flex flex-row gap-2 place-items-center text-app-blue">
                {{ selectedIcon }}
            </div>
            <button class="absolute top-2 right-2" @click="useModal('close')">
                <XIcon class="text-black dark:text-app-green" />
            </button>
            </div>
            
            <button class="absolute top-1/3 left-6 -translate-y-2/3" @click="previous">
                <VueUiIcon name="arrowLeft" stroke="#6A6A6A"/>
            </button>
            <button class="absolute top-1/3 right-6 -translate-y-2/3" @click="next">
                <VueUiIcon name="arrowRight" stroke="#6A6A6A"/>
            </button>

            <div class="mx-auto flex place-items-center justify-center flex-col gap-6 mt-6">
                <VueUiIcon :name="selectedIcon" :size="128" :strokeWidth="1.2" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                <CodeParser :content="code" language="html" class="select-none" @copy="store.copy()"/>
            </div>
            <ConfirmCopy />
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