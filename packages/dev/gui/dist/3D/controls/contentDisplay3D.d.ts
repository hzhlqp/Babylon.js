import type { Control } from "../../2D/controls/control";
import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
import type { Nullable } from "core/types";
import { Control3D } from "./control3D";
/**
 * The base class for controls that display content
 */
export declare class ContentDisplay3D extends Control3D {
    private _content;
    protected _facadeTexture: Nullable<AdvancedDynamicTexture>;
    protected _contentResolution: number | {
        width: number;
        height: number;
    };
    protected _contentScaleRatio: number;
    protected _contentScaleRatioY?: number;
    /**
     * Gets or sets the GUI 2D content used to display the button's facade
     */
    get content(): Control;
    set content(value: Control);
    protected _setFacadeTextureScaling(): void;
    /**
     * Gets or sets the texture resolution used to render content (512 by default)
     */
    get contentResolution(): number | {
        width: number;
        height: number;
    };
    set contentResolution(value: number | {
        width: number;
        height: number;
    });
    protected _disposeFacadeTexture(): void;
    protected _resetContent(): void;
    /**
     * Apply the facade texture (created from the content property).
     * This function can be overloaded by child classes
     * @param facadeTexture defines the AdvancedDynamicTexture to use
     */
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
}
