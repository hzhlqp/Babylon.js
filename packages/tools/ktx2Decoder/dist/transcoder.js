/**
 * @internal
 */
export class Transcoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return false;
    }
    static GetWasmUrl(wasmUrl) {
        if (Transcoder.WasmBaseUrl && wasmUrl.startsWith("https://cdn.babylonjs.com/")) {
            wasmUrl = wasmUrl.replace("https://cdn.babylonjs.com/", Transcoder.WasmBaseUrl);
        }
        return wasmUrl;
    }
    getName() {
        return Transcoder.Name;
    }
    initialize() { }
    needMemoryManager() {
        return false;
    }
    setMemoryManager(memoryMgr) { }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return Promise.resolve(null);
    }
}
Transcoder.Name = "Transcoder";
Transcoder.WasmBaseUrl = "";
//# sourceMappingURL=transcoder.js.map