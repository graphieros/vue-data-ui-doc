<script setup>

</script>

<template>
    <details class="my-2 my-dropdown peer mb-4">
        <summary class="cursor-pointer px-2 py-2 hover:bg-[#5f8bee30] rounded-t-md mySummary relative select-none">
            <slot name="title"></slot>
            <div class="summary-marker bg-app-blue"></div>
        </summary>
        <div class="dark:bg-[#1F1F1F] bg-[#EEEEEE] py-2 rounded-b-md shadow">
            <slot name="content"></slot>
        </div>
    </details>
</template>

<style scoped>
summary::marker {
    color: #5f8bee !important;
    font-size: 1.2em;
}
</style>

<style>
.mySummary {
    border-right: 2px solid transparent;
    transition: all 0.1s ease-in-out;
}
details[open] .mySummary {
    background: #5f8bee30 !important;
}

.summary-marker {
    position: absolute;
    top: 2px;
    right: 0px;
    height: calc(100% - 4px);
    width: 4px;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

details[open] .summary-marker {
    opacity: 1;
}

</style>