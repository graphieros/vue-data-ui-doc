<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { abbreviate, darkenColor, lightenColor, shiftColorHue } from "vue-data-ui";
import BaseColorInput from "../BaseColorInput.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import CodeParser from "../customization/CodeParser.vue";

const store = useMainStore();

const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

const utilityTranslations = ref({
    abbreviate: {
        en: "Generate abbreviations for labels",
        fr: "Générer des abréviations pour les étiquettes",
        pt: "Gerar abreviações para rótulos",
        de: "Abkürzungen für Beschriftungen erstellen",
        zh: "生成标签的缩写",
        jp: "ラベルの略語を生成する",
        es: "Generar abreviaturas para etiquetas",
        ko: "레이블에 대한 약어 생성",
        ar: "إنشاء اختصارات للتسميات"
    },
    darkenColor: {
        en: "Darkens a color by a specified strength",
        fr: "Assombrit une couleur selon une intensité spécifiée",
        pt: "Escurece uma cor por uma intensidade especificada",
        de: "Verdunkelt eine Farbe mit einer angegebenen Stärke",
        zh: "根据指定的强度使颜色变暗",
        jp: "指定された強さで色を暗くする",
        es: "Oscurece un color con una intensidad específica",
        ko: "지정된 강도로 색상을 어둡게 만듭니다",
        ar: "يُغمّق اللون بقوة محددة"
    },
    lightenColor: {
        en: "Lightens a color by a specified strength",
        fr: "Éclaircit une couleur selon une intensité spécifiée",
        pt: "Clareia uma cor por uma intensidade especificada",
        de: "Hellt eine Farbe mit einer angegebenen Stärke auf",
        zh: "根据指定的强度使颜色变亮",
        jp: "指定された強さで色を明るくする",
        es: "Aclara un color con una intensidad específica",
        ko: "지정된 강도로 색상을 밝게 만듭니다",
        ar: "يفتح اللون بقوة محددة"
    },
    shiftColorHue: {
        en: "Shifts hue for a given color, by a given strength",
        fr: "Change la teinte d'une couleur donnée selon une intensité spécifiée",
        pt: "Altera o tom de uma cor por uma intensidade especificada",
        de: "Verschiebt den Farbton einer bestimmten Farbe mit einer angegebenen Stärke",
        zh: "根据指定的强度调整给定颜色的色调",
        jp: "指定された強さで特定の色の色相をシフトします",
        es: "Ajusta el matiz de un color según una intensidad específica",
        ko: "지정된 강도로 주어진 색상의 색조를 변경합니다",
        ar: "يُغيّر درجة اللون للون معين بقوة محددة"
    }
})

const colorDark = ref('#FF0000');
const strengthDark = ref(0.5);

const colorLight = ref('#FF0000');
const strengthLight = ref(0.5);

const colorHue = ref('#FF0000');
const strengthHue = ref(0.1);

const abbrSource = ref('lorem ipsum dolor sit amet');
const abbrLen = ref(5);

const abbreviated = computed(() => {
    return abbreviate({
        source: abbrSource.value,
        length: abbrLen.value
    })
})

const abbrContent = computed(() => `import { abbreviate } from "vue-data-ui";

const text = "${abbrSource.value}";
const abbreviated = abbreviate({
    source: text,
    length: ${abbrLen.value}
});

// Result: ${abbreviated.value}
`);

const darkenContent = computed(() => `import { darkenColor } from "vue-data-ui";

const color = "${colorDark.value}";
const darkened = darkenColor(color, ${strengthDark.value});

// Result: ${darkenColor(colorDark.value, strengthDark.value)}
`);

const lightenContent = computed(() => `import { lightenColor } from "vue-data-ui";

const color = "${colorLight.value}";
const lightened = lightenColor(color, ${strengthLight.value});

// Result: ${lightenColor(colorLight.value, strengthLight.value)}
`);

