/* eslint-disable import/no-internal-modules */
import * as MatLib from "materials/fur/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in MatLib) {
        globalObject.BABYLON[key] = MatLib[key];
    }
}
export * from "materials/fur/index";
//# sourceMappingURL=legacy-fur.js.map