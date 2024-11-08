/* eslint-disable import/no-internal-modules */
import * as INSPECTOR from "../index";
const globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    globalObject.BABYLON.Inspector = INSPECTOR.Inspector;
    globalObject.INSPECTOR = INSPECTOR;
}
export * from "../index";
//# sourceMappingURL=legacy.js.map