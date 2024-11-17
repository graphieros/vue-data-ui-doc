<script setup>
import { ref, computed, onMounted } from "vue";
import FlexibleTooltip from "./FlexibleTooltip.vue";
import { BrandGithubFilledIcon } from "vue-tabler-icons";

const url = 'https://api.github.com/repos/graphieros/vue-data-ui/issues'
const issues = ref([]);

async function fetchIssues() {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then((response) => {
        return response.json();
    }).then(json => {
        issues.value = json;
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
    { description: 'eyes', emoji: '👀'}
])

</script>

<template>
    <div class="w-full flex flex-col gap-2 max-h-[800px] overflow-y-auto p-2 bg-[#e1e5e8] dark:bg-[#2A2A2A] rounded-md">
        <h2 class="text-xl">Open issues</h2>
        {{ issues.length === 0 ? 'None for now :)' : '' }}
        <div v-for="issue in issues" class="w-full rounded-md border border-gray-500 dark:border-[#3A3A3A] py-2 flex flex-col gap-2 bg-white dark:bg-[#1A1A1A]">
            <div class="flex flex-row flex-wrap gap-2 pb-2 border-b border-gray-500 dark:border-[#3A3A3A] px-2">
                <FlexibleTooltip
                    content="Open in Github"
                    position="bottom"
                >
                    <a :href="issue.html_url" target="_blank">
                        <button class="h-[48px] w-[48px] rounded-md border border-app-blue dark:border-app-green flex place-items-center justify-center bg-app-blue dark:bg-app-green">
                            <BrandGithubFilledIcon class="text-black"/>
                        </button>
                    </a>
                </FlexibleTooltip>
                <div class="flex flex-col gap-2 ">
                    <div class="flex flex-row gap-2 px-2 flex-wrap">
                        <FlexibleTooltip
                            :content="issue.user.login"
                            position="bottom"
                        >
                            <img alt="User avatar" :src="issue.user.avatar_url" class="rounded-full h-6 border border-gray-500 dark:border-app-green">
                        </FlexibleTooltip>
                        {{ issue.title }}
                    </div>
                    <div class="flex flex-row text-xs text-gray-500 px-2">
                        {{ new Date(issue.created_at).toLocaleDateString() }}
                    </div>
                </div>
            </div>
            <div class="gap-2 px-2" v-html="issue.body"/>
            <div class="flex flex-row flex-wrap gap-4 pt-2 border-t border-gray-500 dark:border-[#3A3A3A] px-2">
                <template v-for="reaction in reactions">                
                    <div v-if="issue.reactions[reaction.description]" class="px-2 rounded-full border border-app-blue dark:border-app-green bg-[#5f8aee10] dark:bg-[#42d39230] flex place-items-center justify-center gap-2">
                        <span>{{ reaction.emoji }}</span>
                        <span class="text-xs">{{ issue.reactions[reaction.description] }}</span>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>