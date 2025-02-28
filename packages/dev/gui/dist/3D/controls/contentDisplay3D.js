import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
import { Control3D } from "./control3D";
import { Texture } from "core/Materials/Textures/texture";
/**
 * The base class for controls that display content
 */
export class ContentDisplay3D extends Control3D {
    constructor() {
        super(...arguments);
        this._contentResolution = 512;
        this._contentScaleRatio = 2;
    }
    /**
     * Gets or sets the GUI 2D content used to display the button's facade
     */
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
        if (!value || !this._host || !this._host.utilityLayer) {
            return;
        }
        if (!this._facadeTexture) {
            const width = typeof this._contentResolution === "number" ? this._contentResolution : this._contentResolution.width;
            const height = typeof this._contentResolution === "number" ? this._contentResolution : this._contentResolution.height;
            this._facadeTexture = new AdvancedDynamicTexture("Facade", width, height, this._host.utilityLayer.utilityLayerScene, true, Texture.TRILINEAR_SAMPLINGMODE);
            this._setFacadeTextureScaling();
            this._facadeTexture.premulAlpha = true;
        }
        else {
            this._facadeTexture.rootContainer.clearControls();
        }
        this._facadeTexture.addControl(value);
        this._applyFacade(this._facadeTexture);
    }
    _setFacadeTextureScaling() {
        if (this._facadeTexture) {
            if (typeof this._contentResolution !== "number") {
                this._contentScaleRatioY = (this._contentResolution.height / this._contentResolution.width) * this._contentScaleRatio;
            }
            this._facadeTexture.rootContainer.scaleX = this._contentScaleRatio;
            this._facadeTexture.rootContainer.scaleY = this._contentScaleRatioY ?? this._contentScaleRatio;
        }
    }
    /**
     * Gets or sets the texture resolution used to render content (512 by default)
     */
    get contentResolution() {
        return this._contentResolution;
    }
    set contentResolution(value) {
        const incomingWidth = typeof value === "number" ? value : value.width;
        const incomingHeight = typeof value === "number" ? value : value.height;
        const currentWidth = typeof this._contentResolution === "number" ? this._contentResolution : this._contentResolution.width;
        const currentHeight = typeof this._contentResolution === "number" ? this._contentResolution : this._contentResolution.height;
        if (incomingWidth === currentWidth && incomingHeight === currentHeight) {
            return;
        }
        this._contentResolution = value;
        this._resetContent();
    }
    _disposeFacadeTexture() {
        if (this._facadeTexture) {
            this._facadeTexture.dispose();
            this._facadeTexture = null;
        }
    }
    _resetContent() {
        this._disposeFacadeTexture();
        this.content = this._content;
    }
    /**
     * Apply the facade texture (created from the content property).
     * This function can be overloaded by child classes
     * @param facadeTexture defines the AdvancedDynamicTexture to use
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _applyFacade(facadeTexture) { }
}
//# sourceMappingURL=contentDisplay3D.js.map