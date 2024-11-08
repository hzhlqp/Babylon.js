import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
import { Animation } from "core/Animations/animation";
import type { Nullable } from "core/types";
interface IEditAnimationComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IEditAnimationComponentState {
    isVisible: boolean;
    animation: Nullable<Animation>;
}
export declare class EditAnimationComponent extends React.Component<IEditAnimationComponentProps, IEditAnimationComponentState> {
    private _root;
    private _displayName;
    private _property;
    private _loopModeElement;
    private _onEditAnimationRequiredObserver;
    constructor(props: IEditAnimationComponentProps);
    componentWillUnmount(): void;
    close(): void;
    validate(): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
