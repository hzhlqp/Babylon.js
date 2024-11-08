/**
 * @internal
 */
export declare class WASMMemoryManager {
    static LoadBinariesFromCurrentThread: boolean;
    static InitialMemoryPages: number;
    private static _RequestId;
    static LoadWASM(path: string): Promise<ArrayBuffer>;
    private _memory;
    private _numPages;
    private _memoryView;
    private _memoryViewByteLength;
    private _memoryViewOffset;
    constructor(initialMemoryPages?: number);
    get wasmMemory(): WebAssembly.Memory;
    getMemoryView(numPages: number, offset?: number, byteLength?: number): Uint8Array;
}
