import type { Nullable } from "core/types";
import type { Node } from "core/node";
import type { INode } from "babylonjs-gltf2interface";
import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
import { _Exporter } from "../glTFExporter";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
export declare class KHR_lights_punctual implements IGLTFExporterExtensionV2 {
    /** The name of this extension. */
    readonly name = "KHR_lights_punctual";
    /** Defines whether this extension is enabled. */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    /** Reference to the glTF exporter */
    private _exporter;
    private _lights;
    /**
     * @internal
     */
    constructor(exporter: _Exporter);
    /** @internal */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /** @internal */
    onExporting(): void;
    /**
     * Define this method to modify the default behavior when exporting a node
     * @param context The context when exporting the node
     * @param node glTF node
     * @param babylonNode BabylonJS node
     * @param nodeMap Node mapping of unique id to glTF node index
     * @returns nullable INode promise
     */
    postExportNodeAsync(context: string, node: Nullable<INode>, babylonNode: Node, nodeMap: {
        [key: number]: number;
    }): Promise<Nullable<INode>>;
}
