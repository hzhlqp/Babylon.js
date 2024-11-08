/* eslint-disable import/no-internal-modules */
import * as postProcessLibrary from "post-processes/digitalRain/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in postProcessLibrary) {
        globalObject.BABYLON[key] = postProcessLibrary[key];
    }
}
export * from "post-processes/digitalRain/index";
//# sourceMappingURL=legacy-digitalRain.js.map