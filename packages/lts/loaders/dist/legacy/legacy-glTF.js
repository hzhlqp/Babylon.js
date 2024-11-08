import * as FileLoader from "loaders/glTF/glTFFileLoader";
import * as Validation from "loaders/glTF/glTFValidation";
/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    for (var key in FileLoader) {
        globalObject.BABYLON[key] = FileLoader[key];
    }
    for (var key in Validation) {
        globalObject.BABYLON[key] = Validation[key];
    }
}
export * from "loaders/glTF/glTFFileLoader";
export * from "loaders/glTF/glTFValidation";
//# sourceMappingURL=legacy-glTF.js.map