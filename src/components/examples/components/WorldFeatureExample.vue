<script setup>
import { ref } from "vue";

const props = defineProps({
    dataset: { type: Object, required: true },
    config: { type: Object, required: true },
    points: { type: Array, default: () => [] },
    selectedCountries: { type: Array, default: () => [] },
    demo: { type: Object, required: true },
});

const chart = ref(null);
const selected = ref([...props.selectedCountries]);
const lastEvent = ref(null);

function recordEvent(name, payload) {
    lastEvent.value = { event: name, payload };
}
</script>

<template>
    <div>
        <div v-if="demo.actions" class="flex flex-wrap gap-2 mb-4">
            <button
                v-for="action in demo.actions"
                :key="action.label"
                type="button"
                class="px-3 py-2 rounded bg-gray-200 dark:bg-[#4A4A4A] hover:bg-gray-300 dark:hover:bg-[#5A5A5A]"
                @click="chart?.[action.method]?.(...(action.args || []))"
            >
                {{ action.label }}
            </button>
        </div>
        <VueUiWorld
            ref="chart"
            v-model:selectedCountries="selected"
            :config="config"
            :dataset="dataset"
            :points="points"
            @update:selectedCountries="
                recordEvent('update:selectedCountries', $event)
            "
            @selectPoint="recordEvent('selectPoint', $event)"
            @viewChange="recordEvent('viewChange', $event)"
        >
            <template v-if="demo.tooltip" #tooltip="{ kind, datapoint }">
                <div class="p-3">
                    <strong>{{ datapoint.name }}</strong>
                    <div>
                        {{ kind === "point" ? "Point marker" : "Country" }}
                    </div>
                    <div v-if="kind === 'country'">
                        {{ datapoint.code }} · {{ datapoint.valueStatus }}
                    </div>
                    <div>Value: {{ datapoint.value ?? "Missing" }}</div>
                    <div v-if="kind === 'point'">
                        {{ datapoint.coordinates.join(", ") }}
                    </div>
                </div>
            </template>
        </VueUiWorld>
        <p v-if="demo.selection" class="mt-3" aria-live="polite">
            Selected countries: {{ selected.join(", ") || "None" }}
        </p>
        <pre
            v-if="demo.events && lastEvent"
            class="mt-3 p-3 rounded bg-gray-200 dark:bg-[#242424] text-xs overflow-auto max-h-40"
            >{{ JSON.stringify(lastEvent, null, 2) }}</pre
        >
        <p v-else-if="demo.events" class="mt-3 text-sm">
            Click a marker, select a country or change the view to inspect the
            emitted event.
        </p>
    </div>
</template>
