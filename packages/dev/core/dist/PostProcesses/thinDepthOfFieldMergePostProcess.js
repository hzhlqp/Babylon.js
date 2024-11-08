import { EffectWrapper } from "../Materials/effectRenderer";
import { Engine } from "../Engines/engine";
/**
 * @internal
 */
export class ThinDepthOfFieldMergePostProcess extends EffectWrapper {
    _gatherImports(useWebGPU, list) {
        if (useWebGPU) {
            this._webGPUReady = true;
            list.push(import("../ShadersWGSL/depthOfFieldMerge.fragment"));
        }
        else {
            list.push(import("../Shaders/depthOfFieldMerge.fragment"));
        }
    }
    constructor(name, engine = null, options) {
        super({
            ...options,
            name,
            engine: engine || Engine.LastCreatedEngine,
            useShaderStore: true,
            useAsPostProcess: true,
            fragmentShader: ThinDepthOfFieldMergePostProcess.FragmentUrl,
            samplers: ThinDepthOfFieldMergePostProcess.Samplers,
        });
    }
}
ThinDepthOfFieldMergePostProcess.FragmentUrl = "depthOfFieldMerge";
ThinDepthOfFieldMergePostProcess.Samplers = ["circleOfConfusionSampler", "blurStep0", "blurStep1", "blurStep2"];
//# sourceMappingURL=thinDepthOfFieldMergePostProcess.js.map