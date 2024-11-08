import type { Mesh } from "../../Meshes/mesh";
import type { Scene } from "../../scene";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import { Texture } from "../../Materials/Textures/texture";
import { PostProcessRenderPipeline } from "../../PostProcesses/RenderPipeline/postProcessRenderPipeline";
import type { Camera } from "core/Cameras/camera";
import { RawTexture } from "core/Materials/Textures/rawTexture";
import type { Material } from "core/Materials/material";
import { Observable } from "core/Misc/observable";
interface IblShadowsSettings {
    /**
     * The exponent of the resolution of the voxel shadow grid. Higher resolutions will result in sharper
     * shadows but are more expensive to compute and require more memory.
     * The resolution is calculated as 2 to the power of this number.
     */
    resolutionExp: number;
    /**
     * The number of different directions to sample during the voxel tracing pass. Higher
     * values will result in better quality, more stable shadows but are more expensive to compute.
     */
    sampleDirections: number;
    /**
     * How dark the shadows are. 1.0 is full opacity, 0.0 is no shadows.
     */
    shadowOpacity: number;
    /**
     * How long the shadows remain in the scene. 0.0 is no persistence, 1.0 is full persistence.
     */
    shadowRemenance: number;
    /**
     * Render the voxel grid from 3 different axis. This will result in better quality shadows with fewer
     * bits of missing geometry.
     */
    triPlanarVoxelization: boolean;
    /**
     * A multiplier for the render size of the shadows. Used for rendering lower-resolution shadows
     * to increase performance. Should be a value between 0 and 1.
     */
    shadowRenderSizeFactor: number;
    /**
     * Separate control for the opacity of the voxel shadows.
     */
    voxelShadowOpacity: number;
    /**
     * Include screen-space shadows in the IBL shadow pipeline. This adds sharp shadows to small details
     * but only applies close to a shadow-casting object.
     */
    ssShadowsEnabled: boolean;
    /**
     * The number of samples used in the screen space shadow pass.
     */
    ssShadowSampleCount: number;
    /**
     * The stride of the screen-space shadow pass. This controls the distance between samples.
     */
    ssShadowStride: number;
    /**
     * The maximum distance a shadow can be cast in screen space. This should usually be kept small
     * as screenspace shadows are mostly useful for small details.
     */
    ssShadowDistanceScale: number;
    /**
     * Screen-space shadow thickness. This value controls the perceived thickness of the SS shadows.
     */
    ssShadowThicknessScale: number;
}
/**
 * Voxel-based shadow rendering for IBL's.
 * This should not be instanciated directly, as it is part of a scene component
 */
