<script setup>
import { computed } from "vue";
import { useMainStore } from "../../stores";
import BaseCard from "../BaseCard.vue";
import { highlightVue } from "../builder2/highlight.js";
import { useBuilderTranslations } from "../builder2/translations";
import { copyText } from "../maker/lib.js";
import GraphPlaybackExample from "./GraphPlaybackExample.vue";
import source from "./GraphPlaybackExample.vue?raw";
import "prismjs/themes/prism-okaidia.css";

const store = useMainStore();
const t = useBuilderTranslations();
const highlightedSource = computed(() => highlightVue(source));
function copySource() {
    copyText(source, document.body);
    store.copy();
}
const descriptions = {
    en: "Reveal a 21-node team tree in random batches of 1–5 nodes, keeping parents first. Pause to hold, stop to return to the root, or reset to show all nodes.",
    fr: "Déployez un arbre de 21 nœuds par lots aléatoires de 1 à 5, parents en premier. Pause suspend, stop revient à la racine et reset affiche tout.",
    pt: "Revele uma árvore de 21 nós em lotes aleatórios de 1 a 5, com os pais primeiro. Pause suspende, stop volta à raiz e reset mostra tudo.",
    de: "Zeigen Sie einen Team-Baum mit 21 Knoten in zufälligen Gruppen von 1–5, Eltern zuerst. Pause hält an, Stop kehrt zur Wurzel zurück, Reset zeigt alle Knoten.",
    es: "Muestre un árbol de 21 nodos en lotes aleatorios de 1 a 5, padres primero. Pause detiene, stop vuelve a la raíz y reset muestra todo.",
    zh: "按父节点优先顺序，每次随机显示 1–5 个节点，构建 21 节点团队树。暂停保留进度，停止返回根节点，重置显示全部。",
    ja: "21 ノードの組織ツリーを親から順に、毎回ランダムに 1〜5 個表示します。一時停止で保持、停止でルートに戻り、リセットで全表示します。",
    ko: "21개 노드의 팀 트리를 부모부터 무작위로 1–5개씩 표시합니다. 일시 정지는 진행 유지, 정지는 루트 복귀, 초기화는 전체 표시입니다.",
    ar: "اعرض شجرة فرق من 21 عقدة بدفعات عشوائية من 1 إلى 5، الآباء أولًا. الإيقاف المؤقت يحفظ التقدم، والإيقاف يعيد الجذر، وإعادة الضبط تعرض الكل.",
};
const description = computed(() => descriptions[store.lang] || descriptions.en);
</script>

<template>
    <BaseCard class="my-4">
        <p class="mb-4" dir="auto">{{ description }}</p>
        <GraphPlaybackExample :dark="store.isDarkMode" />
        <div
            class="mt-4 text-sm"
            :class="store.isDarkMode ? 'maker-code-dark' : 'maker-code-light'"
        >
            <div class="flex justify-end mb-2">
                <button
                    type="button"
                    class="rounded border border-gray-400 px-3 py-2 text-sm"
                    @click="copySource"
                >
                    {{ t("copyComponent") }}
                </button>
            </div>
            <pre
                class="overflow-auto rounded-lg"
                tabindex="0"
                :aria-label="t('componentCode')"
                dir="ltr"
            ><code class="" v-html="highlightedSource"></code></pre>
        </div>
    </BaseCard>
</template>

<style scoped src="../builder2/prism-tomorrow.css"></style>
<style scoped src="../builder2/prism.css"></style>
