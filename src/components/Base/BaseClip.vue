<script setup>
import { useId } from "vue";

const metalId = useId();
const shadowId = useId();
const occlusionId = useId();

const props = defineProps({
    color: {
        type: String,
        default: "#3A3A3A",
    },
    tw: {
        type: String,
        dfault: "",
    },
});
</script>

<template>
    <div :class="tw" style="pointer-events: none">
        <svg
            viewBox="0 0 20 58"
            style="width: 100%; background: transparent; overflow: visible"
            aria-hidden="true"
        >
            <defs>
                <!-- The container edge crosses y=10. Only the rear tip passes
                     behind it; the front loop and its shadow remain visible. -->
                <clipPath :id="occlusionId" clipPathUnits="userSpaceOnUse">
                    <path d="M -6 -5 H 28 V 10 H 15.5 V 21 H 28 V 67 H -6 Z" />
                </clipPath>
                <!-- A softened silhouette supplies a continuous rounded surface,
                     so the lighting follows the bends as well as the straight wire. -->
                <filter
                    :id="metalId"
                    filterUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="58"
                    color-interpolation-filters="sRGB"
                >
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="0.55"
                        result="surface"
                    />
                    <feDiffuseLighting
                        in="surface"
                        surfaceScale="1.4"
                        diffuseConstant="0.9"
                        lighting-color="#e5e9ed"
                        result="diffuse"
                    >
                        <feDistantLight azimuth="225" elevation="50" />
                    </feDiffuseLighting>
                    <feComposite
                        in="diffuse"
                        in2="SourceGraphic"
                        operator="arithmetic"
                        k1="1"
                        k2="0"
                        k3="0"
                        k4="0"
                        result="shadedMetal"
                    />
                    <feSpecularLighting
                        in="surface"
                        surfaceScale="1.4"
                        specularConstant="0.65"
                        specularExponent="22"
                        lighting-color="#f4f7fa"
                        result="reflection"
                    >
                        <feDistantLight azimuth="225" elevation="50" />
                    </feSpecularLighting>
                    <feComposite
                        in="reflection"
                        in2="SourceAlpha"
                        operator="in"
                        result="clippedReflection"
                    />
                    <feComposite
                        in="shadedMetal"
                        in2="clippedReflection"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                        result="litMetal"
                    />
                    <feComposite
                        in="litMetal"
                        in2="SourceAlpha"
                        operator="in"
                    />
                </filter>
                <filter
                    :id="shadowId"
                    filterUnits="userSpaceOnUse"
                    x="-6"
                    y="-5"
                    width="34"
                    height="72"
                    color-interpolation-filters="sRGB"
                >
                    <!-- Broad projected shadow and a tighter contact shadow. -->
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="0.75"
                        result="castBlur"
                    />
                    <feOffset
                        in="castBlur"
                        dx="1.1"
                        dy="1.6"
                        result="castOffset"
                    />
                    <feFlood flood-color="#000000" flood-opacity="0.32" />
                    <feComposite in2="castOffset" operator="in" result="cast" />
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="0.18"
                        result="contactBlur"
                    />
                    <feOffset
                        in="contactBlur"
                        dx="0.2"
                        dy="0.3"
                        result="contactOffset"
                    />
                    <feFlood flood-color="#000000" flood-opacity="0.45" />
                    <feComposite
                        in2="contactOffset"
                        operator="in"
                        result="contact"
                    />
                    <feMerge>
                        <feMergeNode in="cast" />
                        <feMergeNode in="contact" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g :clip-path="`url(#${occlusionId})`">
                <g :filter="`url(#${shadowId})`">
                    <path
                        d="M 18 15 L 18 10 A 1 1 0 0 0 2 10 L 2 50 A 1 1 0 0 0 15 50 L 15 23 A 1 1 0 0 0 13 23 L 13 50 A 1 1 0 0 1 4 50 L 4 10 A 1 1 0 0 1 16 10 L 16 15 Z"
                        :fill="color"
                        :filter="`url(#${metalId})`"
                    />
                </g>
            </g>
        </svg>
    </div>
</template>
