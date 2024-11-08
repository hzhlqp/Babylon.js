import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { WASMMemoryManager } from "./wasmMemoryManager";
/**
 * @internal
 */
export class TranscoderManager {
    static RegisterTranscoder(transcoder) {
        TranscoderManager._Transcoders.push(transcoder);
    }
    findTranscoder(src, dst, isInGammaSpace, bypass) {
        let transcoder = null;
        const key = KTX2.SourceTextureFormat[src] + "_" + KTX2.TranscodeTarget[dst];
        for (let i = 0; i < TranscoderManager._Transcoders.length; ++i) {
            if (TranscoderManager._Transcoders[i].CanTranscode(src, dst, isInGammaSpace) && (!bypass || bypass.indexOf(TranscoderManager._Transcoders[i].Name) < 0)) {
                transcoder = this._getExistingTranscoder(key, TranscoderManager._Transcoders[i].Name);
                if (!transcoder) {
                    transcoder = new TranscoderManager._Transcoders[i]();
                    transcoder.initialize();
                    if (transcoder.needMemoryManager()) {
                        if (!this._wasmMemoryManager) {
                            this._wasmMemoryManager = new WASMMemoryManager();
                        }
                        transcoder.setMemoryManager(this._wasmMemoryManager);
                    }
                    if (!TranscoderManager._TranscoderInstances[key]) {
                        TranscoderManager._TranscoderInstances[key] = [];
                    }
                    TranscoderManager._TranscoderInstances[key].push(transcoder);
                }
                break;
            }
        }
        return transcoder;
    }
    _getExistingTranscoder(key, transcoderName) {
        const transcoders = TranscoderManager._TranscoderInstances[key];
        if (transcoders) {
            for (let t = 0; t < transcoders.length; ++t) {
                const transcoder = transcoders[t];
                if (transcoderName === transcoder.getName()) {
                    return transcoder;
                }
            }
        }
        return null;
    }
}
TranscoderManager._Transcoders = [];
TranscoderManager._TranscoderInstances = {};
//# sourceMappingURL=transcoderManager.js.map