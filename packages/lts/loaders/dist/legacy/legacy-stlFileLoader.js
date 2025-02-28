/* eslint-disable import/no-internal-modules */
import * as Loaders from "loaders/STL/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in Loaders) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = Loaders[key];
        }
    }
}
export * from "loaders/STL/index";
//# sourceMappingURL=legacy-stlFileLoader.js.map