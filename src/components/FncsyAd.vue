<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

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
    <div class="mx-auto max-w-[800px] px-8">
        <div class="mt-8 w-full max-w-[800px] text-[18px] font-inter-bold pl-4 mb-4">
            {{ fncsyIntro[store.lang] }}
        </div>
    
        <BaseCard class="mt-2 max-w-[800px]">
            <a href="https://fncsy.com/" target="_blank" class="rounded-xl border border-transparent hover:border-app-green w-full flex flex-col gap-4 p-4 z-50 transition-colors">
                <div class="flex flex-row gap-2 place-items-center justify-start">
                    <img src="../assets/fncsy-logo.webp" height="64" width="64"/>
                    <code class="text-app-green-dark text-[32px]">FNCSY</code>
                </div>
                <code class="text-left" v-html="fncsy[store.lang]"/>
            </a>
        </BaseCard>
    </div>
</template>