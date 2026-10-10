<script setup>
import {
    ref,
    shallowRef,
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
} from "vue";
import { VueUiKpi, VueUiXyCanvas } from "vue-data-ui";
import { giftWrap } from "../components/maker/lib.js";
import "vue-data-ui/style.css";
import { useMainStore } from "../stores";
import { SkullIcon } from "vue-tabler-icons";
import BaseCard from "../components/BaseCard.vue";
import BaseDigit from "../components/Base/BaseDigit.vue";
import GameOfLifeScatter from "../components/special/GameOfLifeScatter.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const isRunning = ref(false);
const delay = ref(0);
const SIZE = ref(200);
const generations = ref(0);
const livingCount = ref(0);
const hasStalled = ref(false);
const canvasEl = ref(null);

// Keep the hot simulation state completely outside Vue's reactivity system.
// Vue only receives UI snapshots, not a new board on every iteration.
const HISTORY_DEPTH = 16;
const STABLE_THRESHOLD = 4;
const UI_INTERVAL_MS = 30;
const LIVE_CHART_POINTS = 301;
const FULL_CHART_POINTS = 10000;

let boardSize = SIZE.value;
let current = new Uint8Array(boardSize * boardSize);
let next = new Uint8Array(current.length);
let stableAge = new Uint16Array(current.length);
let oscillatorMask = new Uint8Array(current.length);
let history = Array.from(
    { length: HISTORY_DEPTH },
    () => new Uint8Array(current.length),
);
let historyLength = 0;
let historyWrite = 0;

let generationNumber = 0;
let liveNumber = 0;
let maxLiving = 0;
let rafId = 0;
let lastTickTime = 0;
let lastUiTime = -Infinity;

// Simulation pixels remain board-sized; only the visible canvas is high-DPI.
let ctx = null;
let bitmapCanvas = null;
let bitmapCtx = null;
let imageData = null;
let pixels = null;
let canvasResizeObserver = null;
let gridUnitsPerCssPixel = 1;
const littleEndian = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
let palette = { dead: 0, stable: 0, dynamic: 0 };

// History is kept as plain numbers. The chart only sees capped, sampled views.
const livingSeries = [];
const medianSeries = [];
const lowerHeap = []; // Max heap, values <= current median
const upperHeap = []; // Min heap, values >= current median
const hasChartData = ref(false);
const chartMax = ref(100);
const isHistorySampled = ref(false);
const chartDataset = shallowRef([]);

// A run is recorded only when the simulation stops by itself (extinction of
// active cells or a repeated board). Pausing, resetting, changing size, or
// generating a new board never creates a completed-run record.
//
// IndexedDB stores the full per-generation history separately from the table
// summaries, so loading the table never copies large histories into Vue.
const RUNS_DB_NAME = "game-of-life-completed-runs";
const RUNS_DB_VERSION = 1;
const RUN_SUMMARIES_STORE = "summaries";
const RUN_DETAILS_STORE = "details";
const completedRuns = shallowRef([]);
const loadingCompletedRuns = ref(true);
const runsStorageError = ref("");
const numberFormatter = new Intl.NumberFormat();

let runsDbPromise = null;
let nextTemporaryRunId = -1;
const unsavedRunDetails = new Map();
let runStartedAt = "";
let runInitialPopulation = 0;
let initialRunBoard = null;
let activeRunMilliseconds = 0;
let activeRunStartTime = 0;
let runWasEdited = false;

function openRunsDb() {
    if (runsDbPromise) return runsDbPromise;
    if (typeof indexedDB === "undefined") {
        return Promise.reject(new Error("IndexedDB is not available"));
    }
    runsDbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(RUNS_DB_NAME, RUNS_DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(RUN_SUMMARIES_STORE)) {
                db.createObjectStore(RUN_SUMMARIES_STORE, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
            if (!db.objectStoreNames.contains(RUN_DETAILS_STORE)) {
                db.createObjectStore(RUN_DETAILS_STORE, { keyPath: "id" });
            }
        };
        request.onsuccess = () => {
            const db = request.result;
            db.onversionchange = () => {
                db.close();
                runsDbPromise = null;
            };
            resolve(db);
        };
        request.onerror = () => reject(request.error);
        request.onblocked = () =>
            reject(new Error("The completed-run database is blocked"));
    }).catch((error) => {
        runsDbPromise = null;
        throw error;
    });
    return runsDbPromise;
}

