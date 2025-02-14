<script setup>
// This is a wonky prototype

import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const wrapper = ref(null);
const mainContainer = ref(null);
const mainContainerSize = ref(null);

// PROPS
const items = ref([
    { x: 0, y: 0, w: 10, h: 10, id: 'A', component: 'VueUiWaffle', dataset: [{ name: 'S1', values: [10] }, { name: 'S2', values: [20] }, { name: 'S3', values: [30] }] },
    { x: 0, y: 11, w: 1, h: 1, id: 'B' },
]);

// Grid cfg
const gridUnit = ref(20);  // CONFIG number of columns
const gridHeight = ref(20); // CONFIG number of rows. TODO: add button (and slot providing action) to add rows

const pixelSize = computed(() => {
    if (!mainContainer.value) return 1;
    return mainContainerSize.value.width / gridUnit.value;
});

const sizedItems = computed(() => {
    return items.value.map(item => ({
        ...item,
        current: {
            left: `${item.x * pixelSize.value}px`,
            top: `${item.y * pixelSize.value}px`,
            width: `${item.w * pixelSize.value}px`,
            height: `${item.h * pixelSize.value}px`
        }
    }));
});

const grid = computed(() => {
    const units = [];
    for (let i = 0; i < gridUnit.value; i++) {
        for (let j = 0; j < gridHeight.value; j++) {
            units.push({
                x: i,
                y: j,
                id: `unit_${i}_${j}`,
                left: i * pixelSize.value,
                top: j * pixelSize.value
            });
        }
    }
    return units;
});


function setMainContainerClientRect(domRect) {
    mainContainerSize.value = domRect;
}

const activeUnit = ref(null);
function computeActiveUnit(e) {
    if (!mainContainer.value) return;
    const rect = mainContainer.value.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize.value);
    const y = Math.floor((e.clientY - rect.top) / pixelSize.value);
    activeUnit.value = { x, y, left: x * pixelSize.value, top: y * pixelSize.value };
}

// Drag
const selectedItem = ref(null);
function startDrag(item, e) {
    e.preventDefault();
    e.stopPropagation();
    selectedItem.value = item;
    document.addEventListener("mousemove", onDocMouseMove);
    document.addEventListener("mouseup", onDocMouseUp);
}

// Resize
const resizingItem = ref(null);
const resizeDirection = ref(null);
function startResize(item, direction, e) {
    e.preventDefault();
    e.stopPropagation();
    resizingItem.value = item;
    resizeDirection.value = direction;
    document.addEventListener("mousemove", onDocMouseMove);
    document.addEventListener("mouseup", onDocMouseUp);
}

const candidateRect = ref(null);
function updateCandidateRect(e) {
    computeActiveUnit(e);
    if (!activeUnit.value) {
        candidateRect.value = null;
        return;
    }
    if (selectedItem.value) {
        // Drag mode
        candidateRect.value = {
            x: activeUnit.value.x,
            y: activeUnit.value.y,
            w: selectedItem.value.w,
            h: selectedItem.value.h
        };
    } else if (resizingItem.value) {
        // Resize mode
        const item = resizingItem.value;
        if (resizeDirection.value === "bottom-right") {
            candidateRect.value = {
                x: item.x,
                y: item.y,
                w: Math.max(1, activeUnit.value.x - item.x + 1),
                h: Math.max(1, activeUnit.value.y - item.y + 1)
            };
        } else if (resizeDirection.value === "top-left") {
            candidateRect.value = {
                x: activeUnit.value.x,
                y: activeUnit.value.y,
                w: Math.max(1, (item.x + item.w) - activeUnit.value.x),
                h: Math.max(1, (item.y + item.h) - activeUnit.value.y)
            };
        } else if (resizeDirection.value === "top-right") {
            candidateRect.value = {
                x: item.x,
                y: activeUnit.value.y,
                w: Math.max(1, activeUnit.value.x - item.x + 1),
                h: Math.max(1, (item.y + item.h) - activeUnit.value.y)
            };
        } else if (resizeDirection.value === "bottom-left") {
            candidateRect.value = {
                x: activeUnit.value.x,
                y: item.y,
                w: Math.max(1, (item.x + item.w) - activeUnit.value.x),
                h: Math.max(1, activeUnit.value.y - item.y + 1)
            };
        }
    } else {
        candidateRect.value = null;
    }
}

