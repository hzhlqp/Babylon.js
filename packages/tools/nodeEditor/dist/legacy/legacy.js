/* eslint-disable import/no-internal-modules */
import { NodeEditor } from "../index";
const globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    globalObject.BABYLON.NodeEditor = NodeEditor;
}
export * from "../index";
//# sourceMappingURL=legacy.js.map