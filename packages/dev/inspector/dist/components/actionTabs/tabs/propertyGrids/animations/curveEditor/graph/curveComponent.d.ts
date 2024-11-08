import * as React from "react";
import type { Context } from "../context";
import type { Curve } from "./curve";
interface ICurveComponentProps {
    curve: Curve;
    convertX: (x: number) => number;
    convertY: (x: number) => number;
    context: Context;
}
interface ICurveComponentState {
    isSelected: boolean;
}
export declare class CurveComponent extends React.Component<ICurveComponentProps, ICurveComponentState> {
    private _onDataUpdatedObserver;
    private _onActiveAnimationChangedObserver;
    private _onInterpolationModeSetObserver;
    constructor(props: ICurveComponentProps);
    componentWillUnmount(): void;
    componentDidUpdate(): boolean;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
