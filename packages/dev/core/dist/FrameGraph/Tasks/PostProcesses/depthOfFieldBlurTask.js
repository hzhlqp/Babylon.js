import { Constants } from "core/Engines/constants";
import { FrameGraphBlurTask } from "./blurTask";
import { ThinDepthOfFieldBlurPostProcess } from "core/PostProcesses/thinDepthOfFieldBlurPostProcess";
import { Vector2 } from "core/Maths/math.vector";
/**
 * @internal
 */
export class FrameGraphDepthOfFieldBlurTask extends FrameGraphBlurTask {
    constructor(name, frameGraph, thinPostProcess) {
        super(name, frameGraph, thinPostProcess || new ThinDepthOfFieldBlurPostProcess(name, frameGraph.engine, new Vector2(1, 0), 10));
        this.circleOfConfusionSamplingMode = Constants.TEXTURE_BILINEAR_SAMPLINGMODE;
    }
    record(skipCreationOfDisabledPasses = false) {
        if (this.sourceTexture === undefined || this.circleOfConfusionTexture === undefined) {
            throw new Error(`FrameGraphDepthOfFieldBlurTask "${this.name}": sourceTexture and circleOfConfusionTexture are required`);
        }
        const pass = super.record(skipCreationOfDisabledPasses, (context) => {
            context.setTextureSamplingMode(this.circleOfConfusionTexture, this.circleOfConfusionSamplingMode);
        }, (context) => {
            context.bindTextureHandle(this._postProcessDrawWrapper.effect, "circleOfConfusionSampler", this.circleOfConfusionTexture);
        });
        pass.useTexture(this.circleOfConfusionTexture);
        return pass;
    }
}
//# sourceMappingURL=depthOfFieldBlurTask.js.map