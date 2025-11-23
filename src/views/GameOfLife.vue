<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { VueUiKpi, VueUiXyCanvas } from "vue-data-ui";
import "vue-data-ui/style.css";
import { useMainStore } from "../stores";
import { SkullIcon } from "vue-tabler-icons";
import BaseCard from "../components/BaseCard.vue";
import BaseDigit from "../components/Base/BaseDigit.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const isRunning = ref(false);
const RAF = ref(null);
const delay = ref(0);
const generations = ref(0);
const SIZE = ref(200);
const size = computed(() => ({ x: SIZE.value, y: SIZE.value }));
const width = computed(() => size.value.x);
const height = computed(() => size.value.y);
const dataset = ref([]);
const canvasEl = ref(null);
let ctx = null;
let off = null;
let offCtx = null;
const current = ref(makeCells(width.value, height.value, false));
const next = ref(makeCells(width.value, height.value, false));

const livingCount = ref(0);

const HISTORY_DEPTH = 16;
const history = ref([]);

// per-cell "age" of unchanged alive state
const STABLE_THRESHOLD = 4; // generations before we consider a cell "stale"
const stableAge = ref(makeStableAge(width.value, height.value));

// per-cell oscillator mask: 1 = locally period-2 oscillator, 0 = not
const oscillatorMask = ref(new Uint8Array(width.value * height.value));

const hasStalled = ref(false);

let lastTickTime = 0;

function makeCells(w, h, rand = false) {
    const arr = new Uint8Array(w * h);
    if (rand) {
        for (let i = 0; i < arr.length; i += 1) {
            arr[i] = Math.random() > 0.91 ? 1 : 0;
        }
    }
    return arr;
}

function makeStableAge(w, h) {
    return new Uint16Array(w * h);
}

function idx(x, y) {
    return y * width.value + x;
}

function inBounds(x, y) {
    return x >= 0 && y >= 0 && x < width.value && y < height.value;
}

function neighborsCount(x, y, grid) {
    let sum = 0;
    const xm1 = x - 1,
        xp1 = x + 1,
        ym1 = y - 1,
        yp1 = y + 1;
    if (inBounds(xm1, ym1)) sum += grid[idx(xm1, ym1)];
    if (inBounds(x, ym1)) sum += grid[idx(x, ym1)];
    if (inBounds(xp1, ym1)) sum += grid[idx(xp1, ym1)];
    if (inBounds(xm1, y)) sum += grid[idx(xm1, y)];
    if (inBounds(xp1, y)) sum += grid[idx(xp1, y)];
    if (inBounds(xm1, yp1)) sum += grid[idx(xm1, yp1)];
    if (inBounds(x, yp1)) sum += grid[idx(x, yp1)];
    if (inBounds(xp1, yp1)) sum += grid[idx(xp1, yp1)];
    return sum;
}

function isBoardEmpty1D(grid) {
    for (let i = 0; i < grid.length; i += 1) {
        if (grid[i] !== 0) return false;
    }
    return true;
}

function recordHistory() {
    if (history.value.length >= HISTORY_DEPTH) {
        history.value.shift();
    }
    history.value.push(current.value.slice());
}

function boardsEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// detect if the current board matches any earlier board in history
// => still life or oscillator (period <= HISTORY_DEPTH - 1)
function hasGlobalLoop() {
    const hist = history.value;
    const len = hist.length;
    if (len < 2) return false;

    const cur = hist[len - 1];
    for (let k = 1; k < len; k += 1) {
        const past = hist[len - 1 - k];
        if (boardsEqual(cur, past)) {
            return true;
        }
    }
    return false;
}

// if last 4 states are 0,1,0,1 or 1,0,1,0 => mark as local period-2 oscillator.
function computeOscillatorMask() {
    const hist = history.value;
    const len = hist.length;
    const cells = current.value.length;

    let mask = oscillatorMask.value;
    if (mask.length !== cells) {
        mask = new Uint8Array(cells);
        oscillatorMask.value = mask;
    } else {
        mask.fill(0);
    }

    if (len < 4) return;

    const g0 = hist[len - 4];
    const g1 = hist[len - 3];
    const g2 = hist[len - 2];
    const g3 = hist[len - 1];

    for (let i = 0; i < cells; i += 1) {
        const a = g0[i],
            b = g1[i],
            c = g2[i],
            d = g3[i];
        if (
            (a === 0 && b === 1 && c === 0 && d === 1) ||
            (a === 1 && b === 0 && c === 1 && d === 0)
        ) {
            mask[i] = 1;
        }
    }
}

