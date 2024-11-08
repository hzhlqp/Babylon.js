import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
/** @internal */
export declare enum SupercompressionScheme {
    None = 0,
    BasisLZ = 1,
    ZStandard = 2,
    ZLib = 3
}
/** @internal */
export interface IKTX2_Header {
    vkFormat: number;
    typeSize: number;
    pixelWidth: number;
    pixelHeight: number;
    pixelDepth: number;
    layerCount: number;
    faceCount: number;
    levelCount: number;
    supercompressionScheme: number;
    dfdByteOffset: number;
    dfdByteLength: number;
    kvdByteOffset: number;
    kvdByteLength: number;
    sgdByteOffset: number;
    sgdByteLength: number;
}
/** @internal */
export interface IKTX2_Level {
    byteOffset: number;
    byteLength: number;
    uncompressedByteLength: number;
}
interface IKTX2_Sample {
    bitOffset: number;
    bitLength: number;
    channelType: number;
    channelFlags: number;
    samplePosition: number[];
    sampleLower: number;
    sampleUpper: number;
}
/** @internal */
export interface IKTX2_DFD {
    vendorId: number;
    descriptorType: number;
    versionNumber: number;
    descriptorBlockSize: number;
    colorModel: number;
    colorPrimaries: number;
    transferFunction: number;
    flags: number;
    texelBlockDimension: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    bytesPlane: Array<number>;
    numSamples: number;
    samples: Array<IKTX2_Sample>;
}
/** @internal */
export interface IKTX2_ImageDesc {
    imageFlags: number;
    rgbSliceByteOffset: number;
    rgbSliceByteLength: number;
    alphaSliceByteOffset: number;
    alphaSliceByteLength: number;
}
/** @internal */
export interface IKTX2_SupercompressionGlobalData {
    endpointCount?: number;
    selectorCount?: number;
    endpointsByteLength?: number;
    selectorsByteLength?: number;
    tablesByteLength?: number;
    extendedByteLength?: number;
    imageDescs?: Array<IKTX2_ImageDesc>;
    endpointsData?: Uint8Array;
    selectorsData?: Uint8Array;
    tablesData?: Uint8Array;
    extendedData?: Uint8Array;
}
export declare class KTX2FileReader {
    private _data;
    private _header;
    private _levels;
    private _dfdBlock;
    private _supercompressionGlobalData;
    /**
     * Will throw an exception if the file can't be parsed
     * @param data
     */
    constructor(data: Uint8Array);
    get data(): Uint8Array;
    get header(): IKTX2_Header;
    get levels(): Array<IKTX2_Level>;
    get dfdBlock(): IKTX2_DFD;
    get supercompressionGlobalData(): IKTX2_SupercompressionGlobalData;
    isValid(): boolean;
    parse(): void;
    private _getImageCount;
    get textureFormat(): KTX2.SourceTextureFormat;
    get hasAlpha(): boolean;
    get needZSTDDecoder(): boolean;
    get isInGammaSpace(): boolean;
    static IsValid(data: ArrayBufferView): boolean;
}
export {};