function onDocMouseMove(e) {
    updateCandidateRect(e);
}

function canPlaceItem(candidate, ignoreId) {
    // Check grid boundaries
    if (
        candidate.x < 0 ||
        candidate.y < 0 ||
        candidate.x + candidate.w > gridUnit.value ||
        candidate.y + candidate.h > gridHeight.value
    ) {
        return false;
    }
    // Check for overlap
    for (const item of items.value) {
        if (item.id === ignoreId) continue;
        if (
            candidate.x < item.x + item.w &&
            candidate.x + candidate.w > item.x &&
            candidate.y < item.y + item.h &&
            candidate.y + candidate.h > item.y
        ) {
            return false;
        }
    }
    return true;
}

function onDocMouseUp(e) {
    computeActiveUnit(e);
    if (activeUnit.value) {
        if (resizingItem.value) {
            // Resize mode.
            items.value = items.value.map(i => {
                if (i.id === resizingItem.value.id) {
                    let newX = i.x, newY = i.y, newW = i.w, newH = i.h;
                    if (resizeDirection.value === "bottom-right") {
                        newW = Math.max(1, activeUnit.value.x - i.x + 1);
                        newH = Math.max(1, activeUnit.value.y - i.y + 1);
                    } else if (resizeDirection.value === "top-left") {
                        newW = Math.max(1, (i.x + i.w) - activeUnit.value.x);
                        newH = Math.max(1, (i.y + i.h) - activeUnit.value.y);
                        newX = activeUnit.value.x;
                        newY = activeUnit.value.y;
                    } else if (resizeDirection.value === "top-right") {
                        newW = Math.max(1, activeUnit.value.x - i.x + 1);
                        newH = Math.max(1, (i.y + i.h) - activeUnit.value.y);
                        newY = activeUnit.value.y;
                    } else if (resizeDirection.value === "bottom-left") {
                        newW = Math.max(1, (i.x + i.w) - activeUnit.value.x);
                        newH = Math.max(1, activeUnit.value.y - i.y + 1);
                        newX = activeUnit.value.x;
                    }
                    const candidate = { x: newX, y: newY, w: newW, h: newH };
                    if (canPlaceItem(candidate, i.id)) {
                        return { ...i, x: newX, y: newY, w: newW, h: newH };
                    } else {
                        return i;
                    }
                }
                return i;
            });
        } else if (selectedItem.value) {
            // Drag mode.
            items.value = items.value.map(i => {
                if (i.id === selectedItem.value.id) {
                    const candidate = { x: activeUnit.value.x, y: activeUnit.value.y, w: i.w, h: i.h };
                    if (canPlaceItem(candidate, i.id)) {
                        return { ...i, x: activeUnit.value.x, y: activeUnit.value.y };
                    } else {
                        return i;
                    }
                }
                return i;
            });
        }
    }

    selectedItem.value = null;
    resizingItem.value = null;
    resizeDirection.value = null;
    activeUnit.value = null;
    candidateRect.value = null;
    document.removeEventListener("mousemove", onDocMouseMove);
    document.removeEventListener("mouseup", onDocMouseUp);
}

function onContainerMouseMove(e) {
    if (!selectedItem.value && !resizingItem.value) {
        computeActiveUnit(e);
    }
}

const candidateStyle = computed(() => {
    if (!candidateRect.value) return {};
    const style = {
        position: "absolute",
        left: candidateRect.value.x * pixelSize.value + "px",
        top: candidateRect.value.y * pixelSize.value + "px",
        width: candidateRect.value.w * pixelSize.value + "px",
        height: candidateRect.value.h * pixelSize.value + "px",
        pointerEvents: "none",
        border: "2px dashed #333",
        background: "rgba(0, 0, 0, 0.1)"
    };
    // When resizing, show the candidate rect above the item.
    if (resizingItem.value) {
        style.zIndex = 10000;
    } else {
        style.zIndex = 0;
    }
    return style;
});

