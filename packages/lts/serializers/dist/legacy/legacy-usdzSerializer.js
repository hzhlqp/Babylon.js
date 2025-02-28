/* eslint-disable import/no-internal-modules */
import * as Serializers from "serializers/USDZ/index";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in Serializers) {
        globalObject.BABYLON[serializer] = Serializers[serializer];
    }
}
export * from "serializers/USDZ/index";
//# sourceMappingURL=legacy-usdzSerializer.js.map