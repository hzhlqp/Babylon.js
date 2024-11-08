import type { Nullable } from "core/types";
import type { Camera } from "core/Cameras/camera";
import type { PostProcessOptions } from "core/PostProcesses/postProcess";
import { PostProcess } from "core/PostProcesses/postProcess";
import "core/Rendering/geometryBufferRendererSceneComponent";
import { Color3 } from "core/Maths/math.color";
import type { Scene } from "core/scene";
import "./edgeDetection.fragment";
/**
 * The Edge Detection effect highlights the edges of objects in the scene like a toon.
 * This can be used for stylized rendering, outlining, or visual effects that require edge enhancement.
 */
export declare class EdgeDetectionPostProcess extends PostProcess {
    /**
     * Defines the color of the detected edges.
     */
    edgeColor: Color3;
    /**
     * Defines the intensity of the detected edges.
     * Higher values result in more pronounced edges.
     * default: 0.2  (min:0, max:1)
     */
    edgeIntensity: number;
    /**
     * Defines the width of the detected edges.
     * Higher values result in thicker edges.
     * default: 0.2 (min:0.125, max:1)
     */
    edgeWidth: number;
    /**
     * Defines the render mode.
     * default: 0
     * 0: general, 1: normal, 2: depth, 3: outline only
     */
    renderMode: number;
    private _geometryBufferRenderer;
    /**
     * Get the current class name of the current effect
     * @returns "EdgeDetectionPostProcess"
     */
    getClassName(): string;
    /**
     * Creates a new instance of EdgeDetectionPostProcess.
     * @param name The name of the effect.
     * @param scene The scene where the edge detection post-process will be applied.
     * @param options The required width/height ratio or specific options for the post-process.
     * @param camera The camera to apply the post-process to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: TEXTURE_NEAREST_NEAREST)
     * @param reusable If the post-process can be reused on the same frame. (default: false)
     * @param textureType The type of textures used when performing the post-process. (default: TEXTURETYPE_HALF_FLOAT)
     */
    constructor(name: string, scene: Scene, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, reusable?: boolean, textureType?: number);
    /**
     * Support test.
     */
    static get IsSupported(): boolean;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): EdgeDetectionPostProcess;
}
