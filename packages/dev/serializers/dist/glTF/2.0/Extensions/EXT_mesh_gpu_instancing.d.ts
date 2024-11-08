import type { INode } from "babylonjs-gltf2interface";
import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
import type { _BinaryWriter } from "../glTFExporter";
import { _Exporter } from "../glTFExporter";
import type { Nullable } from "core/types";
import type { Node } from "core/node";
import "core/Meshes/thinInstanceMesh";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 */
export declare class EXT_mesh_gpu_instancing implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name = "EXT_mesh_gpu_instancing";
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
    /**
     * After node is exported
     * @param context the GLTF context when loading the asset
     * @param node the node exported
     * @param babylonNode the corresponding babylon node
     * @param nodeMap map from babylon node id to node index
     * @param binaryWriter binary writer
     * @returns nullable promise, resolves with the node
     */
    postExportNodeAsync(context: string, node: Nullable<INode>, babylonNode: Node, nodeMap: {
        [key: number]: number;
    }, binaryWriter: _BinaryWriter): Promise<Nullable<INode>>;
    private _buildAccessor;
}
