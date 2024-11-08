/* eslint-disable @typescript-eslint/naming-convention */
import { Transcoder } from "./transcoder";
let init;
let instance;
let heap;
const IMPORT_OBJECT = {
    env: {
        emscripten_notify_memory_growth: function () {
            heap = new Uint8Array(instance.exports.memory.buffer);
        },
    },
};
/**
 * ZSTD (Zstandard) decoder.
 */
export class ZSTDDecoder {
    init() {
        if (init) {
            return init;
        }
        if (typeof fetch !== "undefined") {
            // Web.
            init = fetch(Transcoder.GetWasmUrl(ZSTDDecoder.WasmModuleURL))
                .then((response) => {
                if (response.ok) {
                    return response.arrayBuffer();
                }
                throw new Error(`Could not fetch the wasm component for the Zstandard decompression lib: ${response.status} - ${response.statusText}`);
            })
                .then((arrayBuffer) => WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT))
                .then(this._init);
        }
        else {
            // Node.js.
            init = WebAssembly.instantiateStreaming(fetch(ZSTDDecoder.WasmModuleURL), IMPORT_OBJECT).then(this._init);
        }
        return init;
    }
    _init(result) {
        instance = result.instance;
        IMPORT_OBJECT.env.emscripten_notify_memory_growth(); // initialize heap.
    }
    decode(array, uncompressedSize = 0) {
        if (!instance) {
            throw new Error(`ZSTDDecoder: Await .init() before decoding.`);
        }
        // Write compressed data into WASM memory.
        const compressedSize = array.byteLength;
        const compressedPtr = instance.exports.malloc(compressedSize);
        heap.set(array, compressedPtr);
        // Decompress into WASM memory.
        uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
        const uncompressedPtr = instance.exports.malloc(uncompressedSize);
        const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
        // Read decompressed data and free WASM memory.
        const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
        instance.exports.free(compressedPtr);
        instance.exports.free(uncompressedPtr);
        return dec;
    }
}
ZSTDDecoder.WasmModuleURL = "https://cdn.babylonjs.com/zstddec.wasm";
/**
 * BSD License
 *
 * For Zstandard software
 *
 * Copyright (c) 2016-present, Yann Collet, Facebook, Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 *  * Neither the name Facebook nor the names of its contributors may be used to
 *    endorse or promote products derived from this software without specific
 *    prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
//# sourceMappingURL=zstddec.js.map