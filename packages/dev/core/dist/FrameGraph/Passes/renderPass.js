import { FrameGraphPass } from "./pass";
/**
 * Render pass used to render objects.
 */
export class FrameGraphRenderPass extends FrameGraphPass {
    /**
     * Checks if a pass is a render pass.
     * @param pass The pass to check.
     * @returns True if the pass is a render pass, else false.
     */
    static IsRenderPass(pass) {
        return pass.setRenderTarget !== undefined;
    }
    /**
     * Gets the render target used by the render pass.
     */
    get renderTarget() {
        return this._renderTarget;
    }
    /**
     * Gets the render target depth used by the render pass.
     */
    get renderTargetDepth() {
        return this._renderTargetDepth;
    }
    /** @internal */
    constructor(name, parentTask, context, engine) {
        super(name, parentTask, context);
        this._usedTextures = [];
        this._depthShared = false;
        this._engine = engine;
    }
    /**
     * Indicates that the pass will use the given texture.
     * Use this method to indicate that the pass will use a texture so that the frame graph can handle the texture's lifecycle.
     * You don't have to call this method for the render target / render target depth textures.
     * @param texture The texture used.
     */
    useTexture(texture) {
        this._usedTextures.push(texture);
    }
    /**
     * Sets the render target to use for rendering.
     * @param renderTargetHandle The render target to use for rendering.
     */
    setRenderTarget(renderTargetHandle) {
        this._renderTarget = renderTargetHandle;
    }
    /**
     * Sets the render target depth to use for rendering.
     * @param renderTargetHandle The render target depth to use for rendering.
     */
    setRenderTargetDepth(renderTargetHandle) {
        this._renderTargetDepth = renderTargetHandle;
    }
    /** @internal */
    _execute() {
        if (this._renderTargetDepth && !this._depthShared) {
            this._context._shareDepth(this._renderTargetDepth, this._renderTarget);
            this._depthShared = true;
        }
        this._context._bindRenderTarget(this._renderTarget, `frame graph - render pass '${this.name}'`);
        super._execute();
        this._context._flushDebugMessages();
    }
    /** @internal */
    _isValid() {
        const errMsg = super._isValid();
        return errMsg ? errMsg : this._renderTarget !== undefined ? null : "Render target is not set (call setRenderTarget to set it)";
    }
}
//# sourceMappingURL=renderPass.js.map