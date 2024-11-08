import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IPlayHeadComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IPlayHeadComponentState {
}
export declare class PlayHeadComponent extends React.Component<IPlayHeadComponentProps, IPlayHeadComponentState> {
    private readonly _graphAbsoluteWidth;
    private _playHead;
    private _playHeadCircle;
    private _onBeforeRenderObserver;
    private _onActiveAnimationChangedObserver;
    private _onRangeFrameBarResizedObserver;
    private _onMoveToFrameRequiredObserver;
    private _onGraphMovedObserver;
    private _onGraphScaledObserver;
    private _viewScale;
    private _offsetX;
    private _offsetRange;
    private _viewWidth;
    private readonly _rangeWidthToPlayheadWidth;
    private _pointerIsDown;
    constructor(props: IPlayHeadComponentProps);
    private _moveHead;
    private _frameToPixel;
    private _pixelToFrame;
    componentWillUnmount(): void;
    private _getPixelValues;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
