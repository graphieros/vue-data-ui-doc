<script setup>
import { ref } from "vue";

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
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiThermometer" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>