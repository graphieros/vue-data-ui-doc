<script setup>
import { ref, computed } from "vue";
import CodeParser from "./CodeParser.vue";
import { useMainStore } from "../../stores";
import UserOptionsMenu from "../UserOptionsMenu.vue";
import BaseCard from "../BaseCard.vue";

const store = useMainStore()

const code1 = ref(`<VueUiXy :config="config" :dataset="dataset">
    <template #optionPdf>
        PRINT PDF
    </template>
</VueUiXy>`
)

const code2 = ref(`<VueUiXy :config="config" :dataset="dataset">
    <template #optionFullscreen="{ isFullscreen, toggleFullscreen }">
        <div @click="toggleFullscreen(isFullscreen ? 'out' : 'in')">
            TOGGLE FULLSCREEN
        </div>
    </template>
</VueUiXy>`
)

const code0 = ref(`const config = ref({
    userOptions: {
        tooltip: true,
        pdf: true,
        csv: true,
        img: true,
        svg: true,
        table: true,
        labels: true,
        sort: true,
        stack: true,
        fullscreen: true
    },
    // Rest of your config
})`
)

const code3 = ref(`<VueUiXy :config="config" :dataset="dataset">
    <template #menuIcon="{ isOpen, color }">
        <div>{{ isOpen ? '👆' : '👇' }}</div>
    </template>
</VueUiXy>`
)

</script>

<template>
    <div class="text-left mt-12 w-5/6 mx-auto mb-12 max-w-[1200px]">
        Config also allows you to hide some actions.<br>
        The example below illustrates all the possible options.<br>
        <span class="text-orange-500">Check out the docs to know what options are available for a given chart.</span>
        <div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
            <CodeParser :content="code0" language="javascript" @copy="store.copy()"/>
        </div>

        If you want to customize the contents of the options menu, you can leverage the slots provided with each chart. The click event is managed by the component.<br>

        Example:
<div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
    <CodeParser :content="code1" language="html" @copy="store.copy()"/>
</div>

    The #optionFullscreen slot has a specific implementation, where you need to apply a click event with the exposed data:

<div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
    <CodeParser :content="code2" language="html" @copy="store.copy()"/>
</div>

    The menu icon is also customizable if you don't like the classical burger menu icon:
<div class="w-full bg-[#2A2A2A] dark:bg-[#FFFFFF10] my-4 rounded-md p-4">
    <CodeParser :content="code3" language="html" @copy="store.copy()"/>
</div>

    <BaseCard>
        <table class="schema table-auto border-collapse border border-slate-500 my-4 w-full">
            <caption class="my-6">User options</caption>
            <thead>
                <tr class="bg-[#FFFFFF05]">
                    <th class="border border-slate-600 p-2">Config attribute (show | hide option)</th>
                    <th class="border border-slate-600 p-2">Slot name (customize content)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="p-2 border border-slate-700">-</td>
                    <td class="p-2 border border-slate-700"><code>#menuIcon</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">tooltip</td>
                    <td class="p-2 border border-slate-700"><code>#optionTooltip</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">pdf</td>
                    <td class="p-2 border border-slate-700"><code>#optionPdf</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">csv</td>
                    <td class="p-2 border border-slate-700"><code>#optionCsv</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">img</td>
                    <td class="p-2 border border-slate-700"><code>#optionImg</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">svg</td>
                    <td class="p-2 border border-slate-700"><code>#optionSvg</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">table</td>
                    <td class="p-2 border border-slate-700"><code>#optionTable</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">labels</td>
                    <td class="p-2 border border-slate-700"><code>#optionLabels</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">sort</td>
                    <td class="p-2 border border-slate-700"><code>#optionSort</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">stack</td>
                    <td class="p-2 border border-slate-700"><code>#optionStack</code></td>
                </tr>
                <tr>
                    <td class="p-2 border border-slate-700">fullscreen</td>
                    <td class="p-2 border border-slate-700"><code>#optionFullscreen</code></td>
                </tr>
            </tbody>
        </table>
    </BaseCard>

        <UserOptionsMenu />
        
    </div>
</template>