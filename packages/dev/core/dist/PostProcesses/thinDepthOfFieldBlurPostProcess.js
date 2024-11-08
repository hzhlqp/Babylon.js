import { ThinBlurPostProcess } from "./thinBlurPostProcess";
/**
 * @internal
 */
export class ThinDepthOfFieldBlurPostProcess extends ThinBlurPostProcess {
    constructor(name, engine = null, direction, kernel, options) {
        super(name, engine, direction, kernel, {
            ...options,
            defines: `#define DOF 1\n`,
        });
    }
}
//# sourceMappingURL=thinDepthOfFieldBlurPostProcess.js.map