const resizeObserver = ref(null);
onMounted(() => {
    if (mainContainer.value) {
        setMainContainerClientRect(mainContainer.value.getBoundingClientRect());
    }
    if (wrapper.value) {
        resizeObserver.value = new ResizeObserver((_entries) => {
            if (mainContainer.value) {
                setMainContainerClientRect(mainContainer.value.getBoundingClientRect());
            }
        });
        resizeObserver.value.observe(wrapper.value);
    }
});
onBeforeUnmount(() => {
    if (resizeObserver.value) resizeObserver.value.disconnect();
});
</script>

<template>
    <div class="debug">
        Drag: {{ selectedItem ? selectedItem.id : 'none' }},
        Resize: {{ resizingItem ? resizingItem.id : 'none' }},
        Active cell: {{ activeUnit ? activeUnit.x + ',' + activeUnit.y : 'none' }}
    </div>
    <div class="vue-ui-grid-wrapper" ref="wrapper">
        <div class="vue-ui-grid-main-container" ref="mainContainer" :style="{ height: `${pixelSize * gridHeight}px` }"
            @mousemove="onContainerMouseMove" @mouseleave="() => activeUnit = null">
            <!-- Grid units for visual feedback -->
            <div class="vue-ui-grid-unit" v-for="unit in grid" :key="unit.id" :style="{
                position: 'absolute',
                top: `${unit.top}px`,
                left: `${unit.left}px`,
                height: `${pixelSize}px`,
                width: `${pixelSize}px`
            }" :class="{ 'selected': activeUnit && activeUnit.x === unit.x && activeUnit.y === unit.y }"></div>

            <!-- Items -->
            <div class="vue-ui-grid-item" v-for="item in sizedItems" :key="item.id" :style="{
                position: 'absolute',
                top: item.current.top,
                left: item.current.left,
                width: item.current.width,
                height: item.current.height
            }">
                <!-- Drag handle -->
                <div class="vue-ui-grid-handle" @mousedown="(e) => startDrag(item, e)" />
                <!-- Resize handles (black squares) -->
                <div v-for="handle in ['top-left', 'top-right', 'bottom-left', 'bottom-right']" :key="handle"
                    class="vue-ui-grid-resize-handle" :class="handle"
                    @mousedown="(e) => startResize(item, handle, e)" />
                <div :style="{ width: '100%', height: '100%', padding: '1rem' }">
                    <slot name="item" v-bind="{ item }" />
                </div>
            </div>

            <div v-if="candidateRect" class="candidate-rect" :style="candidateStyle"></div>
        </div>
    </div>
</template>

<style scoped>
.debug {
    height: 200px;
    color: green;
    margin-bottom: 10px;
}

.vue-ui-grid-wrapper {
    width: 100%;
}

.vue-ui-grid-main-container {
    width: 100%;
    position: relative;
    outline: 1px solid blue;
    user-select: none;
}

/* Candidate rectangle for visual feedback */
.candidate-rect {
    pointer-events: none;
    border: 2px dashed #333;
    background: rgba(0, 0, 0, 0.1);
    z-index: 10000;
}

/* Grid units (for visual feedback) */
.vue-ui-grid-unit {
    outline: 0.1px solid #4A4A4A;
    position: absolute;
}

.vue-ui-grid-unit.selected {
    background: rgba(255, 0, 0, 0.3);
}

.vue-ui-grid-item {
    background: cornflowerblue;
    outline: 1px solid red;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.05s ease-in-out;
}

/* Drag handle (red) */
.vue-ui-grid-handle {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background: red;
    cursor: move;
}

/* Resize handles (black) */
.vue-ui-grid-item:hover .vue-ui-grid-resize-handle {
    display: block;
}

.vue-ui-grid-item:hover {
    z-index: 9999;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
}

.vue-ui-grid-resize-handle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: black;
    display: none;
}

.vue-ui-grid-resize-handle.top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
}

.vue-ui-grid-resize-handle.top-right {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
}

.vue-ui-grid-resize-handle.bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
}

.vue-ui-grid-resize-handle.bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
}
</style>
