<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { SearchIcon } from "vue-tabler-icons";

const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => [],
    },
    label: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "Type to search…",
    },
    maximumSuggestions: {
        type: Number,
        default: 8,
    },
    inputId: {
        type: String,
        default: "searchInput",
    },
});

const model = defineModel({ type: String, default: "" });

const listId = computed(() => `${props.inputId}-suggestions`);

const inputElement = ref(null);

const isOpen = ref(false);
const activeIndex = ref(-1);

function normalizeText(value) {
    return String(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

const suggestions = computed(() => {
    const query = normalizeText(model.value.trim());
    if (!query) return [];

    return props.items
        .filter((item) => normalizeText(item).includes(query))
        .slice(0, props.maximumSuggestions);
});

const activeDescendantId = computed(() => {
    if (!isOpen.value) return "";
    if (activeIndex.value < 0) return "";
    if (activeIndex.value >= suggestions.value.length) return "";
    return suggestionId(activeIndex.value);
});

function suggestionId(index) {
    return `${props.inputId}-suggestion-${index}`;
}

function suggestionKey(suggestion, index) {
    return `${suggestion}-${index}`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function highlightSuggestion(suggestion, query) {
    const safeSuggestion = String(suggestion);
    const safeQuery = String(query || "");

    const normalizedSuggestion = normalizeText(safeSuggestion);
    const normalizedQuery = normalizeText(safeQuery);

    if (!normalizedQuery) return escapeHtml(safeSuggestion);

    const matchIndex = normalizedSuggestion.indexOf(normalizedQuery);
    if (matchIndex < 0) return escapeHtml(safeSuggestion);

    const before = safeSuggestion.slice(0, matchIndex);
    const match = safeSuggestion.slice(matchIndex, matchIndex + safeQuery.length);
    const after = safeSuggestion.slice(matchIndex + safeQuery.length);

    return `${escapeHtml(before)}<strong>${escapeHtml(match)}</strong>${escapeHtml(after)}`;
}

function openIfHasSuggestions() {
    isOpen.value = suggestions.value.length > 0;
    if (!isOpen.value) activeIndex.value = -1;
}

function closeSuggestions() {
    isOpen.value = false;
    activeIndex.value = -1;
}

function selectSuggestion(index) {
    const value = suggestions.value[index];
    if (value == null) return;
    model.value = value;
    closeSuggestions();
}

function handleInput() {
    openIfHasSuggestions();
}

function handleFocus() {
    openIfHasSuggestions();
}

async function handleKeydown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
    }

    if (!isOpen.value && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        openIfHasSuggestions();
        await nextTick();
    }

    if (!isOpen.value) return;

    if (event.key === "ArrowDown") {
        const nextIndex = Math.min(activeIndex.value + 1, suggestions.value.length - 1);
        activeIndex.value = nextIndex;
        scrollActiveIntoView();
        return;
    }

    if (event.key === "ArrowUp") {
        const nextIndex = Math.max(activeIndex.value - 1, 0);
        activeIndex.value = nextIndex;
        scrollActiveIntoView();
        return;
    }

    if (event.key === "Enter") {
        if (activeIndex.value >= 0) {
            event.preventDefault();
            selectSuggestion(activeIndex.value);
        }
        return;
    }

    if (event.key === "Escape") {
        closeSuggestions();
    }
}


function scrollActiveIntoView() {
    const id = activeDescendantId.value;
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ block: "nearest" });
}

function handleDocumentClick(event) {
    const root = inputElement.value?.closest?.(".autocomplete");
    if (!root) return;
    if (!root.contains(event.target)) closeSuggestions();
}

document.addEventListener("click", handleDocumentClick);

onBeforeUnmount(() => {
    document.removeEventListener("click", handleDocumentClick);
});
</script>

<template>
    <div class="autocomplete">
        <label v-if="label" class="label" :for="inputId">{{ label }}</label>

        <SearchIcon class="absolute top-1/2 -translate-y-1/2 left-2" />

        <input :id="inputId" ref="inputElement" type="search" class="input pl-6 !rounded-md" :placeholder="placeholder"
            autocomplete="off" role="combobox" aria-autocomplete="list" :aria-expanded="String(isOpen)"
            :aria-controls="listId" :aria-activedescendant="activeDescendantId || undefined" v-model="model"
            @input="handleInput" @keydown="handleKeydown" @focus="handleFocus" />

        <ul :id="listId" class="suggestions bg-white dark:bg-[#1A1A1A] rounded" role="listbox" :aria-hidden="String(!isOpen)">
            <li
                v-for="(suggestion, index) in suggestions"
                :key="suggestionKey(suggestion, index)"
                :id="suggestionId(index)"
                role="option"
                :aria-selected="String(index === activeIndex)"
                @mousedown.prevent="selectSuggestion(index)"
                class="
                    px-3 py-2 cursor-pointer
                    transition-colors
                    hover:bg-gray-100
                    dark:hover:bg-neutral-800
                    flex flex-row gap-2
                "
                :class="{
                    'bg-gray-100 dark:bg-neutral-800': index === activeIndex
                }"
            >
                <slot name="before" v-bind="{ suggestion }"></slot>
                <span v-html="highlightSuggestion(suggestion, model)"></span>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.autocomplete {
    position: relative;
    width: 250px;
}

.label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
}

.input {
    width: 100%;
    padding: 10px 12px 10px 36px;
    font-size: 16px;
    box-sizing: border-box;
}

.suggestions {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    max-height: 240px;
    overflow: auto;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    display: none;
    z-index: 10;
}

.suggestions[aria-hidden="false"] {
    display: block;
}

.suggestions li {
    padding: 8px 12px;
    cursor: pointer;
}
</style>
