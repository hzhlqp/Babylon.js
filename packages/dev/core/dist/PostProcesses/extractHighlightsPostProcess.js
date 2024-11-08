import { __decorate } from "tslib";
import { PostProcess } from "./postProcess";
import { Constants } from "../Engines/constants";
import { serialize } from "../Misc/decorators";
import { RegisterClass } from "../Misc/typeStore";
import { ThinExtractHighlightsPostProcess } from "./thinExtractHighlightsPostProcess";
/**
 * The extract highlights post process sets all pixels to black except pixels above the specified luminance threshold. Used as the first step for a bloom effect.
 */
export class ExtractHighlightsPostProcess extends PostProcess {
    /**
     * The luminance threshold, pixels below this value will be set to black.
     */
    get threshold() {
        return this._effectWrapper.threshold;
    }
    set threshold(value) {
        this._effectWrapper.threshold = value;
    }
    /** @internal */
    get _exposure() {
        return this._effectWrapper._exposure;
    }
    /** @internal */
    set _exposure(value) {
        this._effectWrapper._exposure = value;
    }
    /**
     * Gets a string identifying the name of the class
     * @returns "ExtractHighlightsPostProcess" string
     */
    getClassName() {
        return "ExtractHighlightsPostProcess";
    }
    constructor(name, options, camera = null, samplingMode, engine, reusable, textureType = Constants.TEXTURETYPE_UNSIGNED_INT, blockCompilation = false) {
        const localOptions = {
            uniforms: ThinExtractHighlightsPostProcess.Uniforms,
            size: typeof options === "number" ? options : undefined,
            camera,
            samplingMode,
            engine,
            reusable,
            textureType,
            blockCompilation,
            ...options,
        };
        super(name, ThinExtractHighlightsPostProcess.FragmentUrl, {
            effectWrapper: typeof options === "number" || !options.effectWrapper ? new ThinExtractHighlightsPostProcess(name, engine, localOptions) : undefined,
            ...localOptions,
        });
        /**
         * Post process which has the input texture to be used when performing highlight extraction
         * @internal
         */
        this._inputPostProcess = null;
        this.onApplyObservable.add((effect) => {
            this.externalTextureSamplerBinding = !!this._inputPostProcess;
            if (this._inputPostProcess) {
                effect.setTextureFromPostProcess("textureSampler", this._inputPostProcess);
            }
        });
    }
}
__decorate([
    serialize()
], ExtractHighlightsPostProcess.prototype, "threshold", null);
RegisterClass("BABYLON.ExtractHighlightsPostProcess", ExtractHighlightsPostProcess);
//# sourceMappingURL=extractHighlightsPostProcess.js.map