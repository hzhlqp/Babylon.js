import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IRangeFrameBarComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IRangeFrameBarComponentState {
}
export declare class RangeFrameBarComponent extends React.Component<IRangeFrameBarComponentProps, IRangeFrameBarComponentState> {
    private _svgHost;
    private _viewWidth;
    private _offsetX;
    private _isMounted;
    private _onActiveAnimationChangedObserver;
    private _onPlayheadMovedObserver;
    private _onFrameManuallyEnteredObserver;
    constructor(props: IRangeFrameBarComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _computeSizes;
    private _dropKeyFrames;
    private _buildActiveFrame;
    private _buildFrames;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
