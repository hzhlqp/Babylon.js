import * as React from "react";
import type { GlobalState } from "../../../../../globalState";
import type { Context } from "./context";
import "./scss/topBar.scss";
interface ITopBarComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface ITopBarComponentState {
    keyFrameValue: string;
    keyValue: string;
    frameControlEnabled: boolean;
    valueControlEnabled: boolean;
}
export declare class TopBarComponent extends React.Component<ITopBarComponentProps, ITopBarComponentState> {
    private _onFrameSetObserver;
    private _onValueSetObserver;
    private _onActiveAnimationChangedObserver;
    private _onActiveKeyPointChanged;
    constructor(props: ITopBarComponentProps);
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
