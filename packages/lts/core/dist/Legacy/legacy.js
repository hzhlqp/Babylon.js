/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-internal-modules */
import * as BABYLON from "core/index";
import * as DebugImport from "core/Debug/index";
/**
 * Legacy support, defining window.BABYLON (global variable).
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    var BABYLONGLOBAL = globalObject.BABYLON;
    if (!BABYLONGLOBAL.Debug) {
        BABYLONGLOBAL.Debug = BABYLONGLOBAL.Debug || {};
        for (var key in DebugImport) {
            if (!BABYLONGLOBAL.Debug[key]) {
                BABYLONGLOBAL.Debug[key] = DebugImport[key];
            }
        }
    }
    for (var key in BABYLON) {
        if (!BABYLONGLOBAL[key]) {
            BABYLONGLOBAL[key] = BABYLON[key];
        }
    }
}
export * from "core/index";
export var Debug = {
    AxesViewer: BABYLON.AxesViewer,
    BoneAxesViewer: BABYLON.BoneAxesViewer,
    PhysicsViewer: BABYLON.PhysicsViewer,
    SkeletonViewer: BABYLON.SkeletonViewer,
};
//# sourceMappingURL=legacy.js.map