import { cachedJson } from "./cachedFetch.js";
import { useMainStore } from "./stores";

let activeRequests = 0;

export default async function useFetch({
    url,
    _then = () => {},
    _finally = () => {},
    _onError = () => {},
}) {
    const store = useMainStore();

    activeRequests++;
    store.isFetching = true;

    return cachedJson(url)
        .then(_then)
        .catch((error) => {
            console.error(`There was a problem fetching data:`, error);
            _onError?.();
        })
        .finally(() => {
            activeRequests--;
            store.isFetching = activeRequests > 0;
            _finally();
        });
}
