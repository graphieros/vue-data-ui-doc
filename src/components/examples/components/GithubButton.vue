<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../../../stores";
import { BrandGithubFilledIcon, StarFilledIcon, ExclamationCircleIcon, ToolIcon } from "vue-tabler-icons";

const store = useMainStore();

const isDarkMode = computed(() => store.isDarkMode);
const stars = computed(() => store.stars);
const issues = computed(() => store.issues) // store.issues

const digitConfig = computed(() => {
    return {
        height: "100%",
        backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
        digits: {
            color: isDarkMode.value ? "#fdd663" : "#2D353C",
            skeletonColor: isDarkMode.value ? "#3A3A3A": "#e1e5e8"
        }
    }
})

const digitConfigIssues = computed(() => {
    return {
        height: "100%",
        backgroundColor: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
        digits: {
            color: isDarkMode.value ? "#5f8aee" : "#2D353C",
            skeletonColor: isDarkMode.value ? "#3A3A3A": "#e1e5e8"
        }
    }
})

const maxDownload = computed(() => {
    if (!store.npmDownloads.length) return 0
    return Math.max(...store.npmDownloads.map(d => d.value))
})

</script>

<template>
    <a title="Github repository. Leave a star to support us :)" href="https://github.com/graphieros/vue-data-ui" target="_blank" class="hover:-translate-y-[2px] transition-all z-50 fixed bottom-[155px] right-2 rounded-full p-2 flex place-items-center justify-center border h-[42px] w-[42px] border-[#fdd663] hover:shadow-md bg-gradient-to-b from-[#f7e2a3] to-[#fdd663]">
        <BrandGithubFilledIcon class="text-black" size="24"/>
        <StarFilledIcon class="text-black dark:text-[#fdd663] absolute top-0 -left-4" size="14"/>
        <div class="w-[40px] absolute -top-6" v-if="stars">
            <VueDataUi 
                component="VueUiDigits" 
                :dataset="stars" 
                :config="digitConfig"
            />
        </div>
    </a>

    <div class="w-[60px] h-[35px] fixed right-0 bottom-[122px]" v-if="store.npmDownloads.length">
        <VueUiSparkline
            :dataset="store.npmDownloads"
            :config="{
                responsive: true,
                type: 'line',
                style: {
                    scaleMax: maxDownload,
                    backgroundColor: '#FFFFFF00',
                    chartWidth: 300,
                    dataLabel: { show: false },
                    title: { show: false },
                    line: {
                        strokeWidth: 1.6,
                    },
                    plot: {
                        show: false,
                    },
                    verticalIndicator: {
                        show: false,
                    }
                }
            }"
        />
    </div>

    <a v-if="issues" href="https://github.com/graphieros/vue-data-ui/issues" target="_blank" class="hover:-translate-y-[2px] transition-all z-50 fixed bottom-[235px] right-2 rounded-full p-2 flex place-items-center justify-center border h-[42px] w-[42px] border-[#5f8aee] hover:shadow-md bg-gradient-to-b from-[#8eabed] to-[#5f8aee]">
        <BrandGithubFilledIcon class="text-black" size="24"/>
        <ToolIcon class="text-black dark:text-[#5f8aee] absolute top-0 -left-4" size="14"/>
        <div class="w-[10px] absolute -top-6">
            <VueDataUi component="VueUiDigits" :dataset="issues" :config="digitConfigIssues"/>
        </div>
    </a>
</template>