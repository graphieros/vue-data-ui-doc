<script setup>
import { computed } from "vue";
import { useMainStore } from "../../stores";
import CodeParser from "../customization/CodeParser.vue";
import {
    xyAnalysisOptionOrder,
    xyAnalysisOptionDescriptions,
} from "../../translations/xyAnalysisOptions.js";

const store = useMainStore();
const descriptions = {
    en: "Enable Analyze in the user menu to select series, analysis options and annotation appearance. Apply adds annotations for visible datapoints; Cancel discards the preview. Hidden series are excluded. A custom analyze callback receives the results instead of inserting annotations.",
    fr: "Activez Analyze dans le menu pour choisir les séries, analyses et styles. Apply ajoute des annotations aux points visibles ; Cancel annule l’aperçu. Les séries masquées sont exclues. Un callback analyze reçoit les résultats à la place des annotations.",
    pt: "Ative Analyze no menu para escolher séries, análises e aparência. Apply anota os pontos visíveis; Cancel descarta a prévia. Séries ocultas são excluídas. Um callback analyze recebe os resultados em vez de inserir anotações.",
    de: "Aktivieren Sie Analyze im Menü, um Reihen, Analysen und Darstellung zu wählen. Apply ergänzt Anmerkungen für sichtbare Punkte; Cancel verwirft die Vorschau. Ausgeblendete Reihen sind ausgeschlossen. Ein analyze-Callback erhält Ergebnisse statt Anmerkungen einzufügen.",
    es: "Active Analyze en el menú para elegir series, análisis y apariencia. Apply anota los puntos visibles; Cancel descarta la vista previa. Se excluyen las series ocultas. Un callback analyze recibe los resultados en lugar de insertar anotaciones.",
    zh: "启用菜单中的 Analyze，选择序列、分析项和注释外观。Apply 为可见数据点添加注释；Cancel 放弃预览。隐藏序列不参与分析。自定义 analyze 回调接收结果并替代注释插入。",
    ja: "メニューの Analyze で系列、分析項目、注釈の外観を選択します。Apply は表示中の点に注釈を追加し、Cancel はプレビューを破棄します。非表示の系列は除外されます。analyze コールバックを設定すると注釈の代わりに結果を受け取ります。",
    ko: "메뉴에서 Analyze를 활성화해 계열, 분석 항목, 주석 모양을 선택하세요. Apply는 표시된 점에 주석을 추가하고 Cancel은 미리보기를 취소합니다. 숨겨진 계열은 제외됩니다. analyze 콜백을 설정하면 주석 대신 결과를 받습니다.",
    ar: "فعّل Analyze في القائمة لاختيار السلاسل والتحليلات ومظهر التعليقات. يضيف Apply تعليقات للنقاط المرئية ويلغي Cancel المعاينة. تستثنى السلاسل المخفية. يستقبل callback analyze النتائج بدل إدراج التعليقات.",
};
const details = {
    en: "analysis is a root-level config. Its options control availability, not initial selection: all default to true, but dialog checkboxes start unchecked. Set an option to false to hide and disable it. thresholds uses original series values; maxAnnotations defaults to 24 (cap 100). Labels, messages and locale are configurable. Dataset, visibility or zoom-range changes clear generated annotations.",
    fr: "analysis est à la racine de la configuration. Les options contrôlent la disponibilité, pas la sélection : true par défaut, cases initialement décochées. false masque et désactive une option. thresholds utilise les valeurs originales ; maxAnnotations vaut 24 (plafond 100). Libellés, messages et locale sont configurables. Les changements de données, visibilité ou zoom effacent les annotations générées.",
    pt: "analysis fica na raiz da configuração. As opções controlam disponibilidade, não seleção: true por padrão, caixas inicialmente desmarcadas. false oculta e desativa. thresholds usa valores originais; maxAnnotations é 24 (máximo 100). Rótulos, mensagens e locale são configuráveis. Alterar dados, visibilidade ou zoom limpa as anotações geradas.",
    de: "analysis liegt auf der Konfigurationsebene. Optionen steuern Verfügbarkeit, nicht Vorauswahl: standardmäßig true, anfangs nicht angekreuzt. false blendet aus und deaktiviert. thresholds nutzt Originalwerte; maxAnnotations ist 24 (maximal 100). Texte und locale sind konfigurierbar. Daten-, Sichtbarkeits- oder Zoomänderungen entfernen generierte Anmerkungen.",
    es: "analysis está en la raíz de la configuración. Las opciones controlan disponibilidad, no selección: true por defecto, casillas inicialmente desmarcadas. false oculta y desactiva. thresholds usa valores originales; maxAnnotations es 24 (máximo 100). Etiquetas, mensajes y locale son configurables. Cambiar datos, visibilidad o zoom elimina las anotaciones generadas.",
    zh: "analysis 位于配置根级。options 控制可用性而非初始选择：默认均为 true，但对话框复选框初始未选中。false 隐藏并禁用选项。thresholds 使用原始序列值；maxAnnotations 默认为 24，上限 100。可配置标签、消息和 locale。数据、可见性或缩放范围变化会清除生成的注释。",
    ja: "analysis は設定のルートに置きます。options は初期選択ではなく利用可否です。既定値はすべて true ですがチェックは未選択です。false で非表示・無効になります。thresholds は元の値、maxAnnotations は既定 24、上限 100 です。ラベル、メッセージ、locale を設定できます。データ、表示状態、ズーム範囲の変更で生成した注釈は消去されます。",
    ko: "analysis는 최상위 설정입니다. options는 초기 선택이 아닌 사용 가능 여부입니다. 기본값은 모두 true지만 체크박스는 선택되지 않습니다. false는 숨김 및 비활성화합니다. thresholds는 원본 값이며 maxAnnotations는 기본 24, 최대 100입니다. 라벨, 메시지, locale을 설정할 수 있습니다. 데이터, 표시 상태, 확대 범위 변경 시 생성된 주석이 지워집니다.",
    ar: "analysis في جذر الإعدادات. تتحكم options بالإتاحة لا بالتحديد الأولي: كلها true افتراضيًا لكن المربعات غير محددة. تخفي false الخيار وتعطله. تستخدم thresholds القيم الأصلية؛ maxAnnotations افتراضيًا 24 وبحد أقصى 100. النصوص وlocale قابلة للتخصيص. تمسح تغييرات البيانات أو الظهور أو نطاق التكبير التعليقات المولدة.",
};
const optionDescriptions = computed(
    () =>
        xyAnalysisOptionDescriptions[store.lang] ||
        xyAnalysisOptionDescriptions.en,
);
const callbackHelp = {
    en: "Called when the user clicks Apply in Analyze, not during preview or on Cancel. Enable chart.userOptions.buttons.analyze to expose the action. The callback replaces automatic annotation insertion; leave it null to keep the built-in behavior. It receives a VueUiXyAnalysisResult for the selected visible series and zoom range.",
    fr: "Appelé sur Apply dans Analyze, pas pendant l’aperçu ni sur Cancel. Activez chart.userOptions.buttons.analyze pour afficher l’action. Le callback remplace l’insertion automatique des annotations ; laissez null pour conserver le comportement intégré. Il reçoit un VueUiXyAnalysisResult pour les séries visibles sélectionnées et la plage de zoom.",
    pt: "Chamado ao clicar Apply em Analyze, não na prévia nem em Cancel. Ative chart.userOptions.buttons.analyze para mostrar a ação. O callback substitui as anotações automáticas; deixe null para manter o comportamento integrado. Recebe VueUiXyAnalysisResult para as séries visíveis selecionadas e o intervalo de zoom.",
    de: "Wird bei Apply in Analyze aufgerufen, nicht in der Vorschau oder bei Cancel. Aktivieren Sie chart.userOptions.buttons.analyze. Der Callback ersetzt das automatische Einfügen von Anmerkungen; null behält das integrierte Verhalten bei. Er erhält VueUiXyAnalysisResult für ausgewählte sichtbare Reihen und den Zoombereich.",
    es: "Se ejecuta al pulsar Apply en Analyze, no durante la vista previa ni en Cancel. Active chart.userOptions.buttons.analyze para mostrar la acción. El callback sustituye las anotaciones automáticas; deje null para conservar el comportamiento integrado. Recibe VueUiXyAnalysisResult para las series visibles seleccionadas y el rango de zoom.",
    zh: "在 Analyze 中点击 Apply 时调用，预览或 Cancel 时不调用。需启用 chart.userOptions.buttons.analyze。回调替代自动注释插入；保持 null 则使用内置行为。接收选中可见序列和缩放范围的 VueUiXyAnalysisResult。",
    ja: "Analyze の Apply で呼び出され、プレビューや Cancel では呼び出されません。chart.userOptions.buttons.analyze を有効にしてください。コールバックは自動注釈を置き換えます。null で内蔵動作を維持します。選択した表示系列とズーム範囲の VueUiXyAnalysisResult を受け取ります。",
    ko: "Analyze에서 Apply를 클릭할 때 호출되며 미리보기나 Cancel에서는 호출되지 않습니다. chart.userOptions.buttons.analyze를 활성화하세요. 콜백은 자동 주석 삽입을 대체하며 null이면 내장 동작을 유지합니다. 선택한 표시 계열과 확대 범위의 VueUiXyAnalysisResult를 받습니다.",
    ar: "يُستدعى عند النقر على Apply في Analyze، لا أثناء المعاينة أو عند Cancel. فعّل chart.userOptions.buttons.analyze لإظهار الإجراء. يستبدل callback إدراج التعليقات التلقائي؛ اتركه null للحفاظ على السلوك المدمج. يستقبل VueUiXyAnalysisResult للسلاسل المرئية المحددة ونطاق التكبير.",
};
const callbackDescription = computed(
    () => callbackHelp[store.lang] || callbackHelp.en,
);
const resultFields = [
    ["scope", '"visible-datapoints"'],
    ["options", "Record<VueUiXyAnalysisOption, boolean>"],
    ["seriesIds", "string[]"],
    [
        "appearance",
        "{ color: string; fontSize: number; strokeWidth: number } | null",
    ],
    [
        "range",
        '{ start: number; end: number; scale: "category" | "continuous" }',
    ],
    ["series", "VueUiXyAnalysisSeries[]"],
    ["text", "string"],
];
const description = computed(() => descriptions[store.lang] || descriptions.en);
const detail = computed(() => details[store.lang] || details.en);
const example = `const config = {
  chart: {
    userOptions: {
      buttons: { analyze: true }, // Default: false
      buttonTitles: { analyze: "Analyze dataset" },
      // Optional: replaces built-in annotation insertion.
      callbacks: {
        analyze: (result) => {
          // VueUiXyAnalysisResult
          console.log(result.scope); // "visible-datapoints"
          console.log(result.range); // { start, end, scale: "category" | "continuous" }
          console.log(result.options, result.seriesIds, result.appearance);
          console.log(result.series, result.text);
        },
      },
    },
  },
  analysis: {
    options: { minimum: true, maximum: true, trend: false },
    thresholds: [100],
    maxAnnotations: 24,
    locale: "en",
  },
};`;
</script>

