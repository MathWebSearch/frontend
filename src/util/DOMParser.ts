import { DOMParser as DOMParserPolyfill } from "@xmldom/xmldom";

let DOMParser: typeof window.DOMParser;

if (process.browser) { // client-side => use the native
    DOMParser = window.DOMParser;
} else {
    DOMParser = DOMParserPolyfill;
}

export default DOMParser;