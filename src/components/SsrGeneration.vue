<script setup>
import { ref, computed, shallowRef, onMounted, watchEffect } from "vue";
import { useMainStore } from "../stores";
import CodeParser from "./customization/CodeParser.vue";
import { useImportMap } from "../useImportMap.js";
import { createStaticVueUiXy } from "vue-data-ui/ssr/vue-ui-xy";
import { createStaticVueUiDonut } from "vue-data-ui/ssr/vue-ui-donut";

const props = defineProps({
    component: { type: String },
})

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const { importName } = useImportMap(props.component);

const translations = shallowRef({
    description: {
        en: `Generate a static version of the ${props.component} component. This utility creates the SVG string that can be injected into the DOM from the server, and does not provide any interaction features.`,
        fr: `Générer une version statique du composant ${props.component}. Cet utilitaire crée la chaîne SVG qui peut être injectée dans le DOM depuis le serveur, et ne fournit aucune fonctionnalité d’interaction.`,
        pt: `Gerar uma versão estática do componente ${props.component}. Este utilitário cria a string SVG que pode ser injetada no DOM a partir do servidor, e não fornece nenhum recurso de interação.`,
        de: `Eine statische Version der Komponente ${props.component} generieren. Dieses Dienstprogramm erstellt die SVG-Zeichenkette, die vom Server aus in das DOM eingefügt werden kann, und bietet keine Interaktionsfunktionen.`,
        zh: `生成 ${props.component} 组件的静态版本。此工具会创建可从服务器注入到 DOM 中的 SVG 字符串，并且不提供任何交互功能。`,
        ja: `${props.component} コンポーネントの静的バージョンを生成します。このユーティリティは、サーバーから DOM に挿入できる SVG 文字列を作成し、インタラクション機能は提供しません。`,
        es: `Generar una versión estática del componente ${props.component}. Esta utilidad crea la cadena SVG que puede inyectarse en el DOM desde el servidor y no proporciona funciones de interacción.`,
        ko: `${props.component} 컴포넌트의 정적 버전을 생성합니다. 이 유틸리티는 서버에서 DOM에 삽입할 수 있는 SVG 문자열을 생성하며, 상호작용 기능은 제공하지 않습니다.`,
        ar: `إنشاء نسخة ثابتة من مكوّن ${props.component}. تُنشئ هذه الأداة سلسلة SVG التي يمكن حقنها في DOM من الخادم، ولا توفر أي ميزات تفاعلية.`,
    },
    additionalContentParams: {
        en: "Inject any additional content into the SVG, using coordinates provided by context in the params.",
        fr: "Injecter tout contenu supplémentaire dans le SVG en utilisant les coordonnées fournies par le contexte dans les paramètres.",
        pt: "Injete qualquer conteúdo adicional no SVG utilizando as coordenadas fornecidas pelo contexto nos parâmetros.",
        de: "Beliebige zusätzliche Inhalte in das SVG einfügen, wobei die vom Kontext in den Parametern bereitgestellten Koordinaten verwendet werden.",
        zh: "使用参数中上下文提供的坐标，将任何附加内容注入到 SVG 中。",
        ja: "パラメータ内のコンテキストによって提供される座標を使用して、追加コンテンツをSVGに挿入します。",
        es: "Inserta cualquier contenido adicional en el SVG utilizando las coordenadas proporcionadas por el contexto en los parámetros.",
        ko: "매개변수의 컨텍스트에서 제공된 좌표를 사용하여 추가 콘텐츠를 SVG에 삽입합니다.",
        ar: "أدرج أي محتوى إضافي داخل ملف SVG باستخدام الإحداثيات التي يوفّرها السياق في المعلمات."
    },
    dataset: {
        en: `Use the dataset required for the ${props.component} component`,
        fr: `Utilisez le jeu de données requis pour le composant ${props.component}`,
        pt: `Utilize o conjunto de dados necessário para o componente ${props.component}`,
        de: `Verwenden Sie den für die Komponente ${props.component} erforderlichen Datensatz`,
        zh: `使用 ${props.component} 组件所需的数据集`,
        ja: `${props.component} コンポーネントに必要なデータセットを使用してください`,
        es: `Utilice el conjunto de datos requerido para el componente ${props.component}`,
        ko: `${props.component} 컴포넌트에 필요한 데이터셋을 사용하세요`,
        ar: `استخدم مجموعة البيانات المطلوبة لمكوّن ${props.component}`,
    },
    config: {
        en: `Use the config required for the ${props.component} component`,
        fr: `Utilisez la configuration requise pour le composant ${props.component}`,
        pt: `Utilize a configuração necessária para o componente ${props.component}`,
        de: `Verwenden Sie die für die Komponente ${props.component} erforderliche Konfiguration`,
        zh: `使用 ${props.component} 组件所需的配置`,
        ja: `${props.component} コンポーネントに必要な設定を使用してください`,
        es: `Utilice la configuración requerida para el componente ${props.component}`,
        ko: `${props.component} 컴포넌트에 필요한 설정을 사용하세요`,
        ar: `استخدم الإعدادات المطلوبة لمكوّن ${props.component}`,
    },
    result: {
        en: 'The result is an svg string, that can be injected into HTML, or generated via an endpoint, to be inserted into the src attribute of an image element.',
        fr: "Le résultat est une chaîne SVG qui peut être injectée dans du HTML, ou générée via un point de terminaison, afin d'être insérée dans l'attribut src d'un élément image.",
        pt: "O resultado é uma string SVG que pode ser inserida em HTML ou gerada por meio de um endpoint para ser utilizada no atributo src de um elemento de imagem.",
        de: "Das Ergebnis ist ein SVG-String, der in HTML eingefügt oder über einen Endpunkt erzeugt werden kann, um in das src-Attribut eines Bildelements eingefügt zu werden.",
        zh: "结果是一个 SVG 字符串，可以注入到 HTML 中，或通过接口生成，并插入到图像元素的 src 属性中。",
        ja: "結果は SVG 文字列であり、HTML に埋め込んだり、エンドポイント経由で生成したりして、画像要素の src 属性に挿入できます。",
        es: "El resultado es una cadena SVG que puede insertarse en HTML o generarse mediante un endpoint para ser utilizada en el atributo src de un elemento de imagen.",
        ko: "결과는 SVG 문자열이며, HTML에 삽입하거나 엔드포인트를 통해 생성하여 이미지 요소의 src 속성에 사용할 수 있습니다.",
        ar: "الناتج عبارة عن سلسلة SVG يمكن إدراجها في HTML أو إنشاؤها عبر نقطة نهاية لاستخدامها في خاصية src لعنصر صورة.",
    }
});

