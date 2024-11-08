import type { FrameGraph, FrameGraphTextureHandle, Scene, Camera, FrameGraphObjectList, FrameGraphRenderContext } from "core/index";
import { RenderTargetTexture } from "../../../Materials/Textures/renderTargetTexture";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to render objects to a texture.
 */
export declare class FrameGraphObjectRendererTask extends FrameGraphTask {
    /**
     * The destination texture where the objects will be rendered.
     */
    destinationTexture: FrameGraphTextureHandle;
    /**
     * The depth attachment texture where the objects will be rendered (optional).
     */
    depthTexture?: FrameGraphTextureHandle;
    /**
     * The dependencies of the task (optional).
     */
    dependencies?: FrameGraphTextureHandle[];
    private _camera;
    /**
     * Gets or sets the camera used to render the objects.
     */
    get camera(): Camera;
    set camera(camera: Camera);
    /**
     * The list of objects to render.
     */
    objectList: FrameGraphObjectList;
    /**
     * If depth testing should be enabled (default is true).
     */
    depthTest: boolean;
    /**
     * If depth writing should be enabled (default is true).
     */
    depthWrite: boolean;
    /**
     * The output texture.
     */
    readonly outputTexture: FrameGraphTextureHandle;
    /**
     * The output depth attachment texture.
     * This texture will point to the same texture than the depthTexture property if it is set.
     * Note, however, that the handle itself will be different!
     */
    readonly outputDepthTexture: FrameGraphTextureHandle;
    protected _scene: Scene;
    protected _rtt: RenderTargetTexture;
    /**
     * The render target texture used to render the objects.
     */
    get renderTargetTexture(): RenderTargetTexture;
    get name(): string;
    set name(value: string);
    /**
     * Constructs a new object renderer task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene the frame graph is associated with.
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    isReady(): boolean;
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void): void;
    dispose(): void;
}