/* ---------- simulation step ---------- */

function step() {
    const w = width.value;
    const h = height.value;
    const src = current.value;
    let dst = next.value;

    if (dst.length !== src.length) {
        next.value = makeCells(w, h, false);
        dst = next.value;
    }

    let ageArr = stableAge.value;
    if (ageArr.length !== src.length) {
        ageArr = makeStableAge(w, h);
        stableAge.value = ageArr;
    }

    for (let y = 0; y < h; y += 1) {
        const rowBase = y * w;
        for (let x = 0; x < w; x += 1) {
            const i = rowBase + x;
            const live = src[i];
            const n = neighborsCount(x, y, src);

            const newVal = (live ? n === 2 || n === 3 : n === 3) ? 1 : 0;
            dst[i] = newVal;

            if (newVal === 1) {
                if (newVal === live) {
                    // alive and unchanged
                    ageArr[i] = Math.min(ageArr[i] + 1, 65535);
                } else {
                    // newly alive or revived
                    ageArr[i] = 0;
                }
            } else {
                // dead cell => no age
                ageArr[i] = 0;
            }
        }
    }

    current.value = dst;
    next.value = src;
    generations.value += 1;

    recordHistory();
    computeOscillatorMask();

    const grid = current.value;
    const osc = oscillatorMask.value;
    let dynamicLiving = 0;

    for (let i = 0; i < grid.length; i += 1) {
        if (grid[i] === 1 && ageArr[i] < STABLE_THRESHOLD && !osc[i]) {
            dynamicLiving += 1;
        }
    }

    livingCount.value = dynamicLiving;
    dataset.value.push({
        period: generations.value,
        value: dynamicLiving,
    });

    const inLoop = hasGlobalLoop();

    // game is "stalled" when:
    // - no dynamic cells left, OR
    // - board completely empty, OR
    // - we are in a repeated board state (still life / oscillator)
    if (dynamicLiving === 0 || isBoardEmpty1D(grid) || inLoop) {
        hasStalled.value = true;
        pause();
        livingCount.value = 0;
    } else {
        hasStalled.value = false;
    }
}

function start() {
    if (isRunning.value) return;

    if (hasStalled.value || livingCount.value === 0) {
        hasStalled.value = false;
        makeRand();

        let sum = 0;
        const grid = current.value;
        for (let i = 0; i < grid.length; i += 1) sum += grid[i];
        livingCount.value = sum;
    }

    isRunning.value = true;
    lastTickTime = 0;
    RAF.value = requestAnimationFrame(loop);
}

function pause() {
    isRunning.value = false;
    if (RAF.value) cancelAnimationFrame(RAF.value);
    RAF.value = null;
}

function clearChart() {
    generations.value = 0;
    dataset.value = [];
}

function reset() {
    pause();
    current.value = makeCells(width.value, height.value, false);
    next.value = makeCells(width.value, height.value, false);
    stableAge.value = makeStableAge(width.value, height.value);
    oscillatorMask.value = new Uint8Array(width.value * height.value);
    draw();
    clearChart();
    livingCount.value = 0;
    history.value = [];
    hasStalled.value = false;
}

function makeRand() {
    pause();
    current.value = makeCells(width.value, height.value, true);
    next.value = makeCells(width.value, height.value, false);
    stableAge.value = makeStableAge(width.value, height.value);
    oscillatorMask.value = new Uint8Array(width.value * height.value);
    draw();
    clearChart();
    recomputeLivingCount();
    history.value = [];
    hasStalled.value = false;
}

function setCellByClientPos(clientX, clientY) {
    if (isRunning.value) return;
    const el = canvasEl.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) * (width.value / rect.width));
    const y = Math.floor((clientY - rect.top) * (height.value / rect.height));
    if (!inBounds(x, y)) return;

    const clone = new Uint8Array(current.value);
    const i = idx(x, y);
    const prev = clone[i];
    const nextVal = prev ? 0 : 1;
    clone[i] = nextVal;

    current.value = clone;
    livingCount.value += nextVal - prev;

    history.value = [];
    hasStalled.value = false;
    stableAge.value[i] = 0;
    oscillatorMask.value[i] = 0;

    draw();
}

