/* eslint-disable import/no-internal-modules */
import * as Serializers from "serializers/OBJ/index";
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
export * from "serializers/OBJ/index";
//# sourceMappingURL=legacy-objSerializer.js.map