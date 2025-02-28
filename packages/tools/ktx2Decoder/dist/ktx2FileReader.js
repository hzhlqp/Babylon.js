/* eslint-disable @typescript-eslint/naming-convention */
import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
import { DataReader } from "./Misc/dataReader";
/** @internal */
export var SupercompressionScheme;
(function (SupercompressionScheme) {
    SupercompressionScheme[SupercompressionScheme["None"] = 0] = "None";
    SupercompressionScheme[SupercompressionScheme["BasisLZ"] = 1] = "BasisLZ";
    SupercompressionScheme[SupercompressionScheme["ZStandard"] = 2] = "ZStandard";
    SupercompressionScheme[SupercompressionScheme["ZLib"] = 3] = "ZLib";
})(SupercompressionScheme || (SupercompressionScheme = {}));
var DFDModel;
(function (DFDModel) {
    DFDModel[DFDModel["ETC1S"] = 163] = "ETC1S";
    DFDModel[DFDModel["UASTC"] = 166] = "UASTC";
})(DFDModel || (DFDModel = {}));
var DFDChannel_ETC1S;
(function (DFDChannel_ETC1S) {
    DFDChannel_ETC1S[DFDChannel_ETC1S["RGB"] = 0] = "RGB";
    DFDChannel_ETC1S[DFDChannel_ETC1S["RRR"] = 3] = "RRR";
    DFDChannel_ETC1S[DFDChannel_ETC1S["GGG"] = 4] = "GGG";
    DFDChannel_ETC1S[DFDChannel_ETC1S["AAA"] = 15] = "AAA";
})(DFDChannel_ETC1S || (DFDChannel_ETC1S = {}));
var DFDChannel_UASTC;
(function (DFDChannel_UASTC) {
    DFDChannel_UASTC[DFDChannel_UASTC["RGB"] = 0] = "RGB";
    DFDChannel_UASTC[DFDChannel_UASTC["RGBA"] = 3] = "RGBA";
    DFDChannel_UASTC[DFDChannel_UASTC["RRR"] = 4] = "RRR";
    DFDChannel_UASTC[DFDChannel_UASTC["RRRG"] = 5] = "RRRG";
})(DFDChannel_UASTC || (DFDChannel_UASTC = {}));
var DFDTransferFunction;
(function (DFDTransferFunction) {
    DFDTransferFunction[DFDTransferFunction["linear"] = 1] = "linear";
    DFDTransferFunction[DFDTransferFunction["sRGB"] = 2] = "sRGB";
})(DFDTransferFunction || (DFDTransferFunction = {}));
export class KTX2FileReader {
    /**
     * Will throw an exception if the file can't be parsed
     * @param data
     */
    constructor(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
    get header() {
        return this._header;
    }
    get levels() {
        return this._levels;
    }
    get dfdBlock() {
        return this._dfdBlock;
    }
    get supercompressionGlobalData() {
        return this._supercompressionGlobalData;
    }
    isValid() {
        return KTX2FileReader.IsValid(this._data);
    }
    parse() {
        let offsetInFile = 12; // skip the header
        /**
         * Get the header
         */
        const hdrReader = new DataReader(this._data, offsetInFile, 17 * 4);
        const header = (this._header = {
            vkFormat: hdrReader.readUint32(),
            typeSize: hdrReader.readUint32(),
            pixelWidth: hdrReader.readUint32(),
            pixelHeight: hdrReader.readUint32(),
            pixelDepth: hdrReader.readUint32(),
            layerCount: hdrReader.readUint32(),
            faceCount: hdrReader.readUint32(),
            levelCount: hdrReader.readUint32(),
            supercompressionScheme: hdrReader.readUint32(),
            dfdByteOffset: hdrReader.readUint32(),
            dfdByteLength: hdrReader.readUint32(),
            kvdByteOffset: hdrReader.readUint32(),
            kvdByteLength: hdrReader.readUint32(),
            sgdByteOffset: hdrReader.readUint64(),
            sgdByteLength: hdrReader.readUint64(),
        });
        if (header.pixelDepth > 0) {
            throw new Error(`Failed to parse KTX2 file - Only 2D textures are currently supported.`);
        }
        if (header.layerCount > 1) {
            throw new Error(`Failed to parse KTX2 file - Array textures are not currently supported.`);
        }
        if (header.faceCount > 1) {
            throw new Error(`Failed to parse KTX2 file - Cube textures are not currently supported.`);
        }
        offsetInFile += hdrReader.byteOffset;
        /**
         * Get the levels
         */
        let levelCount = Math.max(1, header.levelCount);
        const levelReader = new DataReader(this._data, offsetInFile, levelCount * 3 * (2 * 4));
        const levels = (this._levels = []);
        while (levelCount--) {
            levels.push({
                byteOffset: levelReader.readUint64(),
                byteLength: levelReader.readUint64(),
                uncompressedByteLength: levelReader.readUint64(),
            });
        }
        offsetInFile += levelReader.byteOffset;
        /**
         * Get the data format descriptor (DFD) blocks
         */
        const dfdReader = new DataReader(this._data, header.dfdByteOffset, header.dfdByteLength);
        const dfdBlock = (this._dfdBlock = {
            vendorId: dfdReader.skipBytes(4 /* skip totalSize */).readUint16(),
            descriptorType: dfdReader.readUint16(),
            versionNumber: dfdReader.readUint16(),
            descriptorBlockSize: dfdReader.readUint16(),
            colorModel: dfdReader.readUint8(),
            colorPrimaries: dfdReader.readUint8(),
            transferFunction: dfdReader.readUint8(),
            flags: dfdReader.readUint8(),
            texelBlockDimension: {
                x: dfdReader.readUint8() + 1,
                y: dfdReader.readUint8() + 1,
                z: dfdReader.readUint8() + 1,
                w: dfdReader.readUint8() + 1,
            },
            bytesPlane: [
                dfdReader.readUint8() /* bytesPlane0 */,
                dfdReader.readUint8() /* bytesPlane1 */,
                dfdReader.readUint8() /* bytesPlane2 */,
                dfdReader.readUint8() /* bytesPlane3 */,
                dfdReader.readUint8() /* bytesPlane4 */,
                dfdReader.readUint8() /* bytesPlane5 */,
                dfdReader.readUint8() /* bytesPlane6 */,
                dfdReader.readUint8() /* bytesPlane7 */,
            ],
            numSamples: 0,
            samples: new Array(),
        });
        dfdBlock.numSamples = (dfdBlock.descriptorBlockSize - 24) / 16;
        for (let i = 0; i < dfdBlock.numSamples; i++) {
            const sample = {
                bitOffset: dfdReader.readUint16(),
                bitLength: dfdReader.readUint8() + 1,
                channelType: dfdReader.readUint8(),
                channelFlags: 0,
                samplePosition: [
                    dfdReader.readUint8() /* samplePosition0 */,
                    dfdReader.readUint8() /* samplePosition1 */,
                    dfdReader.readUint8() /* samplePosition2 */,
                    dfdReader.readUint8() /* samplePosition3 */,
                ],
                sampleLower: dfdReader.readUint32(),
                sampleUpper: dfdReader.readUint32(),
            };
            sample.channelFlags = (sample.channelType & 0xf0) >> 4;
            sample.channelType = sample.channelType & 0x0f;
            dfdBlock.samples.push(sample);
        }
        /**
         * Get the Supercompression Global Data (sgd)
         */
        const sgd = (this._supercompressionGlobalData = {});
        if (header.sgdByteLength > 0) {
            const sgdReader = new DataReader(this._data, header.sgdByteOffset, header.sgdByteLength);
            sgd.endpointCount = sgdReader.readUint16();
            sgd.selectorCount = sgdReader.readUint16();
            sgd.endpointsByteLength = sgdReader.readUint32();
            sgd.selectorsByteLength = sgdReader.readUint32();
            sgd.tablesByteLength = sgdReader.readUint32();
            sgd.extendedByteLength = sgdReader.readUint32();
            sgd.imageDescs = [];
            const imageCount = this._getImageCount();
            for (let i = 0; i < imageCount; i++) {
                sgd.imageDescs.push({
                    imageFlags: sgdReader.readUint32(),
                    rgbSliceByteOffset: sgdReader.readUint32(),
                    rgbSliceByteLength: sgdReader.readUint32(),
                    alphaSliceByteOffset: sgdReader.readUint32(),
                    alphaSliceByteLength: sgdReader.readUint32(),
                });
            }
            const endpointsByteOffset = header.sgdByteOffset + sgdReader.byteOffset;
            const selectorsByteOffset = endpointsByteOffset + sgd.endpointsByteLength;
            const tablesByteOffset = selectorsByteOffset + sgd.selectorsByteLength;
            const extendedByteOffset = tablesByteOffset + sgd.tablesByteLength;
            sgd.endpointsData = new Uint8Array(this._data.buffer, this._data.byteOffset + endpointsByteOffset, sgd.endpointsByteLength);
            sgd.selectorsData = new Uint8Array(this._data.buffer, this._data.byteOffset + selectorsByteOffset, sgd.selectorsByteLength);
            sgd.tablesData = new Uint8Array(this._data.buffer, this._data.byteOffset + tablesByteOffset, sgd.tablesByteLength);
            sgd.extendedData = new Uint8Array(this._data.buffer, this._data.byteOffset + extendedByteOffset, sgd.extendedByteLength);
        }
    }
    _getImageCount() {
        let layerPixelDepth = Math.max(this._header.pixelDepth, 1);
        for (let i = 1; i < this._header.levelCount; i++) {
            layerPixelDepth += Math.max(this._header.pixelDepth >> i, 1);
        }
        return Math.max(this._header.layerCount, 1) * this._header.faceCount * layerPixelDepth;
    }
    get textureFormat() {
        return this._dfdBlock.colorModel === 166 /* DFDModel.UASTC */ ? KTX2.SourceTextureFormat.UASTC4x4 : KTX2.SourceTextureFormat.ETC1S;
    }
    get hasAlpha() {
        const tformat = this.textureFormat;
        switch (tformat) {
            case KTX2.SourceTextureFormat.ETC1S:
                return (this._dfdBlock.numSamples === 2 &&
                    (this._dfdBlock.samples[0].channelType === 15 /* DFDChannel_ETC1S.AAA */ || this._dfdBlock.samples[1].channelType === 15 /* DFDChannel_ETC1S.AAA */));
            case KTX2.SourceTextureFormat.UASTC4x4:
                return this._dfdBlock.samples[0].channelType === 3 /* DFDChannel_UASTC.RGBA */;
        }
        return false;
    }
    get needZSTDDecoder() {
        return this._header.supercompressionScheme === SupercompressionScheme.ZStandard;
    }
    get isInGammaSpace() {
        return this._dfdBlock.transferFunction === 2 /* DFDTransferFunction.sRGB */;
    }
    static IsValid(data) {
        if (data.byteLength >= 12) {
            // '«', 'K', 'T', 'X', ' ', '2', '0', '»', '\r', '\n', '\x1A', '\n'
            const identifier = new Uint8Array(data.buffer, data.byteOffset, 12);
            if (identifier[0] === 0xab &&
                identifier[1] === 0x4b &&
                identifier[2] === 0x54 &&
                identifier[3] === 0x58 &&
                identifier[4] === 0x20 &&
                identifier[5] === 0x32 &&
                identifier[6] === 0x30 &&
                identifier[7] === 0xbb &&
                identifier[8] === 0x0d &&
                identifier[9] === 0x0a &&
                identifier[10] === 0x1a &&
                identifier[11] === 0x0a) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=ktx2FileReader.js.map