import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IRangeSelectorComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IRangeSelectorComponentState {
}
export declare class RangeSelectorComponent extends React.Component<IRangeSelectorComponentProps, IRangeSelectorComponentState> {
    private _rangeHost;
    private _rangeScrollbarHost;
    private _viewWidth;
    private _pointerIsDown;
    private _minFrame;
    private _maxFrame;
    private _leftHandleIsActive;
    private _bothHandleIsActive;
    private _currentOffset;
    private _currentFrom;
    private _currentTo;
    constructor(props: IRangeSelectorComponentProps);
    private _computeSizes;
    private _onPointerDown;
    private _onPointerMove;
    private _updateLimits;
    private _onPointerUp;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
