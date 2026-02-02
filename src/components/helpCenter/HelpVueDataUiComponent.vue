<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from '../../stores';
import HelpUnit from './HelpUnit.vue';
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"

const store = useMainStore()

onMounted(() => {
    window.Prism = window.Prism || {}
    window.Prism.manual = true
    Prism.highlightAll()
})

const title = ref({
    en: "VueDataUi universal component",
    fr: "Composant universel VueDataUi",
    pt: "Componente universal VueDataUi",
    de: "Universelle VueDataUi-Komponente",
    zh: "VueDataUi通用组件",
    ja: "VueDataUi ユニバーサル コンポーネント",
    es: "Componente universal VueDataUi",
    ko: "VueDataUi 범용 구성 요소",
    ar: 'VueDataUi مكون عالمي'
})

const content = ref({
    en: "You can either import components individually, or use the VueDataUi universal component, which will only import the one you need. Be sure to indicate which component you wish to use it for, and pass the appropriate 'dataset' and 'config' props.",
    fr: "Vous pouvez soit importer des composants individuellement, soit utiliser le composant universel VueDataUi, qui importera uniquement celui dont vous avez besoin. Assurez-vous d'indiquer pour quel composant vous souhaitez l'utiliser et transmettez les accessoires 'dataset' et 'config' appropriés.",
    pt: "Você pode importar componentes individualmente ou usar o componente universal VueDataUi, que importará apenas aquele que você precisa. Certifique-se de indicar para qual componente você deseja usá-lo e passe os acessórios 'dataset' e 'config' apropriados.",
    de: "Sie können Komponenten entweder einzeln importieren oder die universelle VueDataUi-Komponente verwenden, die nur die Komponente importiert, die Sie benötigen. Geben Sie unbedingt an, für welche Komponente Sie es verwenden möchten, und übergeben Sie die entsprechenden „Dataset“- und „Config“-Requisiten.",
    zh: "您可以单独导入组件，也可以使用 VueDataUi 通用组件，它只会导入您需要的组件。请务必指明您希望将其用于哪个组件，并传递适当的“数据集”和“配置”道具。",
    es: "Puede importar componentes individualmente o utilizar el componente universal VueDataUi, que solo importará el que necesita. Asegúrese de indicar para qué componente desea usarlo y pase los accesorios 'dataset' y 'config' apropiados.",
    ko: "구성 요소를 개별적으로 가져오거나 필요한 구성 요소만 가져오는 VueDataUi 범용 구성 요소를 사용할 수 있습니다. 어떤 구성요소에 사용할 것인지 지정하고 적절한 'dataset' 및 'config' props를 전달하십시오.",
    ar: 'يمكنك إما استيراد المكونات بشكل فردي، أو استخدام المكون العالمي VueDataUi، والذي سيقوم فقط باستيراد المكون الذي تحتاجه. تأكد من تحديد المكون الذي ترغب في استخدامه من أجله، وقم بتمرير خاصيتي "dataset" و"config" المناسبتين'
})

const usage = ref({
    en: "All events and slots of the target component are available in the VueDataUi component. You can check out the documentation pages to know more about all slots and events emitted.",
    fr: "Tous les événements et slots du composant cible sont disponibles dans le composant VueDataUi. Vous pouvez consulter les pages de documentation pour en savoir plus sur tous les slots et événements émis.",
    pt: "Todos os eventos e slots do componente de destino estão disponíveis no componente VueDataUi. Você pode conferir as páginas de documentação para saber mais sobre todos os slots e eventos emitidos.",
    de: "Alle Ereignisse und Slots der Zielkomponente sind in der VueDataUi-Komponente verfügbar. Sie können sich die Dokumentationsseiten ansehen, um mehr über alle ausgegebenen Slots und Ereignisse zu erfahren.",
    zh: "目标组件的所有事件和槽都在 VueDataUi 组件中可用。您可以查看文档页面以了解有关所有插槽和发出的事件的更多信息。",
    ja: "ターゲット コンポーネントのすべてのイベントとスロットは、VueDataUiコンポーネントで使用できます。発行されるすべてのスロットとイベントの詳細については、ドキュメントページを参照してください。",
    es: "Todos los eventos y espacios del componente de destino están disponibles en el componente VueDataUi. Puede consultar las páginas de documentación para saber más sobre todos los espacios y eventos emitidos.",
    ko: "대상 구성 요소의 모든 이벤트와 슬롯은 VueDataUi 구성 요소에서 사용할 수 있습니다. 발생하는 모든 슬롯과 이벤트에 대해 자세히 알아보려면 설명서 페이지를 확인하세요.",
    ar: 'جميع الأحداث والفتحات الخاصة بالمكون المستهدف متوفرة في مكون VueDataUi. يمكنك مراجعة صفحات الوثائق لمعرفة المزيد عن جميع الفتحات والأحداث المنبعثة'
})

