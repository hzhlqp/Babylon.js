import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
import { Animation } from "core/Animations/animation";
interface IAnimationEntryComponentProps {
    globalState: GlobalState;
    context: Context;
    animation: Animation;
}
interface IAnimationEntryComponentState {
    isExpanded: boolean;
    isSelected: boolean;
}
export declare class AnimationEntryComponent extends React.Component<IAnimationEntryComponentProps, IAnimationEntryComponentState> {
    private _onActiveAnimationChangedObserver;
    private _onActiveKeyPointChangedObserver;
    private _onSelectToActivatedObserver;
    private _unmount;
    constructor(props: IAnimationEntryComponentProps);
    private _onGear;
    private _onDelete;
    componentWillUnmount(): void;
    private _activate;
    private _expandOrCollapse;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
