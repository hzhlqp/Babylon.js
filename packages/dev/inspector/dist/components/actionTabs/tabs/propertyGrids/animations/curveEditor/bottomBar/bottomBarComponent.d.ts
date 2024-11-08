import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
import "../scss/bottomBar.scss";
interface IBottomBarComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IBottomBarComponentState {
    clipLength: string;
}
export declare class BottomBarComponent extends React.Component<IBottomBarComponentProps, IBottomBarComponentState> {
    private _onAnimationsLoadedObserver;
    private _onActiveAnimationChangedObserver;
    private _onClipLengthIncreasedObserver;
    private _onClipLengthDecreasedObserver;
    constructor(props: IBottomBarComponentProps);
    private _changeClipLength;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
