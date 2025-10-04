<script setup>
import { computed } from "vue"
import { BrandGithubFilledIcon } from 'vue-tabler-icons';
import { useMainStore } from '../stores';
import FlexibleTooltip from "./FlexibleTooltip.vue";

const props = defineProps({
    isDarkMode: {
        type: Boolean,
        default: true
    },
    link: {
        type: String,
        default: ""
    },
    simple: {
        type: Boolean,
        default: false
    }
})

    
const store = useMainStore();
const translations = computed(() => store.translations);

</script>

<template>
    <div class="relative" v-if="simple">
        <FlexibleTooltip position="bottom" :content="translations.githubCode[store.lang]" width="w-fit min-w-[120px]" delay="delay-150">
            <a  :href="`https://github.com/graphieros/vue-data-ui/blob/master/src/components/${link}.vue`" target="_blank">
                <button class="shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)] h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] flex place-items-center justify-center rounded-lg bg-gray-100 dark:bg-[#242424] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors">
                    <BrandGithubFilledIcon />
                </button>
            </a>
        </FlexibleTooltip>
    </div>

    <a v-else :href="`https://github.com/graphieros/vue-data-ui/blob/master/src/components/${link}.vue`" target="_blank">
        <button class="flex gap-1 font-inter-medium transition-all border border-app-blue py-3 px-5 rounded-md bg-[#5f8bee20] hover:bg-[#5f8bee33] hover:shadow-xl">
            <BrandGithubFilledIcon class="text-app-blue"/>
            {{ translations.githubCode[store.lang] }}
        </button>
    </a>
</template>