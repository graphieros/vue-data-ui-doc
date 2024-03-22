<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../../stores/index";
import { useMakerStore } from "../../stores/maker";
import { XIcon, CopyIcon, CheckIcon } from "vue-tabler-icons";
import { copyText } from "../maker/lib";

const props = defineProps(['config', 'dataset', 'componentName', 'id'])

const store = useMainStore();
const makerStore = useMakerStore();
const lang = computed(() => store.lang);
const translations = computed(() => makerStore.translations);


function useModal(state) {
    const dialog = document.getElementById(props.id);
    if(!dialog) return;

    if(state === "open") {
        dialog.showModal();
    } else {
        dialog.close();
    }
}

const dialogContent = computed(() => {
    return `
    &lt;script setup&gt;<br>
        import { ref } from "vue";<br>
        import { ${props.componentName} } from "vue-data-ui";<br>
        import "vue-data-ui/style.css";<br><br>

        const config = ref(${JSON.stringify(props.config)});<br><br>

        const dataset = ref(${JSON.stringify(props.dataset)});<br><br>
    &lt;/script&gt;<br><br>
    
    &lt;template&gt;<br>
        &lt;!-- Place the component inside a div with a given width --&gt;<br>
        &lt;div style="width: 100%"&gt;<br>
            &lt;${props.componentName}<br>
                :dataset="dataset"<br>
                :config="config"<br>
            /&gt;<br>
        &lt;/div&gt;<br>
    &lt;/template&gt;<br>
    `
})

const isCopied = ref(false);

function copy() {
    copyText(dialogContent.value.replaceAll('<br>', ''), document.getElementById(props.id));
    isCopied.value = true;
    setTimeout(() => {
        isCopied.value = false;
        useModal('close')
    }, 1000)
}

</script>

<template>
    <div class="flex w-full justify-end mb-4 absolute top-4 right-4">
        <button @click="useModal('open')" class="border border-app-blue px-4 py-1 rounded-md text-app-blue shadow-md hover:bg-[#5f8bee20] transition-colors">{{ translations.componentCode[lang] }}</button>
    </div>

    
    <dialog :id="props.id" class="glass fixed h-screen max-h-[700px] w-full max-w-[900px] p-6 rounded-lg bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(36,36,36,0.8)] text-black dark:text-gray-300 border dark:border-gray-700">
        <button class="absolute top-2 right-2" @click="useModal('close')">
            <XIcon class="text-black dark:text-app-green" />
        </button>
        <button @click="copy">
            <CopyIcon class="cursor-pointer" v-if="!isCopied" />
            <CheckIcon v-else class="text-app-green cursor-pointer animate-ping"/>
        </button>
        <div>
            <code v-html="dialogContent" class="text-xs max-w-[400px]"/>
        </div>
    </dialog>
</template>