function loop(ts) {
    if (!isRunning.value) return;
    if (lastTickTime === 0 || ts - lastTickTime >= delay.value) {
        step();
        draw();
        lastTickTime = ts;
    }
    RAF.value = requestAnimationFrame(loop);
}

const livingColor = computed(() => {
    if (isDarkMode.value) {
        return {
            r: 131,
            g: 164,
            b: 242,
            a: 255,
        };
    } else {
        return {
            r: 49,
            g: 64,
            b: 99,
            a: 255,
        };
    }
});

const deadColor = computed(() => {
    if (isDarkMode.value) {
        return {
            r: 42,
            g: 42,
            b: 42,
            a: 255,
        };
    } else {
        return {
            r: 255,
            g: 255,
            b: 255,
            a: 255,
        };
    }
});

function recomputeLivingCount() {
    const grid = current.value;
    let sum = 0;
    for (let i = 0; i < grid.length; i += 1) sum += grid[i];
    livingCount.value = sum;
}

function draw() {
    if (!ctx || !offCtx) return;
    const w = width.value;
    const h = height.value;

    if (off.width !== w || off.height !== h) {
        off.width = w;
        off.height = h;
    }

    const img = offCtx.createImageData(w, h);
    const data = img.data;
    const grid = current.value;

    for (let i = 0, p = 0; i < grid.length; i += 1, p += 4) {
        const cellAlive = grid[i] === 1;
        const color = cellAlive ? livingColor.value : deadColor.value;

        data[p] = color.r;
        data[p + 1] = color.g;
        data[p + 2] = color.b;
        data[p + 3] = color.a;
    }

    offCtx.putImageData(img, 0, 0);

    const cssW = w * 2;
    const cssH = h * 2;
    const dpr = 5;

    canvasEl.value.width = Math.floor(cssW * dpr);
    canvasEl.value.height = Math.floor(cssH * dpr);

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
    ctx.scale(dpr, dpr);
    ctx.drawImage(off, 0, 0, cssW, cssH);
    ctx.restore();
}

function initCanvases() {
    const el = canvasEl.value;
    ctx = el.getContext("2d", { alpha: false });
    off = document.createElement("canvas");
    offCtx = off.getContext("2d", { alpha: false });
    draw();
}

onMounted(() => {
    initCanvases();

    const onClick = (e) => setCellByClientPos(e.clientX, e.clientY);
    canvasEl.value.addEventListener("click", onClick);

    let dragging = false;
    const onDown = (e) => {
        dragging = true;
        setCellByClientPos(e.clientX, e.clientY);
    };
    const onMove = (e) => {
        if (dragging) setCellByClientPos(e.clientX, e.clientY);
    };
    const onUp = () => {
        dragging = false;
    };

    canvasEl.value.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    const onTouch = (e) => {
        const t = e.touches[0] || e.changedTouches[0];
        setCellByClientPos(t.clientX, t.clientY);
    };
    canvasEl.value.addEventListener("touchstart", onTouch, { passive: true });
    canvasEl.value.addEventListener("touchmove", onTouch, { passive: true });

    onBeforeUnmount(() => {
        pause();
        canvasEl.value?.removeEventListener("click", onClick);
        canvasEl.value?.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        canvasEl.value?.removeEventListener("touchstart", onTouch);
        canvasEl.value?.removeEventListener("touchmove", onTouch);
        ctx = null;
        off = null;
        offCtx = null;
    });
});

watch([width, height], () => {
    pause();
    current.value = makeCells(width.value, height.value, false);
    next.value = makeCells(width.value, height.value, false);
    stableAge.value = makeStableAge(width.value, height.value);
    oscillatorMask.value = new Uint8Array(width.value * height.value);
    draw();
    livingCount.value = 0;
    history.value = [];
    hasStalled.value = false;
});

const max = computed(() => {
    if (!dataset.value.length) return 100;
    return Math.max(...dataset.value.map((d) => d.value));
});

