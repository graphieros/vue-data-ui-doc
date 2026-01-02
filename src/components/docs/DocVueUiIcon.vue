<script setup>
import { ref, watch, nextTick, computed, onMounted } from "vue";
import { XIcon, CopyIcon, CheckIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { copyText } from "../maker/lib";
import BaseDocTitle from "../BaseDocTitle.vue";
import CodeParser from "../customization/CodeParser.vue";
import ConfirmCopy from "../ConfirmCopy.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import BaseAutoComplete from "../Base/BaseAutoComplete.vue";

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
    "svg",
    "tableClose",
    "tableDialogClose",
    "tableDialogOpen",
    "tableOpen",
    "tooltip",
    "tooltipDisabled",
    "unstack",
    "zoomLock",
    "zoomUnlock"
]);

const specialIcons = ref([
    "aToZ", 
    "accordion",
    "addColumn", 
    "addRow", 
    "annotator",
    "annotatorDisabled",
    "apiStream",
    "arrowBottom",
    "arrowLeft",
    "arrowRight",
    "arrowTop",
    "battery",
    "bell", 
    "bellOff", 
    "bellRing", 
    "binary", 
    "blur", 
    "boxes",
    "branches", 
    "bringToBack",
    "bringToFront",
    "building",
    "carouselTable",
    "chart3dBar",
    "chartAgePyramid",
    "chartBar",
    "chartBullet",
    "chartBump",
    "chartCandlestick",
    "chartChestnut",
    "chartChord",
    "chartCirclePack",
    "chartCluster",
    "chartDag",
    "chartDonut",
    "chartDonutEvolution",
    "chartDumbbell",
    "chartFlow",
    "chartFunnel",
    "chartGalaxy",
    "chartGauge",
    "chartGeo",
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
    "chartRidgeline",
    "chartRings",
    "chartScatter",
    "chartSparkHistogram",
    "chartSparkStackbar",
    "chartSparkbar",
    "chartSparkline",
    "chartStackbar",
    "chartStackline",
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
    "check",
    "chip", 
    "chipAi", 
    "chipBinary", 
    "circle",
    "circleCancel",
    "circleCheck",
    "circleExclamation",
    "circleFill",
    "circleQuestion",
    "clip", 
    "clipBoard",
    "clipboardBar",
    "clipboardDonut",
    "clipboardLine",
    "clipboardVariable",
    "cloud", 
    "cloudRain", 
    "computer",
    "copy",
    "copyLeft",
    "croissant", 
    "csv",
    "curlyBrackets",
    "curlySpread",
    "cursor",
    "dashboard",
    "database", 
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
    "direction",
    "document", 
    "doubleCheck",
    "doubleSpark",
    "download", 
    "focus", 
    "folder", 
    "folderFill", 
    "fork", 
    "frameLine",
    "func",
    "gisLayerQuery", 
    "gisLayerSearch", 
    "hexagon",
    "hexagonFill",
    "histogram", 
    "histogramDown", 
    "histogramUp", 
    "home",
    "homeFilled",
    "hourglass",
    "htmlTag",
    "icons",
    "key", 
    "kpi",
    "kpiBox",
    "lambda",
    "lap",
    "laptop", 
    "legend",
    "lineUp", 
    "lock",
    "magnify",
    "minimap",
    "minus", 
    "monitor", 
    "monument",
    "moodEmbarrassed",
    "moodFlat",
    "moodHappy",
    "moodLaughing",
    "moodNeutral",
    "moodSad",
    "moodSurprised",
    "moodWink",
    "move",
    "mu",
    "network", 
    "nineToZero", 
    "numbers",
    "palette",
    "pentagon",
    "pentagonFill",
    "people", 
    "percentage", 
    "percentageDown", 
    "percentageUp", 
    "person", 
    "pie", 
    "pin", 
    "plug",
    "plus", 
    "pointer",
    "printer",
    "ratio",
    "resize",
    "resizeTLBR", 
    "resizeTRBL", 
    "resizeX", 
    "resizeY", 
    "restart",
    "revert",
    "robot",
    "save",
    "scada", 
    "screenshot",
    "selectAndGroup",
    "settings",
    "shield", 
    "shieldExclam", 
    "sigma",
    "skeleton",
    "smiley",
    "sort",
    "sortReverse",
    "spark",
    "spinner1",
    "spinner2",
    "spinner3",
    "spinner4",
    "sql", 
    "sqlQuery", 
    "sqlSearch", 
    "square",
    "squareFill",
    "star",
    "starFace",
    "starFill",
    "stop",
    "sun", 
    "target", 
    "text",
    "trash",
    "trend",
    "trendDown",
    "trendUp",
    "triangle",
    "triangleExclamation",
    "triangleFill",
    "triangleInformation",
    "twig",
    "unlock",
    "unpin", 
    "unplug",
    "upload", 
    "vueDataUi",
    "wifi", 
    "window",
    "workstation", 
    "world",
    "wrench", 
    "zToA", 
    "zeroToNine", 
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
});

