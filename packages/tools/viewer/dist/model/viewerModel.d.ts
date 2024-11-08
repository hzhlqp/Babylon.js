import type { IDisposable } from "core/scene";
import type { ISceneLoaderPlugin, ISceneLoaderPluginAsync, ISceneLoaderProgressEvent } from "core/Loading/sceneLoader";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
import type { Skeleton } from "core/Bones/skeleton";
import { Observable } from "core/Misc/observable";
import "core/Misc/observable.extensions";
import { AnimationGroup } from "core/Animations/animationGroup";
import { Animation } from "core/Animations/index";
import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { IAsset } from "babylonjs-gltf2interface";
import type { IModelConfiguration } from "../configuration/interfaces/modelConfiguration";
import type { IModelAnimation } from "./modelAnimation";
import type { ObservablesManager } from "../managers/observablesManager";
import type { ConfigurationContainer } from "../configuration/configurationContainer";
/**
 * The current state of the model
 */
export declare enum ModelState {
    INIT = 0,
    LOADING = 1,
    LOADED = 2,
    ENTRY = 3,
    ENTRYDONE = 4,
    COMPLETE = 5,
    CANCELED = 6,
    ERROR = 7
}
/**
 * The viewer model is a container for all assets representing a sngle loaded model.
 */
export declare class ViewerModel implements IDisposable {
    private _observablesManager;
    private _configurationContainer?;
    /**
     * The loader used to load this model.
     */
    loader: ISceneLoaderPlugin | ISceneLoaderPluginAsync;
    private _animations;
    /**
     * the list of meshes that are a part of this model
     */
    private _meshes;
    /**
     * This model's root mesh (the parent of all other meshes).
     * This mesh does not(!) exist in the meshes array.
     */
    rootMesh: AbstractMesh;
    private _pivotMesh;
    /**
     * ParticleSystems connected to this model
     */
    particleSystems: Array<IParticleSystem>;
    /**
     * Skeletons defined in this model
     */
    skeletons: Array<Skeleton>;
    /**
     * The current model animation.
     * On init, this will be undefined.
     */
    currentAnimation: IModelAnimation;
    /**
     * Observers registered here will be executed when the model is done loading
     */
    onLoadedObservable: Observable<ViewerModel>;
    /**
     * Observers registered here will be executed when the loader notified of a progress event
     */
    onLoadProgressObservable: Observable<ISceneLoaderProgressEvent>;
    /**
     * Observers registered here will be executed when the loader notified of an error.
     */
    onLoadErrorObservable: Observable<{
        message: string;
        exception: any;
    }>;
    /**
     * Will be executed after the model finished loading and complete, including entry animation and lod
     */
    onCompleteObservable: Observable<ViewerModel>;
    /**
     * Observers registered here will be executed every time the model is being configured.
     * This can be used to extend the model's configuration without extending the class itself
     */
    onAfterConfigure: Observable<ViewerModel>;
    /**
     * The current model state (loaded, error, etc)
     */
    state: ModelState;
    /**
     * A loadID provided by the modelLoader, unique to ths (Abstract)Viewer instance.
     */
    loadId: number;
    loadInfo: IAsset;
    private _modelConfiguration;
    private _loaderDone;
    private _entryAnimation;
    private _scaleTransition;
    private _animatables;
    private _frameRate;
    private _shadowsRenderedAfterLoad;
    constructor(_observablesManager: ObservablesManager, modelConfiguration: IModelConfiguration, _configurationContainer?: ConfigurationContainer | undefined);
    get shadowsRenderedAfterLoad(): boolean;
    set shadowsRenderedAfterLoad(rendered: boolean);
    getViewerId(): string | undefined;
    /**
     * Is this model enabled?
     */
    get enabled(): boolean;
    /**
     * Set whether this model is enabled or not.
     */
    set enabled(enable: boolean);
    set loaderDone(done: boolean);
    private _checkCompleteState;
    /**
     * Add a mesh to this model.
     * Any mesh that has no parent will be provided with the root mesh as its new parent.
     *
     * @param mesh the new mesh to add
     * @param triggerLoaded should this mesh trigger the onLoaded observable. Used when adding meshes manually.
     * @returns a promise that will resolve when the model is done loading
     */
    addMesh(mesh: AbstractMesh, triggerLoaded?: boolean): Promise<ViewerModel>;
    /**
     * get the list of meshes (excluding the root mesh)
     */
    get meshes(): AbstractMesh[];
    /**
     * Get the model's configuration
     */
    get configuration(): IModelConfiguration;
    /**
     * (Re-)set the model's entire configuration
     * @param newConfiguration the new configuration to replace the new one
     */
    set configuration(newConfiguration: IModelConfiguration);
    /**
     * Update the current configuration with new values.
     * Configuration will not be overwritten, but merged with the new configuration.
     * Priority is to the new configuration
     * @param newConfiguration the configuration to be merged into the current configuration;
     */
    updateConfiguration(newConfiguration: Partial<IModelConfiguration>): void;
    private _initAnimations;
    /**
     * Animates the model from the current position to the default position
     * @param completeCallback A function to call when the animation has completed
     */
    private _enterScene;
    private _modelComplete;
    /**
     * Add a new animation group to this model.
     * @param animationGroup the new animation group to be added
     */
    addAnimationGroup(animationGroup: AnimationGroup): void;
    /**
     * Get the ModelAnimation array
     * @returns the array of ModelAnimations
     */
    getAnimations(): Array<IModelAnimation>;
    /**
     * Get the animations' names. Using the names you can play a specific animation.
     * @returns the array of ModelAnimations
     */
    getAnimationNames(): Array<string>;
    /**
     * Get an animation by the provided name. Used mainly when playing n animation.
     * @param name the name of the animation to find
     * @returns the ModelAnimation object
     */
    protected _getAnimationByName(name: string): Nullable<IModelAnimation>;
    /**
     * Choose an initialized animation using its name and start playing it
     * @param name the name of the animation to play
     * @returns The model aniamtion to be played.
     */
    playAnimation(name: string): IModelAnimation;
    setCurrentAnimationByName(name: string): IModelAnimation;
    private _configureModel;
    private _modelAnimationConfigurationToObject;
    /**
     * Apply a material configuration to a material
     * @param material Material to apply configuration to
     * @internal
     */
    _applyModelMaterialConfiguration(material: Material): void;
    /**
     * Start entry/exit animation given an animation configuration
     * @param animationConfiguration Entry/Exit animation configuration
     * @param isEntry Pass true if the animation is an entry animation
     * @param completeCallback Callback to execute when the animation completes
     */
    private _applyAnimation;
    /**
     * Begin @animations with the specified @easingFunction
     * @param animations The BABYLON Animations to begin
     * @param duration of transition, in seconds
     * @param easingFunction An easing function to apply
     * @param easingMode A easing mode to apply to the easingFunction
     * @param onAnimationEnd Call back trigger at the end of the animation.
     */
    transitionTo(animations: Animation[], duration: number, easingFunction: any, easingMode: number | undefined, // BABYLON.EasingFunction.EASINGMODE_EASEINOUT,
    onAnimationEnd: () => void): void;
    /**
     * Sets key values on an Animation from first to last frame.
     * @param animation The Babylon animation object to set keys on
     * @param startValue The value of the first key
     * @param endValue The value of the last key
     * @param duration The duration of the animation, used to determine the end frame
     */
    private _setLinearKeys;
    /**
     * Creates and returns a Babylon easing funtion object based on a string representing the Easing function
     * @param easingFunctionID The enum of the easing funtion to create
     * @returns The newly created Babylon easing function object
     */
    private _createEasingFunction;
    /**
     * Stops and removes all animations that have been applied to the model
     */
    stopAllAnimations(): void;
    /**
     * Will remove this model from the viewer (but NOT dispose it).
     */
    remove(): void;
    /**
     * Dispose this model, including all of its associated assets.
     */
    dispose(): void;
}