async function loadCompletedRuns() {
    try {
        const db = await openRunsDb();
        const saved = await new Promise((resolve, reject) => {
            const transaction = db.transaction(RUN_SUMMARIES_STORE, "readonly");
            const request = transaction
                .objectStore(RUN_SUMMARIES_STORE)
                .getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        const merged = new Map(
            [...saved, ...completedRuns.value].map((run) => [run.id, run]),
        );
        completedRuns.value = [...merged.values()].sort((a, b) =>
            b.completedAt.localeCompare(a.completedAt),
        );
    } catch (error) {
        runsStorageError.value =
            "Run history is available for this page only; browser storage is unavailable.";
        console.warn("Failed to load Game of Life run history:", error);
    } finally {
        loadingCompletedRuns.value = false;
    }
}

async function storeRun(summary, details) {
    const db = await openRunsDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            [RUN_SUMMARIES_STORE, RUN_DETAILS_STORE],
            "readwrite",
        );
        let savedId;
        transaction.oncomplete = () => resolve(savedId);
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () =>
            reject(transaction.error || new Error("Run storage was aborted"));
        const request = transaction
            .objectStore(RUN_SUMMARIES_STORE)
            .add(summary);
        request.onsuccess = () => {
            savedId = request.result;
            transaction
                .objectStore(RUN_DETAILS_STORE)
                .put({ id: savedId, ...details });
        };
    });
}

function resetRunTracking() {
    runStartedAt = "";
    runInitialPopulation = 0;
    initialRunBoard = null;
    activeRunMilliseconds = 0;
    activeRunStartTime = 0;
    runWasEdited = false;
}

function finishActiveRunInterval() {
    if (activeRunStartTime) {
        activeRunMilliseconds += performance.now() - activeRunStartTime;
        activeRunStartTime = 0;
    }
}

function recordCompletedRun(reason) {
    if (!runStartedAt) return;

    const completedAt = new Date().toISOString();
    const summary = {
        startedAt: runStartedAt,
        completedAt,
        gridSize: boardSize,
        generations: generationNumber,
        initialPopulation: runInitialPopulation,
        finalPopulation: countAlive(current),
        peakActive: maxLiving,
        medianActive: medianSeries[medianSeries.length - 1] ?? 0,
        activeMilliseconds: Math.round(activeRunMilliseconds),
        reason,
        editedDuringRun: runWasEdited,
    };
    // Preserve every recorded generation, even though the chart uses a
    // downsampled view. The initial/final boards enable later reconstruction.
    const details = {
        activeCellsByGeneration: Uint32Array.from(livingSeries),
        cumulativeMedianByGeneration: Float64Array.from(medianSeries),
        initialBoard: initialRunBoard || new Uint8Array(0),
        finalBoard: current.slice(),
    };

    // Show the result immediately; replace its temporary ID after the
    // asynchronous IndexedDB transaction has committed successfully.
    const temporaryId = nextTemporaryRunId--;
    unsavedRunDetails.set(temporaryId, details);
    completedRuns.value = [
        { id: temporaryId, ...summary },
        ...completedRuns.value,
    ];
    void storeRun(summary, details)
        .then((id) => {
            unsavedRunDetails.delete(temporaryId);
            completedRuns.value = completedRuns.value.map((run) =>
                run.id === temporaryId ? { ...run, id } : run,
            );
        })
        .catch((error) => {
            runsStorageError.value =
                "Some runs could not be saved to browser storage. Unsaved runs remain available until this page is closed.";
            console.warn("Failed to save Game of Life run:", error);
        });
}

function formatRunNumber(value) {
    return numberFormatter.format(value);
}

function formatRunDuration(milliseconds) {
    if (milliseconds < 1000) return `${milliseconds} ms`;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return minutes
        ? `${minutes}m ${String(remainder).padStart(2, "0")}s`
        : `${(milliseconds / 1000).toFixed(1)}s`;
}

function formatRunDate(iso) {
    return new Date(iso).toLocaleString();
}

