import type { Node } from "core/node";
import type { Scene } from "core/scene";
import type { Animation } from "core/Animations/animation";
import type { GLTFData } from "./glTFData";
/**
 * Holds a collection of exporter options and parameters
 */
export interface IExportOptions {
    /**
     * Function which indicates whether a babylon node should be exported or not
     * @param node source Babylon node. It is used to check whether it should be exported to glTF or not
     * @returns boolean, which indicates whether the node should be exported (true) or not (false)
     */
    shouldExportNode?(node: Node): boolean;
    /**
     * Function which indicates whether an animation on the scene should be exported or not
     * @param animation source animation
     * @returns boolean, which indicates whether the animation should be exported (true) or not (false)
     */
    shouldExportAnimation?(animation: Animation): boolean;
    /**
     * Function used to extract the part of node's metadata that will be exported into glTF node extras
     * @param metadata source metadata to read from
     * @returns the data to store to glTF node extras
     */
    metadataSelector?(metadata: any): any;
    /**
     * The sample rate to bake animation curves. Defaults to 1 / 60.
     */
    animationSampleRate?: number;
    /**
     * Begin serialization without waiting for the scene to be ready. Defaults to false.
     */
    exportWithoutWaitingForScene?: boolean;
    /**
     * Indicates if unused vertex uv attributes should be included in export. Defaults to false.
     */
    exportUnusedUVs?: boolean;
    /**
     * Remove no-op root nodes when possible. Defaults to true.
     */
    removeNoopRootNodes?: boolean;
    /**
     * Indicates if coordinate system swapping root nodes should be included in export. Defaults to false.
     * @deprecated Please use removeNoopRootNodes instead
     */
    includeCoordinateSystemConversionNodes?: boolean;
}
/**
 * Class for generating glTF data from a Babylon scene.
 */
export declare class GLTF2Export {
    /**
     * Exports the geometry of the scene to .gltf file format asynchronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating the glTF file
     * @param options Exporter options
     * @returns Returns an object with a .gltf file and associates texture names
     * as keys and their data and paths as values
     */
    static GLTFAsync(scene: Scene, filePrefix: string, options?: IExportOptions): Promise<GLTFData>;
    private static _PreExportAsync;
    private static _PostExportAsync;
    /**
     * Exports the geometry of the scene to .glb file format asychronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating glb file
     * @param options Exporter options
     * @returns Returns an object with a .glb filename as key and data as value
     */
    static GLBAsync(scene: Scene, filePrefix: string, options?: IExportOptions): Promise<GLTFData>;
}
