/* eslint-disable import/no-internal-modules */
import * as GUI from "gui/index";
/**
 * Legacy support, defining window.BABYLON.GUI (global variable).
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    if (!globalObject.BABYLON.GUI) {
        globalObject.BABYLON.GUI = GUI;
    }
}
export * from "gui/index";
//# sourceMappingURL=legacy.js.map