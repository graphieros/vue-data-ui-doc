const requests = new Map();
const memory = new Map();

// Statistics may be reused across routes and reloads; user writes never use this cache.
export async function cachedJson(url, { ttl = 5 * 60 * 1000 } = {}) {
    const key = `vdu:stats:${url}`;
    let cached = memory.get(key);
    if (!cached && typeof sessionStorage !== "undefined") {
        try {
            cached = JSON.parse(sessionStorage.getItem(key));
        } catch {
            /* Storage is optional. */
        }
    }
    if (cached && Date.now() - cached.time < ttl) return cached.value;
    if (requests.has(key)) return requests.get(key);
    const request = fetch(url)
        .then(async (response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const value = await response.json();
            const entry = { time: Date.now(), value };
            memory.set(key, entry);
            try {
                sessionStorage.setItem(key, JSON.stringify(entry));
            } catch {
                /* Private mode / quota. */
            }
            return value;
        })
        .catch((error) => {
            if (cached) return cached.value;
            throw error;
        })
        .finally(() => requests.delete(key));
    requests.set(key, request);
    return request;
}
