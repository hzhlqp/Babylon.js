import type { Nullable } from "core/types";
import * as React from "react";
import type { Context } from "../context";
import type { Curve } from "./curve";
interface IKeyPointComponentProps {
    x: number;
    y: number;
    getPreviousX: () => Nullable<number>;
    getNextX: () => Nullable<number>;
    invertX: (x: number) => number;
    invertY: (y: number) => number;
    convertX: (x: number) => number;
    convertY: (y: number) => number;
    nextX?: number;
    scale: number;
    keyId: number;
    curve: Curve;
    context: Context;
    channel: string;
    onFrameValueChanged: (value: number) => void;
    onKeyValueChanged: (value: number) => void;
}
interface IKeyPointComponentState {
    selectedState: SelectionState;
    tangentSelectedIndex: number;
    x: number;
    y: number;
}
export declare enum SelectionState {
    None = 0,
    Selected = 1,
    Siblings = 2
}
export declare class KeyPointComponent extends React.Component<IKeyPointComponentProps, IKeyPointComponentState> {
    private _onActiveKeyPointChangedObserver;
    private _onActiveKeyFrameChangedObserver;
    private _onFrameManuallyEnteredObserver;
    private _onValueManuallyEnteredObserver;
    private _onMainKeyPointSetObserver;
    private _onMainKeyPointMovedObserver;
    private _onSelectionRectangleMovedObserver;
    private _onFlattenTangentRequiredObserver;
    private _onLinearTangentRequiredObserver;
    private _onBreakTangentRequiredObserver;
    private _onUnifyTangentRequiredObserver;
    private _onStepTangentRequiredObserver;
    private _onSelectAllKeysObserver;
    private _pointerIsDown;
    private _sourcePointerX;
    private _sourcePointerY;
    private _offsetXToMain;
    private _offsetYToMain;
    private _svgHost;
    private _keyPointSVG;
    private _controlMode;
    private _storedLengthIn;
    private _storedLengthOut;
    private _inVec;
    private _outVec;
    private _lockX;
    private _lockY;
    private _accumulatedX;
    private _accumulatedY;
    constructor(props: IKeyPointComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(newProps: IKeyPointComponentProps, newState: IKeyPointComponentState): boolean;
    private _breakTangent;
    private _unifyTangent;
    private _flattenTangent;
    private _linearTangent;
    private _stepTangent;
    private _select;
    private _onPointerDown;
    private _extractSlope;
    private _processTangentMove;
    private _onPointerMove;
    private _onPointerUp;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
