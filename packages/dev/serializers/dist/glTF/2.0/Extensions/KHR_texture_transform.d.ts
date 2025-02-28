import type { ITextureInfo } from "babylonjs-gltf2interface";
import type { Texture } from "core/Materials/Textures/texture";
import type { Nullable } from "core/types";
import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
/**
 * @internal
 */
export declare class KHR_texture_transform implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name = "KHR_texture_transform";
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    /** Reference to the glTF exporter */
    private _wasUsed;
    constructor();
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportTexture?(context: string, textureInfo: ITextureInfo, babylonTexture: Texture): void;
    preExportTextureAsync(context: string, babylonTexture: Texture): Promise<Nullable<Texture>>;
}
