import type { ILightConfiguration, ISceneConfiguration, ISceneOptimizerConfiguration, ICameraConfiguration, ISkyboxConfiguration, IGroundConfiguration, IModelConfiguration, IVRConfiguration } from "../configuration/interfaces/index";
import type { ViewerConfiguration } from "../configuration/configuration";
import type { ViewerModel } from "../model/viewerModel";
import { ViewerLabs } from "../labs/viewerLabs";
import type { ObservablesManager } from "../managers/observablesManager";
import type { ConfigurationContainer } from "../configuration/configurationContainer";
import type { IEnvironmentMapConfiguration } from "../configuration/interfaces/environmentMapConfiguration";
import { Observable } from "core/Misc/observable";
import { SceneOptimizer } from "core/Misc/sceneOptimizer";
import { ArcRotateCamera } from "core/Cameras/arcRotateCamera";
import { Light } from "core/Lights/light";
import { EnvironmentHelper } from "core/Helpers/environmentHelper";
import type { VRExperienceHelper } from "core/Cameras/VR/vrExperienceHelper";
import { Color3 } from "core/Maths/math";
import type { Nullable } from "core/types";
import { DefaultRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import type { Engine } from "core/Engines/engine";
import type { IShadowLight } from "core/Lights/shadowLight";
import { Scene } from "core/scene";
import "core/Audio/audioSceneComponent";
import "core/Helpers/sceneHelpers";
import "core/Misc/observable.extensions";
/**
 * This interface describes the structure of the variable sent with the configuration observables of the scene manager.
 * O - the type of object we are dealing with (Light, ArcRotateCamera, Scene, etc')
 * T - the configuration type
 */
export interface IPostConfigurationCallback<OBJ, CONF> {
    newConfiguration: CONF;
    sceneManager: SceneManager;
    object: OBJ;
    model?: ViewerModel;
}
export declare class SceneManager {
    private _engine;
    private _configurationContainer;
    private _observablesManager?;
    /**
     * Will notify when the scene was initialized
     */
    onSceneInitObservable: Observable<Scene>;
    /**
     * Will notify after the scene was configured. Can be used to further configure the scene
     */
    onSceneConfiguredObservable: Observable<IPostConfigurationCallback<Scene, ISceneConfiguration>>;
    /**
     * Will notify after the scene optimized was configured. Can be used to further configure the scene optimizer
     */
    onSceneOptimizerConfiguredObservable: Observable<IPostConfigurationCallback<SceneOptimizer, ISceneOptimizerConfiguration | boolean>>;
    /**
     * Will notify after the camera was configured. Can be used to further configure the camera
     */
    onCameraConfiguredObservable: Observable<IPostConfigurationCallback<ArcRotateCamera, ICameraConfiguration>>;
    /**
     * Will notify after the lights were configured. Can be used to further configure lights
     */
    onLightsConfiguredObservable: Observable<IPostConfigurationCallback<Array<Light>, {
        [name: string]: ILightConfiguration | boolean | number;
    }>>;
    /**
     * Will notify after the model(s) were configured. Can be used to further configure models
     */
    onModelsConfiguredObservable: Observable<IPostConfigurationCallback<Array<ViewerModel>, IModelConfiguration>>;
    /**
     * Will notify after the environment was configured. Can be used to further configure the environment
     */
    onEnvironmentConfiguredObservable: Observable<IPostConfigurationCallback<EnvironmentHelper, {
        skybox?: ISkyboxConfiguration | boolean;
        ground?: IGroundConfiguration | boolean;
    }>>;
    /**
     * Will notify after the model(s) were configured. Can be used to further configure models
     */
    onVRConfiguredObservable: Observable<IPostConfigurationCallback<VRExperienceHelper, IVRConfiguration>>;
    /**
     * The Babylon Scene of this viewer
     */
    scene: Scene;
    /**
     * The camera used in this viewer
     */
    camera: ArcRotateCamera;
    /**
     * Babylon's scene optimizer
     */
    sceneOptimizer?: SceneOptimizer;
    /**
     * Models displayed in this viewer.
     */
    models: Array<ViewerModel>;
    /**
     * Babylon's environment helper of this viewer
     */
    environmentHelper?: EnvironmentHelper;
    protected _defaultHighpTextureType: number;
    protected _shadowGeneratorBias: number;
    protected _defaultPipelineTextureType: number;
    /**
     * The maximum number of shadows supported by the current viewer
     */
    protected _maxShadows: number;
    /**
     * is HDR supported?
     */
    private _hdrSupport;
    private readonly _white;
    private _forceShadowUpdate;
    /**
     * The labs variable consists of objects that will have their API change.
     * Please be careful when using labs in production.
     */
    labs: ViewerLabs;
    private _defaultRenderingPipeline;
    private _assetsRootURL;
    get defaultRenderingPipeline(): Nullable<DefaultRenderingPipeline>;
    protected _vrHelper?: VRExperienceHelper;
    get vrHelper(): VRExperienceHelper | undefined;
    constructor(_engine: Engine, _configurationContainer: ConfigurationContainer, _observablesManager?: ObservablesManager | undefined);
    /**
     * Returns a boolean representing HDR support
     */
    get isHdrSupported(): boolean;
    /**
     * Return the main color defined in the configuration.
     */
    get mainColor(): Color3;
    get reflectionColor(): Color3;
    get animationBlendingEnabled(): boolean;
    set animationBlendingEnabled(value: boolean);
    get observablesManager(): ObservablesManager | undefined;
    private _processShadows;
    /**
     * The flag defining whether shadows are rendered constantly or once.
     */
    get processShadows(): boolean;
    /**
     * Should shadows be rendered every frame, or only once and stop.
     * This can be used to optimize a scene.
     *
     * Not that the shadows will NOT disapear but will remain in place.
     * @param process if true shadows will be updated once every frame. if false they will stop being updated.
     */
    set processShadows(process: boolean);
    private _groundEnabled;
    get groundEnabled(): boolean;
    set groundEnabled(newValue: boolean);
    private _groundMirrorEnabled;
    /**
     * gets whether the reflection is disabled.
     */
    get groundMirrorEnabled(): boolean;
    /**
     * sets whether the reflection is disabled.
     */
    set groundMirrorEnabled(value: boolean);
    private _defaultRenderingPipelineEnabled;
    get defaultRenderingPipelineEnabled(): boolean;
    set defaultRenderingPipelineEnabled(value: boolean);
    /**
     * Sets the engine flags to unlock all babylon features.
     * Can also be configured using the scene.flags configuration object
     */
    unlockBabylonFeatures(): void;
    /**
     * initialize the scene. Calling this function again will dispose the old scene, if exists.
     * @param sceneConfiguration the configuration of the scene
     * @returns a promise that resolves when the scene is ready
     */
    initScene(sceneConfiguration?: ISceneConfiguration): Promise<Scene>;
    clearScene(clearModels?: boolean, clearLights?: boolean): void;
    private _globalConfiguration;
    /**
     * This will update the scene's configuration, including camera, lights, environment.
     * @param newConfiguration the delta that should be configured. This includes only the changes
     */
    updateConfiguration(newConfiguration: Partial<ViewerConfiguration>): void;
    private _defaultRenderingPipelineShouldBuild;
    private _rebuildPostprocesses;
    private _bloomEnabled;
    get bloomEnabled(): boolean;
    set bloomEnabled(value: boolean);
    private _fxaaEnabled;
    get fxaaEnabled(): boolean;
    set fxaaEnabled(value: boolean);
    setDefaultMaterial(sceneConfig: ISceneConfiguration): void;
    /**
     * internally configure the scene using the provided configuration.
     * The scene will not be recreated, but just updated.
     * @param sceneConfig the (new) scene configuration
     */
    protected _configureScene(sceneConfig: ISceneConfiguration): void;
    /**
     * Configure the scene optimizer.
     * The existing scene optimizer will be disposed and a new one will be created.
     * @param optimizerConfig the (new) optimizer configuration
     */
    protected _configureOptimizer(optimizerConfig: ISceneOptimizerConfiguration | boolean): void;
    /**
     * configure all models using the configuration.
     * @param modelConfiguration the configuration to use to reconfigure the models
     */
    protected _configureVR(vrConfig: IVRConfiguration): void;
    protected _configureEnvironmentMap(environmentMapConfiguration: IEnvironmentMapConfiguration): any;
    /**
     * (Re) configure the camera. The camera will only be created once and from this point will only be reconfigured.
     * @param cameraConfig the new camera configuration
     */
    protected _configureCamera(cameraConfig?: ICameraConfiguration): void;
    private _focusOnModel;
    protected _configureEnvironment(skyboxConifguration?: ISkyboxConfiguration | boolean, groundConfiguration?: IGroundConfiguration | boolean): void;
    /**
     * configure the lights.
     * @param lightsConfiguration the (new) light(s) configuration
     */
    protected _configureLights(lightsConfiguration?: {
        [name: string]: ILightConfiguration | boolean | number;
    }): void;
    private _shadowGroundPlane;
    private _updateShadowRenderList;
    private _updateGroundMirrorRenderList;
    /**
     * Gets the shadow map blur kernel according to the light configuration.
     * @param light The light used to generate the shadows
     * @param bufferSize The size of the shadow map
     * @returns the kernel blur size
     */
    getBlurKernel(light: IShadowLight, bufferSize: number): number;
    /**
     * Alters render settings to reduce features based on hardware feature limitations
     * @param enableHDR Allows the viewer to run in HDR mode.
     */
    protected _handleHardwareLimitations(enableHDR?: boolean): void;
    /**
     * Dispose the entire viewer including the scene and the engine
     */
    dispose(): void;
    /**
     * Get an environment asset url by using the configuration if the path is not absolute.
     * @param url Asset url
     * @returns The Asset url using the `environmentAssetsRootURL` if the url is not an absolute path.
     */
    private _getAssetUrl;
    private _cameraBehaviorMapping;
    private _setCameraBehavior;
}
