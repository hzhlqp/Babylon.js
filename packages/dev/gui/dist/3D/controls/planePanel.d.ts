import { Vector3 } from "core/Maths/math.vector";
import type { Control3D } from "./control3D";
import { VolumeBasedPanel } from "./volumeBasedPanel";
/**
 * Class used to create a container panel deployed on the surface of a plane
 */
export declare class PlanePanel extends VolumeBasedPanel {
    protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
}
