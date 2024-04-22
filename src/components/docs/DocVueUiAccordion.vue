<script setup>
import { ref, watch, nextTick, computed } from "vue";
import Box from "../Box.vue";
import { PinIcon, PinnedOffIcon, CopyIcon } from "vue-tabler-icons";
import mainConfig from "../../assets/default_configs.json";
import { useMainStore } from "../../stores";
import GitHubLink from "../GitHubLink.vue";
import MakerLink from "../MakerLink.vue"

const store = useMainStore();
const key = ref(0);
const hintPin = computed(() => store.hints.pin);
const translations = computed(() => store.translations);

watch(() => store.isDarkMode, (val) => {
    nextTick(() => {
        key.value += 1;
    })
});

const isDarkMode = computed(() => {
    return store.isDarkMode;
})

const config = ref({
    open: false,
    maxHeight: 2000,
  head: {
    useArrowSlot: false,
    backgroundColor: "#e1e5e8",
    color: "#2D353C",
    iconColor: "#5f8bee",
    padding: "12px 6px"
  },
  body: {
    backgroundColor: "#e1e5e8",
    color: "#2D353C"
  }
})

const darkModeConfig = ref({
    open: false,
    maxHeight: 2000,
  head: {
    useArrowSlot: false,
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC",
    iconColor: "#5f8bee",
    padding: "12px 6px"
  },
  body: {
    backgroundColor: "#2A2A2A",
    color: "#CCCCCC"
  }
})

const mutableConfig = ref(JSON.parse(JSON.stringify(config.value)));
const mutableConfigDarkMode = ref(JSON.parse(JSON.stringify(darkModeConfig.value)));
function resetDefault() {
    mutableConfig.value = JSON.parse(JSON.stringify(config.value));
    mutableConfigDarkMode.value = JSON.parse(JSON.stringify(darkModeConfig.value));
}


function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

const skeletonConfig = computed(() => {
    return {
        type: 'donut',
        style: {
            backgroundColor: isDarkMode.value ? '#2A2A2A' : '#e1e5e8', 
            animated: false,
            donut: {
                color: isDarkMode ? '#CCCCCC' : '#1A1A1A'
            }
        }
    }
})

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="accordion" stroke="#42d392" :strokeWidth="1.5" />
            VueUiAccordion
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.accordion[store.lang] }}
        </p>
        <div :class="`transition-all mx-auto ${isFixed ? 'fixed bottom-0 w-[300px] left-0 z-50 overflow-auto border border-black dark:border-white bg-gray-100 dark:bg-[rgb(26,26,26)] shadow-xl' : 'max-w-[600px]'}`">
            <div class="flex flex-col mb-6 gap-2" v-if="isFixed">
                <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:shadow-xl hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mx-6">{{ translations.docs.reset[store.lang] }}</button>
                <button @click="copyToClipboard(isDarkMode ? darkModeConfig : config)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 mx-6 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
            </div>
            <VueDataUi component="VueUiAccordion" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="key">
                <template #title="{color}">
                    <div :style="`color:${color}`">Title</div>
                </template>
                <template #content>
                    <VueUiSkeleton :config="skeletonConfig"/>
                    <div class="pb-3 text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illum magni corporis ab, possimus reiciendis esse pariatur dolorem cum et veniam aliquam, accusamus optio iusto ea rem neque laboriosam fugiat perspiciatis! Eos aperiam iure earum suscipit fuga temporibus, consequatur tenetur ex, distinctio ullam reprehenderit, soluta mollitia eligendi. Similique, labore nam!
                    </div>
                </template>
            </VueDataUi>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_accordion)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-accordion"/>
        </div>
        <Box :activeTab="1" showSlots>
            <template #tab0>
                {{ translations.docs.comments.noDataset[store.lang] }}
            </template>
            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiAccordionConfig</code>
                </div>
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiAccordionConfig</span> = {
    open: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.open" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.open" @change="forceChartUpdate()">, (default: false) 
    maxHeight: <input v-if="isDarkMode" type="number" min="800" max="5000" v-model="mutableConfigDarkMode.maxHeight"><input v-else type="number" min="800" max="5000" v-model="mutableConfig.maxHeight">, (default: 2000)
    head: {
        useArrowSlot: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.head.useArrowSlot" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.head.useArrowSlot" @change="forceChartUpdate()">, (default: true) 
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.head.backgroundColor"><input v-else type="color" v-model="mutableConfig.head.backgroundColor">, (default: "#FFFFFF")
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.head.color"><input v-else type="color" v-model="mutableConfig.head.color">, (default: "#2D353C")
        iconColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.head.iconColor"><input v-else type="color" v-model="mutableConfig.head.iconColor">, (default: "#5f8bee")
        padding: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.head.padding"><input v-else type="text" v-model="mutableConfig.head.padding">, (default: "12px 6px") 
    },
    body: {
        backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.body.backgroundColor"><input v-else type="color" v-model="mutableConfig.body.backgroundColor">, (default: "#FFFFFF")
        color: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.body.color"><input v-else type="color" v-model="mutableConfig.body.color">, (default: "#2D353C")
    }
}
</code>
</pre>
            </template>
            <template #tab3>
                <ul class="mb-6">
                    <li>#arrow</li>
                    <li>#title</li>
                    <li>#content</li>
                </ul>
                <code class="dark:text-gray-400">
                    &lt;VueUiAccordion<br>
                    &nbsp;&nbsp;:config="config"<br>
                    &gt;<br>

                    &nbsp;&nbsp;&lt;template #arrow="{ backgroundColor, color, iconColor, isOpen }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;VueUiIcon name="arrowRight" :size="16" :stroke="iconColor" /&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>

                    &nbsp;&nbsp;&lt;template #title="{ color, isOpen }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div :style="color: color;"&gt;My title&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br><br>
                    
                    &nbsp;&nbsp;&lt;template #content="{ backgroundColor, color, isOpen }"&gt;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div :style="color: color;"&gt;My content and components&lt;/div&gt;<br>
                    &nbsp;&nbsp;&lt;/template&gt;<br>
                    &lt;/VueUiAccordion&gt;
                </code>
            </template>
        </Box>
    </div>
</template>