import type * as GLTF2 from "babylonjs-gltf2interface";
import type { Nullable } from "core/types";
import { Observable } from "core/Misc/observable";
import type { Camera } from "core/Cameras/camera";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Material } from "core/Materials/material";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { ISceneLoaderPluginFactory, ISceneLoaderPluginAsync, ISceneLoaderProgressEvent, ISceneLoaderAsyncResult, SceneLoaderPluginOptions } from "core/Loading/sceneLoader";
import { AssetContainer } from "core/assetContainer";
import type { Scene, IDisposable } from "core/scene";
import type { WebRequest } from "core/Misc/webRequest";
import type { IFileRequest } from "core/Misc/fileRequest";
import type { IDataBuffer } from "core/Misc/dataReader";
import { GLTFFileLoaderMetadata } from "./glTFFileLoader.metadata";
import type { LoadFileError } from "core/Misc/fileTools";
import type { TransformNode } from "core/Meshes/transformNode";
/**
 * Defines options for glTF loader extensions. This interface is extended by specific extensions.
 */
export interface GLTFLoaderExtensionOptions extends Record<string, Record<string, unknown> | undefined> {
}
declare module "core/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the glTF loader.
         */
        [GLTFFileLoaderMetadata.name]: Partial<GLTFLoaderOptions>;
    }
}
/**
 * Mode that determines the coordinate system to use.
 */
export declare enum GLTFLoaderCoordinateSystemMode {
    /**
     * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
     */
    AUTO = 0,
    /**
     * Sets the useRightHandedSystem flag on the scene.
     */
    FORCE_RIGHT_HANDED = 1
}
/**
 * Mode that determines what animations will start.
 */
export declare enum GLTFLoaderAnimationStartMode {
    /**
     * No animation will start.
     */
    NONE = 0,
    /**
     * The first animation will start.
     */
    FIRST = 1,
    /**
     * All animations will start.
     */
    ALL = 2
}
/**
 * Interface that contains the data for the glTF asset.
 */
export interface IGLTFLoaderData {
    /**
     * The object that represents the glTF JSON.
     */
    json: Object;
    /**
     * The BIN chunk of a binary glTF.
     */
    bin: Nullable<IDataBuffer>;
}
/**
 * Interface for extending the loader.
 */
export interface IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines the order of this extension.
     * The loader sorts the extensions using these values when loading.
     */
    order?: number;
}
/**
 * Loader state.
 */
