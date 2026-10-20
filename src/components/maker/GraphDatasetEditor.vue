<script setup>
import { computed, ref, watch, useId } from "vue";
import { PlusIcon, XIcon, LinkIcon, ArrowRightIcon } from "vue-tabler-icons";
import { convertColorToHex } from "../../useNestedProp";
import { RefreshDotIcon } from "vue-tabler-icons";
import { getPalette } from "vue-data-ui/utils";
import { graphTranslations } from "../../translations/graph.js";
import { useMainStore } from "../../stores";
import {
    addGraphNode,
    removeGraphNode,
    canAddGraphLink,
    addGraphLink,
} from "./graphDatasetEditor.js";
import BaseCard from "../BaseCard.vue";

const props = defineProps({
    dataset: { type: Object, required: true },
    defaultColor: { type: String, default: "#42A5F5" },
    palette: { type: Array, default: () => [] },
    colorByGroup: { type: Boolean, default: true },
});
const emit = defineEmits(["groupColor"]);
const store = useMainStore();
const text = computed(
    () => graphTranslations[store.lang] || graphTranslations.en,
);
const tab = ref("nodes");
const search = ref("");
const newLabel = ref("");
const newGroup = ref("");
const source = ref(null);
const target = ref(null);
const directed = ref(false);
const groupListId = useId();
function navigateTabs(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index =
        event.key === "Home"
            ? 0
            : event.key === "End"
              ? 1
              : tab.value === "nodes"
                ? 1
                : 0;
    tab.value = index === 0 ? "nodes" : "links";
    event.currentTarget.parentElement
        .querySelectorAll('[role="tab"]')
        [index].focus();
}
const groups = computed(() => [
    ...new Set(
        props.dataset.nodes
            .map((node) => node.group)
            .filter((group) => group !== undefined && group !== null),
    ),
]);
const visibleNodes = computed(() => {
    const query = search.value.trim().toLocaleLowerCase();
    return props.dataset.nodes.filter((node) =>
        [node.label, node.group, node.id].some((value) =>
            String(value ?? "")
                .toLocaleLowerCase()
                .includes(query),
        ),
    );
});
const targets = computed(() =>
    props.dataset.nodes.filter((node) =>
        canAddGraphLink(props.dataset, source.value, node.id, directed.value),
    ),
);
watch(
    () => props.dataset.nodes.map((node) => node.id),
    (ids) => {
        if (!ids.includes(source.value)) source.value = ids[0] ?? null;
    },
    { immediate: true },
);
watch(
    targets,
    (nodes) => {
        if (!nodes.some((node) => node.id === target.value))
            target.value = nodes[0]?.id ?? null;
    },
    { immediate: true },
);
const canAddLink = computed(() =>
    canAddGraphLink(props.dataset, source.value, target.value, directed.value),
);
const allGroups = computed(() => [
    ...new Set(props.dataset.nodes.map((node) => node.group)),
]);
const effectivePalette = computed(() =>
    props.palette?.length ? props.palette : getPalette("default"),
);
const groupColor = (group) =>
    effectivePalette.value[
        allGroups.value.indexOf(group) % effectivePalette.value.length
    ] || props.defaultColor;
const colorHex = (color) => (convertColorToHex(color) || "#42A5F5").slice(0, 7);
const nodeColor = (node) =>
    colorHex(
        node.color ||
            (props.colorByGroup ? groupColor(node.group) : props.defaultColor),
    );
const nodeName = (id) =>
    props.dataset.nodes.find((node) => node.id === id)?.label || String(id);
function addNode() {
    addGraphNode(props.dataset, {
        label: newLabel.value,
        group: newGroup.value,
        nodeLabel: text.value.node,
    });
    newLabel.value = "";
    search.value = "";
}
function linkNode(node) {
    source.value = node.id;
    tab.value = "links";
}
function changeDirected(link, value) {
    if (canAddGraphLink(props.dataset, link.source, link.target, value, link))
        link.directed = value;
}
</script>

