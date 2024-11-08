/* eslint-disable import/no-internal-modules */
import { KTX2Decoder } from "../index";
const globalObject = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.KTX2DECODER = KTX2Decoder;
}
export * from "../index";
//# sourceMappingURL=legacy.js.map