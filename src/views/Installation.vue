<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from '../stores';
import router from "../router";
import ChartSeeker from "../components/ChartSeeker.vue";
import ConfirmCopy from "../components/ConfirmCopy.vue";
import colorBridge from "color-bridge";
import { VueHiCode } from "vue-hi-code";
import "vue-hi-code/style.css"
import BaseCard from "../components/BaseCard.vue";


const store = useMainStore();
const { utils } = colorBridge();
const { lightenHexColor } = utils();

const isDarkMode = computed(() => store.isDarkMode);
const translations = computed(() => {
    return store.translations;
})

onMounted(() => {
    window.scrollTo(0,0)
})

function gotoMaker() {
    router.push({ path: '/chart-builder'})
}

const codeParserConfig = computed(() => {
    return {
        backgroundColor: isDarkMode.value ? '#2A2A2A' : '#FAFAFA',
        baseTextColor: isDarkMode.value ? '#CCCCCC' : '#3A3A3A',
        colorPunctuation: isDarkMode.value ? '#E1E5E8' : '#2A2A2A',
        colorFunction: isDarkMode.value ? '#DCDCAA' : '#1A1A1A',
        colorTitle: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
        copyIconColor: isDarkMode.value ? '#CCCCCC' : '#1A1A1A'
    }
})

const mainCodeContent = computed(() => {
    return `import { createApp } from 'vue'
import App from "./App.vue" 
import "vue-data-ui/style.css" // ${translations.value.installation.comments.includeCss[store.lang]}

// ${translations.value.installation.comments.global[store.lang]}
import { VueUiRadar } from "vue-data-ui"

// Since v3.2.0 treeshake import:
import VueUiXy from "vue-data-ui/vue-ui-xy";

const app = createApp(App)

app.component("VueUiRadar", VueUiRadar)
app.component("VueUiXy", VueUiXy)
app.mount('#app')
`
});

const componentContent = computed(() => {
    return `// ${translations.value.installation.comments.import[store.lang]}
import { VueUiRadar } from "vue-data-ui"; // not treeshaken
import VueUiXy from "vue-data-ui/vue-ui-xy"; // treeshaken

// With Typescript:
import { ref } from "vue";
import {
    VueUiRadar,
    type VueUiRadarDataset,
    type VueUiRadarConfig
} from "vue-data-ui";

const dataset = ref<VueUiRadarDataset>(/* your dataset */);
const config = ref<VueUiRadarConfig>(/* your config (optional) */);
    `
})

const universalComponentContent = computed(() => {
    return `// ${translations.value.installation.comments.universalComponent[store.lang]}

import { ref } from "vue";
import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";

const dataset = ref(/* Your dataset */);
const config = ref(/* Your config (optional) */);
    `
})

const universalComponentTemplateContent = computed(() => {
    return `<template>
    <!-- Caveat: universal component is not treeshakable -->
    <div style="width:600px;">
        <VueDataUi
            component="VueUiXy"
            :dataset="dataset"
            :config="config"
        />
    </div>
</template>
    `
})

