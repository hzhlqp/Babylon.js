import type { Scene } from "core/scene";
import type { Vector3 } from "core/Maths/math.vector";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Nullable } from "core/types";
import type { Control3D } from "./control3D";
import { VolumeBasedPanel } from "./volumeBasedPanel";
import { Mesh } from "core/Meshes/mesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Container3D } from "./container3D";
import type { TouchHolographicButton } from "./touchHolographicButton";
/**
 * Simple menu that can contain holographic buttons
 */
export declare class TouchHolographicMenu extends VolumeBasedPanel {
    protected _backPlate: Mesh;
    private _backPlateMaterial;
    private _pickedPointObserver;
    private _currentMin;
    private _currentMax;
    private _backPlateMargin;
    /**
     * Scale for the buttons added to the menu
     */
    protected static MENU_BUTTON_SCALE: number;
    /**
     * Gets or sets the margin size of the backplate in button size units.
     * Setting this to 1, will make the backPlate margin the size of 1 button
     */
    get backPlateMargin(): number;
    set backPlateMargin(value: number);
    protected _createNode(scene: Scene): Nullable<TransformNode>;
    protected _affectMaterial(mesh: AbstractMesh): void;
    protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
    protected _finalProcessing(): void;
    private _updateCurrentMinMax;
    private _updateMargins;
    /**
     * Creates a holographic menu GUI 3D control
     * @param name name of the menu
     */
    constructor(name?: string);
    /**
     * Adds a button to the menu.
     * Please note that the back material of the button will be set to transparent as it is attached to the menu.
     *
     * @param button Button to add
     * @returns This menu
     */
    addButton(button: TouchHolographicButton): TouchHolographicMenu;
    /**
     * This method should not be used directly. It is inherited from `Container3D`.
     * Please use `addButton` instead.
     * @param _control the control to add
     * @returns the current container
     */
    addControl(_control: Control3D): Container3D;
    /**
     * Disposes the menu
     */
    dispose(): void;
}
