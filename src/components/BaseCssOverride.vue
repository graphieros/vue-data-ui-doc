<script setup>
import { ref } from "vue"
import { useMainStore } from '../stores';
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    content: {
        type: String
    }
})
const store = useMainStore();

const title = ref({
    en: 'Target these css classes to further customize your chart component',
    fr: 'Ciblez ces classes CSS pour personnaliser davantage votre composant graphique',
    pt: 'Aponte para essas classes CSS para personalizar ainda mais seu componente de gráfico',
    de: 'Zielen Sie auf diese CSS-Klassen, um Ihre Diagrammkomponente weiter anzupassen',
    zh: '定位这些 CSS 类以进一步自定义您的图表组件',
    jp: 'これらの CSS クラスをターゲットにして、チャートコンポーネントをさらにカスタマイズします',
    es: 'Apunta a estas clases CSS para personalizar aún más tu componente de gráfico',
    ko: '이 CSS 클래스를 대상으로 하여 차트 구성 요소를 더욱 사용자 지정하세요'
})

</script>

<template>
    <h3>{{ title[store.lang] }}</h3>

    <CodeParser :content language="css" @copy="store.copy()"/>
</template>