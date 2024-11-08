import { Control } from "gui/2D/controls/control";
import * as React from "react";
import type { GlobalState } from "../globalState";
import { Rect } from "./coordinateHelper";
import type { IScalePoint } from "./gizmoScalePoint";
export interface IGuiGizmoProps {
    globalState: GlobalState;
    control: Control;
}
interface IGuiGizmoState {
    canvasBounds: Rect;
    scalePoints: IScalePoint[];
    scalePointDragging: number;
    isRotating: boolean;
}
export declare class GizmoGeneric extends React.Component<IGuiGizmoProps, IGuiGizmoState> {
    private _storedValues;
    private _localBounds;
    private _rotation;
    private _gizmoUpdateObserver;
    private _pointerUpObserver;
    private _pointerMoveObserver;
    constructor(props: IGuiGizmoProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    /**
     * Update the gizmo's positions
     */
    updateGizmo(): void;
    private _onUp;
    private _onMove;
    private _rotate;
    private _dragLocalBounds;
    private _updateNodeFromLocalBounds;
    private _beginDraggingScalePoint;
    private _beginRotate;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
