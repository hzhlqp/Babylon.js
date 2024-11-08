import type { GlobalState } from "../globalState";
import type { Line } from "gui/2D/controls/line";
interface IGizmoLineProps {
    globalState: GlobalState;
    control: Line;
}
/**
 * This class represents the gizmo drawn on a line Control.
 * It is used to scale and rotate the control around a pivot point
 * @param props the properties of the gizmo
 * @returns a gizmo line
 */
export declare function GizmoLine(props: IGizmoLineProps): import("react/jsx-runtime").JSX.Element;
export {};
