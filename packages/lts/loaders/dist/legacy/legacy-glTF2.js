/* eslint-disable import/no-internal-modules */
import * as Extensions from "loaders/glTF/2.0/Extensions/index";
import * as Interfaces from "loaders/glTF/2.0/glTFLoaderInterfaces";
import * as GLTF2 from "loaders/glTF/2.0/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    var BABYLON_1 = globalObject.BABYLON;
    BABYLON_1.GLTF2 = BABYLON_1.GLTF2 || {};
    BABYLON_1.GLTF2.Loader = BABYLON_1.GLTF2.Loader || {};
    BABYLON_1.GLTF2.Loader.Extensions = BABYLON_1.GLTF2.Loader.Extensions || {};
    var keys = [];
    for (var key in Extensions) {
        BABYLON_1.GLTF2.Loader.Extensions[key] = Extensions[key];
        keys.push(key);
    }
    for (var key in Interfaces) {
        BABYLON_1.GLTF2.Loader[key] = Interfaces[key];
        keys.push(key);
    }
    for (var key in GLTF2) {
        // Prevent Reassignment.
        if (keys.indexOf(key) > -1) {
            continue;
        }
        BABYLON_1.GLTF2[key] = GLTF2[key];
    }
}
export { GLTF2 };
//# sourceMappingURL=legacy-glTF2.js.map