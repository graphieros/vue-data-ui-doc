<script setup>
import { ref, computed, onMounted } from "vue";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";
import { VueUiWordCloud } from "vue-data-ui";
import { createWordCloudDatasetFromPlainText } from "vue-data-ui"
import { useMainStore } from "../stores";
import { shiftHue } from '../components/maker/lib'

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const url = 'https://api.github.com/repos/graphieros/vue-data-ui/issues?state=all'
const issues = ref([]);
const closedIssues = ref([]);

async function fetchIssues() {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        return response.json();
    }).then(json => {
        issues.value = json.filter(issue => issue.state !== "closed");
        closedIssues.value = json.filter(issue => issue.state === 'closed');
    })
}

onMounted(fetchIssues)

const reactions = ref([
    { description: '+1', emoji: '👍' },
    { description: '-1', emoji: '👎' },
    { description: 'laugh', emoji: '😄' },
    { description: 'hooray', emoji: '🎉' },
    { description: 'confused', emoji: '😕' },
    { description: 'heart', emoji: '❤️' },
    { description: 'rocket', emoji: '🚀' },
    { description: 'eyes', emoji: '👀' }
]);

function removeNonAlphabetic(input) {
    return input.replace(/[^a-zA-Z\s]/gu, '');
}

const closedIssuesWordCloud = computed(() => {
    if (!closedIssues.value.length) return "";
    const titles = closedIssues.value.map(issue => issue.title).join(' ');

    return createWordCloudDatasetFromPlainText(removeNonAlphabetic(clean(titles))).sort((a, b) => b.value - a.value);
})

function makeColors({ colorStart, iterations, force }) {
    let color = colorStart;
    const arr = [colorStart];
    for (let i = 0; i < iterations; i += 1) {
        color = shiftHue(color, force);
        arr.push(color)
    }
    return arr;
}


const wordCloudConfig = computed(() => {
    return {
        customPalette: makeColors({
            colorStart: '#9d03fc',
            iterations: 200,
            force: 0.0006
        }),
        table: {
            th: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            },
            td: {
                backgroundColor: 'transparent',
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
            }
        },
        style: {
            chart: {
                color: isDarkMode.value ? '#CCCCCC' : "#1A1A1A",
                backgroundColor: 'transparent',
                height: 500,
                width: 500,
                words: {
                    proximity: 10,
                    packingWeight: 5,
                    color: isDarkMode.value ? '#8A8A8A' : '#3A3A3A',
                    usePalette: true,
                },
                tooltip: {
                    backgroundColor: isDarkMode.value ? '#1A1A1A' : '#FFFFFF',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                    backgroundOpacity: 0
                },
                title: {
                    text: 'Closed issues themes',
                    color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                }
            }
        }
    }
})

function clean(text) {

    return text
        .replaceAll('<', '')
        .replaceAll('>', '')
        .replaceAll('[', '')
        .replaceAll(']', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('https://github.com/user-attachements/assets/', '')
        .replaceAll('//', '')
        .replaceAll('**', ' ')
        .replaceAll('"', ' ')
        .replaceAll("'", ' ')
        .replaceAll(' the ', ' ')
        .replaceAll(' in ', '')
        .replaceAll(' if ', '')
        .replaceAll(' and ', '')
        .replaceAll(' it ', '')
        .replaceAll(' by ', '')
        .replaceAll(' which ', '')
        .replaceAll(' there ', '')
        .replaceAll(' when ', '')
        .replaceAll(' on ', '')
        .replaceAll(' is ', '')
        .replaceAll(' are ', '')
        .replaceAll(' from ', '')
        .replaceAll(' to ', '')
        .replaceAll(' Ft ', '')
        .replaceAll(' Ft', '')
        .replaceAll('If ', '')
        .replaceAll(' of ', '')
        .replaceAll(' not ', '')
        .replaceAll(' for ', '')
        .replaceAll(' a ', '')
        .replaceAll('Component', 'component')
        .replaceAll('Question', 'question')
}

</script>

<template>
    <div class="w-full flex flex-row place-items-center justify-center gap-2 p-4 bg-[#e1e5e8] dark:bg-[#2A2A2A] rounded-md">
        <VueUiWordCloud v-if="closedIssuesWordCloud.length" :dataset="closedIssuesWordCloud"
            :config="wordCloudConfig" />
    </div>
    <div class="mt-4 w-full flex flex-col gap-2 max-h-[800px] overflow-y-auto p-2 bg-[#e1e5e8] dark:bg-[#2A2A2A] rounded-md">

        <h2 class="text-xl">Open issues</h2>
        {{ issues.length === 0 ? 'None for now :)' : '' }}
        <div v-for="issue in issues"
            class="w-full rounded-md border border-gray-500 dark:border-[#3A3A3A] py-2 flex flex-col gap-2 bg-white dark:bg-[#1A1A1A]">
            <div class="flex flex-row flex-wrap gap-2 pb-2 border-b border-gray-500 dark:border-[#3A3A3A] px-2">
                <FlexibleTooltip content="Open in Github" position="bottom">
                    <a :href="issue.html_url" target="_blank">
                        <button
                            class="h-[48px] w-[48px] rounded-md border border-app-blue dark:border-app-green flex place-items-center justify-center bg-app-blue dark:bg-app-green">
                            <BrandGithubFilledIcon class="text-black" />
                        </button>
                    </a>
                </FlexibleTooltip>
                <div class="flex flex-col gap-2 ">
                    <div class="flex flex-row gap-2 px-2 flex-wrap">
                        <FlexibleTooltip :content="issue.user.login" position="bottom">
                            <img alt="User avatar" :src="issue.user.avatar_url"
                                class="rounded-full h-6 border border-gray-500 dark:border-app-green">
                        </FlexibleTooltip>
                        {{ issue.title }}
                    </div>
                    <div class="flex flex-row text-xs text-gray-500 px-2">
                        {{ new Date(issue.created_at).toLocaleDateString() }}
                    </div>
                </div>
            </div>
            <div class="gap-2 px-2" v-html="issue.body" />
            <div class="flex flex-row flex-wrap gap-4 pt-2 border-t border-gray-500 dark:border-[#3A3A3A] px-2">
                <template v-for="reaction in reactions">
                    <div v-if="issue.reactions[reaction.description]"
                        class="px-2 rounded-full border border-app-blue dark:border-app-green bg-[#5f8aee10] dark:bg-[#42d39230] flex place-items-center justify-center gap-2">
                        <span>{{ reaction.emoji }}</span>
                        <span class="text-xs">{{ issue.reactions[reaction.description] }}</span>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>