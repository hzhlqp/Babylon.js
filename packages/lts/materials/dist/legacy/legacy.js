/* eslint-disable import/no-internal-modules */
import * as MatLib from "materials/index";
/**
 * Legacy support, defining window.BABYLON.GridMaterial... (global variable).
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    for (var mat in MatLib) {
        globalObject.BABYLON[mat] = MatLib[mat];
    }
}
export * from "materials/index";
//# sourceMappingURL=legacy.js.map