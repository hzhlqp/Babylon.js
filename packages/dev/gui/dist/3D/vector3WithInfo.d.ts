import { Vector3 } from "core/Maths/math.vector";
/**
 * Class used to transport Vector3 information for pointer events
 */
export declare class Vector3WithInfo extends Vector3 {
    /** defines the current mouse button index */
    buttonIndex: number;
    /**
     * Creates a new Vector3WithInfo
     * @param source defines the vector3 data to transport
     * @param buttonIndex defines the current mouse button index
     */
    constructor(source: Vector3, 
    /** defines the current mouse button index */
    buttonIndex?: number);
}
