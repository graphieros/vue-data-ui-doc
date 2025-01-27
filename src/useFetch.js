import { useMainStore } from "./stores";

export default async function useFetch({ url, _then = () => {}, _finally = () => {} }) {
    const store = useMainStore();

    store.isFetching = true;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(_then)
        .catch(error => {
            console.error(`There was a problem fetching data:`, error)
        })
        .finally(() => {
            store.isFetching = false;
            _finally();
        })

}