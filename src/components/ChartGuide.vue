<script setup>
import { computed, onMounted, onBeforeUnmount, ref, useId, watch } from "vue";
import { useMainStore } from "../stores";
import useCharts from "../useCharts";
import { catalog } from "./builder2/catalog.js";
import { dataShapes, guideChoices, guideMessage } from "./chartGuide.js";

const emit = defineEmits(["close", "choose"]);
const store = useMainStore();
const { classification, classificationDescription, taxinomy } = useCharts();
const t = (key) => guideMessage(key, store.lang);
const titleId = useId();
const dialog = ref(null);
const shape = ref("");
const goal = ref("");
const candidates = computed(() => guideChoices(taxinomy.value, shape.value));
const goals = computed(() => [
    ...new Set(
        candidates.value.flatMap((name) => taxinomy.value[name].taxinomy),
    ),
]);
const recommendations = computed(() =>
    guideChoices(taxinomy.value, shape.value, goal.value),
);
const buildable = new Set(catalog.map((chart) => chart.name));
watch(shape, () => {
    goal.value = "";
});
function close() {
    dialog.value?.close();
}
function choose() {
    emit("choose");
    close();
}
onMounted(() => dialog.value.showModal());
onBeforeUnmount(close);
</script>

<template>
    <Teleport to="body">
        <dialog
            ref="dialog"
            class="chart-guide"
            :class="{ 'guide-dark': store.isDarkMode }"
            :aria-labelledby="titleId"
            :dir="store.lang === 'ar' ? 'rtl' : 'ltr'"
            @close="emit('close')"
            @click.self="close"
        >
            <div class="guide-content">
                <header class="flex items-center justify-between gap-4">
                    <h2 :id="titleId" class="text-xl">{{ t("title") }}</h2>
                    <button
                        type="button"
                        autofocus
                        :aria-label="t('close')"
                        @click="close"
                    >
                        ×
                    </button>
                </header>
                <fieldset class="mt-6">
                    <legend>{{ t("shape") }}</legend>
                    <div class="guide-options">
                        <label v-for="(_names, key) in dataShapes" :key="key">
                            <input
                                v-model="shape"
                                type="radio"
                                :name="`${titleId}-shape`"
                                :value="key"
                                :data-testid="`guide-${key}`"
                            />
                            {{ t(key) }}
                        </label>
                    </div>
                </fieldset>
                <label v-if="shape" class="block mt-6">
                    <span class="block mb-2">{{ t("goal") }}</span>
                    <select
                        v-model="goal"
                        class="w-full p-2 rounded bg-gray-100 dark:bg-[#3A3A3A]"
                        data-testid="guide-goal"
                    >
                        <option value="">{{ t("all") }}</option>
                        <option v-for="key in goals" :key="key" :value="key">
                            {{ classification[key]?.[store.lang] || key }}
                        </option>
                    </select>
                </label>
                <p v-if="goal" class="mt-3 text-sm">
                    {{ classificationDescription[goal]?.[store.lang] }}
                </p>
                <ul class="mt-6 grid gap-3" aria-live="polite">
                    <li
                        v-for="name in recommendations"
                        :key="name"
                        class="p-3 border border-gray-400 dark:border-gray-600 rounded-lg"
                    >
                        <h3 class="font-inter-bold">{{ name }}</h3>
                        <p class="text-sm my-2">
                            {{ taxinomy[name].description }}
                        </p>
                        <div class="flex flex-wrap gap-4 text-app-blue">
                            <RouterLink
                                :to="taxinomy[name].link"
                                @click="choose"
                                >{{ t("docs") }}</RouterLink
                            >
                            <RouterLink
                                v-if="buildable.has(name)"
                                :to="{
                                    name: 'Maker',
                                    query: { component: name },
                                }"
                                @click="choose"
                                >{{ t("build") }}</RouterLink
                            >
                        </div>
                    </li>
                </ul>
            </div>
        </dialog>
    </Teleport>
</template>

<style scoped>
.chart-guide {
    margin: auto;
    width: min(640px, calc(100vw - 32px));
    max-height: calc(100dvh - 48px);
    padding: 24px;
    border-radius: 16px;
    background: #fff;
    color: #1a1a1a;
}
.chart-guide.guide-dark {
    background: #2a2a2a;
    color: #ccc;
}
.chart-guide::backdrop {
    background: #0008;
}
.guide-options {
    display: grid;
    gap: 12px;
    margin-top: 16px;
}
.guide-options label {
    display: flex;
    gap: 12px;
    align-items: center;
    cursor: pointer;
}
header button {
    font-size: 28px;
    line-height: 1;
    padding: 4px 8px;
}
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible {
    outline: 2px solid #5f8aee;
    outline-offset: 3px;
}
</style>
