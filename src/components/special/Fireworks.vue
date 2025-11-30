<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref(null);
const fireworkChance = 0.02;
const baseParticleSpeed = 0.6;
const fireworkLifespan = 600;
const particleInitialSpeed = 4.5;
const gravity = 9.8;

let particles = [];
let disableAutomaticFireworks = false;
let resetDisableTimeoutIdentifier = 0;

let drawingContext = null;
let animationFrameIdentifier = null;

class Particle {
    constructor(
        xPosition = 0,
        yPosition = 0,
        red = Math.floor(Math.random() * 255),
        green = Math.floor(Math.random() * 255),
        blue = Math.floor(Math.random() * 255),
        speed,
        isFixedSpeed
    ) {
        this.x = xPosition;
        this.y = yPosition;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = 0.05;
        this.radius = 1 + Math.random();
        this.angle = Math.random() * 360;
        this.speed = Math.random() * speed + 0.1;
        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed;
        this.startTime = new Date().getTime();
        this.duration = Math.random() * 300 + fireworkLifespan;
        this.currentDuration = 0;
        this.dampening = 30;

        this.colour = this.getColour();
        this.lineWidth = 1;

        if (isFixedSpeed) {
            this.speed = speed;
            this.velocityY = Math.sin(this.angle) * this.speed;
            this.velocityX = Math.cos(this.angle) * this.speed;
        }

        this.initialVelocityX = this.velocityX;
        this.initialVelocityY = this.velocityY;
    }

    animate() {
        this.currentDuration = new Date().getTime() - this.startTime;

        if (this.currentDuration <= 200) {
            this.x += this.initialVelocityX * particleInitialSpeed;
            this.y += this.initialVelocityY * particleInitialSpeed;
            this.alpha += 0.01;

            this.colour = this.getColour(240, 240, 240, 0.9);
        } else {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.colour = this.getColour(
                this.red,
                this.green,
                this.blue,
                0.4 + Math.random() * 0.3
            );
        }

        this.velocityY += gravity / 1000;

        if (this.currentDuration >= this.duration) {
            this.velocityX -= this.velocityX / this.dampening;
            this.velocityY -= this.velocityY / this.dampening;
        }

        if (this.currentDuration >= this.duration + this.duration / 1.1) {
            this.alpha -= 0.02;
            this.colour = this.getColour();
        } else {
            if (this.alpha < 1) {
                this.alpha += 0.03;
            }
        }
    }

    render() {
        if (!drawingContext) {
            return;
        }

        drawingContext.beginPath();
        drawingContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        drawingContext.lineWidth = this.lineWidth;
        drawingContext.fillStyle = this.colour;
        drawingContext.shadowBlur = 8;
        drawingContext.shadowColor = this.getColour(
            this.red + 150,
            this.green + 150,
            this.blue + 150,
            1
        );
        drawingContext.fill();
    }

    getColour(red, green, blue, alpha) {
        return `rgba(${red ?? this.red}, ${green ?? this.green}, ${blue ?? this.blue}, ${
            alpha ?? this.alpha
        })`;
    }
}

function createFirework(
    xPosition = Math.random() * (canvasRef.value?.width || window.innerWidth),
    yPosition = Math.random() * (canvasRef.value?.height || window.innerHeight)
) {
    const canvasElement = canvasRef.value;
    if (!canvasElement) {
        return;
    }

    let speed = Math.random() * 2 + baseParticleSpeed;
    let maximumSpeed = speed;

    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    red = red < 150 ? red + 150 : red;
    green = green < 150 ? green + 150 : green;
    blue = blue < 150 ? blue + 150 : blue;

    const particlesPerFirework = Math.random() * 100 + 20;

    for (let index = 0; index < particlesPerFirework; index += 1) {
        const particle = new Particle(
            xPosition,
            yPosition,
            red,
            green,
            blue,
            speed
        );
        particles.push(particle);

        maximumSpeed = speed > maximumSpeed ? speed : maximumSpeed;
    }

    for (let index = 0; index < 40; index += 1) {
        const particle = new Particle(
            xPosition,
            yPosition,
            red,
            green,
            blue,
            maximumSpeed,
            true
        );
        particles.push(particle);
    }
}

function animationLoop() {
    const canvasElement = canvasRef.value;
    if (!canvasElement || !drawingContext) {
        return;
    }

    if (!disableAutomaticFireworks && Math.random() < fireworkChance) {
        createFirework();
    }

    drawingContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    for (let index = particles.length - 1; index >= 0; index--) {
        const particle = particles[index];
        particle.animate();
        particle.render();

        if (
            particle.y > canvasElement.height ||
            particle.x < 0 ||
            particle.x > canvasElement.width ||
            particle.alpha <= 0
        ) {
            particles.splice(index, 1);
        }
    }

    animationFrameIdentifier = window.requestAnimationFrame(animationLoop);
}

function updateCanvasSize() {
    const canvasElement = canvasRef.value;
    if (!canvasElement) {
        return;
    }
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
}

onMounted(() => {
    const canvasElement = canvasRef.value;
    if (!canvasElement) {
        return;
    }

    drawingContext = canvasElement.getContext("2d");

    updateCanvasSize();

    window.addEventListener("resize", updateCanvasSize);

    animationLoop();
});

onBeforeUnmount(() => {
    const canvasElement = canvasRef.value;

    if (canvasElement) {
        window.removeEventListener("resize", updateCanvasSize);
    }

    if (animationFrameIdentifier !== null) {
        window.cancelAnimationFrame(animationFrameIdentifier);
    }

    window.clearTimeout(resetDisableTimeoutIdentifier);
});
</script>

<template>
    <div class="fireworks">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<style scoped>
.fireworks {
    background-color: transparent;
    margin: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
}

.fireworks canvas {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
