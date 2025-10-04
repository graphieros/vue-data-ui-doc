<script setup>
import BaseCard from "./BaseCard.vue";
import MenuDetail from "./MenuDetail.vue";
import { SquareRoundedLetterLIcon, SquareRoundedLetterSIcon, SquareRoundedLetterTIcon } from "vue-tabler-icons";

defineProps({
    menuItems: {
        type: Array,
        default() {
            return []
        }
    },
    title: {
        type: String,
        default: ''
    },
    filterBy: {
        type: String,
        default: ''
    }
})

    
</script>

<template>
    <BaseCard class="w-full max-w-[1000px] mx-auto mt-6 z-10">
        <div class="text-xs sm:text-sm grid grid-cols-2 xl:grid-cols-3 gap-4 my-2 p-2 sm:p-4 rounded-xl relative pt-12 sm:pt-16">
            <div class="absolute w-full font-black text-xl rounded-tl-xl rounded-tr-xl py-2 px-4">
                {{ title }}
            </div>
            <MenuDetail v-for="item in menuItems.filter(item => Array.isArray(item.type) ? item.type.includes(filterBy) : item.type === filterBy)" :icon="item.icon" :link="item.link" :item="item">
                <template #name>
                    {{ item.name }}
                    <SquareRoundedLetterSIcon v-if="item.hasSlot" class="bg-white dark:bg-black rounded-md absolute -top-1 right-0 text-app-blue" size="16"/>
                    <SquareRoundedLetterTIcon v-if="item.hasTableCss" class="bg-white dark:bg-black rounded-md absolute top-4 right-0 text-app-green" size="16"/>
                    <SquareRoundedLetterLIcon v-if="item.hasLegend" class="bg-white dark:bg-black rounded-md absolute top-9 right-0 text-app-orange" size="16"/>
                </template>
                <template #tooltip>
                    <div class="flex flex-col place-items-center justify-center">
                        <img v-if="item.thumb" :src="item.thumb">
                        {{ item.tooltip }}
                    </div>
                </template>
            </MenuDetail>
        </div>
    </BaseCard>
</template>