const fncsy = ref({
    en: `<span class="text-app-green-dark dark:text-app-green">Save Hours of Work</span> with
                Smart Digital Tools
                Stop wasting time with complex setups. 
                <br/>
                <br/>
                Get instant access to <span class="text-app-green-dark dark:text-app-green">production-ready tools</span> that creators, designers, and developers trust. Extract data with smart patterns, generate QR codes, convert currencies, transform CSV data, encode Base64, generate UUIDs, check your IP, calculate subnets, create patterns — <span class="text-app-green-dark dark:text-app-green">all in seconds, completely free</span>`,
    fr: `<span class="text-app-green-dark dark:text-app-green">Gagnez des heures de travail</span> avec
                des outils numériques intelligents
                Ne perdez plus de temps avec des configurations complexes. 
                <br/>
                <br/>
                Accédez instantanément à <span class="text-app-green-dark dark:text-app-green">des outils prêts pour la production</span> que les créateurs, designers et développeurs utilisent. Extrayez des données avec des modèles intelligents, générez des QR codes, convertissez des devises, transformez des données CSV, encodez en Base64, générez des UUID, vérifiez votre IP, calculez des sous-réseaux, créez des modèles — <span class="text-app-green-dark dark:text-app-green">tout en quelques secondes, entièrement gratuit</span>`,
    pt: `<span class="text-app-green-dark dark:text-app-green">Economize horas de trabalho</span> com
                ferramentas digitais inteligentes
                Pare de perder tempo com configurações complexas. 
                <br/>
                <br/>
                Tenha acesso instantâneo a <span class="text-app-green-dark dark:text-app-green">ferramentas prontas para produção</span> em que criadores, designers e desenvolvedores confiam. Extraia dados com padrões inteligentes, gere códigos QR, converta moedas, transforme dados CSV, codifique em Base64, gere UUIDs, verifique seu IP, calcule sub-redes, crie padrões — <span class="text-app-green-dark dark:text-app-green">tudo em segundos, totalmente grátis</span>`,
    de: `<span class="text-app-green-dark dark:text-app-green">Spare Stunden an Arbeit</span> mit
                smarten digitalen Tools
                Verschwende keine Zeit mehr mit komplexen Setups. 
                <br/>
                <br/>
                Erhalte sofortigen Zugriff auf <span class="text-app-green-dark dark:text-app-green">produktreife Tools</span>, denen Kreative, Designer und Entwickler vertrauen. Extrahiere Daten mit intelligenten Mustern, generiere QR-Codes, konvertiere Währungen, transformiere CSV-Daten, kodiere Base64, generiere UUIDs, prüfe deine IP, berechne Subnetze, erstelle Muster — <span class="text-app-green-dark dark:text-app-green">alles in Sekunden, komplett kostenlos</span>`,
    zh: `<span class="text-app-green-dark dark:text-app-green">节省数小时工作</span> 使用
                智能数字工具
                不要再浪费时间在复杂的设置上。 
                <br/>
                <br/>
                即刻获取 <span class="text-app-green-dark dark:text-app-green">可直接投入生产的工具</span>，创作者、设计师和开发人员都信赖。提取数据、生成二维码、转换货币、处理CSV数据、编码Base64、生成UUID、检查IP、计算子网、创建模式 — <span class="text-app-green-dark dark:text-app-green">全部只需几秒，完全免费</span>`,
    jp: `<span class="text-app-green-dark dark:text-app-green">作業時間を大幅に節約</span>できる
                スマートデジタルツール
                複雑なセットアップに時間を無駄にしないでください。 
                <br/>
                <br/>
                すぐに利用可能な <span class="text-app-green-dark dark:text-app-green">本番環境対応ツール</span> にアクセス。クリエイター、デザイナー、開発者に信頼されています。スマートなパターンでデータを抽出、QRコードを生成、通貨を変換、CSVデータを変換、Base64をエンコード、UUIDを生成、IPを確認、サブネットを計算、パターンを作成 — <span class="text-app-green-dark dark:text-app-green">すべて数秒で、完全無料</span>`,
    es: `<span class="text-app-green-dark dark:text-app-green">Ahorra horas de trabajo</span> con
                herramientas digitales inteligentes
                Deja de perder tiempo con configuraciones complejas. 
                <br/>
                <br/>
                Obtén acceso instantáneo a <span class="text-app-green-dark dark:text-app-green">herramientas listas para producción</span> en las que confían creadores, diseñadores y desarrolladores. Extrae datos con patrones inteligentes, genera códigos QR, convierte monedas, transforma datos CSV, codifica en Base64, genera UUIDs, verifica tu IP, calcula subredes, crea patrones — <span class="text-app-green-dark dark:text-app-green">todo en segundos, completamente gratis</span>`,
    ko: `<span class="text-app-green-dark dark:text-app-green">작업 시간을 절약하세요</span> 스마트 디지털 도구와 함께
                복잡한 설정에 시간을 낭비하지 마세요. 
                <br/>
                <br/>
                <span class="text-app-green-dark dark:text-app-green">프로덕션 준비 완료 도구</span>에 즉시 액세스하세요. 크리에이터, 디자이너, 개발자가 신뢰합니다. 스마트 패턴으로 데이터 추출, QR 코드 생성, 통화 변환, CSV 데이터 변환, Base64 인코딩, UUID 생성, IP 확인, 서브넷 계산, 패턴 생성 — <span class="text-app-green-dark dark:text-app-green">모두 몇 초 만에, 완전히 무료</span>`,
    ar: `<span class="text-app-green-dark dark:text-app-green">وفّر ساعات من العمل</span> باستخدام
                الأدوات الرقمية الذكية
                توقف عن إضاعة الوقت في الإعدادات المعقدة. 
                <br/>
                <br/>
                احصل فوراً على <span class="text-app-green-dark dark:text-app-green">أدوات جاهزة للإنتاج</span> يثق بها المبدعون والمصممون والمطورون. استخرج البيانات باستخدام أنماط ذكية، أنشئ رموز QR، حوّل العملات، عالج بيانات CSV، شفّر Base64، أنشئ UUID، تحقق من عنوان IP الخاص بك، احسب الشبكات الفرعية، أنشئ أنماطاً — <span class="text-app-green-dark dark:text-app-green">كل ذلك في ثوانٍ معدودة، مجاناً بالكامل</span>`
})

