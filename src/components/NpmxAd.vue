<script setup>
import { ref, computed, shallowRef } from "vue";
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const tagLine = shallowRef({
    en: 'a fast, modern browser for the npm registry',
    fr: 'un explorateur rapide et moderne du registre npm',
    pt: 'um navegador rápido e moderno para o registro npm',
    de: 'ein schneller, moderner Browser für die npm Registry',
    zh: 'npm 仓库的快速、现代浏览器工具',
    ja: '高速でモダンなnpmレジストリブラウザ',
    es: 'un navegador rápido y moderno para el registro npm',
    ko: 'npm 레지스트리를 위한 빠르고 현대적인 브라우저',
    ar: 'متصفح أفضل لسجل npm',
})

const npmx_what_we_are = shallowRef({
    en: `<span>npmx is a <strong>better UX/DX</strong> for the npm package registry and tooling. We provide a fast, modern interface for exploring packages, with features like dark mode, keyboard navigation, code browsing, and connections to alternative registries like JSR.</span>`,
    fr: `<span>npmx est une <strong>meilleure UX/DX</strong> pour le registre de paquets npm et ses outils. Nous proposons une interface rapide et moderne pour explorer les paquets, avec des fonctionnalités comme le mode sombre, la navigation au clavier, l’exploration du code et des connexions à des registres alternatifs comme JSR.</span>`,
    pt: `<span>npmx é uma <strong>UX/DX melhor</strong> para o registro de pacotes npm e suas ferramentas. Oferecemos uma interface rápida e moderna para explorar pacotes, com recursos como modo escuro, navegação por teclado, navegação de código e conexões com registros alternativos como o JSR.</span>`,
    de: `<span>npmx bietet eine <strong>bessere UX/DX</strong> für das npm-Paketregister und dessen Tools. Wir stellen eine schnelle, moderne Oberfläche zum Erkunden von Paketen bereit, mit Funktionen wie Dark Mode, Tastaturnavigation, Code-Browsing und Verbindungen zu alternativen Registries wie JSR.</span>`,
    zh: `<span>npmx 为 npm 包注册表及其工具提供了<strong>更好的 UX/DX</strong>。我们提供快速、现代的界面来浏览包，具备深色模式、键盘导航、代码浏览，以及连接到 JSR 等替代注册表等功能。</span>`,
    ja: `<span>npmx は npm パッケージレジストリとそのツールのための<strong>より優れた UX/DX</strong> を提供します。ダークモード、キーボードナビゲーション、コード閲覧、JSR などの代替レジストリとの連携などの機能を備えた、高速でモダンなインターフェースを提供します。</span>`,
    es: `<span>npmx es una <strong>mejor UX/DX</strong> para el registro de paquetes npm y sus herramientas. Ofrecemos una interfaz rápida y moderna para explorar paquetes, con funciones como modo oscuro, navegación por teclado, exploración de código y conexiones con registros alternativos como JSR.</span>`,
    ko: `<span>npmx는 npm 패키지 레지스트리와 관련 도구를 위한 <strong>더 나은 UX/DX</strong>를 제공합니다. 다크 모드, 키보드 탐색, 코드 브라우징, JSR과 같은 대체 레지스트리 연결 등의 기능을 갖춘 빠르고 현대적인 인터페이스를 제공합니다.</span>`,
    ar: `<span>يوفر npmx <strong>تجربة UX/DX أفضل</strong> لسجل حزم npm وأدواته. نقدم واجهة سريعة وحديثة لاستكشاف الحزم، مع ميزات مثل الوضع الداكن، والتنقل عبر لوحة المفاتيح، وتصفح الشيفرة، والاتصال بسجلات بديلة مثل JSR.</span>`,
})

const vduIsOnNpmx = shallowRef({
    en: 'npmx has chosen Vue Data UI for its data visualisations',
    fr: 'npmx a choisi Vue Data UI pour ses visualisations de données',
    pt: 'A npmx escolheu o Vue Data UI para suas visualizações de dados',
    de: 'npmx hat sich für Vue Data UI für seine Datenvisualisierungen entschieden',
    zh: 'npmx 选择了 Vue Data UI 作为其数据可视化解决方案',
    ja: 'npmx はデータ可視化に Vue Data UI を採用しました',
    es: 'npmx ha elegido Vue Data UI para sus visualizaciones de datos',
    ko: 'npmx는 데이터 시각화를 위해 Vue Data UI를 선택했습니다',
    ar: 'اختارت npmx ‏Vue Data UI لتصورات البيانات الخاصة بها',
})

</script>

<template>
    <div class="ml-12 sm:mx-auto max-w-[1400px] px-12 sm:px-20 w-full" dir="auto">
        <div class="mt-8 w-full max-w-[800px] text-[18px] font-inter-bold pl-4 mb-4 text-[#4A4A4A] dark:text-[#CCCCCC] flex flex-row gap-2 place-items-center">
            <VueUiIcon name="externalLink" :stroke="isDarkMode ? '#6A6A6A' : '#8A8A8A'"/>
            {{ vduIsOnNpmx[store.lang] }}
        </div>

        <BaseCard>
            <a href="https://fncsy.com/" target="_blank">
                <div class="flex flex-row gap-2 place-items-center justify-start">
                    <div class="flex flex-row flex-wrap place-items-center lg:gap-4">
                        <div class="flex flex-row gap-2 place-items-center">
                            <img class="hidden dark:block" src="../assets/npmx_logo_dark.png" alt="Npmx logo" width="136px"/>
                            <img class="dark:hidden" src="../assets/npmx_logo_light.png" alt="Npmx logo" width="136px"/>
                        </div>
                    </div>
                </div>
            </a>
            <p class="font-inter-medium text-gray-500 px-4">{{ tagLine[store.lang] }}</p>
            <div class="font-inter-medium px-4 mt-2" v-html="npmx_what_we_are[store.lang]"/>
        </BaseCard>
    </div>
</template>