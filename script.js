import { init, setupListeners } from "./dom.js";

function main() {
    init();
    setupListeners();
}

document.addEventListener('DOMContentLoaded', () => {
    main();
});