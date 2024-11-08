import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IGraphComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IGraphComponentState {
}
export declare class GraphComponent extends React.Component<IGraphComponentProps, IGraphComponentState> {
    private readonly _minScale;
    private readonly _maxScale;
    private readonly _graphAbsoluteWidth;
    private readonly _graphAbsoluteHeight;
    private _viewWidth;
    private _viewCurveWidth;
    private _viewHeight;
    private _viewScale;
    private _offsetX;
    private _offsetY;
    private _inSelectionMode;
    private _graphOffsetX;
    private _minValue;
    private _maxValue;
    private _minFrame;
    private _maxFrame;
    private _svgHost;
    private _svgHost2;
    private _selectionRectangle;
    private _curves;
    private _pointerIsDown;
    private _sourcePointerX;
    private _sourcePointerY;
    private _selectionMade;
    private _selectionStartX;
    private _selectionStartY;
    private _onActiveAnimationChangedObserver;
    constructor(props: IGraphComponentProps);
    componentWillUnmount(): void;
    private _computeSizes;
    private _setDefaultInTangent;
    private _setDefaultOutTangent;
    private _evaluateKeys;
    private _extractValuesFromKeys;
    private _convertX;
    private _invertX;
    private _convertY;
    private _invertY;
    private _buildFrameIntervalAxis;
    private _buildYAxis;
    private _frameFromActiveKeys;
    private _dropKeyFrames;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
    private _onWheel;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
