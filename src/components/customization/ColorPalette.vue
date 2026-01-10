<script setup>
import { ref, computed, toRef } from "vue";
import { adaptColorToBackground } from "../maker/lib";
import { useMainStore } from "../../stores";
import { getPalette } from "vue-data-ui";
import ConfirmCopy from "../ConfirmCopy.vue";
import CodeParser from "./CodeParser.vue";
import ColorBridgeIcon from "../maker/ColorBridgeIcon.vue";
import { useFeatures } from "../../useFeatures";
import { CheckIcon } from "vue-tabler-icons";
import ComponentsTable from "../docs/ComponentsTable.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();
const translations = computed(() => {
    return store.translations;
});

const { components } = useFeatures();

const isDarkMode = computed(() => store.isDarkMode);

const palette = ref([
    "#1f77b4",
    "#aec7e8",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#c5b0d5",
    "#8c564b",
    "#c49c94",
    "#e377c2",
    "#f7b6d2",
    "#7f7f7f",
    "#c7c7c7",
    "#bcbd22",
    "#dbdb8d",
    "#17becf",
    "#9edae5",
    "#393b79",
    "#5254a3",
    "#6b6ecf",
    "#9c9ede",
    "#637939",
    "#8ca252",
    "#b5cf6b",
    "#cedb9c",
    "#8c6d31",
    "#bd9e39",
    "#e7ba52",
    "#e7cb94",
    "#843c39",
    "#ad494a",
    "#d6616b",
    "#e7969c",
    "#7b4173",
    "#a55194",
    "#ce6dbd",
    "#de9ed6",
]);

// TODO: THEMES HERE ?

function copyContent(color) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = color;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
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
        minimal: `
    // minimal palette
    import { getPalette } from "vue-data-ui";
    const palette = getPalette('minimal');
        `,
        minimalDark: `
    // minimalDark palette
    import { getPalette } from "vue-data-ui";
    const palette = getPalette('minimalDark');
        `,
    };
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
    ar: "قد تحمل الألوان معاني مختلفة في بعض الثقافات. لقد أنشأنا أداة لتوليد لوحات ألوان مخصصة لكل منطقة بناءً على السياقات الثقافية، لجعل رواية البيانات الخاصة بك أكثر ملاءمة.",
});

const colorBridgeCode = computed(() => {
    return `import colorBridge from "color-bridge";
const { bridge, utils } = colorBridge();
const { palette, hues } = bridge({ culture: 'western' });
`;
});

const description = ref({
    en: `You can use config.customPalette (string[]]) to use your own color palette. Colors provided in datasets will always override custom and default palettes. Allowed color formats: HEX, RGB, HSL, named colors.
            The config.customPalette attribute can be used on the following components:`,
    fr: "Vous pouvez utiliser config.customPalette (string[]) pour définir votre propre palette de couleurs. Les couleurs spécifiées dans les jeux de données auront toujours la priorité sur les palettes personnalisées et par défaut. Formats de couleur acceptés : HEX, RGB, HSL, noms de couleurs. L’attribut config.customPalette peut être utilisé sur les composants suivants :",
    pt: "Você pode usar config.customPalette (string[]) para definir sua própria paleta de cores. As cores fornecidas nos conjuntos de dados sempre substituirão as paletas personalizadas e padrão. Formatos de cores permitidos: HEX, RGB, HSL, nomes de cores. O atributo config.customPalette pode ser usado nos seguintes componentes:",
    de: "Sie können config.customPalette (string[]) verwenden, um Ihre eigene Farbpalette festzulegen. Farben, die in den Datensätzen angegeben sind, überschreiben immer benutzerdefinierte und Standardpaletten. Erlaubte Farbformate: HEX, RGB, HSL, Farbnamen. Das Attribut config.customPalette kann in den folgenden Komponenten verwendet werden:",
    zh: "您可以使用 config.customPalette (string[]) 来设置自定义调色板。数据集内指定的颜色将始终覆盖自定义和默认调色板。允许的颜色格式：HEX、RGB、HSL、命名颜色。config.customPalette 属性可用于以下组件：",
    jp: "config.customPalette（string[]）を使って独自のカラーパレットを設定できます。データセットで指定された色は、常にカスタムおよびデフォルトのパレットより優先されます。利用可能な色形式：HEX、RGB、HSL、色名。config.customPalette 属性は以下のコンポーネントで使用できます：",
    es: "Puede usar config.customPalette (string[]) para definir su propia paleta de colores. Los colores proporcionados en los conjuntos de datos siempre tendrán prioridad sobre las paletas personalizadas y predeterminadas. Formatos de color permitidos: HEX, RGB, HSL, nombres de colores. El atributo config.customPalette se puede usar en los siguientes componentes:",
    ko: "config.customPalette (string[])를 사용하여 나만의 색상 팔레트를 지정할 수 있습니다. 데이터셋에 지정된 색상은 항상 커스텀 및 기본 팔레트보다 우선 적용됩니다. 허용되는 색상 형식: HEX, RGB, HSL, 색상명. config.customPalette 속성은 다음 컴포넌트에서 사용할 수 있습니다:",
    ar: "يمكنك استخدام config.customPalette (string[]) لتحديد لوحة الألوان الخاصة بك. الألوان المحددة في مجموعات البيانات ستتجاوز دائماً اللوحات المخصصة ولوحات الألوان الافتراضية. صيغ الألوان المسموحة: HEX وRGB وHSL وأسماء الألوان. يمكن استخدام خاصية config.customPalette في المكونات التالية:",
});
</script>

