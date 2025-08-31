<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import CodeParser from "./customization/CodeParser.vue";
import { jsonToJsObject } from "./maker/lib";

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    path: {
        type: String,
        default: ''
    }
});

const store = useMainStore();

const AXIS_DATE_FORMATTER = {
    enable: false,
    locale: 'en',
    useUTC: false,
    januaryAsYear: false,
    options: {
        year: 'yyyy',
        month: `MMM 'yy`,
        day: 'dd MMM',
        hour: 'HH:mm',
        minute: 'HH:mm:ss',
        second: 'HH:mm:ss'
    }
}

const translations = ref({
    description: {
        en: 'Values provided for the x Axis as timestamps can be formatted using the datetimeFormatter:',
        fr: 'Les valeurs fournies pour l\'axe des X en tant que timestamps peuvent être formatées à l\'aide de datetimeFormatter :',
        pt: 'Valores fornecidos para o eixo x como timestamps podem ser formatados usando datetimeFormatter:',
        de: 'Werte, die für die X-Achse als Zeitstempel angegeben werden, können mithilfe des datetimeFormatter formatiert werden:',
        zh: '以时间戳形式提供的 x 轴值可以使用 datetimeFormatter 格式化：',
        jp: 'タイムスタンプとして提供された x 軸の値は、datetimeFormatter を使用してフォーマットできます：',
        es: 'Los valores proporcionados para el eje X como marcas de tiempo pueden formatearse usando datetimeFormatter:',
        ko: '타임스탬프로 제공된 x축 값은 datetimeFormatter를 사용하여 형식화할 수 있습니다:',
        ar: 'يمكن تنسيق القيم المقدمة لمحور x كطوابع زمنية باستخدام datetimeFormatter:'
    },
    enable: {
        en: 'The formatter will be active when set to true. If set to false, the x axis values will remain the same as the ones you provide.',
        fr: 'Le formateur sera actif lorsqu’il est réglé sur true. S’il est réglé sur false, les valeurs de l’axe des X resteront les mêmes que celles que vous fournissez.',
        pt: 'O formatador estará ativo quando definido como true. Se definido como false, os valores do eixo x permanecerão os mesmos que você forneceu.',
        de: 'Der Formatter ist aktiv, wenn er auf true gesetzt ist. Wenn er auf false gesetzt ist, bleiben die x-Achsen-Werte unverändert zu denen, die Sie bereitstellen.',
        zh: '当设置为 true 时，格式化程序将处于活动状态。如果设置为 false，x 轴值将保持与您提供的值相同。',
        jp: 'true に設定されているとフォーマッターが有効になります。false に設定されている場合、x 軸の値は提供したものと同じままになります。',
        es: 'El formateador estará activo cuando se establezca en true. Si se establece en false, los valores del eje x permanecerán iguales a los que proporcione.',
        ko: 'true로 설정하면 포매터가 활성화됩니다. false로 설정하면 x축 값은 제공한 값과 동일하게 유지됩니다.',
        ar: 'سيكون المنسق نشطًا عند ضبطه على true. إذا تم ضبطه على false، ستظل قيم المحور السيني كما قدمتها.'
    },
    locale: {
        en: 'Choose the locale using official locale abbreviations',
        fr: 'Choisissez la locale en utilisant les abréviations officielles',
        pt: 'Escolha o locale usando as abreviações oficiais',
        de: 'Wählen Sie die Locale mit den offiziellen Abkürzungen',
        zh: '使用官方的区域设置缩写来选择区域设置',
        jp: '公式のロケール省略形を使用してロケールを選択してください',
        es: 'Elija la configuración regional utilizando las abreviaturas oficiales',
        ko: '공식 로케일 약어를 사용하여 로케일을 선택하세요',
        ar: 'اختر الإعدادات المحلية باستخدام الاختصارات الرسمية'
    },
    useUTC: {
        en: 'Decide whether all parsing and formatting should live in UTC or in the local time zone',
        fr: 'Choisissez si tout l’analyse et le formatage doivent se faire en UTC ou dans le fuseau horaire local',
        pt: 'Decida se todo o parsing e formatação devem ocorrer em UTC ou no fuso horário local',
        de: 'Entscheiden Sie, ob alle Analyse- und Formatierungsvorgänge in UTC oder in der lokalen Zeitzone stattfinden sollen',
        zh: '决定所有解析和格式化是使用 UTC 还是本地时区',
        jp: 'すべての解析とフォーマットを UTC で行うかローカルタイムゾーンで行うかを決定します',
        es: 'Decida si todo el análisis y el formateo deben realizarse en UTC o en la zona horaria local',
        ko: '모든 파싱 및 포맷팅을 UTC로 할지 로컬 시간대로 할지 결정하세요',
        ar: 'حدد ما إذا كان يجب إجراء جميع عمليات التحليل والتنسيق بتوقيت UTC أو في المنطقة الزمنية المحلية'
    },
    januaryAsYear: {
        en: 'Replace january with the year in months series',
        fr: 'Remplacer janvier par l\'année dans la série de mois',
        pt: 'Substituir janeiro pelo ano na série de meses',
        de: 'Ersetze Januar durch das Jahr in der Monatsreihe',
        zh: '在月份系列中用年份替换一月',
        jp: '月のシリーズで1月を年に置き換えます',
        es: 'Reemplazar enero por el año en la serie de meses',
        ko: '월 시리즈에서 1월을 연도로 대체합니다',
        ar: 'استبدال يناير بالسنة في سلسلة الشهور'
    },
    options: {
        en: 'Tweak datetime format outputs',
        fr: 'Ajuster les sorties de format de date/heure',
        pt: 'Ajustar as saídas de formato de data/hora',
        de: 'Datums-/Zeitformat-Ausgaben anpassen',
        zh: '调整日期时间格式输出',
        jp: '日付時刻形式の出力を調整する',
        es: 'Ajustar las salidas de formato de fecha y hora',
        ko: '날짜/시간 형식 출력 조정',
        ar: 'ضبط نواتج تنسيق التاريخ والوقت'
    },
})

function createObjectFromPath(p) {
    const keys = p.split('.')
    const result = {};
    let current = result;

    keys.forEach((key,i) => {
        if (i === keys.length - 1) {
            current[key] = AXIS_DATE_FORMATTER;
        } else {
            current[key] = {};
            current = current[key];
        }
    });
    return result;
}

const content = computed(() => {
    return `const config = ref(${jsonToJsObject(createObjectFromPath(props.path))});`
});

</script>

<template>
    <div>
        <div class="mb-4">
            {{ translations.description[store.lang] }}
        </div>
        <CodeParser
            language="javascript"
            :content="content"
        />
        <div class="flex flex-col gap-2 mt-4">
            <div dir="auto" v-for="key in Object.keys(translations).filter(k => k !== 'description')" class="flex flex-row gap-2">
                <code class="dark:text-app-blue">{{ key }}</code>:
                <div>{{ translations[key][store.lang] }}</div>
            </div>
        </div>

        <slot/>
    </div>
</template>