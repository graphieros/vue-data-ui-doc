<script setup>
defineProps({ message: String, error: Boolean, dark: Boolean });
</script>
<template>
    <span
        class="copy-feedback-message"
        :class="{ 'feedback-error': error, 'feedback-dark': dark }"
    >
        <svg
            v-if="!error"
            class="feedback-check"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#42d392"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
        <span>{{ message }}</span>
    </span>
</template>
<style scoped>
.copy-feedback-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 6px;
    background: var(--surface, #f3f4f6);
    color: var(--muted, #64748b);
    font-family: Inter, sans-serif;
    font-size: 11px;
    line-height: 1.3;
    text-align: center;
    overflow-wrap: anywhere;
    animation: copy-feedback-rise 2.5s ease-out forwards;
}
.feedback-dark {
    background: var(--surface, #2a2a2a);
    color: var(--muted, #b3b3b3);
}
.feedback-error {
    color: #b7791f;
}
.feedback-check {
    flex-shrink: 0;
}
@keyframes copy-feedback-rise {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    25% {
        opacity: 1;
    }
    100% {
        transform: translateY(-40px);
        opacity: 0;
    }
}
@media (prefers-reduced-motion: reduce) {
    .copy-feedback-message {
        animation: none;
    }
}
</style>
