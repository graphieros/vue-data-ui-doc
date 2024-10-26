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
                <button class="h-[50px] w-[50px] border border-gray-500 flex place-items-center justify-center rounded hover:bg-[#5f8bee20] transition-colors">
                    <BrandGithubFilledIcon class="text-app-blue"/>
                </button>
            </a>
        </FlexibleTooltip>
    </div>

    <a v-else :href="`https://github.com/graphieros/vue-data-ui/blob/master/src/components/${link}.vue`" target="_blank">
        <button class="flex gap-1 font-satoshi-bold transition-all border border-app-blue py-3 px-5 rounded-md bg-[#5f8bee20] hover:bg-[#5f8bee33] hover:shadow-xl">
            <BrandGithubFilledIcon class="text-app-blue"/>
            {{ translations.githubCode[store.lang] }}
        </button>
    </a>
</template>