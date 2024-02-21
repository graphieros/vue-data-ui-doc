<script setup>
import { ref, computed} from "vue";
import { useMainStore } from "../stores";
import MakerXy from "../components/maker/MakerXy.vue"

const store = useMainStore();

const translations = computed(() => {
    return store.translations;
})

const isDarkMode = computed(() => {
    return store.isDarkMode;
})



const selectedChart = ref({name: "VueUiXy", icon: "chartLine"})

const options = ref([
    { name: "VueUiXy", icon: "chartLine"},
    { name: "VueUiDonut", icon: "chartDonut"},
    { name: "VueUiWaffle", icon: "chartWaffle"},
])

</script>

<template>
    <div class="w-full max-w-[1400px] mx-auto overflow-visible">
        <h1 class="text-3xl top-6 left-6 text-center mt-6">{{ translations.menu.chartBuilder[store.lang] }}</h1>

        <div class="w-full mt-[64px]">
            <div class="flex flex-row gap-3 place-items-end justify-center">
                <div class="flex flex-col gap-2">
                    <label for="chartType">Select chart type:</label>
                    <select style="outline:1px solid #42d392 !important;margin-left:1px" id="chartType" v-model="selectedChart" class="h-[40px] px-6">
                        <option class="text-left" v-for="option in options" :value="option">{{ option.name }}</option>
                    </select>
                </div>
                <div style="margin-bottom:0.3px">
                    <VueUiIcon :size="38" :stroke-width="0.8" :name="selectedChart.icon" :stroke="isDarkMode ? '#42d392' : '#1A1A1A'"/>
                </div>
            </div>
        </div>

        <MakerXy v-if="selectedChart.name === 'VueUiXy'"/>


    </div>
</template>