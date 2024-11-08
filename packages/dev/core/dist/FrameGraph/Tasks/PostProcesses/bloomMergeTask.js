import { ThinBloomMergePostProcess } from "core/PostProcesses/thinBloomMergePostProcess";
import { FrameGraphPostProcessTask } from "./postProcessTask";
/**
 * @internal
 */
export class FrameGraphBloomMergeTask extends FrameGraphPostProcessTask {
    constructor(name, frameGraph, thinPostProcess) {
        super(name, frameGraph, thinPostProcess || new ThinBloomMergePostProcess(name, frameGraph.engine));
    }
    record(skipCreationOfDisabledPasses = false) {
        if (this.sourceTexture === undefined || this.blurTexture === undefined) {
            throw new Error(`FrameGraphBloomMergeTask "${this.name}": sourceTexture and blurTexture are required`);
        }
        const pass = super.record(skipCreationOfDisabledPasses, undefined, (context) => {
            context.bindTextureHandle(this._postProcessDrawWrapper.effect, "bloomBlur", this.blurTexture);
        });
        pass.useTexture(this.blurTexture);
        return pass;
    }
}
//# sourceMappingURL=bloomMergeTask.js.map