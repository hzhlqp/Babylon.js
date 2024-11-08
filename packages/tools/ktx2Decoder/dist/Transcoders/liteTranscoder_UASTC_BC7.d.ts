import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { LiteTranscoder } from "./liteTranscoder";
/**
 * @internal
 */
export declare class LiteTranscoder_UASTC_BC7 extends LiteTranscoder {
    /**
     * URL to use when loading the wasm module for the transcoder
     */
    static WasmModuleURL: string;
    /**
     * Binary data of the wasm module
     */
    static WasmBinary: ArrayBuffer | null;
    static CanTranscode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, isInGammaSpace: boolean): boolean;
    static Name: string;
    getName(): string;
    initialize(): void;
}
