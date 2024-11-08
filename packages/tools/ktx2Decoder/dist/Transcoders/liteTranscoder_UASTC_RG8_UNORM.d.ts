import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { LiteTranscoder } from "./liteTranscoder";
import type { KTX2FileReader, IKTX2_ImageDesc } from "../ktx2FileReader";
/**
 * @internal
 */
export declare class LiteTranscoder_UASTC_RG8_UNORM extends LiteTranscoder {
    /**
     * URL to use when loading the wasm module for the transcoder (unorm)
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
    transcode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, level: number, width: number, height: number, uncompressedByteLength: number, ktx2Reader: KTX2FileReader, imageDesc: IKTX2_ImageDesc | null, encodedData: Uint8Array): Promise<Uint8Array | null>;
}
