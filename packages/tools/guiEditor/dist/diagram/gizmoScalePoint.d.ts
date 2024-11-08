import type { Vector2 } from "core/Maths/math";
import * as React from "react";
export declare enum ScalePointPosition {
    Top = -1,
    Left = -1,
    Center = 0,
    Right = 1,
    Bottom = 1
}
export interface IScalePoint {
    position: Vector2;
    horizontalPosition: ScalePointPosition;
    verticalPosition: ScalePointPosition;
    rotation: number;
    isPivot: boolean;
    defaultRotation: number;
    id?: number;
}
interface IGizmoScalePointProps {
    scalePoint: IScalePoint;
    clickable: boolean;
    key: number;
    onDrag: (event?: React.PointerEvent<HTMLDivElement>, scalePoint?: IScalePoint) => void;
    onRotate: (event?: React.PointerEvent<HTMLDivElement>, scalePoint?: IScalePoint) => void;
    onUp: () => void;
    overrideCursor?: string;
    canRotate: boolean;
    allowClickOnPivot?: boolean;
}
export declare function GizmoScalePoint(props: IGizmoScalePointProps): import("react/jsx-runtime").JSX.Element;
export {};
