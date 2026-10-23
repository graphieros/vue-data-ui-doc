<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
</script>

<template>
    <div class="mx-auto w-full min-w-0 max-w-[1000px] px-4 sm:px-20">
        <a href="https://www.cockpit-itsm.com/" target="_blank">
            <div
                class="mt-8 w-full max-w-[800px] text-sm sm:text-[18px] font-inter sm:pl-4 mb-3 sm:mb-4 text-[#4A4A4A] dark:text-[#CCCCCC] flex flex-row gap-3 sm:gap-4"
            >
                <div class="w-[24px] h-[24px] shrink-0 mt-0.5">
                    <VueUiIcon
                        name="externalLink"
                        :stroke="isDarkMode ? '#6A6A6A' : '#8A8A8A'"
                    />
                </div>
                <span>
                    <span class="font-inter-bold"> Cockpit ITSM </span>
                    <br />a all-in-one portal for IT Service Management (ITSM),
                    IT Asset Management (ITAM), and IT Operations Management
                    (ITOM)
                </span>
            </div>
        </a>
        <a href="https://www.cockpit-itsm.com/" target="_blank">
            <img
                src="../assets/cockpit-banner.png"
                alt="Cockpit ITSM banner"
                width="100%"
                class="mx-auto block w-full rounded-2xl sm:rounded-none"
            />
        </a>
    </div>
</template>
