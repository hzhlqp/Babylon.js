import type { IMaterial } from "babylonjs-gltf2interface";
import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
import { _Exporter } from "../glTFExporter";
import type { Material } from "core/Materials/material";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
/**
 * @internal
 */
export declare class KHR_materials_iridescence implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name = "KHR_materials_iridescence";
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: _Exporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}
