import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { LiteTranscoder } from "./liteTranscoder";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class LiteTranscoder_UASTC_BC7 extends LiteTranscoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === KTX2.SourceTextureFormat.UASTC4x4 && dst === KTX2.TranscodeTarget.BC7_RGBA;
    }
    getName() {
        return LiteTranscoder_UASTC_BC7.Name;
    }
    initialize() {
        super.initialize();
        this.setModulePath(LiteTranscoder_UASTC_BC7.WasmModuleURL, LiteTranscoder_UASTC_BC7.WasmBinary);
    }
}
/**
 * URL to use when loading the wasm module for the transcoder
 */
LiteTranscoder_UASTC_BC7.WasmModuleURL = "https://cdn.babylonjs.com/ktx2Transcoders/1/uastc_bc7.wasm";
/**
 * Binary data of the wasm module
 */
LiteTranscoder_UASTC_BC7.WasmBinary = null;
LiteTranscoder_UASTC_BC7.Name = "UniversalTranscoder_UASTC_BC7";
//# sourceMappingURL=liteTranscoder_UASTC_BC7.js.map