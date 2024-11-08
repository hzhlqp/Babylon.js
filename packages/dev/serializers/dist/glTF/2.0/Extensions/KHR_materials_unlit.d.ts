import type { IMaterial } from "babylonjs-gltf2interface";
import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
import type { Material } from "core/Materials/material";
/**
 * @internal
 */
export declare class KHR_materials_unlit implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name = "KHR_materials_unlit";
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    constructor();
    /** @internal */
    get wasUsed(): boolean;
    dispose(): void;
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}
