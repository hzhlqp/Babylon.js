/* eslint-disable import/no-internal-modules */
import * as proceduralTexture from "procedural-textures/wood/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in proceduralTexture) {
        globalObject.BABYLON[key] = proceduralTexture[key];
    }
}
export * from "procedural-textures/wood/index";
//# sourceMappingURL=legacy-wood.js.map