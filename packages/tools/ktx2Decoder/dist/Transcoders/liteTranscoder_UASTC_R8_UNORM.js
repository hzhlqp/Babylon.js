import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { LiteTranscoder } from "./liteTranscoder";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class LiteTranscoder_UASTC_R8_UNORM extends LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === KTX2.SourceTextureFormat.UASTC4x4 && dst === KTX2.TranscodeTarget.R8;
    }
    getName() {
        return LiteTranscoder_UASTC_R8_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL, LiteTranscoder_UASTC_R8_UNORM.WasmBinary);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 1);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL = "https://cdn.babylonjs.com/ktx2Transcoders/1/uastc_r8_unorm.wasm";
/**
 * Binary data of the wasm module
 */
LiteTranscoder_UASTC_R8_UNORM.WasmBinary = null;
LiteTranscoder_UASTC_R8_UNORM.Name = "UniversalTranscoder_UASTC_R8_UNORM";
//# sourceMappingURL=liteTranscoder_UASTC_R8_UNORM.js.map