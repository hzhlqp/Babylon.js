import { CubeTexture } from "core/Materials/Textures/cubeTexture";
import { InternalTexture } from "core/Materials/Textures/internalTexture";
import { Texture } from "core/Materials/Textures/texture";
/**
 * WebGL Pixel Formats
 */
export var PixelFormat;
(function (PixelFormat) {
    PixelFormat[PixelFormat["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
    PixelFormat[PixelFormat["ALPHA"] = 6406] = "ALPHA";
    PixelFormat[PixelFormat["RGB"] = 6407] = "RGB";
    PixelFormat[PixelFormat["RGBA"] = 6408] = "RGBA";
    PixelFormat[PixelFormat["LUMINANCE"] = 6409] = "LUMINANCE";
    PixelFormat[PixelFormat["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
})(PixelFormat || (PixelFormat = {}));
/**
 * WebGL Pixel Types
 */
export var PixelType;
(function (PixelType) {
    PixelType[PixelType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    PixelType[PixelType["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
    PixelType[PixelType["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
    PixelType[PixelType["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
})(PixelType || (PixelType = {}));
/**
 * WebGL Texture Magnification Filter
 */
export var TextureMagFilter;
(function (TextureMagFilter) {
    TextureMagFilter[TextureMagFilter["NEAREST"] = 9728] = "NEAREST";
    TextureMagFilter[TextureMagFilter["LINEAR"] = 9729] = "LINEAR";
})(TextureMagFilter || (TextureMagFilter = {}));
/**
 * WebGL Texture Minification Filter
 */
export var TextureMinFilter;
(function (TextureMinFilter) {
    TextureMinFilter[TextureMinFilter["NEAREST"] = 9728] = "NEAREST";
    TextureMinFilter[TextureMinFilter["LINEAR"] = 9729] = "LINEAR";
    TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
    TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
    TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
    TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
})(TextureMinFilter || (TextureMinFilter = {}));
/**
 * WebGL Texture Wrap Modes
 */
export var TextureWrapMode;
(function (TextureWrapMode) {
    TextureWrapMode[TextureWrapMode["REPEAT"] = 10497] = "REPEAT";
    TextureWrapMode[TextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
    TextureWrapMode[TextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
})(TextureWrapMode || (TextureWrapMode = {}));
/**
 * A minimal WebGL cubemap descriptor
 */
export class TextureCube {
    /**
     * Returns the width of a face of the texture or 0 if not available
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get Width() {
        return this.source && this.source[0] && this.source[0][0] ? this.source[0][0].width : 0;
    }
    /**
     * Returns the height of a face of the texture or 0 if not available
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get Height() {
        return this.source && this.source[0] && this.source[0][0] ? this.source[0][0].height : 0;
    }
    /**
     * constructor
     * @param internalFormat WebGL pixel format for the texture on the GPU
     * @param type WebGL pixel type of the supplied data and texture on the GPU
     * @param source An array containing mipmap levels of faces, where each mipmap level is an array of faces and each face is a TextureSource object
     */
    constructor(internalFormat, type, source = []) {
        this.internalFormat = internalFormat;
        this.type = type;
        this.source = source;
    }
}
/**
 * A static class providing methods to aid working with Bablyon textures.
 */
export class TextureUtils {
    /**
     * Returns a BabylonCubeTexture instance from a Spectre texture cube, subject to sampling parameters.
     * If such a texture has already been requested in the past, this texture will be returned, otherwise a new one will be created.
     * The advantage of this is to enable working with texture objects without the need to initialize on the GPU until desired.
     * @param scene A Babylon Scene instance
     * @param textureCube A Spectre TextureCube object
     * @param automaticMipmaps Pass true to enable automatic mipmap generation where possible (requires power of images)
     * @param environment Specifies that the texture will be used as an environment
     * @param singleLod Specifies that the texture will be a singleLod (for environment)
     * @returns Babylon cube texture
     */
    static GetBabylonCubeTexture(scene, textureCube, automaticMipmaps, environment = false, singleLod = false) {
        if (!textureCube) {
            throw new Error("no texture cube provided");
        }
        let parameters;
        if (environment) {
            parameters = singleLod ? TextureUtils._EnvironmentSingleMipSampling : TextureUtils._EnvironmentSampling;
        }
        else {
            parameters = {
                magFilter: 9728 /* TextureMagFilter.NEAREST */,
                minFilter: 9728 /* TextureMinFilter.NEAREST */,
                wrapS: 33071 /* TextureWrapMode.CLAMP_TO_EDGE */,
                wrapT: 33071 /* TextureWrapMode.CLAMP_TO_EDGE */,
            };
        }
        const key = TextureUtils.BabylonTextureKeyPrefix + parameters.magFilter + "" + parameters.minFilter + "" + parameters.wrapS + "" + parameters.wrapT;
        let babylonTexture = textureCube[key];
        if (!babylonTexture) {
            //initialize babylon texture
            babylonTexture = new CubeTexture("", scene);
            if (environment) {
                babylonTexture.lodGenerationOffset = TextureUtils.EnvironmentLODOffset;
                babylonTexture.lodGenerationScale = TextureUtils.EnvironmentLODScale;
            }
            babylonTexture.gammaSpace = false;
            const internalTexture = new InternalTexture(scene.getEngine(), 8 /* InternalTextureSource.CubeRaw */);
            const glTexture = internalTexture._hardwareTexture?.underlyingResource;
            //babylon properties
            internalTexture.isCube = true;
            internalTexture.generateMipMaps = false;
            babylonTexture._texture = internalTexture;
            TextureUtils.ApplySamplingParameters(babylonTexture, parameters);
            const maxMipLevel = automaticMipmaps ? 0 : textureCube.source.length - 1;
            let texturesUploaded = 0;
            const textureComplete = function () {
                return texturesUploaded === (maxMipLevel + 1) * 6;
            };
            const uploadFace = function (i, level, face) {
                if (!glTexture) {
                    return;
                }
                if (i === 0 && level === 0) {
                    internalTexture.width = face.width;
                    internalTexture.height = face.height;
                }
                const gl = scene.getEngine()._gl;
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, glTexture);
                scene.getEngine()._unpackFlipY(false);
                if (face instanceof HTMLElement || face instanceof ImageData) {
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, textureCube.internalFormat, textureCube.internalFormat, textureCube.type, face);
                }
                else {
                    const textureData = face;
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, textureCube.internalFormat, textureData.width, textureData.height, 0, textureData.format, textureCube.type, textureData.data);
                }
                texturesUploaded++;
                if (textureComplete()) {
                    //generate mipmaps
                    if (automaticMipmaps) {
                        const w = face.width;
                        const h = face.height;
                        const isPot = (w !== 0 && w & (w - 1)) === 0 && (h !== 0 && h & (h - 1)) === 0;
                        if (isPot) {
                            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                        }
                    }
                    // Upload Separate lods in case there is no support for texture lod.
                    if (environment && !scene.getEngine().getCaps().textureLOD && !singleLod) {
                        const mipSlices = 3;
                        for (let i = 0; i < mipSlices; i++) {
                            const lodKey = TextureUtils.BabylonTextureKeyPrefix + "lod" + i;
                            let lod = textureCube[lodKey];
                            //initialize lod texture if it doesn't already exist
                            if (lod == null && textureCube.Width) {
                                //compute LOD from even spacing in smoothness (matching shader calculation)
                                const smoothness = i / (mipSlices - 1);
                                const roughness = 1 - smoothness;
                                const kMinimumVariance = 0.0005;
                                const alphaG = roughness * roughness + kMinimumVariance;
                                const microsurfaceAverageSlopeTexels = alphaG * textureCube.Width;
                                const environmentSpecularLOD = TextureUtils.EnvironmentLODScale * Math.log2(microsurfaceAverageSlopeTexels) + TextureUtils.EnvironmentLODOffset;
                                const maxLODIndex = textureCube.source.length - 1;
                                const mipmapIndex = Math.min(Math.max(Math.round(environmentSpecularLOD), 0), maxLODIndex);
                                lod = TextureUtils.GetBabylonCubeTexture(scene, new TextureCube(6408 /* PixelFormat.RGBA */, 5121 /* PixelType.UNSIGNED_BYTE */, [textureCube.source[mipmapIndex]]), false, true, true);
                                if (i === 0) {
                                    internalTexture._lodTextureLow = lod;
                                }
                                else if (i === 1) {
                                    internalTexture._lodTextureMid = lod;
                                }
                                else {
                                    internalTexture._lodTextureHigh = lod;
                                }
                                textureCube[lodKey] = lod;
                            }
                        }
                    }
                    internalTexture.isReady = true;
                }
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
                scene.getEngine().resetTextureCache();
            };
            for (let i = 0; i <= maxMipLevel; i++) {
                const faces = textureCube.source[i];
                for (let j = 0; j < faces.length; j++) {
                    const face = faces[j];
                    if (face instanceof HTMLImageElement && !face.complete) {
                        face.addEventListener("load", () => {
                            uploadFace(j, i, face);
                        }, false);
                    }
                    else {
                        uploadFace(j, i, face);
                    }
                }
            }
            scene.getEngine().resetTextureCache();
            babylonTexture.isReady = () => {
                return textureComplete();
            };
            textureCube[key] = babylonTexture;
        }
        return babylonTexture;
    }
    /**
     * Applies Spectre SamplingParameters to a Babylon texture by directly setting texture parameters on the internal WebGLTexture as well as setting Babylon fields
     * @param babylonTexture Babylon texture to apply texture to (requires the Babylon texture has an initialize _texture field)
     * @param parameters Spectre SamplingParameters to apply
     */
    static ApplySamplingParameters(babylonTexture, parameters) {
        const scene = babylonTexture.getScene();
        if (!scene) {
            return;
        }
        const gl = scene.getEngine()._gl;
        const target = babylonTexture.isCube ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;
        const internalTexture = babylonTexture._texture;
        if (!internalTexture) {
            return;
        }
        const glTexture = internalTexture._hardwareTexture?.underlyingResource;
        gl.bindTexture(target, glTexture);
        if (parameters.magFilter != null) {
            gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, parameters.magFilter);
        }
        if (parameters.minFilter != null) {
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, parameters.minFilter);
        }
        if (parameters.wrapS != null) {
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, parameters.wrapS);
        }
        if (parameters.wrapT != null) {
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, parameters.wrapT);
        }
        //set babylon wrap modes from sampling parameter
        switch (parameters.wrapS) {
            case 10497 /* TextureWrapMode.REPEAT */:
                babylonTexture.wrapU = Texture.WRAP_ADDRESSMODE;
                break;
            case 33071 /* TextureWrapMode.CLAMP_TO_EDGE */:
                babylonTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
                break;
            case 33648 /* TextureWrapMode.MIRRORED_REPEAT */:
                babylonTexture.wrapU = Texture.MIRROR_ADDRESSMODE;
                break;
            default:
                babylonTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
        }
        switch (parameters.wrapT) {
            case 10497 /* TextureWrapMode.REPEAT */:
                babylonTexture.wrapV = Texture.WRAP_ADDRESSMODE;
                break;
            case 33071 /* TextureWrapMode.CLAMP_TO_EDGE */:
                babylonTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
                break;
            case 33648 /* TextureWrapMode.MIRRORED_REPEAT */:
                babylonTexture.wrapV = Texture.MIRROR_ADDRESSMODE;
                break;
            default:
                babylonTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
        }
        if (parameters.maxAnisotropy != null && parameters.maxAnisotropy > 1) {
            const anisotropicExt = gl.getExtension("EXT_texture_filter_anisotropic");
            if (anisotropicExt) {
                const maxAnisotropicSamples = gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                const maxAnisotropy = Math.min(parameters.maxAnisotropy, maxAnisotropicSamples);
                gl.texParameterf(target, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, maxAnisotropy);
                babylonTexture.anisotropicFilteringLevel = maxAnisotropy;
            }
        }
        gl.bindTexture(target, null);
        scene.getEngine().resetTextureCache();
    }
}
/**
 * A prefix used when storing a babylon texture object reference on a Spectre texture object
 */
TextureUtils.BabylonTextureKeyPrefix = "__babylonTexture_";
/**
 * Controls anisotropic filtering for deserialized textures.
 */
TextureUtils.MaxAnisotropy = 4;
TextureUtils._EnvironmentSampling = {
    magFilter: 9729 /* TextureMagFilter.LINEAR */,
    minFilter: 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */,
    wrapS: 33071 /* TextureWrapMode.CLAMP_TO_EDGE */,
    wrapT: 33071 /* TextureWrapMode.CLAMP_TO_EDGE */,
    maxAnisotropy: 1,
};
TextureUtils._EnvironmentSingleMipSampling = {
    magFilter: 9729 /* TextureMagFilter.LINEAR */,
    minFilter: 9729 /* TextureMinFilter.LINEAR */,
    wrapS: 33071 /* TextureWrapMode.CLAMP_TO_EDGE */,
    wrapT: 33071 /* TextureWrapMode.CLAMP_TO_EDGE */,
    maxAnisotropy: 1,
};
//from "/Internal/Lighting.EnvironmentFilterScale" in Engine/*/Configuration.cpp
/**
 * Environment preprocessing dedicated value (Internal Use or Advanced only).
 */
TextureUtils.EnvironmentLODScale = 0.8;
/**
 * Environment preprocessing dedicated value (Internal Use or Advanced only)..
 */
TextureUtils.EnvironmentLODOffset = 1.0;
//# sourceMappingURL=texture.js.map