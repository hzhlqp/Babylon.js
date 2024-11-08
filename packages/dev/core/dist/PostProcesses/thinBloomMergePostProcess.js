import { EffectWrapper } from "../Materials/effectRenderer";
import { Engine } from "../Engines/engine";
/**
 * @internal
 */
export class ThinBloomMergePostProcess extends EffectWrapper {
    _gatherImports(useWebGPU, list) {
        if (useWebGPU) {
            this._webGPUReady = true;
            list.push(import("../ShadersWGSL/bloomMerge.fragment"));
        }
        else {
            list.push(import("../Shaders/bloomMerge.fragment"));
        }
    }
    constructor(name, engine = null, options) {
        super({
            ...options,
            name,
            engine: engine || Engine.LastCreatedEngine,
            useShaderStore: true,
            useAsPostProcess: true,
            fragmentShader: ThinBloomMergePostProcess.FragmentUrl,
            uniforms: ThinBloomMergePostProcess.Uniforms,
            samplers: ThinBloomMergePostProcess.Samplers,
        });
        /** Weight of the bloom to be added to the original input. */
        this.weight = 1;
    }
    bind() {
        super.bind();
        this._drawWrapper.effect.setFloat("bloomWeight", this.weight);
    }
}
ThinBloomMergePostProcess.FragmentUrl = "bloomMerge";
ThinBloomMergePostProcess.Uniforms = ["bloomWeight"];
ThinBloomMergePostProcess.Samplers = ["bloomBlur"];
//# sourceMappingURL=thinBloomMergePostProcess.js.map