import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import type { Transcoder } from "./transcoder";
/**
 * @internal
 */
export declare class TranscoderManager {
    static _Transcoders: Array<typeof Transcoder>;
    static RegisterTranscoder(transcoder: typeof Transcoder): void;
    private static _TranscoderInstances;
    private _wasmMemoryManager;
    findTranscoder(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, isInGammaSpace: boolean, bypass?: string[]): Transcoder | null;
    private _getExistingTranscoder;
}
