<script setup>
import { useDocConfigState } from "../../useDocConfigState";
import VueUiTimerConfigFields from "./configuration/VueUiTimerConfigFields.vue";
import { ref, watch, nextTick, computed, onMounted } from "vue";
import Box from "../Box.vue";
import { CopyIcon } from "vue-tabler-icons";
import { useMainStore } from "../../stores";
import { useConfig } from "../../assets/useConfig";
import BaseDocHeaderActions from "../BaseDocHeaderActions.vue";
import { useConfigCode } from "../../useConfigCode";
import useMobile from "../../useMobile";
import DocSnapper from "../DocSnapper.vue";
import Rater from "../Rater.vue";
import BaseDocTitle from "../BaseDocTitle.vue";
import BaseCard from "../BaseCard.vue";
import BaseDocDescription from "../BaseDocDescription.vue";
import ExposedMethods from "../ExposedMethods.vue";
import ComponentEmits from "../ComponentEmits.vue";
import BaseSlotsImplementationLink from "../Base/BaseSlotsImplementationLink.vue";
import BaseCopyConfig from "../BaseCopyConfig.vue";

const mainConfig = useConfig();

const store = useMainStore();
const key = ref(0);
const translations = computed(() => store.translations);

onMounted(() => (store.docSnap = false));
const { isMobile } = useMobile();

watch(
    () => store.isDarkMode,
    (val) => {
        nextTick(() => {
            key.value += 1;
        });
    },
);

const isDarkMode = computed(() => {
    return store.isDarkMode;
});

const configState = useDocConfigState(isDarkMode);
const config = computed({
    get: () =>
        configState.get({
            devHints: { enable: false },
            type: "stopwatch",
            responsive: false,
            responsiveProportionalSizing: true,
            useCursorPointer: false,
            style: {
                backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                fontFamily: "inherit",
                height: 300,
                width: 300,
                title: {
                    text: "Title",
                    color: isDarkMode.value ? "#FAFAFA" : "#2D353C",
                    fontSize: 20,
                    bold: true,
                    textAlign: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: "#A1A1A1",
                        text: "Subtitle",
                        fontSize: 16,
                        bold: false,
                    },
                },
            },
            stopwatch: {
                showHours: false,
                showHundredth: true,
                cycleSeconds: 5,
                track: {
                    radiusRatio: 1,
                    stroke: isDarkMode.value ? "#5A5A5A" : "#e1e5e8",
                    fill: isDarkMode.value ? "#1A1A1A" : "#F3F4F6",
                    strokeWidth: 2,
                },
                tracker: {
                    radiusRatio: 1,
                    stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    strokeWidth: 1,
                    fill: isDarkMode.value ? "#42d392" : "#5f8aee",
                    gradient: {
                        show: true,
                        color: isDarkMode.value ? "#FFFFFF" : "#F3F4F6",
                    },
                    aura: {
                        show: true,
                        radiusRatio: 1,
                        fill: isDarkMode.value ? "#42d392" : "#5f8aee",
                        stroke: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                        strokeWidth: 0,
                    },
                },
                cycleTrack: {
                    show: true,
                    stroke: isDarkMode.value ? "#42d392" : "#5f8aee",
                    strokeWidth: 4,
                },
                label: {
                    fontSize: 24,
                    color: isDarkMode.value ? "#42d392" : "#2D353C",
                    bold: false,
                },
                legend: {
                    backgroundColor: isDarkMode.value ? "#2A2A2A" : "#F3F4F6",
                    buttons: {
                        start: true,
                        pause: true,
                        reset: true,
                        restart: true,
                        lap: true,
                        iconColor: isDarkMode.value ? "#42d392" : "#1A1A1A",
                    },
                    buttonTitles: {
                        start: "Start",
                        pause: "Pause",
                        resume: "Resume",
                        reset: "Reset",
                        restart: "Restart",
                        lap: "Lap",
                    },
                },
            },
        }),
    set: configState.set,
});

function resetDefault() {
    configState.reset();
}

function forceChartUpdate() {
    key.value += 1;
}

function copyToClipboard(conf) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = JSON.stringify(conf);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    store.copy();
}

const isFixed = ref(false);

function fixChart() {
    isFixed.value = !isFixed.value;
    store.docSnap = !store.docSnap;
}

