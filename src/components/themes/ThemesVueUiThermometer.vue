<script setup>
import { ref } from "vue";
import ThemeTag from "../ThemeTag.vue";

const dataset = ref({
  value: 37,
  from: -100,
  to: 100,
  steps: 20,
  colors: {
    from: "#42d392",
    to: "#5f8bee",
  }
});

const config = ref({
    style: {

        title: {
            text: "Title",
            subtitle: {
                text: "Subtitle"
            }
        }
        
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <ThemeTag type="default"/>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="zen"/>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="concrete"/>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <ThemeTag type="hack"/>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>