<template>
    <div class="my-4 space-y-4">
        <h3 class="text-lg"><code>chart.userOptions.buttons.analyze</code></h3>
        <p dir="auto">{{ description }}</p>
        <p dir="auto">{{ detail }}</p>
        <div class="overflow-x-auto">
            <table class="w-full text-start">
                <caption class="text-start mb-2">
                    <code>analysis.options</code>
                </caption>
                <tbody>
                    <tr
                        v-for="option in xyAnalysisOptionOrder"
                        :key="option"
                        class="border-b border-gray-400/30"
                    >
                        <th scope="row" class="p-2 text-start align-top">
                            <code>{{ option }}</code>
                        </th>
                        <td class="p-2" dir="auto">
                            {{ optionDescriptions[option] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3 class="text-lg">
            <code>chart.userOptions.callbacks.analyze</code>
        </h3>
        <p dir="auto">{{ callbackDescription }}</p>
        <div class="overflow-x-auto">
            <table class="w-full text-start">
                <caption class="text-start mb-2">
                    <code>VueUiXyAnalysisResult</code>
                </caption>
                <tbody>
                    <tr
                        v-for="[field, type] in resultFields"
                        :key="field"
                        class="border-b border-gray-400/30"
                    >
                        <th scope="row" class="p-2 text-start align-top">
                            <code>{{ field }}</code>
                        </th>
                        <td class="p-2">
                            <code>{{ type }}</code>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <CodeParser
            language="javascript"
            :content="example"
            @copy="store.copy()"
        />
    </div>
</template>
