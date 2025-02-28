import { Vector3 } from "core/Maths/math.vector";
import type { float } from "core/types";
import { VolumeBasedPanel } from "./volumeBasedPanel";
import type { Control3D } from "./control3D";
/**
 * Class used to create a container panel deployed on the surface of a cylinder
 */
export declare class CylinderPanel extends VolumeBasedPanel {
    private _radius;
    /**
     * Gets or sets the radius of the cylinder where to project controls (5 by default)
     */
    get radius(): float;
    set radius(value: float);
    protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
    private _cylindricalMapping;
}
