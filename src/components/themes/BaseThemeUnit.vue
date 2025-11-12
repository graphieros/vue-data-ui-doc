<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores";
import CodeParser from "../customization/CodeParser.vue";
import ThemeTag from "../ThemeTag.vue";
import { CopyIcon } from "vue-tabler-icons";
import { getThemeConfig } from "vue-data-ui";

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
        { name: 'default' },
        { name: 'dark', config: {}, backgroundColor: '#1A1A1A', color: '#CCCCCC', accent: '#CCCCCC' },
        { name: 'zen', config: {}, backgroundColor: '#fbfafa', color: '#8A9892', accent: '#B9B99D' },
        { name: 'concrete',config: {}, backgroundColor: '#f6f6fb', color: '#50606C', accent: '#4A6A75' },
        { name: 'hack',config: {}, backgroundColor: '#1A1A1A', color: '#99AA99', accent: '#009900' },
        { name: 'celebration',config: {}, backgroundColor: '#FFF8E1', color: '#424242', accent: '#D32F2F' },
        { name: 'celebrationNight',config: {}, backgroundColor: '#1E1E1E', color: '#BDBDBD', accent: '#D32F2F' },
    ]
})

async function copyToClipboard(theme) {
    const thisConf = await getThemeConfig(props.componentTheme);
    if (thisConf[theme.name]) {
        const conf = thisConf[theme.name];
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

}

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-start w-full p-4 bg-gray-150 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] p-4 rounded-xl" v-for="theme in themes">
            <ThemeTag :type="theme.name"/>
            <VueDataUi :component="component" :dataset="dataset" :config="{ ...config, theme: theme.name }"/>
            <template v-if="theme.name !== 'default'">
                <div class="bg-gray-150 dark:bg-[#3A3A3A] py-4 rounded-b ">
                    <div class="pl-3 mb-2">{{ translations.usage[store.lang] }}</div>
                    <CodeParser :content="code.replace('#THEME#', theme.name)" language="javascript" @copy="store.copy()"/>              
                </div>
                <button 
                    dir="auto"
                    class="mt-2 w-full py-2 px-6 rounded-full opacity-90 hover:opacity-100 transition-opacity flex flex-row place-items-center flex-wrap gap-2 justify-center shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]"
                    :style="{
                        backgroundColor: theme.backgroundColor,
                        color: theme.color,
                    }"
                    @click="copyToClipboard(theme)"
                >
                    <CopyIcon :color="theme.accent"/>
                    {{ translations.copyTheme[store.lang] }}
                </button>
            </template>
        </div>
    </div>
</template>