const search = ref('');

const filteredIcons = computed(() => {
    if (!search.value) return icons.value;
    return icons.value.filter(icon => (icon.toUpperCase()).includes(search.value.toUpperCase()));
});

const filteredSpecialIcons = computed(() => {
    if (!search.value) return specialIcons.value;
    return specialIcons.value.filter(icon => (icon.toUpperCase()).includes(search.value.toUpperCase()));
});

const baseCodeExample = ref(`<VueUiIcon
    name="moodHappy"
    :size="24"
    stroke="#1A1A1A"
    :strokeWidth="1.5"
    :isSpin="false"
/>`);

const slotsExample = ref(`<VueUiIcon name="database">
    <template #exp>
        <VueUiIcon name="direction" stroke="#5f8aee" />
    </template>
    <template #sub>
        <VueUiIcon name="key" stroke="#42d392" />
    </template>
</VueUiIcon>    
`);

const expExample = ref(`<VueUiIcon name="database">
    <template #exp>
        <VueUiIcon name="cloud" stroke="#5f8aee" />
    </template>
</VueUiIcon>    
`)

const subExample = ref(`<VueUiIcon name="database">
    <template #sub>
        <VueUiIcon name="download" stroke="#5f8aee" />
    </template>
</VueUiIcon>    
`)

const expAnimExample = ref(`<VueUiIcon name="database">
    <template #exp>
        <VueUiIcon name="spinner2" stroke="#42d392" :isSpin="true" spin-duration="1s"/>
    </template>
</VueUiIcon>    
`)

const fancyAnimExample = ref(`<VueUiIcon name="square" :isSpin="true" spin-duration="5s">
    <template #exp>
        <VueUiIcon name="square" stroke="#42d392" :isSpin="true" spin-duration="1s"/>
    </template>
</VueUiIcon>    
`)

</script>

