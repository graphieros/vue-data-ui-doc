<script setup>
/**
 * Link to a route with a hash, then scrolls to a second hash on the same page.
 * 
 * Example:
 * 
 * ```html
 * <CuteLink
 *  path="/examples/categories"
 *  hash="vue-ui-wheel"
 *  target="wheel-less-gradient-pie-plain"
 * >
 *      Slotted content
 * </CuteLink>
 * ```
 */
const props = defineProps({
    path: { type: String },
    hash: { type: String },
    target: { type: String }
});

</script>

<template>
    <RouterLink
        :to="{
            path,
            query: {
                next: target,
            },
            hash: `#${hash}`
        }"
    >
        <slot/>
    </RouterLink>
</template>