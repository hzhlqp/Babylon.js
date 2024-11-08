import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
export declare class TranscodeDecisionTree {
    private static _IsLeafNode;
    private _textureFormat;
    private _hasAlpha;
    private _isPowerOfTwo;
    private _caps;
    private _options;
    private _transcodeFormat;
    private _engineFormat;
    private _roundToMultiple4;
    get transcodeFormat(): number;
    get engineFormat(): number;
    get roundToMultiple4(): boolean;
    constructor(textureFormat: KTX2.SourceTextureFormat, hasAlpha: boolean, isPowerOfTwo: boolean, caps: KTX2.ICompressedFormatCapabilities, options?: KTX2.IKTX2DecoderOptions);
    parseTree(tree: KTX2.IDecisionTree): boolean;
    private _parseNode;
}