async function downloadRunData(run) {
    try {
        let details = unsavedRunDetails.get(run.id);
        if (!details) {
            const db = await openRunsDb();
            details = await new Promise((resolve, reject) => {
                const transaction = db.transaction(
                    RUN_DETAILS_STORE,
                    "readonly",
                );
                const request = transaction
                    .objectStore(RUN_DETAILS_STORE)
                    .get(run.id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
        if (!details) throw new Error("The full run data was not found");

        const { id, ...summary } = run;
        const payload = {
            id: id > 0 ? id : null,
            ...summary,
            activeCellsByGeneration: Array.from(
                details.activeCellsByGeneration,
            ),
            cumulativeMedianByGeneration: Array.from(
                details.cumulativeMedianByGeneration,
            ),
            initialBoard: Array.from(details.initialBoard),
            finalBoard: Array.from(details.finalBoard),
        };
        const blob = new Blob([JSON.stringify(payload)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `game-of-life-${run.gridSize}x${run.gridSize}-${run.generations}-generations.json`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
        runsStorageError.value = "The selected run could not be exported.";
        console.warn("Failed to export Game of Life run:", error);
    }
}

const isClearingRuns = ref(false);

async function clearCompletedRuns() {
    if (!window.confirm("Delete all completed runs? This cannot be undone.")) {
        return;
    }

    isClearingRuns.value = true;

    try {
        const db = await openRunsDb();

        await new Promise((resolve, reject) => {
            const transaction = db.transaction(
                [RUN_SUMMARIES_STORE, RUN_DETAILS_STORE],
                "readwrite",
            );

            transaction.objectStore(RUN_SUMMARIES_STORE).clear();
            transaction.objectStore(RUN_DETAILS_STORE).clear();

            transaction.oncomplete = resolve;
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });

        completedRuns.value = [];
        unsavedRunDetails.clear();
        runsStorageError.value = "";
    } catch (error) {
        runsStorageError.value = "Failed to clear completed runs.";
        console.error(error);
    } finally {
        isClearingRuns.value = false;
    }
}

function packedRgb(r, g, b) {
    return littleEndian
        ? ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0
        : ((r << 24) | (g << 16) | (b << 8) | 255) >>> 0;
}

function updatePalette() {
    palette = isDarkMode.value
        ? {
              dead: packedRgb(42, 42, 42),
              stable: packedRgb(74, 74, 74),
              dynamic: packedRgb(66, 211, 146),
          }
        : {
              dead: packedRgb(255, 255, 255),
              stable: packedRgb(200, 200, 200),
              dynamic: packedRgb(95, 138, 238),
          };
}

// Match the cells rendered in the dynamic/live color, not all occupied cells.
// Occupied but stable/oscillating cells are rendered grey and are excluded.
function isVisibleLiveCell(index) {
    return (
        current[index] === 1 &&
        stableAge[index] < STABLE_THRESHOLD &&
        oscillatorMask[index] === 0
    );
}

function draw() {
    if (!ctx || !bitmapCtx || !bitmapCanvas || !pixels || !imageData) return;

    const dead = palette.dead;
    const stable = palette.stable;
    const dynamic = palette.dynamic;
    const length = current.length;

    for (let i = 0; i < length; i += 1) {
        pixels[i] = current[i]
            ? isVisibleLiveCell(i)
                ? dynamic
                : stable
            : dead;
    }

    // Keep the pixel simulation at grid resolution and upscale with nearest
    // neighbor sampling. The visible canvas is sized for the device's DPI so
    // vector overlays (the dashed hull) render sharply even on small grids.
    bitmapCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(bitmapCanvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
    drawLiveCellHull();
}

function drawLiveCellHull() {
    // One hull for ALL dynamically live (green/blue) cells, regardless of
    // whether their groups are connected. Do not flood-fill or create a hull
    // per component. Grey stable/oscillating cells do not contribute vertices.
    //
    // Only the leftmost and rightmost live cells in each row can contribute
    // to the global convex hull. This reduces giftWrap input to <= 4 * SIZE
    // corners, while covering the full area of the contributing cell squares.
    const points = [];
    const size = boardSize;
    for (let y = 0; y < size; y += 1) {
        const row = y * size;
        let left = 0;
        while (left < size && !isVisibleLiveCell(row + left)) left += 1;
        if (left === size) continue;

        let right = size - 1;
        while (right > left && !isVisibleLiveCell(row + right)) right -= 1;
        points.push(
            { x: left, y },
            { x: right + 1, y },
            { x: right + 1, y: y + 1 },
            { x: left, y: y + 1 },
        );
    }
    if (!points.length) return;

    // giftWrap is invoked once, with vertices belonging ONLY to live cells.
    // The result is a single, closed convex path around the entire live set.
    const hull = giftWrap({ series: points });
    if (!hull) return;
    const path = new Path2D(`M${hull.trim().replace(/\s+/g, " L")}Z`);

    // The hull is expressed in grid-cell coordinates. Scale the path to the
    // high-DPI display buffer while preserving a CSS-pixel stroke/dash size.
    const scale = ctx.canvas.width / boardSize;
    const cssPixelInGridUnits = gridUnitsPerCssPixel;
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.strokeStyle = "#ff3700";
    ctx.lineWidth = 1.5 * cssPixelInGridUnits;
    ctx.lineJoin = "round";
    ctx.fillStyle = "#42d39210";
    ctx.fill(path);
    ctx.setLineDash([4 * cssPixelInGridUnits, 3 * cssPixelInGridUnits]);
    ctx.stroke(path);
    ctx.restore();
}

function resizeCanvas() {
    const canvas = canvasEl.value;
    if (!canvas || !ctx) return false;

    // Limit DPR to 2 to keep the display upload inexpensive, especially
    // while running many generations per second.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displaySize = canvas.getBoundingClientRect().width || boardSize;
    gridUnitsPerCssPixel = boardSize / displaySize;
    const resolution = Math.max(boardSize, Math.round(displaySize * dpr));

    let resized = false;
    if (canvas.width !== resolution || canvas.height !== resolution) {
        canvas.width = resolution;
        canvas.height = resolution;
        resized = true;
    }

    if (!bitmapCanvas) {
        bitmapCanvas = document.createElement("canvas");
        bitmapCtx = bitmapCanvas.getContext("2d", { alpha: false });
    }

    // Only reallocate simulation pixels when the number of cells changes.
    if (
        bitmapCanvas.width !== boardSize ||
        bitmapCanvas.height !== boardSize ||
        !imageData
    ) {
        bitmapCanvas.width = boardSize;
        bitmapCanvas.height = boardSize;
        imageData = bitmapCtx.createImageData(boardSize, boardSize);
        pixels = new Uint32Array(imageData.data.buffer);
        resized = true;
    }

    // Resizing a canvas resets its 2D context state.
    ctx.imageSmoothingEnabled = false;
    return resized;
}

function onCanvasDisplayResize() {
    // Re-render only if the backing store resolution actually changed.
    if (resizeCanvas()) draw();
}

function previousBoard(stepsBack) {
    if (stepsBack > historyLength) return null;
    return history[(historyWrite - stepsBack + HISTORY_DEPTH) % HISTORY_DEPTH];
}

function recordHistory() {
    history[historyWrite].set(current);
    historyWrite = (historyWrite + 1) % HISTORY_DEPTH;
    if (historyLength < HISTORY_DEPTH) historyLength += 1;
}

function boardsEqual(a, b) {
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function hasGlobalLoop() {
    // The old 16-snapshot buffer only compared against the preceding 15.
    // Compare before overwriting the oldest snapshot to preserve that rule.
    const checks = Math.min(historyLength, HISTORY_DEPTH - 1);
    for (let k = 1; k <= checks; k += 1) {
        if (boardsEqual(current, previousBoard(k))) return true;
    }
    return false;
}

function heapPush(heap, value, isMax) {
    let i = heap.length;
    heap.push(value);
    while (i > 0) {
        const parent = (i - 1) >> 1;
        if (isMax ? heap[parent] >= value : heap[parent] <= value) break;
        heap[i] = heap[parent];
        i = parent;
    }
    heap[i] = value;
}

function heapPop(heap, isMax) {
    const root = heap[0];
    const last = heap.pop();
    if (heap.length === 0) return root;

    let i = 0;
    while (2 * i + 1 < heap.length) {
        let child = 2 * i + 1;
        if (
            child + 1 < heap.length &&
            (isMax
                ? heap[child + 1] > heap[child]
                : heap[child + 1] < heap[child])
        ) {
            child += 1;
        }
        if (isMax ? last >= heap[child] : last <= heap[child]) break;
        heap[i] = heap[child];
        i = child;
    }
    heap[i] = last;
    return root;
}

function addChartValue(value) {
    if (!lowerHeap.length || value <= lowerHeap[0]) {
        heapPush(lowerHeap, value, true);
    } else {
        heapPush(upperHeap, value, false);
    }

    if (lowerHeap.length > upperHeap.length + 1) {
        heapPush(upperHeap, heapPop(lowerHeap, true), false);
    } else if (upperHeap.length > lowerHeap.length) {
        heapPush(lowerHeap, heapPop(upperHeap, false), true);
    }

    livingSeries.push(value);
    medianSeries.push(
        lowerHeap.length === upperHeap.length
            ? (lowerHeap[0] + upperHeap[0]) / 2
            : lowerHeap[0],
    );
    if (value > maxLiving) maxLiving = value;
}

function sampledFullHistory() {
    const n = livingSeries.length;
    if (n <= FULL_CHART_POINTS) {
        return [livingSeries.slice(), medianSeries.slice()];
    }

    // Preserve the beginning, end, and local minima/maxima rather than
    // feeding tens of thousands of points into the chart renderer.
    const values = [livingSeries[0]];
    const medians = [medianSeries[0]];
    const bucketCount = Math.floor((FULL_CHART_POINTS - 2) / 2);
    for (let bucket = 0; bucket < bucketCount; bucket += 1) {
        const begin = 1 + Math.floor((bucket * (n - 2)) / bucketCount);
        const end = 1 + Math.floor(((bucket + 1) * (n - 2)) / bucketCount);
        let minIndex = begin;
        let maxIndex = begin;
        for (let i = begin + 1; i < end; i += 1) {
            if (livingSeries[i] < livingSeries[minIndex]) minIndex = i;
            if (livingSeries[i] > livingSeries[maxIndex]) maxIndex = i;
        }
        const first = Math.min(minIndex, maxIndex);
        const last = Math.max(minIndex, maxIndex);
        values.push(livingSeries[first]);
        medians.push(medianSeries[first]);
        if (last !== first) {
            values.push(livingSeries[last]);
            medians.push(medianSeries[last]);
        }
    }
    values.push(livingSeries[n - 1]);
    medians.push(medianSeries[n - 1]);
    return [values, medians];
}

function publishUi(force = false, now = performance.now()) {
    if (!force && now - lastUiTime < UI_INTERVAL_MS) return;
    lastUiTime = now;
    generations.value = generationNumber;
    livingCount.value = liveNumber;
    hasChartData.value = livingSeries.length > 0;
    chartMax.value = livingSeries.length ? maxLiving : 100;

    const fullHistory = !isRunning.value || hasStalled.value;
    const [live, medians] = fullHistory
        ? sampledFullHistory()
        : [
              livingSeries.slice(-LIVE_CHART_POINTS),
              medianSeries.slice(-LIVE_CHART_POINTS),
          ];
    isHistorySampled.value =
        fullHistory && livingSeries.length > FULL_CHART_POINTS;
    chartDataset.value = [
        {
            name: "Generations",
            series: live,
            type: "line",
            smooth: true,
            dataLabels: false,
            color: isDarkMode.value ? "#42d392" : "#5f8aee",
            useArea: true,
        },
        {
            name: "Cumulative median",
            series: medians,
            type: "line",
            smooth: true,
            color: "#ff3700",
            useArea: false,
        },
    ];
}

function resetChart() {
    generationNumber = 0;
    maxLiving = 0;
    livingSeries.length = 0;
    medianSeries.length = 0;
    lowerHeap.length = 0;
    upperHeap.length = 0;
}

function fillRandom(grid) {
    for (let i = 0; i < grid.length; i += 1) {
        grid[i] = Math.random() > 0.91 ? 1 : 0;
    }
}

function countAlive(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i += 1) count += grid[i];
    return count;
}

function createBoard(random = false) {
    boardSize = SIZE.value;
    const cells = boardSize * boardSize;
    if (current.length !== cells) {
        current = new Uint8Array(cells);
        next = new Uint8Array(cells);
        stableAge = new Uint16Array(cells);
        oscillatorMask = new Uint8Array(cells);
        history = Array.from(
            { length: HISTORY_DEPTH },
            () => new Uint8Array(cells),
        );
    } else {
        current.fill(0);
        next.fill(0);
        stableAge.fill(0);
        oscillatorMask.fill(0);
    }
    historyLength = 0;
    historyWrite = 0;
    if (random) fillRandom(current);
    liveNumber = random ? countAlive(current) : 0;
    hasStalled.value = false;
    resetRunTracking();
    resetChart();
    resizeCanvas();
    draw();
    publishUi(true);
}

function step() {
    const src = current;
    const dst = next;
    const size = boardSize;
    const older3 = previousBoard(3);
    const older2 = previousBoard(2);
    const older1 = previousBoard(1);
    let dynamicLiving = 0;

    // Rolling 3-column sum: three new reads per cell instead of testing all
    // eight neighbors with eight bounds checks for every cell.
    for (let y = 0; y < size; y += 1) {
        const row = y * size;
        const above = row - size;
        const below = row + size;
        const hasAbove = y > 0;
        const hasBelow = y + 1 < size;
        let left = 0;
        let center =
            src[row] +
            (hasAbove ? src[above] : 0) +
            (hasBelow ? src[below] : 0);

        for (let x = 0; x < size; x += 1) {
            const i = row + x;
            const nextX = x + 1;
            const right =
                nextX < size
                    ? src[i + 1] +
                      (hasAbove ? src[above + nextX] : 0) +
                      (hasBelow ? src[below + nextX] : 0)
                    : 0;
            const alive = src[i];
            const neighbors = left + center + right - alive;
            const newAlive =
                neighbors === 3 || (alive === 1 && neighbors === 2) ? 1 : 0;
            dst[i] = newAlive;

            const age =
                newAlive && alive
                    ? stableAge[i] < 65535
                        ? stableAge[i] + 1
                        : 65535
                    : 0;
            stableAge[i] = age;

            // For g0,g1,g2,g3: local period-2 means g0=g2, g1=g3, g0!=g1.
            // Compute the mask and dynamic count in this same simulation pass.
            const oscillates =
                older3 !== null &&
                older3[i] === older1[i] &&
                older2[i] === newAlive &&
                older3[i] !== older2[i];
            oscillatorMask[i] = oscillates ? 1 : 0;
            if (newAlive && age < STABLE_THRESHOLD && !oscillates) {
                dynamicLiving += 1;
            }

            left = center;
            center = right;
        }
    }

    current = dst;
    next = src;
    generationNumber += 1;
    liveNumber = dynamicLiving;
    addChartValue(dynamicLiving);

    // Save ONLY naturally completed runs, not pauses, resets or RAND actions.
    const noActiveCells = dynamicLiving === 0;
    const repeatedBoard = !noActiveCells && hasGlobalLoop();
    recordHistory();
    if (noActiveCells || repeatedBoard) {
        hasStalled.value = true;
        liveNumber = 0;
        stopAnimation();
        recordCompletedRun(
            noActiveCells ? "No active cells" : "Repeated board",
        );
    }
}

function loop(timestamp) {
    rafId = 0;
    if (!isRunning.value) return;

    if (!lastTickTime || timestamp - lastTickTime >= delay.value) {
        step();
        draw();
        lastTickTime = timestamp;
        publishUi(!isRunning.value, timestamp);
    }
    // Do not schedule a stray frame after the simulation stalls or pauses.
    if (isRunning.value) rafId = requestAnimationFrame(loop);
}

function stopAnimation() {
    finishActiveRunInterval();
    isRunning.value = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
}

function pause() {
    stopAnimation();
    publishUi(true);
}

function reset() {
    stopAnimation();
    createBoard(false);
}

function makeRand() {
    stopAnimation();
    createBoard(true);
}

function start() {
    if (isRunning.value) return;
    if (hasStalled.value || liveNumber === 0) makeRand();
    if (!runStartedAt) {
        runStartedAt = new Date().toISOString();
        runInitialPopulation = countAlive(current);
        initialRunBoard = current.slice();
    }
    hasStalled.value = false;
    isRunning.value = true;
    activeRunStartTime = performance.now();
    lastTickTime = 0;
    publishUi(true);
    rafId = requestAnimationFrame(loop);
}

let painting = false;
let pointerId = null;
let paintValue = 1;
let lastPaintedIndex = -1;

function cellIndexFromPointer(event) {
    const canvas = canvasEl.value;
    if (!canvas) return -1;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return -1;
    const x = Math.floor(
        ((event.clientX - rect.left) / rect.width) * boardSize,
    );
    const y = Math.floor(
        ((event.clientY - rect.top) / rect.height) * boardSize,
    );
    if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) return -1;
    return y * boardSize + x;
}

function paintCell(index) {
    if (index < 0 || index === lastPaintedIndex) return;
    lastPaintedIndex = index;
    if (current[index] === paintValue) return;
    liveNumber += paintValue - current[index];
    current[index] = paintValue;
    if (runStartedAt) runWasEdited = true;
    stableAge[index] = 0;
    oscillatorMask[index] = 0;
    hasStalled.value = false;
    // All older boards become invalid once the user edits the grid.
    historyLength = 0;
    historyWrite = 0;
    draw();
    publishUi();
}

function onPointerDown(event) {
    if (
        isRunning.value ||
        painting ||
        (event.pointerType === "mouse" && event.button !== 0)
    )
        return;
    const index = cellIndexFromPointer(event);
    if (index < 0) return;
    painting = true;
    pointerId = event.pointerId;
    lastPaintedIndex = -1;
    paintValue = current[index] ? 0 : 1;
    liveNumber = countAlive(current);
    canvasEl.value.setPointerCapture(event.pointerId);
    paintCell(index);
}

function onPointerMove(event) {
    if (!painting || event.pointerId !== pointerId) return;
    paintCell(cellIndexFromPointer(event));
}

function onPointerUp(event) {
    if (!painting || event.pointerId !== pointerId) return;
    painting = false;
    pointerId = null;
    lastPaintedIndex = -1;
    if (canvasEl.value?.hasPointerCapture(event.pointerId)) {
        canvasEl.value.releasePointerCapture(event.pointerId);
    }
    publishUi(true);
}

watch(SIZE, () => {
    stopAnimation();
    painting = false;
    pointerId = null;
    createBoard(false);
});

watch(isDarkMode, () => {
    updatePalette();
    draw();
    publishUi(true);
});

onMounted(() => {
    ctx = canvasEl.value?.getContext("2d", {
        alpha: false,
        desynchronized: true,
    });
    updatePalette();
    resizeCanvas();
    draw();
    publishUi(true);

    // CSS layout and device-pixel ratio can change independently of SIZE.
    if (typeof ResizeObserver !== "undefined" && canvasEl.value) {
        canvasResizeObserver = new ResizeObserver(onCanvasDisplayResize);
        canvasResizeObserver.observe(canvasEl.value);
    }
    window.addEventListener("resize", onCanvasDisplayResize, { passive: true });
    void loadCompletedRuns();
});

onBeforeUnmount(() => {
    stopAnimation();
    canvasResizeObserver?.disconnect();
    canvasResizeObserver = null;
    window.removeEventListener("resize", onCanvasDisplayResize);
    ctx = null;
    bitmapCtx = null;
    bitmapCanvas = null;
    imageData = null;
    pixels = null;
});

const chartConfig = computed(() => {
    return {
        responsive: false,
        theme: "",
        customPalette: [],
        downsample: { threshold: 10000 },
        userOptions: { show: false },
        style: {
            fontFamily: "Inter",
            chart: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#8A8A8A" : "#4A4A4A",
                aspectRatio: "16 / 9",
                stacked: false,
                stackGap: 20,
                scale: { ticks: 10, min: null, max: chartMax.value },
                selector: {
                    show: false,
                },
                tooltip: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                zoom: { show: false },
                title: {
                    text:
                        (hasStalled.value || !isRunning.value) &&
                        hasChartData.value
                            ? isHistorySampled.value
                                ? "Full history (sampled)"
                                : "Full history"
                            : !hasChartData.value
                              ? "Click start to play"
                              : "Running...",
                    color: isDarkMode.value ? "#8A8A8A" : "#4A4A4A",
                    textAlign: "left",
                    paddingLeft: 68,
                },
                grid: {
                    y: {
                        showAxis: true,
                        axisColor: isDarkMode.value ? "#5A5A5A" : "#4A4A4A",
                        axisThickness: 2,
                        axisName: "Live cells",
                        axisLabels: {
                            show: true,
                            fontSizeRatio: 0.7,
                            color: isDarkMode.value ? "#6A6A6A" : "#4A4A4A",
                            offsetX: 0,
                            rounding: 1,
                            prefix: "",
                            suffix: "",
                            bold: false,
                        },
                        verticalLines: {
                            show: true,
                            color: isDarkMode.value ? "#5A5A5A" : "#CCCCCC",
                            hideUnderXLength: 20,
                            position: "middle",
                        },
                    },
                    x: {
                        showAxis: true,
                        axisColor: isDarkMode.value ? "#5A5A5A" : "#4A4A4A",
                        axisThickness: 2,
                        axisName: "Iterations",
                        horizontalLines: {
                            show: true,
                            color: isDarkMode.value ? "#3A3A3A" : "#CCCCCC",
                            alternate: true,
                            opacity: 20,
                        },
                        timeLabels: {
                            show: true,
                            showMarker: true,
                            fontSizeRatio: 0.8,
                            values: [],
                            datetimeFormatter: {
                                enable: false,
                                locale: "en",
                                useUTC: false,
                                januaryAsYear: false,
                                options: {
                                    year: "yyyy",
                                    month: "MMM 'yy",
                                    day: "dd MMM",
                                    hour: "HH:mm",
                                    minute: "HH:mm:ss",
                                    second: "HH:mm:ss",
                                },
                            },
                            rotation: 0,
                            offsetY: 30,
                            color: isDarkMode.value ? "#6A6A6A" : "#4A4A4A",
                            modulo: 12,
                            bold: false,
                        },
                    },
                    zeroLine: {
                        show: true,
                        color: isDarkMode.value ? "#5A5A5A" : "#4A4A4A",
                        dashed: true,
                    },
                },
                line: { plots: { show: false, radiusRatio: 1 } },
                bar: { gradient: { show: true } },
                area: { opacity: 20 },
                dataLabels: {
                    show: false,
                },
                paddingProportions: {
                    top: 0.1,
                    right: 0.05,
                    bottom: 0.12,
                    left: 0.1,
                },
            },
        },
        table: {
            show: false,
        },
    };
});

const kpiConfig = computed(() => {
    if (isDarkMode.value) {
        return {
            debug: false,
            animationFrames: 60,
            animationValueStart: 0,
            backgroundColor: "transparent",
            fontFamily: "inherit",
            layoutClass: "w-[150px]",
            prefix: "",
            suffix: " m/s",
            title: "Generations",
            titleBold: true,
            titleColor: "#CCCCCC",
            titleClass: "",
            titleCss: "",
            titleFontSize: 18,
            useAnimation: false,
            valueBold: true,
            valueColor: "#6376DD",
            valueClass: "tabular-nums",
            valueCss: "",
            valueFontSize: 36,
            valueRounding: 0,
            analogDigits: {
                show: true,
                height: 40,
                color: "#42d392",
                skeletonColor: "#2A2A2A",
            },
        };
    } else {
        return {
            debug: false,
            animationFrames: 60,
            animationValueStart: 0,
            backgroundColor: "transparent",
            fontFamily: "inherit",
            layoutClass: "w-[150px]",
            prefix: "",
            suffix: "m/s",
            title: "Generations",
            titleBold: true,
            titleColor: "#2D353C",
            titleClass: "",
            titleCss: "",
            titleFontSize: 16,
            useAnimation: false,
            valueBold: true,
            valueColor: "#6376DD",
            valueClass: "tabular-nums",
            valueCss: "",
            valueFontSize: 32,
            valueRounding: 0,
            analogDigits: {
                show: true,
                height: 40,
                color: "#1A1A1A",
                skeletonColor: "#E1E5E8",
            },
        };
    }
});

const cellKpiConfig = computed(() => ({
    ...kpiConfig.value,
    title: "Cell count",
}));
</script>

<template>
    <h1 class="font-inter-medium text-center mt-12 text-2xl mb-6">
        Conway's Game of Life
    </h1>
    <BaseCard class="max-w-[1200px] mx-auto">
        <div
            class="flex flex-row align-center gap-4 flex-wrap justify-center max-w-[1200px] mx-auto p-2 bg-gray-100 dark:bg-[#2A2A2A]"
        >
            <VueUiKpi :dataset="generations" :config="kpiConfig" />
            <VueUiKpi :dataset="livingCount" :config="cellKpiConfig" />

            <div class="flex flex-row align-center gap-4 self-center">
                <button
                    class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10] disabled:opacity-45"
                    @click="start"
                    :disabled="isRunning"
                >
                    START
                </button>
                <button
                    class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10]"
                    @click="pause"
                >
                    PAUSE
                </button>
                <button
                    class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10]"
                    @click="reset"
                >
                    RESET
                </button>
                <button
                    class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10]"
                    @click="makeRand"
                >
                    RAND
                </button>
            </div>

            <label class="py-2 flex flex-col gap-2">
                Delay (ms):
                <input
                    v-model.number="delay"
                    type="range"
                    class="accent-app-blue"
                    min="0"
                    max="200"
                />
                <BaseDigit :value="delay" />
            </label>

            <label class="py-2 flex flex-col gap-2">
                Size:
                <input
                    v-model.number="SIZE"
                    type="range"
                    class="accent-app-blue"
                    :min="50"
                    :max="500"
                    :step="50"
                />
                <BaseDigit :value="SIZE" />
            </label>
        </div>

        <div
            class="flex flex-row max-w-[1200px] mx-auto relative p-4 bg-gray-100 dark:bg-[#2A2A2A]"
        >
            <div
                class="w-full max-w-[400px] p-4 bg-white dark:bg-[#2A2A2A] relative"
            >
                <canvas
                    ref="canvasEl"
                    class="block w-full aspect-square touch-none"
                    aria-label="Game of Life grid. Drag to draw or erase cells."
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                    @pointerup="onPointerUp"
                    @pointercancel="onPointerUp"
                    @lostpointercapture="onPointerUp"
                />
                <SkullIcon
                    v-if="hasStalled"
                    class="animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                    size="64"
                />
            </div>
            <div class="bg-white dark:bg-[#2A2A2A] w-full p-2 rounded-r-lg">
                <VueUiXyCanvas :dataset="chartDataset" :config="chartConfig" />
            </div>
        </div>
    </BaseCard>

    <BaseCard class="max-w-[1200px] mx-auto mt-6 mb-12">
        <section class="p-4 bg-gray-100 dark:bg-[#2A2A2A]">
            <div class="flex items-center justify-between flex-wrap gap-2 mb-4">
                <h2 class="font-inter-medium text-xl">
                    Completed runs ({{ formatRunNumber(completedRuns.length) }})
                </h2>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                    Recorded on natural completion only
                </span>

                <button
                    type="button"
                    class="rounded px-4 py-2 border border-app-red text-app-red hover:bg-red-700 hover:text-white disabled:opacity-50"
                    :disabled="isClearingRuns || loadingCompletedRuns"
                    @click="clearCompletedRuns"
                >
                    {{ isClearingRuns ? "Clearing..." : "Clear history" }}
                </button>
            </div>
            <p
                v-if="runsStorageError"
                role="status"
                class="text-sm text-red-600 dark:text-red-400 mb-3"
            >
                {{ runsStorageError }}
            </p>

            <div class="grid grid-cols-1 gap-4" v-if="completedRuns.length">
                <div class="p-2">
                    <GameOfLifeScatter :data="completedRuns" />
                </div>
            </div>

            <div
                class="overflow-x-auto rounded bg-white dark:bg-[#222222] h-screen max-h-[500px]"
            >
                <table
                    class="w-full text-sm text-left tabular-nums whitespace-nowrap"
                >
                    <thead
                        class="border-b border-gray-200 dark:border-gray-700"
                    >
                        <tr>
                            <th scope="col" class="px-3 py-3 font-semibold">
                                Completed
                            </th>
                            <th scope="col" class="px-3 py-3 font-semibold">
                                Grid size
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 font-semibold text-right"
                            >
                                Generations
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 font-semibold text-right"
                            >
                                Initial population
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 font-semibold text-right"
                            >
                                Peak active
                            </th>
                            <th
                                scope="col"
                                class="px-3 py-3 font-semibold text-right"
                            >
                                Median active
                            </th>
                            <th scope="col" class="px-3 py-3 font-semibold">
                                Duration
                            </th>
                            <th scope="col" class="px-3 py-3 font-semibold">
                                Stopped by
                            </th>
                            <th scope="col" class="px-3 py-3 font-semibold">
                                Data
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-if="loadingCompletedRuns && !completedRuns.length"
                        >
                            <td
                                colspan="10"
                                class="p-5 text-center text-gray-500"
                            >
                                Loading completed runs…
                            </td>
                        </tr>
                        <tr v-else-if="!completedRuns.length">
                            <td
                                colspan="10"
                                class="p-5 text-center text-gray-500"
                            >
                                No completed runs yet. Run the simulation until
                                it stops on its own.
                            </td>
                        </tr>
                        <tr
                            v-for="run in completedRuns"
                            :key="run.id"
                            class="border-t border-gray-100 dark:border-gray-700"
                        >
                            <td class="px-3 py-3">
                                {{ formatRunDate(run.completedAt) }}
                            </td>
                            <td class="px-3 py-3">
                                {{ run.gridSize }} × {{ run.gridSize }}
                            </td>
                            <td class="px-3 py-3 text-right">
                                {{ formatRunNumber(run.generations) }}
                            </td>
                            <td class="px-3 py-3 text-right">
                                {{ formatRunNumber(run.initialPopulation) }}
                            </td>
                            <td class="px-3 py-3 text-right">
                                {{ formatRunNumber(run.peakActive) }}
                            </td>
                            <td class="px-3 py-3 text-right">
                                {{ formatRunNumber(run.medianActive) }}
                            </td>
                            <td class="px-3 py-3">
                                {{ formatRunDuration(run.activeMilliseconds) }}
                            </td>
                            <td class="px-3 py-3">{{ run.reason }}</td>
                            <td class="px-3 py-3">
                                <button
                                    type="button"
                                    class="underline underline-offset-2 text-blue-600 dark:text-blue-300"
                                    :aria-label="`Download full data for ${run.gridSize} by ${run.gridSize} run with ${run.generations} generations`"
                                    @click="downloadRunData(run)"
                                >
                                    JSON
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Saved in this browser. JSON includes every generation's
                active-cell count and cumulative median, plus the initial and
                final boards. Paused and abandoned runs are not recorded.
            </p>
        </section>
    </BaseCard>
</template>
