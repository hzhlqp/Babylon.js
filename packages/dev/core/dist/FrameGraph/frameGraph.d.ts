import type { Scene, AbstractEngine, RenderTargetWrapper, FrameGraphTextureCreationOptions, FrameGraphTextureHandle, FrameGraphTextureDescription, Nullable, FrameGraphTask } from "core/index";
import { FrameGraphRenderPass } from "./Passes/renderPass";
import { FrameGraphCullPass } from "./Passes/cullPass";
import { FrameGraphRenderContext } from "./frameGraphRenderContext";
import { FrameGraphContext } from "./frameGraphContext";
import { Observable } from "core/Misc/observable";
/**
 * Class used to implement a frame graph
 * @experimental
 */
export declare class FrameGraph {
    /** @internal */
    readonly _passContext: FrameGraphContext;
    /** @internal */
    readonly _renderContext: FrameGraphRenderContext;
    private readonly _engine;
    private readonly _textureManager;
    private _tasks;
    private _currentProcessedTask;
    /**
     * Observable raised when the node render graph is built
     */
    onBuildObservable: Observable<FrameGraph>;
    /**
     * Gets the engine used by the frame graph
     */
    get engine(): AbstractEngine;
    /**
     * Constructs the frame graph
     * @param engine defines the hosting engine
     * @param debugTextures defines a boolean indicating that textures created by the frame graph should be visible in the inspector
     * @param scene defines the scene in which debugging textures are to be created
     */
    constructor(engine: AbstractEngine, debugTextures?: boolean, scene?: Scene);
    /**
     * Gets a task by name
     * @param name Name of the task to get
     * @returns The task or undefined if not found
     */
    getTaskByName<T extends FrameGraphTask>(name: string): T | undefined;
    /**
     * Adds a task to the frame graph
     * @param task Task to add
     */
    addTask(task: FrameGraphTask): void;
    /**
     * Adds a render pass to a task. This method can only be called during a Task.record execution.
     * @param name The name of the pass
     * @param whenTaskDisabled If true, the pass will be added to the list of passes to execute when the task is disabled (default is false)
     * @returns The render pass created
     */
    addRenderPass(name: string, whenTaskDisabled?: boolean): FrameGraphRenderPass;
    /**
     * Adds a cull pass to a task. This method can only be called during a Task.record execution.
     * @param name The name of the pass
     * @param whenTaskDisabled If true, the pass will be added to the list of passes to execute when the task is disabled (default is false)
     * @returns The cull pass created
     */
    addCullPass(name: string, whenTaskDisabled?: boolean): FrameGraphCullPass;
    private _addPass;
    /**
     * Builds the frame graph.
     * This method should be called after all tasks have been added to the frame graph (FrameGraph.addTask) and before the graph is executed (FrameGraph.execute).
     */
    build(): void;
    /**
     * Returns a promise that resolves when the frame graph is ready to be executed
     * This method must be called after the graph has been built (FrameGraph.build called)!
     * @param timeout Timeout in ms between retries (default is 16)
     * @returns The promise that resolves when the graph is ready
     */
    whenReadyAsync(timeout?: number): Promise<void>;
    /**
     * Executes the frame graph.
     */
    execute(): void;
    /**
     * Imports a texture into the frame graph
     * @param name Name of the texture
     * @param texture Texture to import
     * @param handle Existing handle to use for the texture. If not provided (default), a new handle will be created.
     * @returns The handle to the texture
     */
    importTexture(name: string, texture: RenderTargetWrapper, handle?: FrameGraphTextureHandle): FrameGraphTextureHandle;
    /**
     * Gets the creation options of a texture
     * @param handle Handle of the texture
     * @param cloneOptions If true, the options will be cloned before being returned (default is false)
     * @returns The creation options of the texture
     */
    getTextureCreationOptions(handle: FrameGraphTextureHandle, cloneOptions?: boolean): FrameGraphTextureCreationOptions;
    /**
     * Gets the description of a texture
     * @param handle Handle of the texture
     * @returns The description of the texture
     */
    getTextureDescription(handle: FrameGraphTextureHandle): FrameGraphTextureDescription;
    /**
     * Gets a texture handle or creates a new texture if the handle is not provided.
     * @param handle If provided, will simply return the handle
     * @param newTextureName Name of the new texture to create
     * @param creationOptions Options to use when creating the new texture
     * @returns The handle to the texture. If handle is not provided, newTextureName and creationOptions must be provided.
     */
    getTextureHandleOrCreateTexture(handle?: FrameGraphTextureHandle, newTextureName?: string, creationOptions?: FrameGraphTextureCreationOptions): FrameGraphTextureHandle;
    /**
     * Gets a texture from a handle
     * @param handle The handle of the texture
     * @returns The texture or null if not found
     */
    getTexture(handle: FrameGraphTextureHandle): Nullable<RenderTargetWrapper>;
    /**
     * Creates a new render target texture
     * @param name Name of the texture
     * @param creationOptions Options to use when creating the texture
     * @param multiTargetMode If true, the texture will be created in multi target mode (default is false). In this mode, a handle is created for each target separately, in addition to the handle created for the main render target texture itself.
     * @returns The handle to the texture
     */
    createRenderTargetTexture(name: string, creationOptions: FrameGraphTextureCreationOptions, multiTargetMode?: boolean): FrameGraphTextureHandle;
    /**
     * Creates a handle which is not associated with any texture.
     * Call resolveDanglingHandle to associate the handle with a valid texture handle.
     * @returns The dangling handle
     */
    createDanglingHandle(): FrameGraphTextureHandle;
    /**
     * Associates a texture with a dangling handle
     * @param danglingHandle The dangling handle
     * @param handle The handle to associate with the dangling handle (if not provided, a new texture handle will be created)
     * @param newTextureName The name of the new texture to create (if handle is not provided)
     * @param creationOptions The options to use when creating the new texture (if handle is not provided)
     */
    resolveDanglingHandle(danglingHandle: FrameGraphTextureHandle, handle?: FrameGraphTextureHandle, newTextureName?: string, creationOptions?: FrameGraphTextureCreationOptions): void;
    /**
     * Clears the frame graph (remove the tasks and release the textures).
     * The frame graph can be built again after this method is called.
     */
    clear(): void;
    /**
     * Disposes the frame graph
     */
    dispose(): void;
}
