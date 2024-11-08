import type { FrameGraph, FrameGraphTextureHandle } from "core/index";
import { Color4 } from "../../../Maths/math.color";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to clear a texture.
 */
export declare class FrameGraphClearTextureTask extends FrameGraphTask {
    /**
     * The color to clear the texture with.
     */
    color: Color4;
    /**
     * If the color should be cleared.
     */
    clearColor: boolean;
    /**
     * If the depth should be cleared.
     */
    clearDepth: boolean;
    /**
     * If the stencil should be cleared.
     */
    clearStencil: boolean;
    /**
     * The texture to clear.
     */
    destinationTexture: FrameGraphTextureHandle;
    /**
     * The output texture (same as destinationTexture, but the handle may be different).
     */
    readonly outputTexture: FrameGraphTextureHandle;
    constructor(name: string, frameGraph: FrameGraph);
    record(): void;
}
