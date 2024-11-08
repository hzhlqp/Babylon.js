/* eslint-disable import/no-internal-modules */
import { GUIEditor } from "../index";
const globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    globalObject.BABYLON.GuiEditor = GUIEditor;
    globalObject.BABYLON.GUIEditor = GUIEditor;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    globalObject.GUIEDITOR = { GUIEditor };
}
export * from "../index";
//# sourceMappingURL=legacy.js.map