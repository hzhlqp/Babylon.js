import { Control } from "gui/2D/controls/control";
import { Matrix2D } from "gui/2D/math2D";
import { Vector2 } from "core/Maths/math.vector";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../globalState";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import { Measure } from "gui/2D/measure";
export type DimensionProperties = "width" | "left" | "height" | "top" | "paddingLeft" | "paddingRight" | "paddingTop" | "paddingBottom" | "fontSize" | "linkOffsetX" | "linkOffsetY";
export declare class Rect {
    top: number;
    left: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    clone(): Rect;
    get center(): Vector2;
    get width(): number;
    get height(): number;
}
export declare class CoordinateHelper {
    private static _MatrixCache;
    static GlobalState: GlobalState;
    /**
     * Get the scaling of a specific GUI control
     * @param node the node for which we are getting the scaling
     * @param relative should we return only the relative scaling (relative to the parent)
     * @returns an X,Y vector of the scaling
     */
    static GetScale(node: Control, relative?: boolean): Vector2;
    static GetRotation(node: Control, relative?: boolean): number;
    static GetParentSizes(guiControl: Control): Measure;
    /**
     * This function calculates a local matrix for a node, including it's full transformation and pivot point
     *
     * @param node the node to calculate the matrix for
     * @param storedValues should the stored (cached) values be used to calculate the matrix
     * @returns a new matrix for the control
     */
    static GetNodeMatrix(node: Control, storedValues?: Rect): Matrix2D;
    /**
     * Using the node's tree, calculate its world matrix and return it
     * @param node the node to calculate the matrix for
     * @param storedValues used stored valued (cached when pointer down is clicked)
     * @param stopAt stop looking when this node is found
     * @returns the world matrix for this node
     */
    static NodeToRTTWorldMatrix(node: Control, storedValues?: Rect, stopAt?: Control): Matrix2D;
    static NodeToRTTSpace(node: Control, x: number, y: number, reference?: Vector2, storedValues?: Rect, stopAt?: Control): Vector2;
    static RttToLocalNodeSpace(node: Control, x: number, y: number, reference?: Vector2, storedValues?: Rect): Vector2;
    static RttToCanvasSpace(x: number, y: number): Vector2;
    static MousePointerToRTTSpace(_node?: Control, x?: number, y?: number): Vector2;
    private static _ResetMatrixArray;
    static ComputeLocalBounds(node: Control): Rect;
    /**
     * converts a node's dimensions to percentage, properties can be specified as a list, or can convert all
     * @param guiControl
     * @param properties
     * @param onPropertyChangedObservable
     */
    static ConvertToPercentage(guiControl: Control, properties?: DimensionProperties[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>): void;
    static Round(value: number): number;
    static ConvertToPixels(guiControl: Control, properties?: DimensionProperties[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>): void;
}
