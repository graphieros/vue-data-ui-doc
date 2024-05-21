<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
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

const dataset0 = ref(299792458);
const dataset1 = ref(40075);
const dataset2 = ref(384400);

const config = ref({
    animationFrames: 60,
    animationValueStart: 0,
    backgroundColor: "#FFFFFF",
    fontFamily: "inherit",
    layoutClass: "bg-white p-4 rounded-md shadow-md mb-6",
    prefix: "",
    suffix: "m/s",
    title: "Speed of light",
    titleBold: true,
    titleColor: "#2D353C",
    titleClass: "",
    titleCss: "",
    titleFontSize: 16,
    useAnimation: true,
    valueBold: true,
    valueColor: "#6376DD",
    valueClass: "tabular-nums",
    valueCss: "",
    valueFontSize: 32,
    valueRounding: 0
})

const darkModeConfig = ref({
    animationFrames: 60,
    animationValueStart: 0,
    backgroundColor: "#1A1A1A",
    fontFamily: "inherit",
    layoutClass: "p-4 rounded-md shadow-md mb-6",
    prefix: "",
    suffix: " m/s",
    title: "Speed of light",
    titleBold: true,
    titleColor: "#CCCCCC",
    titleClass: "",
    titleCss: "",
    titleFontSize: 16,
    useAnimation: true,
    valueBold: true,
    valueColor: "#6376DD",
    valueClass: "tabular-nums",
    valueCss: "",
    valueFontSize: 32,
    valueRounding: 0
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

</script>

<template>
    <div>
        <h1 class="flex flex-row place-items-center w-full justify-center gap-5 font-satoshi-bold text-app-blue mb-2 text-2xl">
            <VueUiIcon name="kpiBox" stroke="#42d392" :strokeWidth="1.5" />
            VueUiKpi
        </h1>
        <p class="mx-auto max-w-[400px] text-md text-black dark:text-gray-500 mb-2 text-center">
            {{ translations.docs.tooltips.kpi[store.lang] }}
        </p>

        <div class="w-full mx-auto flex flex-row gap-4 flex-grow place-items-center justify-center">
            <VueDataUi component="VueUiKpi" :dataset="dataset0" :config="isDarkMode ? mutableConfigDarkMode : mutableConfig" :key="`kpi0_${key}`">
                <template #comment-before>
                    <div class="max-w-[300px] text-[10px] mt-2 text-gray-500">According to the special theory of relativity, c is the upper limit for the speed at which conventional matter or energy (and thus any signal carrying information) can travel through space</div>
                </template>
            </VueDataUi>
        </div>
        <div class="w-full flex place-items-center place-content-center my-6 gap-4 flex-col sm:flex-row">
            <button class="flex gap-1 bg-gradient-to-br from-app-green to-app-blue py-3 px-5 rounded-md text-white hover:shadow-xl dark:text-black font-satoshi-bold hover:from-app-blue hover:to-app-green transition-all" @click="copyToClipboard(mainConfig.vue_ui_kpi)"><CopyIcon/> {{ translations.docs.copyDefaultConfig[store.lang]}}</button>
            <GitHubLink link="vue-ui-kpi"/>
            <MakerLink to="VueUiKpi"/>
        </div>

        <Box showSlots>
            <template #tab0>
                {{ translations.docs.datastructure[store.lang] }}
                <div class="my-4">
                    TS type: <code class="text-app-green">number</code>
                </div>
                {{ translations.docs.example[store.lang] }}
                <div class="w-full overflow-x auto">
<pre>
<code>
const <span class="text-black dark:text-app-green">dataset</span> = 299792458;
</code>
</pre>                    
                </div>
            </template>

            <template #tab1>
                <div class="flex gap-2">
                    <button @click="resetDefault" class="text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-orange mr-4 transition-all">{{ translations.docs.reset[store.lang] }}</button>
                    <button @click="copyToClipboard(isDarkMode ? mutableConfigDarkMode : mutableConfig)" class="flex gap-1 text-black dark:text-gray-400 rounded-md border border-gray-400 py-2 px-4 hover:bg-white hover:shadow-xl dark:hover:bg-[rgba(255,255,255,0.05)] hover:border-app-blue transition-all"><CopyIcon/> {{  translations.docs.copyThisConfig[store.lang]  }}</button>
                </div>
                <div class="mt-4">
                    TS type: <code class="text-app-blue">VueUiKpiConfig</code>
                </div>
                <div class="overflow-w-auto">
<pre>
<code>
const <span class="text-black dark:text-app-blue">config: VueUiKpiConfig</span> = {
    animationFrames: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="1000" v-model="mutableConfigDarkMode.animationFrames" @change="forceChartUpdate()"><input v-else type="number" class="accent-app-blue" min="0" max="1000" v-model="mutableConfig.animationFrames" @change="forceChartUpdate()">, (default: 60)
    backgroundColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.backgroundColor"><input v-else type="color" v-model="mutableConfig.backgroundColor">,  (default: "#FFFFFF")
    fontFamily: "inherit",
    layoutClass: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.layoutClass"><input v-else type="text" v-model="mutableConfig.layoutClass">, (default: "")
    layoutCss: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.layoutCss"><input v-else type="text" v-model="mutableConfig.layoutCss">, (default: "")
    prefix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.prefix"><input v-else type="text" v-model="mutableConfig.prefix">, (default: "")
    suffix: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.suffix"><input v-else type="text" v-model="mutableConfig.suffix">, (default: "")
    title: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.title"><input v-else type="text" v-model="mutableConfig.title">, (default: "")
    titleBold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.titleBold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.titleBold" @change="forceChartUpdate()">, (default: true)
    titleColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.titleColor"><input v-else type="color" v-model="mutableConfig.titleColor">,  (default: "#2D353C")
    titleClass: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.titleClass"><input v-else type="text" v-model="mutableConfig.titleClass">, (default: "")
    titleCss: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.titleCss"><input v-else type="text" v-model="mutableConfig.titleCss">, (default: "")
    titleFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfigDarkMode.titleFontSize"><input v-else type="number" class="accent-app-blue" min="0" max="100" v-model="mutableConfig.titleFontSize">, (default: 16)
    useAnimation: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.useAnimation" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.useAnimation" @change="forceChartUpdate()">, (default: true)
    valueBold: <input v-if="isDarkMode" type="checkbox" class="accent-app-blue" v-model="mutableConfigDarkMode.valueBold" @change="forceChartUpdate()"><input v-else type="checkbox" class="accent-app-blue" v-model="mutableConfig.valueBold" @change="forceChartUpdate()">, (default: true)
    valueColor: <input v-if="isDarkMode" type="color" v-model="mutableConfigDarkMode.valueColor"><input v-else type="color" v-model="mutableConfig.valueColor">,  (default: "#6376DD")
    valueClass: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.valueClass"><input v-else type="text" v-model="mutableConfig.valueClass">, (default: "")
    valueCss: <input v-if="isDarkMode" type="text" v-model="mutableConfigDarkMode.valueCss"><input v-else type="text" v-model="mutableConfig.valueCss">, (default: "")
    valueFontSize: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="6" max="100" v-model="mutableConfigDarkMode.valueFontSize"><input v-else type="number" class="accent-app-blue" min="6" max="100" v-model="mutableConfig.valueFontSize">, (default: 32)
    valueRounding: <input v-if="isDarkMode" type="number" class="accent-app-blue" min="0" max="3" v-model="mutableConfigDarkMode.valueRounding"><input v-else type="number" class="accent-app-blue" min="0" max="3" v-model="mutableConfig.valueRounding">, (default: 0)
}
</code>
</pre>                    
                </div>
            </template>

            <template #tab3>
<pre>
<code>
#title
<span class="text-gray-400">
    &lt;VueUiKpi :dataset="299792458" :config="config"&gt;
        &lt;template #title="{ comment }"&gt;
            <span v-pre>This is the title, it contains the {{ comment }} which is the actual dataset</span>
        &lt;/template&gt;
    &lt;/VueUiKpi&gt;
</span>

#value
<span class="text-gray-400">
    &lt;VueUiKpi :dataset="299792458" :config="config"&gt;
        &lt;template #value="{ comment }"&gt;
            <span v-pre>This is the value, it contains the {{ comment }} which is the actual dataset</span>
        &lt;/template&gt;
    &lt;/VueUiKpi&gt;
</span>

#comment-before
<span class="text-gray-400">
    &lt;VueUiKpi :dataset="299792458" :config="config"&gt;
        &lt;template #comment-before="{ comment }"&gt;
            <span v-pre>This is the comment before the value, it contains the {{ comment }} which is the actual dataset</span>
        &lt;/template&gt;
    &lt;/VueUiKpi&gt;
</span>

#comment-after
<span class="text-gray-400">
    &lt;VueUiKpi :dataset="299792458" :config="config"&gt;
        &lt;template #comment-after="{ comment }"&gt;
            <span v-pre>This is the comment after the value, it contains the {{ comment }} which is the actual dataset</span>
        &lt;/template&gt;
    &lt;/VueUiKpi&gt;
</span>

</code>
</pre>
            </template>
        </Box>
    </div>
</template>