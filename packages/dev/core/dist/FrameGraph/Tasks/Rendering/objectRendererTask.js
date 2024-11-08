import { backbufferColorTextureHandle, backbufferDepthStencilTextureHandle } from "../../frameGraphTypes";
import { RenderTargetTexture } from "../../../Materials/Textures/renderTargetTexture";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to render objects to a texture.
 */
export class FrameGraphObjectRendererTask extends FrameGraphTask {
    /**
     * Gets or sets the camera used to render the objects.
     */
    get camera() {
        return this._camera;
    }
    set camera(camera) {
        this._camera = camera;
        this._rtt.activeCamera = this.camera;
    }
    /**
     * The render target texture used to render the objects.
     */
    get renderTargetTexture() {
        return this._rtt;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        if (this._rtt) {
            this._rtt.name = value + "_internal_rtt";
        }
    }
    /**
     * Constructs a new object renderer task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene the frame graph is associated with.
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph);
        /**
         * The dependencies of the task (optional).
         */
        this.dependencies = [];
        /**
         * If depth testing should be enabled (default is true).
         */
        this.depthTest = true;
        /**
         * If depth writing should be enabled (default is true).
         */
        this.depthWrite = true;
        this._scene = scene;
        this._rtt = new RenderTargetTexture(name, 1, scene, {
            delayAllocation: true,
        });
        this._rtt.skipInitialClear = true;
        this.name = name;
        this.outputTexture = this._frameGraph.createDanglingHandle();
        this.outputDepthTexture = this._frameGraph.createDanglingHandle();
    }
    isReady() {
        return this._rtt.isReadyForRendering();
    }
    record(skipCreationOfDisabledPasses = false, additionalExecute) {
        if (this.destinationTexture === undefined || this.objectList === undefined) {
            throw new Error(`FrameGraphObjectRendererTask ${this.name}: destinationTexture and objectList are required`);
        }
        const outputTextureDescription = this._frameGraph.getTextureDescription(this.destinationTexture);
        let depthEnabled = false;
        if (this.depthTexture !== undefined) {
            if (this.depthTexture === backbufferDepthStencilTextureHandle && this.destinationTexture !== backbufferColorTextureHandle) {
                throw new Error(`FrameGraphObjectRendererTask ${this.name}: the back buffer color texture is the only color texture allowed when the depth is the back buffer depth/stencil`);
            }
            if (this.depthTexture !== backbufferDepthStencilTextureHandle && this.destinationTexture === backbufferColorTextureHandle) {
                throw new Error(`FrameGraphObjectRendererTask ${this.name}: the back buffer depth/stencil texture is the only depth texture allowed when the destination is the back buffer color`);
            }
            const depthTextureDescription = this._frameGraph.getTextureDescription(this.depthTexture);
            if (depthTextureDescription.options.samples !== outputTextureDescription.options.samples) {
                throw new Error(`FrameGraphObjectRendererTask ${this.name}: the depth texture and the output texture must have the same number of samples`);
            }
            depthEnabled = true;
        }
        this._frameGraph.resolveDanglingHandle(this.outputTexture, this.destinationTexture);
        if (this.depthTexture !== undefined) {
            this._frameGraph.resolveDanglingHandle(this.outputDepthTexture, this.depthTexture);
        }
        this._rtt._size = outputTextureDescription.size;
        const pass = this._frameGraph.addRenderPass(this.name);
        pass.setRenderTarget(this.destinationTexture);
        if (this.depthTexture !== undefined) {
            pass.setRenderTargetDepth(this.depthTexture);
        }
        pass.setExecuteFunc((_context) => {
            this._rtt.renderList = this.objectList.meshes;
            this._rtt.particleSystemList = this.objectList.particleSystems;
            this._scene.incrementRenderId();
            this._scene.resetCachedMaterial();
            _context.setDepthStates(this.depthTest && depthEnabled, this.depthWrite && depthEnabled);
            _context.render(this._rtt);
            additionalExecute?.(_context);
        });
        if (this.dependencies !== undefined) {
            for (const handle of this.dependencies) {
                pass.useTexture(handle);
            }
        }
        if (!skipCreationOfDisabledPasses) {
            const passDisabled = this._frameGraph.addRenderPass(this.name + "_disabled", true);
            passDisabled.setRenderTarget(this.destinationTexture);
            if (this.depthTexture !== undefined) {
                passDisabled.setRenderTargetDepth(this.depthTexture);
            }
            passDisabled.setExecuteFunc((_context) => { });
            if (this.dependencies !== undefined) {
                for (const handle of this.dependencies) {
                    passDisabled.useTexture(handle);
                }
            }
        }
    }
    dispose() {
        this._rtt.dispose();
        super.dispose();
    }
}
//# sourceMappingURL=objectRendererTask.js.map