import { prepareTypeDocumentation } from "../typeFileDocumentation.js";

self.onmessage = ({ data: { content, filename } }) => {
    try {
        self.postMessage({
            entries: prepareTypeDocumentation(content, filename),
        });
    } catch (error) {
        self.postMessage({ error: error?.message || String(error) });
    }
};
