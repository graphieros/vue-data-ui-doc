<script setup>
import { computed } from "vue";
import { useMainStore } from "../stores";

const props = defineProps({
    /**
     * {
     *      description: string,
     *      link: string
     * }
     */
    tree: {
        type: Array,
        default() {
            return []
        }
    },
    noMargin: {
        type: Boolean,
        default: false
    },
    showMobile: {
        type: Boolean,
        default: false
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const isMenuOpen = computed(() => store.isMenuOpen);

const validLinks = computed(() => {
    return props.tree.filter(d => !!d.description).length
})

</script>

<template>
    <div :class="`
            ${showMobile ? 'flex' : 'hidden sm:flex'}
            z-10 
            flex-row 
            gap-3 
            fixed 
            top-[55px] 
            ${props.noMargin ? 'left-0' : isMenuOpen ? 'left-[300px]' : 'left-[60px]'}
            text-xs 
            place-items-center 
            bg-[#FAFAFA] 
            dark:bg-[#2A2A2A] 
            w-full 
            py-2
            pl-4
            shadow
            `
        " 
        v-if="tree.length"
    >
        <div v-for="(branch, i) in tree" class="flex flex-row gap-3 place-items-center">
            <RouterLink 
                v-if="branch.link && i !== validLinks - 1" 
                :to="branch.link" 
                class="hover:underline hover:text-app-blue"
            >
                <div class="flex flex-row gap-2 place-items-center">
                    {{ branch.description }}
                    <VueUiIcon v-if="branch.icon" :name="branch.icon" :stroke="isDarkMode ? '#ABC2F6' : '#5F8AEE'" :size="16" :strokeWidth="1"/>
                </div>
            </RouterLink>
            <div v-else class="flex flex-row gap-2 place-items-center">
                {{ branch.description }}
                <VueUiIcon v-if="branch.icon" :name="branch.icon" :stroke="isDarkMode ? '#ABC2F6' : '#5F8AEE'" :size="16" :strokeWidth="1"/>
            </div>
            <VueUiIcon v-if="i < validLinks - 1 && validLinks > 1" name="arrowRight" :stroke="isDarkMode ? '#abc2f6' : '#5f8aee'" :size="12" />
        </div>
    </div>
</template>