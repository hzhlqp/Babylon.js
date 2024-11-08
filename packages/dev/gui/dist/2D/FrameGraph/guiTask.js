import { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import { FrameGraphTask } from "core/FrameGraph/frameGraphTask";
/**
 * Task that renders a GUI texture.
 */
export class FrameGraphGUITask extends FrameGraphTask {
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
        this._adt.disablePicking = value;
    }
    /**
     * Gets the underlying advanced dynamic texture.
     */
    get gui() {
        return this._adt;
    }
    /**
     * Constructs a new GUI task.
     * @param name Name of the task
     * @param frameGraph Frame graph the task belongs to
     * @param adt The GUI texture. If not provided, a new fullscreen GUI will be created.
     */
    constructor(name, frameGraph, adt) {
        super(name, frameGraph);
        if (adt) {
            if (!adt.useStandalone) {
                throw new Error(`AdvancedDynamicTexture "${name}": the texture must have been created with the useStandalone property set to true`);
            }
        }
        else {
            adt = AdvancedDynamicTexture.CreateFullscreenUI(name, undefined, { useStandalone: true });
        }
        this._adt = adt;
        this.outputTexture = this._frameGraph.createDanglingHandle();
    }
    isReady() {
        return this._adt.guiIsReady() && this._adt._layerToDispose.isReady();
    }
    record() {
        if (this.destinationTexture === undefined) {
            throw new Error("FrameGraphGUITask: destinationTexture is required");
        }
        this._frameGraph.resolveDanglingHandle(this.outputTexture, this.destinationTexture);
        const pass = this._frameGraph.addRenderPass(this.name);
        pass.setRenderTarget(this.outputTexture);
        pass.setExecuteFunc((context) => {
            this._adt._checkUpdate(null);
            context.render(this._adt._layerToDispose);
        });
        const passDisabled = this._frameGraph.addRenderPass(this.name + "_disabled", true);
        passDisabled.setRenderTarget(this.outputTexture);
        passDisabled.setExecuteFunc((_context) => { });
    }
    dispose() {
        this._adt.dispose();
        super.dispose();
    }
}
//# sourceMappingURL=guiTask.js.map