<template>
    <ConfirmCopy />

    <div class="flex flex-col place-content-center place-items-center text-left mt-12 w-5/6 max-w-[1200px] mx-auto mb-12">
        <p class="my-6">{{ translations.customization.palette[store.lang] }}</p>

        <BaseCard v-for="palette in Object.keys(codeContent)" class="my-4">
            <h2 class="mb-2 font-inter-medium text-xl pl-2">
                <code>
                    {{ palette }}
                </code>
            </h2>
            <CodeParser :content="codeContent[palette]" language="javascript" @copy="store.copy()" />
            <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center mt-4">
                <div class="p-1 hover:bg-[#1A1A1A] dark:hover:bg-white rounded-md transition-colors"
                    v-for="(color, i) in getPalette(palette)">
                    <div :style="`background:${color};color:${adaptColorToBackground(color)}`"
                        class="w-[100px] h-[100px] text-center py-4 rounded shadow text-xs relative cursor-pointer flex place-items-center justify-center"
                        @click="() => copyContent(color)">
                        {{ color.toUpperCase() }}
                        <div class="absolute top-0 left-1 text-xs">
                            {{ i }}
                        </div>
                        <div
                            class="absolute top-2 left-2 h-[84px] w-[84px] rounded bg-gradient-to-br from-transparent to-[#FFFFFF30]" />
                    </div>
                </div>
            </div>
        </BaseCard>

        <div class="mt-12 bg-[#FFFFFF10] w-full p-4">
            <h2 class="text-2xl mb-4">Color Bridge</h2>
            {{ colorBridgeDescription[store.lang] }}
            <div class="flex flex-row justify-center mt-6">
                <code>npm i color-bridge</code>
            </div>

            <BaseCard class="w-full my-6">
                <CodeParser :content="colorBridgeCode" language="javascript" @copy="store.copy()" />
            </BaseCard>

            <div class="flex flex-row justify-center mt-6">
                <button
                    class="py-2 px-5 rounded flex flew-row place-items-center gap-2 bg-gray-200 dark:bg-[#FFFFFF20] shadow-md hover:shadow-lg transition-all">
                    <ColorBridgeIcon />
                    <a href="https://color-bridge.graphieros.com/" target="_blank">
                        Color Bridge docs
                    </a>
                </button>
            </div>
        </div>

                <p class="my-6" dir="auto">
            {{ description[store.lang] }}
        </p>

        <ComponentsTable :cols="['Component', 'customPalette']">
            <template #th="{ col }">
                {{ col }}
            </template>

            <template #Component="{ row }">
                <div class="flex flex-row gap-2 place-items-center">
                    <VueUiIcon :name="row.icon" :stroke="isDarkMode ? '#CCCCCC' : '#4A4A4A'" />
                    <RouterLink :to="`/docs#${row.link}`" class="hover:underline">
                        <span class="text-gray-500">VueUi</span><span>{{ row.name.replaceAll("VueUi", "") }}</span>
                    </RouterLink>
                </div>
            </template>

            <template #customPalette="{ row }">
                <div class="w-full h-full flex justify-center" :style="{ background: row.customPalette ? '#42d39230' : 'transparent'}">
                    <CheckIcon v-if="row.customPalette" :stroke="isDarkMode ? '#42d392': '#1d915d'" />
                </div>
            </template>
        </ComponentsTable>
    </div>
</template>