const fncsyIntro = ref({
    en: 'Check out awesome free tools provided by our friends at :',
    fr: 'Découvrez des outils gratuits incroyables proposés par nos amis chez :',
    pt: 'Confira ferramentas gratuitas incríveis oferecidas por nossos amigos em :',
    de: 'Schauen Sie sich tolle kostenlose Tools an, bereitgestellt von unseren Freunden bei :',
    zh: '来看看我们朋友提供的精彩免费工具：',
    jp: '私たちの仲間が提供する素晴らしい無料ツールをご覧ください：',
    es: 'Descubre increíbles herramientas gratuitas proporcionadas por nuestros amigos en :',
    ko: '우리 친구들이 제공하는 멋진 무료 도구를 확인하세요 :',
    ar: 'اطّلع على أدوات مجانية رائعة مقدمة من أصدقائنا في :'
})

</script>

<template>
    <svg class="pointer-events-none fixed -top-40 left-0 z-0 opacity-10 hidden dark:block" viewBox="0 0 400 400" style="width: 150vw">
        <defs>
            <pattern id="pat" width="304" height="304" patternUnits="userSpaceOnUse" patternTransform="scale(0.15)">
            <path xmlns="http://www.w3.org/2000/svg" fill="#5f8aee" d="M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </pattern>
        </defs>
        <rect :x="0" :y="0" :width="300" :height="300" fill="url(#pat)"/>
    </svg>
    <div class="flex flex-col place-content-center place-items-center text-center my-12 z-10">
        <div class="fixed top-0 left-0 h-screen w-screen z-0 pointer-events-none" style="opacity:0.4">
            <div class="absolute top-0 left-0 w-full h-full" :style="isDarkMode ? 'background:radial-gradient(#5f8bee, transparent) !important' : 'background:radial-gradient(#F3F4F6, transparent)'"/>
        </div>
        <div class="w-full flex flex-row gap-4 place-items-center justify-center my-12">
            <div class="relative w-[80px] h-[80px]">
                <VueUiIcon name="starFill" :size="80" :strokeWidth="0.8" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" stroke="#5f8bee"/>
                <VueUiIcon name="starFill" :size="60" :strokeWidth="0.8" class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.2 })"/>
                <VueUiIcon name="starFill" :size="40" :strokeWidth="0.8" class="animate-ping hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.4 })"/>
                <VueUiIcon name="starFill" :size="20" :strokeWidth="0.8" class="animate-ping hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.6 })"/>
                <VueUiIcon name="starFill" :size="5" :strokeWidth="0.8" class="animate-ping hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" :stroke="lightenHexColor({ hexColor: '#5F8BEE' , force: 0.8 })"/>
            </div>
            <h1 class="font-inter-bold text-[48px] sm:text-[72px] text-center z-10">
                {{ translations.menu.installation[store.lang] }}
            </h1>
        </div>

        <BaseCard>
            <VueHiCode content="npm i vue-data-ui   " language="javascript" v-bind="codeParserConfig" @copy="store.copy()"/>
        </BaseCard>

        <!-- <div class="mt-4 z-10" dir="auto">
            {{ translations.installation.tsUsers[store.lang] }}
        </div> -->

        <div class="mt-4 z-10">
            <a href="https://github.com/graphieros/vue-data-ui-nuxt" class="underline" target="_blank">
                <div dir="auto" class="px-6">
                    {{ translations.nuxt.implementation[store.lang] }}
                </div>
            </a>
        </div>

        <div class="mt-4 z-10 flex flex-row place-items-center gap-2">
            <VueUiIcon name="robot" stroke="#5F8BEE"/>
            <a href="https://vue-data-ui.graphieros.com/llms.txt" class="underline" target="_blank">AI assistance (llms.txt)</a>
        </div>
        

        <BaseCard class="max-w-[800px] mt-6">        

            <div class="text-left">
                <VueHiCode 
                    :content="mainCodeContent" 
                    language="javascript" 
                    @copy="store.copy()"
                    v-bind="{...codeParserConfig, title: 'src/main.js'}"
                />
            </div>

            <div class="text-left mt-6">
                <VueHiCode 
                    :content="componentContent" 
                    language="javascript" 
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                    title="MyComponent.vue"
                />
            </div>

            <div class="text-left mt-6">
                <VueHiCode 
                    :content="universalComponentContent" 
                    language="javascript" 
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                    title="MyUniversalChart.vue"
                />
            </div>
            <div class="text-left mt-6">
                <VueHiCode 
                    :content="universalComponentTemplateContent" 
                    language="html" 
                    @copy="store.copy()"
                    v-bind="codeParserConfig"
                />
            </div>

        </BaseCard>
        
        <div class="flex flex-row place-items-center justify-center z-10 mt-10 px-4">
            <div class="p-0.5 bg-gradient-to-r from-app-green to-app-blue rounded-full hover:shadow-xl transition-all">
                <button dir="auto" @click="gotoMaker" class="py-3 px-6 rounded-full text-xl flex flex-row gap-2 place-items-cente transition-colors bg-white dark:bg-[#1A1A1A] shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
                    <VueUiIcon name="arrowRight" class="animate-pulse" :stroke="isDarkMode ? '#42d392' : '#2A2A2A'"/>
                    <VueUiIcon name="clipboardBar" :stroke="isDarkMode ? '#42d392' : '#2A2A2A'"/>
                    {{ translations.makeNow[store.lang] }}
                </button>
            </div>
        </div>

        <ChartSeeker class="mt-12 z-10 max-w-[800px]"/>

        <!-- <div class="mt-8 w-full max-w-[800px] text-[18px]">
            {{ fncsyIntro[store.lang] }}
        </div>
        
        <BaseCard class="mt-2 max-w-[800px]">
            <a href="https://fncsy.com/" target="_blank" class="rounded-xl w-full flex flex-col gap-4 p-4 border border-app-green bg-white dark:bg-[#1A1A1A] z-50 hover:bg-[#E1E5E6] hover:dark:bg-[#2A2A2A] transition-colors">
                <div class="flex flex-row gap-2 place-items-center justify-center">
                    <img src="../assets/fncsy-logo.webp" height="64" width="64"/>
                    <code class="text-app-green-dark text-[32px]">FNCSY</code>
                </div>
                <code class="text-left" v-html="fncsy[store.lang]"/>
            </a>
        </BaseCard> -->
        <ConfirmCopy/>
    </div>
</template>