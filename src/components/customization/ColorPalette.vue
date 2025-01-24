<script setup>
import { ref, computed } from "vue";
import {adaptColorToBackground} from '../maker/lib'
import { useMainStore } from "../../stores";
import { getPalette } from "vue-data-ui";
import ConfirmCopy from "../ConfirmCopy.vue";
import CodeParser from "./CodeParser.vue";

const store = useMainStore()
const translations = computed(() => {
    return store.translations;
})

const palette = ref([
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
    "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
    "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939",
    "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39",
    "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b",
    "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
]);

// TODO: THEMES HERE ?

function copyContent(color) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = color;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const codeContent = computed(() => {
    return {
        default: `
        // default palette
        import { getPalette } from "vue-data-ui";
        const palette = getPalette();
        `,
        celebration: `
        // celebration palette
        import { getPalette } from "vue-data-ui";
        const palette = getPalette('celebration');
        `,
        celebrationNight: `
        // celebrationNight palette
        import { getPalette } from "vue-data-ui";
        const palette = getPalette('celebrationNight');
        `,
        zen: `
        // zen palette
        import { getPalette } from "vue-data-ui";
        const palette = getPalette('zen');
        `,
        concrete: `
        // concrete palette
        import { getPalette } from "vue-data-ui";
        const palette = getPalette('concrete');
        `,
        hack: `
        // hack palette
        import { getPalette } from "vue-data-ui";
        const palette = getPalette('hack');
        `,
    }
});

const colorBridgeDescription = ref({
    en: "Colors may have different meanings in some cultures. We created a tool to generate region-specific color palettes based on cultural contexts, to make your data-storytelling even more pertinent.",
    fr: "Les couleurs peuvent avoir des significations différentes selon les cultures. Nous avons créé un outil pour générer des palettes de couleurs spécifiques à chaque région en fonction des contextes culturels, afin de rendre votre narration de données encore plus pertinente.",
    pt: "As cores podem ter significados diferentes em algumas culturas. Criamos uma ferramenta para gerar paletas de cores específicas para cada região com base em contextos culturais, tornando sua narrativa de dados ainda mais relevante.",
    de: "Farben können in verschiedenen Kulturen unterschiedliche Bedeutungen haben. Wir haben ein Tool entwickelt, das regionsspezifische Farbpaletten basierend auf kulturellen Kontexten erstellt, um Ihre Daten-Storytelling noch relevanter zu machen.",
    zh: "颜色在某些文化中可能有不同的意义。我们创建了一种工具，可以根据文化背景生成特定地区的调色板，从而使您的数据叙述更具相关性。",
    jp: "色は文化によって異なる意味を持つことがあります。文化的な文脈に基づいて地域固有のカラーパレットを生成するツールを作成しました。これにより、データストーリーテリングがさらに適切になります。",
    es: "Los colores pueden tener diferentes significados en algunas culturas. Hemos creado una herramienta para generar paletas de colores específicas por región basadas en contextos culturales, para hacer que tu narración de datos sea aún más relevante.",
    ko: "색상은 일부 문화에서 다른 의미를 가질 수 있습니다. 우리는 문화적 맥락에 따라 지역별 색상 팔레트를 생성하는 도구를 만들어 데이터를 활용한 스토리텔링을 더욱 적합하게 만들었습니다.",
    ar: "قد تحمل الألوان معاني مختلفة في بعض الثقافات. لقد أنشأنا أداة لتوليد لوحات ألوان مخصصة لكل منطقة بناءً على السياقات الثقافية، لجعل رواية البيانات الخاصة بك أكثر ملاءمة."
})

const colorBridgeCode = computed(() => {
  return `import colorBridge from "color-bridge";
const { palette, hues } = colorBridge({culture: 'western'});
`
})

</script>

<template>
    <ConfirmCopy/>
    
    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 sm:w-1/2 mx-auto mb-12">
        <p class="my-6">
            You can use config.customPalette (string[]]) to use your own color palette. Colors provided in datasets will always override custom and default palettes. Allowed color formats: HEX, RGB, HSL, named colors.
            The config.customPalette attribute can be used on the following components:
        </p>
        <ul class="grid grid-cols-1 sm:grid-cols-2">
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUi3dBar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiChestnut
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiDonut
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiDonutEvolution
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiGalaxy
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiGauge
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiMolecule
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiNestedDonuts
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiOnion
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiParallelCoordinatePlot
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiQuadrant
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiQuickChart
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiRadar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiRelationCircle
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiRings
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiScatter
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiSparkStackbar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiSparkbar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiStripPlot
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiTableSparkline
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiThermometer
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiTreemap
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiVerticalBar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiWaffle
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiWordCloud
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiXy
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiXyCanvas
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiStackbar
            </li>
            <li class="flex flex-row gap-2 place-items-center">
                <VueUiIcon name="circleFill" stroke="#42d392" size="8"/> VueUiFlow
            </li>
        </ul>
        <p class="my-6">{{ translations.customization.palette[store.lang] }}</p>
        <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
            <CodeParser :content="codeContent.default" language="javascript"/>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in palette">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
            <CodeParser :content="codeContent.celebration" language="javascript"/>
        </div>

        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('celebration')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
            <CodeParser :content="codeContent.celebrationNight" language="javascript"/>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('celebrationNight')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
            <CodeParser :content="codeContent.zen" language="javascript"/>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('zen')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
            <CodeParser :content="codeContent.concrete" language="javascript"/>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('concrete')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
            <CodeParser :content="codeContent.hack" language="javascript"/>
        </div>
        <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
            <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors" v-for="(color, i) in getPalette('hack')">
                <div :style="`background:${color};color:${adaptColorToBackground(color)}`" class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center" @click="() => copyContent(color)">
                    {{ color.toUpperCase() }}
                    <div class="absolute top-0 left-1 text-xs">
                        {{ i }}
                    </div>
                    <div class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]"/>
                </div>
            </div>
        </div>

        <div class="mt-12 bg-[#FFFFFF10] w-full p-4">
            <h2 class="text-2xl mb-4">Color Bridge</h2>
            {{ colorBridgeDescription[store.lang] }}
            <div class="flex flex-row justify-center mt-6">
                <code>npm i color-bridge</code>
            </div>
            <div class="w-full text-left mb-10 p-2 bg-[#2A2A2A] dark:bg-[#1A1A1A] rounded-md mt-12 border border-gray-700">
                <CodeParser :content="colorBridgeCode" language="javascript"/>
            </div>
            <div class="flex flex-row justify-center mt-6">
                <button class="py-2 px-5 bg-gradient-to-br to-[#FF6030] from-[#FF9020] hover:from-[#FF6030] hover:to-[#FF9020] text-black rounded flex flew-row place-items-center gap-2">
                    <VueUiIcon name="moodWink" stroke="#1A1A1A" />
                    <a href="https://color-bridge.graphieros.com/" target="_blank">
                        Color Bridge docs
                    </a>
                </button>
            </div>
        </div>
    </div>
</template>