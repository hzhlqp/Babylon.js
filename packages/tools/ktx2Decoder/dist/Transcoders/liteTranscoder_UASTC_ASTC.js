import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { LiteTranscoder } from "./liteTranscoder";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class LiteTranscoder_UASTC_ASTC extends LiteTranscoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === KTX2.SourceTextureFormat.UASTC4x4 && dst === KTX2.TranscodeTarget.ASTC_4X4_RGBA;
    }
    getName() {
        return LiteTranscoder_UASTC_ASTC.Name;
    }
    initialize() {
        super.initialize();
        this.setModulePath(LiteTranscoder_UASTC_ASTC.WasmModuleURL, LiteTranscoder_UASTC_ASTC.WasmBinary);
    }
}
/**
 * URL to use when loading the wasm module for the transcoder
 */
LiteTranscoder_UASTC_ASTC.WasmModuleURL = "https://cdn.babylonjs.com/ktx2Transcoders/1/uastc_astc.wasm";
/**
 * Binary data of the wasm module
 */
LiteTranscoder_UASTC_ASTC.WasmBinary = null;
LiteTranscoder_UASTC_ASTC.Name = "UniversalTranscoder_UASTC_ASTC";
//# sourceMappingURL=liteTranscoder_UASTC_ASTC.js.map