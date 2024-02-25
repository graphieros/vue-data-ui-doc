<script setup>
import { computed } from "vue";

const props = defineProps({
    color: String,
    isSelected: {
        type: Boolean,
        default: false,
    },
    limit: {
        type: Number,
        default: 3
    },
    plot: Object,
    radius: Number,
    shape: String,
    stroke: String,
    strokeWidth: Number,
    zoom: {
        type: Number,
        default: 1.3
    }
});

function calcPolygonPoints({
    centerX,
    centerY,
    outerPoints,
    radius,
    rotation
}) {
    const angle = Math.PI / outerPoints;
    const angleOffsetToCenter = rotation;
    let points = "";
    const coordinates = [];
    for (let i = 0; i < outerPoints * 2; i += 1) {
        let currX = centerX + Math.cos(i * angle + angleOffsetToCenter) * radius;
        let currY = centerY + Math.sin(i * angle + angleOffsetToCenter) * radius;
        points += `${currX},${currY} `;
        coordinates.push({ x: currX, y: currY });
    }
    return {
        path: `M${points}Z`,
        coordinates
    };
}

function createPolygonPath({
    plot,
    radius,
    sides,
    rotation = 0
}) {
    const centerX = plot.x;
    const centerY = plot.y;
    const outerPoints = sides / 2;
    return calcPolygonPoints({
        centerX,
        centerY,
        outerPoints,
        radius: radius + 1,
        rotation
    });
}

function createStar({
    plot,
    radius,
    apexes = 5
}) {
    const centerX = plot.x;
    const centerY = plot.y;
    const innerCirclePoints = apexes;
    const innerRadius = (radius * 3.5) / innerCirclePoints;
    const innerOuterRadiusRatio = 2;
    const outerRadius = innerRadius * innerOuterRadiusRatio;
    return calcStarPoints({
        centerX,
        centerY,
        innerCirclePoints,
        innerRadius,
        outerRadius
    })
}

function calcStarPoints({
    centerX,
    centerY,
    innerCirclePoints,
    innerRadius,
    outerRadius
}) {
    const angle = Math.PI / innerCirclePoints;
    const angleOffsetToCenterStar = 60;
    const totalPoints = innerCirclePoints * 2;
    let points = "";
    for (let i = 0; i < totalPoints; i += 1) {
        let isEvenIndex = i % 2 == 0;
        let r = isEvenIndex ? outerRadius : innerRadius;
        let currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
        let currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
        points += `${currX},${currY} `;
    }
    return points;
}

const emit = defineEmits(['mouseover', 'mouseout', 'click']);

function getPolygonConfigFromName(name){
    return {
        circle: {
            points: 1,
            rotation: 0
        },
        line: {
            points: 2,
            rotation: 0
        },
        triangle: {
            points: 3,
            rotation: 0.52
        },
        square: {
            points: 4,
            rotation: 0.8
        },
        diamond: {
            points: 4,
            rotation: 0
        },
        pentagon: {
            points: 5,
            rotation: 0.95
        },
        hexagon: {
            points: 6,
            rotation: 0
        }
    }[name]
}

const config = computed(() => {
    return getPolygonConfigFromName(props.shape)
});

const starPoints = computed(() => {
    if (props.shape !== 'star') return null;
    return createStar({
        plot: { x: props.plot.x, y: props.plot.y },
        radius: props.radius * (props.isSelected ? props.zoom : 1)
    })
})

const d = computed(() => {
    return createPolygonPath({
        plot: { x: props.plot.x, y: props.plot.y },
        radius: props.radius * (props.isSelected ? props.zoom : 1),
        sides: config.value.points,
        rotation: config.value.rotation
    }).path;
});

</script>

<template>
    <g> 
        <circle
            v-if="config && config.points === 1"
            :cx="plot.x"
            :cy="plot.y"
            :r="props.radius * (props.isSelected ? props.zoom : 1)"
            :fill="color"
            :stroke="stroke"
            :stroke-width="strokeWidth"
            @mouseover="emit('mouseover')"
            @mouseout="emit('mouseout')"
            @click="emit('click')"
        />
        <path
            v-if="config && config.points >= limit"
            :d="d"
            :fill="color"
            :stroke="stroke"
            :stroke-width="strokeWidth"
            @mouseover="emit('mouseover')"
            @mouseout="emit('mouseout')"
            @click="emit('click')"
        />
        <polygon 
            v-if="starPoints"
            :points="starPoints"
            :fill="color"
            :stroke="stroke"
            :stroke-width="strokeWidth"
            @mouseover="emit('mouseover')"
            @mouseout="emit('mouseout')"
            @click="emit('click')"
        />
    </g>
</template>