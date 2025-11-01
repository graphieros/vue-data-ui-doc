<script setup>
import { ref, watch, onBeforeUnmount, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../stores";
import BaseCard from "./BaseCard.vue";
import { CheckIcon, ExclamationCircleIcon } from "vue-tabler-icons";

const store = useMainStore();
const { messages: storeMessages } = storeToRefs(store);

const messages = ref([]);
const timers = new Map();
const remaining = new Map();
const startedAt = new Map();

const DEFAULT_DURATION = 4000;
const EXIT_ANIM_MS = 200;

watch(
    storeMessages,
    async (list) => {
        const next = list.map((m) => ({
            id: m.id,
            type: m.type ?? "success",
            content: m.content ?? "",
            visible: m.visible ?? true,
            duration: typeof m.duration === "number" ? m.duration : DEFAULT_DURATION,
            autoClose: m.autoClose !== false,
            paused: false,
        }));

        const prevMap = new Map(messages.value.map((m) => [m.id, m]));
        next.forEach((m) => {
            const prev = prevMap.get(m.id);
            if (prev) {
                m.visible = prev.visible;
                m.paused = prev.paused;
            }
        });

        messages.value = next;

        await nextTick();

        for (const m of messages.value) {
            if (m.autoClose && !timers.has(m.id)) {
                startTimer(m.id, m.duration);
            }
        }

        for (const [id] of timers) {
            if (!next.find((m) => m.id === id)) {
                clearTimer(id);
            }
        }
    },
    { deep: true, immediate: true }
);

function startTimer(id, ms) {
    clearTimer(id);
    remaining.set(id, ms);
    startedAt.set(id, performance.now());
    timers.set(
        id,
        setTimeout(() => closeById(id), ms)
    );
}

function pauseTimer(id) {
    if (!timers.has(id)) return;
    const elapsed = performance.now() - (startedAt.get(id) || 0);
    const left = Math.max(0, (remaining.get(id) || 0) - elapsed);
    remaining.set(id, left);
    clearTimeout(timers.get(id));
    timers.delete(id);
}

function resumeTimer(id) {
    const left = remaining.get(id);
    if (left == null) return;
    startTimer(id, left);
}

function clearTimer(id) {
    if (timers.has(id)) {
        clearTimeout(timers.get(id));
        timers.delete(id);
    }
}

function onMouseEnter(m) {
    m.paused = true;
    pauseTimer(m.id);
}
function onMouseLeave(m) {
    m.paused = false;
    resumeTimer(m.id);
}

function closeById(id) {
    const m = messages.value.find((x) => x.id === id);
    if (!m) return;
    m.visible = false;
    clearTimer(id);
    setTimeout(() => store.deleteMessage(id), EXIT_ANIM_MS);
}

function deleteMessage(m) {
    closeById(m.id);
}

onBeforeUnmount(() => {
    for (const [id] of timers) {
        clearTimer(id);
    }
});
</script>

<template>
    <Teleport to="body">
        <TransitionGroup name="toast" tag="div"
            class="fixed bottom-0 left-0 z-[2147483647] p-6 flex flex-col gap-3 pointer-events-none" aria-live="polite">
            <BaseCard 
                v-for="message in messages" 
                :key="message.id" 
                v-show="message.visible" 
                :type="message.type"
                forceLight
                :class="[
                    'relative w-full max-w-[320px] rounded-xl px-9 py-3 shadow-xl pointer-events-auto',
                    'transition-[transform,opacity] will-change-transform',
                    'overflow-hidden',
                    message.type === 'error' ? 'ring-1 ring-red-500/20' : 'ring-1 ring-emerald-500/20'
                ]" role="status" @mouseenter="onMouseEnter(message)" @mouseleave="onMouseLeave(message)">

                <CheckIcon v-if="message.type === 'success'"
                    class="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 text-app-green-dark" />
                <ExclamationCircleIcon v-else-if="message.type === 'error'"
                    class="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 text-app-red" />

                <button
                    class="absolute right-2 top-2 grid place-items-center h-7 w-7 rounded-full shadow-[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)] bg-app-green-light"
                    @click="deleteMessage(message)" aria-label="Dismiss notification">
                    <VueUiIcon name="close" :size="18" stroke="#1A1A1A" />
                </button>

                <p class="text-xs leading-tight pl-2 pr-8">
                    {{ message.content }}
                </p>

                <!-- Progress bar -->
                <div class="absolute left-0 bottom-0 h-1 w-full overflow-hidden rounded-b-xl"
                    :class="message.type === 'error' ? 'bg-red-500/10' : 'bg-emerald-500/10'">
                    <div class="h-full" :class="[
                        'progress',
                        'rounded-full',
                        message.paused ? 'progress--paused' : '',
                        message.type === 'error' ? 'bg-app-red' : 'bg-app-green-dark'
                    ]" :style="{ '--duration': (message.duration || 0) + 'ms' }" aria-hidden="true" />
                </div>
            </BaseCard>
        </TransitionGroup>
    </Teleport>
</template>

<style scoped>
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
}

.toast-enter-active,
.toast-leave-active {
    transition: opacity 200ms ease, transform 200ms cubic-bezier(.22, 1, .36, 1);
}

.toast-move {
    transition: transform 200ms cubic-bezier(.22, 1, .36, 1);
}

.progress {
    width: 100%;
    transform-origin: left center;
    animation: toast-shrink var(--duration, 4000ms) linear forwards;
}

.progress--paused {
    animation-play-state: paused;
}

@keyframes toast-shrink {
    from {
        transform: scaleX(1);
    }

    to {
        transform: scaleX(0);
    }
}


@media (prefers-reduced-motion: reduce) {
    .toast-enter-active,
    .toast-leave-active,
    .toast-move {
        transition: none;
    }

    .progress {
        animation: none;
        transform: none;
    }
}
</style>
