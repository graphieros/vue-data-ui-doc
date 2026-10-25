<script setup>
import { useBuilderTranslations } from "./translations";
import { computed } from "vue";
import { convertColorToHex } from "../../useNestedProp";

const t = useBuilderTranslations();

const props = defineProps({
    modelValue: { default: null },
    label: { type: String, default: "" },
    template: { default: undefined },
    fieldKey: { type: String, default: "" },
    fieldOptions: { type: Object, default: () => ({}) },
    fieldPath: { type: String, default: "" },
});

const selectOptions = computed(() => props.fieldOptions[props.fieldPath]);

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const displayLabel = computed(() => props.label || t("dataset"));

const emit = defineEmits(["update:modelValue"]);

const isColor = computed(
    () =>
        typeof props.modelValue === "string" &&
        /colors?$|^(fill|stroke)$/i.test(props.fieldKey || props.label),
);

const complex = computed(
    () => props.modelValue !== null && typeof props.modelValue === "object",
);

const array = computed(() => Array.isArray(props.modelValue));

function update(key, value) {
    const next = array.value ? [...props.modelValue] : { ...props.modelValue };
    next[key] = value;
    emit("update:modelValue", next);
}

function add() {
    const example = props.modelValue.at(-1) ?? props.template?.[0] ?? 0;
    emit("update:modelValue", [
        ...props.modelValue,
        JSON.parse(JSON.stringify(example)),
    ]);
}

function remove(index) {
    emit(
        "update:modelValue",
        props.modelValue.filter((_, i) => i !== index),
    );
}
</script>

<template>
    <details v-if="complex" class="data-group">
        <summary>
            {{ displayLabel }}
            <span class="muted">{{
                array ? t("items", { count: modelValue.length }) : ""
            }}</span>
        </summary>
        <div class="data-children">
            <div
                v-for="(value, key) in modelValue"
                :key="key"
                class="data-entry"
            >
                <DataField
                    :label="
                        array
                            ? t('item', { number: Number(key) + 1 })
                            : String(key)
                    "
                    :field-key="array ? fieldKey || label : String(key)"
                    :field-options="fieldOptions"
                    :field-path="
                        [fieldPath, array ? '*' : String(key)]
                            .filter(Boolean)
                            .join('.')
                    "
                    :model-value="value"
                    :template="template?.[key] ?? template?.[0]"
                    @update:model-value="update(key, $event)"
                />
                <button
                    v-if="array"
                    class="remove-item"
                    :aria-label="t('removeItem', { number: Number(key) + 1 })"
                    @click="remove(key)"
                >
                    ×
                </button>
            </div>
            <button v-if="array" class="builder-button" @click="add">
                {{ t("addItem") }}
            </button>
        </div>
    </details>
    <label v-else class="data-leaf">
        <span>{{ displayLabel }}</span>
        <select v-if="selectOptions" v-model="selectedValue">
            <option
                v-if="!selectOptions.includes(modelValue)"
                :value="modelValue"
            >
                {{ modelValue }}
            </option>
            <option
                v-for="option in selectOptions"
                :key="option"
                :value="option"
            >
                {{ option }}
            </option>
        </select>
        <input
            v-else-if="isColor"
            type="color"
            :value="convertColorToHex(modelValue)?.slice(0, 7) || '#000000'"
            @input="emit('update:modelValue', $event.target.value)"
        />
        <input
            v-else-if="typeof modelValue === 'boolean'"
            type="checkbox"
            :checked="modelValue"
            @change="emit('update:modelValue', $event.target.checked)"
        />
        <input
            v-else
            :type="typeof modelValue === 'number' ? 'number' : 'text'"
            :value="modelValue"
            step="any"
            @input="
                emit(
                    'update:modelValue',
                    typeof modelValue === 'number'
                        ? $event.target.value === ''
                            ? 0
                            : Number($event.target.value)
                        : $event.target.value,
                )
            "
        />
    </label>
</template>
