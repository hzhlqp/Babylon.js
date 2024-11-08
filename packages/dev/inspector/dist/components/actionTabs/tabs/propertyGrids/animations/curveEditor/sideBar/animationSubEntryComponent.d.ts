import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
import type { Animation } from "core/Animations/animation";
interface IAnimationSubEntryComponentProps {
    globalState: GlobalState;
    context: Context;
    animation: Animation;
    color: string;
    subName: string;
}
interface IAnimationSubEntryComponentState {
    isSelected: boolean;
}
export declare class AnimationSubEntryComponent extends React.Component<IAnimationSubEntryComponentProps, IAnimationSubEntryComponentState> {
    private _onActiveAnimationChangedObserver;
    private _onActiveKeyPointChangedObserver;
    constructor(props: IAnimationSubEntryComponentProps);
    componentWillUnmount(): void;
    private _activate;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
