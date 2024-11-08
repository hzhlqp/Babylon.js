import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IFrameBarComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IFrameBarComponentState {
}
export declare class FrameBarComponent extends React.Component<IFrameBarComponentProps, IFrameBarComponentState> {
    private readonly _graphAbsoluteWidth;
    private _svgHost;
    private _viewWidth;
    private _viewScale;
    private _offsetX;
    private _onActiveAnimationChangedObserver;
    constructor(props: IFrameBarComponentProps);
    componentWillUnmount(): void;
    private _computeSizes;
    private _buildFrames;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
