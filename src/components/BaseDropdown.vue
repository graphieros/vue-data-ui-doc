<script setup>
import { ref, computed, nextTick, onBeforeUnmount, toRefs, onMounted, watch } from "vue";
import vClickOutside from "../directives/vClickOutside";
import { XIcon } from "vue-tabler-icons";
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";

const props = defineProps({
    id: { type: String, required: true },
    value: { type: [String, null], required: true },
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
    optionTarget: {
        type: String,
        default: 'link'
    },
    additionalOptionTarget: {
        type: String,
        default: 'component'
    },
    width: {
        type: Number,
        default: 305
    },
    basePadding: {
        type: String,
        default: '0.5rem 0.75rem'
    },
    background: {
        type: String,
        default: 'bg-gray-100 dark:bg-[#2A2A2A]'
    },
    search: {
        type: Boolean,
        default: true
    }
});

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);
const rootInput = ref(null);

function fokkus() {
    if (rootInput.value) {
        rootInput.value.focus();
    }
}

const emit = defineEmits(["update:value", "change"]);

const isOpen = ref(false);
const list = ref(null);
const highlightedIndex = ref(null);
const optionsRef = ref([]);

const selectedOption = computed(() =>
    props.options.find((option) => option[props.optionTarget] === props.value)
);

const currentIndex = computed(() => {
    return props.options.findIndex(o => {
        return o[props.optionTarget] === props.value
    });
})

const toggleDropdown = (forceState) => {
    isOpen.value = forceState !== undefined ? forceState : !isOpen.value;
    if (isOpen.value) focusFirstOption();
};

const focusFirstOption = async () => {
    highlightedIndex.value = 0;
    await nextTick();
    if (list.value) {
        list.value.scrollTop = 0;
    }
};

const navigate = (step) => {
    if (!isOpen.value) return toggleDropdown(true);
    const newIndex = highlightedIndex.value + step;
    if (newIndex >= 0 && newIndex < props.options.length) {
        highlightedIndex.value = newIndex;
        const option = list.value?.children[newIndex];
        if (option) {
        option.scrollIntoView({
            block: 'nearest',
        });
        }
    }
};
const highlight = (index) => {
    highlightedIndex.value = index;
};

const selectOption = (option) => {
    emit("update:value", option[props.optionTarget]);
    emit("change", option[props.optionTarget]);
    toggleDropdown(false);
};

const selectHighlighted = () => {
    if (highlightedIndex.value !== null) {
        selectOption(props.options[highlightedIndex.value]);
    }
};

const onClickAway = (event) => {
    const isButtonClicked = event.target === button.value;
    if (!isButtonClicked) {
        toggleDropdown(false);
    }
};

const button = ref(null);

const availableOptions = computed(() => {
    if(!searchModel.value) return props.options
    return props.options.filter(o => o[props.optionTarget].toUpperCase().includes(searchModel.value.toUpperCase()) || o[props.additionalOptionTarget].toUpperCase().includes(searchModel.value.toUpperCase()))
});

const searchModel = ref('');

function clearSearch() {
    searchModel.value = '';
}

watch(() => isOpen.value, async (v) => {
    await nextTick()
    v && fokkus()
})

defineExpose({
    clearSearch
});

</script>

<template>
    <div class="dropdown" @keydown.down.prevent="navigate(1)" @keydown.up.prevent="navigate(-1)"
        @keydown.enter.prevent="selectHighlighted" @keydown.esc.prevent="toggleDropdown(false)"
        v-click-outside="onClickAway"
        :style="{
            width: props.width + 'px'
        }"
    >
        <button 
            ref="button" 
            :class="`dropdown-button ${background} border border-[#5f8aee50] hover:border-app-blue transition-colors !rounded-full`" 
            :aria-haspopup="true" 
            :aria-expanded="isOpen.toString()"
            @click="toggleDropdown()"
            :style="{
                width: props.width + 'px',
                padding: props.basePadding
            }"
        >
            <slot name="selected" v-bind="{ selectedOption }"/>
        </button>
        <BaseCard v-show="isOpen" class="dropdown-options">
            <ul  
                ref="list" 
                :class="`${background}`" 
                role="listbox" 
                :aria-labelledby="id"
                :style="{
                    width: props.width + 'px'
                }"
            >
                <li v-if="search" class="sticky top-0 bg-inherit py-1 shadow-md">
                    <div class="w-full flex flex-row mt-1 mb-1 px-2 gap-2 place-items-center peer relative">
                        <input ref="rootInput" class="dd-search-input peer w-full h-[36px] transition-colors" style="padding-left:36px" type="text" v-model="searchModel"/>
                        <VueUiIcon name="magnify" :stroke="isDarkMode ? '#83a4f2' : '#1A1A1A'" class="absolute left-4" :size="20"/>
                        <button @click="searchModel = ''" :style="`opacity:${searchModel ? 1 : 0}; cursor:${searchModel ? 'pointer' : 'default'}`">
                            <XIcon class="text-gray-500 peer-focus:text-app-blue peer-hover:text-app-blue hover:text-app-blue transition-colors"/>
                        </button>
                    </div>
                    <div v-if="availableOptions.length === 0" class="text-xs mb-3 text-center">
                        {{ store.translations.search.noResults[store.lang] }}
                    </div>
                </li>
                <li v-for="(option, index) in availableOptions" :key="option[props.optionTarget]"
                    ref="optionsRef"
                    :class="{ highlighted: index === highlightedIndex, current: index === currentIndex }" 
                    class="dropdown-option" 
                    role="option"
                    :aria-selected="index === highlightedIndex" @click="selectOption(option)" @mouseover="highlight(index)"
                    @mouseleave="highlight(null)">
                    <slot name="option" v-bind="{ option, selected: index === highlightedIndex, current: index === currentIndex }"/>
                </li>
            </ul>
        </BaseCard>
    </div>
</template>

<style scoped>
.dropdown {
    display: inline-block;
    position: relative;
}

.dropdown-button {
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

.dropdown-options {
    list-style: none;
    margin-top: 0.25rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    z-index: 10;
}

.dropdown-option {
    cursor: pointer;
    padding: 0.5rem;
}

.dropdown-option.highlighted {
    background-color: #5f8aee99;
    color: white;
}

.dark .dropdown-option.highlighted:not(.current) {
    background: linear-gradient(to right, #5f8aee99, transparent);
}

.dropdown-option.current {
    background-color: #5f8aee;
    color: white;
}
.dd-search-input {
    background: transparent !important;
    border-radius: unset !important;
    border: unset !important;
    background: #FFFFFF10 !important;
}
.dd-search-input:hover, .dd-search-input:focus {
    border:unset !important;
    outline: unset !important;
    border-bottom: 1px solid #5f8aee !important;
}
</style>
