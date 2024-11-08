import { Color4 } from "../../../Maths/math.color";
import { FrameGraphTask } from "../../frameGraphTask";
/**
 * Task used to clear a texture.
 */
export class FrameGraphClearTextureTask extends FrameGraphTask {
    constructor(name, frameGraph) {
        super(name, frameGraph);
        /**
         * The color to clear the texture with.
         */
        this.color = new Color4(0.2, 0.2, 0.3, 1);
        /**
         * If the color should be cleared.
         */
        this.clearColor = true;
        /**
         * If the depth should be cleared.
         */
        this.clearDepth = false;
        /**
         * If the stencil should be cleared.
         */
        this.clearStencil = false;
        this.outputTexture = this._frameGraph.createDanglingHandle();
    }
    record() {
        if (this.destinationTexture === undefined) {
            throw new Error(`FrameGraphClearTextureTask ${this.name}: destinationTexture is required`);
        }
        this._frameGraph.resolveDanglingHandle(this.outputTexture, this.destinationTexture);
        const pass = this._frameGraph.addRenderPass(this.name);
        pass.setRenderTarget(this.destinationTexture);
        pass.setExecuteFunc((context) => {
            context.clear(this.color, !!this.clearColor, !!this.clearDepth, !!this.clearStencil);
        });
        const passDisabled = this._frameGraph.addRenderPass(this.name + "_disabled", true);
        passDisabled.setRenderTarget(this.destinationTexture);
        passDisabled.setExecuteFunc((_context) => { });
    }
}
//# sourceMappingURL=clearTextureTask.js.map