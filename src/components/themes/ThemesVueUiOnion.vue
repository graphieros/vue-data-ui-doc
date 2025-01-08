<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref([
    {
    name: "Serie 1",
    percentage: 21,
    value: 1200,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 2",
    percentage: 34,
    value: 1000,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 3",
    percentage: 55,
    value: 500,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 4",
    percentage: 79,
    value: 1280,
    prefix: "",
    suffix: "",
  },
  {
    name: "Serie 5",
    percentage: 52,
    value: 145,
    prefix: "",
    suffix: "",
    
  }
]);

const config = ref({
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            }
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <ThemeTag type="default"/>
            <VueDataUi component="VueUiOnion" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiOnion" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiOnion" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiOnion" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>