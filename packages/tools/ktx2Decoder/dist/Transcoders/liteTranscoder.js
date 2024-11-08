import { Transcoder } from "../transcoder";
import { WASMMemoryManager } from "../wasmMemoryManager";
/**
 * @internal
 */
export class LiteTranscoder extends Transcoder {
    constructor() {
        super(...arguments);
        this._wasmBinary = null;
    }
    _instantiateWebAssembly(wasmBinary) {
        return WebAssembly.instantiate(wasmBinary, { env: { memory: this._memoryManager.wasmMemory } }).then((moduleWrapper) => {
            return { module: moduleWrapper.instance.exports };
        });
    }
    _loadModule(wasmBinary = this._wasmBinary) {
        this._modulePromise =
            this._modulePromise ||
                (wasmBinary ? Promise.resolve(wasmBinary) : WASMMemoryManager.LoadWASM(this._modulePath)).then((wasmBinary) => {
                    return this._instantiateWebAssembly(wasmBinary);
                });
        return this._modulePromise;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get memoryManager() {
        return this._memoryManager;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setModulePath(modulePath, wasmBinary) {
        this._modulePath = Transcoder.GetWasmUrl(modulePath);
        this._wasmBinary = wasmBinary;
    }
    initialize() {
        this._transcodeInPlace = true;
    }
    needMemoryManager() {
        return true;
    }
    setMemoryManager(memoryMgr) {
        this._memoryManager = memoryMgr;
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [textureView, uncompressedTextureView, nBlocks] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData);
            return transcoder.transcode(nBlocks) === 0 ? (this._transcodeInPlace ? textureView.slice() : uncompressedTextureView.slice()) : null;
        });
    }
    _prepareTranscoding(width, height, uncompressedByteLength, encodedData, uncompressedNumComponents) {
        const nBlocks = ((width + 3) >> 2) * ((height + 3) >> 2);
        if (uncompressedNumComponents !== undefined) {
            uncompressedByteLength = width * ((height + 3) >> 2) * 4 * uncompressedNumComponents;
        }
        const texMemoryPages = ((nBlocks * 16 + 65535 + (this._transcodeInPlace ? 0 : uncompressedByteLength)) >> 16) + 1;
        const textureView = this.memoryManager.getMemoryView(texMemoryPages, 65536, nBlocks * 16);
        const uncompressedTextureView = this._transcodeInPlace
            ? null
            : new Uint8Array(this._memoryManager.wasmMemory.buffer, 65536 + nBlocks * 16, uncompressedNumComponents !== undefined ? width * height * uncompressedNumComponents : uncompressedByteLength);
        textureView.set(encodedData);
        return [textureView, uncompressedTextureView, nBlocks];
    }
}
//# sourceMappingURL=liteTranscoder.js.map