const chartConfig = computed(() => {
    return {
        responsive: false,
        theme: "",
        customPalette: [],
        downsample: { threshold: 10000 },
        userOptions: {
            show: true,
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: "right",
            buttons: {
                tooltip: true,
                pdf: true,
                csv: true,
                img: true,
                table: true,
                labels: true,
                fullscreen: true,
                sort: false,
                stack: true,
                animation: false,
                annotator: true,
            },
            callbacks: {
                animation: null,
                annotator: null,
                csv: null,
                fullscreen: null,
                img: null,
                labels: null,
                pdf: null,
                sort: null,
                stack: null,
                table: null,
                tooltip: null,
            },
            buttonTitles: {
                open: "Open options",
                close: "Close options",
                tooltip: "Toggle tooltip",
                pdf: "Download PDF",
                csv: "Download CSV",
                img: "Download PNG",
                table: "Toggle table",
                labels: "Toggle labels",
                fullscreen: "Toggle fullscreen",
                stack: "Toggle stack mode",
                annotator: "Toggle annotator",
            },
            print: { scale: 2, orientation: "auto", overflowTolerance: 0.2 },
        },
        userOptions: { show: false },
        style: {
            fontFamily: "Inter",
            chart: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#FFFFFF",
                color: isDarkMode.value ? "#8A8A8A" : "#4A4A4A",
                aspectRatio: "16 / 9",
                stacked: false,
                stackGap: 20,
                scale: { ticks: 10, min: null, max: null },
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
                        (hasStalled.value || !isRunning.value) && dataset.value.length > 0
                            ? "Full history"
                            : dataset.value.length === 0
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
                            fontSizeRatio: 1,
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
                paddingProportions: { top: 0.1, right: 0.05, bottom: 0.12, left: 0.1 },
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
                color: "#6376DD",
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
</script>

<template>
    <h1 class="font-inter-medium text-center mt-12 text-2xl mb-6">
        Conway's Game of Life
    </h1>
    <BaseCard class="max-w-[1200px] mx-auto">
        <div
            class="flex flex-row align-center gap-4 flex-wrap justify-center max-w-[1200px] mx-auto p-2 bg-gray-100 dark:bg-[#2A2A2A]">
            <VueUiKpi :dataset="generations" :config="kpiConfig" />
            <VueUiKpi :dataset="livingCount" :config="{
                ...kpiConfig,
                title: 'Cell count',
            }" />

            <div class="flex flex-row align-center gap-4 self-center">
                <button class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10] disabled:opacity-45"
                    @click="start" :disabled="isRunning">
                    START
                </button>
                <button class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10]" @click="pause">
                    PAUSE
                </button>
                <button class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10]" @click="reset">
                    RESET
                </button>
                <button class="rounded py-2 px-4 h-[40px] bg-white shadow dark:bg-[#FFFFFF10]" @click="makeRand">
                    RAND
                </button>
            </div>

            <label class="py-2 flex flex-col gap-2">
                Delay (ms):
                <input type="range" class="accent-app-blue" min="0" max="200" v-model.number="delay" />
                <BaseDigit :value="delay" />
            </label>

            <label class="py-2 flex flex-col gap-2">
                Size:
                <input type="range" class="accent-app-blue" :min="100" :max="300" :step="10" v-model.number="SIZE" />
                <BaseDigit :value="SIZE" />
            </label>
        </div>

        <div class="flex flex-row max-w-[1200px] mx-auto relative p-4 bg-gray-100 dark:bg-[#2A2A2A]">
            <canvas ref="canvasEl"
                class="w-full max-w-[400px] border border-[#CCCCCC] dark:border-[#4A4A4A] rounded-l-lg p-4 bg-white dark:bg-[#2A2A2A]" />
            <div
                class="bg-white dark:bg-[#2A2A2A] w-full border border-[#CCCCCC] dark:border-[#4A4A4A] p-2 rounded-r-lg">
                <VueUiXyCanvas :dataset="[
                    {
                        name: 'Generations',
                        series:
                            hasStalled || !isRunning
                                ? dataset.map((d) => d.value)
                                : dataset.map((d) => d.value).slice(-301),
                        type: 'line',
                        smooth: true,
                        dataLabels: false,
                        color: '#5f8aee',
                        useArea: true,
                    },
                ]" :config="{
            ...chartConfig,
            style: {
                ...chartConfig.style,
                chart: {
                    ...chartConfig.style.chart,
                    scale: {
                        ...chartConfig.style.chart.scale,
                        max,
                    },
                },
            },
        }" />
            </div>
            <SkullIcon v-if="hasStalled"
                class="animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                size="64" />
        </div>
    </BaseCard>
</template>

<style scoped>
.canvas-wrap {
    border: 1px solid #6a6a6a;
    margin-top: 8px;
    padding: 24px;
}

canvas {
    width: 100%;
}

.board {
    display: block;
}
</style>
