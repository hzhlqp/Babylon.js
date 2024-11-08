/* eslint-disable @typescript-eslint/naming-convention */
import * as KTX2 from "core/Materials/Textures/ktx2decoderTypes";
const DecisionTree = {
    ETC1S: {
        option: "forceRGBA",
        yes: {
            transcodeFormat: KTX2.TranscodeTarget.RGBA32,
            engineFormat: 32856 /* KTX2.EngineFormat.RGBA8Format */,
            roundToMultiple4: false,
        },
        no: {
            cap: "etc2",
            yes: {
                alpha: true,
                yes: {
                    transcodeFormat: KTX2.TranscodeTarget.ETC2_RGBA,
                    engineFormat: 37496 /* KTX2.EngineFormat.COMPRESSED_RGBA8_ETC2_EAC */,
                },
                no: {
                    transcodeFormat: KTX2.TranscodeTarget.ETC1_RGB,
                    engineFormat: 37492 /* KTX2.EngineFormat.COMPRESSED_RGB8_ETC2 */,
                },
            },
            no: {
                cap: "etc1",
                alpha: false,
                yes: {
                    transcodeFormat: KTX2.TranscodeTarget.ETC1_RGB,
                    engineFormat: 36196 /* KTX2.EngineFormat.COMPRESSED_RGB_ETC1_WEBGL */,
                },
                no: {
                    cap: "bptc",
                    yes: {
                        transcodeFormat: KTX2.TranscodeTarget.BC7_RGBA,
                        engineFormat: 36492 /* KTX2.EngineFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT */,
                    },
                    no: {
                        cap: "s3tc",
                        yes: {
                            alpha: true,
                            yes: {
                                transcodeFormat: KTX2.TranscodeTarget.BC3_RGBA,
                                engineFormat: 33779 /* KTX2.EngineFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT */,
                            },
                            no: {
                                transcodeFormat: KTX2.TranscodeTarget.BC1_RGB,
                                engineFormat: 33776 /* KTX2.EngineFormat.COMPRESSED_RGB_S3TC_DXT1_EXT */,
                            },
                        },
                        no: {
                            cap: "pvrtc",
                            needsPowerOfTwo: true,
                            yes: {
                                alpha: true,
                                yes: {
                                    transcodeFormat: KTX2.TranscodeTarget.PVRTC1_4_RGBA,
                                    engineFormat: 35842 /* KTX2.EngineFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG */,
                                },
                                no: {
                                    transcodeFormat: KTX2.TranscodeTarget.PVRTC1_4_RGB,
                                    engineFormat: 35840 /* KTX2.EngineFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG */,
                                },
                            },
                            no: {
                                transcodeFormat: KTX2.TranscodeTarget.RGBA32,
                                engineFormat: 32856 /* KTX2.EngineFormat.RGBA8Format */,
                                roundToMultiple4: false,
                            },
                        },
                    },
                },
            },
        },
    },
    UASTC: {
        option: "forceRGBA",
        yes: {
            transcodeFormat: KTX2.TranscodeTarget.RGBA32,
            engineFormat: 32856 /* KTX2.EngineFormat.RGBA8Format */,
            roundToMultiple4: false,
        },
        no: {
            option: "forceR8",
            yes: {
                transcodeFormat: KTX2.TranscodeTarget.R8,
                engineFormat: 33321 /* KTX2.EngineFormat.R8Format */,
                roundToMultiple4: false,
            },
            no: {
                option: "forceRG8",
                yes: {
                    transcodeFormat: KTX2.TranscodeTarget.RG8,
                    engineFormat: 33323 /* KTX2.EngineFormat.RG8Format */,
                    roundToMultiple4: false,
                },
                no: {
                    cap: "astc",
                    yes: {
                        transcodeFormat: KTX2.TranscodeTarget.ASTC_4X4_RGBA,
                        engineFormat: 37808 /* KTX2.EngineFormat.COMPRESSED_RGBA_ASTC_4X4_KHR */,
                    },
                    no: {
                        cap: "bptc",
                        yes: {
                            transcodeFormat: KTX2.TranscodeTarget.BC7_RGBA,
                            engineFormat: 36492 /* KTX2.EngineFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT */,
                        },
                        no: {
                            option: "useRGBAIfASTCBC7NotAvailableWhenUASTC",
                            yes: {
                                transcodeFormat: KTX2.TranscodeTarget.RGBA32,
                                engineFormat: 32856 /* KTX2.EngineFormat.RGBA8Format */,
                                roundToMultiple4: false,
                            },
                            no: {
                                cap: "etc2",
                                yes: {
                                    alpha: true,
                                    yes: {
                                        transcodeFormat: KTX2.TranscodeTarget.ETC2_RGBA,
                                        engineFormat: 37496 /* KTX2.EngineFormat.COMPRESSED_RGBA8_ETC2_EAC */,
                                    },
                                    no: {
                                        transcodeFormat: KTX2.TranscodeTarget.ETC1_RGB,
                                        engineFormat: 37492 /* KTX2.EngineFormat.COMPRESSED_RGB8_ETC2 */,
                                    },
                                },
                                no: {
                                    cap: "etc1",
                                    yes: {
                                        transcodeFormat: KTX2.TranscodeTarget.ETC1_RGB,
                                        engineFormat: 36196 /* KTX2.EngineFormat.COMPRESSED_RGB_ETC1_WEBGL */,
                                    },
                                    no: {
                                        cap: "s3tc",
                                        yes: {
                                            alpha: true,
                                            yes: {
                                                transcodeFormat: KTX2.TranscodeTarget.BC3_RGBA,
                                                engineFormat: 33779 /* KTX2.EngineFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT */,
                                            },
                                            no: {
                                                transcodeFormat: KTX2.TranscodeTarget.BC1_RGB,
                                                engineFormat: 33776 /* KTX2.EngineFormat.COMPRESSED_RGB_S3TC_DXT1_EXT */,
                                            },
                                        },
                                        no: {
                                            cap: "pvrtc",
                                            needsPowerOfTwo: true,
                                            yes: {
                                                alpha: true,
                                                yes: {
                                                    transcodeFormat: KTX2.TranscodeTarget.PVRTC1_4_RGBA,
                                                    engineFormat: 35842 /* KTX2.EngineFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG */,
                                                },
                                                no: {
                                                    transcodeFormat: KTX2.TranscodeTarget.PVRTC1_4_RGB,
                                                    engineFormat: 35840 /* KTX2.EngineFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG */,
                                                },
                                            },
                                            no: {
                                                transcodeFormat: KTX2.TranscodeTarget.RGBA32,
                                                engineFormat: 32856 /* KTX2.EngineFormat.RGBA8Format */,
                                                roundToMultiple4: false,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
export class TranscodeDecisionTree {
    static _IsLeafNode(node) {
        return node.engineFormat !== undefined;
    }
    get transcodeFormat() {
        return this._transcodeFormat;
    }
    get engineFormat() {
        return this._engineFormat;
    }
    get roundToMultiple4() {
        return this._roundToMultiple4;
    }
    constructor(textureFormat, hasAlpha, isPowerOfTwo, caps, options) {
        this._textureFormat = textureFormat;
        this._hasAlpha = hasAlpha;
        this._isPowerOfTwo = isPowerOfTwo;
        this._caps = caps;
        this._options = options ?? {};
        this.parseTree(DecisionTree);
    }
    parseTree(tree) {
        const node = this._textureFormat === KTX2.SourceTextureFormat.UASTC4x4 ? tree.UASTC : tree.ETC1S;
        if (node) {
            this._parseNode(node);
        }
        return node !== undefined;
    }
    _parseNode(node) {
        if (!node) {
            return;
        }
        if (TranscodeDecisionTree._IsLeafNode(node)) {
            this._transcodeFormat = node.transcodeFormat;
            this._engineFormat = node.engineFormat;
            this._roundToMultiple4 = node.roundToMultiple4 ?? true;
        }
        else {
            let condition = true;
            if (node.cap !== undefined) {
                condition = condition && !!this._caps[node.cap];
            }
            if (node.option !== undefined) {
                condition = condition && !!this._options[node.option];
            }
            if (node.alpha !== undefined) {
                condition = condition && this._hasAlpha === node.alpha;
            }
            if (node.needsPowerOfTwo !== undefined) {
                condition = condition && this._isPowerOfTwo === node.needsPowerOfTwo;
            }
            if (node.transcodeFormat !== undefined) {
                if (Array.isArray(node.transcodeFormat)) {
                    condition = condition && node.transcodeFormat.indexOf(this._transcodeFormat) !== -1;
                }
                else {
                    condition = condition && node.transcodeFormat === this._transcodeFormat;
                }
            }
            this._parseNode(condition ? node.yes : node.no);
        }
    }
}
//# sourceMappingURL=transcodeDecisionTree.js.map