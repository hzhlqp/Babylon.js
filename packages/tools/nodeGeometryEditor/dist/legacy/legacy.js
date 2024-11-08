/* eslint-disable import/no-internal-modules */
import { NodeGeometryEditor } from "../index";
const globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    globalObject.BABYLON.NodeGeometryEditor = NodeGeometryEditor;
}
export * from "../index";
//# sourceMappingURL=legacy.js.map