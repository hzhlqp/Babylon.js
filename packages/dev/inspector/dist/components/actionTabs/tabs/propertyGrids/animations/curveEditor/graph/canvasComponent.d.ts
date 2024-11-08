import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
import "../scss/canvas.scss";
interface ICanvasComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface ICanvasComponentState {
}
export declare class CanvasComponent extends React.Component<ICanvasComponentProps, ICanvasComponentState> {
    private _onActiveAnimationChangedObserver;
    constructor(props: ICanvasComponentProps);
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
