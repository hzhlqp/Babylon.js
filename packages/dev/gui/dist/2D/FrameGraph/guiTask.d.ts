import type { FrameGraphTextureHandle, FrameGraph } from "core/index";
import { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import { FrameGraphTask } from "core/FrameGraph/frameGraphTask";
/**
 * Task that renders a GUI texture.
 */
export declare class FrameGraphGUITask extends FrameGraphTask {
    /**
     * The destination texture to render the GUI to.
     */
    destinationTexture: FrameGraphTextureHandle;
    /**
     * The output texture of the task.
     * This is the same texture as the destination texture, but the handles are different!
     */
    readonly outputTexture: FrameGraphTextureHandle;
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Gets the underlying advanced dynamic texture.
     */
    get gui(): AdvancedDynamicTexture;
    protected _adt: AdvancedDynamicTexture;
    /**
     * Constructs a new GUI task.
     * @param name Name of the task
     * @param frameGraph Frame graph the task belongs to
     * @param adt The GUI texture. If not provided, a new fullscreen GUI will be created.
     */
    constructor(name: string, frameGraph: FrameGraph, adt?: AdvancedDynamicTexture);
    isReady(): boolean;
    record(): void;
    dispose(): void;
}
