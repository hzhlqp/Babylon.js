import type { ITextureInfo, IMaterial, IMaterialPbrMetallicRoughness } from "babylonjs-gltf2interface";
import { ImageMimeType } from "babylonjs-gltf2interface";
import type { Nullable } from "core/types";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { _Exporter } from "./glTFExporter";
import type { Material } from "core/Materials/material";
import type { StandardMaterial } from "core/Materials/standardMaterial";
import type { PBRBaseMaterial } from "core/Materials/PBR/pbrBaseMaterial";
/**
 * Utility methods for working with glTF material conversion properties.  This class should only be used internally
 * @internal
 */
export declare class _GLTFMaterialExporter {
    /**
     * Represents the dielectric specular values for R, G and B
     */
    private static readonly _DielectricSpecular;
    /**
     * Allows the maximum specular power to be defined for material calculations
     */
    private static readonly _MaxSpecularPower;
    /**
     * Mapping to store textures
     */
    private _textureMap;
    private _internalTextureToImage;
    /**
     * Numeric tolerance value
     */
    private static readonly _Epsilon;
    /**
     * Reference to the glTF Exporter
     */
    private _exporter;
    constructor(exporter: _Exporter);
    /**
     * Specifies if two colors are approximately equal in value
     * @param color1 first color to compare to
     * @param color2 second color to compare to
     * @param epsilon threshold value
     * @returns boolean specifying if the colors are approximately equal in value
     */
    private static _FuzzyEquals;
    /**
     * Gets the materials from a Babylon scene and converts them to glTF materials
     * @param exportMaterials
     * @param mimeType texture mime type
     * @param hasTextureCoords specifies if texture coordinates are present on the material
     * @returns promise that resolves after all materials have been converted
     */
    _convertMaterialsToGLTFAsync(exportMaterials: Set<Material>, mimeType: ImageMimeType, hasTextureCoords: boolean): Promise<void>;
    /**
     * Makes a copy of the glTF material without the texture parameters
     * @param originalMaterial original glTF material
     * @returns glTF material without texture parameters
     */
    _stripTexturesFromMaterial(originalMaterial: IMaterial): IMaterial;
    /**
     * Specifies if the material has any texture parameters present
     * @param material glTF Material
     * @returns boolean specifying if texture parameters are present
     */
    _hasTexturesPresent(material: IMaterial): boolean;
    _getTextureInfo(babylonTexture: Nullable<BaseTexture>): Nullable<ITextureInfo>;
    /**
     * Converts a Babylon StandardMaterial to a glTF Metallic Roughness Material
     * @param babylonStandardMaterial
     * @returns glTF Metallic Roughness Material representation
     */
    _convertToGLTFPBRMetallicRoughness(babylonStandardMaterial: StandardMaterial): IMaterialPbrMetallicRoughness;
    /**
     * Computes the metallic factor
     * @param diffuse diffused value
     * @param specular specular value
     * @param oneMinusSpecularStrength one minus the specular strength
     * @returns metallic value
     */
    static _SolveMetallic(diffuse: number, specular: number, oneMinusSpecularStrength: number): number;
    /**
     * Sets the glTF alpha mode to a glTF material from the Babylon Material
     * @param glTFMaterial glTF material
     * @param babylonMaterial Babylon material
     */
    private static _SetAlphaMode;
    /**
     * Converts a Babylon Standard Material to a glTF Material
     * @param babylonStandardMaterial BJS Standard Material
     * @param mimeType mime type to use for the textures
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns promise, resolved with the material
     */
    _convertStandardMaterialAsync(babylonStandardMaterial: StandardMaterial, mimeType: ImageMimeType, hasTextureCoords: boolean): Promise<IMaterial>;
    private _finishMaterial;
    /**
     * Converts an image typed array buffer to a base64 image
     * @param buffer typed array buffer
     * @param width width of the image
     * @param height height of the image
     * @param mimeType mimetype of the image
     * @returns base64 image string
     */
    private _getImageDataAsync;
    /**
     * Generates a white texture based on the specified width and height
     * @param width width of the texture in pixels
     * @param height height of the texture in pixels
     * @param scene babylonjs scene
     * @returns white texture
     */
    private _createWhiteTexture;
    /**
     * Resizes the two source textures to the same dimensions.  If a texture is null, a default white texture is generated.  If both textures are null, returns null
     * @param texture1 first texture to resize
     * @param texture2 second texture to resize
     * @param scene babylonjs scene
     * @returns resized textures or null
     */
    private _resizeTexturesToSameDimensions;
    /**
     * Converts an array of pixels to a Float32Array
     * Throws an error if the pixel format is not supported
     * @param pixels - array buffer containing pixel values
     * @returns Float32 of pixels
     */
    private _convertPixelArrayToFloat32;
    /**
     * Convert Specular Glossiness Textures to Metallic Roughness
     * See link below for info on the material conversions from PBR Metallic/Roughness and Specular/Glossiness
     * @link https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/examples/convert-between-workflows-bjs/js/babylon.pbrUtilities.js
     * @param diffuseTexture texture used to store diffuse information
     * @param specularGlossinessTexture texture used to store specular and glossiness information
     * @param factors specular glossiness material factors
     * @param mimeType the mime type to use for the texture
     * @returns pbr metallic roughness interface or null
     */
    private _convertSpecularGlossinessTexturesToMetallicRoughnessAsync;
    /**
     * Converts specular glossiness material properties to metallic roughness
     * @param specularGlossiness interface with specular glossiness material properties
     * @returns interface with metallic roughness material properties
     */
    private _convertSpecularGlossinessToMetallicRoughness;
    /**
     * Calculates the surface reflectance, independent of lighting conditions
     * @param color Color source to calculate brightness from
     * @returns number representing the perceived brightness, or zero if color is undefined
     */
    private _getPerceivedBrightness;
    /**
     * Returns the maximum color component value
     * @param color
     * @returns maximum color component value, or zero if color is null or undefined
     */
    private _getMaxComponent;
    /**
     * Convert a PBRMaterial (Metallic/Roughness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param glTFPbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    private _convertMetalRoughFactorsToMetallicRoughnessAsync;
    private _getTextureSampler;
    private _getGLTFTextureWrapMode;
    /**
     * Convert a PBRMaterial (Specular/Glossiness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param pbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    private _convertSpecGlossFactorsToMetallicRoughnessAsync;
    /**
     * Converts a Babylon PBR Base Material to a glTF Material
     * @param babylonPBRMaterial BJS PBR Base Material
     * @param mimeType mime type to use for the textures
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns async glTF Material representation
     */
    _convertPBRMaterialAsync(babylonPBRMaterial: PBRBaseMaterial, mimeType: ImageMimeType, hasTextureCoords: boolean): Promise<IMaterial>;
    private _setMetallicRoughnessPbrMaterial;
    private _getPixelsFromTexture;
    /**
     * Extracts a texture from a Babylon texture into file data and glTF data
     * @param babylonTexture Babylon texture to extract
     * @param mimeType Mime Type of the babylonTexture
     * @returns glTF texture info, or null if the texture format is not supported
     */
    _exportTextureAsync(babylonTexture: BaseTexture, mimeType: ImageMimeType): Promise<Nullable<ITextureInfo>>;
    _exportTextureInfoAsync(babylonTexture: BaseTexture, mimeType: ImageMimeType): Promise<Nullable<ITextureInfo>>;
    private _exportImage;
    private _exportTextureInfo;
    private _exportTextureSampler;
}
