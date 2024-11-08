/* eslint-disable import/no-internal-modules */
import * as Exporters from "serializers/glTF/glTFFileExporter";
import * as Datas from "serializers/glTF/2.0/glTFData";
import * as Serializers from "serializers/glTF/2.0/glTFSerializer";
import * as Extensions from "serializers/glTF/2.0/Extensions/index";
import * as GLTF2 from "serializers/glTF/2.0/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    var BABYLON_1 = globalObject.BABYLON;
    BABYLON_1.GLTF2 = BABYLON_1.GLTF2 || {};
    BABYLON_1.GLTF2.Exporter = BABYLON_1.GLTF2.Exporter || {};
    BABYLON_1.GLTF2.Exporter.Extensions = BABYLON_1.GLTF2.Exporter.Extensions || {};
    var keys = [];
    for (var key in Exporters) {
        BABYLON_1[key] = Exporters[key];
        keys.push(key);
    }
    for (var key in Datas) {
        BABYLON_1[key] = Datas[key];
        keys.push(key);
    }
    for (var key in Serializers) {
        BABYLON_1[key] = Serializers[key];
        keys.push(key);
    }
    for (var key in Extensions) {
        BABYLON_1.GLTF2.Exporter.Extensions[key] = Extensions[key];
        keys.push(key);
    }
    for (var key in GLTF2) {
        // Prevent Reassignment.
        if (keys.indexOf(key) > -1) {
            continue;
        }
        BABYLON_1.GLTF2.Exporter[key] = GLTF2[key];
    }
}
export * from "serializers/glTF/glTFFileExporter";
export * from "serializers/glTF/2.0/index";
//# sourceMappingURL=legacy-glTF2Serializer.js.map