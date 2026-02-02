<script setup>
import { ref } from "vue";
import { useMainStore } from '../../stores';
import HelpUnit from './HelpUnit.vue';

const store = useMainStore()

const title = ref({
    en: "Usage in Nuxt",
    fr: "Utilisation dans Nuxt",
    pt: "Uso em Nuxt",
    de: "Verwendung in Nuxt",
    zh: "Nuxt 中的用法",
    ja: "Nuxtでの使用法",
    es: "Uso en Nuxt",
    ko: "Nuxt에서의 사용법",
    ar: 'الاستخدام في "Nuxt"'
})

const content = ref({
    en: "The link below will take you to a boilerplate Github repository where vue-data-ui is setup.",
    fr: "Le lien ci-dessous vous mènera à un repo Github standard où vue-data-ui est setup.uxt",
    pt: "O link abaixo o levará a um repositório padrão do Github onde vue-data-ui é setup.uxt",
    de: "Der Link unten führt Sie zu einem Standard-Github-Repository, in dem vue-data-ui setup.uxt ist",
    zh: "下面的链接将带您到样板 Github 存储库，其中 vue-data-ui 是 setup.uxt",
    ja: "以下のリンクは、vue-data-uiがsetup.uxtである定型的なGithubリポジトリに移動します。",
    es: "El siguiente enlace lo llevará a un repositorio estándar de Github donde vue-data-ui está setup.uxt",
    ko: "아래 링크는 vue-data-ui가 setup.uxt인 상용구 Github 저장소로 이동합니다.",
    ar: `سينقلك الرابط أدناه إلى مستودع Github النموذجي حيث تم إعداد vue-data-ui`
})

</script>

<template>
    <HelpUnit
        :title="title[store.lang]"
    >
        <template #content>
            <div class="flex flex-row place-items-center w-full px-[11px] gap-4" dir="auto">
                <div class="w-[40px]">
                    <VueUiIcon name="circleFill" stroke="#ff6400" :size="14"/>
                </div>
                {{ content[store.lang] }}
            </div>
            <div class="px-[68px] mt-2">
                <a href="https://github.com/graphieros/vue-data-ui-nuxt" class="underline" target="_blank">
                    Nuxt boilerplate
                </a>
            </div>
        </template>
    </HelpUnit>
</template>
