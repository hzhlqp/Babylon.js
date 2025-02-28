import { __decorate } from "tslib";
import { Logger } from "core/Misc/logger";
import { PostProcess } from "core/PostProcesses/postProcess";
import { Constants } from "core/Engines/constants";
import "core/Rendering/geometryBufferRendererSceneComponent";
import { Color3 } from "core/Maths/math.color";
import { serialize } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { RegisterClass } from "core/Misc/typeStore";
import { EngineStore } from "core/Engines/engineStore";
import { RenderTargetTexture } from "core/Materials/Textures/renderTargetTexture";
import "./edgeDetection.fragment";
/**
 * The Edge Detection effect highlights the edges of objects in the scene like a toon.
 * This can be used for stylized rendering, outlining, or visual effects that require edge enhancement.
 */
export class EdgeDetectionPostProcess extends PostProcess {
    /**
     * Get the current class name of the current effect
     * @returns "EdgeDetectionPostProcess"
     */
    getClassName() {
        return "EdgeDetectionPostProcess";
    }
    /**
     * Creates a new instance of EdgeDetectionPostProcess.
     * @param name The name of the effect.
     * @param scene The scene where the edge detection post-process will be applied.
     * @param options The required width/height ratio or specific options for the post-process.
     * @param camera The camera to apply the post-process to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: TEXTURE_NEAREST_NEAREST)
     * @param reusable If the post-process can be reused on the same frame. (default: false)
     * @param textureType The type of textures used when performing the post-process. (default: TEXTURETYPE_HALF_FLOAT)
     */
    constructor(name, scene, options, camera, samplingMode, reusable, textureType = Constants.TEXTURETYPE_UNSIGNED_INT) {
        super(name, "edgeDetection", ["width", "height", "edgeColor", "edgeIntensity", "edgeWidth", "renderMode"], ["normalSampler", "depthSampler"], options, camera, samplingMode, scene.getEngine(), reusable, null, textureType);
        /**
         * Defines the color of the detected edges.
         */
        this.edgeColor = new Color3(0, 0, 0);
        /**
         * Defines the intensity of the detected edges.
         * Higher values result in more pronounced edges.
         * default: 0.2  (min:0, max:1)
         */
        this.edgeIntensity = 0.2;
        /**
         * Defines the width of the detected edges.
         * Higher values result in thicker edges.
         * default: 0.2 (min:0.125, max:1)
         */
        this.edgeWidth = 0.2;
        /**
         * Defines the render mode.
         * default: 0
         * 0: general, 1: normal, 2: depth, 3: outline only
         */
        this.renderMode = 0;
        this._geometryBufferRenderer = scene.enableGeometryBufferRenderer();
        if (!this._geometryBufferRenderer) {
            // Geometry buffer renderer is not supported. So, work as a passthrough.
            Logger.Error("Geometry Buffer Renderer support is required for this post-process.");
        }
        else {
            // Geometry buffer renderer is supported.
            this.onApply = (effect) => {
                effect.setFloat("width", this.width);
                effect.setFloat("height", this.height);
                effect.setFloat("edgeIntensity", this.edgeIntensity);
                effect.setFloat("edgeWidth", this.edgeWidth);
                effect.setColor3("edgeColor", this.edgeColor);
                const normalTexture = this._geometryBufferRenderer.getGBuffer().textures[1];
                const depthTexture = this._geometryBufferRenderer.getGBuffer().textures[0];
                effect.setTexture("normalSampler", normalTexture);
                effect.setTexture("depthSampler", depthTexture);
                const h1 = new RenderTargetTexture("h1", { width: this.width, height: this.height }, scene, {
                    samplingMode: Constants.TEXTURE_NEAREST_NEAREST,
                    generateMipMaps: false,
                    generateDepthBuffer: false,
                    type: Constants.TEXTURETYPE_HALF_FLOAT,
                });
                switch (this.renderMode) {
                    case 0:
                        break;
                    case 1:
                        effect.setTexture("textureSampler", this._geometryBufferRenderer.getGBuffer().textures[1]);
                        effect.setFloat("edgeWidth", 0);
                        break;
                    case 2:
                        effect.setTexture("textureSampler", this._geometryBufferRenderer.getGBuffer().textures[0]);
                        effect.setFloat("edgeWidth", 0);
                        break;
                    case 3:
                        effect.setTexture("textureSampler", h1);
                        break;
                }
                effect.setInt("renderMode", this.renderMode);
            };
        }
    }
    /**
     * Support test.
     */
    static get IsSupported() {
        const engine = EngineStore.LastCreatedEngine;
        if (!engine) {
            return false;
        }
        return engine.getCaps().drawBuffersExtension;
    }
    /**
     * @internal
     */
    static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
        return SerializationHelper.Parse(() => new EdgeDetectionPostProcess(parsedPostProcess.name, scene, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess.textureType, parsedPostProcess.reusable), parsedPostProcess, scene, rootUrl);
    }
}
__decorate([
    serialize()
], EdgeDetectionPostProcess.prototype, "edgeColor", void 0);
__decorate([
    serialize()
], EdgeDetectionPostProcess.prototype, "edgeIntensity", void 0);
__decorate([
    serialize()
], EdgeDetectionPostProcess.prototype, "edgeWidth", void 0);
__decorate([
    serialize()
], EdgeDetectionPostProcess.prototype, "renderMode", void 0);
RegisterClass("BABYLON.EdgeDetectionPostProcess", EdgeDetectionPostProcess);
//# sourceMappingURL=edgeDetectionPostProcess.js.map