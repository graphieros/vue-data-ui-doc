<script setup>
import { ref, computed } from "vue";
import CodeParser from "./customization/CodeParser.vue";
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";

const props = defineProps({
    items: {
        type: Array,
        default() {
            return []
        }
    },
    path: {
        type: String,
        default: ''
    },
    root: {
        type: String,
        default: ''
    }
});

const store = useMainStore();

const description = ref({
    en: 'You can set callbacks to all buttons of the user menu.',
    fr: 'Vous pouvez définir des callbacks pour tous les boutons du menu utilisateur.',
    pt: 'Você pode definir callbacks para todos os botões do menu do usuário.',
    de: 'Sie können Callbacks für alle Schaltflächen des Benutzermenüs festlegen.',
    zh: '您可以为用户菜单的所有按钮设置回调 (callbacks)。',
    jp: 'ユーザーメニューのすべてのボタンにコールバックを設定できます。',
    es: 'Puedes establecer callbacks para todos los botones del menú de usuario.',
    ko: '사용자 메뉴의 모든 버튼에 콜백을 설정할 수 있습니다.',
    ar: 'يمكنك تعيين callbacks لجميع أزرار قائمة المستخدم.'
})

const TAB = computed(() => props.path ? `       ` : !props.root ? `    `: '');

const cb = ref({
    animation: `animation: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    annotator: `annotator: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    csv: `csv: (csvStr) => {
            ${TAB.value}console.log(csvStr);
        ${TAB.value}},
        ${TAB.value}`,
    fullscreen: `fullscreen: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    img: `img: ({ domElement, imageUri, base64 }) => {
            ${TAB.value}console.log({ domElement, imageUri, base64 });
        ${TAB.value}},
        ${TAB.value}`,
    labels: `labels: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    pdf: `pdf: ({ domElement, imageUri, base64 }) => {
            ${TAB.value}console.log({ domElement, imageUri, base64 });
        ${TAB.value}},
        ${TAB.value}`,
    sort: `sort: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    stack: `stack: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    table: `table: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    tooltip: `tooltip: () => {
            ${TAB.value}// Do something
        ${TAB.value}},
        ${TAB.value}`,
    svg: `svg: ({ dataUrl, blob, text, url }) => {
            ${TAB.value}console.log({ dataUrl, blob, text, url });
        ${TAB.value}},`,
})

const cbs = computed(() => {
    return Object.keys(cb.value).filter(k => props.items.includes(k)).map(name => {
        return {
            name,
            content: cb.value[name]
        }
    })
})

const codeChart = computed(() => {
    return `const config = ref({
    chart: {
        userOptions: {
            callbacks: {
                ${cbs.value.map(c => c.content).join('')}
            }
        }
    }    
});`
})

const codeRoot = computed(() => {
    return `const config = ref({
    ${props.root}: {
        ${cbs.value.map(c => c.content).join('')}
    }
});`
})

const codeStandard = computed(() => {
    return `const config = ref({
    userOptions: {
        callbacks: {
            ${cbs.value.map(c => c.content).join('')}
        }
    }
});`
})

</script>

<template>
    <div>
        <h3 class="mb-4">
            {{ description[store.lang] }}
        </h3>
        <CodeParser
            language="javascript"
            :content="path === 'chart' ? codeChart : root ? codeRoot : codeStandard"
        />
    </div>
</template>