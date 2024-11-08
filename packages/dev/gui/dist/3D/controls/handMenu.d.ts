import type { Scene } from "core/scene";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Nullable } from "core/types";
import { TouchHolographicMenu } from "./touchHolographicMenu";
import { HandConstraintBehavior } from "core/Behaviors/Meshes/handConstraintBehavior";
import type { WebXRExperienceHelper } from "core/XR/webXRExperienceHelper";
/**
 * Hand menu that displays buttons and floats around the hand.
 * @since 5.0.0
 */
export declare class HandMenu extends TouchHolographicMenu {
    private _handConstraintBehavior;
    /**
     * The hand constraint behavior setting the transformation of this node
     */
    get handConstraintBehavior(): HandConstraintBehavior;
    protected _createNode(scene: Scene): Nullable<TransformNode>;
    /**
     * Creates a hand menu GUI 3D control
     * @param xr the WebXRExperienceHelper used to link this control to the enabled WebXRHandTracking feature
     * @param name name of the hand menu
     */
    constructor(xr: WebXRExperienceHelper, name?: string);
    /**
     * Disposes the hand menu
     */
    dispose(): void;
}
