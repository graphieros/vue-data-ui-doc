<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { darkenColor, lightenColor, shiftColorHue } from "vue-data-ui";

const store = useMainStore();

const translations = computed(() => store.translations);

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

onMounted(() => {
    console.log(abbreviate({
        source: 'lorem ipsum dolor sit amet',
        length: 5
    }))
})

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

                <div class="p-4 overflow-auto">
<pre>
<code>
import { abbreviate } from "vue-data-ui";

const text = 'lorem ipsum dolor sit amet';
const abbreviated = abbreviate({
    source: text,
    length: 5
});
<span class="text-gray-500">// Result: "LIDSA"</span>
</code>
</pre>

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

    <div class="p-4 overflow-auto">
<pre>
<code>
import { darkenColor } from "vue-data-ui";

<span class="text-gray-500">// Color format can be HEX (with or without alpha channel), RGB, RGBA, or named color</span>
<div class="flex flex-row gap-2 place-items-center">const color = "#FF0000"; <div class="h-[24px] w-[24px] rounded" style="background: #FF0000"/></div>
<div class="flex flex-row gap-2 place-items-center">const darkened = darkenColor(color, 0.5); <div class="h-[24px] w-[24px] rounded" :style="`background:${darkenColor('#FF0000', 0.5)}`"/></div>

</code>
</pre>

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
    <div class="p-4 overflow-auto">
<pre>
<code>
import { lightenColor } from "vue-data-ui";

<span class="text-gray-500">// Color format can be HEX (with or without alpha channel), RGB, RGBA, or named color</span>
<div class="flex flex-row gap-2 place-items-center">const color = "#FF0000"; <div class="h-[24px] w-[24px] rounded" style="background: #FF0000"/></div>
<div class="flex flex-row gap-2 place-items-center">const lightened = lightenColor(color, 0.5); <div class="h-[24px] w-[24px] rounded" :style="`background:${lightenColor('#FF0000', 0.5)}`"/></div>
</code>
</pre>
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
    <div class="p-4 overflow-auto">
<pre>
<code>
import { shiftColorHue } from "vue-data-ui";

<span class="text-gray-500">// Color format can be HEX (with or without alpha channel), RGB, RGBA, or named color</span>
<div class="flex flex-row gap-2 place-items-center">const color = "#FF0000"; <div class="h-[24px] w-[24px] rounded" style="background: #FF0000"/></div>
<div class="flex flex-row gap-2 place-items-center">const shifted = shiftColorHue(color, 0.1); <div class="h-[24px] w-[24px] rounded" :style="`background:${shiftColorHue('#FF0000', 0.1)}`"/></div>
</code>
</pre>
    </div>
</div>
</div>
    </div>
</template>