<template>
    <div>
        <BaseDocTitle name="VueUiIcon" />

        <BaseDocDescription :text="translations.docs.tooltips.icon[store.lang]" />

        <div class="w-fit mx-auto mt-6 mb-12">
            <BaseAutoComplete v-model="search" :items="[...icons, ...specialIcons]">
                <template #before="{ suggestion }">
                    <VueUiIcon :name="suggestion" :stroke="isDarkMode ? '#6A6A6A' : '#1A1A1A'"/>
                </template>
            </BaseAutoComplete>
        </div>

        <BaseCard class="mb-6">
            <CodeParser title="Usage" language="html" :content="baseCodeExample"/>
        </BaseCard>

        <BaseCard>
            <p class="mx-auto w-full text-md text-black dark:text-[#CCCCCC] mb-2 text-left font-inter-medium">{{ translations.docs.tooltips.iconUserOptions[store.lang] }}</p>
            <div class="flex flex-wrap gap-4 place-items-center place-content-center mt-12">
                <div v-for="icon in filteredIcons">
                    <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] p-6 rounded-lg cursor-pointer hover:scale-125 hover:bg-[#00000010] dark:hover:bg-[#00000020] transition-all" @click="selectIcon(icon)">
                        <VueUiIcon :isSpin="icon === 'spin'" :name="icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        <div class="dark:text-gray-400 text-black text-xs">{{ icon }}</div>
                    </div>
                </div>
            </div>
        </BaseCard>


        <BaseCard class="mt-6">
            <p class="mx-auto w-full text-md text-black dark:text-[#CCCCCC] mb-2 text-left font-inter-medium">
                {{ translations.docs.tooltips.iconSpecial[store.lang] }}
            </p>
    
            <div class="flex flex-wrap gap-4 place-items-center place-content-center mt-12">
                <div v-for="icon in filteredSpecialIcons">
                    <div class="flex flex-col place-items-center place-content-center gap-4 w-[100px] p-6 rounded-lg cursor-pointer hover:bg-[#00000010] dark:hover:bg-[#FFFFFF03] hover:scale-125 transition-all" @click="selectIcon(icon)">
                        <VueUiIcon :isSpin="icon === 'spin'" :name="icon" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'"/>
                        <div class="dark:text-gray-400 text-black text-xs">{{ icon }}</div>
                    </div>
                </div>
            </div>
        </BaseCard>

        <BaseCard class="mt-6 mb-2">
            You can nest icons in <code class="text-app-green-dark dark:text-app-green">exp</code> and | or <code class="text-app-green-dark dark:text-app-green">sub</code> slots:
            <div class="flex flex-row gap-4 place-items-center my-2">
                <BaseCard class="flex place-items-center justify-center h-fit" type="light">
                    <VueUiIcon name="database" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'">
                        <template #exp>
                            <VueUiIcon name="cloud" :stroke="isDarkMode ? '#83a4f2' : '#5f8aee'" />
                        </template>
                    </VueUiIcon>
                </BaseCard>
                <CodeParser language="html" :content="expExample"/>
            </div>

            <div class="flex flex-row gap-4 place-items-center my-2">
                <BaseCard class="flex place-items-center justify-center h-fit" type="light">
                    <VueUiIcon name="database" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'">
                        <template #sub>
                            <VueUiIcon name="download" :stroke="isDarkMode ? '#83a4f2' : '#5f8aee'" />
                        </template>
                    </VueUiIcon>
                </BaseCard>
                <CodeParser language="html" :content="subExample"/>
            </div>

            <div class="flex flex-row gap-4 place-items-center my-2">
                <BaseCard class="flex place-items-center justify-center h-fit" type="light">
                    <VueUiIcon name="database" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'">
                        <template #exp>
                            <VueUiIcon name="direction" :stroke="isDarkMode ? '#83a4f2' : '#5f8aee'"/>
                        </template>
                        <template #sub>
                            <VueUiIcon name="key" :stroke="isDarkMode ? '#42d392' : '#1d915d'" />
                        </template>
                    </VueUiIcon>
                </BaseCard>
                <CodeParser language="html" :content="slotsExample"/>
            </div>

            <div class="flex flex-row gap-4 place-items-center my-2">
                <BaseCard class="flex place-items-center justify-center h-fit" type="light">
                    <VueUiIcon name="database" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'">
                        <template #exp>
                            <VueUiIcon name="spinner2" :stroke="isDarkMode ? '#42d392' : '#1d915d'" :isSpin="true" />
                        </template>
                    </VueUiIcon>
                </BaseCard>
                <CodeParser language="html" :content="expAnimExample"/>
            </div>

            <div class="flex flex-row gap-4 place-items-center my-2">
                <BaseCard class="flex place-items-center justify-center h-fit" type="light">
                    <VueUiIcon name="square" :stroke="isDarkMode ? '#CCCCCC' : '#1A1A1A'" :isSpin="true" spin-duration="5s">
                        <template #exp>
                            <VueUiIcon name="square" :stroke="isDarkMode ? '#42d392' : '#1d915d'" :isSpin="true" />
                        </template>
                    </VueUiIcon>
                </BaseCard>
                <CodeParser language="html" :content="fancyAnimExample"/>
            </div>
        </BaseCard>
        
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
    </div>
</template>