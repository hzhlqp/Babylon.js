import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IAnimationListComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IAnimationListComponentState {
    isVisible: boolean;
}
export declare class AnimationListComponent extends React.Component<IAnimationListComponentProps, IAnimationListComponentState> {
    private _onEditAnimationRequiredObserver;
    private _onEditAnimationUIClosedObserver;
    private _onDeleteAnimationObserver;
    constructor(props: IAnimationListComponentProps);
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
