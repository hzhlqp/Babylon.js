import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
import type { Material } from "core/Materials/material";
import type { IMaterial } from "babylonjs-gltf2interface";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
 */
export declare class KHR_materials_emissive_strength implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name = "KHR_materials_emissive_strength";
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    /** Dispose */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    postExportMaterialAsync(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}
