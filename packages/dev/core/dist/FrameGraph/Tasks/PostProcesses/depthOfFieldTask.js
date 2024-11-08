import { Constants } from "core/Engines/constants";
import { FrameGraphTask } from "../../frameGraphTask";
import { FrameGraphDepthOfFieldMergeTask } from "./depthOfFieldMergeTask";
import { FrameGraphCircleOfConfusionTask } from "./circleOfConfusionTask";
import { FrameGraphDepthOfFieldBlurTask } from "./depthOfFieldBlurTask";
import { ThinDepthOfFieldEffect } from "core/PostProcesses/thinDepthOfFieldEffect";
/**
 * Task which applies a depth of field effect.
 */
export class FrameGraphDepthOfFieldTask extends FrameGraphTask {
    /**
     * Constructs a depth of field task.
     * @param name The name of the task.
     * @param frameGraph The frame graph this task belongs to.
     * @param engine The engine to use for the depth of field effect.
     * @param blurLevel The blur level of the depth of field effect (default: ThinDepthOfFieldEffectBlurLevel.Low).
     * @param hdr Whether the depth of field effect is HDR.
     */
    constructor(name, frameGraph, engine, blurLevel = 0 /* ThinDepthOfFieldEffectBlurLevel.Low */, hdr = false) {
        super(name, frameGraph);
        /**
         * The sampling mode to use for the source texture.
         */
        this.sourceSamplingMode = Constants.TEXTURE_BILINEAR_SAMPLINGMODE;
        /**
         * The sampling mode to use for the depth texture.
         */
        this.depthSamplingMode = Constants.TEXTURE_BILINEAR_SAMPLINGMODE;
        this._blurX = [];
        this._blurY = [];
        this._engine = engine;
        this.hdr = hdr;
        this._defaultPipelineTextureType = Constants.TEXTURETYPE_UNSIGNED_BYTE;
        if (hdr) {
            const caps = engine.getCaps();
            if (caps.textureHalfFloatRender) {
                this._defaultPipelineTextureType = Constants.TEXTURETYPE_HALF_FLOAT;
            }
            else if (caps.textureFloatRender) {
                this._defaultPipelineTextureType = Constants.TEXTURETYPE_FLOAT;
            }
        }
        this.depthOfField = new ThinDepthOfFieldEffect(name, engine, blurLevel, true);
        this._circleOfConfusion = new FrameGraphCircleOfConfusionTask(`${name} Circle of Confusion`, this._frameGraph, this.depthOfField._circleOfConfusion);
        const blurCount = this.depthOfField._depthOfFieldBlurX.length;
        for (let i = 0; i < blurCount; i++) {
            this._blurX.push(new FrameGraphDepthOfFieldBlurTask(`${name} Blur X`, this._frameGraph, this.depthOfField._depthOfFieldBlurX[i][0]));
            this._blurY.push(new FrameGraphDepthOfFieldBlurTask(`${name} Blur Y`, this._frameGraph, this.depthOfField._depthOfFieldBlurY[i][0]));
        }
        this._merge = new FrameGraphDepthOfFieldMergeTask(`${name} Merge`, this._frameGraph, this.depthOfField._dofMerge);
        this.outputTexture = this._frameGraph.createDanglingHandle();
    }
    isReady() {
        return this.depthOfField.isReady();
    }
    record() {
        if (this.sourceTexture === undefined || this.depthTexture === undefined || this.camera === undefined) {
            throw new Error("FrameGraphDepthOfFieldTask: sourceTexture, depthTexture and camera are required");
        }
        const sourceTextureDescription = this._frameGraph.getTextureDescription(this.sourceTexture);
        const textureSize = {
            width: sourceTextureDescription.size.width,
            height: sourceTextureDescription.size.height,
        };
        const circleOfConfusionTextureFormat = this._engine.isWebGPU || this._engine.version > 1 ? Constants.TEXTUREFORMAT_RED : Constants.TEXTUREFORMAT_RGBA;
        const textureCreationOptions = {
            size: textureSize,
            options: {
                createMipMaps: false,
                generateMipMaps: false,
                types: [this._defaultPipelineTextureType],
                formats: [circleOfConfusionTextureFormat],
                samples: 1,
                useSRGBBuffers: [false],
                generateDepthBuffer: false,
                generateStencilBuffer: false,
                label: "",
            },
            sizeIsPercentage: false,
        };
        const circleOfConfusionTextureHandle = this._frameGraph.createRenderTargetTexture(this._circleOfConfusion.name, textureCreationOptions);
        this._circleOfConfusion.sourceTexture = this.sourceTexture; // texture not used by the CoC shader
        this._circleOfConfusion.depthTexture = this.depthTexture;
        this._circleOfConfusion.depthSamplingMode = this.depthSamplingMode;
        this._circleOfConfusion.camera = this.camera;
        this._circleOfConfusion.destinationTexture = circleOfConfusionTextureHandle;
        this._circleOfConfusion.record(true);
        textureCreationOptions.options.formats = [Constants.TEXTUREFORMAT_RGBA];
        const blurSteps = [];
        for (let i = 0; i < this._blurX.length; i++) {
            const ratio = this.depthOfField._depthOfFieldBlurX[i][1];
            textureSize.width = Math.floor(sourceTextureDescription.size.width * ratio);
            textureSize.height = Math.floor(sourceTextureDescription.size.height * ratio);
            const blurYTextureHandle = this._frameGraph.createRenderTargetTexture(this._blurY[i].name, textureCreationOptions);
            this._blurY[i].sourceTexture = i === 0 ? this.sourceTexture : this._blurX[i - 1].outputTexture;
            this._blurY[i].sourceSamplingMode = Constants.TEXTURE_BILINEAR_SAMPLINGMODE;
            this._blurY[i].circleOfConfusionTexture = circleOfConfusionTextureHandle;
            this._blurY[i].destinationTexture = blurYTextureHandle;
            this._blurY[i].record(true);
            const blurXTextureHandle = this._frameGraph.createRenderTargetTexture(this._blurX[i].name, textureCreationOptions);
            this._blurX[i].sourceTexture = this._blurY[i].outputTexture;
            this._blurX[i].sourceSamplingMode = Constants.TEXTURE_BILINEAR_SAMPLINGMODE;
            this._blurX[i].circleOfConfusionTexture = circleOfConfusionTextureHandle;
            this._blurX[i].destinationTexture = blurXTextureHandle;
            this._blurX[i].record(true);
            blurSteps.push(blurXTextureHandle);
        }
        const sourceTextureCreationOptions = this._frameGraph.getTextureCreationOptions(this.sourceTexture, true);
        sourceTextureCreationOptions.options.generateDepthBuffer = false;
        sourceTextureCreationOptions.options.generateStencilBuffer = false;
        this._frameGraph.resolveDanglingHandle(this.outputTexture, this.destinationTexture, this._merge.name, sourceTextureCreationOptions);
        this._merge.sourceTexture = this.sourceTexture;
        this._merge.sourceSamplingMode = this.sourceSamplingMode;
        this._merge.circleOfConfusionTexture = circleOfConfusionTextureHandle;
        this._merge.blurSteps = blurSteps;
        this._merge.destinationTexture = this.outputTexture;
        this._merge.record(true);
        const passDisabled = this._frameGraph.addRenderPass(this.name + "_disabled", true);
        passDisabled.setRenderTarget(this.outputTexture);
        passDisabled.setExecuteFunc((context) => {
            context.copyTexture(this.sourceTexture);
        });
    }
    dispose() {
        this._circleOfConfusion.dispose();
        for (let i = 0; i < this._blurX.length; i++) {
            this._blurX[i].dispose();
            this._blurY[i].dispose();
        }
        this._merge.dispose();
        super.dispose();
    }
}
//# sourceMappingURL=depthOfFieldTask.js.map