const timer = ref(null);

const timerLaps = ref([]);

function updateLaps(laps) {
    timerLaps.value = laps;
}

const { configCode, showAllConfig } = useConfigCode();
</script>

<template>
    <div class="overflow-x-auto">
        <BaseDocTitle name="VueUiTimer" />

        <BaseDocDescription
            :text="translations.docs.tooltips.timer[store.lang]"
        />

        <BaseDocHeaderActions
            targetLink="vue-ui-timer"
            :configSource="mainConfig.vue_ui_timer"
        />

        <div :class="`transition-all mx-auto no-style max-w-[400px]`">
            <DocSnapper
                :isFixed="isFixed"
                :disabled="!isFixed || isMobile"
                @fixChart="fixChart"
                @resetDefault="resetDefault"
                @copyToClipboard="copyToClipboard(config)"
            >
                <BaseCard>
                    <VueDataUi
                        @lap="updateLaps"
                        @reset="timerLaps = []"
                        @restart="timerLaps = []"
                        ref="timer"
                        component="VueUiTimer"
                        :config="config"
                        :key="key"
                    />
                    <div class="flex flex-col py-6" v-if="timerLaps.length">
                        Laps:
                        <div v-for="lap in timerLaps">
                            {{ lap }}
                        </div>
                    </div>
                </BaseCard>
            </DocSnapper>
        </div>

        <Rater itemId="vue_ui_timer" />

        <Box showEmits showSlots :activeTab="1">
            <template #tab0>{{
                translations.docs.comments.noDataset[store.lang]
            }}</template>
            <template #tab1>
                <div class="w-full overflow-x-auto">
                    <BaseCopyConfig :config="config" @reset="resetDefault" />

                    <div class="mt-4">
                        TS type:
                        <code class="text-app-blue">VueUiTimerConfig</code>
                    </div>

                    <div class="my-4">
                        Toggle tree view:
                        <input type="checkbox" v-model="showAllConfig" />
                    </div>

                    <code ref="configCode">
                        <VueUiTimerConfigFields
                            :config="config"
                            :context="{ forceChartUpdate, store, translations }"
                        />
                    </code>
                </div>
            </template>
            <!-- EMITS -->
            <template #tab2>
                <ComponentEmits
                    component="VueUiTimer"
                    :names="['start', 'pause', 'reset', 'restart', 'lap']"
                />
                <ExposedMethods
                    component="VueUiTimer"
                    :names="['start', 'pause', 'reset', 'restart', 'lap']"
                />
            </template>
            <!-- SLOTS -->
            <template #tab3>
                <BaseSlotsImplementationLink
                    link="https://github.com/graphieros/vue-data-ui/blob/master/ts-playground/src/components/charts/ts-vue-ui-timer.vue"
                />

                Available slots:

                <div class="text-xl">#controls</div>
                <pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #controls="{ start, pause, reset, restart, lap, laps, isRunning, isPaused, timestamp, elapsed, formatted }"&gt;
            <span class="text-gray-500">&lt;!-- Make your own menu --&gt;</span>
        &lt;/template&gt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>
</pre>

                <div class="text-xl border-t border-gray-500 pt-4">#laps</div>
                <pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #laps="{ laps, lap, isRunning, isPaused, timestamp, elapsed, formatted }"&gt;
            <span class="text-gray-500">&lt;!-- Show a stack of laps --&gt;</span>
        &lt;/template&gt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>
</pre>

                <div class="text-xl border-t border-gray-500 pt-4">#time</div>
                <pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #time="{ timestamp, elapsed, formatted }"&gt;
            <span class="text-gray-500">&lt;!-- Format your own time label --&gt;</span>
        &lt;/template&gt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>

</pre>
                <div class="text-xl border-t border-gray-500 pt-4">
                    #chart-background
                </div>
                <pre>
<code>
&lt;template&gt;
    &lt;VueUiTimer :config="config"&gt;
        &lt;template #chart-background&gt;
            &lt;div :style="{ width: '100%', height: '100%', background: 'radial-gradient(at top left, red, white)' }" /&gt;
        &lt;/template&gt;
    &lt;/VueUiTimer&gt;
&lt;/template&gt;
</code>
</pre>
            </template>
        </Box>
    </div>
</template>
