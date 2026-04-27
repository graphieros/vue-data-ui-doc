<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
</script>

<template>
    <div class="ml-12 sm:mx-auto max-w-[1000px] px-12 sm:px-20">
        <a href="https://www.cockpit-itsm.com/" target="_blank">
            <div
                class="mt-8 w-full max-w-[800px] text-[18px] font-inter pl-4 mb-4 text-[#4A4A4A] dark:text-[#CCCCCC] flex flex-row gap-4"
            >
                <div class="w-[24px] h-[24px] mt-0.5">
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
                class="mx-auto"
            />
        </a>
    </div>
</template>