const methods = shallowRef({
    VueUiXy: 'createStaticVueUiXy',
    VueUiDonut: 'createStaticVueUiDonut'
})

const generators = computed(() => ({
    VueUiXy: createStaticVueUiXy,
    VueUiDonut: createStaticVueUiDonut
}));

const datasets = ref({
    VueUiXy: [
        {
            name: 'Series A',
            type: 'line',
            series: [0, 1, 3, 1, 2, 5, 3, 5, 13, 8, 13, 34, 21, 34, 89, 55, 89, 134],
            smooth: true,
            useArea: true
        }
    ],
    VueUiDonut: [
        {
            name: 'Series A',
            values: [100]
        },
        {
            name: 'Series B',
            values: [50]
        }
    ]
});

const configs = computed(() => ({
    VueUiXy: {
        theme: isDarkMode.value ? 'dark' : '',
        chart: {
            grid: {
                position: 'start',
                showHorizontalLines: true,
                labels: {
                    axis: {
                        yLabel: 'Y-AXIS',
                        xLabel: 'X-AXIS'
                    },
                    yAxis: { useNiceScale: true }
                }
            },
            legend: {
                position: 'top'
            },
            padding: {
                right: 90,
            }
        }
    },
    VueUiDonut: {
        theme: isDarkMode.value ? 'dark' : '',
        style: {
            chart: {
                layout: {
                    curvedMarkers: true
                }
            }
        }
    }
}))

const svgContent = ref('');

watchEffect(async () => {
    svgContent.value = await generators.value[props.component]({
        dataset: datasets.value[props.component],
        config: configs.value[props.component]
    })
})

function stringifyCompactArrays(obj) {
  const placeholderMap = new Map();
  let index = 0;

  const json = JSON.stringify(
    obj,
    (_, value) => {
      if (
        Array.isArray(value) &&
        value.every(item => ["number", "string", "boolean"].includes(typeof item))
      ) {
        const key = `__ARRAY_${index++}__`;
        placeholderMap.set(key, JSON.stringify(value));
        return key;
      }
      return value;
    },
    2
  );

  return json.replace(
    /"(__ARRAY_\d+__)"/g,
    (_, key) => placeholderMap.get(key)
  );
}

function formatObj(json) {
    return json.replace(/"([^"]+)":/g, '$1:');
}

const additionalContentParams = shallowRef({
    VueUiXy: "series, drawingArea, scale, config",
    VueUiDonut: "series, drawingArea, center, innerRadius, radius, thickness, config"
})

const code = computed(() => {
    return `import { ${methods.value[props.component]} } from "vue-data-ui/ssr/${importName}";

const dataset = computed(() => {
    // ${translations.value.dataset[store.lang]}
    return ${formatObj(stringifyCompactArrays(datasets.value[props.component]))}
});

const config = computed(() => {
    // ${translations.value.config[store.lang]}
    return ${formatObj(stringifyCompactArrays(configs.value[props.component]))}
});

const svgRender = ref('');

watchEffect(async () => {
    svgRender.value = await ${methods.value[props.component]}({
        dataset: dataset.value,
        config: config.value,
        additionalSvgContent: ({ ${additionalContentParams.value[props.component]} }) => {
            // ${translations.value.additionalContentParams[store.lang]}
        }
    });
    
    console.log(svgRender.value);
})
    `
})

</script>

<template>
    <div>
        <h3 class="mb-4">
            {{ translations.description[store.lang] }}
        </h3>
        <CodeParser
            language="javascript"
            :content="code"
            @copy="store.copy()"
        />
        <div class="max-w-[500px] mx-auto p-4 bg-white dark:bg-[#1A1A1A] rounded">
            <h3>{{ translations.result[store.lang] }}</h3>
            <div v-html="svgContent"/>
        </div>
    </div>
</template>