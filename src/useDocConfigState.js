import { ref, unref } from "vue";

/** Keep writable demo edits while the computed preset reacts to theme/type changes. */
export function useDocConfigState(isDarkMode) {
    const states = new Map();
    const revision = ref(0);
    const theme = () => (unref(isDarkMode) ? "dark" : "light");
    return {
        get(preset) {
            void revision.value;
            const key = theme();
            let entry = states.get(key);
            if (!entry) {
                entry = {
                    baseline: clone(preset),
                    initialized: true,
                    state: ref(clone(preset)),
                };
                states.set(key, entry);
            } else if (!entry.initialized) {
                entry.baseline = clone(preset);
                entry.initialized = true;
            } else if (!equal(entry.baseline, preset)) {
                entry.state.value = reconcile(
                    entry.state.value,
                    entry.baseline,
                    preset,
                );
                entry.baseline = clone(preset);
            }
            return entry.state.value;
        },
        set(value) {
            const entry = states.get(theme());
            if (entry) entry.state.value = clone(value);
            else
                states.set(theme(), {
                    initialized: false,
                    state: ref(clone(value)),
                });
        },
        reset() {
            states.clear();
            revision.value++;
        },
    };
}

function plain(value) {
    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        (Object.getPrototypeOf(value) === Object.prototype ||
            Object.getPrototypeOf(value) === null)
    );
}

function clone(value) {
    if (Array.isArray(value)) return value.map(clone);
    if (plain(value))
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, clone(item)]),
        );
    return value;
}

function equal(left, right) {
    if (Object.is(left, right)) return true;
    if (Array.isArray(left) && Array.isArray(right))
        return (
            left.length === right.length &&
            left.every((item, i) => equal(item, right[i]))
        );
    if (plain(left) && plain(right)) {
        const keys = Object.keys(left);
        return (
            keys.length === Object.keys(right).length &&
            keys.every(
                (key) =>
                    Object.hasOwn(right, key) && equal(left[key], right[key]),
            )
        );
    }
    return false;
}

function reconcile(current, previous, next) {
    if (equal(current, previous)) return clone(next);
    if (plain(current) && plain(previous) && plain(next)) {
        const result = {};
        for (const key of new Set([
            ...Object.keys(current),
            ...Object.keys(next),
        ])) {
            if (!Object.hasOwn(next, key) && equal(current[key], previous[key]))
                continue;
            result[key] = reconcile(current[key], previous[key], next[key]);
        }
        return result;
    }
    return clone(current);
}
