import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface ITextInputComponentProps {
    globalState: GlobalState;
    context: Context;
    id?: string;
    className?: string;
    tooltip?: string;
    value: string;
    isNumber?: boolean;
    complement?: string;
    onValueAsNumberChanged?: (value: number, isFocused: boolean) => void;
    disabled?: boolean;
}
interface ITextInputComponentState {
    value: string;
    isFocused: boolean;
}
export declare class TextInputComponent extends React.Component<ITextInputComponentProps, ITextInputComponentState> {
    private _lastKnownGoodValue;
    constructor(props: ITextInputComponentProps);
    private _onChange;
    private _onBlur;
    private _onFocus;
    shouldComponentUpdate(newProps: ITextInputComponentProps, newState: ITextInputComponentState): boolean;
    private _onKeyPress;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
