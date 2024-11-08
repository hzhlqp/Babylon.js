import { backbufferDepthStencilTextureHandle } from "../../frameGraphTypes";
import { RenderTargetTexture } from "../../../Materials/Textures/renderTargetTexture";
import { Color4 } from "core/Maths/math.color";
import { MaterialHelperGeometryRendering } from "core/Materials/materialHelper.geometryrendering";
import { Constants } from "core/Engines/constants";
import { FrameGraphTask } from "../../frameGraphTask";
const clearColors = [new Color4(0, 0, 0, 0), new Color4(1, 1, 1, 1), new Color4(1e8, 1e8, 1e8, 1e8)];
/**
 * Task used to render geometry to a set of textures.
 */
export class FrameGraphGeometryRendererTask extends FrameGraphTask {
    /**
     * Gets or sets the camera used for rendering.
     */
    get camera() {
        return this._camera;
    }
    set camera(camera) {
        this._camera = camera;
        this._rtt.activeCamera = this.camera;
    }
    /**
     * The render target texture used by the geometry renderer task.
     */
    get renderTargetTexture() {
        return this._rtt;
    }
    /**
     * Gets or sets the name of the task.
     */
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
     * Constructs a new geometry renderer task.
     * @param name The name of the task.
     * @param frameGraph The frame graph the task belongs to.
     * @param scene The scene the frame graph is associated with.
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph);
        /**
         * Whether depth testing is enabled (default is true).
         */
        this.depthTest = true;
        /**
         * Whether depth writing is enabled (default is true).
         */
        this.depthWrite = true;
        /**
         * The size of the output textures (default is 100% of the back buffer texture size).
         */
        this.size = { width: 100, height: 100 };
        /**
         * Whether the size is a percentage of the back buffer size (default is true).
         */
        this.sizeIsPercentage = true;
        /**
         * The number of samples to use for the output textures (default is 1).
         */
        this.samples = 1;
        /**
         * The list of texture descriptions used by the geometry renderer task.
         */
        this.textureDescriptions = [];
        this._scene = scene;
        this._engine = this._scene.getEngine();
        this._rtt = new RenderTargetTexture(name, 1, scene, {
            delayAllocation: true,
        });
        this._rtt.skipInitialClear = true;
        this._rtt.renderSprites = false;
        this._rtt.renderParticles = false;
        this.name = name;
        this._clearAttachmentsLayout = new Map();
        this._allAttachmentsLayout = [];
        this.outputDepthTexture = this._frameGraph.createDanglingHandle();
        this.geometryViewDepthTexture = this._frameGraph.createDanglingHandle();
        this.geometryScreenDepthTexture = this._frameGraph.createDanglingHandle();
        this.geometryViewNormalTexture = this._frameGraph.createDanglingHandle();
        this.geometryWorldNormalTexture = this._frameGraph.createDanglingHandle();
        this.geometryLocalPositionTexture = this._frameGraph.createDanglingHandle();
        this.geometryWorldPositionTexture = this._frameGraph.createDanglingHandle();
        this.geometryAlbedoTexture = this._frameGraph.createDanglingHandle();
        this.geometryReflectivityTexture = this._frameGraph.createDanglingHandle();
        this.geometryVelocityTexture = this._frameGraph.createDanglingHandle();
        this.geometryLinearVelocityTexture = this._frameGraph.createDanglingHandle();
    }
    /**
     * Gets the list of excluded meshes from the velocity texture.
     */
    get excludedSkinnedMeshFromVelocityTexture() {
        return MaterialHelperGeometryRendering.GetConfiguration(this._rtt.renderPassId).excludedSkinnedMesh;
    }
    isReady() {
        return this._rtt.isReadyForRendering();
    }
    record() {
        if (this.textureDescriptions.length === 0 || this.objectList === undefined) {
            throw new Error(`FrameGraphGeometryRendererTask ${this.name}: object list and at least one geometry texture description must be provided`);
        }
        const outputTextureHandle = this._createMultiRenderTargetTexture();
        const depthEnabled = this._checkDepthTextureCompatibility();
        this._buildClearAttachmentsLayout();
        this._registerForRenderPassId(this._rtt.renderPassId);
        const outputTextureDescription = this._frameGraph.getTextureDescription(outputTextureHandle);
        this._rtt._size = outputTextureDescription.size;
        // Create pass
        MaterialHelperGeometryRendering.MarkAsDirty(this._rtt.renderPassId, this.objectList.meshes || this._scene.meshes);
        const pass = this._frameGraph.addRenderPass(this.name);
        pass.setRenderTarget(outputTextureHandle);
        let handle = outputTextureHandle + 1;
        for (let i = 0; i < this.textureDescriptions.length; i++) {
            const description = this.textureDescriptions[i];
            const index = MaterialHelperGeometryRendering.GeometryTextureDescriptions.findIndex((f) => f.type === description.type);
            const geometryDescription = MaterialHelperGeometryRendering.GeometryTextureDescriptions[index];
            switch (geometryDescription.type) {
                case Constants.PREPASS_DEPTH_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryViewDepthTexture, handle++);
                    break;
                case Constants.PREPASS_SCREENSPACE_DEPTH_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryScreenDepthTexture, handle++);
                    break;
                case Constants.PREPASS_NORMAL_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryViewNormalTexture, handle++);
                    break;
                case Constants.PREPASS_WORLD_NORMAL_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryWorldNormalTexture, handle++);
                    break;
                case Constants.PREPASS_LOCAL_POSITION_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryLocalPositionTexture, handle++);
                    break;
                case Constants.PREPASS_POSITION_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryWorldPositionTexture, handle++);
                    break;
                case Constants.PREPASS_ALBEDO_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryAlbedoTexture, handle++);
                    break;
                case Constants.PREPASS_REFLECTIVITY_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryReflectivityTexture, handle++);
                    break;
                case Constants.PREPASS_VELOCITY_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryVelocityTexture, handle++);
                    break;
                case Constants.PREPASS_VELOCITY_LINEAR_TEXTURE_TYPE:
                    this._frameGraph.resolveDanglingHandle(this.geometryLinearVelocityTexture, handle++);
                    break;
            }
        }
        if (this.depthTexture !== undefined) {
            pass.setRenderTargetDepth(this.depthTexture);
        }
        pass.setExecuteFunc((context) => {
            this._rtt.renderList = this.objectList.meshes;
            this._rtt.particleSystemList = this.objectList.particleSystems;
            this._scene.incrementRenderId();
            this._scene.resetCachedMaterial();
            context.setDepthStates(this.depthTest && depthEnabled, this.depthWrite && depthEnabled);
            this._clearAttachmentsLayout.forEach((layout, clearType) => {
                context.clearColorAttachments(clearColors[clearType], layout);
            });
            context.bindAttachments(this._allAttachmentsLayout);
            context.render(this._rtt);
        });
    }
    dispose() {
        MaterialHelperGeometryRendering.DeleteConfiguration(this._rtt.renderPassId);
        this._rtt.dispose();
        super.dispose();
    }
    _createMultiRenderTargetTexture() {
        const types = [];
        const formats = [];
        const labels = [];
        const useSRGBBuffers = [];
        for (let i = 0; i < this.textureDescriptions.length; i++) {
            const description = this.textureDescriptions[i];
            const index = MaterialHelperGeometryRendering.GeometryTextureDescriptions.findIndex((f) => f.type === description.type);
            if (index === -1) {
                throw new Error(`FrameGraphGeometryRendererTask ${this.name}: unknown texture type ${description.type}`);
            }
            types[i] = description.textureType;
            formats[i] = description.textureFormat;
            labels[i] = MaterialHelperGeometryRendering.GeometryTextureDescriptions[index].name;
            useSRGBBuffers[i] = false;
        }
        return this._frameGraph.createRenderTargetTexture(this.name, {
            size: this.size,
            sizeIsPercentage: this.sizeIsPercentage,
            options: {
                createMipMaps: false,
                generateDepthBuffer: false,
                textureCount: this.textureDescriptions.length,
                samples: this.samples,
                types,
                formats,
                useSRGBBuffers,
                labels,
            },
        }, true);
    }
    _checkDepthTextureCompatibility() {
        let depthEnabled = false;
        if (this.depthTexture !== undefined) {
            if (this.depthTexture === backbufferDepthStencilTextureHandle) {
                throw new Error(`FrameGraphGeometryRendererTask ${this.name}: the depth/stencil back buffer is not allowed as a depth texture`);
            }
            const depthTextureDescription = this._frameGraph.getTextureDescription(this.depthTexture);
            if (depthTextureDescription.options.samples !== this.samples) {
                throw new Error(`FrameGraphGeometryRendererTask ${this.name}: the depth texture and the output texture must have the same number of samples`);
            }
            this._frameGraph.resolveDanglingHandle(this.outputDepthTexture, this.depthTexture);
            depthEnabled = true;
        }
        return depthEnabled;
    }
    _buildClearAttachmentsLayout() {
        const clearAttachmentsLayout = new Map();
        const allAttachmentsLayout = [];
        for (let i = 0; i < this.textureDescriptions.length; i++) {
            const description = this.textureDescriptions[i];
            const index = MaterialHelperGeometryRendering.GeometryTextureDescriptions.findIndex((f) => f.type === description.type);
            const geometryDescription = MaterialHelperGeometryRendering.GeometryTextureDescriptions[index];
            let layout = clearAttachmentsLayout.get(geometryDescription.clearType);
            if (layout === undefined) {
                layout = [];
                clearAttachmentsLayout.set(geometryDescription.clearType, layout);
                for (let j = 0; j < i; j++) {
                    layout[j] = false;
                }
            }
            clearAttachmentsLayout.forEach((layout, clearType) => {
                layout.push(clearType === geometryDescription.clearType);
            });
            allAttachmentsLayout.push(true);
        }
        this._clearAttachmentsLayout = new Map();
        clearAttachmentsLayout.forEach((layout, clearType) => {
            this._clearAttachmentsLayout.set(clearType, this._engine.buildTextureLayout(layout));
        });
        this._allAttachmentsLayout = this._engine.buildTextureLayout(allAttachmentsLayout);
    }
    _registerForRenderPassId(renderPassId) {
        const configuration = MaterialHelperGeometryRendering.CreateConfiguration(renderPassId);
        for (let i = 0; i < this.textureDescriptions.length; i++) {
            const description = this.textureDescriptions[i];
            const index = MaterialHelperGeometryRendering.GeometryTextureDescriptions.findIndex((f) => f.type === description.type);
            const geometryDescription = MaterialHelperGeometryRendering.GeometryTextureDescriptions[index];
            configuration.defines[geometryDescription.defineIndex] = i;
        }
    }
}
//# sourceMappingURL=geometryRendererTask.js.map