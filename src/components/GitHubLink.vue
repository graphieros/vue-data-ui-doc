<script setup>
import { computed } from "vue"
import { BrandGithubFilledIcon } from 'vue-tabler-icons';
import { useMainStore } from '../stores';

const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: true
    },
    link: {
        type: String,
        default: ""
    }
})

    
const store = useMainStore();
const translations = computed(() => store.translations);

</script>

<template>
    <a :href="`https://github.com/graphieros/vue-data-ui/blob/master/src/components/${link}.vue`" target="_blank">
        <button class="flex gap-1 font-satoshi-bold transition-all border border-app-blue py-3 px-5 rounded-md bg-[#5f8bee20] hover:bg-[#5f8bee33] hover:shadow-xl">
            <BrandGithubFilledIcon class="text-app-blue"/>
            {{ translations.githubCode[store.lang] }}
        </button>
    </a>
</template>