const warning = ref({
    en: "You must provide the 'component' prop, with the exact name and casing of the component you wish to use. If the component does not exist or contains a typo, a warning will be visible in the console, showing you the list of components you can use with the VueDataUi universal component.",
    fr: "Vous devez fournir le prop 'component', avec le nom exact et la casse du composant que vous souhaitez utiliser. Si le composant n'existe pas ou contient une faute de frappe, un avertissement sera visible dans la console, vous montrant la liste des composants que vous pouvez utiliser avec le composant universel VueDataUi.",
    pt: "Você deve fornecer a propriedade 'component', com o nome exato e a caixa do componente que deseja usar. Se o componente não existir ou contiver um erro de digitação, um aviso ficará visível no console, mostrando a lista de componentes que você pode usar com o componente universal VueDataUi.",
    de: "Sie müssen die Requisite „Komponente“ mit dem genauen Namen und der Groß-/Kleinschreibung der Komponente angeben, die Sie verwenden möchten. Wenn die Komponente nicht vorhanden ist oder einen Tippfehler enthält, wird in der Konsole eine Warnung mit der Liste der Komponenten angezeigt, die Sie mit der universellen VueDataUi-Komponente verwenden können.",
    zh: "您必须提供 'component' 属性，以及您要使用的组件的确切名称和大小写。如果该组件不存在或包含拼写错误，控制台中将显示一条警告，显示可与 VueDataUi 通用组件一起使用的组件列表。",
    ja: "使用するコンポーネントの正確な名前と大文字小文字を含む「component」プロパティを指定する必要があります。コンポーネントが存在しないかタイプミスがある場合は、コンソールに警告が表示され、VueDataUi ユニバーサル コンポーネントで使用できるコンポーネントのリストが表示されます。",
    es: "Debe proporcionar el accesorio 'componente', con el nombre exacto y la carcasa del componente que desea utilizar. Si el componente no existe o contiene un error tipográfico, aparecerá una advertencia en la consola que le mostrará la lista de componentes que puede usar con el componente universal VueDataUi.",
    ko: "사용하려는 구성요소의 정확한 이름과 대소문자를 포함하여 '구성요소' 소품을 제공해야 합니다. 구성 요소가 존재하지 않거나 오타가 포함된 경우 콘솔에 경고가 표시되어 VueDataUi 범용 구성 요소와 함께 사용할 수 있는 구성 요소 목록을 보여줍니다.",
    ar: `يجب عليك توفير خاصية "المكون" مع الاسم الدقيق وحالة المكون الذي ترغب في استخدامه. إذا كان المكون غير موجود أو يحتوي على خطأ مطبعي، فسيظهر تحذير في وحدة التحكم، يوضح لك قائمة المكونات التي يمكنك استخدامها مع المكون العالمي VueDataUi`
})

const code = ref(`
    <VueDataUi
        component="VueUiDonut"
        :config="config"
        :dataset="dataset"
        @selectDatapoint="selectDatapoint"
    >
        <template #tooltip-before>
            This will show inside the tooltip
        </template>
    </VueDataUi>
`)

</script>

<template>
    <HelpUnit
        :title="title[store.lang]"
    >
        <template #content>
            <div dir="auto">
                <div class="flex flex-row place-items-center w-full px-[11px] gap-4">
                    <div class="w-[40px]">
                        <VueUiIcon name="circleFill" stroke="#ff6400" :size="14"/>
                    </div>
                    {{ content[store.lang] }}
                </div>
                <div class="flex flex-row place-items-center w-full px-[11px] gap-4 mt-4">
                    <div class="w-[40px]">
                        <VueUiIcon name="circleFill" stroke="#ff6400" :size="14"/>
                    </div>
                    {{ warning[store.lang] }}
                </div>
                <div class="flex flex-row place-items-center w-full px-[11px] gap-4 mt-4">
                    <div class="w-[40px]">
                        <VueUiIcon name="circleFill" stroke="#ff6400" :size="14"/>
                    </div>
                    {{ usage[store.lang] }}
                </div>
            </div>
            <div class="px-[11px] w-full bg-[#272822] pb-8">
                <code class="language-html" style="white-space: pre-wrap;">
                    {{ code }}
                </code>
            </div>
        </template>
    </HelpUnit>
</template>
