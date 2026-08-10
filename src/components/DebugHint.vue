<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import CodeParser from "./customization/CodeParser.vue";

const props = defineProps({
    component: String,
    configType: String,
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const translations = ref({
    h3: {
        en: "Debug logs and best practice hints",
        fr: "Journaux de débogage et conseils sur les bonnes pratiques",
        pt: "Logs de depuração e dicas de boas práticas",
        de: "Debug-Protokolle und Hinweise zu Best Practices",
        zh: "调试日志和最佳实践提示",
        ja: "デバッグログとベストプラクティスのヒント",
        es: "Registros de depuración y consejos sobre buenas prácticas",
        ko: "디버그 로그 및 모범 사례 안내",
        ar: "سجلات تصحيح الأخطاء وإرشادات أفضل الممارسات",
    },
    p: {
        en: "During development, you can opt-in to debug logs and best practices hints. You can plug these flags to the DEV environment variable.",
        fr: "Pendant le développement, vous pouvez activer les journaux de débogage et les conseils sur les bonnes pratiques. Vous pouvez associer ces options à la variable d’environnement DEV.",
        pt: "Durante o desenvolvimento, você pode ativar os logs de depuração e as dicas de boas práticas. Você pode associar essas opções à variável de ambiente DEV.",
        de: "Während der Entwicklung können Sie Debug-Protokolle und Hinweise zu Best Practices aktivieren. Sie können diese Optionen mit der DEV-Umgebungsvariable verknüpfen.",
        zh: "在开发过程中，您可以选择启用调试日志和最佳实践提示。您可以将这些选项与 DEV 环境变量关联。",
        ja: "開発中は、デバッグログとベストプラクティスのヒントを有効にできます。これらのオプションを DEV 環境変数に関連付けることができます。",
        es: "Durante el desarrollo, puede activar los registros de depuración y los consejos sobre buenas prácticas. Puede vincular estas opciones a la variable de entorno DEV.",
        ko: "개발 중에는 디버그 로그와 모범 사례 안내를 활성화할 수 있습니다. 이러한 옵션을 DEV 환경 변수에 연결할 수 있습니다.",
        ar: "أثناء التطوير، يمكنك تفعيل سجلات تصحيح الأخطاء وإرشادات أفضل الممارسات. يمكنك ربط هذه الخيارات بمتغير البيئة DEV.",
    },
    rest: {
        en: "Rest of your config",
        fr: "Le reste de votre configuration",
        pt: "O restante da sua configuração",
        de: "Der Rest Ihrer Konfiguration",
        zh: "其余配置",
        ja: "その他の設定",
        es: "El resto de tu configuración",
        ko: "나머지 설정",
        ar: "باقي الإعدادات",
    },
});

const code = computed(
    () => `const config = computed<${props.configType}>(() => ({
  debug: import.meta.env.DEV,
  devHints: {
    enable: import.meta.env.DEV,
  },
  // ${translations.value.rest[store.lang]}
}))`,
);
</script>

<template>
    <div class="p-4 mb-6 rounded-xl bg-[#5f8aee50]">
        <div class="flex flex-row place-items-center gap-4">
            <VueUiIcon
                name="lightBulbOn"
                :stroke="isDarkMode ? '#FFFFFF' : '#1A1A1A'"
            />
            <h3 class="font-inter-medium text-xl">
                {{ translations.h3[store.lang] }}
            </h3>
        </div>
        <p class="my-2 pl-10">{{ translations.p[store.lang] }}</p>
        <CodeParser
            language="typescript"
            :content="code"
            @copy="store.copy()"
        />
    </div>
</template>