<template>
    <BaseCard class="w-fit">
        <div
            class="graph-dataset-editor max-w-[760px] rounded-xl border border-gray-300 dark:border-[#4A4A4A] overflow-hidden"
        >
            <div
                role="tablist"
                :aria-label="text.dataset"
                class="flex border-b border-gray-300 dark:border-[#4A4A4A] bg-gray-100 dark:bg-[#242424]"
            >
                <button
                    v-for="name in ['nodes', 'links']"
                    :key="name"
                    type="button"
                    role="tab"
                    :id="`${groupListId}-tab-${name}`"
                    :aria-controls="`${groupListId}-panel-${name}`"
                    :tabindex="tab === name ? 0 : -1"
                    @keydown="navigateTabs"
                    :aria-selected="tab === name"
                    :class="[
                        'px-4 py-3 text-sm font-inter-medium border-b-2',
                        tab === name
                            ? 'border-app-blue text-app-blue'
                            : 'border-transparent text-gray-500',
                    ]"
                    @click="tab = name"
                >
                    {{ text[name] }}
                    <span class="ml-1 text-xs tabular-nums">{{
                        dataset[name].length
                    }}</span>
                </button>
            </div>
            <div
                v-if="tab === 'nodes'"
                class="p-3"
                role="tabpanel"
                :id="`${groupListId}-panel-nodes`"
                :aria-labelledby="`${groupListId}-tab-nodes`"
            >
                <form
                    class="flex flex-wrap gap-2 items-center mb-3"
                    @submit.prevent="addNode"
                >
                    <input
                        v-model="newLabel"
                        :aria-label="text.label"
                        :placeholder="text.label"
                        class="w-40 max-w-full"
                    />
                    <input
                        v-model="newGroup"
                        :list="groupListId"
                        :aria-label="text.group"
                        :placeholder="text.group"
                        class="w-28"
                    />
                    <button class="editor-add" type="submit">
                        <PlusIcon :size="16" />{{ text.addNode }}
                    </button>
                </form>
                <datalist :id="groupListId">
                    <option
                        v-for="group in groups"
                        :key="group"
                        :value="group"
                    />
                </datalist>
                <div
                    v-if="groups.length"
                    class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-xs"
                >
                    <span class="text-gray-500">{{ text.group }}</span>
                    <label
                        v-for="group in groups"
                        :key="group"
                        class="flex items-center gap-1"
                    >
                        <input
                            type="color"
                            class="node-color"
                            :value="colorHex(groupColor(group))"
                            :aria-label="`${text.group}: ${group} · ${text.color}`"
                            @input="
                                emit('groupColor', {
                                    group,
                                    color: $event.target.value,
                                })
                            "
                        />
                        {{ group }}
                    </label>
                </div>
                <input
                    v-model="search"
                    type="search"
                    :aria-label="text.searchNodes"
                    :placeholder="text.searchNodes"
                    class="w-64 max-w-full mb-2"
                />
                <div
                    class="max-h-[360px] overflow-auto divide-y divide-gray-200 dark:divide-[#3A3A3A]"
                >
                    <div
                        v-for="node in visibleNodes"
                        :key="node.id"
                        class="py-1"
                    >
                        <div class="flex items-center gap-1.5 min-w-[430px]">
                            <input
                                v-model="node.label"
                                :aria-label="text.label"
                                class="w-36 min-w-0"
                            />
                            <input
                                type="color"
                                class="node-color"
                                :value="nodeColor(node)"
                                :aria-label="text.editColor"
                                :title="text.editColor"
                                @input="node.color = $event.target.value"
                            />
                            <button
                                type="button"
                                class="editor-icon"
                                :disabled="!node.color"
                                :aria-label="text.automatic"
                                :title="text.automatic"
                                @click="delete node.color"
                            >
                                <RefreshDotIcon :size="14" />
                            </button>
                            <input
                                v-model="node.group"
                                :list="groupListId"
                                :aria-label="text.group"
                                class="w-24 min-w-0"
                                :placeholder="text.group"
                            />
                            <input
                                v-model.number="node.value"
                                type="number"
                                min="0"
                                :aria-label="text.value"
                                :title="text.value"
                                class="w-16"
                            />
                            <button
                                type="button"
                                class="editor-icon"
                                :aria-label="text.linkNode"
                                :title="text.linkNode"
                                @click="linkNode(node)"
                            >
                                <LinkIcon :size="16" />
                            </button>
                            <button
                                type="button"
                                class="editor-icon text-red-500"
                                :aria-label="text.removeNode"
                                :title="text.removeNode"
                                @click="removeGraphNode(dataset, node.id)"
                            >
                                <XIcon :size="16" />
                            </button>
                        </div>
                    </div>
                    <p
                        v-if="!visibleNodes.length"
                        class="text-sm text-gray-500 py-4 text-center"
                    >
                        {{
                            dataset.nodes.length
                                ? text.noMatchingNodes
                                : text.noNodes
                        }}
                    </p>
                </div>
            </div>
            <div
                v-else
                class="p-3"
                role="tabpanel"
                :id="`${groupListId}-panel-links`"
                :aria-labelledby="`${groupListId}-tab-links`"
            >
                <form
                    class="flex flex-wrap items-end gap-2 mb-3"
                    @submit.prevent="
                        addGraphLink(dataset, source, target, directed)
                    "
                >
                    <label class="w-40 max-w-full text-xs"
                        >{{ text.source
                        }}<select
                            v-model="source"
                            class="block w-full mt-1"
                            :disabled="!dataset.nodes.length"
                        >
                            <option
                                v-for="node in dataset.nodes"
                                :key="node.id"
                                :value="node.id"
                            >
                                {{ node.label || node.id }}
                            </option>
                        </select></label
                    >
                    <ArrowRightIcon :size="16" class="mb-1.5 shrink-0" />
                    <label class="w-40 max-w-full text-xs"
                        >{{ text.target
                        }}<select
                            v-model="target"
                            class="block w-full mt-1"
                            :disabled="!targets.length"
                        >
                            <option
                                v-for="node in targets"
                                :key="node.id"
                                :value="node.id"
                            >
                                {{ node.label || node.id }}
                            </option>
                        </select></label
                    >
                    <label class="flex items-center gap-1 text-xs"
                        ><input v-model="directed" type="checkbox" />{{
                            text.directed
                        }}</label
                    >
                    <button
                        type="submit"
                        class="editor-add"
                        :disabled="!canAddLink"
                    >
                        <PlusIcon :size="16" />{{ text.addLink }}
                    </button>
                </form>
                <p class="text-xs text-gray-500 mb-2">
                    {{
                        dataset.nodes.length < 2
                            ? text.needTwoNodes
                            : !targets.length
                              ? text.noAvailableTargets
                              : text.linkHelp
                    }}
                </p>
                <div
                    class="max-h-[360px] overflow-y-auto divide-y divide-gray-200 dark:divide-[#3A3A3A]"
                >
                    <div
                        v-for="(link, index) in dataset.links"
                        :key="index"
                        class="flex items-center gap-2 py-1 text-sm"
                    >
                        <span
                            class="w-36 min-w-0 truncate"
                            :title="nodeName(link.source)"
                            >{{ nodeName(link.source) }}</span
                        >
                        <span class="text-gray-400">{{
                            link.directed ? "→" : "—"
                        }}</span>
                        <span
                            class="w-36 min-w-0 truncate"
                            :title="nodeName(link.target)"
                            >{{ nodeName(link.target) }}</span
                        >
                        <input
                            v-model.number="link.value"
                            type="number"
                            min="0"
                            :aria-label="text.value"
                            :title="text.value"
                            class="w-16"
                        />
                        <label class="flex gap-1 items-center text-xs"
                            ><input
                                type="checkbox"
                                :checked="link.directed"
                                :disabled="
                                    !canAddGraphLink(
                                        dataset,
                                        link.source,
                                        link.target,
                                        !link.directed,
                                        link,
                                    )
                                "
                                @change="
                                    changeDirected(link, $event.target.checked)
                                "
                            />{{ text.directed }}</label
                        >
                        <button
                            type="button"
                            class="editor-icon text-red-500"
                            :aria-label="text.removeLink"
                            :title="text.removeLink"
                            @click="dataset.links.splice(index, 1)"
                        >
                            <XIcon :size="16" />
                        </button>
                    </div>
                    <p
                        v-if="!dataset.links.length"
                        class="text-sm text-gray-500 py-4 text-center"
                    >
                        {{ text.noLinks }}
                    </p>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<style scoped>
input:not([type="checkbox"]):not([type="color"]),
select {
    border: 1px solid #88888850;
    border-radius: 6px;
    padding: 3px 6px;
    font-size: 12px;
    height: 28px;
}
.editor-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 6px;
}
.editor-icon:hover {
    background: #88888820;
}
.editor-add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 10px;
    border-radius: 6px;
    background: #3456a3;
    color: white;
    font-size: 12px;
    min-height: 28px;
}
.editor-add:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
.node-color {
    width: 24px;
    height: 24px;
    padding: 1px;
    border: 1px solid #88888850;
    border-radius: 5px;
    background: transparent;
    flex-shrink: 0;
    cursor: pointer;
}
.node-color::-webkit-color-swatch-wrapper {
    padding: 0;
}
.node-color::-webkit-color-swatch {
    border: 0;
    border-radius: 3px;
}
.node-color::-moz-color-swatch {
    border: 0;
    border-radius: 3px;
}
.editor-icon:disabled {
    opacity: 0.3;
    cursor: default;
}
</style>