export declare class IblShadowsRenderPipeline extends PostProcessRenderPipeline {
    /**
     * The scene that this pipeline is attached to
     */
    scene: Scene;
    private _allowDebugPasses;
    private _debugPasses;
    private _geometryBufferRenderer;
    private _shadowCastingMeshes;
    private _voxelRenderer;
    private _importanceSamplingRenderer;
    private _voxelTracingPass;
    private _spatialBlurPass;
    private _accumulationPass;
    private _noiseTexture;
    /**
     * Raw texture to be used before final data is available.
     * @internal
     */
    _dummyTexture2d: RawTexture;
    private _dummyTexture3d;
    private _shadowOpacity;
    private _enabled;
    private _materialsWithRenderPlugin;
    /**
     * Observable that triggers when the shadow renderer is ready
     */
    onShadowTextureReadyObservable: Observable<void>;
    /**
     * Observable that triggers when a new IBL is set and the importance sampling is ready
     */
    onNewIblReadyObservable: Observable<void>;
    /**
     * The current world-space size of that the voxel grid covers in the scene.
     */
    voxelGridSize: number;
    /**
     * Reset the shadow accumulation.
     */
    resetAccumulation(): void;
    /**
     * How dark the shadows appear. 1.0 is full opacity, 0.0 is no shadows.
     */
    get shadowOpacity(): number;
    set shadowOpacity(value: number);
    private _renderSizeFactor;
    /**
     * A multiplier for the render size of the shadows. Used for rendering lower-resolution shadows.
     */
    get shadowRenderSizeFactor(): number;
    set shadowRenderSizeFactor(value: number);
    /**
     * How dark the voxel shadows appear. 1.0 is full opacity, 0.0 is no shadows.
     */
    get voxelShadowOpacity(): number;
    set voxelShadowOpacity(value: number);
    /**
     * How dark the screen-space shadows appear. 1.0 is full opacity, 0.0 is no shadows.
     */
    get ssShadowOpacity(): number;
    set ssShadowOpacity(value: number);
    /**
     * The number of samples used in the screen space shadow pass.
     */
    get ssShadowSamples(): number;
    set ssShadowSamples(value: number);
    /**
     * The stride of the screen-space shadow pass. This controls the distance between samples.
     */
    get ssShadowStride(): number;
    set ssShadowStride(value: number);
    private _sssMaxDistScale;
    /**
     * A scale for the maximum distance a shadow can be cast in screen space.
     * The absolute distance for SS shadows is derived from the voxel size and this scalar.
     */
    get ssShadowDistanceScale(): number;
    set ssShadowDistanceScale(value: number);
    private _sssThicknessScale;
    /**
     * Screen-space shadow thickness. This value controls the perceived thickness of the SS shadows.
     */
    get ssShadowThicknessScale(): number;
    set ssShadowThicknessScale(value: number);
    /**
     * Set the IBL image to be used for shadowing. It can be either a cubemap
     * or a 2D equirectangular texture.
     * @param iblSource The texture to use for IBL shadowing
     */
    setIblTexture(iblSource: BaseTexture): void;
    /**
     * Returns the texture containing the voxel grid data
     * @returns The texture containing the voxel grid data
     * @internal
     */
    _getVoxelGridTexture(): Texture;
    /**
     * Returns the texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @returns The texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @internal
     */
    _getIcdfyTexture(): Texture;
    /**
     * Returns the texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @returns The texture containing the importance sampling CDF data for the IBL shadow pipeline
     * @internal
     */
    _getIcdfxTexture(): Texture;
    /**
     * Returns the noise texture.
     * @returns The noise texture.
     * @internal
     */
    _getNoiseTexture(): Texture;
    /**
     * Returns the voxel-tracing texture.
     * @returns The voxel-tracing texture.
     * @internal
     */
    _getVoxelTracingTexture(): Texture;
    /**
     * Returns the spatial blur texture.
     * @returns The spatial blur texture.
     * @internal
     */
    _getSpatialBlurTexture(): Texture;
    /**
     * Returns the accumulated shadow texture.
     * @returns The accumulated shadow texture.
     * @internal
     */
    _getAccumulatedTexture(): Texture;
    private _gbufferDebugPass;
    private _gbufferDebugEnabled;
    private _gBufferDebugSizeParams;
    /**
     * Is the debug view of the G-Buffer enabled?
     */
    get gbufferDebugEnabled(): boolean;
    /**
     * Turn on or off the debug view of the G-Buffer
     */
    set gbufferDebugEnabled(enabled: boolean);
    /**
     * Turn on or off the debug view of the CDF importance sampling data
     */
    get importanceSamplingDebugEnabled(): boolean;
    /**
     * Turn on or off the debug view of the CDF importance sampling data
     */
    set importanceSamplingDebugEnabled(enabled: boolean);
    /**
     * Turn on or off the debug view of the voxel grid
     */
    get voxelDebugEnabled(): boolean;
    /**
     * Turn on or off the debug view of the voxel grid
     */
    set voxelDebugEnabled(enabled: boolean);
    /**
     * Set the axis to display for the voxel grid debug view
     * When using tri-axis voxelization, this will display the voxel grid for the specified axis
     */
    get voxelDebugAxis(): number;
    /**
     * Set the axis to display for the voxel grid debug view
     * When using tri-axis voxelization, this will display the voxel grid for the specified axis
     */
    set voxelDebugAxis(axisNum: number);
    /**
     * Set the mip level to display for the voxel grid debug view
     */
    set voxelDebugDisplayMip(mipNum: number);
    /**
     * Display the debug view for the voxel tracing pass
     */
    get voxelTracingDebugEnabled(): boolean;
    /**
     * Display the debug view for the voxel tracing pass
     */
    set voxelTracingDebugEnabled(enabled: boolean);
    /**
     * Display the debug view for the spatial blur pass
     */
    get spatialBlurPassDebugEnabled(): boolean;
    /**
     * Display the debug view for the spatial blur pass
     */
    set spatialBlurPassDebugEnabled(enabled: boolean);
    /**
     * Display the debug view for the accumulation pass
     */
    get accumulationPassDebugEnabled(): boolean;
    /**
     * Display the debug view for the accumulation pass
     */
    set accumulationPassDebugEnabled(enabled: boolean);
    /**
     * Add a mesh to be used for shadow casting in the IBL shadow pipeline
     * @param mesh A mesh or list of meshes that you want to cast shadows
     */
    addShadowCastingMesh(mesh: Mesh | Mesh[]): void;
    /**
     * Remove a mesh from the shadow-casting list.
     * @param mesh The mesh or list of meshes that you don't want to cast shadows.
     */
    removeShadowCastingMesh(mesh: Mesh | Mesh[]): void;
    /**
     * The exponent of the resolution of the voxel shadow grid. Higher resolutions will result in sharper
     * shadows but are more expensive to compute and require more memory.
     * The resolution is calculated as 2 to the power of this number.
     */
    get resolutionExp(): number;
    /**
     * The exponent of the resolution of the voxel shadow grid. Higher resolutions will result in sharper
     * shadows but are more expensive to compute and require more memory.
     * The resolution is calculated as 2 to the power of this number.
     */
    set resolutionExp(newResolution: number);
    /**
     * The number of different directions to sample during the voxel tracing pass
     */
    get sampleDirections(): number;
    /**
     * The number of different directions to sample during the voxel tracing pass
     */
    set sampleDirections(value: number);
    /**
     * The decree to which the shadows persist between frames. 0.0 is no persistence, 1.0 is full persistence.
     **/
    get shadowRemenance(): number;
    /**
     * The decree to which the shadows persist between frames. 0.0 is no persistence, 1.0 is full persistence.
     **/
    set shadowRemenance(value: number);
    /**
     * The global rotation of the IBL for shadows
     */
    get envRotation(): number;
    /**
     * The global rotation of the IBL for shadows
     */
    set envRotation(value: number);
    /**
     * Allow debug passes to be enabled. Default is false.
     */
    get allowDebugPasses(): boolean;
    /**
     * Allow debug passes to be enabled. Default is false.
     */
    set allowDebugPasses(value: boolean);
    /**
     *  Support test.
     */
    static get IsSupported(): boolean;
    /**
     * @param name The rendering pipeline name
     * @param scene The scene linked to this pipeline
     * @param options Options to configure the pipeline
     * @param cameras Cameras to apply the pipeline to.
     */
    constructor(name: string, scene: Scene, options?: Partial<IblShadowsSettings>, cameras?: Camera[]);
    /**
     * Toggle the shadow tracing on or off
     * @param enabled Toggle the shadow tracing on or off
     */
    toggleShadow(enabled: boolean): void;
    private _handleResize;
    private _getGBufferDebugPass;
    private _createDebugPasses;
    private _disposeEffectPasses;
    private _disposeDebugPasses;
    private _updateDebugPasses;
    /**
     * Trigger the scene to be re-voxelized. This is useful when the scene has changed and the voxel grid needs to be updated.
     */
    updateVoxelization(): void;
    /**
     * Trigger the scene bounds of shadow-casters to be updated. This is useful when the scene has changed and the bounds need
     * to be recalculated. This will also trigger a re-voxelization.
     */
    updateSceneBounds(): void;
    /**
     * Update the SS shadow max distance and thickness based on the voxel grid size and resolution.
     * The max distance should be just a little larger than the world size of a single voxel.
     */
    private _updateSSShadowParams;
    /**
     * Apply the shadows to a material or array of materials.
     * @param material Material that will be affected by the shadows. If not provided, all materials of the scene will be affected.
     */
    addShadowReceivingMaterial(material?: Material | Material[]): void;
    /**
     * Remove a material from receiving shadows
     * @param material The material that will no longer receive shadows
     */
    removeShadowReceivingMaterial(material: Material | Material[]): void;
    protected _addShadowSupportToMaterial(material: Material): void;
    protected _setPluginParameters(): void;
    private _updateBeforeRender;
    private _listenForCameraChanges;
    /**
     * Checks if the IBL shadow pipeline is ready to render shadows
     * @returns true if the IBL shadow pipeline is ready to render the shadows
     */
    isReady(): boolean;
    /**
     * Get the class name
     * @returns "IBLShadowsRenderPipeline"
     */
    getClassName(): string;
    /**
     * Disposes the IBL shadow pipeline and associated resources
     */
    dispose(): void;
}
export {};
