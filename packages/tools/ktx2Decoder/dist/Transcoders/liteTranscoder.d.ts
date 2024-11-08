import type * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { Transcoder } from "../transcoder";
import { WASMMemoryManager } from "../wasmMemoryManager";
import type { KTX2FileReader, IKTX2_ImageDesc } from "../ktx2FileReader";
/**
 * @internal
 */
export declare class LiteTranscoder extends Transcoder {
    private _modulePath;
    private _wasmBinary;
    private _modulePromise;
    private _memoryManager;
    protected _transcodeInPlace: boolean;
    private _instantiateWebAssembly;
    protected _loadModule(wasmBinary?: ArrayBuffer | null): Promise<{
        module: any;
    }>;
    protected get memoryManager(): WASMMemoryManager;
    protected setModulePath(modulePath: string, wasmBinary: ArrayBuffer | null): void;
    initialize(): void;
    needMemoryManager(): boolean;
    setMemoryManager(memoryMgr: WASMMemoryManager): void;
    transcode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, level: number, width: number, height: number, uncompressedByteLength: number, ktx2Reader: KTX2FileReader, imageDesc: IKTX2_ImageDesc | null, encodedData: Uint8Array): Promise<Uint8Array | null>;
    protected _prepareTranscoding(width: number, height: number, uncompressedByteLength: number, encodedData: Uint8Array, uncompressedNumComponents?: number): [Uint8Array, Uint8Array | null, number];
}
