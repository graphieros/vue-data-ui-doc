import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', () => {
    const loading = ref(false);

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    function updateFavicon() {
        const favicon = document.getElementById('favicon') || document.createElement('link');
        favicon.id = 'favicon';
        favicon.rel = 'icon';
        favicon.type = 'image/png';

        if (loading.value) {
            drawLoader(context);
            favicon.href = canvas.toDataURL('image/png');
        } else {
            favicon.href = '/favicon.ico';
        }

        document.head.appendChild(favicon);
    }

    function drawLoader(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.fillStyle = '#fff'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#3498db'; 
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(16, 16, 12, 0, Math.PI * 2); 
        ctx.stroke();

        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(16, 16, 10, 0, Math.PI); 
        ctx.stroke();
    }

    watch(loading, updateFavicon, { immediate: true });

    function setLoading(value) {
        loading.value = value;
    }

    return {
        loading,
        setLoading,
    };
});
