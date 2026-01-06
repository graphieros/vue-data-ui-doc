<script setup>
import { ref, computed, onMounted, watch, shallowRef, nextTick } from "vue";
import { useMainStore } from "../../stores";

const props = defineProps({
    config: {
        type: Object,
        default() {
            return {}
        }
    }
})

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

/**
 * Converts any JS object into a DAG dataset where:
 * - each key becomes a node
 * - edges connect parent key -> child key
 * - each node stores its original value in node.value
 *
 * Node ids are path-based to avoid collisions (same key in different branches).
 *
 * @param {any} input
 * @param {object} [options]
 * @param {string} [options.rootId="root"]
 * @param {string} [options.rootLabel="root"]
 * @param {boolean} [options.includeRootNode=true]
 * @param {boolean} [options.createArrayIndexNodes=true]
 * @param {number} [options.maxValuePreviewLength=120]
 * @returns {VueUiDagDataset}
 */
function objectToDag(input, options) {
    const {
        rootId = "root",
        rootLabel = "root",
        includeRootNode = true,
        createArrayIndexNodes = true,
        maxValuePreviewLength = 120,
    } = options || {};

    /** @type {Map<string, VueUiDagNode>} */
    const nodesById = new Map();

    /** @type {Set<string>} */
    const edgesByKey = new Set();

    /**
     * @param {VueUiDagNode} node
     */
    const addNode = (node) => {
        if (!node || typeof node.id !== "string" || !node.id) {
            throw new Error("objectToDag: node.id must be a non-empty string.");
        }
        if (typeof node.label !== "string" || !node.label) {
            node.label = node.id;
        }
        nodesById.set(node.id, node);
    };

    /**
     * @param {string} from
     * @param {string} to
     */
    const addEdge = (from, to) => {
        const k = `${from}→${to}`;
        if (edgesByKey.has(k)) return;
        edgesByKey.add(k);
    };

    /**
     * @param {any} v
     */
    const isPlainObject = (v) => {
        if (v === null) return false;
        if (typeof v !== "object") return false;
        if (Array.isArray(v)) return false;
        const proto = Object.getPrototypeOf(v);
        return proto === Object.prototype || proto === null;
    };

    /**
     * @param {any} v
     */
    const previewValue = (v) => {
        if (typeof v === "string") {
            const s = v.length > maxValuePreviewLength ? `${v.slice(0, maxValuePreviewLength)}…` : v;
            return `"${s}"`;
        }
        if (typeof v === "number" || typeof v === "boolean") return String(v);
        if (v === null) return "null";
        if (v === undefined) return "undefined";
        if (typeof v === "function") return "function";
        if (Array.isArray(v)) return `Array(${v.length})`;
        if (v instanceof Date) return `Date(${isNaN(v.getTime()) ? "Invalid" : v.toISOString()})`;
        if (v instanceof RegExp) return `RegExp(${String(v)})`;
        if (typeof v === "object") return "Object";
        return String(v);
    };

    const pathId = (parentPath, key) => (parentPath ? `${parentPath}.${key}` : String(key));

    const buildArray = (arr, parentNodeId, parentPath, depth) => {
        for (let i = 0; i < arr.length; i += 1) {
            const key = `[${i}]`;
            const childPath = parentPath ? `${parentPath}${key}` : key;
            const childValue = arr[i];

            addNode({
                id: childPath,
                label: key,
                value: childValue,
                valuePreview: previewValue(childValue),
                key,
                path: childPath,
                depth,
                kind: Array.isArray(childValue)
                    ? "array"
                    : isPlainObject(childValue)
                        ? "object"
                        : childValue === null
                            ? "null"
                            : typeof childValue,
            });

            if (parentNodeId) addEdge(parentNodeId, childPath);

            if (isPlainObject(childValue)) {
                build(childValue, childPath, childPath, depth + 1);
            } else if (Array.isArray(childValue) && createArrayIndexNodes) {
                buildArray(childValue, childPath, childPath, depth + 1);
            }
        }
    };

    const build = (value, parentNodeId, parentPath, depth) => {
        if (isPlainObject(value)) {
            for (const key of Object.keys(value)) {
                const childPath = pathId(parentPath, key);
                const childValue = value[key];

                addNode({
                    id: childPath,
                    label: String(key),
                    value: childValue,
                    valuePreview: previewValue(childValue),
                    key: String(key),
                    path: childPath,
                    depth,
                    kind: Array.isArray(childValue)
                        ? "array"
                        : isPlainObject(childValue)
                            ? "object"
                            : childValue === null
                                ? "null"
                                : typeof childValue,
                });

                if (parentNodeId) addEdge(parentNodeId, childPath);

                if (isPlainObject(childValue)) {
                    build(childValue, childPath, childPath, depth + 1);
                } else if (Array.isArray(childValue) && createArrayIndexNodes) {
                    buildArray(childValue, childPath, childPath, depth + 1);
                }
            }
            return;
        }

        if (Array.isArray(value) && createArrayIndexNodes) {
            buildArray(value, parentNodeId, parentPath, depth);
        }
    };

    if (includeRootNode) {
        addNode({
            id: rootId,
            label: rootLabel,
            value: input,
            valuePreview: previewValue(input),
            key: rootLabel,
            path: rootId,
            depth: 0,
            kind: Array.isArray(input) ? "array" : isPlainObject(input) ? "object" : typeof input,
            isRoot: true,
        });
        build(input, rootId, "", 1);
    } else {
        build(input, "", "", 0);
    }

    /** @type {VueUiDagNode[]} */
    const nodes = Array.from(nodesById.values());

    /** @type {VueUiDagEdge[]} */
    const edges = Array.from(edgesByKey).map((k) => {
        const parts = k.split("→");
        return { from: parts[0], to: parts[1] };
    });

    return { nodes, edges };
}

const datasetDag = shallowRef(null);
const ready = ref(false);
const step = ref(0);

watch(
    () => props.config,
    async (cfg) => {
        ready.value = false;

        const nextDataset = objectToDag(cfg);

        datasetDag.value = nextDataset;

        await nextTick();
        await nextTick();
        await nextTick();
        await nextTick();

        step.value += 1;
        ready.value = true;
    },
    { immediate: true, deep: true, flush: "post" }
);


const cfg = computed(() => {
    return {
        theme: isDarkMode.value ? 'dark' : '',
        style: {
            fontFamily: 'Courier New',
            chart: {
                layout: {
                    rankSeparation: 100,
                    nodeSeparation: 20,
                    edgeSeparation: 20,
                    nodeWidth: 150, 
                    nodeHeight: 28,
                    rankDirection: 'LR'
                },
                nodes: {
                    backgroundColor: isDarkMode.value ? '#2A2A2A' : undefined,
                    tooltip: {
                        showOnClick: true,
                    }
                },
                edges: {
                    strokeWidth: 2
                },
                midpoints: {
                    show: true,
                    radius: 8
                },
                controls: {
                    position: 'top'
                }
            }
        }
    }
})

</script>

<template>
    <div class="border border-[#6A6A6A] p-2 bg-white dark:bg-[#1A1A1A]">
        <VueUiDag v-if="ready" :dataset="datasetDag" :config="cfg" :key="step" />
    </div>
</template>