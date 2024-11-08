/**
 * Resources used for the implementation:
 *  - 3js KTX2 loader: https://github.com/mrdoob/three.js/blob/dfb5c23ce126ec845e4aa240599915fef5375797/examples/jsm/loaders/KTX2Loader.js
 *  - Universal Texture Transcoders: https://github.com/KhronosGroup/Universal-Texture-Transcoders
 *  - KTX2 specification: http://github.khronos.org/KTX-Specification/
 *  - KTX2 binaries to convert files: https://github.com/KhronosGroup/KTX-Software/releases
 *  - KTX specification: https://www.khronos.org/registry/DataFormat/specs/1.3/dataformat.1.3.html
 *  - KTX-Software: https://github.com/KhronosGroup/KTX-Software
 */
import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
/**
 * Class for decoding KTX2 files
 *
 */
export declare class KTX2Decoder {
    private _transcoderMgr;
    private _zstdDecoder;
    static DefaultDecoderOptions: KTX2.IKTX2DecoderOptions;
    constructor();
    decode(data: Uint8Array, caps: KTX2.ICompressedFormatCapabilities, options?: KTX2.IKTX2DecoderOptions): Promise<KTX2.IDecodedData>;
    private _decodeData;
}
