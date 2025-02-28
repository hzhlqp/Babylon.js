/* eslint-disable import/no-internal-modules */
import * as GLTF1 from "loaders/glTF/1.0/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    globalObject.BABYLON.GLTF1 = globalObject.BABYLON.GLTF1 || {};
    for (var key in GLTF1) {
        globalObject.BABYLON.GLTF1[key] = GLTF1[key];
    }
}
export { GLTF1 };
//# sourceMappingURL=legacy-glTF1.js.map