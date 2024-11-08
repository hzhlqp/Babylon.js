import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { Transcoder } from "../transcoder";
import type { KTX2FileReader, IKTX2_ImageDesc } from "../ktx2FileReader";
/**
 * @internal
 */
export declare class MSCTranscoder extends Transcoder {
    /**
     * URL to use when loading the MSC transcoder
     */
    static JSModuleURL: string;
    /**
     * URL to use when loading the wasm module for the transcoder
     */
    static WasmModuleURL: string;
    /**
     * Binary data of the wasm module
     */
    static WasmBinary: ArrayBuffer | null;
    /**
     * MSC transcoder module, if provided externally
     */
    static JSModule: any;
    static UseFromWorkerThread: boolean;
    static Name: string;
    getName(): string;
    private _mscBasisTranscoderPromise;
    private _mscBasisModule;
    private _getMSCBasisTranscoder;
    static CanTranscode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, isInGammaSpace: boolean): boolean;
    transcode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, level: number, width: number, height: number, uncompressedByteLength: number, ktx2Reader: KTX2FileReader, imageDesc: IKTX2_ImageDesc | null, encodedData: Uint8Array): Promise<Uint8Array | null>;
}
