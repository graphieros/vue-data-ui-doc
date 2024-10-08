<script setup>
import { ref } from "vue";
import { useMainStore } from '../../stores';
import HelpUnit from './HelpUnit.vue';

const store = useMainStore()

const title = ref({
    en: "Components datasets",
    fr: "Ensembles de données de composants",
    pt: "Conjuntos de dados de componentes",
    de: "Komponentendatensätze",
    zh: "组件数据集",
    jp: "コンポーネントデータセット",
    es: "Conjuntos de datos de componentes",
    ko: "구성요소 데이터세트",
    ar: 'مجموعات بيانات المكونات'
})

const mandatory = ref({
    en: "It is required to provide the 'dataset' prop to all chart components. The documentation pages will show you the required data structure, as well as TS types. When the 'dataset' prop is not provided, components will display a skeleton loader, and a warning message will be visible in the console. If the dataset passed does not comply to the required data structure, warnings will also be visible in the console.",
    fr: "Il est nécessaire de fournir le accessoire « dataset » à tous les composants du graphique. Les pages de documentation vous montreront la structure de données requise, ainsi que les types TS. Lorsque l'accessoire 'dataset' n'est pas fourni, les composants afficheront un chargeur squelette et un message d'avertissement sera visible dans la console. Si l'ensemble de données transmis n'est pas conforme à la structure de données requise, des avertissements seront également visibles dans la console.",
    pt: "É necessário fornecer a propriedade 'dataset' para todos os componentes do gráfico. As páginas de documentação mostrarão a estrutura de dados necessária, bem como os tipos de TS. Quando a propriedade 'dataset' não for fornecida, os componentes exibirão um esqueleto do carregador e uma mensagem de aviso ficará visível no console. Se o conjunto de dados transmitido não estiver em conformidade com a estrutura de dados exigida, os avisos também ficarão visíveis no console.",
    de: "Es ist erforderlich, die Requisite „Datensatz“ für alle Diagrammkomponenten bereitzustellen. Die Dokumentationsseiten zeigen Ihnen die erforderliche Datenstruktur sowie TS-Typen. Wenn die Requisite „dataset“ nicht bereitgestellt wird, zeigen die Komponenten einen Skeleton-Loader an und eine Warnmeldung wird in der Konsole angezeigt. Wenn der übergebene Datensatz nicht der erforderlichen Datenstruktur entspricht, werden auch Warnungen in der Konsole angezeigt.",
    zh: "需要向所有图表组件提供“dataset”属性。文档页面将向您展示所需的数据结构以及 TS 类型。当未提供 'dataset' 属性时，组件将显示一个骨架加载器，并且控制台中将显示一条警告消息。如果传递的数据集不符合所需的数据结构，控制台中也会显示警告。",
    jp: "すべてのチャート コンポーネントに「dataset」プロパティを提供する必要があります。ドキュメント ページには、必要なデータ構造と TS タイプが示されています。 「dataset」プロパティが指定されていない場合、コンポーネントにはスケルトン ローダーが表示され、コンソールに警告メッセージが表示されます。渡されたデータセットが必要なデータ構造に準拠していない場合、コンソールに警告も表示されます。",
    es: "Es necesario proporcionar la propiedad 'conjunto de datos' a todos los componentes del gráfico. Las páginas de documentación le mostrarán la estructura de datos requerida, así como los tipos de TS. Cuando no se proporciona la propiedad 'conjunto de datos', los componentes mostrarán un cargador esqueleto y se verá un mensaje de advertencia en la consola. Si el conjunto de datos pasado no cumple con la estructura de datos requerida, las advertencias también serán visibles en la consola.",
    ko: "모든 차트 구성요소에 'dataset' prop을 제공해야 합니다. 문서 페이지에는 필요한 데이터 구조와 TS 유형이 표시됩니다. 'dataset' prop이 제공되지 않으면 구성요소는 스켈레톤 로더를 표시하고 콘솔에 경고 메시지가 표시됩니다. 전달된 데이터 세트가 필수 데이터 구조를 준수하지 않는 경우 콘솔에도 경고가 표시됩니다.",
    ar: `يجب توفير خاصية "مجموعة البيانات" لجميع مكونات المخطط. ستعرض لك صفحات التوثيق بنية البيانات المطلوبة، بالإضافة إلى أنواع TS. عندما لا يتم توفير الخاصية 'dataset'، ستعرض المكونات أداة تحميل هيكلية، وستكون رسالة تحذير مرئية في وحدة التحكم. إذا كانت مجموعة البيانات التي تم تمريرها لا تتوافق مع بنية البيانات المطلوبة، فستكون التحذيرات مرئية أيضًا في وحدة التحكم`
})

</script>

<template>
    <HelpUnit
        :title="title[store.lang]"
    >
        <template #content>
            <div class="flex flex-row place-items-center w-full px-[11px] gap-4">
                <div class="w-[40px]">
                    <VueUiIcon name="circleFill" stroke="#ff6400" :size="14"/>
                </div>
                {{ mandatory[store.lang] }}
            </div>
        </template>
    </HelpUnit>
</template>