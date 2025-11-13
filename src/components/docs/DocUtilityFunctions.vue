<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../../stores";
import { abbreviate, darkenColor, getVueDataUiConfig, lightenColor, shiftColorHue, useObjectBindings } from "vue-data-ui";
import BaseColorInput from "../BaseColorInput.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";

const store = useMainStore();

const translations = computed(() => store.translations);

onMounted(() => store.docSnap = false);

const utilityTranslations = ref({
    useObjectBindings: {
        en: 'useObjectBindings is a composable that flattens a reactive object into a set of refs (one for each “leaf” property) so you can easily bind to deeply nested values by their string paths.',
        fr: 'useObjectBindings est un composable qui aplatit un objet réactif en un ensemble de refs (une pour chaque propriété « feuille ») afin que vous puissiez facilement lier des valeurs profondément imbriquées via leurs chemins sous forme de chaîne.',
        pt: 'useObjectBindings é um composable que achata um objeto reativo em um conjunto de refs (uma para cada propriedade “folha”), para que você possa vincular facilmente valores profundamente aninhados pelos seus caminhos em string.',
        de: 'useObjectBindings ist ein Composable, das ein reaktives Objekt in ein Set von Refs (je eine für jede „Blatteigenschaft“) abflacht, sodass Sie tief verschachtelte Werte einfach anhand ihrer String-Pfade binden können.',
        zh: 'useObjectBindings 是一个可组合函数，它将一个响应式对象展平为一组 refs（针对每个“叶子”属性一个），这样您就可以通过字符串路径轻松绑定到深层嵌套的值。',
        jp: 'useObjectBindings は、リアクティブオブジェクトを各“リーフ”プロパティごとに1つの ref を持つ一連の refs にフラット化するコンポーザブルで、文字列パスを使って深くネストされた値に簡単にバインドできるようにします。',
        es: 'useObjectBindings es un composable que aplana un objeto reactivo en un conjunto de refs (una por cada propiedad “hoja”) para que puedas enlazar fácilmente valores profundamente anidados mediante sus rutas de cadena de texto.',
        ko: 'useObjectBindings는 반응형 객체를 각 “리프” 속성마다 하나의 ref로 평탄화하는 composable로, 문자열 경로를 통해 깊이 중첩된 값에 쉽게 바인딩할 수 있게 해줍니다.',
        ar: 'useObjectBindings هو كومبوزابل يقوم بتحويل كائن تفاعلي إلى مجموعة من refs (واحدة لكل خاصية “ورقية”) لتتمكن من ربط القيم المتداخلة بعمق بسهولة عبر مساراتها النصية.'
    },
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
    },
    createTSpans: {
        en: "Create TSpan elements from a string to break text into multiple lines. The output should be placed with `v-html` inside an SVG `<text>` element.",
        fr: "Créez des éléments TSpan à partir d'une chaîne pour diviser le texte en plusieurs lignes. La sortie doit être placée avec `v-html` à l'intérieur d'un élément `<text>` SVG.",
        pt: "Crie elementos TSpan a partir de uma string para dividir o texto em várias linhas. A saída deve ser colocada com `v-html` dentro de um elemento `<text>` SVG.",
        de: "Erstellen Sie TSpan-Elemente aus einer Zeichenkette, um Text in mehrere Zeilen aufzubrechen. Die Ausgabe sollte mit `v-html` in einem SVG-`<text>`-Element platziert werden.",
        zh: "从字符串创建 TSpan 元素，以将文本拆分为多行。输出应使用 `v-html` 放置在 SVG `<text>` 元素内。",
        jp: "文字列から TSpan 要素を作成して、テキストを複数行に分割します。出力は `v-html` を使用して SVG `<text>` 要素内に配置する必要があります。",
        es: "Crea elementos TSpan a partir de una cadena para dividir el texto en varias líneas. La salida debe colocarse con `v-html` dentro de un elemento `<text>` SVG.",
        ko: "문자열에서 TSpan 요소를 생성하여 텍스트를 여러 줄로 나눕니다. 출력은 `v-html`을 사용하여 SVG `<text>` 요소 내에 배치해야 합니다.",
        ar: "قم بإنشاء عناصر TSpan من سلسلة نصية لتقسيم النص إلى عدة أسطر. يجب وضع الإخراج باستخدام `v-html` داخل عنصر `<text>` في SVG."
    },
    getCumulativeAverage: {
        en: 'From an array of numbers, return an array of cumulative averages',
        fr: 'À partir d\'un tableau de nombres, retourner un tableau des moyennes cumulées',
        pt: 'A partir de um array de números, retorne um array de médias cumulativas',
        de: 'Aus einem Array von Zahlen ein Array kumulativer Durchschnitte zurückgeben',
        zh: '从数字数组返回累积平均值数组',
        jp: '数値の配列から累積平均の配列を返す',
        es: 'A partir de un array de números, devuelve un array de promedios acumulados',
        ko: '숫자 배열에서 누적 평균 배열을 반환',
        ar: 'من مصفوفة أرقام، أعِد مصفوفة من المتوسطات التراكمية'
    },
    getCumulativeMedian: {
        en: 'From an array of numbers, return an array of cumulative medians',
        fr: 'À partir d\'un tableau de nombres, retourner un tableau des médianes cumulées',
        pt: 'A partir de um array de números, retorne um array de medianas cumulativas',
        de: 'Aus einem Array von Zahlen ein Array kumulativer Mediane zurückgeben',
        zh: '从数字数组返回累积中位数数组',
        jp: '数値の配列から累積中央値の配列を返す',
        es: 'A partir de un array de números, devuelve un array de medianas acumuladas',
        ko: '숫자 배열에서 누적 중앙값 배열을 반환',
        ar: 'من مصفوفة أرقام، أعِد مصفوفة من الوسيطات التراكمية'
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

const createTSpanContent = computed(() => `import { createTSpans } from "vue-data-ui";

const textContent = createTSpans({
    content: "This is an example of multiline text",
    fontSize: 16,
    fill: "#333",
    maxWords: 2,
    x: 10,
    y: 20
});`)

const createTSpanTemplate = computed(() => `<text
    :x="10"
    :y="20"
    :font-size="16"
    fill="#1A1A1A"
    text-anchor="middle"
    v-html="textContent"
/>`
)

const bindingsContent = computed(() => `import { useObjectBindings, getVueDataUiConfig } from "vue-data-ui";

const config = ref(getVueDataUiConfig('vue_ui_donut'));
const bindings = useObjectBindings(config);
`)

const bindingsTemplate = computed(() => `<template>
    <div>
        <label>
            Background color:
            <input type="color" v-model="bindings['style.chart.backgroundColor'].value">
        </label>
    </div>
</template>
`)

const comments = ref({
    simpleUsage: {
        en: 'Simple usage',
        fr: 'Utilisation simple',
        pt: 'Uso simples',
        de: 'Einfache Verwendung',
        zh: '简单用法',
        jp: '簡単な使用方法',
        es: 'Uso simple',
        ko: '간단한 사용법',
        ar: 'استخدام بسيط'
    },
    ignore: {
        en: 'Ignore invalid values entirely',
        fr: 'Ignorer complètement les valeurs invalides',
        pt: 'Ignorar totalmente os valores inválidos',
        de: 'Ungültige Werte vollständig ignorieren',
        zh: '完全忽略无效值',
        jp: '無効な値を完全に無視する',
        es: 'Ignorar completamente los valores inválidos',
        ko: '잘못된 값을 완전히 무시',
        ar: 'تجاهل القيم غير الصالحة تمامًا'
    },
    convert: {
        en: 'Convert invalid values to zero',
        fr: 'Convertir les valeurs invalides en zéro',
        pt: 'Converter valores inválidos para zero',
        de: 'Ungültige Werte auf Null umwandeln',
        zh: '将无效值转换为零',
        jp: '無効な値をゼロに変換する',
        es: 'Convertir valores inválidos a cero',
        ko: '잘못된 값을 0으로 변환',
        ar: 'تحويل القيم غير الصالحة إلى صفر'
    }
})

const getCumulativeAverageTemplate = computed(() => `import { getCumulativeAverage } from "vue-data-ui";

// ${comments.value.simpleUsage[store.lang]}
const arr = [0, 1, 2, 3, 4];
const cumulativeAvg = getCumulativeAverage({ values: arr });

// ${comments.value.ignore[store.lang]}
const arrWithInvalid = [0, 1, 2, null, undefined, NaN, Infinity, -Infinity];
const cumulativeAvgNoInvalid = getCumulativeAverage({
    values: arrWithInvalid,
    config: { keepInvalid: false }
});

// ${comments.value.convert[store.lang]}
const cumulativeAvgZeroed = getCumulativeAverage({
    values: arrWithInvalid,
    config: { convertInvalidToZero: true }
});
`);

const getCumulativeMedianTemplate = computed(() => `import { getCumulativeMedian } from "vue-data-ui";

// ${comments.value.simpleUsage[store.lang]}
const arr = [0, 1, 2, 3, 4];
const cumulativeMed = getCumulativeMedian({ values: arr });

// ${comments.value.ignore[store.lang]}
const arrWithInvalid = [0, 1, 2, null, undefined, NaN, Infinity, -Infinity];
const cumulativeMedNoInvalid = getCumulativeMedian({
    values: arrWithInvalid,
    config: { keepInvalid: false }
});

// ${comments.value.convert[store.lang]}
const cumulativeMedZeroed = getCumulativeMedian({
    values: arrWithInvalid,
    config: { convertInvalidToZero: true }
});
`)

const donutSet = ref([
    {
        name: 'Series 1',
        values: [1]
    },
    {
        name: 'Series 2',
        values: [1]
    },
    {
        name: 'Series 3',
        values: [1]
    },
])

const donutConfig = ref(getVueDataUiConfig('vue_ui_donut'));
const bindings = useObjectBindings(donutConfig);

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-app-blue mb-2 text-2xl">
            <VueUiIcon name="func" stroke="#42d392" :strokeWidth="1.5" />
            <span><span class="text-black dark:text-app-blue-light">{{ translations.utilityFunctions[store.lang] }}</span></span>
        </h1>

        <BaseDocDescription :text="translations.utilityFunctionsDescription[store.lang]" />

            <BaseCard>
                <div class="p-4" dir="auto">
                    <code class="text-lg">useObjectBindings</code>
                    <p class="text-gray-500">{{ utilityTranslations.useObjectBindings[store.lang] }}</p>
                </div>

                <div class="p-4 overflow-auto">
                    <CodeParser :content="bindingsContent" language="javascript" @copy="store.copy()"/>
                    <CodeParser :content="bindingsTemplate" language="html" @copy="store.copy()" class="mt-4"/>
                </div>

                <div class="mx-auto max-w-[300px] my-4">
                    <label class="flex flex-row gap-2">
                        Background color:
                        <input type="color" v-model="bindings['style.chart.backgroundColor'].value" class="mb-4">
                    </label>
                    <VueUiDonut
                        :dataset="donutSet"
                        :config="donutConfig"
                    >
                    </VueUiDonut>
                    <div class="mt-2">
                        <a 
                            href="https://github.com/graphieros/vue-data-ui/discussions/226" 
                            target="_blank"
                            class="underline text-[14px] hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Check out where this solution came from
                        </a>
                    </div>
                </div>
            </BaseCard>

            <BaseCard class="mt-6">
                <div class="p-4" dir="auto">
                        <code class="text-lg">abbreviate</code>
                        <p class="text-gray-500">{{ utilityTranslations.abbreviate[store.lang] }}</p>
                    </div>


                <div class="p-4 overflow-auto">
                    <CodeParser :content="abbrContent" language="javascript" @copy="store.copy()"/>
                </div>

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
            </BaseCard>

            <BaseCard class="mt-6">
                        <div class="p-4" dir="auto">
            <code class="text-lg">darkenColor</code>
            <p class="text-gray-500">{{ utilityTranslations.darkenColor[store.lang] }}</p>
        </div>


    <div class="p-4 overflow-auto">
        <CodeParser :content="darkenContent" language="javascript" @copy="store.copy()"/>
    </div>


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

            </BaseCard>


            <BaseCard class="mt-6">
                <div class="p-4" dir="auto">
                    <code class="text-lg">lightenColor</code>
                    <p class="text-gray-500">{{ utilityTranslations.lightenColor[store.lang] }}</p>
                </div>

                <div class="p-4 overflow-auto">
                    <CodeParser :content="lightenContent" language="javascript" @copy="store.copy()"/>
                </div>

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
            </BaseCard>

            <BaseCard class="mt-6">
                <div class="p-4" dir="auto">
                    <code class="text-lg">shiftColorHue</code>
                    <p class="text-gray-500">{{ utilityTranslations.shiftColorHue[store.lang] }}</p>
                </div>

                <div class="p-4 overflow-auto">
                    <CodeParser :content="shiftColorContent" language="javascript" @copy="store.copy()"/>
                </div>


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

            </BaseCard>

            <BaseCard class="mt-6">
                <div class="p-4" dir="auto">
                    <code class="text-lg">createTSpans</code>
                    <p class="text-gray-500">{{ utilityTranslations.createTSpans[store.lang] }}</p>
                </div>

                <div class="p-4 overflow-auto">
                    <CodeParser :content="createTSpanContent" language="javascript" @copy="store.copy()"/>
                    <CodeParser :content="createTSpanTemplate" language="html" @copy="store.copy()"/>
                </div>
            </BaseCard>

            <BaseCard class="mt-6">
                <div class="p-4" dir="auto">
                    <code class="text-lg">getCumulativeAverage</code>
                    <p class="text-gray-500">{{ utilityTranslations.getCumulativeAverage[store.lang] }}</p>
                </div>
                <div class="p-4 overflow-auto">
                    <CodeParser :content="getCumulativeAverageTemplate" language="javascript" @copy="store.copy()"/>
                </div>
            </BaseCard>

            <BaseCard class="mt-6">
                <div class="p-4" dir="auto">
                    <code class="text-lg">getCumulativeMedian</code>
                    <p class="text-gray-500">{{ utilityTranslations.getCumulativeMedian[store.lang] }}</p>
                </div>
                <div class="p-4 overflow-auto">
                    <CodeParser :content="getCumulativeMedianTemplate" language="javascript" @copy="store.copy()"/>
                </div>
            </BaseCard>











</div>

</template>