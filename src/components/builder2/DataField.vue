<script setup>
import { useBuilderTranslations } from "./translations";
import { computed, useId } from "vue";
import { convertColorToHex } from "../../useNestedProp";
import { addTreemapChild, updateTreemapNode } from "./dataset.js";

const t = useBuilderTranslations();

const props = defineProps({
    modelValue: { default: null },
    label: { type: String, default: "" },
    template: { default: undefined },
    fieldKey: { type: String, default: "" },
    fieldOptions: { type: Object, default: () => ({}) },
    fieldPath: { type: String, default: "" },
    treemap: { type: Boolean, default: false },
    dumbbell: { type: Boolean, default: false },
    parentColor: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    descriptionId: { type: String, default: undefined },
    removable: { type: Boolean, default: false },
    removeLabel: { type: String, default: "" },
});

const valueHelpId = useId();

const selectOptions = computed(() => props.fieldOptions[props.fieldPath]);

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const displayLabel = computed(() => props.label || t("dataset"));

const emit = defineEmits(["update:modelValue", "remove"]);

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
    if (props.treemap && !array.value) {
        emit(
            "update:modelValue",
            updateTreemapNode(props.modelValue, key, value),
        );
        return;
    }
    const next = array.value ? [...props.modelValue] : { ...props.modelValue };
    next[key] = value;
    emit("update:modelValue", next);
}

function add() {
    if (props.treemap && props.fieldKey === "children") {
        emit("update:modelValue", [
            ...props.modelValue,
            {
                name: "Child name",
                value: 0,
                color: props.parentColor || "#1f77b4",
                __inheritColor: true,
            },
        ]);
        return;
    }
    const example = props.modelValue.at(-1) ?? props.template?.[0] ?? 0;
    const item = JSON.parse(JSON.stringify(example));
    if (
        (props.treemap || props.dumbbell) &&
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        "name" in item
    ) {
        item.name = "Name";
    }
    emit("update:modelValue", [...props.modelValue, item]);
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
            <template
                v-if="
                    treemap &&
                    !array &&
                    typeof modelValue.name === 'string' &&
                    modelValue.color
                "
            >
                <span
                    class="item-color-marker"
                    :style="{
                        backgroundColor: modelValue.__inheritColor
                            ? parentColor
                            : modelValue.color,
                    }"
                    aria-hidden="true"
                ></span>
                <span class="item-name">{{ modelValue.name }}</span>
            </template>
            <span class="muted">{{
                array ? t("items", { count: modelValue.length }) : ""
            }}</span>
            <button
                v-if="removable"
                type="button"
                class="item-header-remove"
                :aria-label="removeLabel"
                @click.stop.prevent="emit('remove')"
            >
                ×
            </button>
        </summary>
        <div class="data-children">
            <div
                v-for="(value, key) in modelValue"
                :key="key"
                v-show="
                    key !== '__inheritColor' &&
                    !(
                        treemap &&
                        key === 'children' &&
                        Array.isArray(value) &&
                        !value.length
                    )
                "
                class="data-entry"
                :class="{
                    'treemap-item-entry':
                        treemap && array && value && typeof value === 'object',
                    'data-color-inherit':
                        treemap &&
                        key === 'color' &&
                        Object.hasOwn(modelValue, '__inheritColor'),
                    'data-locked-value':
                        treemap &&
                        key === 'value' &&
                        Array.isArray(modelValue.children) &&
                        modelValue.children.length > 0,
                }"
            >
                <DataField
                    :label="
                        array
                            ? t('item', { number: Number(key) + 1 })
                            : String(key)
                    "
                    :field-key="array ? fieldKey || label : String(key)"
                    :field-options="fieldOptions"
                    :treemap="treemap"
                    :dumbbell="dumbbell"
                    :removable="
                        treemap && array && value && typeof value === 'object'
                    "
                    :remove-label="t('removeItem', { number: Number(key) + 1 })"
                    @remove="remove(key)"
                    :parent-color="
                        !array && modelValue.color
                            ? modelValue.__inheritColor
                                ? parentColor
                                : modelValue.color
                            : parentColor
                    "
                    :disabled="
                        treemap &&
                        ((key === 'color' &&
                            modelValue.__inheritColor === true) ||
                            (key === 'value' &&
                                Array.isArray(modelValue.children) &&
                                modelValue.children.length > 0))
                    "
                    :description-id="
                        treemap &&
                        key === 'value' &&
                        Array.isArray(modelValue.children) &&
                        modelValue.children.length > 0
                            ? valueHelpId
                            : undefined
                    "
                    :field-path="
                        [fieldPath, array ? '*' : String(key)]
                            .filter(Boolean)
                            .join('.')
                    "
                    :model-value="
                        treemap && key === 'color' && modelValue.__inheritColor
                            ? parentColor
                            : value
                    "
                    :template="template?.[key] ?? template?.[0]"
                    @update:model-value="update(key, $event)"
                />
                <template
                    v-if="
                        treemap &&
                        key === 'value' &&
                        Array.isArray(modelValue.children) &&
                        modelValue.children.length > 0
                    "
                >
                    <svg
                        class="value-lock"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="4" y="10" width="16" height="11" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                    <p :id="valueHelpId" class="value-lock-help">
                        {{ t("treemapValueLocked") }}
                    </p>
                </template>
                <label
                    v-if="
                        treemap &&
                        key === 'color' &&
                        Object.hasOwn(modelValue, '__inheritColor')
                    "
                    class="inherit-toggle"
                >
                    <span>{{ t("inherit") }}</span>
                    <input
                        type="checkbox"
                        :checked="modelValue.__inheritColor"
                        @change="
                            update('__inheritColor', $event.target.checked)
                        "
                    />
                </label>
                <button
                    v-if="
                        array &&
                        !(treemap && value && typeof value === 'object')
                    "
                    class="remove-item"
                    :aria-label="t('removeItem', { number: Number(key) + 1 })"
                    @click="remove(key)"
                >
                    ×
                </button>
            </div>
            <button
                v-if="
                    treemap &&
                    !array &&
                    typeof modelValue.name === 'string' &&
                    (!Array.isArray(modelValue.children) ||
                        !modelValue.children.length)
                "
                type="button"
                class="builder-button"
                @click="
                    emit(
                        'update:modelValue',
                        addTreemapChild(
                            modelValue,
                            modelValue.__inheritColor
                                ? parentColor
                                : modelValue.color,
                        ),
                    )
                "
            >
                {{ t("addChild") }}
            </button>
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
            :disabled="disabled"
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
            :disabled="disabled"
            :aria-describedby="descriptionId"
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