export declare enum GLTFLoaderState {
    /**
     * The asset is loading.
     */
    LOADING = 0,
    /**
     * The asset is ready for rendering.
     */
    READY = 1,
    /**
     * The asset is completely loaded.
     */
    COMPLETE = 2
}
/** @internal */
export interface IGLTFLoader extends IDisposable {
    importMeshAsync: (meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<ISceneLoaderAsyncResult>;
    loadAsync: (scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<void>;
}
/**
 * Adds default/implicit options to extension specific options.
 */
type DefaultExtensionOptions<BaseExtensionOptions> = {
    /**
     * Defines if the extension is enabled
     */
    enabled?: boolean;
} & BaseExtensionOptions;
declare abstract class GLTFLoaderOptions {
    protected copyFrom(options?: Partial<Readonly<GLTFLoaderOptions>>): void;
    /**
     * Raised when the asset has been parsed
     */
    abstract onParsed?: ((loaderData: IGLTFLoaderData) => void) | undefined;
    /**
     * The coordinate system mode. Defaults to AUTO.
     */
    coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
    /**
     * The animation start mode. Defaults to FIRST.
     */
    animationStartMode: GLTFLoaderAnimationStartMode;
    /**
     * Defines if the loader should load node animations. Defaults to true.
     * NOTE: The animation of this node will still load if the node is also a joint of a skin and `loadSkins` is true.
     */
    loadNodeAnimations: boolean;
    /**
     * Defines if the loader should load skins. Defaults to true.
     */
    loadSkins: boolean;
    /**
     * Defines if the loader should load morph targets. Defaults to true.
     */
    loadMorphTargets: boolean;
    /**
     * Defines if the loader should compile materials before raising the success callback. Defaults to false.
     */
    compileMaterials: boolean;
    /**
     * Defines if the loader should also compile materials with clip planes. Defaults to false.
     */
    useClipPlane: boolean;
    /**
     * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
     */
    compileShadowGenerators: boolean;
    /**
     * Defines if the Alpha blended materials are only applied as coverage.
     * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
     * If true, no extra effects are applied to transparent pixels.
     */
    transparencyAsCoverage: boolean;
    /**
     * Defines if the loader should use range requests when load binary glTF files from HTTP.
     * Enabling will disable offline support and glTF validator.
     * Defaults to false.
     */
    useRangeRequests: boolean;
    /**
     * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
     */
    createInstances: boolean;
    /**
     * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
     */
    alwaysComputeBoundingBox: boolean;
    /**
     * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
     */
    loadAllMaterials: boolean;
    /**
     * If true, load only the materials defined in the file. Defaults to false.
     */
    loadOnlyMaterials: boolean;
    /**
     * If true, do not load any materials defined in the file. Defaults to false.
     */
    skipMaterials: boolean;
    /**
     * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
     */
    useSRGBBuffers: boolean;
    /**
     * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
     */
    targetFps: number;
    /**
     * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
     * Set this to true if loading assets with invalid `skin.skeleton` values.
     */
    alwaysComputeSkeletonRootNode: boolean;
    /**
     * If true, the loader will derive the name for Babylon textures from the glTF texture name, image name, or image url. Defaults to false.
     * Note that it is possible for multiple Babylon textures to share the same name when the Babylon textures load from the same glTF texture or image.
     */
    useGltfTextureNames: boolean;
    /**
     * Function called before loading a url referenced by the asset.
     * @param url url referenced by the asset
     * @returns Async url to load
     */
    preprocessUrlAsync: (url: string) => Promise<string>;
    /**
     * Defines the node to use as the root of the hierarchy when loading the scene (default: undefined). If not defined, a root node will be automatically created.
     * You can also pass null if you don't want a root node to be created.
     */
    customRootNode?: Nullable<TransformNode>;
    /**
     * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    abstract onMeshLoaded?: ((mesh: AbstractMesh) => void) | undefined;
    /**
     * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
     */
    abstract onSkinLoaded?: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined;
    /**
     * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    abstract onTextureLoaded?: ((texture: BaseTexture) => void) | undefined;
    /**
     * Callback raised when the loader creates a material after parsing the glTF properties of the material.
     */
    abstract onMaterialLoaded?: ((material: Material) => void) | undefined;
    /**
     * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    abstract onCameraLoaded?: ((camera: Camera) => void) | undefined;
    /**
     * Defines options for glTF extensions.
     */
    extensionOptions: {
        [Extension in keyof GLTFLoaderExtensionOptions]?: {
            [Option in keyof DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>]: DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>[Option];
        };
    };
}
/**
 * File loader for loading glTF files into a scene.
 */
export declare class GLTFFileLoader extends GLTFLoaderOptions implements IDisposable, ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /** @internal */
    static _CreateGLTF1Loader: (parent: GLTFFileLoader) => IGLTFLoader;
    /** @internal */
    static _CreateGLTF2Loader: (parent: GLTFFileLoader) => IGLTFLoader;
    /**
     * Creates a new glTF file loader.
     * @param options The options for the loader
     */
    constructor(options?: Partial<Readonly<GLTFLoaderOptions>>);
    /**
     * Raised when the asset has been parsed
     */
    onParsedObservable: Observable<IGLTFLoaderData>;
    private _onParsedObserver;
    /**
     * Raised when the asset has been parsed
     */
    set onParsed(callback: ((loaderData: IGLTFLoaderData) => void) | undefined);
    /**
     * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
     * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
     * Defaults to true.
     * @internal
     */
    static IncrementalLoading: boolean;
    /**
     * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
     * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
     * @internal
     */
    static HomogeneousCoordinates: boolean;
    /**
     * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    readonly onMeshLoadedObservable: Observable<AbstractMesh>;
    private _onMeshLoadedObserver;
    /**
     * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    set onMeshLoaded(callback: ((mesh: AbstractMesh) => void) | undefined);
    /**
     * Observable raised when the loader creates a skin after parsing the glTF properties of the skin node.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
     * @param node - the transform node that corresponds to the original glTF skin node used for animations
     * @param skinnedNode - the transform node that is the skinned mesh itself or the parent of the skinned meshes
     */
    readonly onSkinLoadedObservable: Observable<{
        node: TransformNode;
        skinnedNode: TransformNode;
    }>;
    private _onSkinLoadedObserver;
    /**
     * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
     */
    set onSkinLoaded(callback: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined);
    /**
     * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    readonly onTextureLoadedObservable: Observable<BaseTexture>;
    private _onTextureLoadedObserver;
    /**
     * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    set onTextureLoaded(callback: ((texture: BaseTexture) => void) | undefined);
    /**
     * Observable raised when the loader creates a material after parsing the glTF properties of the material.
     */
    readonly onMaterialLoadedObservable: Observable<Material>;
    private _onMaterialLoadedObserver;
    /**
     * Callback raised when the loader creates a material after parsing the glTF properties of the material.
     */
    set onMaterialLoaded(callback: ((material: Material) => void) | undefined);
    /**
     * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    readonly onCameraLoadedObservable: Observable<Camera>;
    private _onCameraLoadedObserver;
    /**
     * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    set onCameraLoaded(callback: ((camera: Camera) => void) | undefined);
    /**
     * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
     * For assets with LODs, raised when all of the LODs are complete.
     * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
     */
    readonly onCompleteObservable: Observable<void>;
    private _onCompleteObserver;
    /**
     * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
     * For assets with LODs, raised when all of the LODs are complete.
     * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
     */
    set onComplete(callback: () => void);
    /**
     * Observable raised when an error occurs.
     */
    readonly onErrorObservable: Observable<any>;
    private _onErrorObserver;
    /**
     * Callback raised when an error occurs.
     */
    set onError(callback: (reason: any) => void);
    /**
     * Observable raised after the loader is disposed.
     */
    readonly onDisposeObservable: Observable<void>;
    private _onDisposeObserver;
    /**
     * Callback raised after the loader is disposed.
     */
    set onDispose(callback: () => void);
    /**
     * Observable raised after a loader extension is created.
     * Set additional options for a loader extension in this event.
     */
    readonly onExtensionLoadedObservable: Observable<IGLTFLoaderExtension>;
    private _onExtensionLoadedObserver;
    /**
     * Callback raised after a loader extension is created.
     */
    set onExtensionLoaded(callback: (extension: IGLTFLoaderExtension) => void);
    /**
     * Defines if the loader logging is enabled.
     */
    get loggingEnabled(): boolean;
    set loggingEnabled(value: boolean);
    /**
     * Defines if the loader should capture performance counters.
     */
    get capturePerformanceCounters(): boolean;
    set capturePerformanceCounters(value: boolean);
    /**
     * Defines if the loader should validate the asset.
     */
    validate: boolean;
    /**
     * Observable raised after validation when validate is set to true. The event data is the result of the validation.
     */
    readonly onValidatedObservable: Observable<GLTF2.IGLTFValidationResults>;
    private _onValidatedObserver;
    /**
     * Callback raised after a loader extension is created.
     */
    set onValidated(callback: (results: GLTF2.IGLTFValidationResults) => void);
    private _loader;
    private _state;
    private _progressCallback?;
    private _requests;
    /**
     * Name of the loader ("gltf")
     */
    readonly name: "gltf";
    /** @internal */
    readonly extensions: {
        readonly ".gltf": {
            readonly isBinary: false;
        };
        readonly ".glb": {
            readonly isBinary: true;
        };
    };
    /**
     * Disposes the loader, releases resources during load, and cancels any outstanding requests.
     */
    dispose(): void;
    /**
     * @internal
     */
    loadFile(scene: Scene, fileOrUrl: File | string | ArrayBufferView, rootUrl: string, onSuccess: (data: unknown, responseURL?: string) => void, onProgress?: (ev: ISceneLoaderProgressEvent) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void, name?: string): Nullable<IFileRequest>;
    private _loadBinary;
    /**
     * @internal
     */
    importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * @internal
     */
    loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
    /**
     * @internal
     */
    loadAssetContainerAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<AssetContainer>;
    /**
     * @internal
     */
    canDirectLoad(data: string): boolean;
    /**
     * @internal
     */
    directLoad(scene: Scene, data: string): Promise<Object>;
    /**
     * The callback that allows custom handling of the root url based on the response url.
     * @param rootUrl the original root url
     * @param responseURL the response url if available
     * @returns the new root url
     */
    rewriteRootURL?(rootUrl: string, responseURL?: string): string;
    /** @internal */
    createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
    /**
     * The loader state or null if the loader is not active.
     */
    get loaderState(): Nullable<GLTFLoaderState>;
    /**
     * Observable raised when the loader state changes.
     */
    onLoaderStateChangedObservable: Observable<Nullable<GLTFLoaderState>>;
    /**
     * Returns a promise that resolves when the asset is completely loaded.
     * @returns a promise that resolves when the asset is completely loaded.
     */
    whenCompleteAsync(): Promise<void>;
    /**
     * @internal
     */
    _setState(state: GLTFLoaderState): void;
    /**
     * @internal
     */
    _loadFile(scene: Scene, fileOrUrl: File | string, onSuccess: (data: string | ArrayBuffer) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest) => void, onOpened?: (request: WebRequest) => void): IFileRequest;
    private _onProgress;
    private _validate;
    private _getLoader;
    private _parseJson;
    private _unpackBinaryAsync;
    private _unpackBinaryV1Async;
    private _unpackBinaryV2Async;
    private static _parseVersion;
    private static _compareVersion;
    private static readonly _logSpaces;
    private _logIndentLevel;
    private _loggingEnabled;
    /** @internal */
    _log: (message: string) => void;
    /**
     * @internal
     */
    _logOpen(message: string): void;
    /** @internal */
    _logClose(): void;
    private _logEnabled;
    private _logDisabled;
    private _capturePerformanceCounters;
    /** @internal */
    _startPerformanceCounter: (counterName: string) => void;
    /** @internal */
    _endPerformanceCounter: (counterName: string) => void;
    private _startPerformanceCounterEnabled;
    private _startPerformanceCounterDisabled;
    private _endPerformanceCounterEnabled;
    private _endPerformanceCounterDisabled;
}
export {};
