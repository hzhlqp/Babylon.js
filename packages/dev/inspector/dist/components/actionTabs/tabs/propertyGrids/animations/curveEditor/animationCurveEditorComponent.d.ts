import * as React from "react";
import type { GlobalState } from "../../../../../globalState";
import type { Context } from "./context";
import "./scss/curveEditor.scss";
interface IAnimationCurveEditorComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IAnimationCurveEditorComponentState {
    isOpen: boolean;
}
export declare class AnimationCurveEditorComponent extends React.Component<IAnimationCurveEditorComponentProps, IAnimationCurveEditorComponentState> {
    constructor(props: IAnimationCurveEditorComponentProps);
    onCloseAnimationCurveEditor(window: Window | null): void;
    shouldComponentUpdate(newProps: IAnimationCurveEditorComponentProps, newState: IAnimationCurveEditorComponentState): boolean;
    private _onKeyDown;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
