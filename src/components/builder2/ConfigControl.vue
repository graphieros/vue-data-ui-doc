<script setup>
import { useBuilderTranslations } from "./translations";
import { computed } from "vue";
import BaseColorInput from "../BaseColorInput.vue";
import BaseNumberInput from "../BaseNumberInput.vue";

const t = useBuilderTranslations();

const props = defineProps({
    knob: { type: Object, required: true },
    label: String,
    labelId: String,
});

const type = computed(() => {
    // A few existing models misspell checkbox. Preserve their boolean controls.
    if (["checkbox", "chekbox", "chexkbox"].includes(props.knob.type))
        return "checkbox";
    if (
        ["color", "number", "range", "select", "text", "string"].includes(
            props.knob.type,
        )
    )
        return props.knob.type;
    if (props.knob.def !== null && typeof props.knob.def === "object")
        return "json";
    if (typeof props.knob.def === "boolean") return "checkbox";
    return props.knob.type === "none" ? "none" : "text";
});

function setJson(event) {
    try {
        props.knob.def = JSON.parse(event.target.value);
        event.target.setCustomValidity("");
    } catch {
        event.target.setCustomValidity(t("invalidJson"));
        event.target.reportValidity();
    }
}
</script>

<template>
    <div
        class="config-control"
        :class="{ 'config-control-color': type === 'color' && !knob.old }"
    >
        <BaseColorInput
            v-if="type === 'color' && !knob.old"
            class="color-control"
            v-model:value="knob.def"
            :label="label"
            :label-id="labelId"
        />
        <input
            v-else-if="type === 'color'"
            v-model="knob.def"
            type="color"
            :aria-labelledby="labelId"
        />
        <BaseNumberInput
            v-else-if="type === 'number'"
            class="number-control"
            v-model:value="knob.def"
            :min="knob.min"
            :max="knob.max"
            :step="knob.step"
            :label-id="labelId"
        />
        <div v-else-if="type === 'range'" class="range-control">
            <output>{{ knob.def }}</output>
            <input
                v-model.number="knob.def"
                type="range"
                :min="knob.min"
                :max="knob.max"
                :step="knob.step"
                :aria-labelledby="labelId"
            />
        </div>
        <input
            v-else-if="type === 'checkbox'"
            v-model="knob.def"
            type="checkbox"
            :aria-labelledby="labelId"
        />
        <select
            v-else-if="type === 'select'"
            v-model="knob.def"
            :aria-labelledby="labelId"
        >
            <option
                v-for="option in knob.options"
                :key="String(option)"
                :value="option"
            >
                {{ option }}
            </option>
        </select>
        <textarea
            v-else-if="type === 'json'"
            :value="JSON.stringify(knob.def)"
            :aria-labelledby="labelId"
            @change="setJson"
        />
        <input
            v-else-if="type !== 'none'"
            v-model="knob.def"
            type="text"
            :aria-labelledby="labelId"
        />
    </div>
</template>
<style scoped>
.config-control {
    flex: 0 0 190px;
    min-width: 0;
    max-width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
:deep(.number-control .numinput) {
    box-sizing: border-box;
    height: 24px;
    min-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.config-control.config-control-color {
    flex: 0 0 auto;
    width: 340px;
    max-width: calc(100% - 84px);
    justify-content: flex-end;
}
:deep(.color-control),
:deep(.color-control > div) {
    width: 100%;
    max-width: 100%;
}
:deep(.color-control .color-picker) {
    flex-direction: row;
    gap: 8px;
    width: 100%;
}
:deep(.color-control .color-picker > div) {
    flex-shrink: 0;
}
:deep(.color-control .color-picker > input) {
    flex: 1 1 200px;
    min-width: 0;
    max-width: 100%;
}
.range-control {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}
.range-control output {
    font-size: 12px;
    min-width: 32px;
    text-align: right;
    font-variant-numeric: tabular-nums;
}
.range-control input {
    min-width: 0;
    width: 100%;
    accent-color: var(--accent);
}
select,
textarea,
input[type="text"] {
    width: 100%;
    background: var(--surface-soft);
    border: 1px solid var(--border);
    border-radius: 7px;
    padding: 9px 10px;
    color: var(--text);
    font-size: 13px;
}
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
}
@media (max-width: 760px) {
    .config-control {
        flex-basis: 48%;
    }
}
</style>
