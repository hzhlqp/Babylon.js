import type { Mesh } from "core/Meshes/mesh";
import type { Scene } from "core/scene";
/**
 * Options for the USDZ export
 */
export interface IUSDZExportOptions {
    /**
     * URL to load the fflate library from
     */
    fflateUrl?: string;
    /**
     * Include anchoring properties in the USDZ file
     */
    includeAnchoringProperties?: boolean;
    /**
     * Anchoring type (plane by default)
     */
    anchoringType?: string;
    /**
     * Plane anchoring alignment (horizontal by default)
     */
    planeAnchoringAlignment?: string;
    /**
     * Model file name (model.usda by default)
     */
    modelFileName?: string;
    /**
     * Precision to use for number (5 by default)
     */
    precision?: number;
    /**
     * Export the camera (false by default)
     */
    exportCamera?: boolean;
    /**
     * Camera sensor width (35 by default)
     */
    cameraSensorWidth?: number;
}
/**
 *
 * @param scene scene to export
 * @param options options to configure the export
 * @param meshPredicate predicate to filter the meshes to export
 * @returns a uint8 array containing the USDZ file
 * #H2G5XW#3 - Simple sphere
 * #H2G5XW#4 - Red sphere
 * #5N3RWK#4 - Boombox
 */
export declare function USDZExportAsync(scene: Scene, options: Partial<IUSDZExportOptions>, meshPredicate?: (m: Mesh) => boolean): Promise<Uint8Array>;
