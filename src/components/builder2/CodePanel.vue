<script setup>
import { useBuilderTranslations } from "./translations";
import { computed, reactive } from "vue";
import { generateCode } from "./code";
import { highlightVue } from "./highlight";
import { useMainStore } from "../../stores";
import BaseCard from "../BaseCard.vue";

const store = useMainStore();
const t = useBuilderTranslations();
const props = defineProps({
    component: String,
    dataset: { type: [Array, Object, Number, String] },
    config: Object,
});

const emit = defineEmits(["status"]);

const options = reactive({
    computed: true,
    vapor: false,
    universal: false,
    treeshaken: true,
    typescript: true,
});

const output = computed(() =>
    generateCode(props.component, props.dataset, props.config, options),
);

const highlightedCode = computed(() => highlightVue(output.value.code));

function toggleUniversal() {
    options.treeshaken = !options.universal;
}

function toggleTreeshaken() {
    if (options.treeshaken) options.universal = false;
}

async function copy(key, label) {
    try {
        await navigator.clipboard.writeText(output.value[key]);
        emit("status", label);
    } catch {
        emit("status", "clipboardUnavailable");
    }
}

function download() {
    const url = URL.createObjectURL(
        new Blob([output.value.code], { type: "text/plain" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${props.component}Example.vue`;
    link.click();
    URL.revokeObjectURL(url);
}
</script>

<template>
    <div class="section-heading">
        <div>
            <h2>{{ t("ready") }}</h2>
            <p class="muted">
                {{ t("codeHelp") }}
            </p>
        </div>
    </div>
    <div class="code-options">
        <label
            ><input v-model="options.computed" type="checkbox" />
            {{ t("useComputed") }}</label
        >
        <label
            ><input v-model="options.vapor" type="checkbox" />
            {{ t("useVapor") }}</label
        >
        <label
            ><input
                v-model="options.universal"
                type="checkbox"
                @change="toggleUniversal"
            />
            {{ t("useUniversal") }}</label
        >
        <label
            ><input
                v-model="options.treeshaken"
                type="checkbox"
                @change="toggleTreeshaken"
            />
            {{ t("treeshaken") }}</label
        >
        <label
            ><input v-model="options.typescript" type="checkbox" />
            {{ t("useTypescript") }}</label
        >
    </div>
    <p v-if="options.universal" class="muted universal-note">
        {{ t("universalNote") }}
    </p>
    <div class="code-actions">
        <button
            class="builder-button primary"
            @click="copy('code', 'copiedComponent')"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <rect x="8" y="8" width="12" height="13" rx="2" />
                <path
                    d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                />
            </svg>
            {{ t("copyComponent") }}
        </button>
        <button
            class="builder-button"
            @click="copy('configCode', 'copiedConfig')"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <rect x="8" y="8" width="12" height="13" rx="2" />
                <path
                    d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                />
            </svg>
            {{ t("copyConfig") }}
        </button>
        <button
            class="builder-button"
            @click="copy('datasetCode', 'copiedDataset')"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <rect x="8" y="8" width="12" height="13" rx="2" />
                <path
                    d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                />
            </svg>
            {{ t("copyDataset") }}
        </button>
        <button class="builder-button" @click="download">
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path
                    d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"
                />
            </svg>
            {{ t("download") }}
        </button>
    </div>
    <BaseCard>
        <div :class="store.isDarkMode ? 'maker-code-dark' : 'maker-code-light'">
            <pre
                class="code-output language-markup"
                tabindex="0"
                :aria-label="t('componentCode')"
            ><code class="language-markup" v-html="highlightedCode"></code></pre>
        </div>
    </BaseCard>
</template>
<style scoped src="./prism-tomorrow.css"></style>
<style scoped src="./prism.css"></style>
<style scoped>
.code-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 18px 0 22px;
}
.code-options label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    cursor: pointer;
}
.code-actions {
    flex-wrap: wrap;
}
.universal-note {
    margin-bottom: 16px;
}
</style>
<style scoped>
h2 {
    font-size: 15px;
    font-weight: 650;
}
.section-heading {
    margin-bottom: 22px;
}
.muted {
    color: var(--muted);
    font-size: 13px;
    margin-top: 5px;
}
.builder-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    background: var(--surface);
    color: var(--text);
}
.builder-button svg {
    flex-shrink: 0;
}
.builder-button:hover {
    border-color: var(--accent);
}
.primary {
    background: #42d392;
    color: #123529;
    border-color: #42d392;
    font-weight: 650;
}
.code-actions {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}
pre.code-output.language-markup {
    border: 0;
    box-shadow: none;
    padding: 22px;
    border-radius: 10px;
    max-height: 520px;
    overflow: auto;
    font-size: 12px;
    line-height: 1.65;
    text-shadow: none;
}
pre.code-output.language-markup :deep(code) {
    font-size: inherit;
    line-height: inherit;
    text-shadow: none;
}
/* Reset styles from global Prism themes before applying the local token colors. */
.code-output :deep(:where(.token)) {
    color: inherit;
    background: none;
    text-shadow: none;
    opacity: 1;
}
button:focus-visible,
pre:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
}
</style>