const shiftColorContent = computed(() => `import { shiftColorHue } from "vue-data-ui";

// Color format can be HEX (with or without alpha channel), RGB, RGBA, or named color
const color = "${colorHue.value}";
const shifted = shiftColorHue(color, ${Math.round(strengthHue.value * 100) / 100});

// Result: ${shiftColorHue(colorHue.value, strengthHue.value)}
`);

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="func" stroke="#42d392" :strokeWidth="1.5" />
            <span><span class="text-black dark:text-app-blue-light">{{ translations.utilityFunctions[store.lang] }}</span></span>
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.utilityFunctionsDescription[store.lang] }}
        </p>

        <div class="max-w-[1000px] mx-auto mt-12">

            <div class="w-full rounded border border-gray-300 dark:border-gray-700">
                <div class="border-b border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
                    <div class="p-4" dir="auto">
                        <code class="text-lg">abbreviate</code>
                        <p class="text-gray-500">{{ utilityTranslations.abbreviate[store.lang] }}</p>
                    </div>
                </div>

                <div class="p-4 overflow-auto bg-[#2A2A2A] dark:bg-[#1A1A1A]">
                    <CodeParser :content="abbrContent" language="javascript"/>
                </div>

                <div class="border-t border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
                    <div class="p-4 flex flex-col gap-2 w-full">
                        <div class="flex flex-col gap-1">
                            <label for="abbrSource" class="text-xs">Text source:</label>
                            <input id="abbrSource" type="text" v-model="abbrSource" class="w-full py-1">
                        </div>
                        <div class="flex flex-col gap-1 w-fit">
                            <label class="text-xs" for="abbrLen">Abbrevation length:</label>
                            <BaseNumberInput v-model:value="abbrLen" :min="1" :max="12" labelId="abbrLen"/>
                        </div>
                        <div class="flex flex-row gap-2 place-items-center">
                            <div>Result:</div>
                            <div class="bg-gray-200 dark:bg-[#FFFFFF10] w-full py-1 px-2 rounded">
                                {{ abbreviated }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-[1000px] mx-auto mt-12">

<div class="w-full rounded border border-gray-300 dark:border-gray-700">
    <div class="border-b border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
        <div class="p-4" dir="auto">
            <code class="text-lg">darkenColor</code>
            <p class="text-gray-500">{{ utilityTranslations.darkenColor[store.lang] }}</p>
        </div>
    </div>

    <div class="p-4 overflow-auto bg-[#2A2A2A] dark:bg-[#1A1A1A]">
        <CodeParser :content="darkenContent" language="javascript"/>
    </div>

    <div class="border-t border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
        <div class="p-4 flex flex-col gap-2 w-fit">
            <BaseColorInput v-model:value="colorDark" label="Color source" label-id="source-light"/>
            <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                <label for="range-dark" class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">Darken strength</label>
                <input id="range-dark" type="range" v-model="strengthDark" :min="0" :max="1" :step="0.01" class="accent-app-blue z-0">
            </div>
            <div class="flex flex-row place-items-center gap-2">
                Result: <div :style="{
                    background: darkenColor(colorDark, strengthDark),
                    height: '40px',
                    width: '40px'
                }"/>
            </div>
        </div>
    </div>
</div>
</div>

<div class="max-w-[1000px] mx-auto mt-12">

<div class="w-full rounded border border-gray-300 dark:border-gray-700">
    <div class="border-b border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
        <div class="p-4" dir="auto">
            <code class="text-lg">lightenColor</code>
            <p class="text-gray-500">{{ utilityTranslations.lightenColor[store.lang] }}</p>
        </div>
    </div>

    <div class="p-4 overflow-auto bg-[#2A2A2A] dark:bg-[#1A1A1A]">
        <CodeParser :content="lightenContent" language="javascript"/>
    </div>

    <div class="border-t border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
        <div class="p-4 flex flex-col gap-2 w-fit">
            <BaseColorInput v-model:value="colorLight" label="Color source" label-id="source-light"/>
            <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                <label for="range-light" class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">Lighten strength</label>
                <input id="range-light" type="range" v-model="strengthLight" :min="0" :max="1" :step="0.01" class="accent-app-blue z-0">
            </div>
            <div class="flex flex-row place-items-center gap-2">
                Result: <div :style="{
                    background: lightenColor(colorLight, strengthLight),
                    height: '40px',
                    width: '40px'
                }"/>
            </div>
        </div>
    </div>
</div>
</div>

<div class="max-w-[1000px] mx-auto mt-12">

<div class="w-full rounded border border-gray-300 dark:border-gray-700">
    <div class="border-b border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
        <div class="p-4" dir="auto">
            <code class="text-lg">shiftColorHue</code>
            <p class="text-gray-500">{{ utilityTranslations.shiftColorHue[store.lang] }}</p>
        </div>
    </div>

    <div class="p-4 overflow-auto bg-[#2A2A2A] dark:bg-[#1A1A1A]">
        <CodeParser :content="shiftColorContent" language="javascript"/>
    </div>

    <div class="border-t border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#FFFFFF05]">
        <div class="p-4 flex flex-col gap-2 w-fit">
            <BaseColorInput v-model:value="colorHue" label="Color source" label-id="source-hue"/>
            <div class="inline-flex place-items-center justify-center gap-2 relative h-[32px] bg-[#1A1A1A10] dark:bg-[#FFFFFF10] p-2 rounded-full shadow-md  dark:border-t dark:border-[#6A6A6A]">
                <label for="range-hue" class="text-xs z-0 pointer-events-none bg-[#4A4A4A] dark:bg-black px-2 rounded-lg min-w-[64px] text-center text-white tabular-nums">Hue strength</label>
                <BaseNumberInput v-model:value="strengthHue" :min="0" :max="1" :step="0.01"/>
            </div>
            <div class="flex flex-row place-items-center gap-2">
                Result: <div :style="{
                    background: shiftColorHue(colorHue, strengthHue),
                    height: '40px',
                    width: '40px'
                }"/>
            </div>
        </div>
    </div>
</div>
</div>

    </div>
</template>