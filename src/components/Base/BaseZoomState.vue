<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import CodeParser from "../customization/CodeParser.vue";

const props = defineProps({
    component: {
        type: String,
        required: true,
    },
});

const store = useMainStore();

const translations = ref({
    title: {
        fr: "Synchroniser l’état du zoom",
        en: "Sync zoom state",
        pt: "Sincronizar estado do zoom",
        de: "Zoomstatus synchronisieren",
        zh: "同步缩放状态",
        ja: "ズーム状態を同期",
        es: "Sincronizar estado del zoom",
        ko: "확대/축소 상태 동기화",
        ar: "مزامنة حالة التكبير/التصغير",
    },
    description: {
        fr: "Synchronise l’état du zoom entre plusieurs instances du composant.",
        en: "Sync the zoom state between multiple instances of the component.",
        pt: "Sincroniza o estado do zoom entre várias instâncias do componente.",
        de: "Synchronisiert den Zoomstatus zwischen mehreren Instanzen der Komponente.",
        zh: "在组件的多个实例之间同步缩放状态。",
        ja: "コンポーネントの複数のインスタンス間でズーム状態を同期します。",
        es: "Sincroniza el estado del zoom entre varias instancias del componente.",
        ko: "컴포넌트의 여러 인스턴스 간에 확대/축소 상태를 동기화합니다.",
        ar: "يُزامن حالة التكبير/التصغير بين عدة مثيلات من المكوّن.",
    },
    caution: {
        fr: "Il est recommandé que toutes les séries de données aient le même nombre maximal de points de données.",
        en: "It is recommended for all dataset series to have the same max number of datapoints.",
        pt: "Recomenda-se que todas as séries de dados tenham o mesmo número máximo de pontos de dados.",
        de: "Es wird empfohlen, dass alle Datenreihen die gleiche maximale Anzahl an Datenpunkten haben.",
        zh: "建议所有数据集系列具有相同的最大数据点数量。",
        ja: "すべてのデータセット系列で、データポイントの最大数を同じにすることを推奨します。",
        es: "Se recomienda que todas las series de datos tengan el mismo número máximo de puntos de datos.",
        ko: "모든 데이터셋 시리즈의 최대 데이터 포인트 수를 동일하게 설정하는 것이 좋습니다.",
        ar: "يُوصى بأن تحتوي جميع سلاسل البيانات على العدد الأقصى نفسه من نقاط البيانات.",
    },
    declare: {
        fr: "Déclare une ref qui sera liée à toutes les instances du composant",
        en: "Declare a ref that will be bound to all component instances",
        pt: "Declare uma ref que será vinculada a todas as instâncias do componente",
        de: "Deklariere eine Ref, die an alle Instanzen der Komponente gebunden wird",
        zh: "声明一个将绑定到所有组件实例的 ref",
        ja: "すべてのコンポーネントインスタンスにバインドされる ref を宣言します",
        es: "Declara una ref que se vinculará a todas las instancias del componente",
        ko: "모든 컴포넌트 인스턴스에 바인딩될 ref를 선언합니다",
        ar: "صرّح عن ref سيتم ربطه بجميع مثيلات المكوّن",
    },
    useModel: {
        fr: "Ajoute la liaison du modèle à toutes les instances du composant",
        en: "Add the model binding to all component instances",
        pt: "Adicione a vinculação do modelo a todas as instâncias do componente",
        de: "Füge die Modellbindung zu allen Instanzen der Komponente hinzu",
        zh: "为所有组件实例添加模型绑定",
        ja: "すべてのコンポーネントインスタンスにモデルバインディングを追加します",
        es: "Añade la vinculación del modelo a todas las instancias del componente",
        ko: "모든 컴포넌트 인스턴스에 모델 바인딩을 추가합니다",
        ar: "أضف ربط النموذج إلى جميع مثيلات المكوّن",
    },
});

const codeDeclare = computed(
    () => `// ${translations.value.declare[store.lang]}
const zoomState = ref<VueUiZoomState>(null);`,
);

const codeModel = computed(
    () => `<!-- ${translations.value.useModel[store.lang]} -->
<${props.component}
  :dataset="datasetA"
  :config="configA"
  v-model:zoom-state="zoomState"
/>
<${props.component}
  :dataset="datasetB"
  :config="configB"
  v-model:zoom-state="zoomState"
/>`,
);
</script>

<template>
    <div class="w-full">
        <div class="flex flex-col items-center">
            <h3 class="font-inter-medium text-xl">
                {{ translations.title[store.lang] }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
                {{ translations.description[store.lang] }}
            </p>
        </div>

        <div
            class="w-full bg-[#ff8c0030] p-4 rounded border-l border-app-warning my-4 flex flex-row flex-wrap gap-4 align-center font-inter-medium"
        >
            <div class="w-5 h-5">
                <VueUiIcon name="triangleExclamation" stroke="#ff8c00" />
            </div>
            {{ translations.caution[store.lang] }}
        </div>

        <CodeParser
            language="typescript"
            :content="codeDeclare"
            @copy="store.copy"
        />
        <CodeParser language="html" :content="codeModel" @copy="store.copy" />

        <div class="mt-4 w-full">
            <slot />
        </div>
    </div>
</template>
