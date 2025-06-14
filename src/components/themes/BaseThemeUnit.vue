<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import CodeParser from "../customization/CodeParser.vue";
import ThemeTag from "../ThemeTag.vue";
import { getThemeConfig } from "vue-data-ui";
import { CopyIcon } from "vue-tabler-icons";

const props = defineProps({
    component: {
        type: String,
        required: true
    },
    componentTheme: {
        type: String,
        required: true
    },
    dataset: {
        type: [Array, Object],
        required: true
    },
    config: {
        type: Object,
        required: true
    }
})

const store = useMainStore()

const translations = computed(() => {
    return {
        copyTheme: {
            en: "Copy theme raw config for inspiration",
            fr: "Copiez la configuration brute du thème pour vous inspirer",
            pt: "Copie a configuração bruta do tema para inspiração",
            de: "Rohkonfiguration des Themas zur Inspiration kopieren",
            zh: "复制主题原始配置以获取灵感",
            jp: "テーマの生設定をコピーしてインスピレーションを得る",
            es: "Copia la configuración cruda del tema para inspirarte",
            ko: "테마 원시 구성을 복사하여 영감을 얻으세요",
            ar: "نسخ التكوين الخام للنمط للإلهام"
        },
        usage: {
            en: "Usage:",
            fr: "Utilisation :",
            pt: "Uso:",
            de: "Verwendung:",
            zh: "用法：",
            jp: "使用方法：",
            es: "Uso:",
            ko: "사용법:",
            ar: "الاستخدام:"
        }
    }
})

const code = ref(`const config = ref({
    theme: "#THEME#",
    // rest of your config
})`)

const themes = computed(() => {
    return [
        { name: 'default', config: getThemeConfig(props.componentTheme).default },
        { name: 'zen', config: getThemeConfig(props.componentTheme).zen, backgroundColor: '#fbfafa', color: '#8A9892', accent: '#B9B99D' },
        { name: 'concrete', config: getThemeConfig(props.componentTheme).concrete, backgroundColor: '#f6f6fb', color: '#50606C', accent: '#4A6A75' },
        { name: 'hack', config: getThemeConfig(props.componentTheme).hack, backgroundColor: '#1A1A1A', color: '#99AA99', accent: '#009900' },
        { name: 'celebration', config: getThemeConfig(props.componentTheme).celebration, backgroundColor: '#FFF8E1', color: '#424242', accent: '#D32F2F' },
        { name: 'celebrationNight', config: getThemeConfig(props.componentTheme).celebrationNight, backgroundColor: '#1E1E1E', color: '#BDBDBD', accent: '#D32F2F' },
    ]
})

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-start w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md" v-for="theme in themes">
            <ThemeTag :type="theme.name"/>
            <VueDataUi :component="component" :dataset="dataset" :config="{ ...config, theme: theme.name }"/>
            <template v-if="theme.name !== 'default'">
                <div class="bg-white dark:bg-[#2A2A2A] py-4 rounded-b border-t border-[#CCCCCC] dark:border-gray-500">
                    <div class="pl-3 mb-2">{{ translations.usage[store.lang] }}</div>
                    <CodeParser :content="code.replace('#THEME#', theme.name)" language="javascript" @copy="store.copy()"/>              
                </div>
                <button 
                    dir="auto"
                    class="mt-2 w-full py-1 px-6 rounded shadow opacity-90 hover:opacity-100 transition-opacity flex flex-row place-items-center flex-wrap gap-2 justify-center"
                    :style="{
                        backgroundColor: theme.backgroundColor,
                        color: theme.color,
                        border: `2px solid ${theme.accent}`
                    }"
                    @click="copyToClipboard(theme.config)"
                >
                    <CopyIcon :color="theme.accent"/>
                    {{ translations.copyTheme[store.lang] }}
                </button>
            </template>
        </div>
    </div>
</template>