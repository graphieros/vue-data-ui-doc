<script setup>
import { ref, computed } from "vue";
import BaseCard from "../../BaseCard.vue";
import BIBLIOTEK_SYSTEMER from "../../../assets/sponsors/bibliotek_systemer.png";

const props = defineProps({
    card: {
        type: Boolean
    },
    tw: {
        type: String
    }
})

const sponsors = ref([
    {
        name: 'Bibliotek Systemer',
        logo: BIBLIOTEK_SYSTEMER,
        link: 'https://bibsyst.no/'
    },
])

</script>

<template>
    <component :is="card ? BaseCard : 'div'" :class="tw">
        <div class="flex flex-row justify-between place-items-center">
            <h2 class="font-inter-medium">Sponsors</h2>
            <a 
                href="https://github.com/sponsors/graphieros?o=esb" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-row gap-2 place-items-center border border-[#E1E5E8] dark:border-[#4A4A4A] w-fit py-1 px-2 rounded-md hover:bg-[#E1E5E8] dark:hover:bg-[#3A3A3A] transition-all"
            >
                <svg aria-hidden="true" height="16" viewBox="-1 -1 18 18" version="1.1" width="16">
                    <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z" fill="#db61a2"></path>
                </svg>
                <span class="font-inter-medium text-[#6A6A6A] dark:text-[#9A9A9A]">
                    Sponsor Vue Data UI
                </span>
            </a>
        </div>
        <div class="mt-2 flex flex-row flex-wrap gap-4">
            <a 
                v-for="sponsor in sponsors" 
                :key="sponsor.name" 
                :href="sponsor.link" 
                target="_blank"
                rel="noopener noreferrer"
            >
                <img width="100" height="100" class="fit-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300" :src="sponsor.logo"/>    
            </a>
            <div class="h-[100px] w-[100px] border border-dashed border-[#9A9A9A] dark:border-[#4A4A4A]"></div>
        </div>
    </component>
</template>