<script setup>
import { ref, computed, nextTick } from "vue";
import vClickOutside from "../directives/vClickOutside";

const props = defineProps({
    id: { type: String, required: true },
    value: { type: String, required: true },
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const emit = defineEmits(["update:value", "change"]);

const isOpen = ref(false);
const list = ref(null);
const highlightedIndex = ref(null);
const optionsRef = ref([]);
const selectedOption = computed(() =>
    props.options.find((option) => option.link === props.value)
);

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
    emit("update:value", option.link);
    emit("change", option.link);
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
</script>

<template>
    <div class="dropdown" @keydown.down.prevent="navigate(1)" @keydown.up.prevent="navigate(-1)"
        @keydown.enter.prevent="selectHighlighted" @keydown.esc.prevent="toggleDropdown(false)"
        v-click-outside="onClickAway">
        <button 
            ref="button" 
            class="dropdown-button bg-white dark:bg-[#2A2A2A] border border-[#5f8aee50] hover:border-app-blue transition-colors" 
            :aria-haspopup="true" 
            :aria-expanded="isOpen.toString()"
            @click="toggleDropdown()"
        >
            <slot name="selected" v-bind="{ selectedOption }"/>
        </button>
        <ul 
            v-show="isOpen" 
            ref="list" 
            class="dropdown-options bg-white dark:bg-[#2A2A2A]" 
            role="listbox" 
            :aria-labelledby="id"
        >
            <li v-for="(option, index) in options" :key="option.link"
                ref="optionsRef"
                :class="{ highlighted: index === highlightedIndex }" 
                class="dropdown-option" 
                role="option"
                :aria-selected="index === highlightedIndex" @click="selectOption(option)" @mouseover="highlight(index)"
                @mouseleave="highlight(null)">
                <slot name="option" v-bind="{ option, selected: index === highlightedIndex }"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.dropdown {
    display: inline-block;
    width: 255px;
    position: relative;
    width: 100%;
}

.dropdown-button {
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    width: 255px;
}

.dropdown-options {
    border-radius: 4px;
    list-style: none;
    margin-top: 0.25rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    width: 255px;
    z-index: 10;
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.dropdown-option {
    cursor: pointer;
    padding: 0.5rem;
}

.dropdown-option.highlighted {
    background-color: #5f8aee;
    color: white;
}
</style>
