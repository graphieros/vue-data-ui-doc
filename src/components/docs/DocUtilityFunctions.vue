<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useMainStore } from "../../stores";
import { abbreviate, darkenColor, getVueDataUiConfig, lightenColor, shiftColorHue, useObjectBindings } from "vue-data-ui";
import BaseColorInput from "../BaseColorInput.vue";
import BaseNumberInput from "../BaseNumberInput.vue";
import CodeParser from "../customization/CodeParser.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import { applyDataCorrection } from "vue-data-ui/utils";

const store = useMainStore();

const translations = computed(() => store.translations);
const isDarkMode =  computed(() => store.isDarkMode);
const isMenuOpen = computed(() => store.isMenuOpen);

onMounted(() => store.docSnap = false);

const utilityTranslations = ref({
    mergeConfigs: {
        en: 'Use the `mergeConfigs` utility to deeply merge a default config with a user config. Attributes provided in the user config will surgically override the default config, while preserving all other attributes of the original object.',
        fr: 'Utilisez l’utilitaire `mergeConfigs` pour fusionner en profondeur une configuration par défaut avec une configuration utilisateur. Les attributs fournis dans la configuration utilisateur remplacent précisément ceux de la configuration par défaut, tout en préservant tous les autres attributs de l’objet original.',
        pt: 'Use o utilitário `mergeConfigs` para mesclar profundamente uma configuração padrão com uma configuração do usuário. Os atributos fornecidos na configuração do usuário substituem de forma precisa os da configuração padrão, preservando todos os outros atributos do objeto original.',
        de: 'Verwenden Sie das Hilfsprogramm `mergeConfigs`, um eine Standardkonfiguration tiefgehend mit einer Benutzerkonfiguration zusammenzuführen. In der Benutzerkonfiguration angegebene Attribute überschreiben gezielt die Standardkonfiguration, während alle anderen Attribute des ursprünglichen Objekts erhalten bleiben.',
        zh: '使用 `mergeConfigs` 工具将默认配置与用户配置进行深度合并。用户配置中提供的属性会精确地覆盖默认配置中的对应属性，同时保留原始对象中的所有其他属性。',
        ja: '`mergeConfigs` ユーティリティを使用して、デフォルト設定とユーザー設定を深くマージします。ユーザー設定で指定された属性はデフォルト設定を正確に上書きし、元のオブジェクトの他のすべての属性は保持されます。',
        es: 'Utiliza la utilidad `mergeConfigs` para combinar en profundidad una configuración predeterminada con una configuración del usuario. Los atributos proporcionados en la configuración del usuario sobrescriben de forma precisa los de la configuración predeterminada, conservando todos los demás atributos del objeto original.',
        ko: '`mergeConfigs` 유틸리티를 사용하여 기본 구성과 사용자 구성을 깊게 병합합니다. 사용자 구성에 제공된 속성은 기본 구성을 정확하게 덮어쓰며, 원본 객체의 다른 모든 속성은 그대로 유지됩니다.',
        ar: 'استخدم الأداة `mergeConfigs` لدمج الإعدادات الافتراضية مع إعدادات المستخدم بشكل عميق. تقوم الخصائص الموفرة في إعدادات المستخدم باستبدال الخصائص المقابلة بدقة، مع الحفاظ على جميع الخصائص الأخرى للكائن الأصلي.'
    },
    mergeConfigsExample: {
        en: 'Use `mergeConfigs` together with `getVueDataUiConfig` to quickly setup custom themes, by providing a set of general colors.',
        fr: 'Utilisez `mergeConfigs` conjointement avec `getVueDataUiConfig` pour configurer rapidement des thèmes personnalisés en fournissant un ensemble de couleurs générales.',
        pt: 'Use `mergeConfigs` junto com `getVueDataUiConfig` para configurar rapidamente temas personalizados, fornecendo um conjunto de cores gerais.',
        de: 'Verwenden Sie `mergeConfigs` zusammen mit `getVueDataUiConfig`, um benutzerdefinierte Themes schnell einzurichten, indem Sie einen Satz allgemeiner Farben bereitstellen.',
        zh: '将 `mergeConfigs` 与 `getVueDataUiConfig` 结合使用，通过提供一组通用颜色来快速设置自定义主题。',
        ja: '`mergeConfigs` を `getVueDataUiConfig` と組み合わせて使用することで、一般的なカラーパレットを指定し、カスタムテーマを素早く設定できます。',
        es: 'Utiliza `mergeConfigs` junto con `getVueDataUiConfig` para configurar rápidamente temas personalizados proporcionando un conjunto de colores generales.',
        ko: '`mergeConfigs`를 `getVueDataUiConfig`와 함께 사용하여 일반적인 색상 세트를 제공함으로써 사용자 정의 테마를 빠르게 설정할 수 있습니다.',
        ar: 'استخدم `mergeConfigs` مع `getVueDataUiConfig` لإعداد سمات مخصصة بسرعة من خلال توفير مجموعة من الألوان العامة.'
    },
    useObjectBindings: {
        en: 'useObjectBindings is a composable that flattens a reactive object into a set of refs (one for each “leaf” property) so you can easily bind to deeply nested values by their string paths.',
        fr: 'useObjectBindings est un composable qui aplatit un objet réactif en un ensemble de refs (une pour chaque propriété « feuille ») afin que vous puissiez facilement lier des valeurs profondément imbriquées via leurs chemins sous forme de chaîne.',
        pt: 'useObjectBindings é um composable que achata um objeto reativo em um conjunto de refs (uma para cada propriedade “folha”), para que você possa vincular facilmente valores profundamente aninhados pelos seus caminhos em string.',
        de: 'useObjectBindings ist ein Composable, das ein reaktives Objekt in ein Set von Refs (je eine für jede „Blatteigenschaft“) abflacht, sodass Sie tief verschachtelte Werte einfach anhand ihrer String-Pfade binden können.',
        zh: 'useObjectBindings 是一个可组合函数，它将一个响应式对象展平为一组 refs（针对每个“叶子”属性一个），这样您就可以通过字符串路径轻松绑定到深层嵌套的值。',
        ja: 'useObjectBindings は、リアクティブオブジェクトを各「リーフ」プロパティごとに1つの ref を持つ一連の refs にフラット化するコンポーザブルで、文字列パスを使って深くネストされた値に簡単にバインドできるようにします。',
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
        ja: "ラベルの略語を生成する",
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
        ja: "指定された強さで色を暗くする",
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
        ja: "指定された強さで色を明るくする",
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
        ja: "指定された強さで特定の色の色相をシフトします",
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
        ja: "文字列から TSpan 要素を作成して、テキストを複数行に分割します。出力は `v-html` を使用して SVG `<text>` 要素内に配置する必要があります。",
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
        ja: '数値の配列から累積平均の配列を返す',
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
        ja: '数値の配列から累積中央値の配列を返す',
        es: 'A partir de un array de números, devuelve un array de medianas acumuladas',
        ko: '숫자 배열에서 누적 중앙값 배열을 반환',
        ar: 'من مصفوفة أرقام، أعِد مصفوفة من الوسيطات التراكمية'
    },
    applyDataCorrection: {
        en: 'Applies a two-stage data correction pipeline to a numeric time series. This utility is designed for visual data refinement, where smoothness is required without distorting boundary values or shifting peaks and transitions.',
        fr: "Applique un pipeline de correction des données en deux étapes à une série temporelle numérique. Cet utilitaire est conçu pour l'affinage visuel des données, lorsque la fluidité est requise sans déformer les valeurs aux limites ni déplacer les pics et les transitions.",
        pt: 'Aplica um pipeline de correção de dados em duas etapas a uma série temporal numérica. Este utilitário foi projetado para refinamento visual de dados, quando é necessário suavidade sem distorcer valores de limite ou deslocar picos e transições.',
        de: 'Wendet eine zweistufige Datenkorrektur-Pipeline auf eine numerische Zeitreihe an. Dieses Dienstprogramm dient der visuellen Datenverfeinerung, wenn Glättung erforderlich ist, ohne Randwerte zu verzerren oder Spitzen und Übergänge zu verschieben.',
        zh: '对数值时间序列应用两阶段数据校正流程。该工具用于视觉数据优化，在需要平滑效果的同时，不会扭曲边界值或移动峰值和过渡。',
        ja: '数値時系列に対して2段階のデータ補正パイプラインを適用します。このユーティリティは、境界値を歪めたりピークや遷移を移動させたりすることなく、滑らかさが求められる視覚的データ調整のために設計されています。',
        es: 'Aplica una canalización de corrección de datos en dos etapas a una serie temporal numérica. Esta utilidad está diseñada para el refinamiento visual de datos, cuando se requiere suavidad sin distorsionar los valores límite ni desplazar picos y transiciones.',
        ko: '숫자 시계열에 두 단계 데이터 보정 파이프라인을 적용합니다. 이 유틸리티는 경계 값을 왜곡하거나 피크 및 전환을 이동시키지 않으면서 부드러움이 필요한 시각적 데이터 정제를 위해 설계되었습니다.',
        ar: 'يطبق خط معالجة لتصحيح البيانات من مرحلتين على سلسلة زمنية رقمية. تم تصميم هذه الأداة لتحسين عرض البيانات بصريًا عند الحاجة إلى السلاسة دون تشويه القيم الحدّية أو إزاحة القمم والانتقالات.'
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

const mergeConfigsContent = ref(`import { mergeConfigs } from "vue-data-ui";

const objA = ref({
    bar: 'BAR'
    foo: {
        propA: 'A',
        propB: 'B',
        propC: null
    }
});

const merged = computed(() => {
    return mergeConfigs({
        defaultConfig: objA.value,
        userConfig: {
            bar: 'ZZZ',
            foo: {
                propC: 'C'
            }
        }
    })
});

/*
* Result: both objects are merged, preserving the unchanged attributes from the original
*   {
*       bar: 'ZZZ',
*       foo: {
*           propA: 'A',
*           propB: 'B',
*           propC: 'C'
*       }
*   }
*/
`);

const getVueDataUiConfigAndMergeConfigsContent = ref(`import { getVueDataUiConfig, mergeConfigs } from "vue-data-ui";

// Get the default config and set color options for a given component
const customTheme = getVueDataUiConfig("vue_ui_xy", {
    colorBackground: "#1A1A1A",
    colorTextPrimary: "#CD9077",
    colorTextSecondary: "#825848",
    colorGrid: "#CD9077",
    colorBorder: "#CD9077",
});

const config = computed(() => {
    // Use the \`mergeConfigs\` utility to set additional configurations while preserving your theme
    return mergeConfigs({
        defaultConfig: customTheme,
        userConfig: {
            chart: {
                title: {
                    text: "Title",
                    subtitle: {
                        text: "Subtitle",
                    },
                },
            },
        },
    });
});
`)

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
        ja: '簡単な使用方法',
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
        ja: '無効な値を完全に無視する',
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
        ja: '無効な値をゼロに変換する',
        es: 'Convertir valores inválidos a cero',
        ko: '잘못된 값을 0으로 변환',
        ar: 'تحويل القيم غير الصالحة إلى صفر'
    },
    averageWindow: {
        en: 'Bidirectional moving average. Blends a trailing (left-anchored) and leading (right-anchored) average by position so transitions from both fixed endpoints are smooth. First and last points are preserved.',
        fr: "Moyenne mobile bidirectionnelle. Combine une moyenne rétrospective (ancrée à gauche) et une moyenne prospective (ancrée à droite) selon la position afin d'assurer des transitions fluides depuis les deux extrémités fixes. Les premier et dernier points sont conservés.",
        pt: 'Média móvel bidirecional. Combina uma média retroativa (ancorada à esquerda) e uma média antecipada (ancorada à direita) conforme a posição, garantindo transições suaves a partir de ambas as extremidades fixas. O primeiro e o último pontos são preservados.',
        de: 'Bidirektionaler gleitender Durchschnitt. Kombiniert einen nachlaufenden (links verankerten) und einen vorlaufenden (rechts verankerten) Durchschnitt positionsabhängig, sodass Übergänge von beiden festen Endpunkten aus glatt verlaufen. Der erste und letzte Punkt bleiben erhalten.',
        zh: '双向移动平均。根据位置融合滞后（左锚定）和前向（右锚定）平均值，使从两个固定端点过渡更加平滑。首尾点保持不变。',
        ja: '双方向移動平均。位置に応じて後方（左アンカー）平均と前方（右アンカー）平均を組み合わせ、両端の固定点からの遷移を滑らかにします。最初と最後の点は保持されます。',
        es: 'Media móvil bidireccional. Combina una media retrospectiva (anclada a la izquierda) y una media prospectiva (anclada a la derecha) según la posición, de modo que las transiciones desde ambos extremos fijos sean suaves. Se conservan el primer y el último punto.',
        ko: '양방향 이동 평균. 위치에 따라 후행(왼쪽 기준) 평균과 선행(오른쪽 기준) 평균을 결합하여 양쪽 고정 끝점에서의 전환이 부드럽게 이루어지도록 합니다. 첫 번째와 마지막 포인트는 유지됩니다.',
        ar: 'متوسط متحرك ثنائي الاتجاه. يمزج بين متوسط متأخر (مرتكز إلى اليسار) ومتوسط متقدم (مرتكز إلى اليمين) حسب الموضع لضمان انتقالات سلسة من كلا الطرفين الثابتين. يتم الحفاظ على أول وآخر نقطة.'
    },
    smoothingTau: {
        en: 'Forward-backward exponential smoothing (zero-phase). Smooths without introducing lag — preserves the dynamics/timing of trends. First and last points are preserved.',
        fr: "Lissage exponentiel avant-arrière (phase nulle). Lisse les données sans introduire de décalage — préserve la dynamique et le timing des tendances. Les premier et dernier points sont conservés.",
        pt: 'Suavização exponencial direta e inversa (fase zero). Suaviza sem introduzir atraso — preserva a dinâmica e o timing das tendências. O primeiro e o último pontos são preservados.',
        de: 'Vorwärts-Rückwärts-Exponentielle Glättung (Nullphase). Glättet ohne Verzögerung einzuführen — bewahrt die Dynamik und das zeitliche Verhalten von Trends. Der erste und letzte Punkt bleiben erhalten.',
        zh: '前向-后向指数平滑（零相位）。在不引入滞后的情况下进行平滑——保留趋势的动态和时序。首尾点保持不变。',
        ja: '前後方向の指数平滑化（ゼロ位相）。遅延を生じさせることなく平滑化し、トレンドのダイナミクスやタイミングを保持します。最初と最後の点は保持されます。',
        es: 'Suavizado exponencial hacia adelante y hacia atrás (fase cero). Suaviza sin introducir retraso — preserva la dinámica y el tiempo de las tendencias. Se conservan el primer y el último punto.',
        ko: '전방-후방 지수 평활화(영위상). 지연을 발생시키지 않으면서 부드럽게 처리하여 추세의 동역학과 타이밍을 유지합니다. 첫 번째와 마지막 포인트는 유지됩니다.',
        ar: 'تنعيم أسي أمامي-خلفي (طور صفري). يقوم بالتنعيم دون إدخال تأخير — يحافظ على ديناميكيات واتجاهات التوقيت. يتم الحفاظ على أول وآخر نقطة.'
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

const _averageWindow = ref(0);
const _smoothingTau = ref(0);

const ds = [1, 2, 3, 4, 5, 100, 7, 8, 9, 10, 11, 12]

const xyDatasetCorrected = computed(() => {
    return [
        {
            name: 'Series A',
            type: 'line',
            series: applyDataCorrection(ds.map(d => ({ value: d })), { averageWindow: _averageWindow.value, smoothingTau: _smoothingTau.value }).map(d => d.value)
        }
    ]
});

const xyConfig = computed(() => {
    return {
        theme: isDarkMode.value ? 'dark' : '',
        chart: {
            userOptions: {
                show: false,
            },
            zoom: {
                show: false
            }
        }
    }
})

const dataCorrectionCode = computed(() => {
    return `import { applyDataCorrection } from "vue-data-ui/utils;

const source = [1, 2, 3, 4, 5, 100, 7, 8, 9, 10, 11, 12];

const dataset = computed(() => ([
    {
        name: 'Series A',
        type: 'line',
        series: applyDataCorrection(
            ds.map(d => ({ value: d })), 
            { averageWindow: ${_averageWindow.value}, smoothingTau: ${_smoothingTau.value} }
        ).map(d => d.value)
    }
]))
    `
})

const importSnippet = computed(() => `import {
    abbreviate,
    applyDataCorrection,
    createTSpans,
    darkenColor,
    getCumulativeAverage,
    getCumulativeMedian,
    getVueDataUiConfig,
    lightenColor,
    mergeConfigs,
    shiftColorHue,
    useObjectBindings,
} from "vue-data-ui/utils";`);

const utilityMenu = [
    'applyDataCorrection',
    'useObjectBindings',
    'mergeConfigs',
    'getVueDataUiConfig',
    'abbreviate',
    'darkenColor',
    'lightenColor',
    'shiftColorHue',
    'createTSpans',
    'getCumulativeAverage',
    'getCumulativeMedian',
]

const activeSectionId = ref("");
let sectionObserver = null;

function scrollToSection(sectionId) {
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    sectionElement.scrollIntoView({ block: "start" });
    activeSectionId.value = sectionId;
}

function startSectionObserver() {
    if (sectionObserver) sectionObserver.disconnect();

    const sectionElements = utilityMenu
        .map((sectionId) => document.getElementById(sectionId))
        .filter(Boolean);

    if (!sectionElements.length) return;

    sectionObserver = new IntersectionObserver(
        (entries) => {
        const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const topEntry = visibleEntries[0];
        const sectionId = topEntry.target.id;
        if (sectionId) activeSectionId.value = sectionId;
        },
        {
            root: null,
            rootMargin: "-140px 0px -60% 0px",
            threshold: [0.1, 0.25, 0.5, 0.75],
        }
    );

    sectionElements.forEach((element) => sectionObserver.observe(element));
}

onMounted(async () => {
    await nextTick();
    startSectionObserver();
});

onBeforeUnmount(() => {
    if (sectionObserver) sectionObserver.disconnect();
});

</script>

<template>
    <div :class="`fixed top-[82px] ${isMenuOpen ? 'left-[300px]' : 'left-[60px]'} z-10 p-4 bg-[#FAFAFA] dark:bg-[#3A3A3A] shadow-md`" :style="{
        width: isMenuOpen ? 'calc(100vw - 300px)' : 'calc(100vw - 60px)'
    }">
        <div class="flex flex-row flex-wrap gap-2 leading-[1px] pr-12 text-xs">
            <div :class="`hover:shadow-md font-mono p-2 rounded-full transition-all ${link === activeSectionId ? 'bg-app-blue text-[#1A1A1A] shadow-md' : 'bg-gray-200 dark:bg-[#4A4A4A] hover:bg-gray-100 dark:hover:bg-[#5A5A5A]'}`" v-for="link in utilityMenu">
                <a class="cursor-pointer" @click="scrollToSection(link)">{{ link }}</a>
            </div>
        </div>
    </div>

    <div>
        <h1 class="mt-[124px] flex flex-row place-items-center w-full justify-center gap-5 font-inter-medium text-app-blue mb-2 text-2xl">
            <VueUiIcon name="func" stroke="#42d392" :strokeWidth="1.5" />
            <span><span class="text-black dark:text-app-blue-light">{{ translations.utilityFunctions[store.lang] }}</span></span>
        </h1>

        <BaseDocDescription :text="translations.utilityFunctionsDescription[store.lang]"/>

        <BaseCard class="font-mono mt-12">
            <div class="flex flex-row gap-2 align-center">
                <VueUiIcon name="plug" :stroke="isDarkMode ? '#CCCCCC' : '#3A3A3A'"/>
                <h2 class="text-xl">Importing utility functions</h2>
            </div>

            <p class="mt-2 px-8 text-gray-500 dark:text-app-blue-light font-inter">
                All utility functions can be directly imported from "vue-data-ui"
            </p>
            <p class="mt-2 px-8 text-gray-500 dark:text-app-blue-light font-inter">
                Since v3.15.9, utility functions and their types are treeshaken, and can be imported as:
            </p>

            <CodeParser class="mt-4" language="javascript" :content="importSnippet" @copy="store.copy()"/>
            
        </BaseCard>

        <BaseCard class="mt-6" id="applyDataCorrection">
            <div class="p-4" dir="auto">
                <code class="text-xl">applyDataCorrection</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.applyDataCorrection[store.lang] }}</p>

                <div class="p-4 overflow-auto">
                    <div class="flex flex-col gap-4 flex-wrap max-w-[600px] mx-auto mb-4">
                        <label class="flex flex-col">
                            <code>averageWindow ({{ _averageWindow }})</code>
                            <code class="text-xs mb-2 text-gray-500 dark:text-[#8A8A8A]">{{ comments.averageWindow[store.lang] }}</code>
                            <input v-model="_averageWindow" type="range" :min="0" :max="20" class="accent-app-blue">
                        </label>
                        <label class="flex flex-col">
                            <code>smoothingTau ({{ _smoothingTau }})</code>
                            <code class="text-xs mb-2 text-gray-500 dark:text-[#8A8A8A]">{{ comments.smoothingTau[store.lang] }}</code>
                            <input v-model="_smoothingTau" type="range" :min="0" :max="20" class="accent-app-blue">
                        </label>
                    </div>
                    <div class="mx-auto max-w-[600px] p-4 bg-white dark:bg-[#1A1A1A] rounded mb-4">                            
                        <VueUiXy
                            :dataset="xyDatasetCorrected"
                            :config="xyConfig"
                        />
                    </div>

                    <CodeParser language="javascript" :content="dataCorrectionCode" @copy="store.copy()"/>
                </div>
            </div>
        </BaseCard>

        <BaseCard class="mt-6" id="useObjectBindings">
            <div class="p-4" dir="auto">
                <code class="text-xl">useObjectBindings</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.useObjectBindings[store.lang] }}</p>
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
            <div class="p-4" dir="auto" id="mergeConfigs">
                <code class="text-xl">mergeConfigs</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.mergeConfigs[store.lang] }}</p>
            </div>

            <div class="p-4 overflow-auto">
                <CodeParser :content="mergeConfigsContent" language="javascript" @copy="store.copy()"/>
            </div>

            <div class="p-4" dir="auto" id="getVueDataUiConfig">
                <code class="text-xl">getVueDataUiConfig + mergeConfigs</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.mergeConfigsExample[store.lang] }}</p>
            </div>

            <div class="p-4 overflow-auto">
                <CodeParser :content="getVueDataUiConfigAndMergeConfigsContent" language="javascript" @copy="store.copy()"/>
            </div>
        </BaseCard>

        <BaseCard class="mt-6" id="abbreviate">
            <div class="p-4" dir="auto">
                    <code class="text-xl">abbreviate</code>
                    <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.abbreviate[store.lang] }}</p>
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

        <BaseCard class="mt-6" id="darkenColor">
            <div class="p-4" dir="auto">
                <code class="text-xl">darkenColor</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.darkenColor[store.lang] }}</p>
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

        <BaseCard class="mt-6" id="lightenColor">
            <div class="p-4" dir="auto">
                <code class="text-xl">lightenColor</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.lightenColor[store.lang] }}</p>
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

        <BaseCard class="mt-6" id="shiftColorHue">
            <div class="p-4" dir="auto">
                <code class="text-xl">shiftColorHue</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.shiftColorHue[store.lang] }}</p>
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

        <BaseCard class="mt-6" id="createTSpans">
            <div class="p-4" dir="auto">
                <code class="text-xl">createTSpans</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.createTSpans[store.lang] }}</p>
            </div>

            <div class="p-4 overflow-auto">
                <CodeParser :content="createTSpanContent" language="javascript" @copy="store.copy()"/>
                <CodeParser :content="createTSpanTemplate" language="html" @copy="store.copy()"/>
            </div>
        </BaseCard>

        <BaseCard class="mt-6" id="getCumulativeAverage">
            <div class="p-4" dir="auto">
                <code class="text-xl">getCumulativeAverage</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.getCumulativeAverage[store.lang] }}</p>
            </div>
            <div class="p-4 overflow-auto">
                <CodeParser :content="getCumulativeAverageTemplate" language="javascript" @copy="store.copy()"/>
            </div>
        </BaseCard>

        <BaseCard class="mt-6" id="getCumulativeMedian">
            <div class="p-4" dir="auto">
                <code class="text-xl">getCumulativeMedian</code>
                <p class="mt-2 text-gray-500 dark:text-app-blue-light">{{ utilityTranslations.getCumulativeMedian[store.lang] }}</p>
            </div>
            <div class="p-4 overflow-auto">
                <CodeParser :content="getCumulativeMedianTemplate" language="javascript" @copy="store.copy()"/>
            </div>
        </BaseCard>
</div>

</template>

<style scoped>
[id] {
    scroll-margin-top: 175px;
}
</style>