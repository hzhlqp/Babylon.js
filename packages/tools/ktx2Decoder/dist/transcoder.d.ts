import type * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import type { WASMMemoryManager } from "./wasmMemoryManager";
import type { KTX2FileReader, IKTX2_ImageDesc } from "./ktx2FileReader";
/**
 * @internal
 */
export declare class Transcoder {
    static CanTranscode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, isInGammaSpace: boolean): boolean;
    static Name: string;
    static WasmBaseUrl: string;
    static GetWasmUrl(wasmUrl: string): string;
    getName(): string;
    initialize(): void;
    needMemoryManager(): boolean;
    setMemoryManager(memoryMgr: WASMMemoryManager): void;
    transcode(src: KTX2.SourceTextureFormat, dst: KTX2.TranscodeTarget, level: number, width: number, height: number, uncompressedByteLength: number, ktx2Reader: KTX2FileReader, imageDesc: IKTX2_ImageDesc | null, encodedData: Uint8Array): Promise<Uint8Array | null>;
}
